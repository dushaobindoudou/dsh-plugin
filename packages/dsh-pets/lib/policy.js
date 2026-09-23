/**
 * dsh-pets — the attention policy: which task states are worth interrupting
 * the user for, and how loudly.
 *
 * This is a PET-CONTRACT question, not a host question: every host adapter
 * (dsh, claude, codex, …) answers "is this state something the user must
 * hear about now?" through the same table, so the cat's attention economics
 * stay consistent no matter who is talking. The state names come from
 * TASK_STATES; the level names map onto the pet app's stage priorities
 * (ambient/status/report/alert) so a level IS a loudness, not a new idea.
 *
 * The DEFAULT table is deliberately small — attention is a budget:
 *  - needs_approval: the work is stopped waiting for the user (alert)
 *  - needs_input:    the model asked the user a question (alert)
 *  - blocked:        the work cannot proceed (report)
 *  - failed:         the work stopped badly (report)
 * Everything else (running, completed, …) is visible through task events
 * without an extra nudge — the bubble already carries it.
 */
import { TASK_STATES } from './vocab.js'

/** The pet app's stage-priority ladder, in increasing loudness. */
export const ATTENTION_LEVELS = ['silent', 'status', 'report', 'alert']

/** States that get an explicit user-facing nudge by default, with loudness. */
export const DEFAULT_ATTENTION_POLICY = Object.freeze({
  needs_approval: 'alert',
  needs_input: 'alert',
  blocked: 'report',
  failed: 'report',
})

/** States known to the vocabulary but never nudged about by default. */
export const SILENT_STATES = Object.freeze(['running', 'completed', 'cancelled', 'queued', 'other'])

/**
 * Normalize a user-supplied policy into `{ state: level }`, keeping only
 * known states and known levels. Unknown entries are DROPPED, not corrected
 * — the same boundary rule cleanTaskEvent applies.
 *
 * @param {unknown} raw - e.g. { needs_approval: 'alert', completed: 'silent', typo: 'x' }
 * @param {string[]} [ignored] - collector for dropped keys.
 * @returns {Record<string, string>} the cleaned policy (possibly empty).
 */
export function cleanAttentionPolicy(raw, ignored) {
  const out = {}
  if (raw === null || raw === undefined || typeof raw !== 'object' || Array.isArray(raw)) return out
  for (const [state, level] of Object.entries(raw)) {
    if (!TASK_STATES.includes(state)) {
      if (ignored) ignored.push(state)
      continue
    }
    if (!ATTENTION_LEVELS.includes(level)) {
      if (ignored) ignored.push(state)
      continue
    }
    if (level === 'silent') continue // silent means "absent from the nudge table"
    out[state] = level
  }
  return out
}

/**
 * How loudly should this state transition be announced?
 *
 * @param {string} state - a TASK_STATES member (unknown → null).
 * @param {Record<string, string>} [policy] - merged policy; defaults apply when absent.
 * @returns {string|null} an ATTENTION_LEVELS member, or null (no nudge).
 *   'silent' normalizes to null: it means "explicitly no nudge", which for
 *   callers is the same as absent — but kept distinct in the table so a user
 *   can silence a default without knowing the defaults.
 */
export function attentionLevel(state, policy) {
  const table = { ...DEFAULT_ATTENTION_POLICY, ...(policy ?? {}) }
  const level = table[state]
  if (!ATTENTION_LEVELS.includes(level) || level === 'silent') return null
  return level
}

/**
 * Map an attention level onto the pet app's stage priority for the say that
 * rides along with the task event. alert → alert, report → report, anything
 * else → status (visible without stealing the stage).
 */
export function stagePriorityFor(level) {
  if (level === 'alert' || level === 'report') return level
  return 'status'
}
