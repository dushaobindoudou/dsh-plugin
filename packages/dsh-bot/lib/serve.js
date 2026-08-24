// Webhook front: a tiny zero-dependency HTTP server that turns POST
// /run/<bot> into queued runs. Runs of the same bot are serialized; different
// bots run concurrently. Durable history lives in runs.jsonl; /runs exposes
// the in-memory tail.
import { createServer } from 'node:http'
import { runBot } from './runner.js'

export function startServer(bots, options = {}) {
  const token = options.token ?? process.env.DSH_BOT_TOKEN ?? null
  const history = []
  const tails = new Map()

  function enqueue(name) {
    const manifest = bots.get(name)
    const prev = tails.get(name) ?? Promise.resolve()
    const run = prev.then(() => runBot(manifest)).catch((err) => ({
      bot: name,
      ok: false,
      code: -1,
      attempts: 0,
      error: err.message,
    }))
    tails.set(
      name,
      run.then(
        () => undefined,
        () => undefined,
      ),
    )
    run.then((record) => {
      history.push(record)
      if (history.length > 100) history.splice(0, history.length - 100)
    })
    return run
  }

  const server = createServer((req, res) => {
    handle(req, res).catch((err) => reply(res, 500, { error: err.message }))
  })

  async function handle(req, res) {
    const url = new URL(req.url, 'http://localhost')
    if (token !== null && req.headers.authorization !== `Bearer ${token}`) {
      return reply(res, 401, { error: 'unauthorized' })
    }
    if (req.method === 'GET' && url.pathname === '/healthz') {
      return reply(res, 200, { ok: true, bots: [...bots.keys()] })
    }
    if (req.method === 'GET' && url.pathname === '/runs') {
      const limit = Number(url.searchParams.get('limit') ?? '20')
      return reply(res, 200, history.slice(-Math.max(1, Math.min(limit, 100))))
    }
    const match = req.method === 'POST' && url.pathname.match(/^\/run\/([a-z0-9_-]+)$/)
    if (match) {
      const name = match[1]
      if (!bots.has(name)) return reply(res, 404, { error: `unknown bot: ${name}` })
      if (url.searchParams.get('wait') === '1') {
        return reply(res, 200, await enqueue(name))
      }
      enqueue(name)
      return reply(res, 202, { queued: true, bot: name })
    }
    return reply(res, 404, { error: 'not found' })
  }

  function reply(res, status, body) {
    const payload = JSON.stringify(body)
    res.writeHead(status, { 'content-type': 'application/json' })
    res.end(payload)
  }

  return server
}
