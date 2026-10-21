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
| [`dsh-pets`](packages/dsh-pets) | 0.1.0 | Pet contract & bridge client - the shared layer for desktop-pet plugins: task vocabulary, localhost bridge client, shared settings store. |
| [`dsh-lingxi`](packages/dsh-lingxi) | 0.1.0 | Lingxi (灵犀) - the desktop cat: five model tools (task/say/react/state/remember) over the pet bridge plus a settings page with live bridge status. |
| [`dsh-hyperliquid`](packages/dsh-hyperliquid) | 0.1.0 | Hyperliquid trading desk - market workspace with chart, book and account, the native agent conversation beside it, and guarded live / paper trading with per-plugin limits. |

## Reserved names by niche

Names publish as 0.0.1 placeholders; each row's README states the planned first
release. A name graduates out of this table the moment real code lands.

<!-- placeholder-table:start -->
### Model bridges (42)

| Name | Planned first release |
| --- | --- |
| [`dsh-google`](packages/dsh-google) | Google services umbrella bridge |
| [`dsh-deepseek`](packages/dsh-deepseek) | DeepSeek model bridge |
| [`dsh-mixtral`](packages/dsh-mixtral) | Mixtral model bridge |
| [`dsh-anthropic`](packages/dsh-anthropic) | Anthropic API bridge |
| [`dsh-huggingface`](packages/dsh-huggingface) | Hugging Face model bridge |
| [`dsh-hf`](packages/dsh-hf) | The short form of the Hugging Face bridge |
| [`dsh-vertex`](packages/dsh-vertex) | Google Vertex AI bridge |
| [`dsh-yi`](packages/dsh-yi) | Yi model bridge |
| [`dsh-step`](packages/dsh-step) | StepFun model bridge |
| [`dsh-sonar`](packages/dsh-sonar) | Sonar model bridge |
| [`dsh-baichuan`](packages/dsh-baichuan) | Baichuan model bridge |
| [`dsh-perplexity`](packages/dsh-perplexity) | Perplexity bridge for sourced answers |
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
| [`dsh-astra`](packages/dsh-astra) | Astra - the tier every lab prices against |

### Developer tools (29)

| Name | Planned first release |
| --- | --- |
| [`dsh-dots`](packages/dsh-dots) | Dots - my dots, your dots |
| [`dsh-vercel`](packages/dsh-vercel) | Vercel bridge for dsh agents |
| [`dsh-cloudflare`](packages/dsh-cloudflare) | Cloudflare bridge for dsh agents |
| [`dsh-netlify`](packages/dsh-netlify) | Netlify bridge for dsh agents |
| [`dsh-zapier`](packages/dsh-zapier) | Zapier bridge for dsh agents |
| [`dsh-n8n`](packages/dsh-n8n) | n8n bridge for dsh agents |
| [`dsh-gitlab`](packages/dsh-gitlab) | GitLab bridge for dsh agents |
| [`dsh-neovim`](packages/dsh-neovim) | Neovim bridge |
| [`dsh-emacs`](packages/dsh-emacs) | Emacs bridge |
| [`dsh-jetbrains`](packages/dsh-jetbrains) | JetBrains IDE bridge |
| [`dsh-helix`](packages/dsh-helix) | Helix editor bridge |
| [`dsh-warp`](packages/dsh-warp) | Warp terminal bridge |
| [`dsh-commit`](packages/dsh-commit) | Commit workflow for dsh agents |
| [`dsh-windsurf`](packages/dsh-windsurf) | Windsurf IDE bridge |
| [`dsh-tmux`](packages/dsh-tmux) | tmux surface for dsh |
| [`dsh-edit`](packages/dsh-edit) | Inline edit panel for the dsh web GUI |
| [`dsh-refactor`](packages/dsh-refactor) | Refactor workflows for the dsh web GUI |
| [`dsh-lint`](packages/dsh-lint) | Lint findings inline in the dsh web GUI |
| [`dsh-test`](packages/dsh-test) | Test runner panel for the dsh web GUI |
| [`dsh-debug`](packages/dsh-debug) | Debug console for dsh agents |
| [`dsh-db`](packages/dsh-db) | Database client tools for dsh agents |
| [`dsh-api`](packages/dsh-api) | REST client panel for the dsh web GUI |
| [`dsh-git`](packages/dsh-git) | Git panel for the dsh web GUI |
| [`dsh-juejin`](packages/dsh-juejin) | Juejin (掘金) bridge for dsh agents |
| [`dsh-csdn`](packages/dsh-csdn) | CSDN bridge for dsh agents |
| [`dsh-gitee`](packages/dsh-gitee) | Gitee (码云) bridge for dsh agents |
| [`dsh-stackoverflow`](packages/dsh-stackoverflow) | Stack Overflow bridge for dsh agents |
| [`dsh-mlx`](packages/dsh-mlx) | Mlx - the apple silicon runtime |
| [`dsh-vibecoding`](packages/dsh-vibecoding) | Vibecoding - the style that became a method |

### Agent capabilities (14)

| Name | Planned first release |
| --- | --- |
| [`dsh-agents`](packages/dsh-agents) | Agent registry panel for the dsh web GUI |
| [`dsh-planner`](packages/dsh-planner) | Plan mode for dsh sessions |
| [`dsh-rag`](packages/dsh-rag) | Retrieval-augmented answers over workspace docs |
| [`dsh-embeddings`](packages/dsh-embeddings) | Embeddings service panel for the DeepSeek Harness |
| [`dsh-router`](packages/dsh-router) | Model router for the DeepSeek Harness |
| [`dsh-search`](packages/dsh-search) | Cross-session full-text search for the DeepSeek Harness |
| [`dsh-deepsearch`](packages/dsh-deepsearch) | Agentic web research for dsh sessions |
| [`dsh-agent`](packages/dsh-agent) | Agent pattern library for dsh |
| [`dsh-workflows`](packages/dsh-workflows) | The plural form of Workflow Studio |
| [`dsh-tasks`](packages/dsh-tasks) | Durable task tracking for dsh sessions |
| [`dsh-kev`](packages/dsh-kev) | Kev - the jev-like decision family |
| [`dsh-systemone`](packages/dsh-systemone) | Systemone - the fast path |
| [`dsh-alwayson`](packages/dsh-alwayson) | Alwayson - agents that never clock out |
| [`dsh-webagent`](packages/dsh-webagent) | Webagent - the browser as an API |

### Self-iteration (17)

| Name | Planned first release |
| --- | --- |
| [`dsh-selfheal`](packages/dsh-selfheal) | Self-healing loop for dsh agents |
| [`dsh-self-improve`](packages/dsh-self-improve) | Self-improvement loop for dsh agents |
| [`dsh-iterate`](packages/dsh-iterate) | Iteration engine for dsh agents |
| [`dsh-evolve`](packages/dsh-evolve) | Evolution engine for dsh agents |
| [`dsh-adapt`](packages/dsh-adapt) | Adaptation layer for dsh agents |
| [`dsh-introspect`](packages/dsh-introspect) | Introspection toolkit for dsh agents |
| [`dsh-metacognition`](packages/dsh-metacognition) | Metacognition layer for dsh agents |
| [`dsh-retune`](packages/dsh-retune) | Retuning loop for dsh agents |
| [`dsh-calibrate`](packages/dsh-calibrate) | Calibration toolkit for dsh agents |
| [`dsh-reward`](packages/dsh-reward) | Reward toolkit for dsh agents |
| [`dsh-postmortem`](packages/dsh-postmortem) | Postmortem generator for dsh agents |
| [`dsh-lesson`](packages/dsh-lesson) | Lesson extraction for dsh agents |
| [`dsh-selftrain`](packages/dsh-selftrain) | Self-training lane for dsh agents |
| [`dsh-selfmod`](packages/dsh-selfmod) | Self-modification with guardrails for dsh agents |
| [`dsh-refine`](packages/dsh-refine) | Refinement loop for dsh agents |
| [`dsh-critic`](packages/dsh-critic) | Critic role for dsh agents |
| [`dsh-reflect`](packages/dsh-reflect) | Reflection toolkit for dsh agents |

### End-to-end (12)

| Name | Planned first release |
| --- | --- |
| [`dsh-e2e`](packages/dsh-e2e) | End-to-end testing for dsh agents |
| [`dsh-endtoend`](packages/dsh-endtoend) | The no-dash form of the e2e lane |
| [`dsh-completion`](packages/dsh-completion) | Task completion engine for dsh agents |
| [`dsh-fulfill`](packages/dsh-fulfill) | Fulfillment engine for dsh agents |
| [`dsh-turnkey`](packages/dsh-turnkey) | Turnkey stacks for dsh agents |
| [`dsh-oneshot`](packages/dsh-oneshot) | One-shot execution for dsh agents |
| [`dsh-closer`](packages/dsh-closer) | The closer role for dsh agents |
| [`dsh-finalize`](packages/dsh-finalize) | Finalization toolkit for dsh agents |
| [`dsh-deliver`](packages/dsh-deliver) | Delivery layer for dsh agents |
| [`dsh-outcome`](packages/dsh-outcome) | Outcome tracking for dsh agents |
| [`dsh-execution`](packages/dsh-execution) | Execution engine for dsh agents |
| [`dsh-copilot`](packages/dsh-copilot) | Copilot mode for dsh agents |

### Long-horizon (17)

| Name | Planned first release |
| --- | --- |
| [`dsh-longrun`](packages/dsh-longrun) | Long-run orchestration for dsh agents |
| [`dsh-marathon`](packages/dsh-marathon) | Marathon runs for dsh agents |
| [`dsh-horizon`](packages/dsh-horizon) | Horizon planning for dsh agents |
| [`dsh-saga`](packages/dsh-saga) | Saga engine for dsh agents |
| [`dsh-overnight`](packages/dsh-overnight) | Overnight runs for dsh agents |
| [`dsh-unattended`](packages/dsh-unattended) | Unattended operation for dsh agents |
| [`dsh-longtask`](packages/dsh-longtask) | Long-task toolkit for dsh agents |
| [`dsh-continuum`](packages/dsh-continuum) | The continuum of agent memory |
| [`dsh-persistence`](packages/dsh-persistence) | Persistence layer for dsh agents |
| [`dsh-durable`](packages/dsh-durable) | Durable execution for dsh agents |
| [`dsh-checkpoint`](packages/dsh-checkpoint) | Checkpointing for dsh agents |
| [`dsh-roadmap`](packages/dsh-roadmap) | Roadmap toolkit for dsh agents |
| [`dsh-resume`](packages/dsh-resume) | Resume toolkit for dsh agents |
| [`dsh-session`](packages/dsh-session) | The unified agent-session layer |
| [`dsh-tape`](packages/dsh-tape) | Session tape for dsh |
| [`dsh-sessions`](packages/dsh-sessions) | Session manager and browser |
| [`dsh-compaction`](packages/dsh-compaction) | Compaction - the memory squeeze |

### Channels (54)

| Name | Planned first release |
| --- | --- |
| [`dsh-qq`](packages/dsh-qq) | QQ channel bridge for dsh bots |
| [`dsh-douyin`](packages/dsh-douyin) | Douyin bridge for dsh bots |
| [`dsh-xiaohongshu`](packages/dsh-xiaohongshu) | Xiaohongshu bridge for dsh bots |
| [`dsh-bilibili`](packages/dsh-bilibili) | Bilibili bridge for dsh bots |
| [`dsh-kuaishou`](packages/dsh-kuaishou) | Kuaishou (快手) channel bridge for dsh bots |
| [`dsh-douban`](packages/dsh-douban) | Douban (豆瓣) bridge for dsh agents |
| [`dsh-huya`](packages/dsh-huya) | Huya (虎牙) bridge for dsh agents |
| [`dsh-tieba`](packages/dsh-tieba) | Baidu Tieba (贴吧) bridge for dsh agents |
| [`dsh-baike`](packages/dsh-baike) | Baike (百科) bridge for dsh agents |
| [`dsh-wenku`](packages/dsh-wenku) | Wenku (文库) bridge for dsh agents |
| [`dsh-36kr`](packages/dsh-36kr) | 36Kr bridge for dsh agents |
| [`dsh-hupu`](packages/dsh-hupu) | Hupu (虎扑) bridge for dsh agents |
| [`dsh-jianshu`](packages/dsh-jianshu) | Jianshu (简书) bridge for dsh agents |
| [`dsh-gongzhonghao`](packages/dsh-gongzhonghao) | Gongzhonghao (公众号) bridge for dsh bots |
| [`dsh-xiaochengxu`](packages/dsh-xiaochengxu) | Xiaochengxu (小程序) bridge for dsh agents |
| [`dsh-shipinhao`](packages/dsh-shipinhao) | Shipinhao (视频号) bridge for dsh bots |
| [`dsh-acfun`](packages/dsh-acfun) | AcFun (A站) bridge for dsh agents |
| [`dsh-sspai`](packages/dsh-sspai) | Sspai (少数派) bridge for dsh agents |
| [`dsh-guokr`](packages/dsh-guokr) | Guokr (果壳) bridge for dsh agents |
| [`dsh-v2ex`](packages/dsh-v2ex) | V2EX bridge for dsh agents |
| [`dsh-viral`](packages/dsh-viral) | Viral - the exponential spread |
| [`dsh-tiktok`](packages/dsh-tiktok) | TikTok channel bridge for dsh bots |
| [`dsh-instagram`](packages/dsh-instagram) | Instagram channel bridge for dsh bots |
| [`dsh-facebook`](packages/dsh-facebook) | Facebook channel bridge for dsh bots |
| [`dsh-youtube`](packages/dsh-youtube) | YouTube channel bridge for dsh bots |
| [`dsh-reddit`](packages/dsh-reddit) | Reddit channel bridge for dsh bots |
| [`dsh-linkedin`](packages/dsh-linkedin) | LinkedIn channel bridge for dsh bots |
| [`dsh-threads`](packages/dsh-threads) | Threads channel bridge for dsh bots |
| [`dsh-pinterest`](packages/dsh-pinterest) | Pinterest channel bridge for dsh bots |
| [`dsh-snapchat`](packages/dsh-snapchat) | Snapchat channel bridge for dsh bots |
| [`dsh-twitch`](packages/dsh-twitch) | Twitch bridge for dsh agents |
| [`dsh-medium`](packages/dsh-medium) | Medium channel bridge for dsh bots |
| [`dsh-substack`](packages/dsh-substack) | Substack channel bridge for dsh bots |
| [`dsh-bluesky`](packages/dsh-bluesky) | Bluesky channel bridge for dsh bots |
| [`dsh-mastodon`](packages/dsh-mastodon) | Mastodon channel bridge for dsh bots |
| [`dsh-messenger`](packages/dsh-messenger) | Messenger channel bridge for dsh bots |
| [`dsh-kakao`](packages/dsh-kakao) | KakaoTalk channel bridge for dsh bots |
| [`dsh-mailchimp`](packages/dsh-mailchimp) | Mailchimp bridge for dsh bots |
| [`dsh-newsletter`](packages/dsh-newsletter) | Newsletter toolkit for dsh bots |
| [`dsh-whatsapp`](packages/dsh-whatsapp) | WhatsApp channel bridge for dsh bots |
| [`dsh-line`](packages/dsh-line) | LINE channel bridge for dsh bots |
| [`dsh-twitter`](packages/dsh-twitter) | X (Twitter) channel bridge for dsh bots |
| [`dsh-amazon`](packages/dsh-amazon) | Amazon bridge for dsh agents |
| [`dsh-shopify`](packages/dsh-shopify) | Shopify bridge for dsh agents |
| [`dsh-ebay`](packages/dsh-ebay) | eBay bridge for dsh agents |
| [`dsh-etsy`](packages/dsh-etsy) | Etsy bridge for dsh agents |
| [`dsh-stripe`](packages/dsh-stripe) | Stripe bridge for dsh agents |
| [`dsh-paypal`](packages/dsh-paypal) | PayPal bridge for dsh agents |
| [`dsh-shopee`](packages/dsh-shopee) | Shopee bridge for dsh agents |
| [`dsh-intercom`](packages/dsh-intercom) | Intercom bridge for dsh agents |
| [`dsh-hubspot`](packages/dsh-hubspot) | HubSpot bridge for dsh agents |
| [`dsh-zendesk`](packages/dsh-zendesk) | Zendesk bridge for dsh agents |
| [`dsh-salesforce`](packages/dsh-salesforce) | Salesforce bridge for dsh agents |
| [`dsh-channels`](packages/dsh-channels) | Chat-channel framework for dsh bots |

### Web3 & payments (233)

