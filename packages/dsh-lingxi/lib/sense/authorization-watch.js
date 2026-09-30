/**
 * dsh-lingxi — the authorization watch: the third way dsh stops to wait for
 * the user.
 *
 * approval/request (a tool wants to exceed its grant) and user-questions
 * (the model asks) were covered; an authorization flow — an OAuth login, an
 * API key the model needs — stalls the work just as hard and was invisible.
 * The cat now reports it as `needs_input`, the same attention state as a
 * question, because from the user's seat it IS one: "get up and do this, or
 * nothing moves".
 *
 * Two paths, same discipline as everywhere else:
 *  - `authorization/settled` (emit) fires for every terminal outcome,
 *    failures included — the fast path out.
 *  - the reconcile sweep reads `authorization.list()`; an entry with
 *    `inFlight: true` is an attempt waiting on the human right now. There is
 *    no "started" event, so the sweep is the only way in — within a minute.
 *
 * AuthorizationEntry (dsh-authorization types):
 * `{ key, label, methods, inFlight }`; settlement is
 * `'authorized' | 'cancelled' | 'failed'`.
 */

/** Map one settlement, as an onlooker sees it, onto the pet's vocabulary. */
export function settledState(settlement) {
  if (settlement === 'authorized') return 'completed'
  if (settlement === 'failed') return 'failed'
  return 'cancelled'
}

/** The row title: what the user is being asked to produce. */
function titleOf(entry) {
  const label = typeof entry?.label === 'string' && entry.label.trim() ? entry.label.trim() : String(entry?.key ?? '')
  return `需要凭据：${Array.from(label).slice(0, 60).join('')}`
}

export class AuthorizationWatch {
  /**
   * @param {object} options
   * @param {object} options.ctx - the plugin Context (ctx.on, ctx.get).
   * @param {object} options.taskWatch - the TaskWatch whose registry and
   *   transition pipeline the wait rows ride on.
   */
  constructor({ ctx, taskWatch }) {
    this.ctx = ctx
    this.taskWatch = taskWatch
    this.started = false
    this.disposeFns = []
    /** Keys we reported as in-flight during the last sweep. */
    this.reported = new Set()
  }

  start() {
    if (this.started || this.ctx === undefined) return
    this.started = true
    if (typeof this.ctx.on === 'function') {
      this.disposeFns.push(this.ctx.on('authorization/settled', (...args) => {
        try {
          this.onSettled(...args)
        } catch (error) {
          console.error('dsh-lingxi authorization watch: settled handler failed:', error instanceof Error ? error.message : error)
        }
      }))
    }
  }

  stop() {
    for (const dispose of this.disposeFns) {
      try {
        dispose()
      } catch { /* a disposer that throws must not stop the others */ }
    }
    this.disposeFns = []
    this.reported = new Set()
    this.started = false
  }

  /** One attempt ended — settle the wait row we reported (if we did). */
  onSettled(key, settlement) {
    if (key === undefined || key === null) return
    this.reported.delete(String(key))
    this.taskWatch.settle(`auth:${key}`, settledState(settlement), 'authorization')
  }

  /**
   * The reconcile sweep half: report every in-flight attempt, and settle the
   * rows whose attempts ended without a settled event reaching us.
   */
  sweep() {
    const auth = this.ctx?.get?.('authorization')
    if (auth === undefined || typeof auth.list !== 'function') return
    let entries
    try {
      entries = auth.list()
    } catch { /* a registry mid-write refuses reads; the next sweep retries */ }
    if (!Array.isArray(entries)) return
    const inFlight = new Set()
    for (const entry of entries) {
      if (entry === null || typeof entry !== 'object' || entry.inFlight !== true) continue
      const key = entry.key === undefined || entry.key === null ? '' : String(entry.key)
      if (!key) continue
      inFlight.add(key)
      this.taskWatch.track(`auth:${key}`, {
        source: 'authorization',
        state: 'needs_input',
        title: titleOf(entry),
      })
    }
    for (const key of this.reported) {
      if (!inFlight.has(key)) {
        this.taskWatch.settle(`auth:${key}`, 'completed', 'authorization')
      }
    }
    this.reported = inFlight
  }
}
