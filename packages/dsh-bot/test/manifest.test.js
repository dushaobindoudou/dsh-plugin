import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { loadManifest, normalizeManifest } from '../lib/manifest.js'

test('prompt manifests wrap the dsh headless invocation', () => {
  const m = normalizeManifest({ name: 'nightly', prompt: 'run the tests' })
  assert.deepEqual(m.command, ['dsh', '--profile', 'headless', 'run the tests'])
  assert.equal(m.profile, 'headless')
  assert.equal(m.schedule, null)
  assert.equal(m.retries, 0)
  assert.equal(m.timeoutMs, 0)
  assert.equal(m.workspace, process.cwd())
})

test('profile is configurable', () => {
  const m = normalizeManifest({ name: 'x', prompt: 'hi', profile: 'bot-runner' })
  assert.deepEqual(m.command, ['dsh', '--profile', 'bot-runner', 'hi'])
})

test('command manifests pass argv through or wrap shell strings', () => {
  const argv = normalizeManifest({ name: 'x', command: ['make', 'deploy'] })
  assert.deepEqual(argv.command, ['make', 'deploy'])
  const shell = normalizeManifest({ name: 'y', command: 'make deploy && echo done' })
  assert.deepEqual(shell.command, ['sh', '-c', 'make deploy && echo done'])
})

test('validation rejects broken manifests', () => {
  assert.throws(() => normalizeManifest({ name: 'x' }), /exactly one of/)
  assert.throws(() => normalizeManifest({ name: 'x', prompt: 'a', command: ['b'] }), /mutually exclusive/)
  assert.throws(() => normalizeManifest({ prompt: 'a' }), /name: required slug/)
  assert.throws(() => normalizeManifest({ name: 'Bad Name', prompt: 'a' }), /name: required slug/)
  assert.throws(() => normalizeManifest({ name: 'x', prompt: 'a', schedule: 'nope' }), /schedule:/)
  assert.throws(() => normalizeManifest({ name: 'x', prompt: 'a', timeoutMs: 0 }), /timeoutMs:/)
  assert.throws(() => normalizeManifest({ name: 'x', prompt: 'a', retries: 1.5 }), /retries:/)
})

test('loadManifest resolves workspace relative to the manifest file', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'dsh-bot-manifest-'))
  const file = join(dir, 'bot.json')
  await writeFile(file, JSON.stringify({ name: 'local', prompt: 'hi', workspace: '.' }))
  const m = await loadManifest(file)
  assert.equal(m.workspace, dir)
})

test('loadManifest reports unreadable and invalid files', async () => {
  await assert.rejects(() => loadManifest('/nonexistent/bot.json'), /manifest unreadable/)
  const dir = await mkdtemp(join(tmpdir(), 'dsh-bot-bad-'))
  const file = join(dir, 'bot.json')
  await writeFile(file, '{ not json')
  await assert.rejects(() => loadManifest(file), /not valid JSON/)
})
