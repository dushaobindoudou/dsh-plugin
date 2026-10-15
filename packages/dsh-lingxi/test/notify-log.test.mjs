/**
 * The notify log: what the notification pipeline decided and what actually
 * left the wire. These tests pin the CONTRACT the later analysis will read:
 *
 *  - every task-event carries a decision record with its summary provenance
 *    (model-report / watch-derived / generic) — the 准 axis;
 *  - a repeated state records dedup, a silenced state records
 *    suppressed-by-policy, a watch start records debounced-start — the
 *    不多不少 and 时机 axes; none of these are visible anywhere else;
 *  - every wire call records its delivery, including the app's 400
 *    stage-busy rejections;
 *  - rotation caps the file, and logging never breaks notifying.
 */
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createServer } from 'node:http'
import { PetBridge } from '../lib/pet-contract/bridge.js'

import { AttentionNotifier } from '../lib/notify.js'
import { NotifyLog, loggingBridge } from '../lib/notify-log.js'

function makeLog(name) {
  const dir = mkdtempSync(join(tmpdir(), `lingxi-log-${name}-`))
  return new NotifyLog({ path: join(dir, 'notify-log.jsonl') })
}

/** A bridge stub that answers ok — or with the given result. */
function bridgeStub(result = { ok: true, status: 200, data: {} }) {
  const calls = []
  return {
    calls,
    async control(action) { calls.push({ mouth: 'control', action }); return result },
    async taskEvent(event, provider) { calls.push({ mouth: 'task-event', event, provider }); return result },
  }
}

function notifierWith(log, bridge, delay = (_fn, _ms) => () => {}, notify = {}) {
  return new AttentionNotifier({ bridge, getSettings: () => ({ agentId: 'dsh', notify }), delay, log })
}

function lines(log) {
  return readFileSync(log.path, 'utf8').trim().split('\n').map((line) => JSON.parse(line))
}

test('task correlation stays in the log and never reaches the strict control endpoint', async () => {
  const bodies = []
  const server = createServer((req, res) => {
    let body = ''
    req.on('data', (chunk) => { body += chunk })
    req.on('end', () => {
      const action = JSON.parse(body)
      bodies.push(action)
      const rejected = 'taskId' in action ? ['unknown field "taskId"'] : []
      res.writeHead(rejected.length ? 400 : 200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ ok: !rejected.length, rejected }))
    })
  })
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  try {
    const log = makeLog('control-contract')
    const bridge = new PetBridge({ port: server.address().port, token: 'test', agentId: 'dsh' })
    const wrapped = loggingBridge({ current: bridge }, log)
    const result = await wrapped.control({ say: '需要确认', agent: 'dsh', priority: 'alert', taskId: 's1' })
    assert.equal(result.ok, true, 'audit metadata must not cause an otherwise valid bubble to fail')
    assert.equal(bodies[0].taskId, undefined)
    assert.equal(bodies[0].say, '需要确认')
    const record = lines(log).at(-1)
    assert.equal(record.taskId, 's1')
    assert.equal(record.decision, 'delivered')
  } finally {
    await new Promise((resolve) => server.close(resolve))
  }
})

test('bridge rejection reasons survive into the delivery log', async () => {
  const log = makeLog('rejection-reason')
  const bridge = new PetBridge({ token: 'test', fetchImpl: async () => new Response(
    JSON.stringify({ ok: false, rejected: ['stage busy: alert showing'] }),
    { status: 400, headers: { 'Content-Type': 'application/json' } },
  ) })
  await loggingBridge({ current: bridge }, log).control({ say: '检查' })
  assert.equal(lines(log).at(-1).delivery.error, 'stage busy: alert showing')
})

test('a model report emits a decision record with model-report provenance', () => {
  const log = makeLog('prov')
  const bridge = bridgeStub()
  const notifier = notifierWith(log, bridge)
  notifier.handle({ taskId: 's1', state: 'completed', summary: '修复了 404', source: 'tool' })
  const records = lines(log)
  assert.equal(records.length, 2, 'the emit decision + the policy layer: completed is silent by default')
  assert.equal(records[0].channel, 'task-event')
  assert.equal(records[0].decision, 'emit')
  assert.equal(records[0].provenance, 'model-report')
  assert.equal(records[0].summary, '修复了 404')
  assert.equal(records[1].decision, 'suppressed-by-policy')
})

