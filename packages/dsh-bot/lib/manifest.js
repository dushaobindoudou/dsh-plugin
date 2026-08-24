// Bot manifests: the single description of what a bot runs, where, and when.
//
//   {
//     "name": "nightly-tests",
//     "workspace": "/srv/app",
//     "schedule": "30 2 * * *",
//     "prompt": "run the test suite and summarize failures",
//     "profile": "headless",
//     "timeoutMs": 3600000,
//     "retries": 1
//   }
//
// Either "prompt" (wrapped as: dsh --profile <profile> "<prompt>") or
// "command" (array argv, or a string run through "sh -c") is required.
import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { parseCron } from './cron.js'

export const DEFAULT_PROFILE = 'headless'

export async function loadManifest(file) {
  let raw
  try {
    raw = await readFile(file, 'utf8')
  } catch (err) {
    throw new Error(`manifest unreadable: ${file} (${err.message})`)
  }
  let doc
  try {
    doc = JSON.parse(raw)
  } catch (err) {
    throw new Error(`manifest is not valid JSON: ${file} (${err.message})`)
  }
  if (doc === null || typeof doc !== 'object' || Array.isArray(doc)) {
    throw new Error(`manifest must be a JSON object: ${file}`)
  }
  return normalizeManifest(doc, file)
}

function num(value, field, errors, { min, int }) {
  if (typeof value !== 'number' || !Number.isFinite(value) || (int && !Number.isInteger(value))) {
    errors.push(`${field}: expected ${int ? 'an integer' : 'a number'}`)
    return undefined
  }
  if (value < min) {
    errors.push(`${field}: must be >= ${min}`)
    return undefined
  }
  return value
}

export function normalizeManifest(doc, source = '<inline>') {
  const errors = []

  const name = typeof doc.name === 'string' ? doc.name.trim() : ''
  if (!/^[a-z0-9][a-z0-9_-]{0,63}$/.test(name)) {
    errors.push('name: required slug, 1-64 chars of a-z 0-9 - _')
  }

  const hasPrompt = typeof doc.prompt === 'string' && doc.prompt.trim() !== ''
  const hasCommand = doc.command !== undefined
  if (!hasPrompt && !hasCommand) errors.push('exactly one of "prompt" or "command" is required')
  if (hasPrompt && hasCommand) errors.push('"prompt" and "command" are mutually exclusive')

  const profile =
    doc.profile === undefined || doc.profile === '' ? DEFAULT_PROFILE : String(doc.profile)

  let command
  if (hasCommand) {
    if (Array.isArray(doc.command)) {
      if (doc.command.length === 0 || typeof doc.command[0] !== 'string') {
        errors.push('command: expected a non-empty argv array or a shell string')
      } else {
        command = doc.command.map(String)
      }
    } else if (typeof doc.command === 'string') {
      command = doc.command.trim() === '' ? undefined : ['sh', '-c', doc.command]
      if (command === undefined) errors.push('command: shell string is empty')
    } else {
      errors.push('command: expected a non-empty argv array or a shell string')
    }
  } else if (hasPrompt) {
    command = ['dsh', '--profile', profile, doc.prompt]
  }

  let schedule = null
  if (doc.schedule !== undefined) {
    schedule = String(doc.schedule)
    try {
      parseCron(schedule)
    } catch (err) {
      errors.push(`schedule: ${err.message}`)
    }
  }

  const baseDir = source === '<inline>' ? process.cwd() : dirname(resolve(source))
  const workspace = doc.workspace === undefined ? baseDir : resolve(baseDir, doc.workspace)

  const timeoutMs = doc.timeoutMs === undefined ? 0 : num(doc.timeoutMs, 'timeoutMs', errors, { min: 1, int: true })
  const retries = doc.retries === undefined ? 0 : num(doc.retries, 'retries', errors, { min: 0, int: true })

  if (errors.length > 0) {
    throw new Error(`invalid manifest ${source}:\n  - ${errors.join('\n  - ')}`)
  }

  return {
    name,
    command,
    prompt: hasPrompt ? doc.prompt : null,
    profile,
    schedule,
    workspace,
    timeoutMs: timeoutMs ?? 0,
    retries: retries ?? 0,
    source,
  }
}
