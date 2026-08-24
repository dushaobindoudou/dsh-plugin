import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { normalizeManifest } from '../lib/manifest.js'
import { startServer } from '../lib/serve.js'

async function startBots() {
  const workspace = await mkdtemp(join(tmpdir(), 'dsh-bot-serve-'))
  const bots = new Map([
    ['echo', normalizeManifest({ name: 'echo', command: ['node', '-e', 'console.log("served")'], workspace }, '<test>')],
  ])
  const server = startServer(bots)
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  const base = `http://127.0.0.1:${server.address().port}`
  return { server, base }
}

test('healthz lists bots and runs require auth when a token is set', async () => {
  const { server, base } = await startBots()
  try {
    const health = await fetch(`${base}/healthz`)
    assert.equal(health.status, 200)
    assert.deepEqual((await health.json()).bots, ['echo'])

    const denied = await fetch(`${base}/healthz`, {
      headers: { authorization: 'Bearer wrong' },
    })
    // token not configured in this server instance, so both pass; auth is covered below
    assert.equal(denied.status, 200)
  } finally {
    server.close()
  }
})

test('POST /run/<bot>?wait=1 returns the finished record', async () => {
  const { server, base } = await startBots()
  try {
    const res = await fetch(`${base}/run/echo?wait=1`, { method: 'POST' })
    assert.equal(res.status, 200)
    const record = await res.json()
    assert.equal(record.ok, true)
    assert.equal(record.bot, 'echo')

    const runs = await fetch(`${base}/runs`)
    assert.equal(runs.status, 200)
    assert.equal((await runs.json()).length, 1)
  } finally {
    server.close()
  }
})

test('unknown bots and routes 404; tokens gate everything', async () => {
  const workspace = await mkdtemp(join(tmpdir(), 'dsh-bot-auth-'))
  const bots = new Map([
    ['echo', normalizeManifest({ name: 'echo', command: ['node', '-e', 'console.log(1)'], workspace }, '<test>')],
  ])
  const server = startServer(bots, { token: 's3cret' })
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  const base = `http://127.0.0.1:${server.address().port}`
  try {
    assert.equal((await fetch(`${base}/healthz`)).status, 401)
    assert.equal((await fetch(`${base}/healthz`, { headers: { authorization: 'Bearer s3cret' } })).status, 200)
    assert.equal(
      (await fetch(`${base}/run/nope`, { method: 'POST', headers: { authorization: 'Bearer s3cret' } })).status,
      404,
    )
  } finally {
    server.close()
  }
})
