# dsh-bot

[![npm](https://img.shields.io/npm/v/dsh-bot.svg)](https://www.npmjs.com/package/dsh-bot)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#license)

**Bot framework for the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (`dsh`)** - run headless dsh agents on cron schedules, webhooks, and queues, with run logs, retries, and CI-friendly exit codes.

The harness ships an official one-shot headless mode:

```bash
dsh --profile headless "run the tests and summarize failures"
```

`dsh-bot` wraps that into a **bot**: a JSON manifest that pins the prompt, the workspace, the schedule, and the retry policy - then runs it on cron, on a webhook POST, or once from CI, and keeps the evidence (per-attempt logs + a durable `runs.jsonl`).

## Install

```bash
npm install -g dsh-bot          # standalone CLI
# or, as a dsh plugin-suite member:
dsh plugin --profile <name> add dsh-bot
```

Requires Node >= 20 and the `dsh` CLI on PATH for `prompt` bots. Zero runtime dependencies.

## Quickstart

`nightly-tests.json`:

```json
{
  "name": "nightly-tests",
  "workspace": "/srv/my-app",
  "schedule": "30 2 * * *",
  "prompt": "run the test suite, fix nothing, summarize failures as a table",
  "timeoutMs": 3600000,
  "retries": 1
}
```

```bash
dsh-bot run nightly-tests.json            # once, right now (CI-friendly)
dsh-bot run nightly-tests.json --schedule # keep looping on the cron
dsh-bot next nightly-tests.json           # when does it fire next?
dsh-bot serve nightly-tests.json --port 8787
```

## Manifest reference

| Field | Required | Meaning |
| --- | --- | --- |
| `name` | yes | Bot slug: `a-z 0-9 - _`, used in URLs and log names |
| `prompt` | one of prompt/command | Wrapped as `dsh --profile <profile> <prompt>` in the workspace |
| `command` | one of prompt/command | Arbitrary argv array, or a string run via `sh -c` |
| `workspace` | no | Working directory; defaults to the manifest's directory |
| `profile` | no | dsh profile for `prompt` bots (default: `headless`) |
| `schedule` | no | Five-field cron; omit for webhook/manual-only bots |
| `timeoutMs` | no | Kill (SIGTERM, then SIGKILL after 5s) past the limit; 0 = no limit |
| `retries` | no | Re-run failed attempts (default 0) |

## Cron dialect

Five fields - minute hour day-of-month month day-of-week - supporting `*`,
lists (`1,15`), ranges (`9-17`), and steps (`*/15`, `9-17/2`, `5/10` meaning
5..max every 10). Day-of-week `0` and `7` are both Sunday; names are not
supported. Standard Vixie-cron rule applies: when both day-of-month and
day-of-week are restricted (not `*`), a minute matches if **either** matches.

## Webhook mode

```bash
dsh-bot serve bots/*.json --port 8787 --token "$DSH_BOT_TOKEN"
```

| Route | Meaning |
| --- | --- |
| `POST /run/<bot>` | Queue a run; `202` immediately |
| `POST /run/<bot>?wait=1` | Queue and wait for the record |
| `GET /runs?limit=20` | Recent in-memory run records |
| `GET /healthz` | Liveness + registered bot names |

Runs of the same bot are serialized; different bots run concurrently. This is
the seam chat-channel adapters (community `dsh-telegram`, `dsh-discord`,
`dsh-slack` packages) can POST into.

## Run state

Everything lands under `<workspace>/.dsh-bot/`:

- `runs.jsonl` - one JSON record per finished run (bot, ok, code, attempts, durationMs, logFile)
- `<timestamp>-<bot>-attempt<N>.log` - captured stdout+stderr per attempt (tailed to 64 KiB)

Exit codes: `0` all runs ok, `1` at least one run failed, `2` usage/manifest error.

## Library

```js
import { loadManifest, runBot, parseCron, nextRun, startServer } from 'dsh-bot'
```

## Status

0.1.0 - CLI-first release: cron scheduling, webhook serving, retries, durable
run records. Roadmap: plugin surface for the dsh web GUI, channel adapters,
and a bridge to the reserved `dsh-jobs` name for persistent queues.

## License

MIT
