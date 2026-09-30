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

**App 2026-09 contract notes** (checked against the running build):

- **Persistent writes need the `trusted` tier.** The app now gates `POST
  /memory` and `POST /reminders` on the caller's permission tier, identified
  by the `X-Lingxi-Agent` header. This plugin sends the header on every call
  (rebuilt on identity rename), and a refusal surfaces in the settings page
  with the app's own hint — grant it via 灵犀主界面 → Agent 接入 → 权限 →
  `trusted`, otherwise reminders and memories silently stay unposted.
- **`autoAnnounce` now defaults to off.** A mount-time "bridge ready" event
  would sit in the pet home as a task that never runs and never settles —
  the app's own integration guide names exactly this as noise. Identity
  registration happens either way; tick it back on if you want the hello.
- **Don't run the app's bundled dsh plugin alongside this package.** The
  app ships `integrations/hosts/dsh/lingxi-dsh-plugin.js`, a paste-into-
  `cordis_define` bridge that registers the SAME five tool names and the
  same `dsh` identity. Loading both gives you duplicate `lingxi_*` tools.
  This package is the superset (automatic task/goal/job/authorization/
  activity/context sensing, settings page, reminder sync) - use it alone.
- **Live contract check.** The settings page reads the app's
  `GET /integration` and shows whether the task vocabulary this plugin was
  built against still matches what the running build enforces.

## What you get

**Five model tools** the dsh agent can call directly:

| Tool | What it does |
| --- | --- |
| `lingxi_task` | report task lifecycle + **mood** - the field only the model can fill; the cat reacts to how the work feels, never mirrors it |
| `lingxi_say` | one short line in the speech bubble |
| `lingxi_react` | one expression/action from the pet's own library |
| `lingxi_state` | read what the cat is doing (and the full expression/action libraries) |
| `lingxi_remember` | persist one fact about the user, visible in the pet app |

**Subagent completion prompts** - `subagent/start|end` are tracked by the
child's real `id` (the handler previously read a `sessionId` field that does
not exist on the wire type, so subagents were silently invisible). A settled
subagent's row carries its actual final words ("目录复查 · tests passed,
3 files changed"); one that hit its ceiling or failed names the stop reason
at report priority.

**New-input hints** - `agent/inbox/inserted` surfaces WHAT the user asked,
in the user's own words, as a queued row plus a "收到新任务：…" bubble -
but only when the session was idle. Steering input during active work is
suppressed (the running row already tells that story), and the running row
inherits the hint as its title, so the start line reads the real request
instead of a session id.

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
cat says so on stage at the policy's loudness. Clicking stop is read from
the session stream (`turn/end` with an aborted reason) and settles the row
cancelled - the status bus only knows "not running", and a user-ended turn
is not a completed one.

**Goal awareness** - `goal/changed` is watched and `goals.get` joins the
minute sweep, so the objective becomes its own feed row (`goal:<session>`)
carrying `progress` = admitted rounds / round cap; the settings page shows
the percentage chip. A completed goal settles its row; a cleared one is
cancelled; a goal that outlives one quiet turn is healed by the sweep.

**Authorization awareness** - an in-flight authorization flow (an OAuth
login, an API key the model needs) is the third way dsh stops to wait for
you; the sweep reads `authorization.list()` and the wait lands as
needs_input ("需要凭据：…"), settled by `authorization/settled` the moment
the attempt ends - authorized, cancelled, or failed.

**Job awareness** - `jobs.onJobDone` settles a job's row the instant the
job settles (the label stays the row's subject; the detail is the outcome
the pet speaks), and `onJobsChanged` tracks newly started jobs without
waiting for the next reconcile tick.

**Activity awareness** - `tools/result` feeds a small rolling "最近在
做什么" card in the settings page: which files were written or edited,
which commands ran (leaf fields only - a path or a first command line,
never tool-result content; the plugin's own tools excluded). Ambient by
design: it never rides the pet wire.

**Context pressure** - the `contextPressure` session projection
(`projectedTokens / contextWindow`) is evaluated per live session on every
reconcile and on projection changes; crossing 80% says ONCE per filling
("这步跑完，整理一下记忆吧"), and a deep recovery (compaction, bigger
window) re-arms it for the next rise. Live occupancy shows in the same
card.

**Budget** - every failed model attempt carries a provider-neutral code
(`LlmFailure.code`); `QUOTA` (exhausted account quota/balance) alerts once
per session per quiet window ("这条线路额度不够了"), and
`CONTEXT_WINDOW_EXCEEDED` reports once - the sudden sibling of the gradual
80% warning. Coarser adapters that leave only the wording (freeroute maps
quota text onto `RATE_LIMIT`) are caught by the same terminal-wording
shapes the dsh core uses, English and Chinese. Rate limits and 5xx never
speak. Every alert's subject is the session's freshest ask (see below).

**Fresh subjects, not frozen titles** - a dsh session title is generated
once and never follows the conversation. The watch remembers the user's
own latest words per session (including mid-run steering input, which
silently refreshes the running row instead of adding a row), and every
alert line - context pressure, quota, a failed settle - leads with those
words, so the bubble says which work broke, not what the session used to
be called.

**Workflow phases** - a workflow run is tracked by its real `info.id` and
`workflow/phase` moves the row's title along ("audit-freeroute · parse
catalog"); an errored run settles failed carrying the run's error message.

**Environment sense** - the current model route (`provider/model`) shows in
the settings page; switching says so once at status priority. Settings
changes and preset switches land as activity notes, and a rebuilt client
bundle ("编译好了，刷新即见") is announced once per revision - the dev
loop gets a cat.

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
  registry and transitions; sense watches join the sweep via `taskWatch.sweeps`.
- `lib/sense/` - the extra senses on the same pipeline: `goal-watch.js`
  (objective rows with round progress), `authorization-watch.js`
  (in-flight credential waits as needs_input), `job-watch.js` (event-driven
  job rows), `activity.js` (the tools/result rolling feed), `context.js`
  (context-occupancy warnings), `budget.js` (quota/balance and
  context-window rejections on the `agent/request-error` waterfall), and
  `environment.js` (model route, settings/preset notes, client-bundle
  rebuilds).
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

Declared service dependency: `timer` (`@deepseek-ai/cordis-plugin-timer`,
mounted by the `dsh-base` bundle). The host half's two sweeps - the 60s task
reconcile and the 10-minute reminder re-assert - run on `ctx.timer`, and
cordis refuses property access to a service a plugin did not declare: reading
`ctx.timer` without `inject` throws `cannot get property "timer" without
inject`, which fails the whole plugin tree while it loads.

## Smoke tests

```bash
pnpm install
node smoke.mjs         # host half against stubbed harness services + a stub bridge
node smoke-client.cjs  # client half against a stubbed ModuleLoader
```

## License

MIT