| Name | Planned first release |
| --- | --- |
| [`dsh-btc`](packages/dsh-btc) | Btc - the ticker that started it all |
| [`dsh-bch`](packages/dsh-bch) | Bch - the cash fork |
| [`dsh-etc`](packages/dsh-etc) | Etc - the code is law fork |
| [`dsh-ltc`](packages/dsh-ltc) | Ltc - the silver to gold |
| [`dsh-trx`](packages/dsh-trx) | Trx - the tron ticker |
| [`dsh-dot`](packages/dsh-dot) | Dot - the polkadot ticker |
| [`dsh-atom`](packages/dsh-atom) | Atom - the cosmos ticker |
| [`dsh-xlm`](packages/dsh-xlm) | Xlm - the stellar ticker |
| [`dsh-fil`](packages/dsh-fil) | Fil - the filecoin ticker |
| [`dsh-hbar`](packages/dsh-hbar) | Hbar - the hedera ticker |
| [`dsh-algo`](packages/dsh-algo) | Algo - the algorand ticker |
| [`dsh-eos`](packages/dsh-eos) | Eos - the record raise |
| [`dsh-neo`](packages/dsh-neo) | Neo - the chinese ethereum |
| [`dsh-zcash`](packages/dsh-zcash) | Zcash - the shielded pool |
| [`dsh-iota`](packages/dsh-iota) | Iota - the tangle |
| [`dsh-bsv`](packages/dsh-bsv) | Bsv - the other schism |
| [`dsh-kava`](packages/dsh-kava) | Kava - the lending chain |
| [`dsh-blast`](packages/dsh-blast) | Blast - the yield-bearing L2 |
| [`dsh-scroll`](packages/dsh-scroll) | Scroll - the zkEVM that shipped |
| [`dsh-linea`](packages/dsh-linea) | Linea - the consensys rollup |
| [`dsh-manta`](packages/dsh-manta) | Manta - the privacy L2 |
| [`dsh-mode`](packages/dsh-mode) | Mode - the op-stack for builders |
| [`dsh-mantle`](packages/dsh-mantle) | Mantle - the bitdao chain |
| [`dsh-celestia`](packages/dsh-celestia) | Celestia - the data availability layer |
| [`dsh-sei`](packages/dsh-sei) | Sei - the orderbook chain |
| [`dsh-injective`](packages/dsh-injective) | Injective - the finance-specific chain |
| [`dsh-stacks`](packages/dsh-stacks) | Stacks - the bitcoin smart contract |
| [`dsh-multiversx`](packages/dsh-multiversx) | Multiversx - elrond grows up |
| [`dsh-aave`](packages/dsh-aave) | Aave - the ghost that lends |
| [`dsh-maker`](packages/dsh-maker) | Maker - the original stablecoin engine |
| [`dsh-lido`](packages/dsh-lido) | Lido - the liquid stake |
| [`dsh-curve`](packages/dsh-curve) | Curve - the stable swap |
| [`dsh-compound`](packages/dsh-compound) | Compound - interest rates as code |
| [`dsh-synthetix`](packages/dsh-synthetix) | Synthetix - the synthetic engine |
| [`dsh-balancer`](packages/dsh-balancer) | Balancer - the weighted pool |
| [`dsh-yearn`](packages/dsh-yearn) | Yearn - the yield strategist |
| [`dsh-pendle`](packages/dsh-pendle) | Pendle - yield, split and traded |
| [`dsh-convex`](packages/dsh-convex) | Convex - the curve booster |
| [`dsh-frax`](packages/dsh-frax) | Frax - the fractional reserve stable |
| [`dsh-rocketpool`](packages/dsh-rocketpool) | Rocketpool - the decentralized staker |
| [`dsh-1inch`](packages/dsh-1inch) | 1inch - the aggregator |
| [`dsh-pancakeswap`](packages/dsh-pancakeswap) | Pancakeswap - the bnb dex |
| [`dsh-sushiswap`](packages/dsh-sushiswap) | Sushiswap - the vampire attack |
| [`dsh-jupiter`](packages/dsh-jupiter) | Jupiter - the solana router |
| [`dsh-raydium`](packages/dsh-raydium) | Raydium - the AMM with an orderbook |
| [`dsh-pepe`](packages/dsh-pepe) | Pepe - the frog that became an asset |
| [`dsh-shib`](packages/dsh-shib) | Shib - the dogecoin successor |
| [`dsh-bonk`](packages/dsh-bonk) | Bonk - the solana dog |
| [`dsh-wif`](packages/dsh-wif) | Wif - the dog in the hat |
| [`dsh-floki`](packages/dsh-floki) | Floki - the viking dog |
| [`dsh-bome`](packages/dsh-bome) | Bome - the book of memes |
| [`dsh-tao`](packages/dsh-tao) | Tao - the bittensor unit |
| [`dsh-bittensor`](packages/dsh-bittensor) | Bittensor - the neural internet |
| [`dsh-render`](packages/dsh-render) | Render - the GPU marketplace |
| [`dsh-fet`](packages/dsh-fet) | Fet - the fetch ticker |
| [`dsh-fetch`](packages/dsh-fetch) | Fetch - the agent economy |
| [`dsh-akash`](packages/dsh-akash) | Akash - the supercloud |
| [`dsh-layerzero`](packages/dsh-layerzero) | Layerzero - the omnichain messaging |
| [`dsh-wormhole`](packages/dsh-wormhole) | Wormhole - the message bus |
| [`dsh-axelar`](packages/dsh-axelar) | Axelar - the cross-chain router |
| [`dsh-stargate`](packages/dsh-stargate) | Stargate - the unified bridge |
| [`dsh-eigenlayer`](packages/dsh-eigenlayer) | Eigenlayer - restaking, the sequel |
| [`dsh-etherfi`](packages/dsh-etherfi) | Etherfi - the staking with a bow |
| [`dsh-jito`](packages/dsh-jito) | Jito - the solana stake |
| [`dsh-marinade`](packages/dsh-marinade) | Marinade - the solana staking chef |
| [`dsh-ens`](packages/dsh-ens) | Ens - your name on the chain |
| [`dsh-ronin`](packages/dsh-ronin) | Ronin - the axie chain |
| [`dsh-gala`](packages/dsh-gala) | Gala - the games publisher on-chain |
| [`dsh-immutable`](packages/dsh-immutable) | Immutable - the web3 gaming L2 |
| [`dsh-vechain`](packages/dsh-vechain) | Vechain - the supply chain chain |
| [`dsh-conflux`](packages/dsh-conflux) | Conflux - the tree-graph chain |
| [`dsh-qtum`](packages/dsh-qtum) | Qtum - the bridging experiment |
| [`dsh-chiliz`](packages/dsh-chiliz) | Chiliz - the fan token chain |
| [`dsh-worldcoin`](packages/dsh-worldcoin) | Worldcoin - the proof of person |
| [`dsh-notcoin`](packages/dsh-notcoin) | Notcoin - the tap to earn |
| [`dsh-sky`](packages/dsh-sky) | Sky - maker grown up |
| [`dsh-usde`](packages/dsh-usde) | Usde - the delta-neutral stable |
| [`dsh-ethena`](packages/dsh-ethena) | Ethena - the synthetic dollar factory |
| [`dsh-kas`](packages/dsh-kas) | Kas - the kaspa ticker |
| [`dsh-kaspa`](packages/dsh-kaspa) | Kaspa - the blockdag |
| [`dsh-ocean`](packages/dsh-ocean) | Ocean - the data marketplace |
| [`dsh-singularitynet`](packages/dsh-singularitynet) | Singularitynet - the AI marketplace |
| [`dsh-virtual`](packages/dsh-virtual) | Virtual - the agent launchpad |
| [`dsh-eliza`](packages/dsh-eliza) | Eliza - the agent framework |
| [`dsh-grt`](packages/dsh-grt) | Grt - the graph ticker |
| [`dsh-thegraph`](packages/dsh-thegraph) | Thegraph - the blockchain search engine |
| [`dsh-api3`](packages/dsh-api3) | Api3 - first-party oracles |
| [`dsh-band`](packages/dsh-band) | Band - the oracle chain |
| [`dsh-tusd`](packages/dsh-tusd) | Tusd - the true usd |
| [`dsh-icp`](packages/dsh-icp) | Icp - the internet computer ticker |
| [`dsh-arb`](packages/dsh-arb) | Arb - the arbitrum ticker |
| [`dsh-pol`](packages/dsh-pol) | Pol - the polygon ticker |
| [`dsh-matic`](packages/dsh-matic) | Matic - the original polygon name |
| [`dsh-rwa`](packages/dsh-rwa) | Rwa - real world assets on-chain |
| [`dsh-xstocks`](packages/dsh-xstocks) | Xstocks - the tokenized ticker tape |
| [`dsh-ondo`](packages/dsh-ondo) | Ondo - wall street walks on-chain |
| [`dsh-backed`](packages/dsh-backed) | Backed - every token has an issuer |
| [`dsh-tokenized`](packages/dsh-tokenized) | Tokenized - the verb of the era |
| [`dsh-equities`](packages/dsh-equities) | Equities - ownership as a token |
| [`dsh-treasuries`](packages/dsh-treasuries) | Treasuries - the risk-free curve on-chain |
| [`dsh-buidl`](packages/dsh-buidl) | Buidl - the fund that BlackRock named |
| [`dsh-securitytoken`](packages/dsh-securitytoken) | Securitytoken - the regulated token |
| [`dsh-sto`](packages/dsh-sto) | Sto - the security token offering |
| [`dsh-fractional`](packages/dsh-fractional) | Fractional - own one thousandth of Apple |
| [`dsh-shares`](packages/dsh-shares) | Shares - the plural that went on-chain |
| [`dsh-ipo`](packages/dsh-ipo) | Ipo - the listing goes on-chain |
| [`dsh-preipo`](packages/dsh-preipo) | Preipo - the private market, tokenized |
| [`dsh-dividends`](packages/dsh-dividends) | Dividends - the payout as a transfer |
| [`dsh-buyback`](packages/dsh-buyback) | Buyback - the issuer takes tokens back |
| [`dsh-shareholder`](packages/dsh-shareholder) | Shareholder - the register lives on-chain |
| [`dsh-voting`](packages/dsh-voting) | Voting - governance for the listed |
| [`dsh-corporateaction`](packages/dsh-corporateaction) | Corporateaction - splits on schedule |
| [`dsh-nav`](packages/dsh-nav) | Nav - the price of the basket |
| [`dsh-redemption`](packages/dsh-redemption) | Redemption - the way back out |
| [`dsh-transferagent`](packages/dsh-transferagent) | Transferagent - the registry keeper |
| [`dsh-t1`](packages/dsh-t1) | T1 - the settlement they still wait for |
| [`dsh-tplus1`](packages/dsh-tplus1) | Tplus1 - wall street standard, crypto relic |
| [`dsh-dtc`](packages/dsh-dtc) | Dtc - the vault of wall street |
| [`dsh-isin`](packages/dsh-isin) | Isin - the international serial |
| [`dsh-cusip`](packages/dsh-cusip) | Cusip - the American serial |
| [`dsh-ats`](packages/dsh-ats) | Ats - where tokenized stocks legally trade |
| [`dsh-afterhours`](packages/dsh-afterhours) | Afterhours - the session that never ends |
| [`dsh-premarket`](packages/dsh-premarket) | Premarket - before the bell |
| [`dsh-circuitbreaker`](packages/dsh-circuitbreaker) | Circuitbreaker - the pause button |
| [`dsh-halt`](packages/dsh-halt) | Halt - the trading stop |
| [`dsh-shorts`](packages/dsh-shorts) | Shorts - sell what you borrow |
| [`dsh-liquidity`](packages/dsh-liquidity) | Liquidity - the water in the market |
| [`dsh-oracle`](packages/dsh-oracle) | Oracle - the truth about off-chain prices |
| [`dsh-pyth`](packages/dsh-pyth) | Pyth - first-party price feeds |
| [`dsh-wrapped`](packages/dsh-wrapped) | Wrapped - the same asset, new chain |
| [`dsh-collateral`](packages/dsh-collateral) | Collateral - the skin in the game |
| [`dsh-margin`](packages/dsh-margin) | Margin - trade with borrowed conviction |
| [`dsh-leverage`](packages/dsh-leverage) | Leverage - the multiplier |
| [`dsh-funding`](packages/dsh-funding) | Funding - the rate that keeps perps honest |
| [`dsh-yield`](packages/dsh-yield) | Yield - the return stream |
| [`dsh-apy`](packages/dsh-apy) | Apy - the annualized promise |
| [`dsh-synthetic`](packages/dsh-synthetic) | Synthetic - exposure without ownership |
| [`dsh-synth`](packages/dsh-synth) | Synth - the short form |
| [`dsh-lending`](packages/dsh-lending) | Lending - the money market |
| [`dsh-borrow`](packages/dsh-borrow) | Borrow - the other side of supply |
| [`dsh-flashloan`](packages/dsh-flashloan) | Flashloan - borrow and repay in one block |
| [`dsh-ltv`](packages/dsh-ltv) | Ltv - the loan to value line |
| [`dsh-basis`](packages/dsh-basis) | Basis - the futures spot gap |
| [`dsh-carry`](packages/dsh-carry) | Carry - get paid to wait |
| [`dsh-kyc`](packages/dsh-kyc) | Kyc - know your wallet |
| [`dsh-aml`](packages/dsh-aml) | Aml - follow the money, lawfully |
| [`dsh-whitelist`](packages/dsh-whitelist) | Whitelist - the guest list |
| [`dsh-dydx`](packages/dsh-dydx) | Dydx - the perp exchange veteran |
| [`dsh-gmx`](packages/dsh-gmx) | Gmx - the perp dex of arbitrum |
| [`dsh-drift`](packages/dsh-drift) | Drift - solana perps |
| [`dsh-aevo`](packages/dsh-aevo) | Aevo - options on-chain |
| [`dsh-lighter`](packages/dsh-lighter) | Lighter - the zero-fee perp book |
| [`dsh-meigu`](packages/dsh-meigu) | Meigu - US stocks, in Chinese |
| [`dsh-ganggu`](packages/dsh-ganggu) | Ganggu - Hong Kong stocks, in Chinese |
| [`dsh-agu`](packages/dsh-agu) | Agu - A-shares, in Chinese |
| [`dsh-shangshi`](packages/dsh-shangshi) | Shangshi - going public, in Chinese |
| [`dsh-guquan`](packages/dsh-guquan) | Guquan - equity, in Chinese |
| [`dsh-gutong`](packages/dsh-gutong) | Gutong - the connect programs |
| [`dsh-mev`](packages/dsh-mev) | Mev - the invisible tax |
| [`dsh-slippage`](packages/dsh-slippage) | Slippage - the price drift |
| [`dsh-staking`](packages/dsh-staking) | Staking - put tokens to work |
| [`dsh-restaking`](packages/dsh-restaking) | Restaking - stake it twice |
| [`dsh-airdrop`](packages/dsh-airdrop) | Airdrop - tokens from the sky |
| [`dsh-faucet`](packages/dsh-faucet) | Faucet - the test-token tap |
| [`dsh-merkle`](packages/dsh-merkle) | Merkle - the hash tree |
| [`dsh-rollup`](packages/dsh-rollup) | Rollup - batch it, prove it |
| [`dsh-zkproof`](packages/dsh-zkproof) | Zkproof - prove without showing |
| [`dsh-mempool`](packages/dsh-mempool) | Mempool - the waiting room |
| [`dsh-mainnet`](packages/dsh-mainnet) | Mainnet - the real chain |
| [`dsh-testnet`](packages/dsh-testnet) | Testnet - the rehearsal chain |
| [`dsh-sidechain`](packages/dsh-sidechain) | Sidechain - the quiet alley |
| [`dsh-seedphrase`](packages/dsh-seedphrase) | Seedphrase - the twelve words |
| [`dsh-keccak`](packages/dsh-keccak) | Keccak - the hash behind eth |
| [`dsh-calldata`](packages/dsh-calldata) | Calldata - the cheapest input |
| [`dsh-ordinals`](packages/dsh-ordinals) | Ordinals - satoshis with serials |
| [`dsh-gaslimit`](packages/dsh-gaslimit) | Gaslimit - the ceiling on spend |
| [`dsh-sol`](packages/dsh-sol) | The short form of the Solana bridge |
| [`dsh-polygon`](packages/dsh-polygon) | Polygon bridge for dsh agents |
| [`dsh-optimism`](packages/dsh-optimism) | Optimism bridge for dsh agents |
| [`dsh-avalanche`](packages/dsh-avalanche) | Avalanche bridge for dsh agents |
| [`dsh-tron`](packages/dsh-tron) | Tron bridge for dsh agents |
| [`dsh-sui`](packages/dsh-sui) | Sui bridge for dsh agents |
| [`dsh-aptos`](packages/dsh-aptos) | Aptos bridge for dsh agents |
| [`dsh-near`](packages/dsh-near) | NEAR bridge for dsh agents |
| [`dsh-ton`](packages/dsh-ton) | TON bridge for dsh agents |
| [`dsh-cardano`](packages/dsh-cardano) | Cardano bridge for dsh agents |
| [`dsh-polkadot`](packages/dsh-polkadot) | Polkadot bridge for dsh agents |
| [`dsh-starknet`](packages/dsh-starknet) | Starknet bridge for dsh agents |
| [`dsh-zksync`](packages/dsh-zksync) | zkSync bridge for dsh agents |
| [`dsh-bnb`](packages/dsh-bnb) | BNB Chain bridge for dsh agents |
| [`dsh-dogecoin`](packages/dsh-dogecoin) | Dogecoin bridge for dsh agents |
| [`dsh-doge`](packages/dsh-doge) | The short form of the Dogecoin bridge |
| [`dsh-xrp`](packages/dsh-xrp) | XRP ledger bridge for dsh agents |
| [`dsh-ripple`](packages/dsh-ripple) | RippleNet-facing bridge for dsh agents |
| [`dsh-litecoin`](packages/dsh-litecoin) | Litecoin bridge for dsh agents |
| [`dsh-monero`](packages/dsh-monero) | Monero-aware bridge for dsh agents |
| [`dsh-dai`](packages/dsh-dai) | DAI toolkit for dsh agents |
| [`dsh-circle`](packages/dsh-circle) | Circle bridge for dsh agents |
| [`dsh-tether`](packages/dsh-tether) | Tether bridge for dsh agents |
| [`dsh-uniswap`](packages/dsh-uniswap) | Uniswap bridge for dsh agents |
| [`dsh-chainlink`](packages/dsh-chainlink) | Chainlink oracle bridge for dsh agents |
| [`dsh-metamask`](packages/dsh-metamask) | MetaMask-facing bridge for dsh agents |
| [`dsh-phantom`](packages/dsh-phantom) | Phantom-facing bridge for dsh agents |
| [`dsh-trezor`](packages/dsh-trezor) | Trezor-facing bridge for dsh agents |
| [`dsh-alchemy`](packages/dsh-alchemy) | Alchemy bridge for dsh agents |
| [`dsh-infura`](packages/dsh-infura) | Infura bridge for dsh agents |
| [`dsh-etherscan`](packages/dsh-etherscan) | Etherscan bridge for dsh agents |
| [`dsh-coingecko`](packages/dsh-coingecko) | CoinGecko bridge for dsh agents |
| [`dsh-defillama`](packages/dsh-defillama) | DefiLlama bridge for dsh agents |
| [`dsh-dune`](packages/dsh-dune) | Dune bridge for dsh agents |
| [`dsh-hardhat`](packages/dsh-hardhat) | Hardhat bridge for dsh agents |
| [`dsh-foundry`](packages/dsh-foundry) | Foundry bridge for dsh agents |
| [`dsh-viem`](packages/dsh-viem) | Viem-facing bridge for dsh agents |
| [`dsh-wagmi`](packages/dsh-wagmi) | Wagmi-facing bridge for dsh agents |
| [`dsh-cex`](packages/dsh-cex) | CEX toolkit for dsh agents |
| [`dsh-adyen`](packages/dsh-adyen) | Adyen bridge for dsh agents |
| [`dsh-klarna`](packages/dsh-klarna) | Klarna bridge for dsh agents |
| [`dsh-wise`](packages/dsh-wise) | Wise bridge for dsh agents |
| [`dsh-payoneer`](packages/dsh-payoneer) | Payoneer bridge for dsh agents |
| [`dsh-razorpay`](packages/dsh-razorpay) | Razorpay bridge for dsh agents |
| [`dsh-square`](packages/dsh-square) | Square bridge for dsh agents |
| [`dsh-revolut`](packages/dsh-revolut) | Revolut bridge for dsh agents |
| [`dsh-visa`](packages/dsh-visa) | Visa-facing bridge for dsh agents |
| [`dsh-mastercard`](packages/dsh-mastercard) | Mastercard-facing bridge for dsh agents |
| [`dsh-solana`](packages/dsh-solana) | Solana bridge for dsh agents |
| [`dsh-arbitrum`](packages/dsh-arbitrum) | Arbitrum bridge for dsh agents |
| [`dsh-usdt`](packages/dsh-usdt) | USDT toolkit for dsh agents |
| [`dsh-stablecoin`](packages/dsh-stablecoin) | Stablecoin rail toolkit for dsh agents |
| [`dsh-ledger`](packages/dsh-ledger) | Ledger-facing bridge for dsh agents |
| [`dsh-lightning`](packages/dsh-lightning) | Lightning Network toolkit for dsh agents |
| [`dsh-solidity`](packages/dsh-solidity) | Solidity toolkit for dsh agents |
| [`dsh-pay`](packages/dsh-pay) | The generic payment seat for dsh agents |
| [`dsh-dex`](packages/dsh-dex) | DEX toolkit for dsh agents |

### Daily life (71)

| Name | Planned first release |
| --- | --- |
| [`dsh-meituan`](packages/dsh-meituan) | Meituan bridge for dsh agents |
| [`dsh-eleme`](packages/dsh-eleme) | Ele.me bridge for dsh agents |
| [`dsh-didi`](packages/dsh-didi) | DiDi bridge for dsh agents |
| [`dsh-amap`](packages/dsh-amap) | Amap bridge for dsh agents |
| [`dsh-gaode`](packages/dsh-gaode) | The alternate spelling of the Amap bridge |
| [`dsh-baidu`](packages/dsh-baidu) | Baidu bridge for dsh agents |
| [`dsh-taobao`](packages/dsh-taobao) | Taobao bridge for dsh agents |
| [`dsh-tmall`](packages/dsh-tmall) | Tmall bridge for dsh agents |
| [`dsh-pinduoduo`](packages/dsh-pinduoduo) | Pinduoduo bridge for dsh agents |
| [`dsh-alipay`](packages/dsh-alipay) | Alipay bridge for dsh agents |
| [`dsh-12306`](packages/dsh-12306) | 12306 bridge for dsh agents |
| [`dsh-ctrip`](packages/dsh-ctrip) | Ctrip (Trip.com) bridge for dsh agents |
| [`dsh-fliggy`](packages/dsh-fliggy) | Fliggy bridge for dsh agents |
| [`dsh-keep`](packages/dsh-keep) | Keep bridge for dsh agents |
| [`dsh-xianyu`](packages/dsh-xianyu) | Xianyu bridge for dsh agents |
| [`dsh-cainiao`](packages/dsh-cainiao) | Cainiao bridge for dsh agents |
| [`dsh-shunfeng`](packages/dsh-shunfeng) | SF Express (顺丰) bridge for dsh agents |
| [`dsh-zto`](packages/dsh-zto) | ZTO (中通) bridge for dsh agents |
| [`dsh-yto`](packages/dsh-yto) | YTO (圆通) bridge for dsh agents |
| [`dsh-yunda`](packages/dsh-yunda) | Yunda (韵达) bridge for dsh agents |
| [`dsh-jdl`](packages/dsh-jdl) | JDL (京东物流) bridge for dsh agents |
| [`dsh-beike`](packages/dsh-beike) | Beike bridge for dsh agents |
| [`dsh-liepin`](packages/dsh-liepin) | Liepin bridge for dsh agents |
| [`dsh-bole`](packages/dsh-bole) | Bole lane for dsh agents |
| [`dsh-lagou`](packages/dsh-lagou) | Lagou bridge for dsh agents |
| [`dsh-maoyan`](packages/dsh-maoyan) | Maoyan bridge for dsh agents |
| [`dsh-toutiao`](packages/dsh-toutiao) | Toutiao bridge for dsh agents |
| [`dsh-netease`](packages/dsh-netease) | Netease lane for dsh agents |
| [`dsh-qqmusic`](packages/dsh-qqmusic) | QQ Music bridge for dsh agents |
| [`dsh-163`](packages/dsh-163) | The 163 lane (Netease mail) |
| [`dsh-aliyun`](packages/dsh-aliyun) | Aliyun bridge for dsh agents |
| [`dsh-iqiyi`](packages/dsh-iqiyi) | iQiyi bridge for dsh agents |
| [`dsh-youku`](packages/dsh-youku) | Youku bridge for dsh agents |
| [`dsh-uber`](packages/dsh-uber) | Uber bridge for dsh agents |
| [`dsh-lyft`](packages/dsh-lyft) | Lyft bridge for dsh agents |
| [`dsh-grab`](packages/dsh-grab) | Grab bridge for dsh agents |
| [`dsh-airbnb`](packages/dsh-airbnb) | Airbnb bridge for dsh agents |
| [`dsh-booking`](packages/dsh-booking) | Booking.com bridge for dsh agents |
| [`dsh-expedia`](packages/dsh-expedia) | Expedia bridge for dsh agents |
| [`dsh-tripadvisor`](packages/dsh-tripadvisor) | TripAdvisor bridge for dsh agents |
| [`dsh-doordash`](packages/dsh-doordash) | DoorDash bridge for dsh agents |
| [`dsh-ubereats`](packages/dsh-ubereats) | Uber Eats bridge for dsh agents |
| [`dsh-grubhub`](packages/dsh-grubhub) | Grubhub bridge for dsh agents |
| [`dsh-walmart`](packages/dsh-walmart) | Walmart bridge for dsh agents |
| [`dsh-costco`](packages/dsh-costco) | Costco bridge for dsh agents |
| [`dsh-target`](packages/dsh-target) | Target bridge for dsh agents |
| [`dsh-shein`](packages/dsh-shein) | Shein bridge for dsh agents |
| [`dsh-temu`](packages/dsh-temu) | Temu bridge for dsh agents |
| [`dsh-netflix`](packages/dsh-netflix) | Netflix bridge for dsh agents |
| [`dsh-spotify`](packages/dsh-spotify) | Spotify bridge for dsh agents |
| [`dsh-hulu`](packages/dsh-hulu) | Hulu bridge for dsh agents |
| [`dsh-disney`](packages/dsh-disney) | Disney+ bridge for dsh agents |
| [`dsh-soundcloud`](packages/dsh-soundcloud) | SoundCloud bridge for dsh agents |
| [`dsh-siri`](packages/dsh-siri) | Siri-facing bridge for dsh agents |
| [`dsh-alexa`](packages/dsh-alexa) | Alexa-facing bridge for dsh agents |
| [`dsh-strava`](packages/dsh-strava) | Strava bridge for dsh agents |
| [`dsh-peloton`](packages/dsh-peloton) | Peloton bridge for dsh agents |
| [`dsh-waze`](packages/dsh-waze) | Waze bridge for dsh agents |
| [`dsh-yelp`](packages/dsh-yelp) | Yelp bridge for dsh agents |
| [`dsh-evernote`](packages/dsh-evernote) | Evernote bridge for dsh agents |
| [`dsh-todoist`](packages/dsh-todoist) | Todoist bridge for dsh agents |
| [`dsh-dropbox`](packages/dsh-dropbox) | Dropbox bridge for dsh agents |
| [`dsh-gdrive`](packages/dsh-gdrive) | Google Drive bridge for dsh agents |
| [`dsh-onedrive`](packages/dsh-onedrive) | OneDrive bridge for dsh agents |
| [`dsh-venmo`](packages/dsh-venmo) | Venmo bridge for dsh agents |
| [`dsh-cashapp`](packages/dsh-cashapp) | Cash App bridge for dsh agents |
| [`dsh-zelle`](packages/dsh-zelle) | Zelle bridge for dsh agents |
| [`dsh-robinhood`](packages/dsh-robinhood) | Robinhood bridge for dsh agents |
| [`dsh-applepay`](packages/dsh-applepay) | Apple Pay-facing bridge for dsh agents |
| [`dsh-googlepay`](packages/dsh-googlepay) | Google Pay-facing bridge for dsh agents |
| [`dsh-yuque`](packages/dsh-yuque) | Yuque bridge for dsh agents |

### Entertainment (129)

