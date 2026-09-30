/**
 * The bubble's subject pipeline: the gate (readableSubject) and the formatter
 * (sayLine), unit-tested separately — the full watch→say chain lives in
 * subject.test.mjs.
 *
 * The complaint this locks down: watch-derived subjects are session titles
 * and id-slice fallbacks, and quoting them verbatim put broken sentences in
 * the cat's mouth — a prompt cut off mid-clause ("开始「有个问题是，当前这个
 * 猫咪会」") and a raw session id ("开始「session-d0a83757-89cf-49」"). The
 * gate decides what may be quoted; the formatter degrades to a subject-less
 * line when the gate passes nothing.
 */
import test from 'node:test'
import assert from 'node:assert/strict'

import { readableSubject, sayLine } from '../lib/notify.js'

test('short compact titles pass the gate verbatim', () => {
  assert.equal(readableSubject('修好登录页'), '修好登录页')
  assert.equal(readableSubject('部署上线'), '部署上线')
  // English and mixed short titles pass too.
  assert.equal(readableSubject('fix the 404'), 'fix the 404')
})

test('id-shaped subjects never pass the gate', () => {
  assert.equal(readableSubject('session-d0a83757-89cf-49'), undefined)
  assert.equal(readableSubject('0798d1be-638b-430c-8a19-8aa8d29f84a9'), undefined)
  assert.equal(readableSubject('child-1a2b3c'), undefined)
  // A real topic that merely contains hex-ish words stays.
  assert.equal(readableSubject('修 404 页面'), '修 404 页面')
})

test('long subjects pass only when they finish a sentence', () => {
  // The shape that started this gate: a prompt truncated mid-clause.
  assert.equal(readableSubject('有个问题是，当前这个猫咪会'), undefined)
  assert.equal(readableSubject('检查一下我们最新的代码是否'), undefined)
  // A long subject that lands on a terminator reads finished — it passes.
  assert.equal(readableSubject('重构通知管线，三层各归其位。'), '重构通知管线，三层各归其位。')
})

test('blank and non-string subjects never pass', () => {
  assert.equal(readableSubject(''), undefined)
  assert.equal(readableSubject('   '), undefined)
  assert.equal(readableSubject(undefined), undefined)
  assert.equal(readableSubject(null), undefined)
  assert.equal(readableSubject(42), undefined)
})

test('steering words name no subject — they answer nothing when quoted', () => {
  // The observed bubble: the cat announcing "开始「继续」" — the user's
  // one-word nudge read back as the work's name.
  assert.equal(readableSubject('继续'), undefined)
  assert.equal(readableSubject('好的'), undefined)
  assert.equal(readableSubject('继续吧'), undefined)
  assert.equal(readableSubject('OK'), undefined)
  assert.equal(readableSubject('ok'), undefined)
  // A real subject that merely contains the word stays.
  assert.equal(readableSubject('继续修登录页'), '继续修登录页')
})

test('sayLine quotes the subject it is given — the gate ran upstream', () => {
  assert.equal(sayLine('running', '修好登录页'), '开始「修好登录页」，有进展我再吱声～')
  assert.equal(sayLine('queued', '修好登录页'), '收到新任务：「修好登录页」')
})

test('sayLine degrades to subject-less phrasing when given nothing', () => {
  assert.equal(sayLine('running', undefined), '开工了，有进展我再吱声～')
  assert.equal(sayLine('queued', undefined), '收到新任务，等我看看。')
  assert.equal(sayLine('needs_approval', undefined), '有任务需要你授权，我在等你点头。')
  assert.equal(sayLine('needs_input', undefined), '有个问题想问你。')
  assert.equal(sayLine('blocked', undefined), '有任务卡住了，需要你看一眼。')
  assert.equal(sayLine('failed', undefined), '有任务失败了，别慌，我记下了。')
  // The old default leaked the raw English state into the bubble.
  assert.equal(sayLine('cancelled', undefined), '任务取消了，先这样。')
})

test('the credential wait keeps its ask and is never quoted', () => {
  // These openers are plugin-composed and already read as a sentence.
  assert.equal(sayLine('needs_input', '需要凭据'), '需要凭据需要你来处理，我不动。')
  assert.equal(sayLine('needs_input', '需要登录'), '需要登录需要你来处理，我不动。')
})
