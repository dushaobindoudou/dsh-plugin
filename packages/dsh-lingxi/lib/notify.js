/**
 * dsh-lingxi — the attention notifier: turning task transitions into pet
 * notifications, exactly as loudly as the policy says.
 *
 * Requirement 2 ("任务和状态需要用户知道时，通过桌面宠物给用户提示，并且用
 * dsh 的 logo 表示来源") decomposes into three pieces and each lives where
 * it belongs:
 *
 *  - WHICH states interrupt the user: the attention policy (dsh-pets
 *    policy.js), user-editable through settings.notify.
 *  - HOW the pet shows it: the pet app's own machinery — a /task-event
 *    updates the event feed and maps state+kind+mood→expression, and a
 *    /control say puts a sentence in the bubble. The stage/priority ladder
 *    is the app's.
 *  - WHO is speaking: the agent identity registered at mount (badge `DS`,
 *    dsh blue, the DeepSeek whale logo) — the app pins that mark to the
 *    bubble itself, so attribution needs no work per notification.
 *
 * The notifier is the SINGLE mouthpiece: both the task watch's transitions
 * and the model's own lingxi_task reports (source 'tool') land here. A model
 * report remembers its summary/kind/mood per taskId, and later watch
 * transitions for the same task speak with its summary and mood — the watch
 * only knows session titles, the model knows what the work actually is, and
 * a lifecycle bubble without its subject is noise ("谁知道啥完成了"). The
 * KIND is not inherited: the wire event's own kind decides how the pet app
 * narrates it (an agent row must stay a chat turn), and a report's kind
 * belongs to the report's own event.
 *
 * Two deliberate shapes:
 *  - The task-event ALWAYS rides, even for a repeated state: the feed, the
 *    activity row and the app's own halfway-progress gating live on repeated
 *    events. Only the plugin's say is deduplicated per (task, state).
 *  - A running say waits RUNNING_DEBOUNCE_MS before it fires: the model that
 *    narrates itself reports within the first seconds of its turn, and the
 *    extra beat lets the start line carry the real summary instead of the
 *    session-title fallback.
 */
import { attentionLevel, stagePriorityFor } from './pet-contract/index.js'

/** How long a running announcement waits for a model report to enrich it. */
const RUNNING_DEBOUNCE_MS = 2500

/** Cap on remembered model reports, so a chatty host cannot grow it forever. */
const REPORTED_CAP = 64

export class AttentionNotifier {
  /**
   * @param {object} options
   * @param {object} options.bridge - PetBridge bound to current settings.
   * @param {() => object} options.getSettings - current validated settings.
   * @param {(fn: () => void, ms: number) => () => void} [options.delay] -
   *   cancellable timer, wired to the host timer service in index.js so a
   *   pending say dies with the plugin. Falls back to setTimeout (tests).
   * @param {import('./notify-log.js').NotifyLog} [options.log] - the notify
   *   log; when present, every DECISION this notifier makes — emit, dedup,
   *   policy suppression, debounce, and where each summary came from — is
   *   recorded, so the 准/时机/不多不少 axes can be audited from the file.
   */
  constructor({ bridge, getSettings, delay, log } = {}) {
    this.bridge = bridge
    this.getSettings = getSettings
    this.log = log ?? null
    this.delay = typeof delay === 'function' ? delay : (fn, ms) => {
      const id = setTimeout(fn, ms)
      id.unref?.()
      return () => clearTimeout(id)
    }
    /** @type {Map<string, string>} taskId → last announced state (say dedup) */
    this.announced = new Map()
    /** @type {Map<string, {kind?: string, summary?: string, mood?: string}>} */
    this.reported = new Map()
    /** @type {Map<string, () => void>} taskId → cancel of a pending running say */
    this.pending = new Map()
  }

  /** Reset the dedup memory (settings change, mount, bridge rebind). */
  reset() {
    this.announced.clear()
    this.reported.clear()
    for (const cancel of this.pending.values()) cancel()
    this.pending.clear()
  }

  /** Remember one model report — the human-facing truth about this task. */
  remember(taskId, { kind, summary, mood }) {
    const previous = this.reported.get(taskId)
    if (previous === undefined && this.reported.size >= REPORTED_CAP) {
      const oldest = this.reported.keys().next().value
      if (oldest !== undefined) this.reported.delete(oldest)
    }
    this.reported.set(taskId, {
      kind: kind ?? previous?.kind,
      summary: summary ?? previous?.summary,
      mood: mood ?? previous?.mood,
    })
  }