| Name | Planned first release |
| --- | --- |
| [`dsh-games`](packages/dsh-games) | Game night for dsh agents |
| [`dsh-chess`](packages/dsh-chess) | Chess partner for dsh agents |
| [`dsh-mahjong`](packages/dsh-mahjong) | Mahjong table for dsh agents |
| [`dsh-xiangqi`](packages/dsh-xiangqi) | Xiangqi partner for dsh agents |
| [`dsh-weiqi`](packages/dsh-weiqi) | Weiqi (Go) partner for dsh agents |
| [`dsh-wordle`](packages/dsh-wordle) | Wordle solver for dsh agents |
| [`dsh-sudoku`](packages/dsh-sudoku) | Sudoku solver for dsh agents |
| [`dsh-trivia`](packages/dsh-trivia) | Trivia host for dsh agents |
| [`dsh-gif`](packages/dsh-gif) | GIF lane for dsh agents |
| [`dsh-sticker`](packages/dsh-sticker) | Sticker lane for dsh agents |
| [`dsh-npc`](packages/dsh-npc) | NPC engine for dsh agents |
| [`dsh-arcade`](packages/dsh-arcade) | Arcade lane for dsh agents |
| [`dsh-leaderboard`](packages/dsh-leaderboard) | Leaderboards for dsh agents |
| [`dsh-tournament`](packages/dsh-tournament) | Tournament engine for dsh agents |
| [`dsh-lyrics`](packages/dsh-lyrics) | Lyrics lane for dsh agents |
| [`dsh-manga`](packages/dsh-manga) | Manga lane for dsh agents |
| [`dsh-quest`](packages/dsh-quest) | Quest engine for dsh agents |
| [`dsh-adventure`](packages/dsh-adventure) | Interactive fiction for dsh agents |
| [`dsh-achievement`](packages/dsh-achievement) | Achievements for dsh agents |
| [`dsh-remix`](packages/dsh-remix) | Remix culture for dsh agents |
| [`dsh-fiction`](packages/dsh-fiction) | Fiction workshop for dsh agents |
| [`dsh-game`](packages/dsh-game) | Game toolkit for dsh agents |
| [`dsh-play`](packages/dsh-play) | Play mode for dsh agents |
| [`dsh-anime`](packages/dsh-anime) | Anime lane for dsh agents |
| [`dsh-music`](packages/dsh-music) | Music lane for dsh agents |
| [`dsh-podcast`](packages/dsh-podcast) | Podcast lane for dsh agents |
| [`dsh-video`](packages/dsh-video) | Video lane for dsh agents |
| [`dsh-gift`](packages/dsh-gift) | Gift lane for dsh agents |
| [`dsh-karaoke`](packages/dsh-karaoke) | Karaoke lane for dsh agents |
| [`dsh-monopoly`](packages/dsh-monopoly) | Monopoly - the property empire |
| [`dsh-richman`](packages/dsh-richman) | Richman - the da fu weng lane |
| [`dsh-catan`](packages/dsh-catan) | Catan - settle the island |
| [`dsh-carcassonne`](packages/dsh-carcassonne) | Carcassonne - lay the tiles |
| [`dsh-clue`](packages/dsh-clue) | Clue - whodunit |
| [`dsh-werewolf`](packages/dsh-werewolf) | Werewolf - the village that lies |
| [`dsh-mafia`](packages/dsh-mafia) | Mafia - the original deception |
| [`dsh-avalon`](packages/dsh-avalon) | Avalon - the round table lies |
| [`dsh-resistance`](packages/dsh-resistance) | Resistance - the hidden traitor |
| [`dsh-codenames`](packages/dsh-codenames) | Codenames - one word says it all |
| [`dsh-scrabble`](packages/dsh-scrabble) | Scrabble - the tile premium |
| [`dsh-jenga`](packages/dsh-jenga) | Jenga - the steady hand |
| [`dsh-ludo`](packages/dsh-ludo) | Ludo - the childhood classic |
| [`dsh-nonogram`](packages/dsh-nonogram) | Nonogram - the picture in numbers |
| [`dsh-huarongdao`](packages/dsh-huarongdao) | Huarongdao - slide Cao Cao out |
| [`dsh-klotski`](packages/dsh-klotski) | Klotski - the sliding block |
| [`dsh-zhuoyou`](packages/dsh-zhuoyou) | Zhuoyou - tabletop, in Chinese |
| [`dsh-tabletop`](packages/dsh-tabletop) | Tabletop - around the table |
| [`dsh-boardgame`](packages/dsh-boardgame) | Boardgame - the plain category |
| [`dsh-dominion`](packages/dsh-dominion) | Dominion - build the deck |
| [`dsh-hanabi`](packages/dsh-hanabi) | Hanabi - the fireworks you cannot see |
| [`dsh-dixit`](packages/dsh-dixit) | Dixit - say it in pictures |
| [`dsh-minigame`](packages/dsh-minigame) | Minigame - the small complete game |
| [`dsh-flappy`](packages/dsh-flappy) | Flappy - the tap to fly |
| [`dsh-tiaoyitiao`](packages/dsh-tiaoyitiao) | Tiaoyitiao - the jump that swept China |
| [`dsh-popstar`](packages/dsh-popstar) | Popstar - the star elimination |
| [`dsh-ershisi`](packages/dsh-ershisi) | Ershisi - the twenty-four game |
| [`dsh-feihualing`](packages/dsh-feihualing) | Feihualing - the poetry duel |
| [`dsh-xiehouyu`](packages/dsh-xiehouyu) | Xiehouyu - the two-part proverb |
| [`dsh-dengmi`](packages/dsh-dengmi) | Dengmi - the lantern riddle |
| [`dsh-caimi`](packages/dsh-caimi) | Caimi - guess the riddle |
| [`dsh-miyu`](packages/dsh-miyu) | Miyu - the riddle, in Chinese |
| [`dsh-webgame`](packages/dsh-webgame) | Webgame - the browser era |
| [`dsh-youxiji`](packages/dsh-youxiji) | Youxiji - the game console |
| [`dsh-connections`](packages/dsh-connections) | Connections - the hidden link |
| [`dsh-strands`](packages/dsh-strands) | Strands - the letters web |
| [`dsh-doodle`](packages/dsh-doodle) | Doodle - the draw and guess |
| [`dsh-lianliankan`](packages/dsh-lianliankan) | Lianliankan - connect the pairs |
| [`dsh-xiaoxiaole`](packages/dsh-xiaoxiaole) | Xiaoxiaole - the match-three |
| [`dsh-renju`](packages/dsh-renju) | Renju - the gomoku cousin |
| [`dsh-bingo`](packages/dsh-bingo) | Bingo - the loud success |
| [`dsh-domino`](packages/dsh-domino) | Domino - the chain reaction |
| [`dsh-backgammon`](packages/dsh-backgammon) | Backgammon - the oldest race |
| [`dsh-breakout`](packages/dsh-breakout) | Breakout - break the wall |
| [`dsh-pong`](packages/dsh-pong) | Pong - the first one |
| [`dsh-anagram`](packages/dsh-anagram) | Anagram - the letters scramble |
| [`dsh-boggle`](packages/dsh-boggle) | Boggle - the dice grid |
| [`dsh-roguelike`](packages/dsh-roguelike) | Roguelike - permadeath and start again |
| [`dsh-dungeon`](packages/dsh-dungeon) | Dungeon - the deep crawl |
| [`dsh-gacha`](packages/dsh-gacha) | Gacha - the drop rates |
| [`dsh-idle`](packages/dsh-idle) | Idle - the game that plays itself |
| [`dsh-tycoon`](packages/dsh-tycoon) | Tycoon - the empire builder |
| [`dsh-platformer`](packages/dsh-platformer) | Platformer - jump with precision |
| [`dsh-speedrun`](packages/dsh-speedrun) | Speedrun - any percent |
| [`dsh-loot`](packages/dsh-loot) | Loot - the reward table |
| [`dsh-xp`](packages/dsh-xp) | Xp - the experience bar |
| [`dsh-levelup`](packages/dsh-levelup) | Levelup - the moment it clicks |
| [`dsh-skilltree`](packages/dsh-skilltree) | Skilltree - choose your branch |
| [`dsh-inventory`](packages/dsh-inventory) | Inventory - the backpack |
| [`dsh-jackpot`](packages/dsh-jackpot) | Jackpot - the rare drop |
| [`dsh-vegas`](packages/dsh-vegas) | Vegas - the neon lane |
| [`dsh-slot`](packages/dsh-slot) | Slot - the three reels |
| [`dsh-casino`](packages/dsh-casino) | Casino - the house |
| [`dsh-savepoint`](packages/dsh-savepoint) | Savepoint - the save file |
| [`dsh-respawn`](packages/dsh-respawn) | Respawn - death is not the end |
| [`dsh-rebirth`](packages/dsh-rebirth) | Rebirth - the new game plus |
| [`dsh-newgame`](packages/dsh-newgame) | Newgame - the blank save |
| [`dsh-uno`](packages/dsh-uno) | UNO lane for dsh agents |
| [`dsh-solitaire`](packages/dsh-solitaire) | Solitaire lane for dsh agents |
| [`dsh-baccarat`](packages/dsh-baccarat) | Baccarat lane for dsh agents |
| [`dsh-rummy`](packages/dsh-rummy) | Rummy lane for dsh agents |
| [`dsh-landlord`](packages/dsh-landlord) | Landlord lane for dsh agents |
| [`dsh-dice`](packages/dsh-dice) | Dice toolkit for dsh agents |
| [`dsh-cards`](packages/dsh-cards) | Card toolkit for dsh agents |
| [`dsh-fortune`](packages/dsh-fortune) | Fortune lane for dsh agents |
| [`dsh-gomoku`](packages/dsh-gomoku) | Gomoku partner for dsh agents |
| [`dsh-tictactoe`](packages/dsh-tictactoe) | Tic-tac-toe lane for dsh agents |
| [`dsh-checkers`](packages/dsh-checkers) | Checkers partner for dsh agents |
| [`dsh-othello`](packages/dsh-othello) | Othello lane for dsh agents |
| [`dsh-reversi`](packages/dsh-reversi) | Reversi lane for dsh agents |
| [`dsh-shogi`](packages/dsh-shogi) | Shogi partner for dsh agents |
| [`dsh-jigsaw`](packages/dsh-jigsaw) | Jigsaw lane for dsh agents |
| [`dsh-snake`](packages/dsh-snake) | Snake lane for dsh agents |
| [`dsh-2048`](packages/dsh-2048) | 2048 lane for dsh agents |
| [`dsh-tetris`](packages/dsh-tetris) | Falling-block lane for dsh agents |
| [`dsh-riddle`](packages/dsh-riddle) | Riddle host for dsh agents |
| [`dsh-crossword`](packages/dsh-crossword) | Crossword workshop for dsh agents |
| [`dsh-hangman`](packages/dsh-hangman) | Hangman lane for dsh agents |
| [`dsh-idiom`](packages/dsh-idiom) | Idiom lane for dsh agents |
| [`dsh-chengyu`](packages/dsh-chengyu) | Chengyu lane for dsh agents |
| [`dsh-sokoban`](packages/dsh-sokoban) | Sokoban lane for dsh agents |
| [`dsh-tangram`](packages/dsh-tangram) | Tangram lane for dsh agents |
| [`dsh-rps`](packages/dsh-rps) | Rock paper scissors for dsh agents |
| [`dsh-drawguess`](packages/dsh-drawguess) | Draw-and-guess for dsh agents |
| [`dsh-tarot`](packages/dsh-tarot) | Tarot lane for dsh agents |
| [`dsh-lottery`](packages/dsh-lottery) | Lottery lane for dsh agents |
| [`dsh-qidian`](packages/dsh-qidian) | Qidian (起点) lane for dsh agents |
| [`dsh-manhua`](packages/dsh-manhua) | Manhua (漫画) lane for dsh agents |
| [`dsh-wangwen`](packages/dsh-wangwen) | Wangwen (网文) toolkit for dsh agents |
| [`dsh-dlss`](packages/dsh-dlss) | Dlss - frames from thin air |

### Personalization (18)

| Name | Planned first release |
| --- | --- |
| [`dsh-profile`](packages/dsh-profile) | User profile toolkit for dsh agents |
| [`dsh-avatar`](packages/dsh-avatar) | Avatar lane for dsh agents |
| [`dsh-taste`](packages/dsh-taste) | Taste model for dsh agents |
| [`dsh-preference`](packages/dsh-preference) | Preference toolkit for dsh agents |
| [`dsh-personal`](packages/dsh-personal) | The personal seat for dsh agents |
| [`dsh-customize`](packages/dsh-customize) | Customization toolkit for dsh agents |
| [`dsh-tailor`](packages/dsh-tailor) | Tailor-made for dsh agents |
| [`dsh-twin`](packages/dsh-twin) | Digital twin toolkit for dsh agents |
| [`dsh-style`](packages/dsh-style) | Style lane for dsh agents |
| [`dsh-routine`](packages/dsh-routine) | Routine engine for dsh agents |
| [`dsh-fyp`](packages/dsh-fyp) | The For-You page, done honestly |
| [`dsh-discovery`](packages/dsh-discovery) | Discovery engine for dsh agents |
| [`dsh-echo`](packages/dsh-echo) | Echo lane for dsh agents |
| [`dsh-me`](packages/dsh-me) | The me seat for dsh agents |
| [`dsh-brain`](packages/dsh-brain) | The second brain for dsh agents |
| [`dsh-mood`](packages/dsh-mood) | Mood lane for dsh agents |
| [`dsh-habit`](packages/dsh-habit) | Habit engine for dsh agents |
| [`dsh-journal`](packages/dsh-journal) | Journal lane for dsh agents |

### Companion (86)

| Name | Planned first release |
| --- | --- |
| [`dsh-cat`](packages/dsh-cat) | Cat - the classic companion form |
| [`dsh-kitty`](packages/dsh-kitty) | Kitty - the affectionate form |
| [`dsh-kitten`](packages/dsh-kitten) | Kitten - the growth stage |
| [`dsh-neko`](packages/dsh-neko) | Neko - the desktop-cat canon |
| [`dsh-miao`](packages/dsh-miao) | Miao - the universal cat sound |
| [`dsh-dog`](packages/dsh-dog) | Dog - the loyal form |
| [`dsh-doggy`](packages/dsh-doggy) | Doggy - the playful form |
| [`dsh-puppy`](packages/dsh-puppy) | Puppy - the young dog stage |
| [`dsh-husky`](packages/dsh-husky) | Husky - the chatty form |
| [`dsh-corgi`](packages/dsh-corgi) | Corgi - the short-leg form |
| [`dsh-shiba`](packages/dsh-shiba) | Shiba - the meme royalty |
| [`dsh-akita`](packages/dsh-akita) | Akita - the one who waits |
| [`dsh-fox`](packages/dsh-fox) | Fox - the clever form |
| [`dsh-panda`](packages/dsh-panda) | Panda - the national treasure form |
| [`dsh-tiger`](packages/dsh-tiger) | Tiger - the power form |
| [`dsh-lion`](packages/dsh-lion) | Lion - the guardian form |
| [`dsh-rabbit`](packages/dsh-rabbit) | Rabbit - the swift gentle form |
| [`dsh-bunny`](packages/dsh-bunny) | Bunny - the soft form |
| [`dsh-bear`](packages/dsh-bear) | Bear - the sleepy strong form |
| [`dsh-hamster`](packages/dsh-hamster) | Hamster - the hoarder form |
| [`dsh-squirrel`](packages/dsh-squirrel) | Squirrel - the acorn archivist |
| [`dsh-deer`](packages/dsh-deer) | Deer - the gentle spirit form |
| [`dsh-wolf`](packages/dsh-wolf) | Wolf - the pack form |
| [`dsh-raccoon`](packages/dsh-raccoon) | Raccoon - the curious form |
| [`dsh-penguin`](packages/dsh-penguin) | Penguin - the geek royal |
| [`dsh-bird`](packages/dsh-bird) | Bird - the sky lane form |
| [`dsh-eagle`](packages/dsh-eagle) | Eagle - the sharp-eyed form |
| [`dsh-crane`](packages/dsh-crane) | Crane - the immortal companion |
| [`dsh-fish`](packages/dsh-fish) | Fish - the quiet form |
| [`dsh-whale`](packages/dsh-whale) | Whale - the deep form |
| [`dsh-turtle`](packages/dsh-turtle) | Turtle - the marathon form |
| [`dsh-frog`](packages/dsh-frog) | Frog - the patient form |
| [`dsh-duck`](packages/dsh-duck) | Duck - the calm surface form |
| [`dsh-hedgehog`](packages/dsh-hedgehog) | Hedgehog - the gentle spiked form |
| [`dsh-monkey`](packages/dsh-monkey) | Monkey - the trickster engineer |
| [`dsh-mouse`](packages/dsh-mouse) | Mouse - the first zodiac |
| [`dsh-rat`](packages/dsh-rat) | Rat - the resourceful zodiac |
| [`dsh-ox`](packages/dsh-ox) | Ox - the endurance zodiac |
| [`dsh-horse`](packages/dsh-horse) | Horse - the galloping zodiac |
| [`dsh-sheep`](packages/dsh-sheep) | Sheep - the gentle zodiac |
| [`dsh-pig`](packages/dsh-pig) | Pig - the contented zodiac |
| [`dsh-rooster`](packages/dsh-rooster) | Rooster - the dawn reporter |
| [`dsh-qilin`](packages/dsh-qilin) | Qilin - the auspicious supreme form |
| [`dsh-pixiu`](packages/dsh-pixiu) | Pixiu - the wealth guardian |
| [`dsh-koi`](packages/dsh-koi) | Koi - the luck lane |
| [`dsh-magpie`](packages/dsh-magpie) | Magpie - the English twin of xique |
| [`dsh-owl`](packages/dsh-owl) | Owl - the watcher for dsh |
| [`dsh-radar`](packages/dsh-radar) | Radar - the approval radar for dsh |
| [`dsh-beacon`](packages/dsh-beacon) | Beacon - the signal lane for dsh |
| [`dsh-halo`](packages/dsh-halo) | Halo - the companion aura |
| [`dsh-zhiyin`](packages/dsh-zhiyin) | Zhiyin (知音) - the friend who understands your music |
| [`dsh-shutong`](packages/dsh-shutong) | Shutong (书童) - the study companion |
| [`dsh-linu`](packages/dsh-linu) | Linu (狸奴) - the scholar cat |
| [`dsh-baize`](packages/dsh-baize) | Baize (白泽) - the beast that knows all things |
| [`dsh-xique`](packages/dsh-xique) | Xique (喜鹊) - the good-news bird |
| [`dsh-zhiliao`](packages/dsh-zhiliao) | Zhiliao (知了) - the cicada that says got-it |
| [`dsh-jinnang`](packages/dsh-jinnang) | Jinnang (锦囊) - the pouch of stratagems |
| [`dsh-mengchong`](packages/dsh-mengchong) | Mengchong (萌宠) - the cute-pet lane |
| [`dsh-lingchong`](packages/dsh-lingchong) | Lingchong (灵宠) - the spirit pet |
| [`dsh-zhuochong`](packages/dsh-zhuochong) | Zhuochong (桌宠) - the desktop pet, in Chinese |
| [`dsh-afu`](packages/dsh-afu) | Afu (阿福) - the lucky doll |
| [`dsh-laifu`](packages/dsh-laifu) | Laifu (来福) - the fortune-bringer |
| [`dsh-lingji`](packages/dsh-lingji) | Lingji (灵机) - the flash of wit |
| [`dsh-jingling`](packages/dsh-jingling) | Jingling (精灵) - the spirit lane |
| [`dsh-qingniao`](packages/dsh-qingniao) | Qingniao (青鸟) - the messenger bird |
| [`dsh-yutu`](packages/dsh-yutu) | Yutu (玉兔) - the jade rabbit |
| [`dsh-xiaotian`](packages/dsh-xiaotian) | Xiaotian (哮天) - the howling celestial hound |
| [`dsh-ling`](packages/dsh-ling) | Ling (灵) - the shortest spirit name |
| [`dsh-mascot`](packages/dsh-mascot) | The mascot seat for dsh |
| [`dsh-menubar`](packages/dsh-menubar) | The menubar seat for dsh |
| [`dsh-toy`](packages/dsh-toy) | The toy seat for dsh |
| [`dsh-sprite`](packages/dsh-sprite) | Sprite lane for dsh mascots |
| [`dsh-pixel`](packages/dsh-pixel) | Pixel-art lane for dsh |
| [`dsh-chibi`](packages/dsh-chibi) | Chibi lane for dsh mascots |
| [`dsh-sidekick`](packages/dsh-sidekick) | Sidekick seat for dsh |
| [`dsh-pal`](packages/dsh-pal) | Pal lane for dsh |
| [`dsh-familiar`](packages/dsh-familiar) | Familiar lane for dsh |
| [`dsh-fairy`](packages/dsh-fairy) | Fairy lane for dsh |
| [`dsh-dragon`](packages/dsh-dragon) | Dragon lane for dsh |
| [`dsh-cub`](packages/dsh-cub) | Cub lane for dsh |
| [`dsh-tame`](packages/dsh-tame) | Taming lane for dsh |
| [`dsh-hatch`](packages/dsh-hatch) | Hatching lane for dsh |
| [`dsh-nurture`](packages/dsh-nurture) | Nurture lane for dsh |
| [`dsh-bond`](packages/dsh-bond) | Bond lane for dsh |
| [`dsh-gaze`](packages/dsh-gaze) | Gaze lane for dsh |
| [`dsh-peek`](packages/dsh-peek) | Peek lane for dsh |

### China ecosystem (64)

