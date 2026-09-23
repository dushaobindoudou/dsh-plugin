// Client smoke test for dsh-lingxi/lib/client.js
// Stubs the module loader, react (sync-rerender hook cells), and the
// connection RPC carrier; renders the registered settings section and
// exercises the page's RPC wiring end to end. CJS on purpose: the react stub
// must not pull a real react into the monorepo.
const fs = require('fs')
const path = require('path')

let captured = null
global.window = {
  __ModuleLoader__: {
    load(def) { captured = def },
  },
}
global.document = {
  head: { appended: [], appendChild(el) { this.appended.push(el) } },
  querySelector() { return null },
  createElement() { return { dataset: {}, textContent: '' } },
}

// minimal reactive react stub: per-component hook cells + sync rerender
const stateByFn = new WeakMap()
let renderCtx = null
const React = {
  createElement: (type, props, ...kids) => ({
    t: typeof type === 'string' ? type : (type.name || 'fn'),
    type,
    props: props || {},
    kids: kids.flat(2).filter((k) => k !== null && k !== undefined && k !== false && k !== true),
  }),
  useState(v) {
    const r = renderCtx
    if (r.i >= r.cells.length) r.cells.push({ v })
    const cell = r.cells[r.i++]
    const setter = (nv) => {
      cell.v = typeof nv === 'function' ? nv(cell.v) : nv
      r.renders++
      if (r.renders > 200) throw new Error('smoke stub: runaway rerender (>200)')
    }
    return [cell.v, setter]
  },
  useMemo(fn) { return fn() },
  useCallback(fn) { return fn },
  useEffect(fn) { fn(); return () => {} },
}
const invoke = (el) => {
  if (el === null || el === undefined || typeof el !== 'object') return el
  if (typeof el.type !== 'function') return el
  const fn = el.type
  let cells = stateByFn.get(fn)
  if (!cells) { cells = { list: [], used: false }; stateByFn.set(fn, cells) }
  const prev = renderCtx
  renderCtx = { cells: cells.list, i: 0, renders: 0, rerender: () => invoke(el) }
  let result
  try { result = fn(el.props) } finally { renderCtx = prev }
  return invoke(result)
}
const toText = (el) => {
  if (el === null || el === undefined || el === false || el === true) return ''
  if (typeof el !== 'object') return String(el)
  return el.kids.map(toText).join('')
}

const rpcCalls = []
const connection = {
  rpc: {
    async call(channel, endpoint, payload) {
      rpcCalls.push({ channel, endpoint, payload })
      if (endpoint === 'lingxi/status') {
        return {
          ok: true,
          value: {
            settings: { port: 47811, agentId: 'dsh', agentName: 'DSH Agent', agentBadge: 'DS', autoAnnounce: true, tools: { task: true, say: true, react: true, state: true, remember: true }, notify: { needs_approval: 'alert', needs_input: 'alert', blocked: 'report', failed: 'report' }, reminders: [{ id: 'deploy', title: '检查部署', detail: 'staging', everyMinutes: 30, enabled: true }] },
            loadInfo: { ignored: ['stray'], error: null, existed: true },
            bridge: { running: true, port: 47811, baseUrl: 'http://127.0.0.1:47811', detail: 'lingxi help' },
            agents: [{ id: 'dsh', name: 'DSH Agent', badge: 'DS', color: '#4D6BFE' }],
            meRegistered: true,
          },
        }
      }
      if (endpoint === 'lingxi/tasks') {
        return { ok: true, value: { tasks: [{ taskId: 's1', title: '跑测试', kind: 'test', state: 'running', source: 'agent', since: 1 }], watching: true } }
      }
      if (endpoint === 'lingxi/reminders') {
        return { ok: true, value: { declared: [{ id: 'deploy', title: '检查部署', detail: 'staging', everyMinutes: 30, enabled: true, text: '[灵犀] 检查部署 — staging' }], appEntries: [], lastSync: { posted: 1, removed: 0, kept: 0, at: 1 }, available: true } }
      }
      if (endpoint === 'lingxi/syncReminders') return { ok: true, value: { posted: 1, removed: 0, kept: 0, available: true } }
      if (endpoint === 'lingxi/setSettings') return { ok: true, value: { settings: payload.args.request, ignored: [] } }
      if (endpoint === 'lingxi/testSay') return { ok: true, value: { ok: true } }
      return { ok: false, error: { message: 'unknown ' + endpoint } }
    },
  },
}

