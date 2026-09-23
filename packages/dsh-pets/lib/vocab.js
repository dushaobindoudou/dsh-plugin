/**
 * dsh-pets — the task vocabulary every desktop-pet plugin shares.
 *
 * One list per dimension, and every boundary crossing goes through
 * `cleanTaskEvent`: unknown values are DROPPED, not corrected. A pet that
 * invents its own state word splits the user's event stream into dialects,
 * and the reaction tables (assets/reactions.json on the pet side) can only
 * match the words everyone agreed on.
 */

/** The task lifecycle. The pet app validates this list server-side. */
export const TASK_STATES = [
  'queued',
  'running',
  'blocked',
  'needs_input',
  'needs_approval',
  'completed',
  'failed',
  'cancelled',
]

/** What kind of work the event is about. */
export const TASK_KINDS = [
  'build',
  'test',
  'deploy',
  'review',
  'search',
  'write',
  'chat',
  'other',
]

/**
 * How the work FEELS. This is the field only the model can fill — the
 * reaction tables respond to the mood, not to a mirror of it: a person
 * losing to a flaky test does not need a pet losing with them.
 */
export const TASK_MOODS = [
  'focused',
  'proud',
  'tender',
  'sad',
  'frustrated',
  'anxious',
  'weary',
  'playful',
  'curious',
]

/** Character caps mirror the bridge's own — matching them here saves a round trip. */
const SUMMARY_CAP = 240
const TASK_ID_CAP = 128
const AGENT_CAP = 64

function firstString(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function clamp(value, low, high) {
  return Math.max(low, Math.min(high, value))
}

/**
 * Validate one outbound task event against the vocabularies. Returns a
 * smallest-owned plain object, or null when the event has no meaning for a
 * pet (no state, or a state outside the list). Never throws.
 *
 * @param {unknown} event - {state, kind?, mood?, summary?, taskId?, progress?, agent?}
 * @param {string} provider - the stable identity this plugin reports as.
 * @returns {object | null}
 */
export function cleanTaskEvent(event, provider) {
  if (event === null || typeof event !== 'object') return null
  const state = firstString(event.state)
  if (!TASK_STATES.includes(state)) return null
  const out = { state, provider: String(provider).slice(0, AGENT_CAP) }
  const kind = firstString(event.kind)
  if (TASK_KINDS.includes(kind)) out.kind = kind
  const mood = firstString(event.mood)
  if (TASK_MOODS.includes(mood)) out.mood = mood
  if (typeof event.progress === 'number' && Number.isFinite(event.progress)) {
    out.progress = clamp(event.progress, 0, 1)
  }
  const summary = firstString(event.summary)
  if (summary) out.summary = Array.from(summary).slice(0, SUMMARY_CAP).join('')
  const taskId = firstString(event.taskId)
  if (taskId) out.taskId = Array.from(taskId).slice(0, TASK_ID_CAP).join('')
  const agent = firstString(event.agent)
  if (agent) out.agent = Array.from(agent).slice(0, AGENT_CAP).join('')
  return out
}
