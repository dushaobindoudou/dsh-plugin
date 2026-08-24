import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, readFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { normalizeManifest } from '../lib/manifest.js'
import { runBot, stateDir } from '../lib/runner.js'

async function tmpWorkspace() {
  return mkdtemp(join(tmpdir(), 'dsh-bot-run-'))
}

test('a successful run records ok with one attempt and durable evidence', async () => {
  const workspace = await tmpWorkspace()
  const m = normalizeManifest(
    { name: 'echo', command: ['node', '-e', 'console.log("hi from bot")'], workspace },
    '<test>',
  )
  const record = await runBot(m)
  assert.equal(record.ok, true)
  assert.equal(record.code, 0)
  assert.equal(record.attempts, 1)
  const log = await readFile(record.logFile, 'utf8')
  assert.match(log, /hi from bot/)
  const lines = (await readFile(join(stateDir(m), 'runs.jsonl'), 'utf8')).trim().split('\n')
  assert.equal(lines.length, 1)
  assert.equal(JSON.parse(lines[0]).bot, 'echo')
})

test('failures retry up to the policy and summarize once', async () => {
  const workspace = await tmpWorkspace()
  const m = normalizeManifest(
    { name: 'flaky', command: ['node', '-e', 'process.exit(3)'], retries: 2, workspace },
    '<test>',
  )
  const record = await runBot(m)
  assert.equal(record.ok, false)
  assert.equal(record.code, 3)
  assert.equal(record.attempts, 3)
  const lines = (await readFile(join(stateDir(m), 'runs.jsonl'), 'utf8')).trim().split('\n')
  assert.equal(lines.length, 1)
})

test('a run that succeeds on the second attempt reports attempts=2', async () => {
  const workspace = await tmpWorkspace()
  const script =
    'const fs=require("fs");const p=".dsh-bot/counter";' +
    'let n=0;try{n=+fs.readFileSync(p,"utf8")}catch{};n++;' +
    'fs.writeFileSync(p,String(n));if(n<2)process.exit(1)'
  const m = normalizeManifest(
    { name: 'second-time', command: ['node', '-e', script], retries: 3, workspace },
    '<test>',
  )
  const record = await runBot(m)
  assert.equal(record.ok, true)
  assert.equal(record.attempts, 2)
})

test('missing binaries surface as spawn errors, not crashes', async () => {
  const workspace = await tmpWorkspace()
  const m = normalizeManifest(
    { name: 'ghost', command: ['definitely-missing-bin-xyz'], workspace },
    '<test>',
  )
  const record = await runBot(m)
  assert.equal(record.ok, false)
  assert.equal(record.code, -1)
})

test('timeoutMs kills runaway commands', async () => {
  const workspace = await tmpWorkspace()
  const m = normalizeManifest(
    { name: 'slow', command: ['node', '-e', 'setTimeout(()=>{},60000)'], timeoutMs: 300, workspace },
    '<test>',
  )
  const record = await runBot(m)
  assert.equal(record.ok, false)
  assert.equal(record.timedOut, true)
  assert.ok(record.durationMs < 10000, `duration ${record.durationMs} should be short`)
})
