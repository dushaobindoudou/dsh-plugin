// Host smoke test for the installed dsh-workflow package.
// Runs against the REAL @deepseek-ai/dsh-typert-protocol to validate the
// manual Remote-marker trick and the full wfx method surface.
import { apply } from './lib/index.js'
import { remoteMethods, TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol'

const handlers = new Map()
const eventListeners = []
const wfSessions = [
  {
    header: { id: 's1', createdAt: 100, cwd: '/a/b/proj1', origin: undefined },
    events: [
      { type: 'session/title', seq: 1, time: 100, data: { title: '审查会话' } },
      { type: 'tool/call', seq: 2, time: 110, data: { name: 'workflow', arguments: JSON.stringify({ meta: { name: 'code-review', description: '多角度审查', phases: [{ title: '收集' }] }, script: 'return args.x' }) } },
      { type: 'tool-workflow/run-start', seq: 3, time: 120, data: { runId: 'r1', name: 'code-review' } },
      { type: 'tool-workflow/agent-start', seq: 4, time: 121, data: { runId: 'r1', seq: 1, label: '收集', phase: '收集', childId: 'c1' } },
      { type: 'tool-workflow/agent-end', seq: 5, time: 130, data: { runId: 'r1', seq: 1, outcome: 'completed' } },
      { type: 'tool-workflow/run-end', seq: 6, time: 140, data: { runId: 'r1', stopReason: 'completed' } },
    ],
  },
]

const sessionQuery = {
  listSessions: async () => wfSessions.map((s) => ({ header: s.header })),
  readSession: async (id) => { const s = wfSessions.find((x) => x.header.id === id); if (!s) throw new Error('nf'); return { session: {}, events: s.events } },
  listEvents: async (id) => { const s = wfSessions.find((x) => x.header.id === id); return s ? s.events : [] },
  searchSessions: async () => { throw new Error('fts down - exercise fallback') },
  readTitleSnapshot: async (id) => ({ session: { cwd: '/a/b/proj1' }, title: undefined }),
  readTitleSnapshots: async (ids) => ids.map((id) => ({ sessionId: id, status: 'fulfilled', value: { title: undefined } })),
}

const agentsDb = new Map()
const agentsSvc = {
  get: (id) => agentsDb.get(id),
  create: async (o) => {
    const agent = { followup: (m) => { agentsDb.set('last-msg', m); agentsDb.set('launched', o) } }
    agentsDb.set(o.sessionId, agent)
    return { agent }
  },
}

const captured = {}
const makeCtx = () => ({
  get: (name) => {
    if (name === 'sessionQuery') return sessionQuery
    if (name === 'agents') return agentsSvc
    if (name === 'agentDefaultModel') return { currentSelection: () => ({ provider: 'p', model: 'm' }) }
    if (name === 'workspaceRegistry') return { list: () => [{ id: 'w1', path: '/a/b/proj1', title: 'proj1', sessionIds: ['s1'] }] }
    return undefined
  },
  on: (ev, fn) => { eventListeners.push({ ev, fn }); return () => {} },
  effect: (fn) => () => {},
  reflect: { provide: (name, inst) => { captured[name] = inst } },
})

const expect = (c, msg) => { if (!c) throw new Error('ASSERT: ' + msg) }
const assertJsonValue = (v, path) => {
  if (v === null) return
  const t = typeof v
  if (t === 'string' || t === 'boolean') return
  if (t === 'number') { if (Number.isFinite(v)) return; throw new Error('non-finite number at ' + path) }
  if (t === 'object') { for (const k of Object.keys(v)) assertJsonValue(v[k], path + '.' + k); return }
  throw new Error('non-JSON value ' + t + ' at ' + path)
}

const svc = await (async () => {
  apply(makeCtx())
  const s = captured.wfx
  if (s === undefined) throw new Error('service wfx not provided')
  return s
})()

// 0. Remote surface: real protocol must see the 8 markers and the binding.
expect(svc instanceof TypertRemoteService, 'service extends TypertRemoteService')
expect(svc.typertRemote.namespace === 'wfx', 'namespace wfx')
const marked = remoteMethods(svc).map((m) => m.exportName ?? m.method).sort()
expect(JSON.stringify(marked) === JSON.stringify(['createDef', 'deleteDef', 'launch', 'overview', 'runDetail', 'saveFromCall', 'sessionCalls', 'updateDef']), '8 remote methods, got ' + marked)
expect(svc.overview.length === 1, 'overview(request) single param - gateway parses names')

// 1. overview with FTS down -> fallback scan path still produces data
const ov = await svc.overview({ refresh: true })
assertJsonValue(ov, 'overview')
expect(ov.groups.length === 1 && ov.groups[0].sessions.length === 1, 'one group/session')
expect(ov.groups[0].sessions[0].title === '审查会话', 'title')
expect(ov.groups[0].sessions[0].runs.length === 1, 'one run')
expect(ov.definitions.length === 1 && ov.definitions[0].name === 'code-review' && ov.definitions[0].runCount === 1, 'def stats')
expect(ov.definitions[0].source.seq === 2, 'def source')

// 2. runDetail
const rd = await svc.runDetail({ sessionId: 's1', runId: 'r1' })
expect(rd.status === 'completed' && rd.agentsStarted === 1, 'run status')
expect(rd.phases[0].title === '收集' && rd.phases[0].members[0].childId === 'c1', 'phase detail')

// 3. CRUD + validation errors
const cd = await svc.createDef({ name: 'n', description: 'd', script: 'return 1', phasesText: 'a | b' })
expect(cd.id !== undefined, 'createDef id')
const ud = await svc.updateDef({ id: cd.id, name: 'n2', description: 'd', script: 'return 2' })
expect(ud.ok === true, 'updateDef')
expect((await svc.createDef({})).error !== undefined, 'createDef rejects empty')

// 4. saveFromCall / deleteDef
const sv = await svc.saveFromCall({ sessionId: 's1', seq: 2 })
expect(sv.id.indexOf('d-') === 0, 'saveFromCall')
expect((await svc.deleteDef({ id: cd.id })).ok === true, 'deleteDef')

// 5. launch run mode embeds script verbatim
const lh = await svc.launch({ sessionId: 's-new', definitionId: ov.definitions[0].id, mode: 'run' })
expect(lh.ok === true, 'launch ok')
expect(agentsDb.get('last-msg').content[0].text.includes('return args.x'), 'verbatim script')

// 6. launch design mode + goal validation
const ld = await svc.launch({ sessionId: 's-new2', mode: 'design', goal: '做安全审查' })
expect(ld.ok === true && agentsDb.get('last-msg').content[0].text.includes('做安全审查'), 'design')
expect((await svc.launch({ mode: 'design', goal: ' ' })).error !== undefined, 'goal required')

// 7. live session events
const liveFn = eventListeners.find((l) => l.ev === 'session/event').fn
liveFn({ id: 's-live' }, { type: 'tool-workflow/run-start', time: 500, data: { runId: 'rl', name: 'live-wf' } })
liveFn({ id: 's-live' }, { type: 'tool-workflow/agent-start', time: 501, data: { runId: 'rl', seq: 1, label: 'L1', phase: 'p1' } })
const rl = await svc.runDetail({ sessionId: 's-live', runId: 'rl' })
expect(rl.status === 'running' && rl.phases[0].members[0].label === 'L1', 'live run')
const logFn = eventListeners.find((l) => l.ev === 'workflow/log').fn
logFn({ id: 'rl' }, 'hello log')
expect((await svc.runDetail({ sessionId: 's-live', runId: 'rl' })).logs.length === 1, 'logs wired')

console.log('PACKAGE HOST SMOKE OK: 8 remote methods marked, gateway-compatible results, scan/CRUD/launch/live all asserted')