require(path.join(__dirname, 'lib', 'client.js'))

const assert = (c, m) => { if (!c) throw new Error('ASSERT: ' + m) }
assert(captured !== null, 'module loader captured the definition')
assert(captured.id === 'dsh-lingxi', 'loader id')

const mod = captured.factory((name) => {
  if (name === 'react') return React
  throw new Error('unexpected require ' + name)
})
assert(global.document.head.appended.length === 1, 'style tag inserted once')
assert(typeof mod.apply === 'function' && Array.isArray(mod.inject), 'exports apply+inject')
assert(JSON.stringify(mod.inject) === JSON.stringify(['connection', 'slots', 'locale']), 'inject declares connection+slots+locale')

// Dictionary parity: a key translated in one language and forgotten in the
// other is the classic drift this test exists to catch.
const zhKeys = Object.keys(mod.locales.zh).sort()
const enKeys = Object.keys(mod.locales.en).sort()
assert(JSON.stringify(zhKeys) === JSON.stringify(enKeys), 'zh/en dictionaries share one key set')

// apply with a stub client ctx
const renderedSlots = []
const slotsSvc = {
  inject: (name, cb) => { renderedSlots.push({ name, reg: cb() }); return () => {} },
  register: (opts, render) => ({ opts, render }),
}
const localeSvc = {
  register: () => {},
  bind: () => (key) => mod.locales.zh[key] ?? key,
}
const ctx = {
  get: (n) => (n === 'connection' ? connection : n === 'slots' ? slotsSvc : n === 'locale' ? localeSvc : undefined),
  effect: (fn) => { fn(); return () => {} },
}
mod.apply(ctx)

assert(renderedSlots.length === 1, 'one section registered')
assert(renderedSlots[0].name === 'settings.section', 'registered into settings.section')
assert(renderedSlots[0].reg.opts.id === 'lingxi', 'section id is lingxi')

// First render + loaded render + save contract run async; exit explicitly.
;(async () => {
const element = renderedSlots[0].reg.render({ close: () => {} })
const first = toText(invoke(element))
assert(first.includes('正在读取桥接状态'), 'loading state renders first')

// Let the status RPC resolve, then re-render: hook cells persist per component.
const tick = () => new Promise((r) => setImmediate(r))
for (let i = 0; i < 5; i++) { await tick() }
const loaded = toText(invoke(element))
assert(loaded.includes('桥接在线'), 'status hero shows the bridge answer')
assert(loaded.includes('lingxi_task'), 'settings item lists the tools')
assert(loaded.includes('保存'), 'the save control exists')
assert(loaded.includes('dsh 正在运行的任务'), 'tasks section renders')
assert(loaded.includes('跑测试'), 'a running task renders with its state')
assert(loaded.includes('定时提醒'), 'reminders section renders')
assert(loaded.includes('检查部署'), 'a declared reminder renders with its cadence')
assert(loaded.includes('已注册的 agent') || loaded.includes('DSH Agent'), 'identity section renders from /agents data')
assert(rpcCalls.some((e) => e.endpoint === 'lingxi/status' && e.channel === '/api'), 'status rides the /api channel')

// The page's save contract: setSettings returns {settings, ignored}.
const envelope = await connection.rpc.call('/api', 'lingxi/setSettings', { args: { request: { autoAnnounce: false } } })
assert(envelope.ok === true && envelope.value.settings.autoAnnounce === false, 'setSettings shape matches the host remote')

console.log('all dsh-lingxi client smoke checks passed')
process.exit(0)
})().catch((error) => {
  console.error(error && error.message ? error.message : error)
  process.exit(1)
})
