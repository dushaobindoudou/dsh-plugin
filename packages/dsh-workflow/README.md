# dsh-workflow

[![npm](https://img.shields.io/npm/v/dsh-workflow.svg)](https://www.npmjs.com/package/dsh-workflow)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#license)

**Workflow Studio** for the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (`dsh`) - 工作流面板.

Browse workflow sessions grouped by project, manage workflow definitions, launch
new sessions in workflow mode, and visualize run details - all inside the
`dsh web` GUI.

## Install

```bash
dsh plugin --profile <name> add dsh-workflow
```

## What you get

- **Per-project workflow sessions** - sessions run in workflow mode, grouped by
  the workspace they were launched from.
- **Definition manager** - create, edit, copy, and delete workflow definitions
  (name, description, when-to-use, phases, script) without leaving the GUI.
- **Workflow-mode launch** - start a new session in workflow mode straight from
  a definition, with a goal prompt.
- **Run visualization** - a run/agent timeline for every workflow run
  (run-start, agent-start/end, run-end durable events), drillable to the
  underlying session.

## Architecture

The host half (`lib/index.js`) consumes dsh host services (`sessionQuery`,
`workspaceRegistry`, `agents`, `agentDefaultModel`), scans durable session
events for workflow runs, and publishes the `wfx` Remote namespace through the
Typert Gateway. The client half (`lib/client.js`) registers the Workflow Studio
panel in the dsh web GUI.

Peer dependency: `@deepseek-ai/dsh-typert-protocol` (provided by the harness).

## Smoke tests

```bash
pnpm install
node smoke.mjs         # host half against stubbed harness services
node smoke-client.cjs  # client half against a stubbed ModuleLoader
```

## Status

0.1.0 - first release under the `dsh-workflow` name (developed as
`dsh-plugin-wfx`). Source lives in the
[dsh-plugin monorepo](https://github.com/dushaobindoudou/dsh-plugin/tree/main/packages/dsh-workflow).

## License

MIT
