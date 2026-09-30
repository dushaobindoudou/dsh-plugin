/**
 * dsh-lingxi — the job watch: background work reported the moment it settles.
 *
 * The task watch's 60s reconcile already tracks running jobs as a truth
 * sweep, but a job that finished 59 seconds ago made the cat silent while
 * the user waited. dsh's job registry has real listeners:
 *
 *  - `onJobDone(snapshot, owner)` fires for every terminal outcome — the
 *    fast path OUT (completed / killed / failed all arrive here).
 *  - `onJobsChanged(owner)` fires when the job set changes — used as the
 *    fast path IN: one `list()` pass tracks newly started jobs immediately
 *    instead of waiting for the next reconcile tick.
 *
 * JobSnapshot (dsh-jobs types): { id, kind, label, status:
 * 'running'|'stopping'|'completed'|'killed'|'failed', detail?, startedAt,
 * finishedAt?, reported }. Rows use the same `job:<id>` taskIds the task
 * watch's reconcile uses, so both paths converge on one row per job.
 */

/** Map a terminal JobStatus onto the pet's task vocabulary. */
export function settledJobState(status) {
  if (status === 'completed') return 'completed'
  if (status === 'failed') return 'failed'
  // killed (or stopping that somehow lands here) is a human decision, not a crash.
  return 'cancelled'
}

export class JobWatch {
  /**
   * @param {object} options
   * @param {object} options.ctx - the plugin Context (ctx.get).
   * @param {object} options.taskWatch - the TaskWatch whose registry and
   *   transition pipeline the job rows ride on.
   */
  constructor({ ctx, taskWatch }) {
    this.ctx = ctx
    this.taskWatch = taskWatch
    this.started = false
    this.disposeFns = []
  }

  start() {
    if (this.started || this.ctx === undefined) return
    this.started = true
    this.ensureSubscribed()
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
   * Subscribe to the registry's listeners — idempotent, retried from the
   * reconcile sweep until the service appears (the plugin can mount before
   * the job registry does).
   * @returns {boolean} whether a subscription is in place.
   */
  ensureSubscribed() {
    if (this.disposeFns.length > 0) return true
    const jobs = this.jobsService()
    if (jobs === undefined) return false
    if (typeof jobs.onJobDone === 'function') {
      try {
        this.disposeFns.push(jobs.onJobDone((snapshot) => {
          try {
            this.onJobDone(snapshot)
          } catch (error) {
            console.error('dsh-lingxi job watch: done handler failed:', error instanceof Error ? error.message : error)
          }
        }))
      } catch (error) {
        console.error('dsh-lingxi job watch: subscribe(onJobDone) failed:', error instanceof Error ? error.message : error)
      }
    }
    if (typeof jobs.onJobsChanged === 'function') {
      try {
        this.disposeFns.push(jobs.onJobsChanged(() => {
          try {
            // The registry just changed under a live subscription: a job
            // that appeared is an observed start, not a discovery.
            this.syncRunning(false)
          } catch (error) {
            console.error('dsh-lingxi job watch: changed handler failed:', error instanceof Error ? error.message : error)
          }
        }))
      } catch (error) {
        console.error('dsh-lingxi job watch: subscribe(onJobsChanged) failed:', error instanceof Error ? error.message : error)
      }
    }
    return this.disposeFns.length > 0
  }

  /** Reconcile half: retry subscription, then refresh the running rows. */
  sweep() {
    this.ensureSubscribed()
    this.syncRunning(true)
  }

  jobsService() {
    const jobs = this.ctx?.get?.('jobs')
    return jobs !== undefined && jobs !== null && typeof jobs === 'object' ? jobs : undefined
  }

  /** One job settled — clear its row the moment it happens. */
  onJobDone(snapshot) {
    if (snapshot === null || typeof snapshot !== 'object' || snapshot.id === undefined) return
    const id = String(snapshot.id)
    // The row's title already leads with the job label; the note adds only
    // the cause. settle() composes them into one summary.
    const note = typeof snapshot.detail === 'string' && snapshot.detail.trim() ? snapshot.detail.trim() : undefined
    this.taskWatch.settle(`job:${id}`, settledJobState(snapshot.status), 'job', note)
  }

  /** Fast path in: one registry pass, every running job becomes a row now.
   * `discovered` (the reconcile path) rides the feed but never says — a job
   * the sweep found was not observed starting. */
  syncRunning(discovered = false) {
    const jobs = this.jobsService()
    if (jobs === undefined || typeof jobs.list !== 'function') return
    let entries
    try {
      entries = jobs.list()
    } catch { /* a registry mid-write refuses reads; the reconcile sweep retries */ }
    if (!Array.isArray(entries)) return
    for (const job of entries) {
      if (job === null || typeof job !== 'object') continue
      if (job.status !== 'running' && job.status !== 'stopping') continue
      const id = String(job.id ?? '')
      if (!id) continue
      this.taskWatch.track(`job:${id}`, {
        source: 'job',
        state: 'running',
        title: job.label ?? job.kind,
        discovered,
      })
    }
  }
}