| Name | Planned first release |
| --- | --- |
| [`dsh-pengyouquan`](packages/dsh-pengyouquan) | Pengyouquan - the moments feed |
| [`dsh-qunliao`](packages/dsh-qunliao) | Qunliao - the group chat |
| [`dsh-siliao`](packages/dsh-siliao) | Siliao - the private line |
| [`dsh-guanxi`](packages/dsh-guanxi) | Guanxi - the connection capital |
| [`dsh-renmai`](packages/dsh-renmai) | Renmai - the network you grow |
| [`dsh-mianzi`](packages/dsh-mianzi) | Mianzi - the face you keep |
| [`dsh-resou`](packages/dsh-resou) | Resou - the trending searches |
| [`dsh-rebang`](packages/dsh-rebang) | Rebang - the hot list |
| [`dsh-chaohua`](packages/dsh-chaohua) | Chaohua - the super topic |
| [`dsh-zhuanfa`](packages/dsh-zhuanfa) | Zhuanfa - the repost |
| [`dsh-pinglun`](packages/dsh-pinglun) | Pinglun - the comment section |
| [`dsh-haoyou`](packages/dsh-haoyou) | Haoyou - the friends list |
| [`dsh-fenxiang`](packages/dsh-fenxiang) | Fenxiang - the share |
| [`dsh-hongbao`](packages/dsh-hongbao) | Hongbao (红包) lane for dsh agents |
| [`dsh-qianbao`](packages/dsh-qianbao) | Qianbao (钱包) lane for dsh agents |
| [`dsh-zhuanzhang`](packages/dsh-zhuanzhang) | Zhuanzhang (转账) lane for dsh agents |
| [`dsh-zhifu`](packages/dsh-zhifu) | Zhifu (支付) lane for dsh agents |
| [`dsh-fapiao`](packages/dsh-fapiao) | Fapiao (发票) lane for dsh agents |
| [`dsh-shebao`](packages/dsh-shebao) | Shebao (社保) lane for dsh agents |
| [`dsh-gongjijin`](packages/dsh-gongjijin) | Gongjijin (公积金) lane for dsh agents |
| [`dsh-hukou`](packages/dsh-hukou) | Hukou (户口) lane for dsh agents |
| [`dsh-baoxian`](packages/dsh-baoxian) | Baoxian (保险) lane for dsh agents |
| [`dsh-jijin`](packages/dsh-jijin) | Jijin (基金) lane for dsh agents |
| [`dsh-gupiao`](packages/dsh-gupiao) | Gupiao (股票) lane for dsh agents |
| [`dsh-huabei`](packages/dsh-huabei) | Huabei (花呗) lane for dsh agents |
| [`dsh-dashang`](packages/dsh-dashang) | Dashang (打赏) lane for dsh agents |
| [`dsh-dianzan`](packages/dsh-dianzan) | Dianzan (点赞) lane for dsh agents |
| [`dsh-guanzhu`](packages/dsh-guanzhu) | Guanzhu (关注) lane for dsh agents |
| [`dsh-fensi`](packages/dsh-fensi) | Fensi (粉丝) lane for dsh agents |
| [`dsh-lahei`](packages/dsh-lahei) | Lahei (拉黑) lane for dsh agents |
| [`dsh-miaosha`](packages/dsh-miaosha) | Miaosha (秒杀) lane for dsh agents |
| [`dsh-tuangou`](packages/dsh-tuangou) | Tuangou (团购) lane for dsh agents |
| [`dsh-kanjia`](packages/dsh-kanjia) | Kanjia (砍价) lane for dsh agents |
| [`dsh-zhuli`](packages/dsh-zhuli) | Zhuli (助力) lane for dsh agents |
| [`dsh-baoyou`](packages/dsh-baoyou) | Baoyou (包邮) lane for dsh agents |
| [`dsh-tuikuan`](packages/dsh-tuikuan) | Tuikuan (退款) lane for dsh agents |
| [`dsh-1111`](packages/dsh-1111) | The 11.11 shopping festival lane for dsh agents |
| [`dsh-double11`](packages/dsh-double11) | Double 11 - the Singles Day festival lane |
| [`dsh-shuangshiyi`](packages/dsh-shuangshiyi) | Shuangshiyi (双十一) - the Singles Day lane |
| [`dsh-singlesday`](packages/dsh-singlesday) | Singles Day - the anti-Valentine's festival lane |
| [`dsh-cuxiao`](packages/dsh-cuxiao) | Cuxiao (促销) lane for dsh agents |
| [`dsh-youhuiquan`](packages/dsh-youhuiquan) | Youhuiquan (优惠券) lane for dsh agents |
| [`dsh-coupon`](packages/dsh-coupon) | Coupon lane for dsh agents |
| [`dsh-manjian`](packages/dsh-manjian) | Manjian (满减) lane for dsh agents |
| [`dsh-mansong`](packages/dsh-mansong) | Mansong (满送) lane for dsh agents |
| [`dsh-zhekou`](packages/dsh-zhekou) | Zhekou (折扣) lane for dsh agents |
| [`dsh-baitiao`](packages/dsh-baitiao) | Baitiao (白条) lane for dsh agents |
| [`dsh-fenqi`](packages/dsh-fenqi) | Fenqi (分期) lane for dsh agents |
| [`dsh-zhibo`](packages/dsh-zhibo) | Zhibo (直播) lane for dsh agents |
| [`dsh-livecommerce`](packages/dsh-livecommerce) | Live-commerce lane for dsh agents |
| [`dsh-daigou`](packages/dsh-daigou) | Daigou (代购) lane for dsh agents |
| [`dsh-haitao`](packages/dsh-haitao) | Haitao (海淘) lane for dsh agents |
| [`dsh-shici`](packages/dsh-shici) | Shici (诗词) lane for dsh agents |
| [`dsh-duilian`](packages/dsh-duilian) | Duilian (对联) lane for dsh agents |
| [`dsh-shengxiao`](packages/dsh-shengxiao) | Shengxiao (生肖) lane for dsh agents |
| [`dsh-nongli`](packages/dsh-nongli) | Nongli (农历) lane for dsh agents |
| [`dsh-jieqi`](packages/dsh-jieqi) | Jieqi (节气) lane for dsh agents |
| [`dsh-wuxing`](packages/dsh-wuxing) | Wuxing (五行) lane for dsh agents |
| [`dsh-fengshui`](packages/dsh-fengshui) | Fengshui (风水) lane for dsh agents |
| [`dsh-guoxue`](packages/dsh-guoxue) | Guoxue (国学) lane for dsh agents |
| [`dsh-hanfu`](packages/dsh-hanfu) | Hanfu (汉服) lane for dsh agents |
| [`dsh-wuxia`](packages/dsh-wuxia) | Wuxia (武侠) lane for dsh agents |
| [`dsh-xianxia`](packages/dsh-xianxia) | Xianxia (仙侠) lane for dsh agents |
| [`dsh-jianghu`](packages/dsh-jianghu) | Jianghu (江湖) lane for dsh agents |

### China b2b (52)

| Name | Planned first release |
| --- | --- |
| [`dsh-baoshui`](packages/dsh-baoshui) | Baoshui (报关) lane for dsh agents |
| [`dsh-tuishui`](packages/dsh-tuishui) | Tuishui (退税) lane for dsh agents |
| [`dsh-nashui`](packages/dsh-nashui) | Nashui (纳税) lane for dsh agents |
| [`dsh-jizhang`](packages/dsh-jizhang) | Jizhang (记账) lane for dsh agents |
| [`dsh-kuaiji`](packages/dsh-kuaiji) | Kuaiji (会计) lane for dsh agents |
| [`dsh-shenji`](packages/dsh-shenji) | Shenji (审计) lane for dsh agents |
| [`dsh-kaipiao`](packages/dsh-kaipiao) | Kaipiao (开票) lane for dsh agents |
| [`dsh-yusuan`](packages/dsh-yusuan) | Yusuan (预算) lane for dsh agents |
| [`dsh-baozhang`](packages/dsh-baozhang) | Baozhang (报销) lane for dsh agents |
| [`dsh-hesuan`](packages/dsh-hesuan) | Hesuan (核算) lane for dsh agents |
| [`dsh-gongshang`](packages/dsh-gongshang) | Gongshang (工商) lane for dsh agents |
| [`dsh-zhizhao`](packages/dsh-zhizhao) | Zhizhao (执照) lane for dsh agents |
| [`dsh-renzheng`](packages/dsh-renzheng) | Renzheng (认证) lane for dsh agents |
| [`dsh-zizhi`](packages/dsh-zizhi) | Zizhi (资质) lane for dsh agents |
| [`dsh-jiuzhang`](packages/dsh-jiuzhang) | Jiuzhang (公章) lane for dsh agents |
| [`dsh-beian`](packages/dsh-beian) | Beian (备案) lane for dsh agents |
| [`dsh-chailv`](packages/dsh-chailv) | Chailv (差旅) lane for dsh agents |
| [`dsh-qianyue`](packages/dsh-qianyue) | Qianyue (签约) lane for dsh agents |
| [`dsh-ruzhi`](packages/dsh-ruzhi) | Ruzhi (入职) lane for dsh agents |
| [`dsh-lizhi`](packages/dsh-lizhi) | Lizhi (离职) lane for dsh agents |
| [`dsh-kaoqin`](packages/dsh-kaoqin) | Kaoqin (考勤) lane for dsh agents |
| [`dsh-jixiao`](packages/dsh-jixiao) | Jixiao (绩效) lane for dsh agents |
| [`dsh-gongzi`](packages/dsh-gongzi) | Gongzi (工资) lane for dsh agents |
| [`dsh-jiangjin`](packages/dsh-jiangjin) | Jiangjin (奖金) lane for dsh agents |
| [`dsh-hetong`](packages/dsh-hetong) | Hetong (合同) lane for dsh agents |
| [`dsh-nianjian`](packages/dsh-nianjian) | Nianjian (年检) lane for dsh agents |
| [`dsh-caigou`](packages/dsh-caigou) | Caigou (采购) lane for dsh agents |
| [`dsh-gongyinglian`](packages/dsh-gongyinglian) | Gongyinglian (供应链) lane for dsh agents |
| [`dsh-ruku`](packages/dsh-ruku) | Ruku (入库) lane for dsh agents |
| [`dsh-chuku`](packages/dsh-chuku) | Chuku (出库) lane for dsh agents |
| [`dsh-kucun`](packages/dsh-kucun) | Kucun (库存) lane for dsh agents |
| [`dsh-pandi`](packages/dsh-pandi) | Pandi (盘点) lane for dsh agents |
| [`dsh-qiankuan`](packages/dsh-qiankuan) | Qiankuan (欠款) lane for dsh agents |
| [`dsh-shoukuan`](packages/dsh-shoukuan) | Shoukuan (收款) lane for dsh agents |
| [`dsh-fukuan`](packages/dsh-fukuan) | Fukuan (付款) lane for dsh agents |
| [`dsh-xiansuo`](packages/dsh-xiansuo) | Xiansuo (线索) lane for dsh agents |
| [`dsh-shangji`](packages/dsh-shangji) | Shangji (商机) lane for dsh agents |
| [`dsh-gonghai`](packages/dsh-gonghai) | Gonghai (公海) lane for dsh agents |
| [`dsh-huikuan`](packages/dsh-huikuan) | Huikuan (回款) lane for dsh agents |
| [`dsh-dingdan`](packages/dsh-dingdan) | Dingdan (订单) lane for dsh agents |
| [`dsh-fahuo`](packages/dsh-fahuo) | Fahuo (发货) lane for dsh agents |
| [`dsh-zhaobiao`](packages/dsh-zhaobiao) | Zhaobiao (招标) lane for dsh agents |
| [`dsh-toubiao`](packages/dsh-toubiao) | Toubiao (投标) lane for dsh agents |
| [`dsh-zhongbiao`](packages/dsh-zhongbiao) | Zhongbiao (中标) lane for dsh agents |
| [`dsh-gongdan`](packages/dsh-gongdan) | Gongdan (工单) lane for dsh agents |
| [`dsh-zhijian`](packages/dsh-zhijian) | Zhijian (质检) lane for dsh agents |
| [`dsh-oa`](packages/dsh-oa) | The OA (办公自动化) bridge for dsh agents |
| [`dsh-mes`](packages/dsh-mes) | The MES bridge for dsh agents |
| [`dsh-wms`](packages/dsh-wms) | The WMS bridge for dsh agents |
| [`dsh-scm`](packages/dsh-scm) | The SCM bridge for dsh agents |
| [`dsh-erp`](packages/dsh-erp) | The ERP bridge for dsh agents |
| [`dsh-crm`](packages/dsh-crm) | The CRM bridge for dsh agents |

### Healthcare (9)

| Name | Planned first release |
| --- | --- |
| [`dsh-patient`](packages/dsh-patient) | Patient lane for dsh agents |
| [`dsh-symptom`](packages/dsh-symptom) | Symptom tracker for dsh agents |
| [`dsh-diagnose`](packages/dsh-diagnose) | Diagnosis-support lane for dsh agents |
| [`dsh-fhir`](packages/dsh-fhir) | FHIR bridge for dsh agents |
| [`dsh-pharmacy`](packages/dsh-pharmacy) | Pharmacy lane for dsh agents |
| [`dsh-drug`](packages/dsh-drug) | Drug-information lane for dsh agents |
| [`dsh-clinical`](packages/dsh-clinical) | Clinical-notes lane for dsh agents |
| [`dsh-yiliao`](packages/dsh-yiliao) | Yiliao (医疗) lane for dsh agents |
| [`dsh-medical`](packages/dsh-medical) | Medical lane for dsh agents |

### Legal & learning (12)

| Name | Planned first release |
| --- | --- |
| [`dsh-counsel`](packages/dsh-counsel) | Counsel lane for dsh agents |
| [`dsh-litigation`](packages/dsh-litigation) | Litigation-support lane for dsh agents |
| [`dsh-lvshi`](packages/dsh-lvshi) | Lvshi (律师) lane for dsh agents |
| [`dsh-falv`](packages/dsh-falv) | Falv (法律) lane for dsh agents |
| [`dsh-course`](packages/dsh-course) | Course builder for dsh agents |
| [`dsh-exam`](packages/dsh-exam) | Exam lane for dsh agents |
| [`dsh-homework`](packages/dsh-homework) | Homework lane for dsh agents |
| [`dsh-jiaoyu`](packages/dsh-jiaoyu) | Jiaoyu (教育) lane for dsh agents |
| [`dsh-kaoshi`](packages/dsh-kaoshi) | Kaoshi (考试) lane for dsh agents |
| [`dsh-legal`](packages/dsh-legal) | Legal lane for dsh agents |
| [`dsh-compliance`](packages/dsh-compliance) | Compliance lane for dsh agents |
| [`dsh-tutor`](packages/dsh-tutor) | Tutor lane for dsh agents |

### Research & quant (20)

| Name | Planned first release |
| --- | --- |
| [`dsh-hedge`](packages/dsh-hedge) | Hedge - the other side of the trade |
| [`dsh-arbitrage`](packages/dsh-arbitrage) | Arbitrage - the free lunch hunt |
| [`dsh-greeks`](packages/dsh-greeks) | Greeks - the sensitivity alphabet |
| [`dsh-sharpe`](packages/dsh-sharpe) | Sharpe - return per unit of pain |
| [`dsh-drawdown`](packages/dsh-drawdown) | Drawdown - from peak to pit |
| [`dsh-twap`](packages/dsh-twap) | Twap - time-weighted patience |
| [`dsh-vwap`](packages/dsh-vwap) | Vwap - the fair price of the day |
| [`dsh-iceberg`](packages/dsh-iceberg) | Iceberg - the order below |
| [`dsh-orderbook`](packages/dsh-orderbook) | Orderbook - the wall of intents |
| [`dsh-clearing`](packages/dsh-clearing) | Clearing - the promise machine |
| [`dsh-settlement`](packages/dsh-settlement) | Settlement - finality at last |
| [`dsh-liquidation`](packages/dsh-liquidation) | Liquidation - the margin call |
| [`dsh-citation`](packages/dsh-citation) | Citation engine for dsh agents |
| [`dsh-bibtex`](packages/dsh-bibtex) | BibTeX lane for dsh agents |
| [`dsh-backtest`](packages/dsh-backtest) | Backtest harness for dsh agents |
| [`dsh-kline`](packages/dsh-kline) | Kline (K线) lane for dsh agents |
| [`dsh-factor`](packages/dsh-factor) | Factor lane for dsh agents |
| [`dsh-trading`](packages/dsh-trading) | Trading lane for dsh agents |
| [`dsh-portfolio`](packages/dsh-portfolio) | Portfolio lane for dsh agents |
| [`dsh-praxis`](packages/dsh-praxis) | Praxis - research that executes |

### Embodied (29)

| Name | Planned first release |
| --- | --- |
| [`dsh-zigbee`](packages/dsh-zigbee) | Zigbee bridge for dsh agents |
| [`dsh-matter`](packages/dsh-matter) | Matter bridge for dsh agents |
| [`dsh-homeassistant`](packages/dsh-homeassistant) | Home Assistant bridge for dsh agents |
| [`dsh-robot`](packages/dsh-robot) | Robot lane for dsh agents |
| [`dsh-ros`](packages/dsh-ros) | ROS bridge for dsh agents |
| [`dsh-drone`](packages/dsh-drone) | Drone lane for dsh agents |
| [`dsh-jiqiren`](packages/dsh-jiqiren) | Jiqiren (机器人) lane for dsh agents |
| [`dsh-wulianwang`](packages/dsh-wulianwang) | Wulianwang (物联网) lane for dsh agents |
| [`dsh-iot`](packages/dsh-iot) | IoT bridge for dsh agents |
| [`dsh-home`](packages/dsh-home) | Smart-home lane for dsh agents |
| [`dsh-car`](packages/dsh-car) | Connected-car lane for dsh agents |
| [`dsh-rtl`](packages/dsh-rtl) | Rtl - register transfer level |
| [`dsh-verilog`](packages/dsh-verilog) | Verilog - the language of silicon |
| [`dsh-tapeout`](packages/dsh-tapeout) | Tapeout - the point of no return |
| [`dsh-netlist`](packages/dsh-netlist) | Netlist - the wiring truth |
| [`dsh-gdsii`](packages/dsh-gdsii) | Gdsii - the layout format |
| [`dsh-floorplan`](packages/dsh-floorplan) | Floorplan - rooms before walls |
| [`dsh-wafer`](packages/dsh-wafer) | Wafer - a disk of futures |
| [`dsh-eda`](packages/dsh-eda) | Eda - electronic design automation |
| [`dsh-litho`](packages/dsh-litho) | Litho - printing with light |
| [`dsh-silicon`](packages/dsh-silicon) | Silicon - the actual sand |
| [`dsh-canbus`](packages/dsh-canbus) | Canbus - the car nervous system |
| [`dsh-obd`](packages/dsh-obd) | Obd - the diagnostic port |
| [`dsh-telematics`](packages/dsh-telematics) | Telematics - the car that phones home |
| [`dsh-vin`](packages/dsh-vin) | Vin - the vehicle fingerprint |
| [`dsh-ecu`](packages/dsh-ecu) | Ecu - the little computers everywhere |
| [`dsh-autosar`](packages/dsh-autosar) | Autosar - the car software standard |
| [`dsh-doip`](packages/dsh-doip) | Doip - diagnostics over IP |
| [`dsh-flexray`](packages/dsh-flexray) | Flexray - deterministic by design |

### Multi-agent (7)

| Name | Planned first release |
| --- | --- |
| [`dsh-ensemble`](packages/dsh-ensemble) | Model ensembles for dsh |
| [`dsh-broker`](packages/dsh-broker) | Task broker for agent fleets |
| [`dsh-swarm`](packages/dsh-swarm) | Multi-agent swarm orchestration for dsh |
| [`dsh-delegate`](packages/dsh-delegate) | Delegation tool for dsh agents |
| [`dsh-queue`](packages/dsh-queue) | Durable task queues for dsh bots |
| [`dsh-council`](packages/dsh-council) | Council-of-agents deliberation for dsh |
| [`dsh-coworker`](packages/dsh-coworker) | Coworker - the AI with a desk |

### Role presets (21)

| Name | Planned first release |
| --- | --- |
| [`dsh-frontend`](packages/dsh-frontend) | Frontend developer role preset |
| [`dsh-backend`](packages/dsh-backend) | Backend developer role preset |
| [`dsh-fullstack`](packages/dsh-fullstack) | Full-stack developer role preset |
| [`dsh-dev`](packages/dsh-dev) | Developer role preset (short form) |
| [`dsh-engineer`](packages/dsh-engineer) | Software engineer role preset |
| [`dsh-devops`](packages/dsh-devops) | DevOps role preset |
| [`dsh-sre`](packages/dsh-sre) | Site reliability engineer role preset |
| [`dsh-dba`](packages/dsh-dba) | Database administrator role preset |
| [`dsh-architect`](packages/dsh-architect) | Software architect role preset |
| [`dsh-designer`](packages/dsh-designer) | Product designer role preset |
| [`dsh-tester`](packages/dsh-tester) | QA tester role preset |
| [`dsh-analyst`](packages/dsh-analyst) | Data analyst role preset |
| [`dsh-algorithm`](packages/dsh-algorithm) | Algorithm engineer role preset |
| [`dsh-ios`](packages/dsh-ios) | iOS developer role preset |
| [`dsh-android`](packages/dsh-android) | Android developer role preset |
| [`dsh-embedded`](packages/dsh-embedded) | Embedded developer role preset |
| [`dsh-security`](packages/dsh-security) | Security engineer role preset |
| [`dsh-researcher`](packages/dsh-researcher) | Researcher role preset |
| [`dsh-product-manager`](packages/dsh-product-manager) | Product manager role preset |
| [`dsh-hiring-manager`](packages/dsh-hiring-manager) | Hiring manager role preset |
| [`dsh-engineering-manager`](packages/dsh-engineering-manager) | Engineering manager role preset |

### Interaction (21)

| Name | Planned first release |
| --- | --- |
| [`dsh-listen`](packages/dsh-listen) | Always-listening input loop |
| [`dsh-cast`](packages/dsh-cast) | Cast sessions to nearby screens |
| [`dsh-tts`](packages/dsh-tts) | Spoken status and voice alerts for dsh sessions |
| [`dsh-stt`](packages/dsh-stt) | Speech-to-text input for dsh sessions |
| [`dsh-speech`](packages/dsh-speech) | Bidirectional voice mode with barge-in |
| [`dsh-wake`](packages/dsh-wake) | Wake-word activation for the voice loop |
| [`dsh-audio`](packages/dsh-audio) | Audio I/O substrate for the harness |
| [`dsh-toast`](packages/dsh-toast) | Toast notifications for the dsh web GUI |
| [`dsh-bell`](packages/dsh-bell) | Terminal bell and title management |
| [`dsh-dnd`](packages/dsh-dnd) | Focus-aware notification routing |
| [`dsh-nudge`](packages/dsh-nudge) | Proactive agent check-ins |
| [`dsh-presence`](packages/dsh-presence) | Teammate presence for agents |
| [`dsh-progress`](packages/dsh-progress) | Progress affordances for long work |
| [`dsh-ambient`](packages/dsh-ambient) | Ambient status display |
| [`dsh-next`](packages/dsh-next) | Next-step suggestions after each answer |
| [`dsh-attach`](packages/dsh-attach) | Attachments for prompts |
| [`dsh-mention`](packages/dsh-mention) | @-mentions in prompts |
| [`dsh-steer`](packages/dsh-steer) | Mid-run steering |
| [`dsh-autocomplete`](packages/dsh-autocomplete) | Prompt autocomplete |
| [`dsh-tour`](packages/dsh-tour) | Interactive product tours |
| [`dsh-mirror`](packages/dsh-mirror) | Mirror a session to a second surface |

### Evaluation (5)

| Name | Planned first release |
| --- | --- |
| [`dsh-judge`](packages/dsh-judge) | LLM-as-judge evaluation |
| [`dsh-rubric`](packages/dsh-rubric) | Scoring rubrics for agent work |
| [`dsh-coverage`](packages/dsh-coverage) | Agent edit coverage map |
| [`dsh-modeldrift`](packages/dsh-modeldrift) | Modeldrift - the nerf question |
| [`dsh-evals`](packages/dsh-evals) | Evals - the scoreboard of intelligence |

### Protocols (2)

| Name | Planned first release |
| --- | --- |
| [`dsh-lsp`](packages/dsh-lsp) | Language Server Protocol bridge for the DeepSeek Harness |
| [`dsh-agui`](packages/dsh-agui) | Agui - the agent user interaction protocol |

### Ui (6)

| Name | Planned first release |
| --- | --- |
| [`dsh-panel`](packages/dsh-panel) | Custom panel framework for the dsh web GUI |
| [`dsh-widget`](packages/dsh-widget) | Widget library for the dsh web GUI |
| [`dsh-zen`](packages/dsh-zen) | Zen mode for the dsh web GUI |
| [`dsh-sound`](packages/dsh-sound) | Sound design for the DeepSeek Harness |
| [`dsh-files`](packages/dsh-files) | File manager panel for the dsh web GUI |
| [`dsh-diff`](packages/dsh-diff) | Turn diff viewer for the dsh web GUI |

### Data (8)

| Name | Planned first release |
| --- | --- |
| [`dsh-vector`](packages/dsh-vector) | Vector store bridge for dsh agents |
| [`dsh-embed`](packages/dsh-embed) | Embedding pipeline for dsh agents |
| [`dsh-retrieval`](packages/dsh-retrieval) | Retrieval surface for dsh agents |
| [`dsh-index`](packages/dsh-index) | Workspace index for dsh agents |
| [`dsh-export`](packages/dsh-export) | Export sessions from the DeepSeek Harness |
| [`dsh-archive`](packages/dsh-archive) | Archive cold sessions to compressed bundles |
| [`dsh-cloud`](packages/dsh-cloud) | Cloud sync for dsh homes |
| [`dsh-link`](packages/dsh-link) | Share links for dsh sessions |

