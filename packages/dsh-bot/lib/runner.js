// Run one bot: spawn its command in its workspace, capture output, apply the
// retry policy, and append a durable record to <workspace>/.dsh-bot/runs.jsonl.
import { spawn } from 'node:child_process'
import { appendFile, mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const MAX_LOG_CHARS = 64 * 1024

export function stateDir(manifest) {
  return join(manifest.workspace, '.dsh-bot')
}

export async function runBot(manifest) {
  const dir = stateDir(manifest)
  await mkdir(dir, { recursive: true })
  const startedAt = new Date()
  let record = null
  const maxAttempts = 1 + manifest.retries
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    record = await attemptOnce(manifest, dir, startedAt, attempt)
    if (record.ok) break
  }
  const summary = {
    bot: manifest.name,
    ok: record.ok,
    code: record.code,
    timedOut: record.timedOut,
    attempts: record.attempt,
    retries: manifest.retries,
    startedAt: record.startedAt,
    durationMs: record.durationMs,
    logFile: record.logFile,
  }
  await appendFile(join(dir, 'runs.jsonl'), JSON.stringify(summary) + '\n')
  return summary
}

async function attemptOnce(manifest, dir, startedAt, attempt) {
  const t0 = Date.now()
  const stamp = startedAt.toISOString().replace(/[:.]/g, '-')
  const logFile = join(dir, `${stamp}-${manifest.name}-attempt${attempt}.log`)
  const child = spawn(manifest.command[0], manifest.command.slice(1), {
    cwd: manifest.workspace,
  })

  let out = ''
  child.stdout.on('data', (chunk) => {
    out += chunk
  })
  child.stderr.on('data', (chunk) => {
    out += chunk
  })

  let timedOut = false
  const code = await new Promise((resolve) => {
    let settled = false
    const finish = (value) => {
      if (settled) return
      settled = true
      if (timer !== null) clearTimeout(timer)
      resolve(value)
    }
    const timer =
      manifest.timeoutMs > 0
        ? setTimeout(() => {
            timedOut = true
            child.kill('SIGTERM')
            setTimeout(() => child.kill('SIGKILL'), 5000).unref()
          }, manifest.timeoutMs)
        : null
    child.on('error', (err) => {
      out += `\n[dsh-bot] spawn error: ${err.message}\n`
      finish(-1)
    })
    child.on('close', (c) => finish(c === null ? -1 : c))
  })

  const durationMs = Date.now() - t0
  const tail = out.length > MAX_LOG_CHARS ? out.slice(-MAX_LOG_CHARS) : out
  await writeFile(logFile, tail)
  return {
    startedAt: startedAt.toISOString(),
    durationMs,
    code,
    ok: code === 0,
    timedOut,
    logFile,
    attempt,
  }
}
