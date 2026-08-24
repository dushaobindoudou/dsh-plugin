#!/usr/bin/env node
// dsh-bot - run DeepSeek Harness agents headlessly on schedules and webhooks.
//
//   dsh-bot run <manifest...> [--schedule]   run each bot once (or keep looping)
//   dsh-bot serve <manifest...> [--port N]   webhook front: POST /run/<bot>
//   dsh-bot next <manifest...>               print the next scheduled fire time
//   dsh-bot validate <manifest...>           check manifests and exit
//
// Exit codes: 0 all runs ok, 1 at least one run failed, 2 usage/input error.
import { loadManifest } from '../lib/manifest.js'
import { runBot } from '../lib/runner.js'
import { cronMatches, nextRun, parseCron } from '../lib/cron.js'
import { startServer } from '../lib/serve.js'

const VERSION = '0.1.0'

const HELP = `dsh-bot ${VERSION} - bot framework for the DeepSeek Harness (dsh)

Usage:
  dsh-bot run <manifest...> [--schedule]   run each bot once (or loop on cron)
  dsh-bot serve <manifest...> [--port N] [--token T]
                                          webhook front: POST /run/<bot>[?wait=1]
  dsh-bot next <manifest...>               print each bot's next fire time
  dsh-bot validate <manifest...>           validate manifests and exit

Manifests are JSON: {"name","prompt"|"command","schedule"?,"workspace"?,
"profile"?,"timeoutMs"?,"retries"?}. A "prompt" bot runs
"dsh --profile <profile> <prompt>" in its workspace - the harness's official
headless one-shot mode. Run state lands in <workspace>/.dsh-bot/.
Environment: DSH_BOT_TOKEN guards serve mode when --token is not given.
Full docs: https://github.com/dushaobindoudou/dsh-plugin/tree/main/packages/dsh-bot`

function parseArgs(argv) {
  const command = argv[0]
  const flags = {}
  const files = []
  for (let i = 1; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === '--schedule' || arg === '--wait') flags.schedule = true
    else if (arg === '--port') flags.port = Number(argv[++i])
    else if (arg === '--token') flags.token = String(argv[++i])
    else if (arg === '--help' || arg === '-h') flags.help = true
    else files.push(arg)
  }
  return { command, flags, files }
}

async function loadAll(files) {
  if (files.length === 0) throw new Error('no manifest files given')
  const manifests = []
  for (const file of files) manifests.push(await loadManifest(file))
  const names = new Set()
  for (const m of manifests) {
    if (names.has(m.name)) throw new Error(`duplicate bot name across manifests: ${m.name}`)
    names.add(m.name)
  }
  return manifests
}

function print(record) {
  console.log(
    `${record.ok ? 'ok  ' : 'FAIL'} ${record.bot} code=${record.code} attempts=${record.attempts} ` +
      `${record.durationMs}ms log=${record.logFile}`,
  )
}

async function cmdRun(files, schedule) {
  const manifests = await loadAll(files)
  if (!schedule) {
    let allOk = true
    for (const manifest of manifests) {
      const record = await runBot(manifest)
      print(record)
      if (!record.ok) allOk = false
    }
    process.exitCode = allOk ? 0 : 1
    return
  }
  const scheduled = manifests.filter((m) => m.schedule !== null)
  const skipped = manifests.length - scheduled.length
  if (skipped > 0) console.error(`[dsh-bot] ${skipped} bot(s) without "schedule" are ignored in --schedule mode`)
  const parsed = new Map(scheduled.map((m) => [m.name, parseCron(m.schedule)]))
  const lastKey = new Map()
  const chains = new Map()
  console.error(`[dsh-bot] scheduling ${scheduled.length} bot(s); Ctrl+C to stop`)
  const tick = () => {
    const now = new Date()
    const key = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${now.getHours()}-${now.getMinutes()}`
    for (const m of scheduled) {
      if (lastKey.get(m.name) === key) continue
      if (!cronMatches(parsed.get(m.name), now)) continue
      lastKey.set(m.name, key)
      const prev = chains.get(m.name) ?? Promise.resolve()
      chains.set(
        m.name,
        prev.then(() => runBot(m)).then(print, (err) => console.error(`[dsh-bot] ${m.name}: ${err.message}`)),
      )
    }
  }
  tick()
  setInterval(tick, 20000).unref()
}

async function cmdNext(files) {
  const manifests = await loadAll(files)
  for (const m of manifests) {
    if (m.schedule === null) {
      console.log(`${m.name}: no schedule (manual/webhook only)`)
      continue
    }
    const next = nextRun(m.schedule)
    console.log(`${m.name}: ${next === null ? 'never matches' : next.toISOString()}`)
  }
}

async function cmdServe(files, flags) {
  const manifests = await loadAll(files)
  const bots = new Map(manifests.map((m) => [m.name, m]))
  const port = Number.isInteger(flags.port) && flags.port > 0 ? flags.port : 8787
  const server = startServer(bots, { token: flags.token })
  await new Promise((resolve) => server.listen(port, '127.0.0.1', resolve))
  console.error(`[dsh-bot] serving ${bots.size} bot(s) on http://127.0.0.1:${port} (POST /run/<name>)`)
}

async function main() {
  const argv = process.argv.slice(2)
  if (argv.length === 0 || argv[0] === 'help' || argv[0] === '--help' || argv[0] === '-h') {
    console.log(HELP)
    return
  }
  if (argv[0] === '--version' || argv[0] === '-V') {
    console.log(VERSION)
    return
  }
  const { command, flags, files } = parseArgs(argv)
  try {
    if (command === 'run') return await cmdRun(files, flags.schedule)
    if (command === 'serve') return await cmdServe(files, flags)
    if (command === 'next') return await cmdNext(files)
    if (command === 'validate') {
      const manifests = await loadAll(files)
      for (const m of manifests) {
        console.log(`ok ${m.name} workspace=${m.workspace}${m.schedule ? ` schedule="${m.schedule}"` : ''}`)
      }
      return
    }
    throw new Error(`unknown command: ${command}`)
  } catch (err) {
    console.error(`dsh-bot: ${err.message}`)
    console.error('run "dsh-bot help" for usage')
    process.exitCode = 2
  }
}

await main()
