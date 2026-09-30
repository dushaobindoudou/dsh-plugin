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
let refuseWrites = false // simulates the app's permission gate on persistent writes
const server = createServer((req, res) => {
  let data = ''
  req.on('data', (c) => { data += c })
  req.on('end', () => {
    requests.push({ method: req.method, path: req.url, body: data ? JSON.parse(data) : null, agent: req.headers['x-lingxi-agent'] ?? null })
    res.setHeader('Content-Type', 'application/json')
    // The updated app refuses PERSISTENT writes (memory, reminders) unless the
    // caller's permission tier is `trusted`; the caller is identified by the
    // X-Lingxi-Agent header, and a missing header writes as "anonymous".
    const writeRefusal = () => {
      res.statusCode = 403
      res.end(JSON.stringify({ ok: false, rejected: ['「anonymous」的权限档位是 performer，不能写。要放行，去 主界面 → Agent 接入 → 权限，改成 trusted。'] }))
    }
    if (req.url === '/health') res.end('{"ok":true,"howTo":"lingxi help"}')
    else if (req.url === '/integration') {
      res.end(JSON.stringify({
        schemaVersion: 1,
        taskEvent: {
          states: ['queued', 'running', 'blocked', 'needs_input', 'needs_approval', 'completed', 'failed', 'cancelled'],
          kinds: ['build', 'test', 'deploy', 'review', 'search', 'write', 'chat', 'other'],
          moods: ['focused', 'proud', 'tender', 'sad', 'frustrated', 'anxious', 'weary', 'playful', 'curious'],
        },
        priorities: { order: ['ambient', 'status', 'report', 'alert'] },
      }))
    } else if (req.url === '/agents' && req.method === 'GET') {
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
      if (refuseWrites || !req.headers['x-lingxi-agent']) return writeRefusal()
      res.end('{"ok":true,"remembered":true}')
    } else if (req.url === '/reminders' && req.method === 'GET') {
      res.end(JSON.stringify(reminderStore))
    } else if (req.url === '/reminders' && req.method === 'POST') {
      if (refuseWrites || !req.headers['x-lingxi-agent']) return writeRefusal()
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

// Pre-seed the shared settings file so the mount reads our stub port. The
// announce is opt-in now (the default is off), so the announce test seeds it.
mkdirSync(join(process.env.HOME, '.lingxi'), { recursive: true })
writeFileSync(
  settingsPath(process.env.HOME),
  `${JSON.stringify({
    port,
    autoAnnounce: true,
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
check('task tool routes through the notifier and acks', taskResult.ok === true && taskResult.state === 'completed' && typeof taskResult.taskId === 'string')
// The notifier's task-event is fire-and-forget; wait for it to land.
await waitFor(() => requests.some((r) => r.path === '/task-event' && r.body.summary === 'smoke'), 2000)
const lastTask = [...requests].reverse().find((r) => r.path === '/task-event' && r.body.summary === 'smoke')
check('task tool injects the configured agent id', lastTask !== undefined && lastTask.body.provider === 'dsh' && lastTask.body.agent === 'dsh')
check('task tool forwards the model summary and mood', lastTask !== undefined && lastTask.body.summary === 'smoke' && lastTask.body.mood === 'proud')

const sayTool = toolRegistry.get('lingxi_say')
const sayResult = await sayTool.execute({ text: 'smoke 测试' }, {})
check('say tool hits /control with priority', sayResult.ok === true && [...requests].reverse().find((r) => r.path === '/control').body.priority === 'status')

const stateTool = toolRegistry.get('lingxi_state')
check('state tool reads /perception', (await stateTool.execute({}, {})).data.petState === 'wander')

const rememberTool = toolRegistry.get('lingxi_remember')
check('remember tool hits /memory', (await rememberTool.execute({ text: '用户喜欢猫', kind: 'preference' }, {})).data.remembered === true)
check('every write carries X-Lingxi-Agent (the app gates persistent writes on it)', requests.some((r) => r.path === '/memory' && r.agent === 'dsh'))

// ---------- the Remote namespace (the instance apply registered) ----------
const status = await remote.status()
check('remote.status answers plain JSON', status.bridge.running === true && status.bridge.port === port && status.meRegistered === true)
check('status carries the live contract check (vocab in sync)', status.contract !== null && status.contract.schemaVersion === 1 && Array.isArray(status.contract.drift) && status.contract.drift.length === 0)
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
  // The LAST handler's return is the waterfall's resolution — the veto
  // regression below asserts on it, so emit must surface it.
  let result
  for (const handler of listeners.get(event) ?? []) result = await handler(...args)
  return result
}
requests.length = 0
await emit('agent/status', { agent: { id: 'sess-A' }, status: 'running' })
await waitFor(() => requests.some((r) => r.path === '/task-event' && r.body.taskId === 'sess-A'), 2000)
check('agent/status running is tracked', remote ? (await remote.tasks()).tasks.some((t) => t.taskId === 'sess-A') : false)
check('running event rides to the pet as a task-event', requests.some((r) => r.path === '/task-event' && r.body.state === 'running' && r.body.taskId === 'sess-A'))

// ---------- requirement 2: attention states notify through the pet, loudly ----------
// The model narrates itself: its running report (exec.agent.id as taskId) and
// the watch's own tracking of the same session converge on ONE start say, and
// the say carries the model's real summary, not the session-title fallback.
requests.length = 0
const modelReport = await taskTool.execute(
  { state: 'running', kind: 'build', summary: '模型自己的真实摘要', mood: 'focused' },
  { signal: new AbortController().signal, agent: { id: 'sess-C' } },
)
await emit('agent/status', { agent: { id: 'sess-C' }, status: 'running' })
check('model report converges on the session taskId', modelReport.taskId === 'sess-C')
await waitFor(() => requests.some((r) => r.path === '/control' && r.body.say.includes('模型自己的真实摘要')), 5000)
check('start say carries the model summary (not the title)', requests.some((r) => r.path === '/control' && r.body.priority === 'status' && r.body.say.includes('模型自己的真实摘要')))
const sessCTaskEvents = requests.filter((r) => r.path === '/task-event' && r.body.taskId === 'sess-C')
check('repeated running states still ride as task-events', sessCTaskEvents.length >= 2)

// A tool-sourced running report skips the debounce: the model already IS the
// enriched content, and waiting 2.5s only widens the window in which the
// pet's stage-busy gate drops the say for good.
requests.length = 0
await taskTool.execute(
  { state: 'running', taskId: 'tool-only-9', kind: 'build', summary: 'tool 上报立即播报', mood: 'focused' },
  { signal: new AbortController().signal, agent: { id: 'sess-T' } },
)
await waitFor(() => requests.some((r) => r.path === '/control' && r.body.say.includes('tool 上报立即播报')), 1200)
check('a tool running report announces immediately (no debounce)', requests.some((r) => r.path === '/control' && r.body.priority === 'status' && r.body.say.includes('tool 上报立即播报')))

requests.length = 0
// A real approval stays pending until the user answers — hold the answerer
// back so the needs_approval row is observable, then release it.
let releaseApproval
const approvalDone = emit('approval/request', { agent: { id: 'sess-A' }, toolName: 'editText', reason: 'workspace file edit' }, () => new Promise((resolve) => { releaseApproval = () => resolve('allowed-once') }))
await waitFor(() => requests.some((r) => r.path === '/control' && r.body.priority === 'alert'), 2000)
check('approval flips the task to needs_approval', (await remote.tasks()).tasks.some((t) => t.taskId === 'sess-A' && t.state === 'needs_approval'))
const alertSay = requests.find((r) => r.path === '/control' && r.body.priority === 'alert')
check('needs_approval alerts the user through a bubble', alertSay !== undefined && alertSay.body.agent === 'dsh' && alertSay.body.say.includes('授权'))
check('the approval bubble names the real tool (toolName, not 一个操作)', alertSay !== undefined && alertSay.body.say.includes('editText'))
check('the alert also lands in the pet event feed', requests.some((r) => r.path === '/task-event' && r.body.state === 'needs_approval'))
releaseApproval()
await approvalDone
await waitFor(() => requests.some((r) => r.path === '/task-event' && r.body.taskId === 'sess-A' && r.body.state === 'completed'), 2000)
check('the approval resolution settles the row (no zombie 等待 row)', !(await remote.tasks()).tasks.some((t) => t.taskId === 'sess-A'))

// ---------- the ask waterfall: the pet announces the QUESTION, and the chain survives the observer ----------
// Regression (2026-09-24): the observers used to sit behind a guard wrapper
// that discarded `next()`'s result, so any client pass resolved the whole
// waterfall to undefined and ask_user_question crashed on `(await ask())
// .answers`. The observer must (a) return the chain's resolution untouched,
// (b) put the actual question text in the bubble, (c) settle the row when
// the request resolves.
requests.length = 0
const questionPayload = {
  agent: { id: 'sess-Q' },
  questions: [{
    id: 'gitignore_docs',
    header: '文档入库',
    question: '.gitignore 目前忽略了 docs 和 .claude 整个目录，CLAUDE.md/README 引用的文档写好后无法提交共享。如何处理?',
    options: [{ label: '调整忽略规则' }, { label: '保持忽略' }],
  }],
}
const answer = await emit('user-questions/request', questionPayload, async () => ({ answers: [{ id: 'gitignore_docs', selected: ['调整忽略规则'] }] }))
check('the observer returns the chain resolution untouched (veto regression)', answer !== undefined && answer.answers?.[0]?.id === 'gitignore_docs')
await waitFor(() => requests.some((r) => r.path === '/control' && r.body.priority === 'alert'), 2000)
const questionSay = requests.find((r) => r.path === '/control' && r.body.priority === 'alert')
check('the question bubble carries the actual ask', questionSay !== undefined && questionSay.body.say.includes('.gitignore 目前忽略了') && questionSay.body.say.includes('有个问题想问你'))
check('the question event rides to the feed with the ask as its subject', requests.some((r) => r.path === '/task-event' && r.body.state === 'needs_input' && String(r.body.summary).includes('文档入库')))
await waitFor(() => requests.some((r) => r.path === '/task-event' && r.body.taskId === 'sess-Q' && r.body.state === 'completed'), 2000)
check('an answered question settles its row as completed', !(await remote.tasks()).tasks.some((t) => t.taskId === 'sess-Q'))

// A rejected ask (no answerer / cancelled) must settle the row cancelled —
// and the rejection must propagate out of the chain untouched.
requests.length = 0
await emit('user-questions/request', { agent: { id: 'sess-R' }, questions: [{ id: 'q', question: '继续吗?' }] }, async () => {
  throw Object.assign(new Error('no user-questions answerer accepted the request'), { code: 'NO_PROVIDER' })
}).catch(() => 'propagated')
await waitFor(() => requests.some((r) => r.path === '/task-event' && r.body.taskId === 'sess-R' && r.body.state === 'cancelled'), 2000)
check('an unanswered ask settles its row cancelled (and stays silent by default)', !(await remote.tasks()).tasks.some((t) => t.taskId === 'sess-R'))

requests.length = 0
await emit('agent/status', { agent: { id: 'sess-A' }, status: 'idle' })
check('idle settles the task as completed', !(await remote.tasks()).tasks.some((t) => t.taskId === 'sess-A'))

// failed is a report, not an alert (default policy)
await emit('agent/status', { agent: { id: 'sess-B' }, status: 'running' })
requests.length = 0
await emit('agent/error', { agent: { id: 'sess-B' }, step: 3, error: 'boom' })
await waitFor(() => requests.some((r) => r.path === '/control'), 2000)
check('failed reports at report priority', requests.find((r) => r.path === '/control')?.body.priority === 'report')

// ---------- subagent lifecycle: the completion carries the child's own words ----------
// SubagentRunInfo/EndInfo use `id` + `stopReason` (dsh-subagent types).
requests.length = 0
await emit('subagent/start', { runId: 'sub-run-1', provider: 'generic', id: 'child-1', local: true })
await waitFor(() => requests.some((r) => r.path === '/task-event' && r.body.taskId === 'child-1'), 2000)
check('subagent start tracks the child as a running row', (await remote.tasks()).tasks.some((t) => t.taskId === 'child-1' && t.state === 'running'))
await emit('subagent/end', {
  runId: 'sub-run-1', provider: 'generic', id: 'child-1', local: true, stopReason: 'completed',
  lastAssistantMessage: [{ type: 'text', text: 'audit done:\n3 files changed, tests passed' }],
})
await waitFor(() => requests.some((r) => r.path === '/task-event' && r.body.taskId === 'child-1' && r.body.state === 'completed'), 2000)
const subDone = requests.find((r) => r.path === '/task-event' && r.body.taskId === 'child-1' && r.body.state === 'completed')
check('subagent completion carries the child outcome in the summary', subDone !== undefined && subDone.body.summary.includes('tests passed'))
check('a finished subagent row is cleared', !(await remote.tasks()).tasks.some((t) => t.taskId === 'child-1'))
requests.length = 0
await emit('subagent/start', { runId: 'sub-run-2', provider: 'generic', id: 'child-2', local: true })
await emit('subagent/end', { runId: 'sub-run-2', provider: 'generic', id: 'child-2', local: true, stopReason: 'max-tokens' })
await waitFor(() => requests.some((r) => r.path === '/control' && r.body.say.includes('child-2')), 2000)
check('a subagent hitting its ceiling fails at report priority', requests.some((r) => r.path === '/control' && r.body.say.includes('max-tokens') && r.body.priority === 'report'))

// ---------- new user input: the "what does the user want" prompt ----------
requests.length = 0
await emit('agent/inbox/inserted', { agent: { id: 'sess-I' }, message: { role: 'user', content: [{ type: 'text', text: '帮我修复 lingxi\n的启动问题' }] } })
await waitFor(() => requests.some((r) => r.path === '/task-event' && r.body.taskId === 'sess-I'), 2000)
const inputRow = requests.find((r) => r.path === '/task-event' && r.body.taskId === 'sess-I')
check('new input surfaces the user ask as a queued hint row', inputRow !== undefined && inputRow.body.state === 'queued' && inputRow.body.summary === '帮我修复 lingxi 的启动问题')
await waitFor(() => requests.some((r) => r.path === '/control' && r.body.say.includes('收到新任务')), 2000)
check('a new input says what the user asked at status priority', requests.some((r) => r.path === '/control' && r.body.say.includes('收到新任务：帮我修复 lingxi 的启动问题') && r.body.priority === 'status'))
// the running row inherits the user's own words as its title
requests.length = 0
await emit('agent/status', { agent: { id: 'sess-I' }, status: 'running' })
await waitFor(() => requests.some((r) => r.path === '/task-event' && r.body.taskId === 'sess-I' && r.body.state === 'running'), 2000)
check('the running row inherits the input hint as its summary', requests.some((r) => r.path === '/task-event' && r.body.taskId === 'sess-I' && r.body.state === 'running' && r.body.summary === '帮我修复 lingxi 的启动问题'))
// steering input while already running is suppressed — no duplicate hint
requests.length = 0
await emit('agent/inbox/inserted', { agent: { id: 'sess-I' }, message: { role: 'user', content: [{ type: 'text', text: '顺便把文档也更新了' }] } })
check('steering input during active work does not hint', !requests.some((r) => r.path === '/task-event' && r.body.state === 'queued'))
await emit('agent/status', { agent: { id: 'sess-I' }, status: 'idle' })

// ---------- requirement 1b: goals — the cat sees the objective, with progress ----------
requests.length = 0
const goalView = (phase, rounds) => ({
  id: 'goal-1', revision: 1, objective: '梳理 dsh 核心能力并落地集成',
  phase, roundsStarted: rounds, maxGoalRounds: 8,
  createdAt: Date.now(), updatedAt: Date.now(), activation: 'armed',
})
await emit('goal/changed', { agent: { id: 'sess-G' }, change: { operation: 'create', ref: { id: 'goal-1', revision: 1 }, goal: goalView('active', 3) } })
await waitFor(() => requests.some((r) => r.path === '/task-event' && r.body.taskId === 'goal:sess-G'), 2000)
const goalRow = (await remote.tasks()).tasks.find((t) => t.taskId === 'goal:sess-G')
check('goal/changed tracks the objective as a running row', goalRow !== undefined && goalRow.state === 'running')
check('goal progress is the round fraction (3/8)', typeof goalRow?.progress === 'number' && Math.abs(goalRow.progress - 0.375) < 1e-9)
check('goal progress rides the task-event', requests.some((r) => r.path === '/task-event' && r.body.taskId === 'goal:sess-G' && r.body.progress === 0.375))
requests.length = 0
await emit('goal/changed', { agent: { id: 'sess-G' }, change: { operation: 'complete', ref: { id: 'goal-1', revision: 2 }, goal: goalView('complete', 8) } })
check('goal complete settles and clears the row', !(await remote.tasks()).tasks.some((t) => t.taskId === 'goal:sess-G'))

// the reconcile sweep picks up a goal that never fired an event (blocked → report)
services.set('goals', { get: () => goalView('blocked', 4) })
services.set('agents', { list: () => [{ id: 'sess-H' }] })
requests.length = 0
await remote.sweep()
await waitFor(() => requests.some((r) => r.path === '/task-event' && r.body.taskId === 'goal:sess-H'), 2000)
const blockedRow = (await remote.tasks()).tasks.find((t) => t.taskId === 'goal:sess-H')
check('reconcile sweep picks the live goal up', blockedRow !== undefined && blockedRow.state === 'blocked' && Math.abs(blockedRow.progress - 0.5) < 1e-9)
services.delete('goals')
services.delete('agents')

// ---------- requirement 2b: authorization — the third way dsh waits for you ----------
services.set('authorization', { list: () => [{ key: 'deepseek-account', label: 'DeepSeek 账号登录', methods: ['oauth'], inFlight: true }] })
requests.length = 0
await remote.sweep()
await waitFor(() => requests.some((r) => r.path === '/task-event' && r.body.taskId === 'auth:deepseek-account'), 2000)
check('in-flight authorization waits as needs_input', (await remote.tasks()).tasks.some((t) => t.taskId === 'auth:deepseek-account' && t.state === 'needs_input'))
await waitFor(() => requests.some((r) => r.path === '/control' && r.body.priority === 'alert'), 2000)
const authSay = requests.find((r) => r.path === '/control' && r.body.priority === 'alert')
check('authorization wait alerts with the credential ask', authSay !== undefined && authSay.body.say.includes('凭据'))
requests.length = 0
await emit('authorization/settled', 'deepseek-account', 'authorized')
check('authorization settled clears the wait row', !(await remote.tasks()).tasks.some((t) => t.taskId === 'auth:deepseek-account'))
services.delete('authorization')

// ---------- requirement 1c: jobs — settled the moment they settle ----------
// The registry stub carries real listeners so the smoke fires them by hand.
const jobDoneListeners = []
const jobChangedListeners = []
const jobRows = [{ id: 'build-1', kind: 'build', label: '全量回归', status: 'running' }]
services.set('jobs', {
  list: () => jobRows,
  onJobDone(fn) { jobDoneListeners.push(fn); return () => { jobDoneListeners.splice(jobDoneListeners.indexOf(fn), 1) } },
  onJobsChanged(fn) { jobChangedListeners.push(fn); return () => { jobChangedListeners.splice(jobChangedListeners.indexOf(fn), 1) } },
})
requests.length = 0
await remote.sweep()
check('running job is tracked by the reconcile listing', (await remote.tasks()).tasks.some((t) => t.taskId === 'job:build-1' && t.state === 'running'))
for (const fn of jobDoneListeners) await fn({ id: 'build-1', kind: 'build', label: '全量回归', status: 'completed', finishedAt: Date.now(), reported: true })
check('job done event settles the row instantly', !(await remote.tasks()).tasks.some((t) => t.taskId === 'job:build-1'))
requests.length = 0
jobRows.push({ id: 'build-2', kind: 'build', label: '增量构建', status: 'running' })
for (const fn of jobChangedListeners) await fn(undefined)
check('jobs-changed event tracks a new job without waiting a tick', (await remote.tasks()).tasks.some((t) => t.taskId === 'job:build-2' && t.state === 'running'))
for (const fn of jobDoneListeners) await fn({ id: 'build-2', kind: 'build', label: '增量构建', status: 'failed', detail: 'exit 1', finishedAt: Date.now(), reported: true })
await waitFor(() => requests.some((r) => r.path === '/control'), 2000)
const failedJobSay = [...requests].reverse().find((r) => r.path === '/control' && r.body.say.includes('增量构建'))
check('failed job reports with its label and detail', failedJobSay !== undefined && failedJobSay.body.priority === 'report' && failedJobSay.body.say.includes('exit 1'))
services.delete('jobs')

// ---------- requirement 1d: activity — what the work is touching ----------
requests.length = 0
await emit('tools/result', { name: 'bash', arguments: { command: 'pnpm test -- --run' }, agent: { id: 'sess-A' } }, {})
await emit('tools/result', { name: 'write', arguments: { file_path: '/repo/packages/x/src/a.js' }, agent: { id: 'sess-A' } }, {})
await emit('tools/result', { name: 'lingxi_state', arguments: {}, agent: { id: 'sess-A' } }, {})
const activityView = await remote.activity()
const activityItems = activityView.items
check('bash activity lands with its first command line', activityItems.some((a) => a.type === 'command' && a.label === 'pnpm test -- --run'))
check('file write activity lands with its path', activityItems.some((a) => a.type === 'file' && a.label.includes('/repo/packages/x/src/a.js')))
check('own lingxi tools are not activity', !activityItems.some((a) => a.label.includes('lingxi_')))
check('activity rows carry the acting session id', activityItems.find((a) => a.type === 'command')?.taskId === 'sess-A')

// ---------- requirement 1e: context pressure — warn once per filling ----------
const pressureValue = { pressureTokens: 700_000, projectedTokens: 850_000, contextWindow: 1_000_000 }
const projectionListeners = []
services.set('sessionProjections', {
  onChanged(fn) { projectionListeners.push(fn); return () => {} },
  stateOf: (session, key) => (key === 'contextPressure' ? pressureValue : undefined),
})
services.set('sessions', { list: () => [{ id: 'sess-P' }] })
// Seed the session's freshest ask BEFORE the sweep: the warning's subject
// must be these words, not a static session title.
await emit('agent/inbox/inserted', { agent: { id: 'sess-P' }, message: { role: 'user', content: [{ type: 'text', text: '重构 lingxi 设置页' }] } })
requests.length = 0
await remote.sweep() // the sweep (re)subscribes to the late-mounted registry and evaluates
await waitFor(() => requests.some((r) => r.path === '/control' && r.body.priority === 'report'), 2000)
const pressureSay = requests.find((r) => r.path === '/control' && r.body.say.includes('上下文'))
check('context crossing 80% reports once with the percent', pressureSay !== undefined && pressureSay.body.say.includes('85%'))
check('the pressure warning carries the session\'s freshest ask', pressureSay !== undefined && pressureSay.body.say.includes('重构 lingxi 设置页'))
requests.length = 0
await remote.sweep() // same occupancy → no repeat
check('the warning does not repeat at the same level', !requests.some((r) => r.path === '/control' && r.body.say.includes('上下文')))
pressureValue.projectedTokens = 400_000
await remote.sweep() // deep recovery re-arms
pressureValue.projectedTokens = 900_000
requests.length = 0
await remote.sweep()
await waitFor(() => requests.some((r) => r.path === '/control' && r.body.say.includes('上下文')), 2000)
check('a refill after recovery warns again', requests.some((r) => r.path === '/control' && r.body.say.includes('上下文') && r.body.say.includes('90%')))
check('the page reads live occupancy per session', (await remote.activity()).pressure.some((p) => p.sessionId === 'sess-P' && Math.abs(p.ratio - 0.9) < 1e-9))
services.delete('sessionProjections')
services.delete('sessions')

// ---------- requirement 1e+: budget — quota exhaustion speaks once, with the freshest ask ----------
// dsh classifies every failed model attempt on LlmFailure.code (QUOTA is the
// canonical account-quota class); coarser adapters (freeroute maps quota text
// to RATE_LIMIT) leave only the wording, so both are read.
const next = async () => undefined
await emit('agent/status', { agent: { id: 'sess-Q' }, status: 'running' })
requests.length = 0
// Steering while running: no new row, no bubble — but the ask is remembered,
// so the alert below carries THESE words, not the row's birth title.
await emit('agent/inbox/inserted', { agent: { id: 'sess-Q' }, message: { role: 'user', content: [{ type: 'text', text: '把 freeroute 目录复查跑完' }] } })
check('steering input is remembered without a queued row', !requests.some((r) => r.path === '/task-event' && r.body.state === 'queued'))
await emit('agent/request-error', { agent: { id: 'sess-Q' }, turn: 2, step: 3, provider: 'freeroute/deepseek-chat', failure: { message: 'Insufficient Balance', code: 'QUOTA' } }, next)
await waitFor(() => requests.some((r) => r.path === '/control' && r.body.priority === 'alert'), 2000)
const quotaSay = requests.find((r) => r.path === '/control' && r.body.priority === 'alert')
check('quota exhaustion alerts with the freshest ask and the route', quotaSay !== undefined && quotaSay.body.say.includes('把 freeroute 目录复查跑完') && quotaSay.body.say.includes('freeroute/deepseek-chat'))
requests.length = 0
await emit('agent/request-error', { agent: { id: 'sess-Q' }, turn: 2, step: 4, provider: 'freeroute/deepseek-chat', failure: { message: 'Insufficient Balance', code: 'QUOTA' } }, next)
await emit('agent/request-error', { agent: { id: 'sess-Q' }, turn: 2, step: 5, provider: 'freeroute/kimi', failure: { message: 'rate limit exceeded, retry later', code: 'RATE_LIMIT' } }, next)
check('the quota alert is quiet for the window and rate limits never speak', !requests.some((r) => r.path === '/control'))
requests.length = 0
await emit('agent/request-error', { agent: { id: 'sess-Q2' }, turn: 1, step: 1, provider: 'deepseek', failure: { message: '您的余额不足，请充值后重试', code: 'UNKNOWN' } }, next)
await waitFor(() => requests.some((r) => r.path === '/control' && r.body.priority === 'alert'), 2000)
check('text-classified quota (Chinese wording) alerts too', requests.some((r) => r.path === '/control' && r.body.say.includes('额度不够了') && r.body.say.includes('deepseek')))
requests.length = 0
await emit('agent/request-error', { agent: { id: 'sess-Q' }, turn: 3, step: 1, provider: 'deepseek', failure: { message: 'prompt too long', code: 'CONTEXT_WINDOW_EXCEEDED' } }, next)
await waitFor(() => requests.some((r) => r.path === '/control' && r.body.priority === 'report'), 2000)
check('a context-window rejection reports with the freshest ask', requests.some((r) => r.path === '/control' && r.body.say.includes('超出模型的上下文') && r.body.say.includes('把 freeroute 目录复查跑完')))

// ---------- requirement 1f: workflow — the id is real, the phase is progress ----------
requests.length = 0
const wfInfo = { id: 'run-9', meta: { name: 'audit-freeroute', description: '目录复查' } }
await emit('workflow/start', wfInfo)
await waitFor(() => requests.some((r) => r.path === '/task-event' && r.body.taskId === 'run-9'), 2000)
check('workflow start tracks the run by info.id', (await remote.tasks()).tasks.some((t) => t.taskId === 'run-9' && t.state === 'running'))
await emit('workflow/phase', wfInfo, 'parse catalog')
const wfRow = (await remote.tasks()).tasks.find((t) => t.taskId === 'run-9')
check('workflow phase updates the row title', wfRow !== undefined && wfRow.title === 'audit-freeroute · parse catalog')
requests.length = 0
await emit('workflow/end', wfInfo, { stopReason: 'error', error: '阶段抛错了', agentsStarted: 3 })
await waitFor(() => requests.some((r) => r.path === '/task-event' && r.body.taskId === 'run-9' && r.body.state === 'failed'), 2000)
check('workflow error settles as failed with the message', !(await remote.tasks()).tasks.some((t) => t.taskId === 'run-9') && requests.some((r) => r.path === '/task-event' && r.body.taskId === 'run-9' && r.body.state === 'failed' && r.body.summary === 'audit-freeroute · parse catalog · 阶段抛错了'))

// ---------- requirement 1g: environment — model route, settings, dev rebuilds ----------
const modelStub = { current: { provider: 'deepseek', model: 'glm-5.3-flash' } }
services.set('agentDefaultModel', { currentSelection: () => ({ ...modelStub.current }) })
requests.length = 0
await remote.sweep()
check('first model observation is a silent baseline', !requests.some((r) => r.path === '/control' && r.body.say.includes('deepseek')))
modelStub.current = { provider: 'deepseek', model: 'glm-5.2' }
await emit('llm/adapters-updated')
await waitFor(() => requests.some((r) => r.path === '/control' && r.body.say.includes('deepseek/glm-5.2')), 2000)
check('a model switch says the new route at status priority', requests.some((r) => r.path === '/control' && r.body.priority === 'status' && r.body.say.includes('deepseek/glm-5.2')))
check('status carries the model route', (await remote.status()).model.model === 'deepseek/glm-5.2')

await emit('settings/updated', 'locale', { id: 'en' }, { id: 'zh' }, 'user')
check('settings change lands as an activity note', (await remote.activity()).items.some((a) => a.type === 'settings' && a.label.includes('locale')))

const rebuiltListeners = []
services.set('clientModules', { onRebuilt(fn) { rebuiltListeners.push(fn); return () => {} } })
await remote.sweep()
requests.length = 0
for (const fn of rebuiltListeners) await fn('dsh-lingxi', 'rev-1')
await waitFor(() => requests.some((r) => r.path === '/control' && r.body.say.includes('dsh-lingxi')), 2000)
check('client rebuild says once per revision', requests.filter((r) => r.path === '/control' && r.body.say.includes('编译好了')).length === 1)
requests.length = 0
for (const fn of rebuiltListeners) await fn('dsh-lingxi', 'rev-1')
check('same revision does not repeat the rebuild say', !requests.some((r) => r.path === '/control' && r.body.say.includes('编译好了')))
services.delete('agentDefaultModel')
services.delete('clientModules')

// ---------- requirement 3: declared reminders sync into the pet's clock ----------
// Pre-seed the app with a stale managed entry and one that belongs to nobody.
reminderStore = [{ id: 'stale', text: '[灵犀] 旧提醒', repeatEveryMinutes: 30 }, { id: 'user', text: '主人自己设的', repeatEveryMinutes: 0 }]
const syncResult = await remote.syncReminders()
check('sync deletes the stale managed entry only', syncResult.removed === 1 && !reminderStore.some((r) => r.id === 'stale') && reminderStore.some((r) => r.id === 'user'))
check('sync state carries the sync result', (await remote.reminders()).lastSync.available === true)

// ---------- app-contract 2026-09: the permission gate on persistent writes ----------
// The updated app refuses memory/reminder writes from a caller whose tier is
// below trusted (403 + rejected reason). The sync must surface that reason,
// not fold it into a silent zero.
reminderStore = []
refuseWrites = true
const blockedResult = await remote.syncReminders()
check('a refused reminder write surfaces the permission reason', blockedResult.blocked !== null && blockedResult.blocked.includes('trusted') && blockedResult.posted === 0)
check('the blocked reason rides the reminders view', (await remote.reminders()).lastSync.blocked !== null && (await remote.reminders()).lastSync.blocked.includes('trusted'))
refuseWrites = false
const recovered = await remote.syncReminders()
check('sync recovers once the write goes through', recovered.blocked === null && recovered.posted === 1 && reminderStore.some((r) => r.text.includes('检查部署')))
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