### Ops (28)

| Name | Planned first release |
| --- | --- |
| [`dsh-kaizen`](packages/dsh-kaizen) | Kaizen - improve one percent daily |
| [`dsh-andon`](packages/dsh-andon) | Andon - pull the cord |
| [`dsh-jit`](packages/dsh-jit) | Jit - just in time |
| [`dsh-sixsigma`](packages/dsh-sixsigma) | Sixsigma - 3.4 defects per million |
| [`dsh-bom`](packages/dsh-bom) | Bom - the bill of materials |
| [`dsh-shopfloor`](packages/dsh-shopfloor) | Shopfloor - where it actually runs |
| [`dsh-takt`](packages/dsh-takt) | Takt - the heartbeat of the line |
| [`dsh-pokayoke`](packages/dsh-pokayoke) | Pokayoke - mistake-proof it |
| [`dsh-oee`](packages/dsh-oee) | Oee - overall equipment effectiveness |
| [`dsh-muda`](packages/dsh-muda) | Muda - the seven wastes |
| [`dsh-heal`](packages/dsh-heal) | Heal - the four-letter fix |
| [`dsh-mend`](packages/dsh-mend) | Mend - the careful fix |
| [`dsh-rescue`](packages/dsh-rescue) | Rescue - the rescue CLI |
| [`dsh-aid`](packages/dsh-aid) | Aid - the first responder |
| [`dsh-sandbox`](packages/dsh-sandbox) | Sandboxed execution for agent commands |
| [`dsh-isolate`](packages/dsh-isolate) | Isolation realms for dsh sessions |
| [`dsh-fork`](packages/dsh-fork) | Session forking |
| [`dsh-headless`](packages/dsh-headless) | Headless mode toolkit |
| [`dsh-daemon`](packages/dsh-daemon) | Background daemon for dsh bots |
| [`dsh-run`](packages/dsh-run) | Programmatic one-shot runner |
| [`dsh-logs`](packages/dsh-logs) | Structured log viewer for the dsh host |
| [`dsh-metrics`](packages/dsh-metrics) | Token and latency metrics for the DeepSeek Harness |
| [`dsh-alert`](packages/dsh-alert) | Alerts for dsh sessions |
| [`dsh-health`](packages/dsh-health) | Live health status for dsh installs |
| [`dsh-clean`](packages/dsh-clean) | Safe-clean the dsh home |
| [`dsh-reset`](packages/dsh-reset) | Reset dsh profiles to a known state |
| [`dsh-serve`](packages/dsh-serve) | Serve-mode extras for the dsh web GUI |
| [`dsh-jobs`](packages/dsh-jobs) | Background jobs for dsh bots |

### Security (49)

| Name | Planned first release |
| --- | --- |
| [`dsh-redteam`](packages/dsh-redteam) | Redteam - attack your own house |
| [`dsh-blueteam`](packages/dsh-blueteam) | Blueteam - hold the walls |
| [`dsh-purpleteam`](packages/dsh-purpleteam) | Purpleteam - attack and defend together |
| [`dsh-killchain`](packages/dsh-killchain) | Killchain - the attacker checklist |
| [`dsh-honeypot`](packages/dsh-honeypot) | Honeypot - the trap that looks tasty |
| [`dsh-sinkhole`](packages/dsh-sinkhole) | Sinkhole - where bad traffic dies |
| [`dsh-tarpit`](packages/dsh-tarpit) | Tarpit - slow the attacker down |
| [`dsh-opsec`](packages/dsh-opsec) | Opsec - operational security |
| [`dsh-secrets`](packages/dsh-secrets) | Secrets handling for dsh agents |
| [`dsh-policy`](packages/dsh-policy) | Approval policy engine for the DeepSeek Harness |
| [`dsh-permission`](packages/dsh-permission) | Permission scopes for dsh tools |
| [`dsh-defender`](packages/dsh-defender) | Defender - the standing guard for dsh installs |
| [`dsh-antivirus`](packages/dsh-antivirus) | Antivirus - pattern packs for hostile plugins |
| [`dsh-pentest`](packages/dsh-pentest) | Pentest - break your own harness on purpose |
| [`dsh-leak`](packages/dsh-leak) | Leak - catch secrets before they leave |
| [`dsh-vuln`](packages/dsh-vuln) | Vuln - the advisory feed for the dsh family |
| [`dsh-exploit`](packages/dsh-exploit) | Exploit - the proof-of-concept shelf |
| [`dsh-passkey`](packages/dsh-passkey) | Passkey - WebAuthn sign-in surfaces |
| [`dsh-otp`](packages/dsh-otp) | OTP - one-time codes without the clipboard |
| [`dsh-2fa`](packages/dsh-2fa) | 2FA - second-factor prompts as a tool |
| [`dsh-armor`](packages/dsh-armor) | Armor - hardening presets for profiles |
| [`dsh-lockdown`](packages/dsh-lockdown) | Lockdown - the read-only big red switch |
| [`dsh-bastion`](packages/dsh-bastion) | Bastion - the jump-host profile |
| [`dsh-fortress`](packages/dsh-fortress) | Fortress - the whole wall in one profile |
| [`dsh-plugin-sentinel`](packages/dsh-plugin-sentinel) | Sentinel - the plugin security scanner (real package) |
| [`dsh-plugin-security`](packages/dsh-plugin-security) | Plugin Security - the family umbrella seat |
| [`dsh-plugin-shield`](packages/dsh-plugin-shield) | Shield - block risky tool calls at the guard |
| [`dsh-plugin-firewall`](packages/dsh-plugin-firewall) | Firewall - egress rules for plugins |
| [`dsh-plugin-scanner`](packages/dsh-plugin-scanner) | Scanner - periodic rescan of installed plugins |
| [`dsh-plugin-permission`](packages/dsh-plugin-permission) | Permission - per-plugin capability ledger |
| [`dsh-plugin-recovery`](packages/dsh-plugin-recovery) | Recovery - undo a bad plugin install |
| [`dsh-plugin-defender`](packages/dsh-plugin-defender) | Defender - the plugin-prefixed watch seat |
| [`dsh-plugin-antivirus`](packages/dsh-plugin-antivirus) | Antivirus - the plugin-prefixed AV seat |
| [`dsh-plugin-pentest`](packages/dsh-plugin-pentest) | Pentest - the plugin-prefixed offense seat |
| [`dsh-plugin-leak`](packages/dsh-plugin-leak) | Leak - the plugin-prefixed tripwire seat |
| [`dsh-plugin-vuln`](packages/dsh-plugin-vuln) | Vuln - the plugin-prefixed advisory seat |
| [`dsh-plugin-exploit`](packages/dsh-plugin-exploit) | Exploit - the plugin-prefixed PoC seat |
| [`dsh-plugin-passkey`](packages/dsh-plugin-passkey) | Passkey - the plugin-prefixed WebAuthn seat |
| [`dsh-plugin-otp`](packages/dsh-plugin-otp) | OTP - the plugin-prefixed code seat |
| [`dsh-plugin-2fa`](packages/dsh-plugin-2fa) | 2FA - the plugin-prefixed second-factor seat |
| [`dsh-plugin-armor`](packages/dsh-plugin-armor) | Armor - the plugin-prefixed hardening seat |
| [`dsh-plugin-lockdown`](packages/dsh-plugin-lockdown) | Lockdown - the plugin-prefixed kill switch |
| [`dsh-plugin-bastion`](packages/dsh-plugin-bastion) | Bastion - the plugin-prefixed jump seat |
| [`dsh-plugin-fortress`](packages/dsh-plugin-fortress) | Fortress - the plugin-prefixed hard profile |
| [`dsh-plugin-threat`](packages/dsh-plugin-threat) | Threat - the plugin-prefixed intel seat |
| [`dsh-plugin-watchdog`](packages/dsh-plugin-watchdog) | Watchdog - the plugin-prefixed monitor seat |
| [`dsh-plugin-warden`](packages/dsh-plugin-warden) | Warden - the plugin-prefixed custody seat |
| [`dsh-plugin-harden`](packages/dsh-plugin-harden) | Harden - the plugin-prefixed tightening seat |
| [`dsh-governance`](packages/dsh-governance) | Governance - who let the agent do that |

### Work & hiring (74)

| Name | Planned first release |
| --- | --- |
| [`dsh-hire`](packages/dsh-hire) | work & hiring |
| [`dsh-career`](packages/dsh-career) | work & hiring |
| [`dsh-careers`](packages/dsh-careers) | work & hiring |
| [`dsh-recruiter`](packages/dsh-recruiter) | work & hiring |
| [`dsh-headhunter`](packages/dsh-headhunter) | work & hiring |
| [`dsh-staffing`](packages/dsh-staffing) | work & hiring |
| [`dsh-offer`](packages/dsh-offer) | work & hiring |
| [`dsh-onboarding`](packages/dsh-onboarding) | work & hiring |
| [`dsh-offboarding`](packages/dsh-offboarding) | work & hiring |
| [`dsh-salary`](packages/dsh-salary) | work & hiring |
| [`dsh-compensation`](packages/dsh-compensation) | work & hiring |
| [`dsh-vesting`](packages/dsh-vesting) | work & hiring |
| [`dsh-esop`](packages/dsh-esop) | work & hiring |
| [`dsh-bonus`](packages/dsh-bonus) | work & hiring |
| [`dsh-referral`](packages/dsh-referral) | work & hiring |
| [`dsh-vacancy`](packages/dsh-vacancy) | work & hiring |
| [`dsh-candidate`](packages/dsh-candidate) | work & hiring |
| [`dsh-applicant`](packages/dsh-applicant) | work & hiring |
| [`dsh-coverletter`](packages/dsh-coverletter) | work & hiring |
| [`dsh-jobboard`](packages/dsh-jobboard) | work & hiring |
| [`dsh-wanted`](packages/dsh-wanted) | work & hiring |
| [`dsh-negotiate`](packages/dsh-negotiate) | work & hiring |
| [`dsh-counteroffer`](packages/dsh-counteroffer) | work & hiring |
| [`dsh-resignation`](packages/dsh-resignation) | work & hiring |
| [`dsh-layoffs`](packages/dsh-layoffs) | work & hiring |
| [`dsh-severance`](packages/dsh-severance) | work & hiring |
| [`dsh-freelance`](packages/dsh-freelance) | work & hiring |
| [`dsh-contractor`](packages/dsh-contractor) | work & hiring |
| [`dsh-moonlighting`](packages/dsh-moonlighting) | work & hiring |
| [`dsh-sidehustle`](packages/dsh-sidehustle) | work & hiring |
| [`dsh-digitalnomad`](packages/dsh-digitalnomad) | work & hiring |
| [`dsh-sourcing`](packages/dsh-sourcing) | work & hiring |
| [`dsh-screening`](packages/dsh-screening) | work & hiring |
| [`dsh-shortlist`](packages/dsh-shortlist) | work & hiring |
| [`dsh-takehome`](packages/dsh-takehome) | work & hiring |
| [`dsh-systemdesign`](packages/dsh-systemdesign) | work & hiring |
| [`dsh-ghosting`](packages/dsh-ghosting) | work & hiring |
| [`dsh-probation`](packages/dsh-probation) | work & hiring |
| [`dsh-overtime`](packages/dsh-overtime) | work & hiring |
| [`dsh-glassdoor`](packages/dsh-glassdoor) | work & hiring |
| [`dsh-indeed`](packages/dsh-indeed) | work & hiring |
| [`dsh-workday`](packages/dsh-workday) | work & hiring |
| [`dsh-greenhouse`](packages/dsh-greenhouse) | work & hiring |
| [`dsh-zhaopin`](packages/dsh-zhaopin) | work & hiring |
| [`dsh-qiuzhi`](packages/dsh-qiuzhi) | work & hiring |
| [`dsh-jianli`](packages/dsh-jianli) | work & hiring |
| [`dsh-mianshi`](packages/dsh-mianshi) | work & hiring |
| [`dsh-cizhi`](packages/dsh-cizhi) | work & hiring |
| [`dsh-shezhao`](packages/dsh-shezhao) | work & hiring |
| [`dsh-xiaozhao`](packages/dsh-xiaozhao) | work & hiring |
| [`dsh-neitui`](packages/dsh-neitui) | work & hiring |
| [`dsh-shixi`](packages/dsh-shixi) | work & hiring |
| [`dsh-jianzhi`](packages/dsh-jianzhi) | work & hiring |
| [`dsh-quanzhi`](packages/dsh-quanzhi) | work & hiring |
| [`dsh-rencai`](packages/dsh-rencai) | work & hiring |
| [`dsh-yuangong`](packages/dsh-yuangong) | work & hiring |
| [`dsh-laoban`](packages/dsh-laoban) | work & hiring |
| [`dsh-daiyu`](packages/dsh-daiyu) | work & hiring |
| [`dsh-jiaban`](packages/dsh-jiaban) | work & hiring |
| [`dsh-shiyongqi`](packages/dsh-shiyongqi) | work & hiring |
| [`dsh-nianzhongjiang`](packages/dsh-nianzhongjiang) | work & hiring |
| [`dsh-bianzhi`](packages/dsh-bianzhi) | work & hiring |
| [`dsh-dagong`](packages/dsh-dagong) | work & hiring |
| [`dsh-chaoyou`](packages/dsh-chaoyou) | work & hiring |
| [`dsh-neijuan`](packages/dsh-neijuan) | work & hiring |
| [`dsh-tangping`](packages/dsh-tangping) | work & hiring |
| [`dsh-996`](packages/dsh-996) | work & hiring |
| [`dsh-renshi`](packages/dsh-renshi) | work & hiring |
| [`dsh-007`](packages/dsh-007) | work & hiring |
| [`dsh-hiring`](packages/dsh-hiring) | Hiring workflow for engineering teams |
| [`dsh-job`](packages/dsh-job) | The singular form of the background-jobs runner |
| [`dsh-talent`](packages/dsh-talent) | Talent pool manager |
| [`dsh-jd`](packages/dsh-jd) | Job description library |
| [`dsh-headhunt`](packages/dsh-headhunt) | Headhunter workbench |

### Office (269)

