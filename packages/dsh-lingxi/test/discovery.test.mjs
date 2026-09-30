/**
 * The mount/reconcile contract: what the sweep may and may not announce.
 *
 * The complaint this locks down (notify-log, 09-30 14:24): the host
 * restarted and the cat greeted it with nine identical "开工了" bubbles —
 * one per RESIDENT session, most of them idle for days, the oldest last
 * touched three weeks before. Two rules now govern the sweep:
 *
 *  1. RESIDENT is not RUNNING: agents.list() is every rehydrated session,
 *     and only the registry's own status decides who gets a running row.
 *  2. A DISCOVERY is not a START: a task the sweep found mid-flight rides
 *     the feed and the face, but never claims "开工了" nobody observed —
 *     the row's own state changes are announced when the events see them.
 *
 * Alongside: the terminal wire contract the pet app depends on — a settle
 * carries the note (the reporter's words) or nothing, plus `label` for the
 * row's subject and `origin: 'hook'` so the app speaks its lifecycle line
 * instead of reading the row title aloud as the turn's result.
 */
import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { TaskWatch } from '../lib/tasks.js'
import { AttentionNotifier } from '../lib/notify.js'
import { NotifyLog, loggingBridge } from '../lib/notify-log.js'

/** A watch + notifier wired over a fake registry. `agents` is what
 *  agents.list() answers this pass — the LIVE array, so a test can mutate
 *  the registry's truth between sweeps; the object shapes are what the
 *  sweep reads. */
function rig(agents) {
  const handlers = new Map()
  const deferred = []
  const ctx = {
    on(event, handler) {
      handlers.set(event, handler)
      return () => handlers.delete(event)
    },
    get(service) {
      if (service === 'agents') return { list: () => agents }
      if (service === 'sessions') return { get: () => ({}) }
      if (service === 'sessionTitle') return { get: () => ({ title: '有个问题是，当前这个猫咪会' }) }
      return undefined
    },
  }
  const says = []
  const events = []
  const settings = { agentId: 'dsh', notify: { running: 'status' } }
  const log = new NotifyLog({ path: join(mkdtempSync(join(tmpdir(), 'lingxi-discovery-')), 'notify-log.jsonl') })
  // The same wrapping index.js uses: every wire call records its delivery.
  const bridgeRef = {
    current: {
      async taskEvent(event) { events.push(event); return { ok: true } },
      async control(action) { says.push(action); return { ok: true } },
    },
  }
  const notifier = new AttentionNotifier({
    bridge: loggingBridge(bridgeRef, log),
    getSettings: () => settings,
    delay: (fn) => { deferred.push(fn); return () => {} },
    log,
  })
  const taskWatch = new TaskWatch({
    ctx,
    bridge: {},
    getSettings: () => settings,
    onTransition: (transition) => notifier.handle(transition),
  })
  taskWatch.start()
  return {
    says,
    events,
    reconcile: () => taskWatch.reconcile(),
    notify: (transition) => notifier.handle(transition),
    emit: (event, ...payload) => handlers.get(event)?.(...payload),
    /** Run the captured debounces, then settle the async wire round-trips. */
    flush: async () => {
      deferred.splice(0).forEach((fn) => fn())
      await new Promise((resolve) => setImmediate(resolve))
    },
    lines: () => readFileSync(log.path, 'utf8').trim().split('\n').map((line) => JSON.parse(line)),
  }
}

test('the sweep tracks only genuinely running agents', async () => {
  const { events, flush } = rig([
    { id: 'session-live', status: 'running' },
    { id: 'session-idle-for-weeks', status: 'idle' },
  ])
  await flush()

  const rows = events.map((event) => event.taskId)
  assert.ok(rows.includes('session-live'), 'the working session gets its running row')
  assert.ok(!rows.includes('session-idle-for-weeks'), 'a resident idle session is not "running"')
  assert.equal(events.filter((event) => event.state === 'running').length, 1)
})

test('a discovery rides the feed but never claims a start', async () => {
  const { says, events, flush, lines } = rig([{ id: 'session-live', status: 'running' }])
  await flush()

  // The row and its context ride: the feed knows what is running.
  const row = events.find((event) => event.taskId === 'session-live')
  assert.equal(row?.state, 'running')
  assert.equal(row?.kind, 'chat')
  assert.equal(row?.origin, 'hook')
  assert.equal(row?.label, '有个问题是，当前这个猫咪会')
  // The mouth stays closed: nobody observed this work starting.
  assert.equal(says.length, 0)
  // And the silence is auditable, not silent-by-accident.
  const decision = lines().find((line) => line.decision === 'suppressed-discovery')
  assert.equal(decision?.taskId, 'session-live')
})

