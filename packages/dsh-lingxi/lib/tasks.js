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
 *  2. A slow RECONCILIATION (agents.list() + jobs.list() every RECONCILE_MS),
 *     because events can be missed (plugin mounted mid-run) and because
 *     "what is running NOW" must stay true even if one listener threw.
 *
 * The watch owns NO policy: it derives state and calls the `onTransition`
 * hook; whether a state is worth interrupting the user for lives in the
 * attention policy (dsh-pets policy.js + the notify module). Every listener
 * is individually guarded — one bad payload must not take the watchdog down.
 */
import { sessionTitleFor } from './title.js'

/** How often the reconcile sweep runs. Events are the fast path; this is the truth sweep. */
export const RECONCILE_MS = 60_000

/** Cap on tracked entries so a chatty host cannot grow the map forever. */
const TRACKED_CAP = 64

/** Map one dsh source onto the pet's task-kind vocabulary. */
function kindOf(source) {
  switch (source) {
    case 'agent': return 'other'
    case 'subagent': return 'search'
    case 'workflow': return 'build'
    case 'job': return 'test'
    case 'approval': return 'other'
    case 'question': return 'chat'
    default: return 'other'
  }
}

/**
 * @param {object} options
 * @param {object} options.ctx - the plugin Context (ctx.on, ctx.effect, ctx.get).
 * @param {object} options.bridge - a PetBridge bound to current settings.
 * @param {() => object} options.getSettings - current validated settings.
 * @param {(transition: {taskId: string, state: string, kind: string, summary: string, source: string}) => void} [options.onTransition]
 */
export class TaskWatch {
  constructor({ ctx, bridge, getSettings, onTransition }) {
    this.ctx = ctx
    this.bridge = bridge
    this.getSettings = getSettings
    this.onTransition = onTransition
    /** @type {Map<string, {title: string, kind: string, state: string, since: number, source: string}>} */
    this.tracked = new Map()
    this.started = false
    this.disposeFns = []
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
      if (payload.status === 'running') this.track(agent.id, { source: 'agent', state: 'running' })
      else this.settle(agent.id, 'completed', 'agent')
    })
    on('agent/error', (payload) => {
      const agent = payload?.agent
      if (agent === undefined || agent === null) return
      this.settle(agent.id, 'failed', 'agent', `第 ${payload?.step ?? '?'} 步出错`)
    })
    on('subagent/start', (info) => {
      if (info?.sessionId !== undefined) this.track(info.sessionId, { source: 'subagent', state: 'running', title: info?.label })
    })
    on('subagent/end', (info) => {
      if (info?.sessionId === undefined) return
      const failed = info?.outcome !== undefined && info.outcome !== 'completed'
      this.settle(info.sessionId, failed ? 'failed' : 'completed', 'subagent')
    })
    on('workflow/start', (info) => {
      if (info?.runId !== undefined) this.track(info.runId, { source: 'workflow', state: 'running', title: info?.name })
    })
    on('workflow/end', (info, result) => {
      if (info?.runId === undefined) return
      const reason = result?.stopReason ?? result?.reason
      this.settle(info.runId, reason === 'completed' ? 'completed' : 'cancelled', 'workflow')
    })
    on('api-session/status', (sessionId, running) => {
      if (sessionId === undefined || sessionId === null) return
      if (running) this.track(sessionId, { source: 'agent', state: 'running' })
      else this.settle(sessionId, 'completed', 'agent')
    })

    // --- the attention waterfalls: observe, then pass through untouched ---
    on('approval/request', async (payload, next) => {
      const agent = payload?.agent
      if (agent !== undefined && agent !== null) {
        this.track(agent.id, { source: 'agent', state: 'needs_approval', title: `等待授权：${describeApproval(payload)}` })
      }
      return next()
    })
    on('user-questions/request', async (payload, next) => {
      const agent = payload?.agent ?? payload?.request?.agent
      if (agent !== undefined && agent !== null) {
        this.track(agent.id, { source: 'agent', state: 'needs_input', title: '等待你的回答' })
      }
      return next()
    })

    // --- the truth sweep ---
    this.disposeFns.push(this.ctx.timer?.interval
      ? this.ctx.timer.interval(() => this.reconcile(), RECONCILE_MS)
      : setInterval(() => this.reconcile(), RECONCILE_MS).unref?.() ?? (() => {}))
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

  /** One task entered a state. Registers it and reports the transition. */
  track(taskId, { source, state, title }) {
    const previous = this.tracked.get(taskId)
    const entry = {
      title: title ?? previous?.title ?? this.deriveTitle(taskId) ?? String(taskId).slice(0, 24),
      kind: kindOf(source),
      state,
      since: previous?.since ?? Date.now(),
      source,
    }
    this.tracked.set(taskId, entry)
    if (this.tracked.size > TRACKED_CAP) {
      const oldest = [...this.tracked.entries()].sort((a, b) => a[1].since - b[1].since)[0]
      if (oldest !== undefined && oldest[0] !== taskId) this.tracked.delete(oldest[0])
    }
    if (previous === undefined || previous.state !== state) this.emit(taskId, entry)
  }

  /** One task left the running set (or died). */
  settle(taskId, state, source, note) {
    const previous = this.tracked.get(taskId)
    if (previous === undefined) return
    const entry = { ...previous, state, kind: kindOf(source), source }
    this.tracked.set(taskId, entry)
    this.emit(taskId, { ...entry, summary: note })
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
   * The reconcile sweep: ask the registries what is actually alive, mark
   * everything found as running, settle everything tracked-but-gone.
   */
  async reconcile() {
    const agentsSvc = this.ctx.get('agents')
    const jobsSvc = this.ctx.get('jobs')
    const seen = new Set()
    if (agentsSvc !== undefined && typeof agentsSvc.list === 'function') {
      for (const agent of agentsSvc.list()) {
        const id = agent?.id ?? agent?.sessionId
        if (id === undefined || id === null) continue
        seen.add(String(id))
        this.track(String(id), { source: 'agent', state: 'running' })
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
        this.track(`job:${id}`, { source: 'job', state: 'running', title: job.kind ?? job.label })
      }
    }
    for (const [taskId, entry] of this.tracked) {
      if (entry.state === 'running' && !seen.has(taskId) && !taskId.startsWith('job:')) {
        // Events settle tasks explicitly; a running task that vanished from
        // every registry without an event gets settled here.
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
        summary: entry.title,
        source: entry.source,
      })
    } catch (error) {
      console.error('dsh-lingxi task watch: transition hook failed:', error instanceof Error ? error.message : error)
    }
  }
}

function describeApproval(payload) {
  const candidates = [payload?.subject, payload?.title, payload?.tool, payload?.name, payload?.kind]
  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.trim()) return Array.from(candidate.trim()).slice(0, 24).join('')
  }
  return '一个操作'
}