  /**
   * Handle one transition — from the task watch, or from the model's own
   * lingxi_task call. Fire-and-forget by design: a dead bridge is a value,
   * and a notification must never throw into the event handler.
   */
  handle(transition) {
    const { taskId, state, source } = transition
    if (source === 'tool') this.remember(taskId, transition)
    const known = this.reported.get(taskId)
    const effective = {
      taskId,
      state,
      // kind is NOT inherited from a remembered report: the pet app's
      // turn-end machinery keys on the EVENT's own kind (an agent row is a
      // chat turn), and a report's kind belongs to the report's own event —
      // inheriting it re-labelled the settle and slipped it past the gate.
      kind: transition.kind,
      summary: known?.summary ?? transition.summary,
      mood: known?.mood ?? transition.mood,
      // progress rides when the source knows it (goal rounds, todo counts);
      // cleanTaskEvent drops a non-finite claim at the boundary.
      progress: transition.progress,
      // The feed's subject and the host-vs-agent provenance ride the wire;
      // cleanTaskEvent drops them for a mouth that has no use for them.
      ...(transition.label === undefined ? {} : { label: transition.label }),
      ...(transition.origin === undefined ? {} : { origin: transition.origin }),
    }
    const settings = this.getSettings()
    // The event ALWAYS rides — see the class doc for why repeated states do
    // not gate this (progress halfway-crossing lives on repeated events).
    void this.bridge.taskEvent(effective, settings.agentId)
    // The mouth's subject is not the feed's summary. A model report wins and
    // skips the gate (it is written to be read aloud); a watch-derived subject
    // must pass readableSubject — and loses by default when the watch marked
    // the transition generic: a session title names the CONVERSATION, not this
    // round's task, and a say that quotes it announces work the session has
    // already left behind. The subject-less line is the honest fallback
    // ("开工了，有进展我再吱声～"). The feed's summary is untouched: the
    // taskEvent above still carries the full title.
    const saySummary = known?.summary
      ?? (transition.titleGeneric === true ? undefined : readableSubject(transition.summary))
    // The decision record rides with it: what would have been said, and where
    // the summary came from. Delivery is the wire layer's record.
    const eid = this.log?.nextEid()
    const provenance = source === 'tool'
      ? 'model-report'
      : transition.titleGeneric === true ? 'generic' : 'watch-derived'
    this.log?.record({
      channel: 'task-event',
      decision: 'emit',
      eid,
      taskId,
      source,
      state,
      kind: effective.kind,
      mood: effective.mood,
      summary: effective.summary,
      provenance,
    })
    // A reconcile DISCOVERY is not an observed start: the sweep found the
    // task already running (it predates the mount, or the event was lost).
    // The feed rides above; announcing "开工了" here would claim a start
    // nobody saw — the mount burst of nine identical bubbles. The dedup
    // map stays untouched, so a real observed transition still speaks.
    if (transition.discovered === true && state === 'running') {
      this.log?.record({ channel: 'say', decision: 'suppressed-discovery', eid, taskId, source, state, summary: effective.summary, provenance })
      return
    }
    const first = this.announced.get(taskId) !== state
    this.announced.set(taskId, state)
    if (!first) {
      this.log?.record({ channel: 'say', decision: 'dedup', eid, taskId, source, state, summary: effective.summary, provenance })
      return
    }
    const level = attentionLevel(state, settings.notify)
    if (level === null) {
      this.log?.record({ channel: 'say', decision: 'suppressed-by-policy', eid, taskId, source, state, summary: effective.summary, provenance })
      return
    }
    // The 2.5s debounce exists so a WATCH-sourced start line can be enriched
    // by the model's own report. A source:'tool' report already IS the model
    // speaking — debouncing it only widens the window in which the app's
    // stage-busy gate (a more urgent reaction showing) drops the say for
    // good. Announce immediately.
    if (state === 'running' && source !== 'tool') {
      this.pending.get(taskId)?.()
      this.pending.set(taskId, this.delay(() => {
        this.pending.delete(taskId)
        if (this.announced.get(taskId) !== 'running') return
        const fresh = this.reported.get(taskId)
        void this.announce({
          ...effective,
          // A report landing inside the debounce window replaces the subject;
          // a generic one stays subject-less rather than falling back to the
          // feed's summary — that fallback is exactly the stale-title bug.
          saySummary: fresh?.summary ?? saySummary,
          mood: fresh?.mood ?? effective.mood,
          eid,
        }, level, settings)
      }, RUNNING_DEBOUNCE_MS))
      this.log?.record({ channel: 'say', decision: 'debounced-start', eid, taskId, source, state, summary: effective.summary, provenance, delayMs: RUNNING_DEBOUNCE_MS })
      return
    }
    this.pending.get(taskId)?.()
    this.pending.delete(taskId)
    void this.announce({ ...effective, saySummary, eid }, level, settings)
  }

  /**
   * The say IS the notification — a bubble beats a bare expression change.
   * completed is excluded on purpose: the app's own report narration already
   * embeds the summary ("已完成 · …") with report priority, and a plugin say
   * would only repeat it in a second bubble.
   */
  async announce({ taskId, state, summary, saySummary, eid }, level, settings) {
    if (state === 'completed') return
    const sayText = sayLine(state, saySummary)
    // The wire layer (loggingBridge) records delivery; this record pins the
    // decision to speak with the exact line it chose — and the subject it
    // chose it FROM, so an audit can tell "said nothing because generic"
    // from "said nothing because there was never a summary". eid joins the
    // decision to the say-emit; delivery joins back on (taskId, sayText).
    this.log?.record({ channel: 'say', decision: 'say-emit', eid, taskId, state, summary, saySubject: saySummary, sayText, level })
    const result = await this.bridge.control({
      say: sayText,
      agent: settings.agentId,
      priority: stagePriorityFor(level),
      // Not for the stage — the app's control endpoint ignores unknown
      // fields; the wire log keys a delivered say back to its task by it.
      taskId,
    })
    // A say that never showed is a mystery unless someone records it: the
    // app's stage-busy gate answers 400 with a reason (a more urgent
    // reaction was showing) and the contract says DROP, not retry — so the
    // only honest place to keep the answer is the host log.
    if (result !== undefined && result !== null && result.ok !== true && result.status === 400) {
      const reason = Array.isArray(result.data?.rejected) ? result.data.rejected.join('; ') : 'rejected'
      console.error(`dsh-lingxi notify: say dropped by the pet (${reason}) — "${String(sayText).slice(0, 80)}"`)
    }
  }
}