| Name | Planned first release |
| --- | --- |
| [`dsh-workbuddy`](packages/dsh-workbuddy) | WorkBuddy - the office companion |
| [`dsh-plugin-workbuddy`](packages/dsh-plugin-workbuddy) | WorkBuddy plugin twin - the office companion as a bundle |
| [`dsh-officemate`](packages/dsh-officemate) | OfficeMate - the desk-side assistant |
| [`dsh-plugin-officemate`](packages/dsh-plugin-officemate) | OfficeMate plugin twin |
| [`dsh-workmate`](packages/dsh-workmate) | WorkMate - the colleague-shaped assistant |
| [`dsh-plugin-workmate`](packages/dsh-plugin-workmate) | WorkMate plugin twin |
| [`dsh-plugin-workhub`](packages/dsh-plugin-workhub) | WorkHub plugin twin - the office hub, plugin-scoped |
| [`dsh-officedesk`](packages/dsh-officedesk) | OfficeDesk - the office surface |
| [`dsh-plugin-officedesk`](packages/dsh-plugin-officedesk) | OfficeDesk plugin twin |
| [`dsh-workdesk`](packages/dsh-workdesk) | WorkDesk - the personal workbench |
| [`dsh-plugin-workdesk`](packages/dsh-plugin-workdesk) | WorkDesk plugin twin |
| [`dsh-plugin-doc`](packages/dsh-plugin-doc) | Doc plugin twin - the docs seat, plugin-scoped |
| [`dsh-docx`](packages/dsh-docx) | Docx - Word documents |
| [`dsh-plugin-docx`](packages/dsh-plugin-docx) | Docx plugin twin |
| [`dsh-pptx`](packages/dsh-pptx) | Pptx - PowerPoint decks |
| [`dsh-plugin-pptx`](packages/dsh-plugin-pptx) | Pptx plugin twin |
| [`dsh-brief`](packages/dsh-brief) | Brief - one-page briefs |
| [`dsh-plugin-brief`](packages/dsh-plugin-brief) | Brief plugin twin |
| [`dsh-drafts`](packages/dsh-drafts) | Drafts - the drafting table |
| [`dsh-plugin-drafts`](packages/dsh-plugin-drafts) | Drafts plugin twin |
| [`dsh-plugin-draft`](packages/dsh-plugin-draft) | Draft plugin twin - the drafting seat, plugin-scoped |
| [`dsh-prose`](packages/dsh-prose) | Prose - long-form office writing |
| [`dsh-plugin-prose`](packages/dsh-plugin-prose) | Prose plugin twin |
| [`dsh-manuscript`](packages/dsh-manuscript) | Manuscript - outline-first documents |
| [`dsh-plugin-manuscript`](packages/dsh-plugin-manuscript) | Manuscript plugin twin |
| [`dsh-typewriter`](packages/dsh-typewriter) | Typewriter - zero-friction capture |
| [`dsh-plugin-typewriter`](packages/dsh-plugin-typewriter) | Typewriter plugin twin |
| [`dsh-ghostwrite`](packages/dsh-ghostwrite) | Ghostwrite - writing in your voice |
| [`dsh-plugin-ghostwrite`](packages/dsh-plugin-ghostwrite) | Ghostwrite plugin twin |
| [`dsh-sheet`](packages/dsh-sheet) | Sheet - spreadsheets |
| [`dsh-plugin-sheet`](packages/dsh-plugin-sheet) | Sheet plugin twin |
| [`dsh-spreadsheet`](packages/dsh-spreadsheet) | Spreadsheet - formula-first tables |
| [`dsh-plugin-spreadsheet`](packages/dsh-plugin-spreadsheet) | Spreadsheet plugin twin |
| [`dsh-spreadsheets`](packages/dsh-spreadsheets) | Spreadsheets - the workbook shelf |
| [`dsh-plugin-spreadsheets`](packages/dsh-plugin-spreadsheets) | Spreadsheets plugin twin |
| [`dsh-cells`](packages/dsh-cells) | Cells - cell-level table access |
| [`dsh-plugin-cells`](packages/dsh-plugin-cells) | Cells plugin twin |
| [`dsh-plugin-grid`](packages/dsh-plugin-grid) | Grid plugin twin - the data grid seat, plugin-scoped |
| [`dsh-pivot`](packages/dsh-pivot) | Pivot - pivot tables |
| [`dsh-plugin-pivot`](packages/dsh-plugin-pivot) | Pivot plugin twin |
| [`dsh-plugin-ledger`](packages/dsh-plugin-ledger) | Ledger plugin twin - the ledger seat, plugin-scoped |
| [`dsh-deck`](packages/dsh-deck) | Deck - slide decks |
| [`dsh-plugin-deck`](packages/dsh-plugin-deck) | Deck plugin twin |
| [`dsh-keynote`](packages/dsh-keynote) | Keynote - keynote decks |
| [`dsh-plugin-keynote`](packages/dsh-plugin-keynote) | Keynote plugin twin |
| [`dsh-lectern`](packages/dsh-lectern) | Lectern - presentation delivery |
| [`dsh-plugin-lectern`](packages/dsh-plugin-lectern) | Lectern plugin twin |
| [`dsh-podium`](packages/dsh-podium) | Podium - talk preparation |
| [`dsh-plugin-podium`](packages/dsh-plugin-podium) | Podium plugin twin |
| [`dsh-plugin-slide`](packages/dsh-plugin-slide) | Slide plugin twin |
| [`dsh-plugin-slides`](packages/dsh-plugin-slides) | Slides plugin twin |
| [`dsh-contacts`](packages/dsh-contacts) | Contacts - the office directory |
| [`dsh-plugin-contacts`](packages/dsh-plugin-contacts) | Contacts plugin twin |
| [`dsh-conference`](packages/dsh-conference) | Conference - meetings end to end |
| [`dsh-plugin-conference`](packages/dsh-plugin-conference) | Conference plugin twin |
| [`dsh-plugin-webinar`](packages/dsh-plugin-webinar) | Webinar plugin twin |
| [`dsh-voicemail`](packages/dsh-voicemail) | Voicemail - async voice notes |
| [`dsh-plugin-voicemail`](packages/dsh-plugin-voicemail) | Voicemail plugin twin |
| [`dsh-fax`](packages/dsh-fax) | Fax - the legacy lane |
| [`dsh-plugin-fax`](packages/dsh-plugin-fax) | Fax plugin twin |
| [`dsh-outbox`](packages/dsh-outbox) | Outbox - outgoing mail |
| [`dsh-plugin-outbox`](packages/dsh-plugin-outbox) | Outbox plugin twin |
| [`dsh-plugin-mail`](packages/dsh-plugin-mail) | Mail plugin twin |
| [`dsh-plugin-email`](packages/dsh-plugin-email) | Email plugin twin |
| [`dsh-plugin-meeting`](packages/dsh-plugin-meeting) | Meeting plugin twin |
| [`dsh-plugin-inbox`](packages/dsh-plugin-inbox) | Inbox plugin twin |
| [`dsh-plugin-chat`](packages/dsh-plugin-chat) | Chat plugin twin |
| [`dsh-plugin-sprint`](packages/dsh-plugin-sprint) | Sprint plugin twin |
| [`dsh-plugin-timesheet`](packages/dsh-plugin-timesheet) | Timesheet plugin twin |
| [`dsh-plugin-attendance`](packages/dsh-plugin-attendance) | Attendance plugin twin |
| [`dsh-plugin-approval`](packages/dsh-plugin-approval) | Approval plugin twin |
| [`dsh-roster`](packages/dsh-roster) | Roster - duty rosters |
| [`dsh-plugin-roster`](packages/dsh-plugin-roster) | Roster plugin twin |
| [`dsh-shift`](packages/dsh-shift) | Shift - shift handover |
| [`dsh-plugin-shift`](packages/dsh-plugin-shift) | Shift plugin twin |
| [`dsh-plugin-standup`](packages/dsh-plugin-standup) | Standup plugin twin |
| [`dsh-plugin-retro`](packages/dsh-plugin-retro) | Retro plugin twin |
| [`dsh-plugin-milestone`](packages/dsh-plugin-milestone) | Milestone plugin twin |
| [`dsh-plugin-roadmap`](packages/dsh-plugin-roadmap) | Roadmap plugin twin |
| [`dsh-plugin-gantt`](packages/dsh-plugin-gantt) | Gantt plugin twin |
| [`dsh-plugin-backlog`](packages/dsh-plugin-backlog) | Backlog plugin twin |
| [`dsh-manual`](packages/dsh-manual) | Manual - product manuals |
| [`dsh-plugin-manual`](packages/dsh-plugin-manual) | Manual plugin twin |
| [`dsh-handbook`](packages/dsh-handbook) | Handbook - the company handbook |
| [`dsh-plugin-handbook`](packages/dsh-plugin-handbook) | Handbook plugin twin |
| [`dsh-plugin-playbook`](packages/dsh-plugin-playbook) | Playbook plugin twin |
| [`dsh-glossary`](packages/dsh-glossary) | Glossary - shared terminology |
| [`dsh-plugin-glossary`](packages/dsh-plugin-glossary) | Glossary plugin twin |
| [`dsh-faq`](packages/dsh-faq) | Faq - living FAQs |
| [`dsh-plugin-faq`](packages/dsh-plugin-faq) | Faq plugin twin |
| [`dsh-plugin-sop`](packages/dsh-plugin-sop) | Sop plugin twin |
| [`dsh-room`](packages/dsh-room) | Room - meeting rooms |
| [`dsh-plugin-room`](packages/dsh-plugin-room) | Room plugin twin |
| [`dsh-desk`](packages/dsh-desk) | Desk - hot-desking |
| [`dsh-plugin-desk`](packages/dsh-plugin-desk) | Desk plugin twin |
| [`dsh-printer`](packages/dsh-printer) | Printer - the print lane |
| [`dsh-plugin-printer`](packages/dsh-plugin-printer) | Printer plugin twin |
| [`dsh-clip`](packages/dsh-clip) | Clip - the shared clipboard |
| [`dsh-plugin-clip`](packages/dsh-plugin-clip) | Clip plugin twin |
| [`dsh-plugin-archive`](packages/dsh-plugin-archive) | Archive plugin twin |
| [`dsh-filer`](packages/dsh-filer) | Filer - document filing |
| [`dsh-plugin-filer`](packages/dsh-plugin-filer) | Filer plugin twin |
| [`dsh-folder`](packages/dsh-folder) | Folder - folder guard |
| [`dsh-plugin-folder`](packages/dsh-plugin-folder) | Folder plugin twin |
| [`dsh-cabinet`](packages/dsh-cabinet) | Cabinet - the long-term archive |
| [`dsh-plugin-cabinet`](packages/dsh-plugin-cabinet) | Cabinet plugin twin |
| [`dsh-stapler`](packages/dsh-stapler) | Stapler - document bundles |
| [`dsh-plugin-stapler`](packages/dsh-plugin-stapler) | Stapler plugin twin |
| [`dsh-envelope`](packages/dsh-envelope) | Envelope - document dispatch |
| [`dsh-plugin-envelope`](packages/dsh-plugin-envelope) | Envelope plugin twin |
| [`dsh-plugin-word`](packages/dsh-plugin-word) | Word plugin twin - completing the pair |
| [`dsh-plugin-docs`](packages/dsh-plugin-docs) | Docs plugin twin - completing the pair |
| [`dsh-plugin-task`](packages/dsh-plugin-task) | Task plugin twin - completing the pair |
| [`dsh-plugin-tasks`](packages/dsh-plugin-tasks) | Tasks plugin twin - completing the pair |
| [`dsh-plugin-workflow`](packages/dsh-plugin-workflow) | Workflow plugin twin - completing the pair |
| [`dsh-plugin-workflows`](packages/dsh-plugin-workflows) | Workflows plugin twin - completing the pair |
| [`dsh-plugin-crm`](packages/dsh-plugin-crm) | Crm plugin twin - completing the pair |
| [`dsh-plugin-erp`](packages/dsh-plugin-erp) | Erp plugin twin - completing the pair |
| [`dsh-plugin-hr`](packages/dsh-plugin-hr) | Hr plugin twin - completing the pair |
| [`dsh-plugin-invoice`](packages/dsh-plugin-invoice) | Invoice plugin twin - completing the pair |
| [`dsh-plugin-contract`](packages/dsh-plugin-contract) | Contract plugin twin - completing the pair |
| [`dsh-plugin-ocr`](packages/dsh-plugin-ocr) | Ocr plugin twin - completing the pair |
| [`dsh-plugin-paper`](packages/dsh-plugin-paper) | Paper plugin twin - completing the pair |
| [`dsh-plugin-drive`](packages/dsh-plugin-drive) | Drive plugin twin - completing the pair |
| [`dsh-plugin-print`](packages/dsh-plugin-print) | Print plugin twin - completing the pair |
| [`dsh-plugin-planner`](packages/dsh-plugin-planner) | Planner plugin twin - completing the pair |
| [`dsh-plugin-notebook`](packages/dsh-plugin-notebook) | Notebook plugin twin - completing the pair |
| [`dsh-plugin-resignation`](packages/dsh-plugin-resignation) | Resignation plugin twin - completing the pair |
| [`dsh-plugin-onboarding`](packages/dsh-plugin-onboarding) | Onboarding plugin twin - completing the pair |
| [`dsh-plugin-offboarding`](packages/dsh-plugin-offboarding) | Offboarding plugin twin - completing the pair |
| [`dsh-plugin-workday`](packages/dsh-plugin-workday) | Workday plugin twin - completing the pair |
| [`dsh-plugin-coworker`](packages/dsh-plugin-coworker) | Coworker plugin twin - completing the pair |
| [`dsh-plugin-payroll`](packages/dsh-plugin-payroll) | Payroll plugin twin - completing the pair |
| [`dsh-expenses`](packages/dsh-expenses) | Expenses - expense claims |
| [`dsh-plugin-expenses`](packages/dsh-plugin-expenses) | Expenses plugin twin |
| [`dsh-meeting-notes`](packages/dsh-meeting-notes) | MeetingNotes - minutes that file themselves |
| [`dsh-plugin-meeting-notes`](packages/dsh-plugin-meeting-notes) | MeetingNotes plugin twin |
| [`dsh-plugin-calendar`](packages/dsh-plugin-calendar) | Calendar plugin twin - the calendar seat, plugin-scoped |
| [`dsh-plugin-pdf`](packages/dsh-plugin-pdf) | Pdf plugin twin - the pdf seat, plugin-scoped |
| [`dsh-plugin-excel`](packages/dsh-plugin-excel) | Excel plugin twin - the excel seat, plugin-scoped |
| [`dsh-plugin-xlsx`](packages/dsh-plugin-xlsx) | Xlsx plugin twin - the xlsx seat, plugin-scoped |
| [`dsh-plugin-wiki`](packages/dsh-plugin-wiki) | Wiki plugin twin - the wiki seat, plugin-scoped |
| [`dsh-plugin-kanban`](packages/dsh-plugin-kanban) | Kanban plugin twin - the kanban seat, plugin-scoped |
| [`dsh-plugin-mindmap`](packages/dsh-plugin-mindmap) | Mindmap plugin twin - the mindmap seat, plugin-scoped |
| [`dsh-plugin-agenda`](packages/dsh-plugin-agenda) | Agenda plugin twin - the agenda seat, plugin-scoped |
| [`dsh-plugin-minutes`](packages/dsh-plugin-minutes) | Minutes plugin twin - the minutes seat, plugin-scoped |
| [`dsh-plugin-survey`](packages/dsh-plugin-survey) | Survey plugin twin - the survey seat, plugin-scoped |
| [`dsh-plugin-document`](packages/dsh-plugin-document) | Document plugin twin - the document seat, plugin-scoped |
| [`dsh-plugin-sign`](packages/dsh-plugin-sign) | Sign plugin twin - the sign seat, plugin-scoped |
| [`dsh-plugin-newsletter`](packages/dsh-plugin-newsletter) | Newsletter plugin twin - completing the pair |
| [`dsh-plugin-holiday`](packages/dsh-plugin-holiday) | Holiday plugin twin - completing the pair |
| [`dsh-calendars`](packages/dsh-calendars) | Calendars - the calendar collection |
| [`dsh-plugin-calendars`](packages/dsh-plugin-calendars) | Calendars plugin twin |
| [`dsh-quarter`](packages/dsh-quarter) | Quarter - the quarterly rhythm |
| [`dsh-plugin-quarter`](packages/dsh-plugin-quarter) | Quarter plugin twin |
| [`dsh-weekly`](packages/dsh-weekly) | Weekly - the weekly ritual |
| [`dsh-plugin-weekly`](packages/dsh-plugin-weekly) | Weekly plugin twin |
| [`dsh-daily`](packages/dsh-daily) | Daily - the daily brief |
| [`dsh-plugin-daily`](packages/dsh-plugin-daily) | Daily plugin twin |
| [`dsh-monthly`](packages/dsh-monthly) | Monthly - the monthly close |
| [`dsh-plugin-monthly`](packages/dsh-plugin-monthly) | Monthly plugin twin |
| [`dsh-vacation`](packages/dsh-vacation) | Vacation - out-of-office planning |
| [`dsh-plugin-vacation`](packages/dsh-plugin-vacation) | Vacation plugin twin |
| [`dsh-pto`](packages/dsh-pto) | Pto - paid time off |
| [`dsh-plugin-pto`](packages/dsh-plugin-pto) | Pto plugin twin |
| [`dsh-plugin-leave`](packages/dsh-plugin-leave) | Leave plugin twin - the leave seat, plugin-scoped |
| [`dsh-mailer`](packages/dsh-mailer) | Mailer - outbound campaigns |
| [`dsh-plugin-mailer`](packages/dsh-plugin-mailer) | Mailer plugin twin |
| [`dsh-mails`](packages/dsh-mails) | Mails - the mail shelf |
| [`dsh-plugin-mails`](packages/dsh-plugin-mails) | Mails plugin twin |
| [`dsh-letter`](packages/dsh-letter) | Letter - formal letters |
| [`dsh-plugin-letter`](packages/dsh-plugin-letter) | Letter plugin twin |
| [`dsh-letters`](packages/dsh-letters) | Letters - correspondence archive |
| [`dsh-plugin-letters`](packages/dsh-plugin-letters) | Letters plugin twin |
| [`dsh-correspondence`](packages/dsh-correspondence) | Correspondence - the correspondence desk |
| [`dsh-plugin-correspondence`](packages/dsh-plugin-correspondence) | Correspondence plugin twin |
| [`dsh-mailroom`](packages/dsh-mailroom) | Mailroom - incoming mail triage |
| [`dsh-plugin-mailroom`](packages/dsh-plugin-mailroom) | Mailroom plugin twin |
| [`dsh-meetings`](packages/dsh-meetings) | Meetings - the meetings shelf |
| [`dsh-plugin-meetings`](packages/dsh-plugin-meetings) | Meetings plugin twin |
| [`dsh-huddle`](packages/dsh-huddle) | Huddle - quick syncs |
| [`dsh-plugin-huddle`](packages/dsh-plugin-huddle) | Huddle plugin twin |
| [`dsh-allhands`](packages/dsh-allhands) | Allhands - all-hands |
| [`dsh-plugin-allhands`](packages/dsh-plugin-allhands) | Allhands plugin twin |
| [`dsh-oneonone`](packages/dsh-oneonone) | OneOnOne - one-on-ones |
| [`dsh-plugin-oneonone`](packages/dsh-plugin-oneonone) | Oneonone plugin twin |
| [`dsh-call`](packages/dsh-call) | Call - voice calls |
| [`dsh-plugin-call`](packages/dsh-plugin-call) | Call plugin twin |
| [`dsh-calls`](packages/dsh-calls) | Calls - the call log |
| [`dsh-plugin-calls`](packages/dsh-plugin-calls) | Calls plugin twin |
| [`dsh-pdfs`](packages/dsh-pdfs) | Pdfs - the pdf workbench |
| [`dsh-plugin-pdfs`](packages/dsh-plugin-pdfs) | Pdfs plugin twin |
| [`dsh-digitize`](packages/dsh-digitize) | Digitize - paper to data |
| [`dsh-plugin-digitize`](packages/dsh-plugin-digitize) | Digitize plugin twin |
| [`dsh-scans`](packages/dsh-scans) | Scans - the scan inbox |
| [`dsh-plugin-scans`](packages/dsh-plugin-scans) | Scans plugin twin |
| [`dsh-paperless`](packages/dsh-paperless) | Paperless - the paperless office |
| [`dsh-plugin-paperless`](packages/dsh-plugin-paperless) | Paperless plugin twin |
| [`dsh-formula`](packages/dsh-formula) | Formula - formula help |
| [`dsh-plugin-formula`](packages/dsh-plugin-formula) | Formula plugin twin |
| [`dsh-formulas`](packages/dsh-formulas) | Formulas - formula library |
| [`dsh-plugin-formulas`](packages/dsh-plugin-formulas) | Formulas plugin twin |
| [`dsh-workbook`](packages/dsh-workbook) | Workbook - one workbook |
| [`dsh-plugin-workbook`](packages/dsh-plugin-workbook) | Workbook plugin twin |
| [`dsh-workbooks`](packages/dsh-workbooks) | Workbooks - the workbook shelf |
| [`dsh-plugin-workbooks`](packages/dsh-plugin-workbooks) | Workbooks plugin twin |
| [`dsh-cell`](packages/dsh-cell) | Cell - single-cell access |
| [`dsh-plugin-cell`](packages/dsh-plugin-cell) | Cell plugin twin |
| [`dsh-wikis`](packages/dsh-wikis) | Wikis - the wiki shelf |
| [`dsh-plugin-wikis`](packages/dsh-plugin-wikis) | Wikis plugin twin |
| [`dsh-knowledgehub`](packages/dsh-knowledgehub) | Knowledgehub - the KB |
| [`dsh-plugin-knowledgehub`](packages/dsh-plugin-knowledgehub) | Knowledgehub plugin twin |
| [`dsh-intranet`](packages/dsh-intranet) | Intranet - the company front page |
| [`dsh-plugin-intranet`](packages/dsh-plugin-intranet) | Intranet plugin twin |
| [`dsh-plugin-portal`](packages/dsh-plugin-portal) | Portal plugin twin - the portal seat, plugin-scoped |
| [`dsh-kanbans`](packages/dsh-kanbans) | Kanbans - the board collection |
| [`dsh-plugin-kanbans`](packages/dsh-plugin-kanbans) | Kanbans plugin twin |
| [`dsh-boards`](packages/dsh-boards) | Boards - board views |
| [`dsh-plugin-boards`](packages/dsh-plugin-boards) | Boards plugin twin |
| [`dsh-card`](packages/dsh-card) | Card - the card |
| [`dsh-plugin-card`](packages/dsh-plugin-card) | Card plugin twin |
| [`dsh-swimlane`](packages/dsh-swimlane) | Swimlane - swimlanes |
| [`dsh-plugin-swimlane`](packages/dsh-plugin-swimlane) | Swimlane plugin twin |
| [`dsh-swimlanes`](packages/dsh-swimlanes) | Swimlanes - lane discipline |
| [`dsh-plugin-swimlanes`](packages/dsh-plugin-swimlanes) | Swimlanes plugin twin |
| [`dsh-plugin-board`](packages/dsh-plugin-board) | Board plugin twin - the board seat, plugin-scoped |
| [`dsh-mindmaps`](packages/dsh-mindmaps) | Mindmaps - the map shelf |
| [`dsh-plugin-mindmaps`](packages/dsh-plugin-mindmaps) | Mindmaps plugin twin |
| [`dsh-mindmapper`](packages/dsh-mindmapper) | Mindmapper - mapping engine |
| [`dsh-plugin-mindmapper`](packages/dsh-plugin-mindmapper) | Mindmapper plugin twin |
| [`dsh-brainstorm`](packages/dsh-brainstorm) | Brainstorm - ideation |
| [`dsh-plugin-brainstorm`](packages/dsh-plugin-brainstorm) | Brainstorm plugin twin |
| [`dsh-ideate`](packages/dsh-ideate) | Ideate - the idea pipeline |
| [`dsh-plugin-ideate`](packages/dsh-plugin-ideate) | Ideate plugin twin |
| [`dsh-idea`](packages/dsh-idea) | Idea - one idea |
| [`dsh-plugin-idea`](packages/dsh-plugin-idea) | Idea plugin twin |
| [`dsh-ideas`](packages/dsh-ideas) | Ideas - the idea backlog |
| [`dsh-plugin-ideas`](packages/dsh-plugin-ideas) | Ideas plugin twin |
| [`dsh-summary`](packages/dsh-summary) | Summary - summarization |
| [`dsh-plugin-summary`](packages/dsh-plugin-summary) | Summary plugin twin |
| [`dsh-digest`](packages/dsh-digest) | Digest - digests on schedule |
| [`dsh-plugin-digest`](packages/dsh-plugin-digest) | Digest plugin twin |
| [`dsh-bulletin`](packages/dsh-bulletin) | Bulletin - internal bulletins |
| [`dsh-plugin-bulletin`](packages/dsh-plugin-bulletin) | Bulletin plugin twin |
| [`dsh-courier`](packages/dsh-courier) | Courier - internal delivery |
| [`dsh-plugin-courier`](packages/dsh-plugin-courier) | Courier plugin twin |
| [`dsh-plugin-dispatch`](packages/dsh-plugin-dispatch) | Dispatch plugin twin - the dispatch seat, plugin-scoped |
| [`dsh-appointment`](packages/dsh-appointment) | Appointment - appointments |
| [`dsh-plugin-appointment`](packages/dsh-plugin-appointment) | Appointment plugin twin |
| [`dsh-followup`](packages/dsh-followup) | Followup - follow-ups |
| [`dsh-plugin-followup`](packages/dsh-plugin-followup) | Followup plugin twin |
| [`dsh-followups`](packages/dsh-followups) | Followups - the follow-up queue |
| [`dsh-plugin-followups`](packages/dsh-plugin-followups) | Followups plugin twin |
| [`dsh-checkin`](packages/dsh-checkin) | Checkin - check-ins |
| [`dsh-plugin-checkin`](packages/dsh-plugin-checkin) | Checkin plugin twin |
| [`dsh-checkins`](packages/dsh-checkins) | Checkins - the check-in cadence |
| [`dsh-plugin-checkins`](packages/dsh-plugin-checkins) | Checkins plugin twin |
| [`dsh-offsite`](packages/dsh-offsite) | Offsite - offsites |
| [`dsh-plugin-offsite`](packages/dsh-plugin-offsite) | Offsite plugin twin |
| [`dsh-townhall`](packages/dsh-townhall) | Townhall - town halls |
| [`dsh-plugin-townhall`](packages/dsh-plugin-townhall) | Townhall plugin twin |
| [`dsh-watercooler`](packages/dsh-watercooler) | Watercooler - the casual lane |
| [`dsh-plugin-watercooler`](packages/dsh-plugin-watercooler) | Watercooler plugin twin |
| [`dsh-plugin-booking`](packages/dsh-plugin-booking) | Booking plugin twin - the booking seat, plugin-scoped |
| [`dsh-plugin-scheduler`](packages/dsh-plugin-scheduler) | Scheduler plugin twin - the scheduler seat, plugin-scoped |
| [`dsh-plugin-reminder`](packages/dsh-plugin-reminder) | Reminder plugin twin - the reminder seat, plugin-scoped |
| [`dsh-plugin-reminders`](packages/dsh-plugin-reminders) | Reminders plugin twin - the reminders seat, plugin-scoped |
| [`dsh-plugin-handoff`](packages/dsh-plugin-handoff) | Handoff plugin twin - the handoff seat, plugin-scoped |
| [`dsh-plugin-delegation`](packages/dsh-plugin-delegation) | Delegation plugin twin - the delegation seat, plugin-scoped |

### Trading (309)

