/**
 * dsh-lingxi — the context watch: the cat notices the water rising.
 *
 * dsh projects per-session context occupancy as the `contextPressure`
 * session projection: `{ pressureTokens?, projectedTokens?, contextWindow? }`
 * (dsh-token-meter projection types — provider-anchored pressure paired with
 * the newest advertised route capacity). When `projectedTokens / contextWindow`
 * crosses the threshold, the cat says ONCE per crossing, at report priority:
 * "context is nearly full; after this step, tidy the memory". After a
 * compaction (or a model switch to a larger window) the ratio falls back
 * under the re-arm floor and the warning can fire again on the next rise —
 * which is the whole point: the reminder is useful exactly once per filling.
 *
 * The registry is optional (`ctx.get('sessionProjections')`): a host without
 * it simply has no water level to watch. Subscription is (re)attempted on
 * start and on every reconcile pass, so a registry that mounts later is
 * still picked up within a minute.
 */

/** Cross this projected-occupancy ratio → one report. */
export const PRESSURE_THRESHOLD = 0.8
/** Fall back under this to re-arm the warning for the next filling. */
export const PRESSURE_REARM = 0.5

/** How many per-session memories to keep. */
const ANNOUNCED_CAP = 64

/** Occupancy → percent, or null when the projection lacks either half. */
export function occupancyRatio(pressure) {
  if (pressure === null || typeof pressure !== 'object') return null
  const projected = Number(pressure.projectedTokens)
  const window = Number(pressure.contextWindow)
  if (!Number.isFinite(projected) || !Number.isFinite(window) || window <= 0) return null
  return Math.max(0, Math.min(1, projected / window))
}

export class ContextWatch {
  /**
   * @param {object} options
   * @param {object} options.ctx - the plugin Context (ctx.get).
   * @param {object} options.bridge - PetBridge bound to current settings.
   * @param {() => object} options.getSettings - current validated settings.
   * @param {{describe?: (sessionId: string) => string | null}} [options.taskWatch]
   *   the task watch, for the freshest honest subject per session — a session
   *   title freezes at birth, the user's latest ask does not.
   */
  constructor({ ctx, bridge, getSettings, taskWatch }) {
    this.ctx = ctx
    this.bridge = bridge
    this.getSettings = getSettings
    this.taskWatch = taskWatch
    this.disposeFns = []
    /** @type {Map<string, number>} sessionId → last announced ratio (0 when below threshold) */
    this.announced = new Map()
  }

  stop() {
    for (const dispose of this.disposeFns) {
      try {
        dispose()
      } catch { /* a disposer that throws must not stop the others */ }
    }
    this.disposeFns = []
    this.announced.clear()
  }

  /**
   * Subscribe to the projection change feed — idempotent, retried from the
   * reconcile sweep until the registry appears.
   * @returns {boolean} whether a subscription is in place.
   */
  ensureSubscribed() {
    if (this.disposeFns.length > 0) return true
    const projections = this.ctx?.get?.('sessionProjections')
    if (projections === undefined || typeof projections.onChanged !== 'function') return false
    try {
      this.disposeFns.push(projections.onChanged((session, key, value) => {
        if (key !== 'contextPressure') return
        try {
          this.evaluate(session?.id !== undefined ? String(session.id) : null, value)
        } catch (error) {
          console.error('dsh-lingxi context watch: evaluate failed:', error instanceof Error ? error.message : error)
        }
      }))
      return true
    } catch (error) {
      console.error('dsh-lingxi context watch: subscribe failed:', error instanceof Error ? error.message : error)
      return false
    }
  }

  /**
   * Reconcile half: evaluate every live session from the registry's state,
   * so a session that filled its context while no change event reached us
   * (plugin mounted mid-fill) is still caught within a minute.
   */
  sweep() {
    if (!this.ensureSubscribed()) return
    const projections = this.ctx?.get?.('sessionProjections')
    const sessions = this.ctx?.get?.('sessions')
    if (projections === undefined || typeof projections.stateOf !== 'function') return
    if (sessions === undefined || typeof sessions.list !== 'function') return
    for (const session of sessions.list()) {
      if (session === null || typeof session !== 'object' || session.id === undefined) continue
      let value
      try {
        value = projections.stateOf(session, 'contextPressure')
      } catch { /* a session mid-fork can refuse reads; the next sweep retries */ }
      this.evaluate(String(session.id), value)
    }
  }

  /**
   * One occupancy observation → at most one crossing report.
   * @param {string|null} sessionId
   * @param {unknown} pressure - the contextPressure projection value.
   */
  evaluate(sessionId, pressure) {
    if (sessionId === null) return
    const ratio = occupancyRatio(pressure)
    if (ratio === null) return
    const previous = this.announced.get(sessionId) ?? 0
    this.announced.set(sessionId, ratio)
    if (this.announced.size > ANNOUNCED_CAP) {
      const oldest = this.announced.keys().next().value
      if (oldest !== undefined) this.announced.delete(oldest)
    }
    const wasHot = previous >= PRESSURE_THRESHOLD
    const isHot = ratio >= PRESSURE_THRESHOLD
    if (isHot && !wasHot) void this.warn(sessionId, ratio)
  }

  /** The one warning, in the cat's register — a suggestion, not an alarm.
   * The subject is the session's freshest ask (the user's own latest words),
   * so the bubble says WHICH work is filling up, not just that something is. */
  async warn(sessionId, ratio) {
    const settings = this.getSettings()
    const percent = Math.round(ratio * 100)
    const subject = this.taskWatch?.describe?.(sessionId) ?? null
    const prefix = subject ? `「${subject}」` : '这个会话'
    await this.bridge.control({
      say: `${prefix}的上下文用到 ${percent}% 了，快满。这步跑完，整理一下记忆吧。`,
      agent: settings.agentId,
      priority: 'report',
    })
  }

  /** Live occupancy for the settings page: newest-known ratio per watched session. */
  snapshot() {
    return [...this.announced.entries()]
      .map(([sessionId, ratio]) => ({ sessionId, ratio }))
      .sort((a, b) => b.ratio - a.ratio)
      .slice(0, 8)
  }
}