test('a repeated state records dedup; a silenced state records suppression', () => {
  const log = makeLog('decide')
  const bridge = bridgeStub()
  const notifier = notifierWith(log, bridge)
  notifier.handle({ taskId: 's1', state: 'needs_approval', summary: '等授权', source: 'tool' })
  notifier.handle({ taskId: 's1', state: 'needs_approval', summary: '等授权', source: 'tool' })
  notifier.handle({ taskId: 's2', state: 'queued', summary: '新任务', source: 'tool' })
  const decisions = lines(log).map((r) => r.decision)
  assert.deepEqual(decisions, ['emit', 'say-emit', 'emit', 'dedup', 'emit', 'suppressed-by-policy'])
  // and the deduped state never reached the wire a second time
  const says = bridge.calls.filter((c) => c.mouth === 'control')
  assert.equal(says.length, 1)
})

test('a watch-sourced start is debounced, then announces with the line it chose', async () => {
  const log = makeLog('debounce')
  const bridge = bridgeStub()
  let fire = null
  // running is a silent state by default; the debounce path exists for a
  // policy that lifts running says — which is exactly when the enrichment
  // wait matters. The bridge is the logging wrapper, as in the real mount.
  const notifier = notifierWith(log, loggingBridge({ current: bridge }, log), (fn) => { fire = fn; return () => {} }, { running: 'status' })
  notifier.handle({ taskId: 's1', state: 'running', summary: '开始编译', source: 'subagent', titleGeneric: false })
  assert.match(lines(log).at(-1).decision, /debounced-start/)
  fire?.()
  // announce is async — let the control round-trip settle before reading
  await new Promise((resolve) => setImmediate(resolve))
  const decisions = lines(log).map((r) => r.decision)
  assert.ok(decisions.includes('say-emit'))
  const sayEmit = lines(log).find((r) => r.decision === 'say-emit')
  assert.match(sayEmit.sayText, /开始「开始编译」/)
  // the wire layer recorded the delivery of that same line
  const delivered = lines(log).filter((r) => r.decision === 'delivered' && r.channel === 'say')
  assert.equal(delivered.length, 1)
  assert.equal(delivered[0].sayText, sayEmit.sayText)
})

test('a 400 stage-busy rejection is recorded as dropped with its reason', async () => {
  const log = makeLog('drop')
  const bridge = bridgeStub({ ok: false, status: 400, data: { rejected: ['stage busy: alert showing'] }, error: 'rejected' })
  const wrapped = loggingBridge({ current: bridge }, log)
  await wrapped.control({ say: '一句话', agent: 'dsh', priority: 'status' })
  const wire = lines(log).at(-1)
  assert.equal(wire.channel, 'say')
  assert.equal(wire.decision, 'dropped')
  assert.equal(wire.delivery.status, 400)
  assert.equal(wire.sayText, '一句话')
})

test('the log rotates by size and keeps the configured generations', () => {
  const log = makeLog('rotate')
  log.maxBytes = 200
  log.generations = 2
  for (let i = 0; i < 20; i++) log.record({ channel: 'task-event', decision: 'emit', i, pad: 'x'.repeat(40) })
  assert.ok(existsSync(`${log.path}.1`), 'the first generation exists')
  assert.ok(Array.from(readFileSync(log.path, 'utf8')).length < 400, 'the live file stays under the cap')
})

test('logging never breaks notifying: an unwritable path stays silent', () => {
  const broken = new NotifyLog({ path: join(tmpdir(), 'lingxi-log-none', 'missing-dir', 'x.jsonl') })
  // point the path AT a directory so appendFileSync fails
  const dir = mkdtempSync(join(tmpdir(), 'lingxi-log-broken-'))
  broken.path = dir
  const bridge = bridgeStub()
  const notifier = notifierWith(broken, bridge)
  assert.doesNotThrow(() => notifier.handle({ taskId: 's1', state: 'completed', summary: 'x', source: 'tool' }))
  assert.equal(bridge.calls.length, 1, 'the task-event still rode')
})
