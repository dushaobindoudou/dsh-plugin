/**
 * dsh-lingxi — the goal watch: the cat can see the objective, not just the churn.
 *
 * dsh exposes goals twice, and we use both paths on purpose (the same
 * events-plus-reconcile discipline as the task watch):
 *
 *  1. `goal/changed` for the moment a mutation commits — the payload is
 *     `{ agent, change: { operation, ref, goal?: GoalView } }`; a missing
 *     `goal` is a clear tombstone.
 *  2. The reconcile sweep re-reads `goals.get(agent)` for every live agent,
 *     so a goal that existed before the plugin mounted (or one event that
 *     was missed) becomes visible within a minute, and a goal row that was
 *     transiently settled by an idle agent is healed.
 *
 * A goal is tracked under its OWN task id (`goal:<sessionId>`), deliberately
 * separate from the agent's running row: the agent going idle between rounds
 * must not settle the objective, and the pet feed reads better with one row
 * that says "the goal, at round n/max".
 *
 * GoalView fields (dsh-goal types): objective, phase 'active'|'paused'|
 * 'blocked'|'complete', roundsStarted, maxGoalRounds, blockedReason?.
 * Progress is roundsStarted/maxGoalRounds — the pet's task-event contract
 * carries `progress: 0..1` natively.
 */

/** Map a durable GoalPhase onto the pet's task vocabulary. */
export function goalState(phase) {
  switch (phase) {
    case 'active': return 'running'
    case 'paused': return 'queued'
    case 'blocked': return 'blocked'
    case 'complete': return 'completed'
    default: return 'running'
  }
}

/** Round the objective down to what a bubble can carry. */
function titleOf(objective) {
  const text = typeof objective === 'string' ? objective.trim() : ''
  if (!text) return null
  return Array.from(text).slice(0, 80).join('')
}

/** roundsStarted / maxGoalRounds → 0..1, or undefined when the cap is unknown. */
export function goalProgress(goal) {
  const done = Number(goal?.roundsStarted)
  const max = Number(goal?.maxGoalRounds)
  if (!Number.isFinite(done) || !Number.isFinite(max) || max <= 0) return undefined
  return Math.max(0, Math.min(1, done / max))
}

export class GoalWatch {
  /**
   * @param {object} options
   * @param {object} options.ctx - the plugin Context (ctx.on, ctx.get).
   * @param {object} options.taskWatch - the TaskWatch whose registry and
   *   transition pipeline the goal rows ride on.
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
    const on = (event, handler) => {
      if (typeof this.ctx.on !== 'function') return
      this.disposeFns.push(this.ctx.on(event, (...args) => {
        try {
          const result = handler(...args)
          if (result instanceof Promise) result.catch((error) => {
            console.error(`dsh-lingxi goal watch: ${event} handler failed:`, error instanceof Error ? error.message : error)
          })
        } catch (error) {
          console.error(`dsh-lingxi goal watch: ${event} handler failed:`, error instanceof Error ? error.message : error)
        }
      }))
    }
    on('goal/changed', (payload) => { this.onGoalChanged(payload) })
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

  /** One committed goal mutation → a task row for the objective. */
  onGoalChanged(payload) {
    const agent = payload?.agent
    if (agent === undefined || agent === null || agent.id === undefined) return
    const taskId = `goal:${agent.id}`
    const goal = payload?.change?.goal
    if (goal === null || goal === undefined) {
      // Clear tombstone: the objective left the session.
      this.taskWatch.settle(taskId, 'cancelled', 'goal')
      return
    }
    this.applyGoal(taskId, goal)
  }

  /** Track the goal's current phase — or settle the row when it is done.
   * `discovered` marks the reconcile sweep path: the row and the feed ride,
   * but a goal the sweep FOUND running never gets an "开工了" nobody saw. */
  applyGoal(taskId, goal, discovered = false) {
    if (goal.phase === 'complete') {
      this.taskWatch.settle(taskId, 'completed', 'goal')
      return
    }
    this.taskWatch.track(taskId, {
      source: 'goal',
      state: goalState(goal.phase),
      title: titleOf(goal.objective),
      progress: goalProgress(goal),
      discovered,
    })
  }

  /**
   * The reconcile sweep half: re-read every live agent's current goal.
   * Runs inside the task watch's reconcile so the ordering holds — registries
   * are listed first, vanish-settling skips `goal:` rows, then this heals.
   */
  sweep() {
    const goals = this.ctx?.get?.('goals')
    const agents = this.ctx?.get?.('agents')
    if (goals === undefined || agents === undefined) return
    if (typeof goals.get !== 'function' || typeof agents.list !== 'function') return
    for (const agent of agents.list()) {
      if (agent === null || typeof agent !== 'object' || agent.id === undefined) continue
      const taskId = `goal:${agent.id}`
      let view
      try {
        view = goals.get(agent)
      } catch { /* an agent mid-death can refuse goal reads; the next sweep retries */ }
      if (view === null || view === undefined || typeof view !== 'object' || view.objective === undefined) {
        this.taskWatch.settle(taskId, 'cancelled', 'goal')
        continue
      }
      // Heal the transient flip: agent/idle settled the row, the goal is
      // still active — the objective outranks one quiet turn. A heal is a
      // discovery, not a start: the say stays quiet, the row heals.
      this.applyGoal(taskId, view, true)
    }
  }
}
