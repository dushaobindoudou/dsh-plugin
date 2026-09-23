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
