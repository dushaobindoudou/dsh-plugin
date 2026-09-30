/**
 * dsh-lingxi — the task watch: what is running in dsh right now.
 *
 * Answers the pet's first question ("知道现在正在运行哪些任务") with TWO
 * sources, on purpose:
 *
 *  1. EVENTS, for the moment they happen. dsh emits `agent/status` when an
 *     agent flips idle⇄running, `agent/error` when a step dies, `subagent/*`
 *     and `workflow/*` for delegated work, and the `approval/request` /
 *     `user-questions/request` waterfalls when the work stops for the user.
 *     The status bus only knows "not running", so a USER stop is read from
 *     the session stream instead: the agent loop appends a `turn/end` event
 *     with `reason.kind === "aborted"` when a cancel interrupts the turn,
 *     and that settles the row cancelled — not completed.
 *  2. A slow RECONCILIATION (agents.list() + jobs.list() every RECONCILE_MS),
 *     because events can be missed (plugin mounted mid-run) and because
 *     "what is running NOW" must stay true even if one listener threw. The
 *     sense watches (goal, authorization) add their own sweeps into the same
 *     pass via `taskWatch.sweeps`.
 *
 * The watch owns NO policy: it derives state and calls the `onTransition`
 * hook; whether a state is worth interrupting the user for lives in the
 * attention policy (dsh-pets policy.js + the notify module). Every listener
 * is individually guarded — one bad payload must not take the watchdog down.
 */
import { sessionTitleFor } from './title.js'

/** How often the reconcile sweep runs. Events are the fast path; this is the truth sweep. */
export const RECONCILE_MS = 60_000

/**
 * Arm one repeating sweep and return its disposer.
 *
 * The cordis timer service is the real path: `armInterval` is called with a
 * context that declared `timer` in its `inject` (see index.js), so the interval
 * is owned by the fiber and dies with it. The raw fallback keeps the sweep
 * alive on a host that never provided the service.
 *
 * It reads `ctx.get('timer')` rather than `ctx.timer` on purpose: reading a
 * service *by name* never throws, while touching an undeclared `ctx.timer`
 * throws `cannot get property "timer" without inject` — one such throw takes
 * the whole plugin tree down.
 *
 * @param {object} ctx - the plugin Context.
 * @param {() => void} callback - what to run on each tick.
 * @param {number} ms - the tick interval.
 * @returns {() => void} a disposer that stops the sweep.
 */
export function armInterval(ctx, callback, ms) {
  const timer = typeof ctx?.get === 'function' ? ctx.get('timer') : undefined
  if (timer !== undefined && typeof timer.interval === 'function') return timer.interval(callback, ms)
  const id = setInterval(callback, ms)
  id.unref?.()
  return () => clearInterval(id)
}

/** Cap on tracked entries so a chatty host cannot grow the map forever. */
const TRACKED_CAP = 64

/** Map one dsh source onto the pet's task-kind vocabulary. */
function kindOf(source) {
  switch (source) {
    // An agent row is one CHAT REPLY in the pet app's vocabulary: its
    // turn-end machinery keys on completed+chat from a hook-origin event
    // ("the model already reported this turn — the host's echo stays
    // silent"). 'other' slipped past that gate and the app read the row
    // title aloud as the turn's result.
    case 'agent': return 'chat'
    case 'subagent': return 'search'
    case 'workflow': return 'build'
    case 'job': return 'test'
    case 'approval': return 'other'
    case 'question': return 'chat'
    case 'goal': return 'build'
    case 'authorization': return 'other'
    case 'input': return 'chat'
    default: return 'other'
  }
}

/** Cap on remembered input hints (sessionId → the user's own words). */
const INPUT_HINT_CAP = 32

/** How many remembered stops to keep. A stop marker only lives until the
 *  session's next idle settle or its next fresh start; the cap is purely a
 *  runaway guard for sessions that stop repeatedly without either. */