| Name | Planned first release |
| --- | --- |
| [`dsh-tradingdesk`](packages/dsh-tradingdesk) | TradingDesk - the trading workbench |
| [`dsh-tradebuddy`](packages/dsh-tradebuddy) | TradeBuddy - the trading companion |
| [`dsh-trademate`](packages/dsh-trademate) | TradeMate - the desk-side mate |
| [`dsh-tradehub`](packages/dsh-tradehub) | TradeHub - the trading hub |
| [`dsh-controlroom`](packages/dsh-controlroom) | ControlRoom - the trading control room |
| [`dsh-stockchart`](packages/dsh-stockchart) | Stockchart - stock charts |
| [`dsh-marketdata`](packages/dsh-marketdata) | Marketdata - the market data plane |
| [`dsh-plugin-tradingdesk`](packages/dsh-plugin-tradingdesk) | Tradingdesk plugin twin |
| [`dsh-plugin-tradebuddy`](packages/dsh-plugin-tradebuddy) | Tradebuddy plugin twin |
| [`dsh-plugin-trademate`](packages/dsh-plugin-trademate) | Trademate plugin twin |
| [`dsh-plugin-tradehub`](packages/dsh-plugin-tradehub) | Tradehub plugin twin |
| [`dsh-plugin-controlroom`](packages/dsh-plugin-controlroom) | Controlroom plugin twin |
| [`dsh-plugin-workstation`](packages/dsh-plugin-workstation) | Workstation plugin twin - the workstation seat, plugin-scoped |
| [`dsh-plugin-cockpit`](packages/dsh-plugin-cockpit) | Cockpit plugin twin - the cockpit seat, plugin-scoped |
| [`dsh-trade`](packages/dsh-trade) | Trade - one trade |
| [`dsh-trades`](packages/dsh-trades) | Trades - the trade log |
| [`dsh-trader`](packages/dsh-trader) | Trader - the trader profile |
| [`dsh-tradejournal`](packages/dsh-tradejournal) | TradeJournal - the trade journal |
| [`dsh-tradelog`](packages/dsh-tradelog) | Tradelog - the structured log |
| [`dsh-tradeplan`](packages/dsh-tradeplan) | TradePlan - the plan for the day |
| [`dsh-tradebook`](packages/dsh-tradebook) | TradeBook - the trade book |
| [`dsh-plugin-trade`](packages/dsh-plugin-trade) | Trade plugin twin |
| [`dsh-plugin-trades`](packages/dsh-plugin-trades) | Trades plugin twin |
| [`dsh-plugin-trader`](packages/dsh-plugin-trader) | Trader plugin twin |
| [`dsh-plugin-tradebook`](packages/dsh-plugin-tradebook) | Tradebook plugin twin |
| [`dsh-plugin-trading`](packages/dsh-plugin-trading) | Trading plugin twin - completing the pair |
| [`dsh-plugin-tradejournal`](packages/dsh-plugin-tradejournal) | Tradejournal plugin twin |
| [`dsh-plugin-tradelog`](packages/dsh-plugin-tradelog) | Tradelog plugin twin |
| [`dsh-plugin-tradeplan`](packages/dsh-plugin-tradeplan) | Tradeplan plugin twin |
| [`dsh-order`](packages/dsh-order) | Order - one order |
| [`dsh-orders`](packages/dsh-orders) | Orders - the order flow |
| [`dsh-ordering`](packages/dsh-ordering) | Ordering - order management |
| [`dsh-blotter`](packages/dsh-blotter) | Blotter - the blotter |
| [`dsh-executions`](packages/dsh-executions) | Executions - the execution record |
| [`dsh-fill`](packages/dsh-fill) | Fill - one fill |
| [`dsh-fills`](packages/dsh-fills) | Fills - the fill stream |
| [`dsh-fillrate`](packages/dsh-fillrate) | Fillrate - execution quality |
| [`dsh-ladder`](packages/dsh-ladder) | Ladder - the price ladder |
| [`dsh-plugin-orderbook`](packages/dsh-plugin-orderbook) | Orderbook plugin twin - completing the pair |
| [`dsh-plugin-ordering`](packages/dsh-plugin-ordering) | Ordering plugin twin |
| [`dsh-plugin-executions`](packages/dsh-plugin-executions) | Executions plugin twin |
| [`dsh-plugin-fillrate`](packages/dsh-plugin-fillrate) | Fillrate plugin twin |
| [`dsh-plugin-execution`](packages/dsh-plugin-execution) | Execution plugin twin - the execution seat, plugin-scoped |
| [`dsh-plugin-order`](packages/dsh-plugin-order) | Order plugin twin |
| [`dsh-plugin-orders`](packages/dsh-plugin-orders) | Orders plugin twin |
| [`dsh-plugin-blotter`](packages/dsh-plugin-blotter) | Blotter plugin twin |
| [`dsh-plugin-fill`](packages/dsh-plugin-fill) | Fill plugin twin |
| [`dsh-plugin-fills`](packages/dsh-plugin-fills) | Fills plugin twin |
| [`dsh-plugin-ladder`](packages/dsh-plugin-ladder) | Ladder plugin twin |
| [`dsh-plugin-tape`](packages/dsh-plugin-tape) | Tape plugin twin - the tape seat, plugin-scoped |
| [`dsh-plugin-slippage`](packages/dsh-plugin-slippage) | Slippage plugin twin - the slippage seat, plugin-scoped |
| [`dsh-quotes`](packages/dsh-quotes) | Quotes - the quote board |
| [`dsh-quotation`](packages/dsh-quotation) | Quotation - quote snapshots |
| [`dsh-ticks`](packages/dsh-ticks) | Ticks - the tick stream |
| [`dsh-tickdata`](packages/dsh-tickdata) | Tickdata - tick storage |
| [`dsh-level2`](packages/dsh-level2) | Level2 - depth of book |
| [`dsh-spread`](packages/dsh-spread) | Spread - the spread |
| [`dsh-spreads`](packages/dsh-spreads) | Spreads - spread trading |
| [`dsh-depth`](packages/dsh-depth) | Depth - market depth |
| [`dsh-plugin-quotation`](packages/dsh-plugin-quotation) | Quotation plugin twin |
| [`dsh-plugin-ticks`](packages/dsh-plugin-ticks) | Ticks plugin twin |
| [`dsh-plugin-quote`](packages/dsh-plugin-quote) | Quote plugin twin - the quote seat, plugin-scoped |
| [`dsh-plugin-quotes`](packages/dsh-plugin-quotes) | Quotes plugin twin |
| [`dsh-plugin-tick`](packages/dsh-plugin-tick) | Tick plugin twin - the tick seat, plugin-scoped |
| [`dsh-plugin-tickdata`](packages/dsh-plugin-tickdata) | Tickdata plugin twin |
| [`dsh-plugin-level2`](packages/dsh-plugin-level2) | Level2 plugin twin |
| [`dsh-plugin-spread`](packages/dsh-plugin-spread) | Spread plugin twin |
| [`dsh-plugin-spreads`](packages/dsh-plugin-spreads) | Spreads plugin twin |
| [`dsh-plugin-depth`](packages/dsh-plugin-depth) | Depth plugin twin |
| [`dsh-plugin-liquidity`](packages/dsh-plugin-liquidity) | Liquidity plugin twin - the liquidity seat, plugin-scoped |
| [`dsh-plugin-marketdata`](packages/dsh-plugin-marketdata) | Marketdata plugin twin |
| [`dsh-charts`](packages/dsh-charts) | Charts - the chart desk |
| [`dsh-charting`](packages/dsh-charting) | Charting - the charting engine |
| [`dsh-candle`](packages/dsh-candle) | Candle - one candle |
| [`dsh-candles`](packages/dsh-candles) | Candles - candlestick data |
| [`dsh-candlestick`](packages/dsh-candlestick) | Candlestick - pattern reading |
| [`dsh-candlesticks`](packages/dsh-candlesticks) | Candlesticks - the candle library |
| [`dsh-patternbook`](packages/dsh-patternbook) | Patternbook - the pattern book |
| [`dsh-plugin-patternbook`](packages/dsh-plugin-patternbook) | Patternbook plugin twin |
| [`dsh-patterns`](packages/dsh-patterns) | Patterns - the pattern scanner |
| [`dsh-indicator`](packages/dsh-indicator) | Indicator - one indicator |
| [`dsh-indicators`](packages/dsh-indicators) | Indicators - the indicator shelf |
| [`dsh-overlay`](packages/dsh-overlay) | Overlay - chart overlays |
| [`dsh-plugin-candlesticks`](packages/dsh-plugin-candlesticks) | Candlesticks plugin twin |
| [`dsh-plugin-chart`](packages/dsh-plugin-chart) | Chart plugin twin - the chart seat, plugin-scoped |
| [`dsh-plugin-charts`](packages/dsh-plugin-charts) | Charts plugin twin |
| [`dsh-plugin-charting`](packages/dsh-plugin-charting) | Charting plugin twin |
| [`dsh-plugin-candle`](packages/dsh-plugin-candle) | Candle plugin twin |
| [`dsh-plugin-candles`](packages/dsh-plugin-candles) | Candles plugin twin |
| [`dsh-plugin-candlestick`](packages/dsh-plugin-candlestick) | Candlestick plugin twin |
| [`dsh-plugin-pattern`](packages/dsh-plugin-pattern) | Pattern plugin twin - the pattern seat, plugin-scoped |
| [`dsh-plugin-patterns`](packages/dsh-plugin-patterns) | Patterns plugin twin |
| [`dsh-plugin-indicator`](packages/dsh-plugin-indicator) | Indicator plugin twin |
| [`dsh-plugin-indicators`](packages/dsh-plugin-indicators) | Indicators plugin twin |
| [`dsh-plugin-overlay`](packages/dsh-plugin-overlay) | Overlay plugin twin |
| [`dsh-plugin-stockchart`](packages/dsh-plugin-stockchart) | Stockchart plugin twin |
| [`dsh-plugin-depthchart`](packages/dsh-plugin-depthchart) | Depthchart plugin twin - completing the pair |
| [`dsh-watchlist`](packages/dsh-watchlist) | Watchlist - one watchlist |
| [`dsh-watchlists`](packages/dsh-watchlists) | Watchlists - the watchlist shelf |
| [`dsh-watching`](packages/dsh-watching) | Watching - the market watch |
| [`dsh-plugin-watching`](packages/dsh-plugin-watching) | Watching plugin twin |
| [`dsh-screener`](packages/dsh-screener) | Screener - one screener |
| [`dsh-screeners`](packages/dsh-screeners) | Screeners - the screener farm |
| [`dsh-watchtower`](packages/dsh-watchtower) | Watchtower - the standing watch |
| [`dsh-plugin-watch`](packages/dsh-plugin-watch) | Watch plugin twin - the watch seat, plugin-scoped |
| [`dsh-plugin-watchlist`](packages/dsh-plugin-watchlist) | Watchlist plugin twin |
| [`dsh-plugin-watchlists`](packages/dsh-plugin-watchlists) | Watchlists plugin twin |
| [`dsh-plugin-screener`](packages/dsh-plugin-screener) | Screener plugin twin |
| [`dsh-plugin-screeners`](packages/dsh-plugin-screeners) | Screeners plugin twin |
| [`dsh-plugin-shortlist`](packages/dsh-plugin-shortlist) | Shortlist plugin twin - the shortlist seat, plugin-scoped |
| [`dsh-plugin-watchtower`](packages/dsh-plugin-watchtower) | Watchtower plugin twin |
| [`dsh-strategy`](packages/dsh-strategy) | Strategy - one strategy |
| [`dsh-strategies`](packages/dsh-strategies) | Strategies - the strategy shelf |
| [`dsh-signals`](packages/dsh-signals) | Signals - the signal feed |
| [`dsh-alerts`](packages/dsh-alerts) | Alerts - trading alerts |
| [`dsh-setup`](packages/dsh-setup) | Setup - one setup |
| [`dsh-setups`](packages/dsh-setups) | Setups - the setup library |
| [`dsh-theses`](packages/dsh-theses) | Theses - the thesis book |
| [`dsh-conviction`](packages/dsh-conviction) | Conviction - position conviction |
| [`dsh-alphas`](packages/dsh-alphas) | Alphas - the alpha shelf |
| [`dsh-plugin-strategy`](packages/dsh-plugin-strategy) | Strategy plugin twin |
| [`dsh-plugin-strategies`](packages/dsh-plugin-strategies) | Strategies plugin twin |
| [`dsh-plugin-signal`](packages/dsh-plugin-signal) | Signal plugin twin - the signal seat, plugin-scoped |
| [`dsh-plugin-signals`](packages/dsh-plugin-signals) | Signals plugin twin |
| [`dsh-plugin-alert`](packages/dsh-plugin-alert) | Alert plugin twin - the alert seat, plugin-scoped |
| [`dsh-plugin-alerts`](packages/dsh-plugin-alerts) | Alerts plugin twin |
| [`dsh-plugin-setup`](packages/dsh-plugin-setup) | Setup plugin twin |
| [`dsh-plugin-setups`](packages/dsh-plugin-setups) | Setups plugin twin |
| [`dsh-plugin-thesis`](packages/dsh-plugin-thesis) | Thesis plugin twin - the thesis seat, plugin-scoped |
| [`dsh-plugin-theses`](packages/dsh-plugin-theses) | Theses plugin twin |
| [`dsh-plugin-conviction`](packages/dsh-plugin-conviction) | Conviction plugin twin |
| [`dsh-plugin-edge`](packages/dsh-plugin-edge) | Edge plugin twin - the edge seat, plugin-scoped |
| [`dsh-plugin-alpha`](packages/dsh-plugin-alpha) | Alpha plugin twin - the alpha seat, plugin-scoped |
| [`dsh-plugin-alphas`](packages/dsh-plugin-alphas) | Alphas plugin twin |
| [`dsh-exposure`](packages/dsh-exposure) | Exposure - exposure monitor |
| [`dsh-positionsize`](packages/dsh-positionsize) | PositionSize - sizing math |
| [`dsh-sizing`](packages/dsh-sizing) | Sizing - the sizing policy |
| [`dsh-risklimit`](packages/dsh-risklimit) | Risklimit - the limits |
| [`dsh-limitup`](packages/dsh-limitup) | Limitup - limit-up watch |
| [`dsh-limitdown`](packages/dsh-limitdown) | Limitdown - limit-down watch |
| [`dsh-plugin-exposure`](packages/dsh-plugin-exposure) | Exposure plugin twin |
| [`dsh-plugin-positionsize`](packages/dsh-plugin-positionsize) | Positionsize plugin twin |
| [`dsh-plugin-sizing`](packages/dsh-plugin-sizing) | Sizing plugin twin |
| [`dsh-plugin-risklimit`](packages/dsh-plugin-risklimit) | Risklimit plugin twin |
| [`dsh-plugin-limitup`](packages/dsh-plugin-limitup) | Limitup plugin twin |
| [`dsh-plugin-limitdown`](packages/dsh-plugin-limitdown) | Limitdown plugin twin |
| [`dsh-plugin-drawdown`](packages/dsh-plugin-drawdown) | Drawdown plugin twin - the drawdown seat, plugin-scoped |
| [`dsh-plugin-drift`](packages/dsh-plugin-drift) | Drift plugin twin - the drift seat, plugin-scoped |
| [`dsh-pnl`](packages/dsh-pnl) | Pnl - the pnl ledger |
| [`dsh-profit`](packages/dsh-profit) | Profit - profit tracking |
| [`dsh-profits`](packages/dsh-profits) | Profits - the profits report |
| [`dsh-loss`](packages/dsh-loss) | Loss - loss discipline |
| [`dsh-losses`](packages/dsh-losses) | Losses - the loss study |
| [`dsh-gains`](packages/dsh-gains) | Gains - the gains ledger |
| [`dsh-expectancy`](packages/dsh-expectancy) | Expectancy - the expectancy math |
| [`dsh-rmultiple`](packages/dsh-rmultiple) | Rmultiple - R thinking |
| [`dsh-plugin-pnl`](packages/dsh-plugin-pnl) | Pnl plugin twin |
| [`dsh-plugin-profit`](packages/dsh-plugin-profit) | Profit plugin twin |
| [`dsh-plugin-profits`](packages/dsh-plugin-profits) | Profits plugin twin |
| [`dsh-plugin-loss`](packages/dsh-plugin-loss) | Loss plugin twin |
| [`dsh-plugin-losses`](packages/dsh-plugin-losses) | Losses plugin twin |
| [`dsh-plugin-gains`](packages/dsh-plugin-gains) | Gains plugin twin |
| [`dsh-plugin-expectancy`](packages/dsh-plugin-expectancy) | Expectancy plugin twin |
| [`dsh-plugin-rmultiple`](packages/dsh-plugin-rmultiple) | Rmultiple plugin twin |
| [`dsh-rebalance`](packages/dsh-rebalance) | Rebalance - rebalancing |
| [`dsh-rebalancing`](packages/dsh-rebalancing) | Rebalancing - the rebalance engine |
| [`dsh-allocation`](packages/dsh-allocation) | Allocation - one allocation |
| [`dsh-allocations`](packages/dsh-allocations) | Allocations - the allocation sheet |
| [`dsh-weights`](packages/dsh-weights) | Weights - portfolio weights |
| [`dsh-plugin-rebalance`](packages/dsh-plugin-rebalance) | Rebalance plugin twin |
| [`dsh-plugin-rebalancing`](packages/dsh-plugin-rebalancing) | Rebalancing plugin twin |
| [`dsh-plugin-allocation`](packages/dsh-plugin-allocation) | Allocation plugin twin |
| [`dsh-plugin-allocations`](packages/dsh-plugin-allocations) | Allocations plugin twin |
| [`dsh-plugin-weights`](packages/dsh-plugin-weights) | Weights plugin twin |
| [`dsh-plugin-portfolio`](packages/dsh-plugin-portfolio) | Portfolio plugin twin - completing the pair |
| [`dsh-stocks`](packages/dsh-stocks) | Stocks - the stock shelf |
| [`dsh-plugin-stocks`](packages/dsh-plugin-stocks) | Stocks plugin twin |
| [`dsh-stockmarket`](packages/dsh-stockmarket) | Stockmarket - the market overview |
| [`dsh-plugin-stockmarket`](packages/dsh-plugin-stockmarket) | Stockmarket plugin twin |
| [`dsh-backtesting`](packages/dsh-backtesting) | Backtesting - the backtest harness |
| [`dsh-backtests`](packages/dsh-backtests) | Backtests - the backtest shelf |
| [`dsh-papertrade`](packages/dsh-papertrade) | Papertrade - paper trading |
| [`dsh-papertrading`](packages/dsh-papertrading) | Papertrading - the paper desk |
| [`dsh-papertrader`](packages/dsh-papertrader) | Papertrader - the sim trader |
| [`dsh-simulator`](packages/dsh-simulator) | Simulator - the market simulator |
| [`dsh-simulation`](packages/dsh-simulation) | Simulation - scenario runs |
| [`dsh-dryrun`](packages/dsh-dryrun) | Dryrun - dry-run mode |
| [`dsh-plugin-backtesting`](packages/dsh-plugin-backtesting) | Backtesting plugin twin |
| [`dsh-plugin-backtests`](packages/dsh-plugin-backtests) | Backtests plugin twin |
| [`dsh-plugin-papertrade`](packages/dsh-plugin-papertrade) | Papertrade plugin twin |
| [`dsh-plugin-papertrading`](packages/dsh-plugin-papertrading) | Papertrading plugin twin |
| [`dsh-plugin-papertrader`](packages/dsh-plugin-papertrader) | Papertrader plugin twin |
| [`dsh-plugin-simulator`](packages/dsh-plugin-simulator) | Simulator plugin twin |
| [`dsh-plugin-simulation`](packages/dsh-plugin-simulation) | Simulation plugin twin |
| [`dsh-plugin-dryrun`](packages/dsh-plugin-dryrun) | Dryrun plugin twin |
| [`dsh-plugin-backtest`](packages/dsh-plugin-backtest) | Backtest plugin twin - completing the pair |
| [`dsh-marketclock`](packages/dsh-marketclock) | Marketclock - the market clock |
| [`dsh-tradingclock`](packages/dsh-tradingclock) | Tradingclock - session timing |
| [`dsh-tradingday`](packages/dsh-tradingday) | Tradingday - one trading day |
| [`dsh-tradingweek`](packages/dsh-tradingweek) | Tradingweek - the trading week |
| [`dsh-tradingcalendar`](packages/dsh-tradingcalendar) | Tradingcalendar - the trading calendar |
| [`dsh-marketcalendar`](packages/dsh-marketcalendar) | Marketcalendar - the market calendar |
| [`dsh-postmarket`](packages/dsh-postmarket) | Postmarket - after the close |
| [`dsh-halfday`](packages/dsh-halfday) | Halfday - half-day sessions |
| [`dsh-plugin-marketclock`](packages/dsh-plugin-marketclock) | Marketclock plugin twin |
| [`dsh-plugin-tradingclock`](packages/dsh-plugin-tradingclock) | Tradingclock plugin twin |
| [`dsh-plugin-tradingday`](packages/dsh-plugin-tradingday) | Tradingday plugin twin |
| [`dsh-plugin-tradingweek`](packages/dsh-plugin-tradingweek) | Tradingweek plugin twin |
| [`dsh-plugin-tradingcalendar`](packages/dsh-plugin-tradingcalendar) | Tradingcalendar plugin twin |
| [`dsh-plugin-marketcalendar`](packages/dsh-plugin-marketcalendar) | Marketcalendar plugin twin |
| [`dsh-plugin-postmarket`](packages/dsh-plugin-postmarket) | Postmarket plugin twin |
| [`dsh-plugin-afterhours`](packages/dsh-plugin-afterhours) | Afterhours plugin twin - the afterhours seat, plugin-scoped |
| [`dsh-plugin-overnight`](packages/dsh-plugin-overnight) | Overnight plugin twin - the overnight seat, plugin-scoped |
| [`dsh-plugin-halfday`](packages/dsh-plugin-halfday) | Halfday plugin twin |
| [`dsh-plugin-premarket`](packages/dsh-plugin-premarket) | Premarket plugin twin - completing the pair |
| [`dsh-earnings`](packages/dsh-earnings) | Earnings - earnings season |
| [`dsh-earningscalendar`](packages/dsh-earningscalendar) | Earningscalendar - the earnings calendar |
| [`dsh-dividend`](packages/dsh-dividend) | Dividend - dividends |
| [`dsh-ipos`](packages/dsh-ipos) | Ipos - the IPO shelf |
| [`dsh-fee`](packages/dsh-fee) | Fee - one fee |
| [`dsh-commission`](packages/dsh-commission) | Commission - commission math |
| [`dsh-commissions`](packages/dsh-commissions) | Commissions - the cost sheet |
| [`dsh-fundingrate`](packages/dsh-fundingrate) | Fundingrate - perp funding |
| [`dsh-fundingrates`](packages/dsh-fundingrates) | Fundingrates - the funding board |
| [`dsh-plugin-earnings`](packages/dsh-plugin-earnings) | Earnings plugin twin |
| [`dsh-plugin-earningscalendar`](packages/dsh-plugin-earningscalendar) | Earningscalendar plugin twin |
| [`dsh-plugin-dividend`](packages/dsh-plugin-dividend) | Dividend plugin twin |
| [`dsh-plugin-dividends`](packages/dsh-plugin-dividends) | Dividends plugin twin - the dividends seat, plugin-scoped |
| [`dsh-plugin-splits`](packages/dsh-plugin-splits) | Splits plugin twin - the splits seat, plugin-scoped |
| [`dsh-plugin-ipo`](packages/dsh-plugin-ipo) | Ipo plugin twin - the ipo seat, plugin-scoped |
| [`dsh-plugin-ipos`](packages/dsh-plugin-ipos) | Ipos plugin twin |
| [`dsh-plugin-fee`](packages/dsh-plugin-fee) | Fee plugin twin |
| [`dsh-plugin-fees`](packages/dsh-plugin-fees) | Fees plugin twin - the fees seat, plugin-scoped |
| [`dsh-plugin-commission`](packages/dsh-plugin-commission) | Commission plugin twin |
| [`dsh-plugin-commissions`](packages/dsh-plugin-commissions) | Commissions plugin twin |
| [`dsh-plugin-fundingrate`](packages/dsh-plugin-fundingrate) | Fundingrate plugin twin |
| [`dsh-plugin-fundingrates`](packages/dsh-plugin-fundingrates) | Fundingrates plugin twin |
| [`dsh-hedging`](packages/dsh-hedging) | Hedging - hedge execution |
| [`dsh-hedgefund`](packages/dsh-hedgefund) | Hedgefund - the fund desk |
| [`dsh-hedgefunds`](packages/dsh-hedgefunds) | Hedgefunds - the fund tracker |
| [`dsh-perp`](packages/dsh-perp) | Perp - perpetual futures |
| [`dsh-perps`](packages/dsh-perps) | Perps - the perp desk |
| [`dsh-spot`](packages/dsh-spot) | Spot - spot trading |
| [`dsh-spotmarket`](packages/dsh-spotmarket) | Spotmarket - spot markets |
| [`dsh-plugin-hedging`](packages/dsh-plugin-hedging) | Hedging plugin twin |
| [`dsh-plugin-hedgefund`](packages/dsh-plugin-hedgefund) | Hedgefund plugin twin |
| [`dsh-plugin-hedgefunds`](packages/dsh-plugin-hedgefunds) | Hedgefunds plugin twin |
| [`dsh-plugin-leverage`](packages/dsh-plugin-leverage) | Leverage plugin twin - the leverage seat, plugin-scoped |
| [`dsh-plugin-margin`](packages/dsh-plugin-margin) | Margin plugin twin - the margin seat, plugin-scoped |
| [`dsh-plugin-liquidation`](packages/dsh-plugin-liquidation) | Liquidation plugin twin - the liquidation seat, plugin-scoped |
| [`dsh-plugin-perp`](packages/dsh-plugin-perp) | Perp plugin twin |
| [`dsh-plugin-perps`](packages/dsh-plugin-perps) | Perps plugin twin |
| [`dsh-plugin-spot`](packages/dsh-plugin-spot) | Spot plugin twin |
| [`dsh-plugin-spotmarket`](packages/dsh-plugin-spotmarket) | Spotmarket plugin twin |
| [`dsh-momentum`](packages/dsh-momentum) | Momentum - momentum tracking |
| [`dsh-trend`](packages/dsh-trend) | Trend - one trend |
| [`dsh-trends`](packages/dsh-trends) | Trends - the trend board |
| [`dsh-trending`](packages/dsh-trending) | Trending - what is trending |
| [`dsh-volatility`](packages/dsh-volatility) | Volatility - vol tracking |
| [`dsh-volume`](packages/dsh-volume) | Volume - volume analysis |
| [`dsh-volumes`](packages/dsh-volumes) | Volumes - the volume profile |
| [`dsh-breakouts`](packages/dsh-breakouts) | Breakouts - breakout tracking |
| [`dsh-levels`](packages/dsh-levels) | Levels - the level book |
| [`dsh-range`](packages/dsh-range) | Range - one range |
| [`dsh-ranges`](packages/dsh-ranges) | Ranges - range regimes |
| [`dsh-plugin-momentum`](packages/dsh-plugin-momentum) | Momentum plugin twin |
| [`dsh-plugin-trend`](packages/dsh-plugin-trend) | Trend plugin twin |
| [`dsh-plugin-trends`](packages/dsh-plugin-trends) | Trends plugin twin |
| [`dsh-plugin-trending`](packages/dsh-plugin-trending) | Trending plugin twin |
| [`dsh-plugin-volatility`](packages/dsh-plugin-volatility) | Volatility plugin twin |
| [`dsh-plugin-volume`](packages/dsh-plugin-volume) | Volume plugin twin |
| [`dsh-plugin-volumes`](packages/dsh-plugin-volumes) | Volumes plugin twin |
| [`dsh-plugin-breakout`](packages/dsh-plugin-breakout) | Breakout plugin twin - the breakout seat, plugin-scoped |
| [`dsh-plugin-breakouts`](packages/dsh-plugin-breakouts) | Breakouts plugin twin |
| [`dsh-plugin-support`](packages/dsh-plugin-support) | Support plugin twin - the support seat, plugin-scoped |
| [`dsh-plugin-resistance`](packages/dsh-plugin-resistance) | Resistance plugin twin - the resistance seat, plugin-scoped |
| [`dsh-plugin-levels`](packages/dsh-plugin-levels) | Levels plugin twin |
| [`dsh-plugin-range`](packages/dsh-plugin-range) | Range plugin twin |
| [`dsh-plugin-ranges`](packages/dsh-plugin-ranges) | Ranges plugin twin |
| [`dsh-recaps`](packages/dsh-recaps) | Recaps - the recap shelf |
| [`dsh-plugin-journal`](packages/dsh-plugin-journal) | Journal plugin twin - the journal seat, plugin-scoped |
| [`dsh-plugin-recap`](packages/dsh-plugin-recap) | Recap plugin twin - the recap seat, plugin-scoped |
| [`dsh-plugin-recaps`](packages/dsh-plugin-recaps) | Recaps plugin twin |
| [`dsh-plugin-debrief`](packages/dsh-plugin-debrief) | Debrief plugin twin - the debrief seat, plugin-scoped |
| [`dsh-plugin-postmortem`](packages/dsh-plugin-postmortem) | Postmortem plugin twin - the postmortem seat, plugin-scoped |
| [`dsh-tradeideas`](packages/dsh-tradeideas) | TradeIdeas - the idea board |
| [`dsh-plugin-tradeideas`](packages/dsh-plugin-tradeideas) | Tradeideas plugin twin |
| [`dsh-tradereview`](packages/dsh-tradereview) | Tradereview - the review ritual |
| [`dsh-plugin-tradereview`](packages/dsh-plugin-tradereview) | Tradereview plugin twin |
| [`dsh-traderecords`](packages/dsh-traderecords) | Traderecords - the record room |
| [`dsh-plugin-traderecords`](packages/dsh-plugin-traderecords) | Traderecords plugin twin |
| [`dsh-plugin-ticker`](packages/dsh-plugin-ticker) | Ticker plugin twin - completing the pair |
| [`dsh-plugin-broker`](packages/dsh-plugin-broker) | Broker plugin twin - completing the pair |
| [`dsh-plugin-hedge`](packages/dsh-plugin-hedge) | Hedge plugin twin - completing the pair |
| [`dsh-plugin-futures`](packages/dsh-plugin-futures) | Futures plugin twin - completing the pair |
| [`dsh-plugin-options`](packages/dsh-plugin-options) | Options plugin twin - completing the pair |
| [`dsh-plugin-forex`](packages/dsh-plugin-forex) | Forex plugin twin - completing the pair |
| [`dsh-plugin-fund`](packages/dsh-plugin-fund) | Fund plugin twin - completing the pair |
| [`dsh-plugin-funding`](packages/dsh-plugin-funding) | Funding plugin twin - completing the pair |
| [`dsh-plugin-bond`](packages/dsh-plugin-bond) | Bond plugin twin - completing the pair |
| [`dsh-plugin-etf`](packages/dsh-plugin-etf) | Etf plugin twin - completing the pair |
| [`dsh-plugin-finance`](packages/dsh-plugin-finance) | Finance plugin twin - completing the pair |
| [`dsh-plugin-crypto`](packages/dsh-plugin-crypto) | Crypto plugin twin - completing the pair |
| [`dsh-plugin-defi`](packages/dsh-plugin-defi) | Defi plugin twin - completing the pair |
| [`dsh-plugin-web3`](packages/dsh-plugin-web3) | Web3 plugin twin - completing the pair |
| [`dsh-plugin-banking`](packages/dsh-plugin-banking) | Banking plugin twin - completing the pair |
| [`dsh-plugin-bitcoin`](packages/dsh-plugin-bitcoin) | Bitcoin plugin twin - completing the pair |
| [`dsh-plugin-stablecoin`](packages/dsh-plugin-stablecoin) | Stablecoin plugin twin - completing the pair |
| [`dsh-plugin-hedgehog`](packages/dsh-plugin-hedgehog) | Hedgehog plugin twin - completing the pair |

