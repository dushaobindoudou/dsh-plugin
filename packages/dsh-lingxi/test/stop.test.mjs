/**
 * The stop hook: what clicking "stop" in the GUI means for the feed.
 *
 * The complaint this locks down: the user stopped a run and the row went
 * completed — and, before summary honesty, the cat announced the stop with
 * the user's own ask as its result ("已完成：帮我修好登录页" — the ask they
 * were cancelling). The status bus cannot express a stop: idle there means
 * "not running", and a finished turn and a cancelled one land identically.
 * The session stream can: the agent loop appends `turn/end` with
 * `reason.kind === "aborted"` when a cancel interrupts the turn (a user
 * stop passes cause { kind: "user" }, the goal driver's parent teardown
 * { kind: "parent" }). An abort IS a cancellation.
 */
import test from 'node:test'
import assert from 'node:assert/strict'

import { TaskWatch } from '../lib/tasks.js'
import { AttentionNotifier } from '../lib/notify.js'

function rig() {
  const handlers = new Map()
  const deferred = []
  const ctx = {
    on(event, handler) {
      handlers.set(event, handler)
      return () => handlers.delete(event)
    },
    get: () => undefined,
  }
  const events = []
  const settings = { agentId: 'dsh', notify: {} }
  const notifier = new AttentionNotifier({
    bridge: {
      async taskEvent(event) { events.push(event); return { ok: true } },
      async control() { return { ok: true } },
    },
    getSettings: () => settings,
    delay: (fn) => { deferred.push(fn); return () => {} },
  })
  const taskWatch = new TaskWatch({
    ctx,
    bridge: {},
    getSettings: () => settings,
    onTransition: (transition) => notifier.handle(transition),
  })
  taskWatch.start()
  return {
    events,
    emit: (event, ...payload) => handlers.get(event)?.(...payload),
    flush: async () => {
      deferred.splice(0).forEach((fn) => fn())
      await new Promise((resolve) => setImmediate(resolve))
    },
  }
}

/** The stream record of an interrupted turn, as dsh-session appends it. */
const stopEvent = (cause = 'user') => ({
  type: 'turn/end',
  data: { turn: 3, reason: { kind: 'aborted', reason: { kind: cause } } },
})

test('a user stop settles cancelled, never completed', async () => {
  const { events, emit, flush } = rig()
  emit('agent/status', { agent: { id: 's1' }, status: 'running' })
  emit('session/event', { id: 's1' }, stopEvent())
  await flush()

  const row = events.filter((event) => event.taskId === 's1').at(-1)
  assert.equal(row?.state, 'cancelled')
  assert.equal(row?.origin, 'hook')
  assert.equal(row?.kind, 'chat')
  // Nothing to read aloud: the state IS the message, and the user knows —
  // the ask they typed must never resurface as a "result".
  assert.equal(row?.summary, undefined)

  // The follow-up status flip must not repaint it completed.
  emit('agent/status', { agent: { id: 's1' }, status: 'idle' })
  await flush()
  const states = events.filter((event) => event.taskId === 's1').map((event) => event.state)
  assert.deepEqual(states, ['running', 'cancelled'])
})

test('the goal driver stopping a child cancels it too', async () => {
  const { events, emit, flush } = rig()
  emit('agent/status', { agent: { id: 's2' }, status: 'running' })
  emit('session/event', { id: 's2' }, stopEvent('parent'))
  await flush()
  assert.equal(events.filter((event) => event.taskId === 's2').at(-1)?.state, 'cancelled')
})

test('a fresh turn after a stop completes normally', async () => {
  const { events, emit, flush } = rig()
  emit('agent/status', { agent: { id: 's3' }, status: 'running' })
  emit('session/event', { id: 's3' }, stopEvent())
  emit('agent/inbox/inserted', { agent: { id: 's3' }, message: { content: [{ type: 'text', text: '换个思路再试' }] } })
  // cancel() runs with keepInbox: true — the queued ask starts a new turn,
  // and that turn's completion is a completion, not the old stop.
  emit('agent/status', { agent: { id: 's3' }, status: 'running' })
  emit('agent/status', { agent: { id: 's3' }, status: 'idle' })
  await flush()

  // The queued row is the kept inbox speaking: cancel() ran with
  // keepInbox: true, so the ask the user typed before stopping starts a
  // row of its own the moment the watch sees the next ask land.
  const states = events.filter((event) => event.taskId === 's3').map((event) => event.state)
  assert.deepEqual(states, ['running', 'cancelled', 'queued', 'running', 'completed'])
})

test('a normal turn completion is untouched by the stop hook', async () => {
  const { events, emit, flush } = rig()
  emit('agent/status', { agent: { id: 's4' }, status: 'running' })
  emit('agent/status', { agent: { id: 's4' }, status: 'idle' })
  await flush()
  const states = events.filter((event) => event.taskId === 's4').map((event) => event.state)
  assert.deepEqual(states, ['running', 'completed'])
})

test('a stop while the row waits for the user resolves the wait as cancelled', async () => {
  const { events, emit, flush } = rig()
  emit('agent/status', { agent: { id: 's5' }, status: 'running' })
  // The waterfall stays pending — in production it resolves only when the
  // user answers or cancels; a never-settling promise models the wait.
  emit('approval/request', { agent: { id: 's5' }, toolCall: { title: 'rm -rf /tmp/x' } }, () => new Promise(() => {}))
  emit('session/event', { id: 's5' }, stopEvent())
  await flush()
  const states = events.filter((event) => event.taskId === 's5').map((event) => event.state)
  assert.deepEqual(states, ['running', 'needs_approval', 'cancelled'])
})