const STOP_CAP = 32

/**
 * The user's request in one line: the message's first text block, flattened,
 * capped. A hint carries the user's OWN words — the watch does no model
 * summarization; the raw ask is the cheapest honest summary there is.
 * Returns null for non-text input (attachments, image-only messages).
 */
function textHint(message) {
  const blocks = message?.content
  if (!Array.isArray(blocks)) return null
  const block = blocks.find((b) => b?.type === 'text' && typeof b.text === 'string' && b.text.trim())
  if (block === undefined) return null
  return block.text.replace(/\s+/g, ' ').trim().slice(0, 80) || null
}

/**
 * A settled subagent's final words, condensed for a one-line summary.
 *
 * The child's last assistant message IS a model-written summary of the work —
 * the plugin's job is honest EXTRACTION, not a second model call. Selection
 * rules, each answering a way extraction used to go wrong:
 *
 *  - the LAST non-empty text block wins: final reports put the conclusion at
 *    the end; the first block is often a hand-off preamble ("已 delivered to
 *    the parent") that says nothing about the work itself;
 *  - markdown furniture (headers, bullets, code ticks) is stripped — it reads
 *    as noise in a bubble;
 *  - the line is capped CJK-aware, cutting at the last sentence terminator
 *    under the cap so the summary never ends mid-word.
 *
 * A bare string payload is accepted defensively (older hosts). Returns
 * undefined when nothing readable is left — callers fall back to the row
 * title instead of showing an empty half of a "标题 · 摘要" pair.
 */
