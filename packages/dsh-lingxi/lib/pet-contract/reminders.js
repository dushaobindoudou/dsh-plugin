/**
 * dsh-pets — the reminder contract.
 *
 * Reminders are how a host asks the pet to bring something up LATER: "when
 * the scheduled run lands, check the deploy status". The pet app owns the
 * clock (it checks once a minute and re-arms standing reminders), so a host
 * never schedules anything itself — it declares what and how often, and the
 * cat remembers.
 *
 * The app's POST /reminders assigns its own id, so a host that wants to
 * manage its reminders over time needs a stable KEY it controls: the TEXT.
 * `reminderText` builds a deterministic, prefix-marked text so the host can
 * find its own entries in GET /reminders and diff-sync them (delete the
 * stale, post the changed) without an id it was never given.
 */
import { TASK_MOODS } from './vocab.js'

/** The app truncates at 140; we pre-truncate to keep texts byte-identical across syncs. */
export const REMINDER_TEXT_CAP = 140

/** The marker every host-authored reminder carries, so GET /reminders can be filtered. */
export const REMINDER_MARKER = '[灵犀]'

/** The app floors standing reminders at 5 minutes; mirror that here so a sync never disagrees. */
export const REMINDER_REPEAT_FLOOR_MINUTES = 5

/**
 * Build the deterministic reminder text: `[灵犀] title — detail`.
 *
 * The text IS the sync key. Same title+detail in, same text out — even after
 * a settings reload — which is what makes "find mine in the app's list, then
 * diff" reliable. Falls back to title-only when there is no detail.
 *
 * @param {{title: string, detail?: string}} entry
 * @returns {string}
 */
export function reminderText(entry) {
  const title = Array.from(String(entry?.title ?? '').trim()).slice(0, 60).join('')
  const detail = Array.from(String(entry?.detail ?? '').trim()).slice(0, 70).join('')
  const body = detail ? `${title} — ${detail}` : title
  return Array.from(`${REMINDER_MARKER} ${body}`).slice(0, REMINDER_TEXT_CAP).join('')
}

/**
 * Clean one reminder into the app's POST /reminders shape. IDEMPOTENT: an
 * already-clean shape ({text, …}) passes through re-validated, so callers
 * can clean once and hand the result to PetBridge.remind() — which cleans
 * again defensively — without corruption.
 *
 * Accepts the declarative shape ({title, detail?, everyMinutes?, inMinutes?})
 * and returns `{text, inMinutes?, repeatEveryMinutes?, mood?}` — or null when
 * the entry has nothing the pet can act on.
 *
 * @param {unknown} raw
 * @param {string[]} [ignored] - collector for dropped field names.
 */
export function cleanReminder(raw, ignored) {
  if (raw === null || raw === undefined || typeof raw !== 'object' || Array.isArray(raw)) {
    if (ignored) ignored.push('(not an object)')
    return null
  }
  const entry = raw

  // Already-clean pass-through: keep the marker text, re-validate the rest.
  if (typeof entry.text === 'string' && entry.title === undefined) {
    const text = Array.from(entry.text.trim()).slice(0, REMINDER_TEXT_CAP).join('')
    if (!text.startsWith(REMINDER_MARKER)) {
      if (ignored) ignored.push('text')
      return null
    }
    const out = { text }
    const every = Number(entry.repeatEveryMinutes)
    if (Number.isFinite(every) && every > 0) out.repeatEveryMinutes = Math.max(REMINDER_REPEAT_FLOOR_MINUTES, Math.round(every))
    const delay = Number(entry.inMinutes)
    if (Number.isFinite(delay) && delay > 0) out.inMinutes = Math.round(delay)
    const mood = typeof entry.mood === 'string' && TASK_MOODS.includes(entry.mood) ? entry.mood : null
    if (mood !== null) out.mood = mood
    return out
  }

  const text = reminderText(entry)
  if (Array.from(text.replace(REMINDER_MARKER, '').trim()).filter((c) => c !== '—').join('').length === 0) {
    if (ignored) ignored.push('title')
    return null
  }
  const out = { text }

  const every = Number(entry.everyMinutes)
  if (Number.isFinite(every) && every > 0) {
    out.repeatEveryMinutes = Math.max(REMINDER_REPEAT_FLOOR_MINUTES, Math.round(every))
  }

  const delay = Number(entry.inMinutes)
  if (Number.isFinite(delay) && delay > 0) {
    out.inMinutes = Math.round(delay)
  } else if (entry.dueAt !== undefined && entry.dueAt !== null) {
    const due = Number(entry.dueAt)
    if (Number.isInteger(due) && due > 0) out.dueAt = due
  }

  const mood = typeof entry.mood === 'string' && TASK_MOODS.includes(entry.mood) ? entry.mood : 'focused'
  if (mood !== 'focused') out.mood = mood

  // A standing reminder needs no delay; a one-shot needs one of the two.
  if (out.repeatEveryMinutes === undefined && out.inMinutes === undefined && out.dueAt === undefined) {
    out.inMinutes = 1 // default: bring it up on the next sweep
  }
  // The app requires a first due EVEN for standing reminders (POST /reminders
  // answers 400 "dueAt or inMinutes is required" otherwise). First fire one
  // period out — "every 30 minutes" first pops in 30 — then the app re-arms.
  if (out.repeatEveryMinutes !== undefined && out.inMinutes === undefined && out.dueAt === undefined) {
    out.inMinutes = out.repeatEveryMinutes
  }
  return out
}

/**
 * True when a GET /reminders entry belongs to this host's sync set: the text
 * carries the marker. `text` is the only field guaranteed across app versions.
 *
 * @param {{text?: string}} entry
 */
export function isManagedReminder(entry) {
  return entry !== null && typeof entry === 'object' && typeof entry.text === 'string'
    && entry.text.startsWith(REMINDER_MARKER)
}
