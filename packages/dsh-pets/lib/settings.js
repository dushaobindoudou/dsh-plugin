/**
 * dsh-pets — the shared pet settings store.
 *
 * One JSON file (~/.lingxi/pets-settings.json) holds every pet plugin's
 * user-facing settings, next to the app's own agent.json. The settings page
 * is the only writer; the file is small, the schema is closed, and every
 * field survives a hostile read: defaults win over garbage, and the garbage
 * itself is reported back so the settings page can show what it ignored.
 */
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { TASK_MOODS, TASK_STATES } from './vocab.js'
import { REMINDER_REPEAT_FLOOR_MINUTES } from './reminders.js'

/** The settings every pet plugin reads; dsh-lingxi owns the tools block. */
export const DEFAULT_PET_SETTINGS = {
  port: 47811,
  agentId: 'dsh',
  agentName: 'DSH Agent',
  agentBadge: 'DS',
  autoAnnounce: true,
  tools: {
    task: true,
    say: true,
    react: true,
    state: true,
    remember: true,
  },
  // Which task states are worth interrupting the user for, and how loudly
  // (silent/status/report/alert — the pet app's stage priorities). Merge of
  // DEFAULT_ATTENTION_POLICY + the user's edits.
  notify: {
    needs_approval: 'alert',
    needs_input: 'alert',
    blocked: 'report',
    failed: 'report',
  },
  // Declared standing reminders: "every N minutes, have the cat bring X up".
  // Managed by the host adapter (it diff-syncs them into the pet app); the
  // settings page is the only writer.
  reminders: [],
}

function cleanText(value, cap) {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (!trimmed) return null
  return Array.from(trimmed).slice(0, cap).join('')
}

function cleanId(value) {
  const id = cleanText(value, 64)
  return id && /^[\w.-]+$/.test(id) ? id : null
}

/**
 * Validate one DECLARED reminder (the settings-file shape: stable id + prose),
 * not the wire shape. The id is the settings-owned handle the host adapter
 * uses to delete/recreate on the pet app; it must exist and be stable.
 */
function cleanDeclaredReminder(entry) {
  if (entry === null || typeof entry !== 'object' || Array.isArray(entry)) return null
  const id = cleanId(entry.id)
  const title = cleanText(entry.title, 60)
  if (!id || !title) return null
  const detail = cleanText(entry.detail, 70) ?? ''
  const every = Number(entry.everyMinutes)
  const everyMinutes = Number.isFinite(every) && every > 0
    ? Math.max(REMINDER_REPEAT_FLOOR_MINUTES, Math.round(every))
    : null
  const mood = typeof entry.mood === 'string' && TASK_MOODS.includes(entry.mood) ? entry.mood : null
  const enabled = entry.enabled === undefined ? true : entry.enabled === true
  return { id, title, detail, everyMinutes, mood, enabled }
}

/**
 * Merge one raw read over the defaults. Returns the validated settings plus
 * what was thrown away, so the settings page can say "ignored: x" instead of
 * silently eating a user edit.
 */
export function validateSettings(raw) {
  const ignored = []
  const settings = structuredClone(DEFAULT_PET_SETTINGS)
  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) {
    if (raw !== undefined && raw !== null) ignored.push('(whole file: not an object)')
    return { settings, ignored }
  }
  for (const [key, value] of Object.entries(raw)) {
    switch (key) {
      case 'port':
        // Out of range falls back to the DEFAULT, not the boundary: a typo'd
        // "1" should read as "unset", not as a legitimate-looking 1024.
        settings.port = Number.isInteger(Number(value)) && Number(value) >= 1024 && Number(value) <= 65535
          ? Number(value)
          : DEFAULT_PET_SETTINGS.port
        break
      case 'agentId': {
        const id = cleanId(value)
        if (id) settings.agentId = id
        else if (value !== undefined) ignored.push('agentId')
        break
      }
      case 'agentName': {
        const name = cleanText(value, 24)
        if (name) settings.agentName = name
        else if (value !== undefined) ignored.push('agentName')
        break
      }
      case 'agentBadge': {
        const badge = cleanText(value, 2)
        if (badge) settings.agentBadge = badge
        else if (value !== undefined) ignored.push('agentBadge')
        break
      }
      case 'autoAnnounce':
        if (typeof value === 'boolean') settings.autoAnnounce = value
        else ignored.push('autoAnnounce')
        break
      case 'tools':
        if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
          for (const [tool, enabled] of Object.entries(value)) {
            if (tool in settings.tools && typeof enabled === 'boolean') settings.tools[tool] = enabled
            else ignored.push(`tools.${tool}`)
          }
        } else if (value !== undefined) ignored.push('tools')
        break
      case 'notify': {
        // Per-state loudness table. Unknown states/levels drop; the DEFAULT
        // fill happens in cleanAttentionPolicy's merge, not here.
        if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
          settings.notify = {}
          for (const [state, level] of Object.entries(value)) {
            if (TASK_STATES.includes(state) && ['silent', 'status', 'report', 'alert'].includes(level)) {
              if (level !== 'silent') settings.notify[state] = level
            } else if (value !== undefined) {
              ignored.push(`notify.${state}`)
            }
          }
        } else if (value !== undefined) ignored.push('notify')
        break
      }
      case 'reminders': {
        // Declared reminders; each entry validated through the same boundary
        // the pet app applies, so what is stored here is what would be sent.
        if (Array.isArray(value)) {
          settings.reminders = []
          value.forEach((entry, index) => {
            const cleaned = cleanDeclaredReminder(entry)
            if (cleaned) settings.reminders.push(cleaned)
            else ignored.push(`reminders.${index}`)
          })
        } else if (value !== undefined) ignored.push('reminders')
        break
      }
      default:
        ignored.push(key)
    }
  }
  return { settings, ignored }
}

/** Where the shared settings file lives for one home directory. */
export function settingsPath(home = homedir()) {
  return join(home, '.lingxi', 'pets-settings.json')
}

/**
 * Read + validate the shared settings. A missing file is the defaults; a
 * corrupt file is the defaults plus an error string — never a throw.
 */
export function readPetSettings(home = homedir()) {
  const path = settingsPath(home)
  if (!existsSync(path)) return { settings: structuredClone(DEFAULT_PET_SETTINGS), ignored: [], existed: false }
  try {
    const raw = JSON.parse(readFileSync(path, 'utf8'))
    const { settings, ignored } = validateSettings(raw)
    return { settings, ignored, existed: true }
  } catch (error) {
    return {
      settings: structuredClone(DEFAULT_PET_SETTINGS),
      ignored: [],
      existed: true,
      error: `pets-settings.json unreadable, using defaults: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

/** Atomic write (tmp + rename) of the validated settings. Returns the stored settings. */
export function writePetSettings(home, settings) {
  const path = settingsPath(home)
  const dir = join(path, '..')
  mkdirSync(dir, { recursive: true })
  const tmp = `${path}.tmp-${process.pid}`
  writeFileSync(tmp, `${JSON.stringify(settings, null, 2)}\n`, 'utf8')
  renameSync(tmp, path)
  return settings
}
