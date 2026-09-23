/**
 * dsh-pets — smoke test. Plain Node, no harness: proves the vocabulary
 * cleaner, the settings store, and the bridge client against a stub HTTP
 * server. Ends with an explicit process.exit on BOTH paths — the pet
 * client half keeps a Node process alive by existing.
 */
import { createServer } from 'node:http'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { PetBridge } from './lib/bridge.js'
import { attentionLevel, cleanAttentionPolicy, stagePriorityFor } from './lib/policy.js'
import { REMINDER_MARKER, cleanReminder, isManagedReminder, reminderText } from './lib/reminders.js'
import { DEFAULT_PET_SETTINGS, readPetSettings, validateSettings, writePetSettings } from './lib/settings.js'
import { TASK_MOODS, TASK_STATES, cleanTaskEvent } from './lib/vocab.js'

const failures = []
function check(name, condition, detail) {
  if (condition) console.log(`✔ ${name}`)
  else {
    failures.push(name)
    console.error(`✗ ${name}${detail ? ` — ${detail}` : ''}`)
  }
}

// ---------- vocab ----------
check('cleanTaskEvent keeps a valid event', (() => {
  const clean = cleanTaskEvent({ state: 'completed', kind: 'test', mood: 'proud', summary: 'done' }, 'dsh')
  return clean !== null && clean.state === 'completed' && clean.provider === 'dsh' && clean.kind === 'test'
})())

check('cleanTaskEvent drops invented states', cleanTaskEvent({ state: 'vibing' }, 'dsh') === null)
check('cleanTaskEvent drops junk input', cleanTaskEvent('hello', 'dsh') === null && cleanTaskEvent(null, 'dsh') === null)
check('cleanTaskEvent clamps progress and caps summary', (() => {
  const clean = cleanTaskEvent({ state: 'running', progress: 7, summary: 'x'.repeat(999) }, 'dsh')
  return clean.progress === 1 && clean.summary.length === 240
})())
check('the vocabularies match the pet app contract', TASK_STATES.length === 8 && TASK_STATES.includes('needs_approval') && TASK_MOODS.length === 9)

// ---------- attention policy ----------
check('needs_approval is an alert by default', attentionLevel('needs_approval') === 'alert')
check('running never nudges by default', attentionLevel('running') === null)
check('invented states never nudge', attentionLevel('vibing') === null)
check('user policy overrides the default table', attentionLevel('completed', { completed: 'report' }) === 'report')
check('user can silence a default', attentionLevel('failed', { failed: 'silent' }) === null)
check('unknown policy entries are dropped and reported', (() => {
  const ignored = []
  const cleaned = cleanAttentionPolicy({ needs_approval: 'alert', completed: 'louder', fakestate: 'alert' }, ignored)
  return cleaned.needs_approval === 'alert' && !('completed' in cleaned) && ignored.includes('completed') && ignored.includes('fakestate')
})())
check('levels map onto stage priorities', stagePriorityFor('alert') === 'alert' && stagePriorityFor('report') === 'report' && stagePriorityFor('silent') === 'status')

// ---------- reminders ----------
check('reminder text is deterministic and marker-prefixed', reminderText({ title: '检查部署', detail: 'staging 状态' }) === `${REMINDER_MARKER} 检查部署 — staging 状态`)
check('reminder text is idempotent across calls', reminderText({ title: 'x' }) === reminderText({ title: 'x', detail: undefined }))
check('cleanReminder floors repeat at the app floor', cleanReminder({ title: 'x', everyMinutes: 1 }).repeatEveryMinutes === 5)
check('cleanReminder defaults a one-shot delay', cleanReminder({ title: 'x' }).inMinutes === 1)
check('cleanReminder refuses an empty title', cleanReminder({ title: '   ' }) === null)
check('cleanReminder keeps a valid mood, drops an invalid one', cleanReminder({ title: 'x', mood: 'curious' }).mood === 'curious' && cleanReminder({ title: 'x', mood: 'zzz' }).mood === undefined)
check('managed detection keys on the marker text', isManagedReminder({ text: `${REMINDER_MARKER} hi` }) === true && isManagedReminder({ text: 'hi' }) === false)

