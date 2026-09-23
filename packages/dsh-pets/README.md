# dsh-pets

[![npm](https://img.shields.io/npm/v/dsh-pets.svg)](https://www.npmjs.com/package/dsh-pets)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#license)

**The pet contract & bridge client** for the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (`dsh`) - every desktop-pet plugin builds on this layer, and nothing else belongs here.

## What it is

A desktop pet on this machine speaks one tiny localhost bridge: the pet's app
process serves `127.0.0.1:<port>` with a Bearer token from a 0600 file. This
package holds the three things a SECOND pet would also need, and only those:

- **`lib/vocab.js`** - the task contract: 8 states (`needs_approval` included),
  9 moods, and `cleanTaskEvent`, which drops unknown values instead of
  correcting them so every pet speaks the same dialect the reaction tables
  (`assets/reactions.json` on the pet side) can match.
- **`lib/bridge.js`** - `PetBridge`, the HTTP client: token-file auth, hard
  3s timeouts, and unreachable-is-a-value semantics - a pet app that is not
  running is a normal Tuesday, never a thrown error in the agent's way.
- **`lib/settings.js`** - the shared `~/.lingxi/pets-settings.json` store with
  a closed schema: hostile fields fall back per-field and are reported back,
  so the settings page can say what it ignored instead of eating a user edit.

`lib/index.js` re-exports all of it as a plain library and additionally
provides a `pets` service when mounted as a Cordis plugin.

## Install

```bash
dsh plugin --profile <name> add dsh-pets
```

Or as a dependency of your own pet plugin:

```bash
npm i dsh-pets
```

## Use

```js
import { PetBridge, readPetSettings, cleanTaskEvent } from 'dsh-pets'

const { settings } = readPetSettings()
const bridge = new PetBridge({ port: settings.port })

// report the emotional shape of the work - mood is the field only the model
// doing the work can fill, and the pet reacts to it, never mirrors it
await bridge.taskEvent({ state: 'completed', mood: 'proud', summary: 'it builds again' }, 'my-agent')
```

## Smoke test

```bash
pnpm install
node smoke.mjs
```

## License

MIT
