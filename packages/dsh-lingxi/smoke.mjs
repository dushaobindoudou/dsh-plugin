/**
 * dsh-lingxi — host-half smoke test. Plain Node: stub ctx (tools registry +
 * provide), stub harness typert gateway, stub bridge HTTP server. Proves:
 * mount registers only enabled tools, settings save persists and rebuilds,
 * the Remote namespace answers with plain JSON, and the announce ping rides
 * the real wire. Ends with process.exit on BOTH paths.
 */
import { createServer } from 'node:http'
import { mkdtempSync, readFileSync, rmSync, writeFileSync, mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

process.env.HOME = mkdtempSync(join(tmpdir(), 'dsh-lingxi-smoke-'))
const { apply } = await import('./lib/index.js')
const { LingxiRemote } = await import('./lib/remote.js')
const { validateSettings, settingsPath } = await import('./lib/pet-contract/index.js')

const failures = []
function check(name, condition, detail) {
  if (condition) console.log(`✔ ${name}`)
  else {
    failures.push(name)
    console.error(`✗ ${name}${detail ? ` — ${detail}` : ''}`)
  }
}

// ---------- stub bridge server (the pet app's provided interfaces) ----------
const requests = []
let reminderStore = [] // controllable GET /reminders payload
let reminderSeq = 0
const server = createServer((req, res) => {
  let data = ''
  req.on('data', (c) => { data += c })
  req.on('end', () => {
    requests.push({ method: req.method, path: req.url, body: data ? JSON.parse(data) : null })
    res.setHeader('Content-Type', 'application/json')
    if (req.url === '/health') res.end('{"ok":true,"howTo":"lingxi help"}')
    else if (req.url === '/agents' && req.method === 'GET') {
      res.end('{"agents":[{"id":"dsh","name":"DSH Agent","badge":"DS","color":"#4D6BFE"}]}')
    } else if (req.url === '/agents' && req.method === 'POST') {
      res.end('{"ok":true}')
    } else if (req.url === '/task-event') {
      res.end('{"ok":true,"recorded":true}')
    } else if (req.url === '/control') {
      res.end('{"ok":true,"applied":["say"]}')
    } else if (req.url === '/perception') {
      res.end('{"petState":"wander","expression":"安然"}')
    } else if (req.url === '/memory') {
      res.end('{"ok":true,"remembered":true}')
    } else if (req.url === '/reminders' && req.method === 'GET') {
      res.end(JSON.stringify(reminderStore))
    } else if (req.url === '/reminders' && req.method === 'POST') {
      reminderSeq += 1
      reminderStore.push({ id: `r-smoke-${reminderSeq}`, ...JSON.parse(data), done: false })
      res.end('{"ok":true,"id":"r-smoke"}')
    } else if (req.url?.startsWith('/reminders/') && req.method === 'DELETE') {
      const id = req.url.slice('/reminders/'.length)
      reminderStore = reminderStore.filter((r) => r.id !== id)
      res.end('{"ok":true}')
    } else {
      res.statusCode = 404
      res.end('{"error":"no such route"}')
    }
  })
})
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
const port = server.address().port

// Pre-seed the shared settings file so the mount reads our stub port.
mkdirSync(join(process.env.HOME, '.lingxi'), { recursive: true })
writeFileSync(
  settingsPath(process.env.HOME),
  `${JSON.stringify({
    port,
    reminders: [{ id: 'deploy', title: '检查部署', detail: 'staging 状态', everyMinutes: 30 }],
  })}\n`,
  'utf8')

// ---------- stub ctx ----------
const toolRegistry = new Map()
const services = new Map()
const provided = []
const listeners = new Map()
const ctx = {
  reflect: {
    provide(name, value) { services.set(name, value); provided.push(name); return () => services.delete(name) },
  },
  on(event, handler) {
    if (!listeners.has(event)) listeners.set(event, [])
    listeners.get(event).push(handler)
    return () => listeners.set(event, listeners.get(event).filter((h) => h !== handler))
  },
  timer: {
    interval(callback, delay) { return () => {} },
  },
  get(name) { return services.get(name) },
  effect(callback) {
    const dispose = callback()
    return () => (typeof dispose === 'function' ? dispose() : undefined)
  },
  provide(name, value) {
    services.set(name, value)
    provided.push(name)
    return () => services.delete(name)
  },
}
services.set('tools', {
  register(definition) {
    toolRegistry.set(definition.name, definition)
    return () => toolRegistry.delete(definition.name)
  },
})

apply(ctx)
const remote = ctx.get('lingxi')

// The announce is fire-and-forget; poll for it instead of a fixed sleep.
const waitFor = async (predicate, ms) => {
  const deadline = Date.now() + ms
  while (Date.now() < deadline) {
    if (predicate()) return true
    await new Promise((r) => setTimeout(r, 25))
  }
  return predicate()
}
await waitFor(() => requests.some((r) => r.path === '/task-event'), 2000)

// ---------- assertions ----------
const enabled = ['lingxi_task', 'lingxi_say', 'lingxi_react', 'lingxi_state', 'lingxi_remember']
check('all five tools registered on mount', enabled.every((n) => toolRegistry.has(n)), `got: ${[...toolRegistry.keys()].join(',')}`)
check('identity was POSTed to /agents', requests.some((r) => r.path === '/agents' && r.method === 'POST' && r.body.id === 'dsh'))
check('autoAnnounce fired the task-event', requests.some((r) => r.path === '/task-event' && r.body.summary === 'DSH 已接入，灵犀桥接就绪'))
check('identity registration carries the dsh logo', requests.some((r) => r.path === '/agents' && r.method === 'POST' && typeof r.body.logo === 'string' && r.body.logo.startsWith('<svg')))

// Execute the task tool the way the registry would.
const taskTool = toolRegistry.get('lingxi_task')
const taskResult = await taskTool.execute({ state: 'completed', mood: 'proud', summary: 'smoke' }, { signal: new AbortController().signal })
check('task tool posts and returns the bridge answer', taskResult.ok === true && taskResult.data.recorded === true)
const lastTask = [...requests].reverse().find((r) => r.path === '/task-event')
check('task tool injects the configured agent id', lastTask.body.provider === 'dsh' && lastTask.body.agent === 'dsh')

const sayTool = toolRegistry.get('lingxi_say')
const sayResult = await sayTool.execute({ text: 'smoke 测试' }, {})
check('say tool hits /control with priority', sayResult.ok === true && [...requests].reverse().find((r) => r.path === '/control').body.priority === 'status')

const stateTool = toolRegistry.get('lingxi_state')
check('state tool reads /perception', (await stateTool.execute({}, {})).data.petState === 'wander')

const rememberTool = toolRegistry.get('lingxi_remember')
check('remember tool hits /memory', (await rememberTool.execute({ text: '用户喜欢猫', kind: 'preference' }, {})).data.remembered === true)

// ---------- the Remote namespace (the instance apply registered) ----------
const status = await remote.status()
check('remote.status answers plain JSON', status.bridge.running === true && status.bridge.port === port && status.meRegistered === true)
check('remote.status lists the pet app agents', status.agents.length === 1 && status.agents[0].badge === 'DS')

const saved = await remote.setSettings({ autoAnnounce: false, tools: { say: false }, zombieField: 1 })
check('remote.setSettings persists and reports ignored keys', saved.settings.autoAnnounce === false && saved.settings.tools.say === false && saved.ignored.includes('zombieField'))
check('settings file on disk matches', JSON.parse(readFileSync(settingsPath(process.env.HOME), 'utf8')).autoAnnounce === false)
check('tool set rebuilt after save (say gone)', !toolRegistry.has('lingxi_say') && toolRegistry.has('lingxi_task'))

const say = await remote.testSay({ text: '你好' })
check('remote.testSay rides the bridge', say.ok === true && [...requests].reverse().find((r) => r.path === '/control').body.say === '你好')

const hostile = validateSettings({ port: 1 })
check('port validator clamps below 1024', hostile.settings.port === 47811)

// ---------- requirement 1: the task watch knows what dsh is running ----------
const emit = async (event, ...args) => {
  for (const handler of listeners.get(event) ?? []) await handler(...args)
}
requests.length = 0
await emit('agent/status', { agent: { id: 'sess-A' }, status: 'running' })
await waitFor(() => requests.some((r) => r.path === '/task-event' && r.body.taskId === 'sess-A'), 2000)
check('agent/status running is tracked', remote ? (await remote.tasks()).tasks.some((t) => t.taskId === 'sess-A') : false)
check('running event rides to the pet as a task-event', requests.some((r) => r.path === '/task-event' && r.body.state === 'running' && r.body.taskId === 'sess-A'))

// ---------- requirement 2: attention states notify through the pet, loudly ----------
requests.length = 0
await emit('approval/request', { agent: { id: 'sess-A' }, tool: 'editText' }, async () => 'allow')
await waitFor(() => requests.some((r) => r.path === '/control' && r.body.priority === 'alert'), 2000)
check('approval flips the task to needs_approval', (await remote.tasks()).tasks.some((t) => t.taskId === 'sess-A' && t.state === 'needs_approval'))
const alertSay = requests.find((r) => r.path === '/control' && r.body.priority === 'alert')
check('needs_approval alerts the user through a bubble', alertSay !== undefined && alertSay.body.agent === 'dsh' && alertSay.body.say.includes('授权'))
check('the alert also lands in the pet event feed', requests.some((r) => r.path === '/task-event' && r.body.state === 'needs_approval'))
requests.length = 0
await emit('agent/status', { agent: { id: 'sess-A' }, status: 'idle' })
check('idle settles the task as completed', !(await remote.tasks()).tasks.some((t) => t.taskId === 'sess-A'))

// failed is a report, not an alert (default policy)
await emit('agent/status', { agent: { id: 'sess-B' }, status: 'running' })
requests.length = 0
await emit('agent/error', { agent: { id: 'sess-B' }, step: 3, error: 'boom' })
await waitFor(() => requests.some((r) => r.path === '/control'), 2000)
check('failed reports at report priority', requests.find((r) => r.path === '/control')?.body.priority === 'report')

// ---------- requirement 3: declared reminders sync into the pet's clock ----------
// Pre-seed the app with a stale managed entry and one that belongs to nobody.
reminderStore = [{ id: 'stale', text: '[灵犀] 旧提醒', repeatEveryMinutes: 30 }, { id: 'user', text: '主人自己设的', repeatEveryMinutes: 0 }]
const syncResult = await remote.syncReminders()
check('sync deletes the stale managed entry only', syncResult.removed === 1 && !reminderStore.some((r) => r.id === 'stale') && reminderStore.some((r) => r.id === 'user'))
check('sync is idempotent (second pass posts nothing)', (await remote.syncReminders()).posted === 0)
const declared = (await remote.reminders()).declared
check('settings-declared reminders become standing pet reminders', reminderStore.some((r) => r.text.includes('检查部署') && r.repeatEveryMinutes === 30))
check('the reminders() remote reports app entries + sync state', (await remote.reminders()).appEntries.every((e) => typeof e.text === 'string'))


server.close()
rmSync(process.env.HOME, { recursive: true, force: true })

if (failures.length > 0) {
  console.error(`\n${failures.length} smoke check(s) failed`)
  process.exit(1)
}
console.log('\nall dsh-lingxi host smoke checks passed')
process.exit(0)