### Meta / product (16)

| Name | Planned first release |
| --- | --- |
| [`dsh-os`](packages/dsh-os) | The dsh operating-system seat |
| [`dsh-kernel`](packages/dsh-kernel) | The kernel seat for dsh |
| [`dsh-runtime`](packages/dsh-runtime) | The dsh runtime seat |
| [`dsh-engine`](packages/dsh-engine) | The dsh engine seat |
| [`dsh-global`](packages/dsh-global) | The go-global toolkit for dsh |
| [`dsh-registry`](packages/dsh-registry) | Local plugin registry |
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

### Harness surfaces (15)

| Name | Planned first release |
| --- | --- |
| [`dsh-playbook`](packages/dsh-playbook) | Playbook library for dsh |
| [`dsh-runbook`](packages/dsh-runbook) | Runbook runner for dsh |
| [`dsh-sop`](packages/dsh-sop) | Standard operating procedures in the harness |
| [`dsh-macro`](packages/dsh-macro) | Macro recorder for agent actions |
| [`dsh-finder`](packages/dsh-finder) | File & command palette for the dsh web GUI |
| [`dsh-notes`](packages/dsh-notes) | Durable notes the agent can see |
| [`dsh-snippets`](packages/dsh-snippets) | Prompt snippet library for the DeepSeek Harness |
| [`dsh-prompts`](packages/dsh-prompts) | Prompt library for the DeepSeek Harness |
| [`dsh-vscode`](packages/dsh-vscode) | VS Code bridge for the DeepSeek Harness |
| [`dsh-zed`](packages/dsh-zed) | Zed bridge for the DeepSeek Harness |
| [`dsh-cursor`](packages/dsh-cursor) | Cursor bridge for the DeepSeek Harness |
| [`dsh-i18n`](packages/dsh-i18n) | Locale packs for the dsh web GUI |
| [`dsh-l10n`](packages/dsh-l10n) | Localization toolkit for dsh |
| [`dsh-keymap`](packages/dsh-keymap) | Keyboard shortcut manager for the dsh web GUI |
| [`dsh-completions`](packages/dsh-completions) | Shell completions for the dsh launcher |

### Aerospace (29)

| Name | Planned first release |
| --- | --- |
| [`dsh-avionics`](packages/dsh-avionics) | Avionics - the aircraft nervous system |
| [`dsh-payload`](packages/dsh-payload) | Payload - the reason you launch |
| [`dsh-orbit`](packages/dsh-orbit) | Orbit - the address in space |
| [`dsh-deltav`](packages/dsh-deltav) | Deltav - the budget of spaceflight |
| [`dsh-ephemeris`](packages/dsh-ephemeris) | Ephemeris - where everything will be |
| [`dsh-kepler`](packages/dsh-kepler) | Kepler - the laws that govern orbits |
| [`dsh-lagrange`](packages/dsh-lagrange) | Lagrange - the parking lots of space |
| [`dsh-constellation`](packages/dsh-constellation) | Constellation - thousands of satellites |
| [`dsh-cubesat`](packages/dsh-cubesat) | Cubesat - space for everyone |
| [`dsh-groundstation`](packages/dsh-groundstation) | Groundstation - the other half of every link |
| [`dsh-downlink`](packages/dsh-downlink) | Downlink - the data comes home |
| [`dsh-deepspace`](packages/dsh-deepspace) | Deepspace - beyond the noise floor |
| [`dsh-missioncontrol`](packages/dsh-missioncontrol) | Missioncontrol - the room that flies the mission |
| [`dsh-countdown`](packages/dsh-countdown) | Countdown - T minus everything |
| [`dsh-apogee`](packages/dsh-apogee) | Apogee - the top of the arc |
| [`dsh-perigee`](packages/dsh-perigee) | Perigee - the lowest pass |
| [`dsh-rover`](packages/dsh-rover) | Rover - the wheels on another world |
| [`dsh-lander`](packages/dsh-lander) | Lander - seven minutes of terror |
| [`dsh-capsule`](packages/dsh-capsule) | Capsule - the ride home |
| [`dsh-ion`](packages/dsh-ion) | Ion - the engine that whispers |
| [`dsh-mach`](packages/dsh-mach) | Mach - the speed of sound as a ruler |
| [`dsh-adsb`](packages/dsh-adsb) | Adsb - every aircraft, broadcasting |
| [`dsh-notam`](packages/dsh-notam) | Notam - the pilot bulletin |
| [`dsh-falcon`](packages/dsh-falcon) | Falcon - the reusable workhorse |
| [`dsh-starship`](packages/dsh-starship) | Starship - the giant that catches itself |
| [`dsh-starlink`](packages/dsh-starlink) | Starlink - the internet from above |
| [`dsh-apollo`](packages/dsh-apollo) | Apollo - the name that means we went |
| [`dsh-artemis`](packages/dsh-artemis) | Artemis - back to the Moon |
| [`dsh-voyager`](packages/dsh-voyager) | Voyager - the farthest machines |

### Biotech (28)

| Name | Planned first release |
| --- | --- |
| [`dsh-crispr`](packages/dsh-crispr) | Crispr - the search and replace of life |
| [`dsh-cas9`](packages/dsh-cas9) | Cas9 - the molecular scissors |
| [`dsh-genome`](packages/dsh-genome) | Genome - the complete instruction set |
| [`dsh-genomics`](packages/dsh-genomics) | Genomics - biology at scale |
| [`dsh-sequencing`](packages/dsh-sequencing) | Sequencing - reading the letters |
| [`dsh-nanopore`](packages/dsh-nanopore) | Nanopore - sequencing through a hole |
| [`dsh-fastq`](packages/dsh-fastq) | Fastq - the raw text of life |
| [`dsh-basepair`](packages/dsh-basepair) | Basepair - A with T, G with C |
| [`dsh-plasmid`](packages/dsh-plasmid) | Plasmid - the delivery vehicle |
| [`dsh-assay`](packages/dsh-assay) | Assay - the measurement that decides |
| [`dsh-pcr`](packages/dsh-pcr) | Pcr - a billion copies from one |
| [`dsh-qpcr`](packages/dsh-qpcr) | Qpcr - quantify while you copy |
| [`dsh-elisa`](packages/dsh-elisa) | Elisa - antibodies on a plate |
| [`dsh-mrna`](packages/dsh-mrna) | Mrna - the message as medicine |
| [`dsh-protein`](packages/dsh-protein) | Protein - the machines that do everything |
| [`dsh-peptide`](packages/dsh-peptide) | Peptide - the short chain |
| [`dsh-antibody`](packages/dsh-antibody) | Antibody - the targeted missile |
| [`dsh-epitope`](packages/dsh-epitope) | Epitope - the binding site |
| [`dsh-ligand`](packages/dsh-ligand) | Ligand - the key for the lock |
| [`dsh-folding`](packages/dsh-folding) | Folding - the shape is the function |
| [`dsh-alphafold`](packages/dsh-alphafold) | Alphafold - structure predicted |
| [`dsh-biomarker`](packages/dsh-biomarker) | Biomarker - the measurable signal |
| [`dsh-placebo`](packages/dsh-placebo) | Placebo - the control arm |
| [`dsh-invivo`](packages/dsh-invivo) | Invivo - in the living |
| [`dsh-invitro`](packages/dsh-invitro) | Invitro - in the glass |
| [`dsh-singlecell`](packages/dsh-singlecell) | Singlecell - resolution to one cell |
| [`dsh-omics`](packages/dsh-omics) | Omics - the suffix of scale |
| [`dsh-trial`](packages/dsh-trial) | Trial - the randomized truth machine |

### Film & post (30)

| Name | Planned first release |
| --- | --- |
| [`dsh-storyboard`](packages/dsh-storyboard) | Storyboard - the movie on paper |
| [`dsh-vfx`](packages/dsh-vfx) | Vfx - the impossible made frame |
| [`dsh-mocap`](packages/dsh-mocap) | Mocap - performance into data |
| [`dsh-rotoscope`](packages/dsh-rotoscope) | Rotoscope - tracing reality |
| [`dsh-renderfarm`](packages/dsh-renderfarm) | Renderfarm - the thousand-machine darkroom |
| [`dsh-greenscreen`](packages/dsh-greenscreen) | Greenscreen - the void you replace |
| [`dsh-chroma`](packages/dsh-chroma) | Chroma - the color that separates |
| [`dsh-keying`](packages/dsh-keying) | Keying - pulling the matte |
| [`dsh-matte`](packages/dsh-matte) | Matte - the mask that shapes |
| [`dsh-compositing`](packages/dsh-compositing) | Compositing - the final stack |
| [`dsh-matchmove`](packages/dsh-matchmove) | Matchmove - the camera that matches |
| [`dsh-previz`](packages/dsh-previz) | Previz - the rough before the expensive |
| [`dsh-lookdev`](packages/dsh-lookdev) | Lookdev - deciding how it appears |
| [`dsh-rigging`](packages/dsh-rigging) | Rigging - the puppetry inside |
| [`dsh-keyframe`](packages/dsh-keyframe) | Keyframe - the pose, then the in-between |
| [`dsh-dopesheet`](packages/dsh-dopesheet) | Dopesheet - the animator spreadsheet |
| [`dsh-onionskin`](packages/dsh-onionskin) | Onionskin - see the frame before |
| [`dsh-foley`](packages/dsh-foley) | Foley - footsteps recorded after |
| [`dsh-adr`](packages/dsh-adr) | Adr - dialogue, again in a booth |
| [`dsh-colorgrading`](packages/dsh-colorgrading) | Colorgrading - the mood dial |
| [`dsh-lut`](packages/dsh-lut) | Lut - the color transform table |
| [`dsh-dailies`](packages/dsh-dailies) | Dailies - yesterday, watched today |
| [`dsh-conform`](packages/dsh-conform) | Conform - the cut, rebuilt at full res |
| [`dsh-dcp`](packages/dsh-dcp) | Dcp - the cinema deliverable |
| [`dsh-roughcut`](packages/dsh-roughcut) | Roughcut - the story, unpolished |
| [`dsh-slate`](packages/dsh-slate) | Slate - scene one, take one |
| [`dsh-gaffer`](packages/dsh-gaffer) | Gaffer - the chief of light |
| [`dsh-dubbing`](packages/dsh-dubbing) | Dubbing - the voice, replaced |
| [`dsh-loudness`](packages/dsh-loudness) | Loudness - the mixed-to spec |
| [`dsh-compositor`](packages/dsh-compositor) | Compositor - the tool behind the stack |

### Sports data (28)

| Name | Planned first release |
| --- | --- |
| [`dsh-sabermetrics`](packages/dsh-sabermetrics) | Sabermetrics - bill james made numbers play |
| [`dsh-boxscore`](packages/dsh-boxscore) | Boxscore - the game in columns |
| [`dsh-xg`](packages/dsh-xg) | Xg - expected goals |
| [`dsh-xa`](packages/dsh-xa) | Xa - expected assists |
| [`dsh-xga`](packages/dsh-xga) | Xga - expected goals against |
| [`dsh-plusminus`](packages/dsh-plusminus) | Plusminus - the team while you played |
| [`dsh-clutch`](packages/dsh-clutch) | Clutch - the last two minutes |
| [`dsh-possession`](packages/dsh-possession) | Possession - who has the ball |
| [`dsh-tikitaka`](packages/dsh-tikitaka) | Tikitaka - the passing carousel |
| [`dsh-pressing`](packages/dsh-pressing) | Pressing - the hunt without the ball |
| [`dsh-playbyplay`](packages/dsh-playbyplay) | Playbyplay - the game as an event stream |
| [`dsh-shotchart`](packages/dsh-shotchart) | Shotchart - where the shots live |
| [`dsh-depthchart`](packages/dsh-depthchart) | Depthchart - the rotation on paper |
| [`dsh-gamelog`](packages/dsh-gamelog) | Gamelog - one row per game |
| [`dsh-splits`](packages/dsh-splits) | Splits - home versus road |
| [`dsh-streak`](packages/dsh-streak) | Streak - the run that ends |
| [`dsh-winstreak`](packages/dsh-winstreak) | Winstreak - the hot hand |
| [`dsh-mvp`](packages/dsh-mvp) | Mvp - the most valuable argument |
| [`dsh-goat`](packages/dsh-goat) | Goat - the greatest of all time |
| [`dsh-dynasty`](packages/dsh-dynasty) | Dynasty - the team that kept winning |
| [`dsh-fantasy`](packages/dsh-fantasy) | Fantasy - the game about the stats |
| [`dsh-freeagent`](packages/dsh-freeagent) | Freeagent - the open market |
| [`dsh-tanking`](packages/dsh-tanking) | Tanking - losing on purpose, legally |
| [`dsh-moneyline`](packages/dsh-moneyline) | Moneyline - just pick the winner |
| [`dsh-parlay`](packages/dsh-parlay) | Parlay - the correlated dream |
| [`dsh-overunder`](packages/dsh-overunder) | Overunder - the total |
| [`dsh-wingspan`](packages/dsh-wingspan) | Wingspan - the measurables |
| [`dsh-scouting`](packages/dsh-scouting) | Scouting - the eye and the model |

### Energy (7)

| Name | Planned first release |
| --- | --- |
| [`dsh-vpp`](packages/dsh-vpp) | Vpp - the power plant made of houses |
| [`dsh-microgrid`](packages/dsh-microgrid) | Microgrid - the grid that can island |
| [`dsh-inverter`](packages/dsh-inverter) | Inverter - the brain of solar |
| [`dsh-curtailment`](packages/dsh-curtailment) | Curtailment - the power we throw away |
| [`dsh-demandresponse`](packages/dsh-demandresponse) | Demandresponse - load that listens |
| [`dsh-grid`](packages/dsh-grid) | Grid - the machine that is the power system |
| [`dsh-battery`](packages/dsh-battery) | Battery - the molecule that stores time |
<details>
<summary>External waves (208 names, reconciled from the npm registry)</summary>

`dsh-accounting`, `dsh-acp-server`, `dsh-agent-evals`, `dsh-agentic-cloud`, `dsh-agentpay`, `dsh-airtable`, `dsh-animation`, `dsh-ansible`, `dsh-ap2`, `dsh-asana`, `dsh-aws`, `dsh-azure`, `dsh-baby`, `dsh-banking`, `dsh-base`, `dsh-beauty`, `dsh-bio`, `dsh-bitcoin`, `dsh-blog`, `dsh-bolt`, `dsh-book`, `dsh-bots`, `dsh-bounty`, `dsh-brand`, `dsh-bun`, `dsh-calc`, `dsh-calculator`, `dsh-chem`, `dsh-clickhouse`, `dsh-comic`, `dsh-config`, `dsh-confluence`, `dsh-contract`, `dsh-convert`, `dsh-cook`, `dsh-cpp`, `dsh-crypto`, `dsh-csharp`, `dsh-cyber`, `dsh-data`, `dsh-defi`, `dsh-deno`, `dsh-deploy`, `dsh-dict`, `dsh-dictionary`, `dsh-discord`, `dsh-docs`, `dsh-drive`, `dsh-ecommerce`, `dsh-edge-cache`, `dsh-edu`, `dsh-embodied`, `dsh-english`, `dsh-escrow`, `dsh-esports`, `dsh-etf`, `dsh-eth`, `dsh-experts`, `dsh-fashion`, `dsh-fees`, `dsh-festival`, `dsh-figma`, `dsh-finance`, `dsh-fintech`, `dsh-fit`, `dsh-fitness`, `dsh-font`, `dsh-food`, `dsh-forex`, `dsh-freeroute`, `dsh-fun`, `dsh-fund`, `dsh-futures`, `dsh-garden`, `dsh-gcp`, `dsh-glasses`, `dsh-go`, `dsh-gui-agent`, `dsh-helm`, `dsh-hl`, `dsh-holiday`, `dsh-horoscope`, `dsh-house`, `dsh-hr`, `dsh-hype`, `dsh-hyperevm`, `dsh-icon`, `dsh-image-edit`, `dsh-image-to-video`, `dsh-imaging`, `dsh-infra`, `dsh-integrations`, `dsh-invoice`, `dsh-irc`, `dsh-java`, `dsh-jira`, `dsh-joke`, `dsh-jupyter`, `dsh-k8s`, `dsh-kotlin`, `dsh-language`, `dsh-latency`, `dsh-latex`, `dsh-law`, `dsh-linear`, `dsh-linux`, `dsh-local-llm`, `dsh-locomotion`, `dsh-long-context`, `dsh-lora`, `dsh-macos`, `dsh-marketing`, `dsh-materials`, `dsh-math`, `dsh-matrix`, `dsh-meditate`, `dsh-micropay`, `dsh-ml`, `dsh-model-gateway`, `dsh-mongo`, `dsh-movie`, `dsh-multiagent`, `dsh-multimodal`, `dsh-mysql`, `dsh-neurosymbolic`, `dsh-news`, `dsh-nginx`, `dsh-notebook`, `dsh-nuxt`, `dsh-ocr`, `dsh-onchain`, `dsh-openweights`, `dsh-options`, `dsh-paper`, `dsh-payment`, `dsh-payments`, `dsh-photo`, `dsh-php`, `dsh-physics`, `dsh-postgres`, `dsh-prisma`, `dsh-product`, `dsh-puzzle`, `dsh-python`, `dsh-pyusd`, `dsh-quadruped`, `dsh-quiz`, `dsh-radio`, `dsh-radiology`, `dsh-react`, `dsh-read`, `dsh-recruit`, `dsh-redis`, `dsh-rent`, `dsh-risk`, `dsh-ruby`, `dsh-rust`, `dsh-sales`, `dsh-screenshot`, `dsh-seo`, `dsh-seo-agent`, `dsh-settings`, `dsh-shared-workspace`, `dsh-shop`, `dsh-sim2real`, `dsh-sleep`, `dsh-sports`, `dsh-sqlite`, `dsh-stable`, `dsh-stats`, `dsh-stock`, `dsh-streaming`, `dsh-subagent`, `dsh-subtitle`, `dsh-supabase`, `dsh-support`, `dsh-svelte`, `dsh-swift`, `dsh-task`, `dsh-tax`, `dsh-terraform`, `dsh-ticker`, `dsh-time`, `dsh-tipping`, `dsh-tracking`, `dsh-transit`, `dsh-travel`, `dsh-trello`, `dsh-trip`, `dsh-tv`, `dsh-typescript`, `dsh-units`, `dsh-usdc`, `dsh-ux`, `dsh-video-to-video`, `dsh-vocab`, `dsh-vue`, `dsh-water`, `dsh-watermark`, `dsh-web-crawler`, `dsh-web3`, `dsh-web3-core`, `dsh-weibo`, `dsh-word`, `dsh-writing`, `dsh-x402`, `dsh-zhihu`, `dsh-zig`

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
