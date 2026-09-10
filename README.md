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
### Model bridges (41)

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

### Developer tools (22)

| Name | Planned first release |
| --- | --- |
| [`dsh-gitlab`](packages/dsh-gitlab) | GitLab bridge for dsh agents |
| [`dsh-vercel`](packages/dsh-vercel) | Vercel bridge for dsh agents |
| [`dsh-cloudflare`](packages/dsh-cloudflare) | Cloudflare bridge for dsh agents |
| [`dsh-netlify`](packages/dsh-netlify) | Netlify bridge for dsh agents |
| [`dsh-zapier`](packages/dsh-zapier) | Zapier bridge for dsh agents |
| [`dsh-n8n`](packages/dsh-n8n) | n8n bridge for dsh agents |
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

### Agent capabilities (10)

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

### Self-iteration (17)

| Name | Planned first release |
| --- | --- |
| [`dsh-critic`](packages/dsh-critic) | Critic role for dsh agents |
| [`dsh-refine`](packages/dsh-refine) | Refinement loop for dsh agents |
| [`dsh-reflect`](packages/dsh-reflect) | Reflection toolkit for dsh agents |
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

### Long-horizon (14)

| Name | Planned first release |
| --- | --- |
| [`dsh-resume`](packages/dsh-resume) | Resume toolkit for dsh agents |
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
| [`dsh-sessions`](packages/dsh-sessions) | Session manager and browser |

### Channels (37)

| Name | Planned first release |
| --- | --- |
| [`dsh-line`](packages/dsh-line) | LINE channel bridge for dsh bots |
| [`dsh-twitter`](packages/dsh-twitter) | X (Twitter) channel bridge for dsh bots |
| [`dsh-whatsapp`](packages/dsh-whatsapp) | WhatsApp channel bridge for dsh bots |
| [`dsh-qq`](packages/dsh-qq) | QQ channel bridge for dsh bots |
| [`dsh-douyin`](packages/dsh-douyin) | Douyin bridge for dsh bots |
| [`dsh-xiaohongshu`](packages/dsh-xiaohongshu) | Xiaohongshu bridge for dsh bots |
| [`dsh-bilibili`](packages/dsh-bilibili) | Bilibili bridge for dsh bots |
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

### Web3 & payments (58)

| Name | Planned first release |
| --- | --- |
| [`dsh-arbitrum`](packages/dsh-arbitrum) | Arbitrum bridge for dsh agents |
| [`dsh-dex`](packages/dsh-dex) | DEX toolkit for dsh agents |
| [`dsh-hyperliquid`](packages/dsh-hyperliquid) | Hyperliquid bridge for dsh agents |
| [`dsh-ledger`](packages/dsh-ledger) | Ledger-facing bridge for dsh agents |
| [`dsh-lightning`](packages/dsh-lightning) | Lightning Network toolkit for dsh agents |
| [`dsh-pay`](packages/dsh-pay) | The generic payment seat for dsh agents |
| [`dsh-solana`](packages/dsh-solana) | Solana bridge for dsh agents |
| [`dsh-solidity`](packages/dsh-solidity) | Solidity toolkit for dsh agents |
| [`dsh-stablecoin`](packages/dsh-stablecoin) | Stablecoin rail toolkit for dsh agents |
| [`dsh-usdt`](packages/dsh-usdt) | USDT toolkit for dsh agents |
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

### Daily life (66)

| Name | Planned first release |
| --- | --- |
| [`dsh-yuque`](packages/dsh-yuque) | Yuque bridge for dsh agents |
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

### Entertainment (29)

| Name | Planned first release |
| --- | --- |
| [`dsh-anime`](packages/dsh-anime) | Anime lane for dsh agents |
| [`dsh-game`](packages/dsh-game) | Game toolkit for dsh agents |
| [`dsh-gift`](packages/dsh-gift) | Gift lane for dsh agents |
| [`dsh-karaoke`](packages/dsh-karaoke) | Karaoke lane for dsh agents |
| [`dsh-music`](packages/dsh-music) | Music lane for dsh agents |
| [`dsh-play`](packages/dsh-play) | Play mode for dsh agents |
| [`dsh-podcast`](packages/dsh-podcast) | Podcast lane for dsh agents |
| [`dsh-video`](packages/dsh-video) | Video lane for dsh agents |
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

### Multi-agent (6)

| Name | Planned first release |
| --- | --- |
| [`dsh-ensemble`](packages/dsh-ensemble) | Model ensembles for dsh |
| [`dsh-broker`](packages/dsh-broker) | Task broker for agent fleets |
| [`dsh-swarm`](packages/dsh-swarm) | Multi-agent swarm orchestration for dsh |
| [`dsh-delegate`](packages/dsh-delegate) | Delegation tool for dsh agents |
| [`dsh-queue`](packages/dsh-queue) | Durable task queues for dsh bots |
| [`dsh-council`](packages/dsh-council) | Council-of-agents deliberation for dsh |

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

### Evaluation (3)