const OUTCOME_NOISE = /^\s*(?:#{1,6}\s+|[-*+]\s+|>\s+|\d+[.)]\s+)/

function outcomeText(payload) {
  let text = ''
  if (typeof payload === 'string') {
    text = payload
  } else if (Array.isArray(payload)) {
    for (const block of payload) {
      if (block?.type === 'text' && typeof block.text === 'string' && block.text.trim()) text = block.text
    }
  }
  const line = text
    .split('\n')
    .map((row) => row.replace(OUTCOME_NOISE, '').replace(/`/g, '').trim())
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (!line) return undefined
  const chars = Array.from(line)
  if (chars.length <= 120) return line
  const capped = chars.slice(0, 120).join('')
  const cuts = ['。', '！', '？', '；', '. ', '; '].map((mark) => capped.lastIndexOf(mark))
  const cut = Math.max(...cuts)
  return (cut > 40 ? capped.slice(0, cut + 1) : capped).trim()
}

/** A readable row title when neither the event nor the session store has one.
 * An id slice is unreadable in a bubble — the generic subject is the honest
 * floor, and the outcome (when one exists) rides beside it as the summary. */
function fallbackTitle(source) {
  switch (source) {
    case 'subagent': return '子任务'
    case 'workflow': return '工作流'
    default: return null
  }
}

/**
 * @param {object} options
 * @param {object} options.ctx - the plugin Context (ctx.on, ctx.effect, ctx.get).
 * @param {object} options.bridge - a PetBridge bound to current settings.
 * @param {() => object} options.getSettings - current validated settings.
 * @param {(transition: {taskId: string, state: string, kind: string, summary: string, source: string, progress?: number}) => void} [options.onTransition]
 */
export class TaskWatch {
  constructor({ ctx, bridge, getSettings, onTransition }) {
    this.ctx = ctx
    this.bridge = bridge
    this.getSettings = getSettings
    this.onTransition = onTransition
    /** @type {Map<string, {title: string, titleGeneric: boolean, kind: string, state: string, since: number, source: string, progress?: number}>} */
    this.tracked = new Map()
    this.started = false
    this.disposeFns = []
    /**
     * Extra reconcile sweeps contributed by the sense watches (goal watch,
     * authorization watch, …). Each is awaited after the registries are
     * listed and before vanish-settling, so a sense that re-tracks a row in
     * the same pass is never settled by the staleness rule.
     * @type {Array<(seen: Set<string>) => void | Promise<void>>}
     */
    this.sweeps = []
    /** @type {Map<string, string>} sessionId → the user's latest ask (row title enrichment) */
    this.inputHints = new Map()
    /** @type {Set<string>} sessionIds whose turn ended aborted (a user stop);
     *  the next idle settle for these is a cancellation, not a completion. */
    this.pendingStops = new Set()
  }

  start() {
    if (this.started || this.ctx === undefined) return
    this.started = true
    if (typeof this.ctx.on !== 'function') {
      console.error('dsh-lingxi task watch: the context has no event bus; falling back to the reconcile sweep only.')
    }
    const on = (event, handler) => {
      if (typeof this.ctx.on !== 'function') return
      this.disposeFns.push(this.ctx.on(event, (...args) => {
        try {
          handler(...args)
        } catch (error) {
          console.error(`dsh-lingxi task watch: ${event} handler failed:`, error instanceof Error ? error.message : error)
        }
      }))
    }

    // --- the fast path: lifecycle events ---
    on('agent/status', (payload) => {
      const agent = payload?.agent
      if (agent === undefined || agent === null) return
      const key = String(agent.id)
      if (payload.status === 'running') {
        // Fresh work invalidates a remembered stop: the user aborted the
        // previous turn, then asked for something new.
        this.pendingStops.delete(key)
        // The user's own words (the input hint) beat a session-id slice as
        // the row title — "开始「帮我修好登录」" needs no follow-up question.
        const hint = this.inputHints.get(key)
        // A session title names the CONVERSATION, not this round's task: it
        // froze at (or near) the first ask, so quoting it makes every later
        // start bubble announce work the session has already left behind
        // ("跟当前的任务一点关系没有"). Only a fresh ask may reach the
        // mouth; without one the say goes subject-less. The row keeps the
        // session title — the feed gains context from it either way.
        this.track(agent.id, { source: 'agent', state: 'running', title: hint, sayGeneric: hint === undefined })
      } else if (this.pendingStops.has(key)) {
        // The turn ended aborted (see the session/event listener below) but
        // its status flip arrived first — or the fast path missed the row.
        // The stop wins: this is a cancellation, not a completion.
        this.pendingStops.delete(key)
        this.settle(agent.id, 'cancelled', 'agent')
      } else {
        this.settle(agent.id, 'completed', 'agent')
      }
    })
    on('agent/error', (payload) => {
      const agent = payload?.agent
      if (agent === undefined || agent === null) return
      this.settle(agent.id, 'failed', 'agent', `第 ${payload?.step ?? '?'} 步出错`)
    })
    // SubagentRunInfo/EndInfo carry `id` (dsh-subagent types); `sessionId`
    // stays as a defensive fallback. The delegation label lives on the
    // creation request, NOT on the run info — the row title falls back to the
    // child's session title, then to 「子任务」. The end note carries the
    // child's actual final words — its own model-written summary, extracted —
    // because "目录复查 · tests passed" beats a bare "完成了".
    on('subagent/start', (info) => {
      const id = info?.id ?? info?.sessionId
      if (id !== undefined) this.track(String(id), { source: 'subagent', state: 'running' })
    })
    on('subagent/end', (info) => {
      const id = info?.id ?? info?.sessionId
      if (id === undefined) return
      const reason = info?.stopReason ?? info?.outcome
      const outcome = outcomeText(info?.lastAssistantMessage)
      const state = reason === 'completed' ? 'completed'
        : reason === 'aborted' ? 'cancelled'
        : 'failed'
      // stopReason is a machine word; the bubble is not. error → 出错.
      const cause = reason === 'error' ? '出错' : reason === 'aborted' ? '已中止' : undefined
      const note = state === 'failed'
        ? (outcome !== undefined ? `${cause ?? String(reason)} · ${outcome}` : cause ?? String(reason ?? '失败'))
        : outcome
      this.settle(String(id), state, 'subagent', note)
    })
    // A user input landing in a live inbox: the "what does the user want"
    // hint. Surfaced only when the session was idle — steering input during
    // active work is already covered by the running row.
    on('agent/inbox/inserted', (payload) => {
      const agent = payload?.agent
      const id = agent?.id ?? agent?.sessionId
      if (id === undefined || id === null) return
      this.inputHint(String(id), payload?.message)
    })
    // WorkflowRunInfo carries `id` (dsh-workflow types); `runId` stays as a
    // defensive fallback for older emits.
    on('workflow/start', (info) => {
      const runId = info?.id ?? info?.runId
      if (runId !== undefined) this.track(runId, { source: 'workflow', state: 'running', title: workflowTitle(info) })
    })
    on('workflow/phase', (info, title) => {
      const runId = info?.id ?? info?.runId
      if (runId === undefined || typeof title !== 'string' || !title.trim()) return
      // The phase IS the progress the user can see: the row reads "name · phase".
      const base = workflowTitle(info)
      this.track(runId, { source: 'workflow', state: 'running', title: base ? `${base} · ${title.trim()}` : title.trim() })
    })
    on('workflow/log', (info, message) => {
      // Narration lines are ambient noise for the task registry — ignored.
      void info
      void message
    })
    on('workflow/end', (info, result) => {
      const runId = info?.id ?? info?.runId
      if (runId === undefined) return
      const reason = result?.stopReason ?? result?.reason
      const note = typeof result?.error === 'string' && result.error.trim() ? result.error.trim() : undefined
      if (reason === 'completed') this.settle(runId, 'completed', 'workflow')
      else if (reason === 'error') this.settle(runId, 'failed', 'workflow', note)
      else this.settle(runId, 'cancelled', 'workflow', note)
    })
    on('api-session/status', (sessionId, running) => {
      if (sessionId === undefined || sessionId === null) return
      const key = String(sessionId)
      if (running) {
        this.pendingStops.delete(key)
        // Same rule as agent/status: a fresh ask may speak; the frozen
        // session title may not.
        const hint = this.inputHints.get(key)
        this.track(sessionId, { source: 'agent', state: 'running', title: hint, sayGeneric: hint === undefined })
      } else if (this.pendingStops.has(key)) {
        this.pendingStops.delete(key)
        this.settle(sessionId, 'cancelled', 'agent')
      } else {
        this.settle(sessionId, 'completed', 'agent')
      }
    })
    // --- the stop hook ---
    // Clicking stop in the GUI calls agent.cancel({ kind: "user" }); the
    // loop aborts the turn and appends `turn/end` with
    // `reason: { kind: "aborted", reason: signal.reason }` to the session
    // stream (a user stop carries { kind: "user" }, the goal driver's
    // parent teardown { kind: "parent" } — both are cancellations). The
    // status bus cannot express this: idle there means "not running", and
    // calling it completed painted the row green for work the USER ended —
    // and, before summary honesty, read the user's own ask aloud as the
    // result. The stream event precedes the status flip (the loop appends
    // in the turn runner's finally, before the phase goes idle), so the
    // settle lands here and the idle handler no-ops on the deleted row;
    // the marker covers the flipped ordering. No note: the state carries
    // the meaning, the app's own reaction (嫌弃 + shake) confirms it, and
    // `cancelled` is silent in the attention policy — the user KNOWS they
    // stopped it.
    on('session/event', (session, event) => {
      if (event?.type !== 'turn/end') return
      if (event?.data?.reason?.kind !== 'aborted') return
      const id = session?.id
      if (id === undefined || id === null) return
      const key = String(id)
      if (this.pendingStops.size >= STOP_CAP && !this.pendingStops.has(key)) {
        const oldest = this.pendingStops.values().next().value
        if (oldest !== undefined) this.pendingStops.delete(oldest)
      }
      this.pendingStops.add(key)
      this.settle(key, 'cancelled', 'agent')
    })

    // --- the attention waterfalls: observe, then pass through UNTOUCHED ---
    // A waterfall listener's return value IS the chain's resolution. The
    // guarded `on()` wrapper above discards the handler's return, so routing
    // these two through it made every observer a veto: when the web client
    // passed (session not in view), the wrapper returned undefined, the whole
    // waterfall resolved undefined, and ask_user_question crashed on
    // `(await ask()).answers` with "Cannot read properties of undefined
    // (reading 'answers')" — while approval fell back to fail-closed. So
    // these two register raw: observe inside try/catch, return next()
    // unconditionally (budget.js's request-error observer is the same
    // pattern), and hang bookkeeping off the chain's own resolution so the
    // row settles when the request does — answered → completed, cancelled /
    // nobody answered → cancelled — instead of haunting the task list.
    this.disposeFns.push(this.ctx.on('approval/request', (payload, next) => {
      let taskId
      try {
        const agent = payload?.agent
        if (agent !== undefined && agent !== null) {
          taskId = agent.id
          this.track(taskId, { source: 'agent', state: 'needs_approval', title: `等待授权：${describeApproval(payload)}` })
        }
      } catch (error) {
        console.error('dsh-lingxi task watch: approval/request observer failed:', error instanceof Error ? error.message : error)
      }
      return settleWithResolution(this, taskId, next())
    }))
    this.disposeFns.push(this.ctx.on('user-questions/request', (payload, next) => {
      let taskId
      try {
        const agent = payload?.agent ?? payload?.request?.agent
        if (agent !== undefined && agent !== null) {
          taskId = agent.id
          // The ask itself is the best title: the bubble reads
          // "「文档入库：.gitignore 目前忽略了 docs…」有个问题想问你。" instead
          // of a generic "等待你的回答" that makes the user ask "什么问题？".
          this.track(taskId, { source: 'agent', state: 'needs_input', title: describeQuestion(payload) })
        }
      } catch (error) {
        console.error('dsh-lingxi task watch: user-questions/request observer failed:', error instanceof Error ? error.message : error)
      }
      return settleWithResolution(this, taskId, next())
    }))

    // --- the truth sweep ---
    this.disposeFns.push(armInterval(this.ctx, () => { void this.reconcile() }, RECONCILE_MS))
    void this.reconcile()
  }

  stop() {
    for (const dispose of this.disposeFns) {
      try {
        dispose()
      } catch { /* a disposer that throws must not stop the others */ }
    }
    this.disposeFns = []
    this.started = false
  }

  /**
   * One task entered a state. Registers it and reports the transition.
   * `discovered` marks a reconcile DISCOVERY — the sweep found the task
   * already in this state (it predates the mount, or the event was lost):
   * the row and the feed ride, but announcing a start nobody observed
   * would claim the work just began.
   */
  track(taskId, { source, state, title, progress, sayGeneric, discovered }) {
    const previous = this.tracked.get(taskId)
    // Whether the title is the generic fallback decides how the settle line
    // is built: a generic 「子任务」 adds nothing in front of a real outcome.
    const derived = title ?? this.deriveTitle(taskId)
    // sayGeneric lets a caller split the row from the mouth: the row keeps
    // whatever title it can get (a session title names the conversation and
    // reads fine in the feed), while titleGeneric marks the transition as
    // having no honest SUBJECT — the say then goes subject-less instead of
    // quoting a name the current task has nothing to do with.
    const titleGeneric = sayGeneric === true || derived === undefined || derived === null
    const entry = {
      // A fresh derivation wins over the remembered title: session titles
      // evolve as the conversation moves, and a stale one makes the start
      // bubble announce work the session has already left behind.
      title: derived ?? previous?.title ?? fallbackTitle(source) ?? String(taskId).slice(0, 24),
      titleGeneric: titleGeneric && (previous?.titleGeneric ?? true),
      kind: kindOf(source),
      state,
      since: previous?.since ?? Date.now(),
      source,
      // A reconcile discovery rides the feed but not the mouth — see track()'s doc.
      discovered: discovered === true || (discovered === undefined && previous?.discovered === true),
      // progress sticks: a source that knows it (goal rounds, todo counts)
      // supplies it; one that does not keeps what the row last had.
      progress: clampProgress(progress) ?? previous?.progress,
    }
    this.tracked.set(taskId, entry)
    if (this.tracked.size > TRACKED_CAP) {
      const oldest = [...this.tracked.entries()].sort((a, b) => a[1].since - b[1].since)[0]
      if (oldest !== undefined && oldest[0] !== taskId) this.tracked.delete(oldest[0])
    }
    if (previous === undefined || previous.state !== state) this.emit(taskId, entry)
  }

  /**
   * One task left the running set (or died).
   *
   * The optional note is the CAUSE ("第 3 步出错", "exit 1") in the
   * reporter's own words, and it is the WHOLE summary: the pet app reads a
   * terminal summary aloud as the turn's RESULT, so prefixing the row
   * title here had the cat "complete" the user's own ask back at them
   * ("已完成：我看 freeroute 又需要更新了，"). The row's subject travels
   * in `label` (emit); a settle without a note has nothing honest to say,
   * and the app narrates its own lifecycle line instead.
   */
  settle(taskId, state, source, note) {
    const previous = this.tracked.get(taskId)
    if (previous === undefined) return
    const entry = { ...previous, state, kind: kindOf(source), source }
    this.tracked.set(taskId, entry)
    const trimmed = typeof note === 'string' && note.trim() ? note.trim() : undefined
    this.emit(taskId, { ...entry, summary: trimmed })
    if (state !== 'needs_approval' && state !== 'needs_input') this.tracked.delete(taskId)
  }

  /** Build a human title from the session store when the event gave none. */
  deriveTitle(taskId) {
    try {
      return sessionTitleFor(this.ctx, taskId)
    } catch {
      return null
    }
  }

  /**
   * One user input arrived. Surfaces WHAT the user asked as a queued hint
   * row — and, per the attention policy (queued: status by default), a
   * "收到新任务" bubble, so the user sees the cat understood the ask before
   * any work starts. Suppressed while the session already runs (steering
   * input): the running row already tells that story.
   *
   * The hint is remembered in BOTH cases: the user's own words are the
   * freshest honest subject for every later alert about this session — a
   * failed step, context pressure, an exhausted quota. The static session
   * title froze at birth; the ask did not.
   */
  inputHint(sessionId, message) {
    const hint = textHint(message)
    if (hint === null) return
    if (this.inputHints.size >= INPUT_HINT_CAP && !this.inputHints.has(sessionId)) {
      const oldest = this.inputHints.keys().next().value
      if (oldest !== undefined) this.inputHints.delete(oldest)
    }
    this.inputHints.set(sessionId, hint)
    const previous = this.tracked.get(sessionId)
    if (previous === undefined || previous.state !== 'running') {
      this.track(sessionId, { source: 'input', state: 'queued', title: hint })
      return
    }
    // Steering during active work adds no row and no bubble, but the row's
    // subject silently follows the new ask, so the eventual settle line
    // reports what the session is doing NOW, not what it started with.
    previous.title = hint
  }

  /**
   * The freshest honest subject for one session, for alert lines: the
   * user's own latest words beat the row title, which beats the static
   * session title. Returns null when nothing is known — callers fall back
   * to a generic line.
   */
  describe(sessionId) {
    const key = String(sessionId)
    return this.inputHints.get(key)
      ?? this.tracked.get(key)?.title
      ?? this.deriveTitle(key)
      ?? null
  }

  /**
   * The reconcile sweep: ask the registries what is actually alive, keep
   * the genuinely running rows running, settle everything tracked-but-gone.
   */
  async reconcile() {
    const agentsSvc = this.ctx.get('agents')
    const jobsSvc = this.ctx.get('jobs')
    const seen = new Set()
    if (agentsSvc !== undefined && typeof agentsSvc.list === 'function') {
      for (const agent of agentsSvc.list()) {
        const id = agent?.id ?? agent?.sessionId
        if (id === undefined || id === null) continue
        // list() is every RESIDENT agent — rehydrated at boot, open in a
        // GUI tab — not every WORKING one. Marking them all running had the
        // cat greet the host's restart with "开工了" for sessions that last
        // turned days ago, kept their feed rows running forever, and
        // resurrected every settled row on the next pass. The registry's
        // own status is the truth; a host that does not expose it keeps
        // the old (track-everything) behavior.
        const status = agent?.status
        if (status !== undefined && status !== 'running') continue
        seen.add(String(id))
        // Same rule as agent/status: the sweep knows nothing fresh about
        // the round, so the mouth may not quote the session title — and a
        // reconcile DISCOVERY is not an observed start: the row and the
        // feed ride, the say does not (see emit/notify).
        const hint = this.inputHints.get(String(id))
        this.track(String(id), { source: 'agent', state: 'running', title: hint, sayGeneric: hint === undefined, discovered: true })
      }
    }
    if (jobsSvc !== undefined && typeof jobsSvc.list === 'function') {
      for (const job of jobsSvc.list()) {
        if (job === null || typeof job !== 'object') continue
        const status = String(job.status ?? '')
        if (status !== 'running') continue
        const id = String(job.id ?? '')
        if (!id) continue
        seen.add(`job:${id}`)
        this.track(`job:${id}`, { source: 'job', state: 'running', title: job.label ?? job.kind, discovered: true })
      }
    }
    // The sense watches reconcile inside the same pass, after the registries
    // are listed: a goal or authorization row they (re)track here must not
    // be vanish-settled by the staleness rule below.
    for (const sweep of this.sweeps) {
      try {
        await sweep(seen)
      } catch (error) {
        console.error('dsh-lingxi task watch: reconcile sweep failed:', error instanceof Error ? error.message : error)
      }
    }
    for (const [taskId, entry] of this.tracked) {
      if (entry.state === 'running' && !seen.has(taskId) && !taskId.startsWith('job:') && !taskId.startsWith('goal:')) {
        // Events settle tasks explicitly; a running task that vanished from
        // every registry without an event gets settled here. `goal:` rows
        // are settled by the goal sweep itself (cleared → cancelled), never
        // by staleness — an idle round gap must not kill the objective.
        this.settle(taskId, 'completed', entry.source)
      }
    }
  }

  /** Report one transition upward and (via the caller's hook) to the pet. */
  emit(taskId, entry) {
    if (this.onTransition === undefined) return
    try {
      this.onTransition({
        taskId: String(taskId).slice(0, 128),
        state: entry.state,
        kind: entry.kind,
        // TERMINAL states never fall back to the row title: the title is
        // the conversation's name or the user's own steering words, and the
        // pet app reads a terminal summary aloud as the RESULT ("已完成：
        // <title>") — announcing the ask as its own outcome. The feed keeps
        // its subject through `label`; a terminal event without a note has
        // no summary, and the app falls to its own lifecycle line. In-flight
        // states keep the title: the feed's "what is running" IS that
        // subject, and the app does not speak running summaries.
        summary: entry.summary
          ?? (entry.state === 'completed' || entry.state === 'failed' || entry.state === 'cancelled'
            ? undefined
            : entry.title),
        // The row's subject for the feed, and the provenance mark: this
        // watch is the HOST's voice, never the agent's own report.
        label: entry.title,
        origin: 'hook',
        titleGeneric: entry.titleGeneric === true,
        source: entry.source,
        ...(entry.discovered === true ? { discovered: true } : {}),
        ...(entry.progress === undefined ? {} : { progress: entry.progress }),
      })
    } catch (error) {
      console.error('dsh-lingxi task watch: transition hook failed:', error instanceof Error ? error.message : error)
    }
  }
}

/** Clamp a progress claim into 0..1, or drop it. */
function clampProgress(progress) {
  if (typeof progress !== 'number' || !Number.isFinite(progress)) return undefined
  return Math.max(0, Math.min(1, progress))
}

/**
 * Watch one waterfall's own resolution to settle the observed row — without
 * touching the chain. The exact promise `next()` returned is returned as-is;
 * only bookkeeping hooks hang off it. An answer resolves the row (completed,
 * note = the approval outcome when the resolution is one); a rejection (no
 * answerer accepted, or the ask was cancelled) settles it cancelled. A row
 * that vanished in the meantime makes settle a no-op, so a fast answer after
 * an agent/status idle never double-reports.
 */
function settleWithResolution(watch, taskId, resolution) {
  if (taskId === undefined || taskId === null) return resolution
  if (resolution === undefined || resolution === null || typeof resolution.then !== 'function') return resolution
  resolution.then(
    (outcome) => {
      try {
        const note = typeof outcome === 'string' && outcome.trim() ? Array.from(outcome.trim()).slice(0, 24).join('') : undefined
        watch.settle(taskId, 'completed', 'agent', note)
      } catch { /* bookkeeping must never touch the chain */ }
    },
    (error) => {
      try {
        const note = error?.code === 'ASK_ABORTED' ? '提问被取消' : '没有收到回答'
        watch.settle(taskId, 'cancelled', 'agent', note)
      } catch { /* bookkeeping must never touch the chain */ }
    },
  )
  return resolution
}

/**
 * The human-facing line for one pending question: "header：question" of the
 * first question, flattened and capped. The raw ask is the cheapest honest
 * summary — the payload already carries it, and a "有个问题想问你" bubble
 * without WHAT the question is just makes the user ask "什么问题？".
 */
function describeQuestion(payload) {
  const questions = Array.isArray(payload?.questions) ? payload.questions : []
  for (const question of questions) {
    const text = typeof question?.question === 'string' ? question.question.replace(/\s+/g, ' ').trim() : ''
    if (!text) continue
    const capped = Array.from(text).slice(0, 60).join('')
    const header = typeof question?.header === 'string' && question.header.trim()
      ? Array.from(question.header.trim()).slice(0, 20).join('')
      : null
    return header !== null ? `${header}：${capped}` : capped
  }
  return '等待你的回答'
}

/**
 * ApprovalRequestEvent carries `toolName` + optional `reason` (dsh-user-approval
 * types — the subject/title/kind guesses never existed on the real payload);
 * `tool` stays as a defensive fallback for older emits.
 */
function describeApproval(payload) {
  const tool = [payload?.toolName, payload?.tool].find((candidate) => typeof candidate === 'string' && candidate.trim())
  const reason = typeof payload?.reason === 'string' && payload.reason.trim()
    ? Array.from(payload.reason.replace(/\s+/g, ' ').trim()).slice(0, 40).join('')
    : null
  const toolText = tool === undefined ? null : Array.from(tool.trim()).slice(0, 24).join('')
  if (toolText !== null && reason !== null) return `${toolText} · ${reason}`
  if (toolText !== null) return toolText
  if (reason !== null) return reason
  return '一个操作'
}

/** WorkflowRunInfo.meta.name is the display name; `name` stays as a fallback. */
function workflowTitle(info) {
  const name = typeof info?.meta?.name === 'string' && info.meta.name.trim() ? info.meta.name.trim() : info?.name
  return typeof name === 'string' && name.trim() ? Array.from(name.trim()).slice(0, 60).join('') : undefined
}
