/**
 * The full subject chain: TaskWatch transition → AttentionNotifier say text.
 *
 * The complaint this locks down: the cat announced the SESSION'S NAME for
 * every round of work ("开始「有个问题是，当前这个猫咪会」") — a title that
 * froze at (or near) the session's first ask, so each new round announced a
 * task the session had already left behind ("跟当前的任务一点关系没有").
 * The chain now splits the row from the mouth: the feed keeps the session
 * title, while the say quotes only a FRESH subject — the user's latest ask
 * (input hint) or a model report — and goes subject-less otherwise.
 */
import test from 'node:test'
import assert from 'node:assert/strict'

import { TaskWatch } from '../lib/tasks.js'
import { AttentionNotifier } from '../lib/notify.js'

/** A watch wired to a notifier with captured wire calls. The debounce is
 *  captured, not run — tests flush it to simulate the model report landing
 *  inside the window. running is silent by default policy, so the settings
 *  lift it — which is exactly the configuration the user runs. */
function rig() {
  const handlers = new Map()
  const ctx = {
    on(event, handler) {
      handlers.set(event, handler)
      return () => handlers.delete(event)
    },
    // Every service absent EXCEPT the session title: the host's title for
    // every session is the stale frozen name the user complained about.
    get(service) {
      if (service === 'sessions') return { get: () => ({}) }
      if (service === 'sessionTitle') return { get: () => ({ title: '有个问题是，当前这个猫咪会' }) }
      return undefined
    },
  }
  const says = []
  const events = []
  const deferred = []
  const settings = { agentId: 'dsh', notify: { running: 'status' } }
  const notifier = new AttentionNotifier({
    bridge: {
      async taskEvent(event) { events.push(event); return { ok: true } },
      async control(action) { says.push(action); return { ok: true } },
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
    says,
    events,
    notify: (transition) => notifier.handle(transition),
    emit: (event, ...payload) => handlers.get(event)?.(...payload),
    /** Flush the captured debounce and settle the async wire round-trips. */
    async flush() {
      deferred.splice(0).forEach((fn) => fn())
      await new Promise((resolve) => setImmediate(resolve))
    },
  }
}

test('a running round without a fresh ask says subject-less, and the feed keeps the title', async () => {
  const { says, events, emit, flush } = rig()
  emit('agent/status', { agent: { id: 's1' }, status: 'running' })
  await flush()

  // The mouth never quotes the frozen session title.
  assert.equal(says.at(-1)?.say, '开工了，有进展我再吱声～')
  // The feed still carries the session title as context.
  assert.equal(events.at(-1)?.summary, '有个问题是，当前这个猫咪会')
})

test('a fresh ask (input hint) becomes the running subject', async () => {
  const { says, emit, flush } = rig()
  emit('agent/inbox/inserted', { agent: { id: 's2' }, message: { content: [{ type: 'text', text: '帮我修好登录页' }] } })
  emit('agent/status', { agent: { id: 's2' }, status: 'running' })
  await flush()

  assert.equal(says.at(-1)?.say, '开始「帮我修好登录页」，有进展我再吱声～')
})

test('a model report outranks everything, even a long unfinished one', async () => {
  const { says, notify, flush } = rig()
  // The model's own lingxi_task report lands first: written to be read aloud,
  // it skips the length gate — a real task name beats a generic line.
  notify({ taskId: 's3', state: 'running', source: 'tool', kind: 'fix', summary: '修复 typert 副本分裂导致的 404' })
  await flush()
  assert.equal(says.at(-1)?.say, '开始「修复 typert 副本分裂导致的 404」，有进展我再吱声～')
})

test('a report landing inside the debounce window replaces the subject-less start line', async () => {
  const { says, emit, notify, flush } = rig()
  emit('agent/status', { agent: { id: 's5' }, status: 'running' })
  // Nothing said yet — the start line is waiting out the debounce.
  assert.equal(says.length, 0)
  // The model reports what the work actually is.
  notify({ taskId: 's5', state: 'running', source: 'tool', kind: 'fix', summary: '给活动唤醒接上 notify-log 审计' })
  assert.equal(says.length, 0, 'still inside the window')
  // The window closes: the fresh report speaks, not the frozen title.
  await flush()
  assert.equal(says.at(-1)?.say, '开始「给活动唤醒接上 notify-log 审计」，有进展我再吱声～')
})

test('a failed round of a generic row reports the cause alone, not the stale title', async () => {
  const { events, emit } = rig()
  emit('agent/status', { agent: { id: 's4' }, status: 'running' })
  emit('agent/error', { agent: { id: 's4' }, step: 3 })

  const last = events.at(-1)
  assert.equal(last?.state, 'failed')
  assert.equal(last?.summary, '第 3 步出错')
})