// ---------- settings ----------
const home = mkdtempSync(join(tmpdir(), 'dsh-pets-smoke-'))
try {
  const first = readPetSettings(home)
  check('missing file reads as defaults', first.existed === false && first.settings.port === DEFAULT_PET_SETTINGS.port && first.settings.agentId === 'dsh')

  writePetSettings(home, { ...first.settings, port: 5000, agentName: '测试猫', autoAnnounce: false, tools: { ...first.settings.tools, say: false } })
  const second = readPetSettings(home)
  check('write then read round-trips', second.settings.port === 5000 && second.settings.agentName === '测试猫' && second.settings.autoAnnounce === false && second.settings.tools.say === false)

  const hostile = validateSettings({ port: 'attack', agentId: '../etc', agentName: 42, autoAnnounce: 'yes', tools: { task: 'no', zombie: true }, extra: 1 })
  check('hostile settings fall back field by field', hostile.settings.port === DEFAULT_PET_SETTINGS.port && hostile.settings.agentId === DEFAULT_PET_SETTINGS.agentId && hostile.settings.autoAnnounce === DEFAULT_PET_SETTINGS.autoAnnounce && hostile.settings.tools.task === true)
  check('hostile settings report what was ignored', hostile.ignored.includes('extra') && hostile.ignored.includes('autoAnnounce') && hostile.ignored.includes('agentId'))

  // notify + reminders settings blocks
  const notify = validateSettings({ notify: { needs_approval: 'alert', completed: 'report', nonsense: 'alert', failed: 'louder' }, reminders: [{ id: 'deploy', title: '检查部署', everyMinutes: 30, mood: 'curious' }, { title: '' }, 'junk'] })
  check('notify keeps known state/level pairs only', notify.settings.notify.needs_approval === 'alert' && notify.settings.notify.completed === 'report' && !('nonsense' in notify.settings.notify) && !('failed' in notify.settings.notify))
  check('reminders keep well-formed declarations', notify.settings.reminders.length === 1 && notify.settings.reminders[0].id === 'deploy' && notify.settings.reminders[0].everyMinutes === 30 && notify.settings.reminders[0].mood === 'curious')
  check('reminder declarations floor everyMinutes', validateSettings({ reminders: [{ id: 'a', title: 'x', everyMinutes: 2 }] }).settings.reminders[0].everyMinutes === 5)

  // ---------- bridge against a stub server ----------
  const seen = { headers: null, body: null, path: null, method: null }
  const server = createServer((req, res) => {
    let data = ''
    req.on('data', (c) => { data += c })
    req.on('end', () => {
      seen.path = req.url
      seen.method = req.method
      seen.headers = req.headers
      seen.body = data
      if (req.url === '/health') {
        res.setHeader('Content-Type', 'application/json')
        res.end('{"ok":true,"pet":"灵犀"}')
      } else if (req.url === '/task-event' && req.method === 'POST') {
        res.statusCode = req.headers.authorization === 'Bearer tok-123' ? 200 : 401
        res.end('{"ok":true,"recorded":true}')
      } else if (req.url === '/reminders' && req.method === 'POST') {
        res.end('{"ok":true,"id":"r1-1"}')
      } else if (req.url === '/reminders' && req.method === 'GET') {
        res.end('[]')
      } else if (req.url?.startsWith('/reminders/') && req.method === 'DELETE') {
        res.end('{"ok":true,"removed":"x"}')
      } else {
        res.statusCode = 404
        res.end('{"error":"no such route"}')
      }
    })
  })
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  const port = server.address().port
  const bridge = new PetBridge({ port, token: 'tok-123' })

  const health = await bridge.health()
  check('health parses the stub response', health.ok === true && health.data.pet === '灵犀')

  const posted = await bridge.taskEvent({ state: 'completed', mood: 'proud', summary: 'smoke' }, 'dsh')
  check('task-event sends the token header', posted.ok === true && seen.headers.authorization === 'Bearer tok-123')
  check('task-event posts the cleaned event', JSON.parse(seen.body).state === 'completed' && seen.method === 'POST')

  const bad = await bridge.taskEvent({ state: 'nonsense' }, 'dsh')
  check('junk events never reach the wire', bad.ok === false && seen.path === '/task-event')

  const reminded = await bridge.remind({ title: '检查部署', detail: 'staging', everyMinutes: 30 })
  const remindBody = JSON.parse(seen.body)
  check('remind posts the cleaned wire shape', reminded.ok === true && remindBody.text.startsWith(REMINDER_MARKER) && remindBody.repeatEveryMinutes === 30 && !('title' in remindBody))
  const junkRemind = await bridge.remind({ title: ' ' })
  check('junk reminders never reach the wire', junkRemind.ok === false && seen.path === '/reminders')
  check('reminders() lists and removeReminder() deletes', (await bridge.reminders()).ok === true && (await bridge.removeReminder('r1-1')).ok === true && (await bridge.removeReminder('')).ok === false)

  const missing = new PetBridge({ port, tokenPath: join(home, 'no', 'token') })
  const unauth = await missing.request('POST', '/task-event', { state: 'running' })
  check('missing token still calls (bridge decides), not throws', unauth.ok === false && unauth.status === 401)

  const dead = new PetBridge({ port: 1, token: 'x' })
  const down = await dead.health()
  check('dead bridge is a value, not a throw', down.ok === false && down.unreachable === true)

  server.close()
} finally {
  rmSync(home, { recursive: true, force: true })
}

if (failures.length > 0) {
  console.error(`\n${failures.length} smoke check(s) failed`)
  process.exit(1)
}
console.log('\nall dsh-pets smoke checks passed')
process.exit(0)
