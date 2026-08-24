# dsh-plugin

The `dsh-*` plugin suite for the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) - one monorepo, many npm packages.

[![CI](https://github.com/dushaobindoudou/dsh-plugin/actions/workflows/ci.yml/badge.svg)](https://github.com/dushaobindoudou/dsh-plugin/actions/workflows/ci.yml)

Every dsh-* npm name this account owns, one catalog. Each package starts as a **reserved name** (0.0.1,
description of the planned first release) and graduates to a **real package**
when code lands in its `packages/<name>/` directory. The single source of truth
for names, niches, and descriptions is [`scripts/catalog.mjs`](scripts/catalog.mjs).

## Real packages

| Package | Version | What it does |
| --- | --- | --- |
| [`dsh-selfrepair`](packages/dsh-selfrepair) | 0.2.0 | Diagnose and repair a dsh installation - settings page panel, `/doctor` slash command, and a standalone CLI that works even when dsh cannot start. |
| [`dsh-workflow`](packages/dsh-workflow) | 0.1.0 | Workflow Studio - browse workflow sessions per project, manage definitions, launch workflow-mode sessions, visualize runs. |
| [`dsh-bot`](packages/dsh-bot) | 0.1.0 | Bot framework - run headless dsh agents on cron schedules and webhooks, with retries, run logs, and CI-friendly exit codes. |

## Reserved names by niche

Names publish as 0.0.1 placeholders; each row's README states the planned first
release. A name graduates out of this table the moment real code lands.

<!-- placeholder-table:start -->
### Model bridges (29)

| Name | Planned first release |
| --- | --- |
| [`dsh-claude`](packages/dsh-claude) | Anthropic Claude provider bridge for the DeepSeek Harness |
| [`dsh-openai`](packages/dsh-openai) | OpenAI provider bridge for the DeepSeek Harness |
| [`dsh-gpt`](packages/dsh-gpt) | The GPT-family spelled form of the OpenAI bridge |
| [`dsh-gemini`](packages/dsh-gemini) | Google Gemini provider bridge for the DeepSeek Harness |
| [`dsh-qwen`](packages/dsh-qwen) | Qwen provider bridge for the DeepSeek Harness |
| [`dsh-glm`](packages/dsh-glm) | GLM provider bridge for the DeepSeek Harness |
| [`dsh-kimi`](packages/dsh-kimi) | Kimi provider bridge for the DeepSeek Harness |
| [`dsh-doubao`](packages/dsh-doubao) | Doubao provider bridge for the DeepSeek Harness |
| [`dsh-minimax`](packages/dsh-minimax) | MiniMax provider bridge for the DeepSeek Harness |
| [`dsh-mistral`](packages/dsh-mistral) | Mistral provider bridge for the DeepSeek Harness |
| [`dsh-groq`](packages/dsh-groq) | Groq provider bridge for the DeepSeek Harness |
| [`dsh-together`](packages/dsh-together) | Together AI provider bridge for the DeepSeek Harness |
| [`dsh-fireworks`](packages/dsh-fireworks) | Fireworks AI provider bridge for the DeepSeek Harness |
| [`dsh-siliconflow`](packages/dsh-siliconflow) | SiliconFlow provider bridge for the DeepSeek Harness |
| [`dsh-zhipu`](packages/dsh-zhipu) | The company-spelled form of the GLM provider bridge |
| [`dsh-xai`](packages/dsh-xai) | xAI Grok provider bridge for the DeepSeek Harness |
| [`dsh-moonshot`](packages/dsh-moonshot) | The company-spelled form of the Kimi provider bridge |
| [`dsh-hunyuan`](packages/dsh-hunyuan) | Tencent Hunyuan provider bridge for the DeepSeek Harness |
| [`dsh-ernie`](packages/dsh-ernie) | Baidu ERNIE provider bridge for the DeepSeek Harness |
| [`dsh-vllm`](packages/dsh-vllm) | vLLM provider bridge for the DeepSeek Harness |
| [`dsh-llama`](packages/dsh-llama) | Llama provider bridge for the DeepSeek Harness |
| [`dsh-cohere`](packages/dsh-cohere) | Cohere provider bridge for the DeepSeek Harness |
| [`dsh-bedrock`](packages/dsh-bedrock) | AWS Bedrock provider bridge for the DeepSeek Harness |
| [`dsh-ollama`](packages/dsh-ollama) | Local-model provider bridge for the DeepSeek Harness |
| [`dsh-openrouter`](packages/dsh-openrouter) | OpenRouter provider bridge for the DeepSeek Harness |
| [`dsh-lmstudio`](packages/dsh-lmstudio) | LM Studio provider bridge for the DeepSeek Harness |
| [`dsh-proxy`](packages/dsh-proxy) | LLM gateway plugin for the DeepSeek Harness |
| [`dsh-models`](packages/dsh-models) | Model registry panel for the DeepSeek Harness |
| [`dsh-providers`](packages/dsh-providers) | Provider registry for the DeepSeek Harness |

### Developer tools (8)

| Name | Planned first release |
| --- | --- |
| [`dsh-edit`](packages/dsh-edit) | Inline edit panel for the dsh web GUI |
| [`dsh-refactor`](packages/dsh-refactor) | Refactor workflows for the dsh web GUI |
| [`dsh-lint`](packages/dsh-lint) | Lint findings inline in the dsh web GUI |
| [`dsh-test`](packages/dsh-test) | Test runner panel for the dsh web GUI |
| [`dsh-debug`](packages/dsh-debug) | Debug console for dsh agents |
| [`dsh-db`](packages/dsh-db) | Database client tools for dsh agents |
| [`dsh-api`](packages/dsh-api) | REST client panel for the dsh web GUI |
| [`dsh-git`](packages/dsh-git) | Git panel for the dsh web GUI |

### Agent capabilities (12)

| Name | Planned first release |
| --- | --- |
| [`dsh-agents`](packages/dsh-agents) | Agent registry panel for the dsh web GUI |
| [`dsh-planner`](packages/dsh-planner) | Plan mode for dsh sessions |
| [`dsh-rag`](packages/dsh-rag) | Retrieval-augmented answers over workspace docs |
| [`dsh-embeddings`](packages/dsh-embeddings) | Embeddings service panel for the DeepSeek Harness |
| [`dsh-router`](packages/dsh-router) | Model router for the DeepSeek Harness |
| [`dsh-search`](packages/dsh-search) | Cross-session full-text search for the DeepSeek Harness |
| [`dsh-deepsearch`](packages/dsh-deepsearch) | Agentic web research for dsh sessions |
| [`dsh-bots`](packages/dsh-bots) | The plural form of the dsh bot framework |
| [`dsh-agent`](packages/dsh-agent) | Agent pattern library for dsh |
| [`dsh-workflows`](packages/dsh-workflows) | The plural form of Workflow Studio |
| [`dsh-channels`](packages/dsh-channels) | Chat-channel framework for dsh bots |
| [`dsh-tasks`](packages/dsh-tasks) | Durable task tracking for dsh sessions |

### Multi-agent (4)

| Name | Planned first release |
| --- | --- |
| [`dsh-swarm`](packages/dsh-swarm) | Multi-agent swarm orchestration for dsh |
| [`dsh-delegate`](packages/dsh-delegate) | Delegation tool for dsh agents |
| [`dsh-queue`](packages/dsh-queue) | Durable task queues for dsh bots |
| [`dsh-council`](packages/dsh-council) | Council-of-agents deliberation for dsh |

### Protocols (1)

| Name | Planned first release |
| --- | --- |
| [`dsh-lsp`](packages/dsh-lsp) | Language Server Protocol bridge for the DeepSeek Harness |

### Ui (6)

| Name | Planned first release |
| --- | --- |
| [`dsh-panel`](packages/dsh-panel) | Custom panel framework for the dsh web GUI |
| [`dsh-widget`](packages/dsh-widget) | Widget library for the dsh web GUI |
| [`dsh-zen`](packages/dsh-zen) | Zen mode for the dsh web GUI |
| [`dsh-sound`](packages/dsh-sound) | Sound design for the DeepSeek Harness |
| [`dsh-files`](packages/dsh-files) | File manager panel for the dsh web GUI |
| [`dsh-diff`](packages/dsh-diff) | Turn diff viewer for the dsh web GUI |

### Data (4)

| Name | Planned first release |
| --- | --- |
| [`dsh-export`](packages/dsh-export) | Export sessions from the DeepSeek Harness |
| [`dsh-archive`](packages/dsh-archive) | Archive cold sessions to compressed bundles |
| [`dsh-cloud`](packages/dsh-cloud) | Cloud sync for dsh homes |
| [`dsh-link`](packages/dsh-link) | Share links for dsh sessions |

### Ops (8)

| Name | Planned first release |
| --- | --- |
| [`dsh-logs`](packages/dsh-logs) | Structured log viewer for the dsh host |
| [`dsh-metrics`](packages/dsh-metrics) | Token and latency metrics for the DeepSeek Harness |
| [`dsh-alert`](packages/dsh-alert) | Alerts for dsh sessions |
| [`dsh-health`](packages/dsh-health) | Live health status for dsh installs |
| [`dsh-clean`](packages/dsh-clean) | Safe-clean the dsh home |
| [`dsh-reset`](packages/dsh-reset) | Reset dsh profiles to a known state |
| [`dsh-serve`](packages/dsh-serve) | Serve-mode extras for the dsh web GUI |
| [`dsh-jobs`](packages/dsh-jobs) | Background jobs for dsh bots |

### Security (3)

| Name | Planned first release |
| --- | --- |
| [`dsh-secrets`](packages/dsh-secrets) | Secrets handling for dsh agents |
| [`dsh-policy`](packages/dsh-policy) | Approval policy engine for the DeepSeek Harness |
| [`dsh-permission`](packages/dsh-permission) | Permission scopes for dsh tools |

### Work & hiring (5)

| Name | Planned first release |
| --- | --- |
| [`dsh-hiring`](packages/dsh-hiring) | Hiring workflow for engineering teams |
| [`dsh-job`](packages/dsh-job) | The singular form of the background-jobs runner |
| [`dsh-talent`](packages/dsh-talent) | Talent pool manager |
| [`dsh-jd`](packages/dsh-jd) | Job description library |
| [`dsh-headhunt`](packages/dsh-headhunt) | Headhunter workbench |

### Meta / product (10)

| Name | Planned first release |
| --- | --- |
| [`dsh-studio`](packages/dsh-studio) | Studio shell for the DeepSeek Harness |
| [`dsh-hub`](packages/dsh-hub) | Local plugin hub for dsh installs |
| [`dsh-forge`](packages/dsh-forge) | Scaffold new dsh plugins from templates |
| [`dsh-canvas`](packages/dsh-canvas) | Infinite canvas for the DeepSeek Harness |
| [`dsh-suite`](packages/dsh-suite) | The full suite installer |
| [`dsh-workspace`](packages/dsh-workspace) | Workspace manager for the DeepSeek Harness |
| [`dsh-profiles`](packages/dsh-profiles) | Profile manager for the DeepSeek Harness |
| [`dsh-persona`](packages/dsh-persona) | Persona marketplace for the DeepSeek Harness |
| [`dsh-skill`](packages/dsh-skill) | Skill manager for the DeepSeek Harness |
| [`dsh-update`](packages/dsh-update) | Update manager for the DeepSeek Harness |

### Harness surfaces (10)

| Name | Planned first release |
| --- | --- |
| [`dsh-finder`](packages/dsh-finder) | File & command palette for the dsh web GUI |
| [`dsh-notes`](packages/dsh-notes) | Durable notes the agent can see |
| [`dsh-snippets`](packages/dsh-snippets) | Prompt snippet library for the DeepSeek Harness |
| [`dsh-prompts`](packages/dsh-prompts) | Prompt library for the DeepSeek Harness |
| [`dsh-vscode`](packages/dsh-vscode) | VS Code bridge for the DeepSeek Harness |
| [`dsh-zed`](packages/dsh-zed) | Zed bridge for the DeepSeek Harness |
| [`dsh-cursor`](packages/dsh-cursor) | Cursor bridge for the DeepSeek Harness |
| [`dsh-i18n`](packages/dsh-i18n) | Locale packs for the dsh web GUI |
| [`dsh-keymap`](packages/dsh-keymap) | Keyboard shortcut manager for the dsh web GUI |
| [`dsh-completions`](packages/dsh-completions) | Shell completions for the dsh launcher |
<details>
<summary>External waves (220 names, reconciled from the npm registry)</summary>

`dsh-accounting`, `dsh-acp-server`, `dsh-agentpay`, `dsh-airtable`, `dsh-anime`, `dsh-ansible`, `dsh-ap2`, `dsh-arbitrum`, `dsh-asana`, `dsh-audio`, `dsh-aws`, `dsh-azure`, `dsh-baby`, `dsh-banking`, `dsh-base`, `dsh-beauty`, `dsh-bio`, `dsh-bitcoin`, `dsh-blog`, `dsh-bolt`, `dsh-book`, `dsh-brand`, `dsh-bun`, `dsh-calc`, `dsh-calculator`, `dsh-car`, `dsh-chem`, `dsh-clickhouse`, `dsh-comic`, `dsh-compliance`, `dsh-config`, `dsh-confluence`, `dsh-contract`, `dsh-convert`, `dsh-cook`, `dsh-cpp`, `dsh-critic`, `dsh-crm`, `dsh-crypto`, `dsh-csharp`, `dsh-data`, `dsh-defi`, `dsh-deno`, `dsh-deploy`, `dsh-devops`, `dsh-dex`, `dsh-dict`, `dsh-dictionary`, `dsh-discord`, `dsh-docs`, `dsh-drive`, `dsh-ecommerce`, `dsh-edu`, `dsh-english`, `dsh-erp`, `dsh-escrow`, `dsh-esports`, `dsh-etf`, `dsh-eth`, `dsh-fashion`, `dsh-fees`, `dsh-festival`, `dsh-figma`, `dsh-finance`, `dsh-fintech`, `dsh-fit`, `dsh-fitness`, `dsh-font`, `dsh-food`, `dsh-forex`, `dsh-freeroute`, `dsh-fun`, `dsh-fund`, `dsh-futures`, `dsh-game`, `dsh-garden`, `dsh-gcp`, `dsh-gift`, `dsh-gitlab`, `dsh-go`, `dsh-habit`, `dsh-helm`, `dsh-hl`, `dsh-holiday`, `dsh-home`, `dsh-horoscope`, `dsh-house`, `dsh-hr`, `dsh-hype`, `dsh-hyperevm`, `dsh-hyperliquid`, `dsh-icon`, `dsh-infra`, `dsh-invoice`, `dsh-iot`, `dsh-irc`, `dsh-java`, `dsh-jira`, `dsh-joke`, `dsh-journal`, `dsh-jupyter`, `dsh-k8s`, `dsh-karaoke`, `dsh-kotlin`, `dsh-language`, `dsh-latex`, `dsh-law`, `dsh-ledger`, `dsh-legal`, `dsh-lightning`, `dsh-line`, `dsh-linear`, `dsh-linux`, `dsh-lottery`, `dsh-macos`, `dsh-marketing`, `dsh-math`, `dsh-matrix`, `dsh-medical`, `dsh-meditate`, `dsh-micropay`, `dsh-ml`, `dsh-mongo`, `dsh-mood`, `dsh-movie`, `dsh-multiagent`, `dsh-music`, `dsh-mysql`, `dsh-news`, `dsh-next`, `dsh-nginx`, `dsh-notebook`, `dsh-nuxt`, `dsh-ocr`, `dsh-onchain`, `dsh-options`, `dsh-paper`, `dsh-pay`, `dsh-payment`, `dsh-payments`, `dsh-photo`, `dsh-php`, `dsh-physics`, `dsh-play`, `dsh-podcast`, `dsh-portfolio`, `dsh-postgres`, `dsh-prisma`, `dsh-product`, `dsh-puzzle`, `dsh-python`, `dsh-pyusd`, `dsh-quiz`, `dsh-radio`, `dsh-react`, `dsh-read`, `dsh-recruit`, `dsh-redis`, `dsh-refine`, `dsh-reflect`, `dsh-rent`, `dsh-resume`, `dsh-risk`, `dsh-ruby`, `dsh-rust`, `dsh-sales`, `dsh-screenshot`, `dsh-seo`, `dsh-settings`, `dsh-shop`, `dsh-sleep`, `dsh-solana`, `dsh-solidity`, `dsh-sports`, `dsh-sqlite`, `dsh-sre`, `dsh-stable`, `dsh-stablecoin`, `dsh-stats`, `dsh-stock`, `dsh-streaming`, `dsh-subagent`, `dsh-subtitle`, `dsh-supabase`, `dsh-support`, `dsh-svelte`, `dsh-swift`, `dsh-tarot`, `dsh-task`, `dsh-tax`, `dsh-terraform`, `dsh-ticker`, `dsh-time`, `dsh-tipping`, `dsh-trading`, `dsh-transit`, `dsh-travel`, `dsh-trello`, `dsh-trip`, `dsh-tutor`, `dsh-tv`, `dsh-twitter`, `dsh-typescript`, `dsh-units`, `dsh-usdc`, `dsh-usdt`, `dsh-ux`, `dsh-video`, `dsh-vocab`, `dsh-vue`, `dsh-water`, `dsh-web3`, `dsh-weibo`, `dsh-whatsapp`, `dsh-word`, `dsh-writing`, `dsh-x402`, `dsh-yuque`, `dsh-zhihu`, `dsh-zig`

</details>
<!-- placeholder-table:end -->

## Layout

```
packages/<name>/     one directory per npm package (74 reserved + 2 real)
scripts/catalog.mjs  the catalog: every name, niche, headline, keywords
scripts/sync-placeholders.mjs   regenerate placeholder manifests + READMEs (idempotent)
scripts/check-packages.mjs      structural check for all 76 packages (runs in CI)
```

## Workflow

```bash
pnpm install
pnpm check          # verify every package against the catalog
pnpm test           # run tests of every package that has them
pnpm sync:placeholders  # regenerate placeholders after editing catalog.mjs
```

Graduating a name:

1. Build the package inside `packages/<name>/` (code, tests, real manifest).
2. Move its entry out of the placeholder mindset: add the name to
   `REAL_PACKAGES` in `scripts/catalog.mjs`, drop the catalog entry.
3. `pnpm check` must pass; version it ≥ 0.1.0 and publish.

Publishing (reserved placeholders are published once, from CI or locally):

```bash
pnpm publish:dry       # npm pack dry-run for every package
pnpm publish:all       # publish everything not yet on npm
```

## Names we could not get

Seven names are blocked at the registry level (npm's typo-squatting
confusability rules or unpublish safety locks) - listed here so nobody retries
them blindly: `dsh-docker` (confusable with `is-docker`), `dsh-format`
(`d3-format`), `dsh-pack` (`dshpack`), `dsh-toolkit` (`es-toolkit`),
`dsh-trace` (`dd-trace`), `dsh-market` (`dshmarket`), `dsh-plugin-finder`
(unpublish safety lock).

## Stewardship note

Reserved-name placeholders exist to keep this suite's naming coherent. To make
sure every reserved name eventually ships substance, the goal is 3-5 names per
quarter graduating to real packages, starting with the ones users ask for most:
`dsh-finder`, `dsh-git`, `dsh-diff`, `dsh-search`.

## License

MIT - see [LICENSE](LICENSE).