| Name | Planned first release |
| --- | --- |
| [`dsh-judge`](packages/dsh-judge) | LLM-as-judge evaluation |
| [`dsh-rubric`](packages/dsh-rubric) | Scoring rubrics for agent work |
| [`dsh-coverage`](packages/dsh-coverage) | Agent edit coverage map |

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

### Ops (14)

| Name | Planned first release |
| --- | --- |
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

### Meta / product (12)

| Name | Planned first release |
| --- | --- |
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
<details>
<summary>External waves (191 names, reconciled from the npm registry)</summary>

`dsh-accounting`, `dsh-acp-server`, `dsh-agentpay`, `dsh-airtable`, `dsh-ansible`, `dsh-ap2`, `dsh-asana`, `dsh-aws`, `dsh-azure`, `dsh-baby`, `dsh-banking`, `dsh-base`, `dsh-beauty`, `dsh-bio`, `dsh-bitcoin`, `dsh-blog`, `dsh-bolt`, `dsh-book`, `dsh-bots`, `dsh-brand`, `dsh-bun`, `dsh-calc`, `dsh-calculator`, `dsh-car`, `dsh-chem`, `dsh-clickhouse`, `dsh-comic`, `dsh-compliance`, `dsh-config`, `dsh-confluence`, `dsh-contract`, `dsh-convert`, `dsh-cook`, `dsh-cpp`, `dsh-crm`, `dsh-crypto`, `dsh-csharp`, `dsh-data`, `dsh-defi`, `dsh-deno`, `dsh-deploy`, `dsh-dict`, `dsh-dictionary`, `dsh-discord`, `dsh-docs`, `dsh-drive`, `dsh-ecommerce`, `dsh-edu`, `dsh-english`, `dsh-erp`, `dsh-escrow`, `dsh-esports`, `dsh-etf`, `dsh-eth`, `dsh-fashion`, `dsh-fees`, `dsh-festival`, `dsh-figma`, `dsh-finance`, `dsh-fintech`, `dsh-fit`, `dsh-fitness`, `dsh-font`, `dsh-food`, `dsh-forex`, `dsh-freeroute`, `dsh-fun`, `dsh-fund`, `dsh-futures`, `dsh-garden`, `dsh-gcp`, `dsh-go`, `dsh-habit`, `dsh-helm`, `dsh-hl`, `dsh-holiday`, `dsh-home`, `dsh-horoscope`, `dsh-house`, `dsh-hr`, `dsh-hype`, `dsh-hyperevm`, `dsh-icon`, `dsh-infra`, `dsh-invoice`, `dsh-iot`, `dsh-irc`, `dsh-java`, `dsh-jira`, `dsh-joke`, `dsh-journal`, `dsh-jupyter`, `dsh-k8s`, `dsh-kotlin`, `dsh-language`, `dsh-latex`, `dsh-law`, `dsh-legal`, `dsh-linear`, `dsh-linux`, `dsh-lottery`, `dsh-macos`, `dsh-marketing`, `dsh-math`, `dsh-matrix`, `dsh-medical`, `dsh-meditate`, `dsh-micropay`, `dsh-ml`, `dsh-mongo`, `dsh-mood`, `dsh-movie`, `dsh-multiagent`, `dsh-mysql`, `dsh-news`, `dsh-nginx`, `dsh-notebook`, `dsh-nuxt`, `dsh-ocr`, `dsh-onchain`, `dsh-options`, `dsh-paper`, `dsh-payment`, `dsh-payments`, `dsh-photo`, `dsh-php`, `dsh-physics`, `dsh-portfolio`, `dsh-postgres`, `dsh-prisma`, `dsh-product`, `dsh-puzzle`, `dsh-python`, `dsh-pyusd`, `dsh-quiz`, `dsh-radio`, `dsh-react`, `dsh-read`, `dsh-recruit`, `dsh-redis`, `dsh-rent`, `dsh-risk`, `dsh-ruby`, `dsh-rust`, `dsh-sales`, `dsh-screenshot`, `dsh-seo`, `dsh-settings`, `dsh-shop`, `dsh-sleep`, `dsh-sports`, `dsh-sqlite`, `dsh-stable`, `dsh-stats`, `dsh-stock`, `dsh-streaming`, `dsh-subagent`, `dsh-subtitle`, `dsh-supabase`, `dsh-support`, `dsh-svelte`, `dsh-swift`, `dsh-tarot`, `dsh-task`, `dsh-tax`, `dsh-terraform`, `dsh-ticker`, `dsh-time`, `dsh-tipping`, `dsh-trading`, `dsh-transit`, `dsh-travel`, `dsh-trello`, `dsh-trip`, `dsh-tutor`, `dsh-tv`, `dsh-typescript`, `dsh-units`, `dsh-usdc`, `dsh-ux`, `dsh-vocab`, `dsh-vue`, `dsh-water`, `dsh-web3`, `dsh-web3-core`, `dsh-weibo`, `dsh-word`, `dsh-writing`, `dsh-x402`, `dsh-zhihu`, `dsh-zig`

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
