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

**An agent identity of its own** - the plugin registers as `dsh` (badge `DS`)
in the pet app's registry, so events it reports are attributed separately
from Claude Code or Codex.

## How the layers fit

- `lib/index.js` - host half: settings → bridge → tools → Remote namespace,
  announce; everything effect-disposed.
- `lib/tools.js` - the five ToolDefinitions (plain ToolDefinition objects,
  `tools.register`-shaped).
- `lib/remote.js` - the `lingxi` Remote namespace (`status`, `getSettings`,
  `setSettings`, `testSay`) the settings page calls through the connection
  RPC carrier.
- `lib/client.js` - the settings section (`settings.section`, id `lingxi`).
- `lib/pet-contract/` - the task vocabulary, bridge client, and settings
  store, vendored from [`dsh-pets`](https://www.npmjs.com/package/dsh-pets)
  (npm-name ownership pending; the monorepo package remains the source of
  truth and this directory is replaced by a dependency when that settles).

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
