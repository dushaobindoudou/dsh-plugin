/**
 * The subagent summary extraction: what the pet reads when a child settles.
 *
 * The complaint this locks down: a completion notification that reads as a
 * bare state ("已完成") tells the user nothing. The child's last assistant
 * message is the summary — these tests pin the extraction rules: last text
 * block wins, markdown furniture is stripped, the cap cuts at a sentence
 * boundary, an unreadable id slice never becomes the subject, and a machine
 * stopReason is translated before it reaches the bubble.
 */
import test from 'node:test'
import assert from 'node:assert/strict'

import { TaskWatch } from '../lib/tasks.js'

/** A minimal ctx: event handlers captured, every service absent. */
function fakeCtx() {
  const handlers = new Map()
  return {
    handlers,
    on(event, handler) {
      handlers.set(event, handler)
      return () => handlers.delete(event)
    },
    get: () => undefined,
  }
}

/** One watch with its transitions captured. The interval is unref'd, so the
 *  watch is simply left running — stop() would dispose the handlers. */
function watch() {
  const transitions = []
  const ctx = fakeCtx()
  const taskWatch = new TaskWatch({
    ctx,
    bridge: {},
    getSettings: () => ({}),
    onTransition: (transition) => transitions.push(transition),
  })
  taskWatch.start()
  return { transitions, emit: (event, payload) => ctx.handlers.get(event)?.(payload) }
}

test('the last text block wins: the conclusion, not the hand-off preamble', () => {
  const { transitions, emit } = watch()
  emit('subagent/start', { id: 'child-1' })
  emit('subagent/end', {
    id: 'child-1',
    stopReason: 'completed',
    lastAssistantMessage: [
      { type: 'text', text: 'STANDARDS review complete and delivered to the parent agent.' },
      { type: 'text', text: '审查完成：两条硬违规（用户会话入库、文档分层失真），3 组坏味道。' },
    ],
  })
  const settled = transitions.at(-1)
  assert.equal(settled.state, 'completed')
  assert.match(settled.summary, /两条硬违规/)
  assert.doesNotMatch(settled.summary, /STANDARDS/)
  assert.doesNotMatch(settled.summary, /子任务/, 'a generic subject must not lead a real outcome')
})

test('markdown furniture is stripped from the outcome line', () => {
  const { transitions, emit } = watch()
  emit('subagent/start', { id: 'child-2' })
  emit('subagent/end', {
    id: 'child-2',
    stopReason: 'completed',
    lastAssistantMessage: [{ type: 'text', text: '## 结论\n- `stage_imagegen_textures.py` 已接入管线\n- 断链已修' }],
  })
  const settled = transitions.at(-1)
  assert.match(settled.summary, /已接入管线/)
  assert.doesNotMatch(settled.summary, /#|`|^- /m)
})

test('no outcome and no session title falls back to 子任务, never an id slice', () => {
  const { transitions, emit } = watch()
  emit('subagent/start', { id: 'a1b2c3d4e5f6' })
  emit('subagent/end', { id: 'a1b2c3d4e5f6', stopReason: 'completed' })
  const settled = transitions.at(-1)
  // A terminal settle has NO summary to speak — the pet app reads one aloud
  // as the turn's result, and there is no honest outcome here. The row's
  // subject rides in `label` instead, and it is the human fallback, never
  // the id slice.
  assert.equal(settled.summary, undefined)
  assert.equal(settled.label, '子任务')
  assert.doesNotMatch(settled.label ?? '', /a1b2c3/)
})

test('a failed child reports 出错 in the bubble language, not the machine word', () => {
  const { transitions, emit } = watch()
  emit('subagent/start', { id: 'child-4' })
  emit('subagent/end', {
    id: 'child-4',
    stopReason: 'error',
    lastAssistantMessage: [{ type: 'text', text: 'exit 1: module not found' }],
  })
  const settled = transitions.at(-1)
  assert.equal(settled.state, 'failed')
  assert.match(settled.summary, /^出错 · exit 1/)
})

test('a long outcome is capped at a sentence boundary, not mid-word', () => {
  const { transitions, emit } = watch()
  const long = '全量构建通过了。'.repeat(30) + '剩余一项遗留：气泡居中字段未实现，已登记为 U1。'
  emit('subagent/start', { id: 'child-5' })
  emit('subagent/end', {
    id: 'child-5',
    stopReason: 'completed',
    lastAssistantMessage: [{ type: 'text', text: long }],
  })
  const settled = transitions.at(-1)
  const outcome = settled.summary
  assert.ok(Array.from(outcome).length <= 121, `outcome too long: ${outcome.length}`)
  assert.ok(/[。！？；]/.test(outcome), 'the cut should land on a sentence boundary')
})

test('a string lastAssistantMessage is accepted defensively', () => {
  const { transitions, emit } = watch()
  emit('subagent/start', { id: 'child-6' })
  emit('subagent/end', { id: 'child-6', stopReason: 'completed', lastAssistantMessage: '旧宿主的纯文本负载' })
  assert.match(transitions.at(-1).summary, /纯文本负载/)
})