/** Longest subject quoted without a sentence terminator, in characters. */
const QUOTE_MAX_CHARS = 12

/** A subject that is a key wearing a topic's clothes: optional session-like
 *  prefix, then only hex and dashes. Never quoted. */
const ID_SHAPED = /^(?:session-|task-|run-|child-)?[0-9a-f]{6,}(?:-[0-9a-f]+)*$/i

/** Steering words that name no subject. A one-word reply ("继续", "好的")
 *  is the user nudging the session along, not the work's name — quoted, it
 *  reads as the cat announcing "开始「继续」": an answer to nothing. */
const STOP_SUBJECTS = new Set([
  '继续', '接着', '接着来', '好的', '好', '好吧', '嗯', '嗯嗯', '行', '可以', '再来', '重试',
  '继续吧', '继续。', 'go', 'ok', 'okay', 'yes', 'continue',
])

/** Sentence enders that make a long subject safe to quote verbatim. */
const ENDS_READABLE = /[。！？；…〉」』）.)!?;]$/

/**
 * The quality gate for a WATCH-derived subject: may this string be quoted in
 * the cat's mouth at all? Watch subjects are session titles and id-slice
 * fallbacks, and three shapes of them read as broken in quotes:
 *
 *  - id-shaped ("session-d0a83757-89cf-49") — a key, not a topic;
 *  - mid-sentence fragments (a title cut off at "…当前这个猫咪会") — quoting
 *    them reads as the cat speaking in half sentences;
 *  - everything else that is long and ends without a terminator.
 *
 * Model reports (lingxi_task) are WRITTEN to be read aloud and skip this
 * gate — see handle(), where the two sources are composed. The task feed and
 * activity rows keep the full unfiltered title either way; the gate is about
 * the bubble's mouth only.
 */
export function readableSubject(summary) {
  if (typeof summary !== 'string') return undefined
  const subject = summary.trim()
  if (!subject) return undefined
  if (ID_SHAPED.test(subject)) return undefined
  if (STOP_SUBJECTS.has(subject) || STOP_SUBJECTS.has(subject.toLowerCase())) return undefined
  const chars = Array.from(subject)
  if (chars.length <= QUOTE_MAX_CHARS) return subject
  if (ENDS_READABLE.test(chars[chars.length - 1])) return subject
  return undefined
}

/** One sentence per attention state, in the cat's register — short, no drama.
 * Every line leads with WHAT the transition is about (the subject), because a
 * lifecycle announcement without its subject is noise: the whole point of the
 * bubble is that the user never has to ask "什么任务？".
 *
 * The subject arrives ALREADY GATED — handle() composes `saySummary` through
 * readableSubject and the watch's titleGeneric flag, because whether a string
 * may be quoted is a policy question (whose words are these? do they finish?),
 * not a formatting one. sayLine is the formatter: quote what you are given,
 * degrade to a subject-less line when given nothing.
 */
export function sayLine(state, summary) {
  const what = typeof summary === 'string' && summary.trim() ? summary.trim() : undefined
  const quoted = what ? `「${what}」` : ''
  switch (state) {
    case 'queued': return what ? `收到新任务：「${what}」` : '收到新任务，等我看看。'
    case 'running': return what ? `开始${quoted}，有进展我再吱声～` : '开工了，有进展我再吱声～'
    case 'needs_approval': return what ? `${quoted}需要你授权，我在等你点头。` : '有任务需要你授权，我在等你点头。'
    // A question wants an answer; a credential wait (需要凭据/登录) wants the
    // user at the keyboard — same attention state, different ask. The wait
    // kind is judged on the RAW summary (the plugin composes those openers),
    // while the quote still goes through the gate.
    case 'needs_input': return /^需要(凭据|登录)/.test(summary ?? '')
      ? `${summary}需要你来处理，我不动。`
      : what ? `${quoted}有个问题想问你。` : '有个问题想问你。'
    case 'blocked': return what ? `${quoted}卡住了，需要你看一眼。` : '有任务卡住了，需要你看一眼。'
    case 'failed': return what ? `${quoted}失败了，别慌，我记下了。` : '有任务失败了，别慌，我记下了。'
    case 'cancelled': return what ? `${quoted}取消了，先这样。` : '任务取消了，先这样。'
    default: return `${quoted}${state}`
  }
}
