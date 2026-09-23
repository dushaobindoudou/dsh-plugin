# dsh-lingxi

[![npm](https://img.shields.io/npm/v/dsh-lingxi.svg)](https://www.npmjs.com/package/dsh-lingxi)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#license)

**Lingxi (灵犀) - the companion that gets you** - the desktop-cat plugin for the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (`dsh`).

From the Tang line 心有灵犀一点通 - hearts linked without a word. The mascot
doctrine in two characters: it understands you from working beside you, not
from watching you.

## Install

```bash
dsh plugin --profile <name> add dsh-lingxi
```

The pet app (灵犀, macOS) must be running; the plugin talks to its localhost
bridge. The bridge port and identity are configurable in the settings page.

## What you get

**Five model tools** the dsh agent can call directly:

| Tool | What it does |
| --- | --- |
| `lingxi_task` | report task lifecycle + **mood** - the field only the model can fill; the cat reacts to how the work feels, never mirrors it |
| `lingxi_say` | one short line in the speech bubble |
| `lingxi_react` | one expression/action from the pet's own library |
| `lingxi_state` | read what the cat is doing (and the full expression/action libraries) |
| `lingxi_remember` | persist one fact about the user, visible in the pet app |

**A settings page** (设置 → 灵犀) built on the bridge's own provided
interfaces - `/health` and `/agents` answer the status hero and identity
chips, so the page shows what the pet app currently says about itself. The
settings item covers agent identity (id / name / badge), bridge port,
auto-announce on mount, and which tools the model sees; saving persists to
`~/.lingxi/pets-settings.json` and takes effect immediately (the tool set
rebuilds in place).

**An agent identity of its own** - the plugin registers as `dsh` (badge `DS`,
dsh blue, the DeepSeek whale logo) in the pet app's registry, so events it
reports are attributed separately from Claude Code or Codex - and every
notification bubble carries the dsh logo as its source mark.

**Task awareness** - the plugin watches dsh's own lifecycle events
(`agent/status`, `agent/error`, `subagent/*`, `workflow/*`) plus the
`approval/request` and `user-questions/request` waterfalls, reconciled
against the live `agents`/`jobs` registries every minute, so the cat knows
what dsh is running right now. When a task hits a state that needs the user
(needs_approval, needs_input, blocked, failed - editable in settings), the
cat says so on stage at the policy's loudness.

**Standing reminders** - declare "every 30 minutes, have the cat bring up
the deploy status" in the settings page; the plugin diff-syncs the
declarations into the pet app, whose clock does the remembering (the pet
checks once a minute and re-arms standing reminders).

## How the layers fit

- `lib/index.js` - host half: settings → bridge → tools → Remote namespace,
  announce; everything effect-disposed.
- `lib/tools.js` - the five ToolDefinitions (plain ToolDefinition objects,
  `tools.register`-shaped).
- `lib/remote.js` - the `lingxi` Remote namespace (`status`, `getSettings`,
  `setSettings`, `testSay`) the settings page calls through the connection
  RPC carrier.
- `lib/tasks.js` - the task watch: dsh events + reconcile sweep → a running
  registry and transitions.
- `lib/notify.js` - the attention notifier: policy level → task event +
  stage say; dedup per (task, state).
- `lib/reminders.js` - the reminder sync: declared → standing pet reminders,
  marker-keyed and idempotent.
- `lib/dsh-logo.js` - the DeepSeek whale mark for bubble attribution.
- `lib/client.js` - the settings section (`settings.section`, id `lingxi`):
  bridge status, tasks now, reminder management, and the settings item.
- `lib/pet-contract/` - the task vocabulary, bridge client, policy, and
  reminder contract, vendored from
  [`dsh-pets`](https://www.npmjs.com/package/dsh-pets) via
  `node scripts/sync-pet-contract.mjs` (npm-name ownership pending; the
  monorepo package remains the source of truth and this directory is
  replaced by a dependency when that settles).

## Layering

```
pet app (owns the stage, the clock, the badges)   ← zero changes needed
   ↑ /task-event  /control  /reminders  /agents(logo)
dsh-lingxi  (dsh adapter: task watch · attention notifier · reminder sync)
   ↑ policy vocabulary · bridge client · settings store
dsh-pets    (pet-agnostic contract, reusable by any host adapter)
```

The attention policy (which states interrupt the user, how loudly) and the
reminder contract (marker-keyed, idempotent sync) live in **dsh-pets** so a
second host adapter - claude, codex - reuses them verbatim; only the dsh
event names and registries are dsh-lingxi's own.

## Architecture

The host half consumes the dsh tool registry and publishes the `lingxi`
Remote namespace through the Typert Gateway. The client half registers the
settings page in the dsh web GUI. The bridge contract (8 task states, 9
moods, token-file auth, unreachable-is-a-value) lives in `dsh-pets`.

Peer dependency: `@deepseek-ai/dsh-typert-protocol` (provided by the harness).

## Smoke tests

```bash
pnpm install
node smoke.mjs         # host half against stubbed harness services + a stub bridge
node smoke-client.cjs  # client half against a stubbed ModuleLoader
```

## License

MIT