test('an observed restart after the sweep still speaks', async () => {
  const { says, flush, emit } = rig([{ id: 'session-live', status: 'running' }])
  await flush()
  assert.equal(says.length, 0, 'the mount discovery stays silent')

  // The session settles, then genuinely starts again: the events see both,
  // and the observed start is the one that may say.
  emit('agent/status', { agent: { id: 'session-live' }, status: 'idle' })
  emit('agent/status', { agent: { id: 'session-live' }, status: 'running' })
  await flush()
  assert.equal(says.at(-1)?.say, '开工了，有进展我再吱声～')
})

test('a running row whose agent went idle settles on the next sweep', async () => {
  const registry = [{ id: 'session-live', status: 'running' }]
  const { events, flush, emit, reconcile } = rig(registry)
  await flush()
  emit('agent/status', { agent: { id: 'session-live' }, status: 'running' })
  await flush()
  assert.equal(events.filter((event) => event.state === 'running').length, 1)

  // The idle event was lost; the sweep reads the registry's truth and the
  // stale running row settles instead of running forever.
  registry.length = 0
  registry.push({ id: 'session-live', status: 'idle' })
  await reconcile()
  await flush()
  const settled = events.filter((event) => event.taskId === 'session-live' && event.state !== 'running')
  assert.equal(settled.length, 1, 'the stale running row settles instead of running forever')
  assert.equal(settled.at(-1)?.state, 'completed')
})

test('a terminal settle carries the note or nothing — never the row title', async () => {
  const { events, says, flush, emit, notify } = rig([{ id: 's1', status: 'running' }])
  emit('agent/status', { agent: { id: 's1' }, status: 'running' })
  notify({ taskId: 's1', state: 'completed', source: 'tool', kind: 'build', summary: '修复了挂载误报' })
  await flush()

  // The model's own report: the agent's words, no hook mark — the pet app
  // speaks it in full as the report it is.
  const report = events.find((event) => event.state === 'completed' && event.summary === '修复了挂载误报')
  assert.equal(report?.origin, undefined)
  assert.equal(report?.kind, 'build')

  // The host's settle that follows: hook-marked, chat-typed, and it does
  // NOT inherit the report's kind — the app's turn-end machinery keys on
  // chat to stay silent after the report. Its summary carries the
  // remembered report only as feed context; the say stays a plugin no-op
  // (completed never says twice).
  emit('agent/status', { agent: { id: 's1' }, status: 'idle' })
  await flush()
  const settle = events.filter((event) => event.state === 'completed').at(-1)
  assert.equal(settle?.kind, 'chat', 'the settle speaks the watch kind, not the report kind')
  assert.equal(settle?.origin, 'hook')
  assert.equal(settle?.summary, '修复了挂载误报')
  assert.equal(settle?.label, '有个问题是，当前这个猫咪会')
  assert.equal(says.filter((action) => action.say?.includes('修复了挂载误报')).length, 0)
})

test('a note-less settle has no summary — the row keeps its subject in label', async () => {
  const { events, flush, emit } = rig([])
  emit('agent/status', { agent: { id: 's2' }, status: 'running' })
  emit('agent/status', { agent: { id: 's2' }, status: 'idle' })
  await flush()

  const settled = events.filter((event) => event.taskId === 's2').at(-1)
  assert.equal(settled?.state, 'completed')
  // The observed 09-30 bubble: "已完成：我看到了，你这UI 交互需要优化…" —
  // the user's own steering words read back as the result. The wire now
  // sends no summary to speak; the subject lives in the label column.
  assert.equal(settled?.summary, undefined)
  assert.equal(settled?.label, '有个问题是，当前这个猫咪会')
  assert.equal(settled?.origin, 'hook')
})

test('the say audit joins: say-emit carries an eid, the wire call carries the task', async () => {
  const { says, flush, emit, lines } = rig([])
  emit('agent/inbox/inserted', { agent: { id: 's3' }, message: { content: [{ type: 'text', text: '帮我修好登录页' }] } })
  emit('agent/status', { agent: { id: 's3' }, status: 'running' })
  await flush()

  const said = says.find((action) => action.say === '开始「帮我修好登录页」，有进展我再吱声～')
  assert.equal(said?.taskId, 's3', 'the control call keys its delivery record back to the task')
  const decision = lines().find((line) => line.decision === 'say-emit')
  assert.equal(decision?.taskId, 's3')
  assert.ok(decision?.eid, 'the decision record carries the emission id')
  const delivery = lines().find((line) => line.decision === 'delivered' && line.sayText?.includes('帮我修好登录页'))
  assert.equal(delivery?.taskId, 's3', 'delivery joins its decision on (taskId, sayText)')
})
