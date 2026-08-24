// Single source of truth for every reserved dsh-* name in this monorepo.
// Ported from ~/workspace/dsh-reserved/generate.py - keep in sync here from now on.
//
// headline  -> package.json description prefix / README headline
// body      -> README paragraph describing the planned first release
// extra     -> extra npm keywords beyond the standard dsh set
// niche     -> grouping used by the root README and the check script

import { EXTERNAL } from './catalog-external.mjs'

export const REPO = {
  owner: 'dushaobindoudou',
  repo: 'dsh-plugin',
  get url() {
    return `https://github.com/${this.owner}/${this.repo}`
  },
}

export const NICHE_ORDER = [
  'model bridges',
  'developer tools',
  'agent capabilities',
  'multi-agent',
  'protocols',
  'ui',
  'data',
  'ops',
  'security',
  'work & hiring',
  'meta / product',
  'harness surfaces',
  'external waves',
]

const CORE = {
  // ---- model bridges ----------------------------------------------------
  'dsh-claude': {
    niche: 'model bridges',
    headline: 'Anthropic Claude provider bridge for the DeepSeek Harness',
    body: 'Registers Claude models as dsh providers through the LLM adapter seam - extended thinking streamed as reasoning chunks, prompt-caching savings reported per turn.',
    extra: ['anthropic', 'claude'],
  },
  'dsh-openai': {
    niche: 'model bridges',
    headline: 'OpenAI provider bridge for the DeepSeek Harness',
    body: 'GPT models over the Responses API, keyed from OPENAI_API_KEY through the standard credentials path - no settings.yaml editing.',
    extra: ['openai'],
  },
  'dsh-gpt': {
    niche: 'model bridges',
    headline: 'The GPT-family spelled form of the OpenAI bridge',
    body: 'Compatibility name: the OpenAI bridge ships as dsh-openai; this form keeps the model-family spelling installable.',
    extra: ['openai', 'gpt'],
  },
  'dsh-gemini': {
    niche: 'model bridges',
    headline: 'Google Gemini provider bridge for the DeepSeek Harness',
    body: 'Native multimodal Gemini access - images in, text out - with thinking budgets surfaced as per-model options.',
    extra: ['gemini', 'google'],
  },
  'dsh-qwen': {
    niche: 'model bridges',
    headline: 'Qwen provider bridge for the DeepSeek Harness',
    body: 'DashScope-served Qwen models as dsh providers, with context-length awareness in the model chip and coder variants preconfigured.',
    extra: ['qwen', 'dashscope'],
  },
  'dsh-glm': {
    niche: 'model bridges',
    headline: 'GLM provider bridge for the DeepSeek Harness',
    body: 'Zhipu GLM series via the open-platform API - reasoning models streamed as thought chunks, web-search variants flagged in the model list.',
    extra: ['glm', 'zhipu'],
  },
  'dsh-kimi': {
    niche: 'model bridges',
    headline: 'Kimi provider bridge for the DeepSeek Harness',
    body: 'Moonshot Kimi models as dsh providers - long-context variants surfaced with their true context windows.',
    extra: ['kimi', 'moonshot'],
  },
  'dsh-doubao': {
    niche: 'model bridges',
    headline: 'Doubao provider bridge for the DeepSeek Harness',
    body: 'Volcengine Ark-served Doubao models as dsh providers, endpoint IDs resolvable by display name.',
    extra: ['doubao', 'volcengine'],
  },
  'dsh-minimax': {
    niche: 'model bridges',
    headline: 'MiniMax provider bridge for the DeepSeek Harness',
    body: 'MiniMax models as dsh providers through the same adapter seam the other bridges use.',
    extra: ['minimax'],
  },
  'dsh-mistral': {
    niche: 'model bridges',
    headline: 'Mistral provider bridge for the DeepSeek Harness',
    body: 'Mistral and Codestral models as dsh providers - Codestral preconfigured for edit-heavy workflows.',
    extra: ['mistral', 'codestral'],
  },
  'dsh-groq': {
    niche: 'model bridges',
    headline: 'Groq provider bridge for the DeepSeek Harness',
    body: 'LPU-fast inference behind the standard seam - time-to-first-token shown live in the session header.',
    extra: ['groq'],
  },
  'dsh-together': {
    niche: 'model bridges',
    headline: 'Together AI provider bridge for the DeepSeek Harness',
    body: 'Open-weight models on demand as dsh providers, with per-model pricing surfaced at selection time.',
    extra: ['together'],
  },
  'dsh-fireworks': {
    niche: 'model bridges',
    headline: 'Fireworks AI provider bridge for the DeepSeek Harness',
    body: 'Fast open-model serving as dsh providers, Fireworks model IDs mapped to friendly names.',
    extra: ['fireworks'],
  },
  'dsh-siliconflow': {
    niche: 'model bridges',
    headline: 'SiliconFlow provider bridge for the DeepSeek Harness',
    body: 'Aggregated open-model serving on SiliconFlow as dsh providers - one key, the whole Chinese open-model catalog.',
    extra: ['siliconflow'],
  },
  'dsh-zhipu': {
    niche: 'model bridges',
    headline: 'The company-spelled form of the GLM provider bridge',
    body: 'Compatibility name: the Zhipu GLM bridge ships as dsh-glm; this form keeps the company spelling installable.',
    extra: ['zhipu', 'glm'],
  },
  'dsh-xai': {
    niche: 'model bridges',
    headline: 'xAI Grok provider bridge for the DeepSeek Harness',
    body: 'Grok models as dsh providers through the LLM adapter seam - agent-mode tool loops streamed turn by turn, DeepSearch runs surfaced as cited session evidence. Company-spelled form; the grok-spelled community package exists separately.',
    extra: ['xai', 'grok'],
  },
  'dsh-moonshot': {
    niche: 'model bridges',
    headline: 'The company-spelled form of the Kimi provider bridge',
    body: 'Compatibility name: the Kimi bridge ships as dsh-kimi; this form keeps the Moonshot AI company spelling installable.',
    extra: ['moonshot', 'kimi'],
  },
  'dsh-hunyuan': {
    niche: 'model bridges',
    headline: 'Tencent Hunyuan provider bridge for the DeepSeek Harness',
    body: 'Hunyuan models as dsh providers through the LLM adapter seam, with the hybrid thinking modes surfaced as per-model options.',
    extra: ['hunyuan', 'tencent'],
  },
  'dsh-ernie': {
    niche: 'model bridges',
    headline: 'Baidu ERNIE provider bridge for the DeepSeek Harness',
    body: 'ERNIE models via the Qianfan API as dsh providers - the Baidu arm of the provider bridge family.',
    extra: ['ernie', 'baidu', 'qianfan'],
  },
  'dsh-vllm': {
    niche: 'model bridges',
    headline: 'vLLM provider bridge for the DeepSeek Harness',
    body: 'Point dsh at a self-hosted vLLM server - OpenAI-compatible endpoints auto-probed, served models listed as first-class providers.',
    extra: ['vllm', 'self-hosted'],
  },
  'dsh-llama': {
    niche: 'model bridges',
    headline: 'Llama provider bridge for the DeepSeek Harness',
    body: "Meta's Llama family wherever you serve it - local or hosted - registered as dsh providers from one config block.",
    extra: ['llama', 'meta'],
  },
  'dsh-cohere': {
    niche: 'model bridges',
    headline: 'Cohere provider bridge for the DeepSeek Harness',
    body: 'Command models as dsh providers, with Rerank exposed as a retrieval tool for RAG flows.',
    extra: ['cohere'],
  },
  'dsh-bedrock': {
    niche: 'model bridges',
    headline: 'AWS Bedrock provider bridge for the DeepSeek Harness',
    body: 'IAM-authenticated model access - no static API keys in settings.yaml, roles assumed through the ambient credential chain.',
    extra: ['bedrock', 'aws'],
  },
  'dsh-ollama': {
    niche: 'model bridges',
    headline: 'Local-model provider bridge for the DeepSeek Harness',
    body: 'Registers Ollama-served models as dsh providers through the LLM adapter seam, auto-discovers installed models, and surfaces context-length limits in the model chip.',
    extra: ['ollama'],
  },
  'dsh-openrouter': {
    niche: 'model bridges',
    headline: 'OpenRouter provider bridge for the DeepSeek Harness',
    body: "One provider, the whole model catalog - routed through OpenRouter with per-model cost and rate-limit headers surfaced into dsh's model selection UI.",
    extra: ['openrouter'],
  },
  'dsh-lmstudio': {
    niche: 'model bridges',
    headline: 'LM Studio provider bridge for the DeepSeek Harness',
    body: 'Connects a local LM Studio server as a dsh provider; keeps the model list in sync with what LM Studio currently has loaded.',
    extra: ['lm-studio'],
  },
  'dsh-proxy': {
    niche: 'model bridges',
    headline: 'LLM gateway plugin for the DeepSeek Harness',
    body: 'Routes dsh model calls through a local proxy - request logging, header rewriting, fallback chains, and multi-key rotation - without touching settings.yaml.',
    extra: ['proxy', 'gateway'],
  },
  'dsh-models': {
    niche: 'model bridges',
    headline: 'Model registry panel for the DeepSeek Harness',
    body: 'Every registered model in one table - context windows, pricing, thinking modes, and which provider serves it; pin defaults per profile.',
    extra: ['models', 'registry'],
  },
  'dsh-providers': {
    niche: 'model bridges',
    headline: 'Provider registry for the DeepSeek Harness',
    body: 'The other half of the model table - credential status, rate limits, latency, and fallback order for every LLM adapter, live.',
    extra: ['providers', 'llm', 'registry'],
  },
  // ---- developer tools --------------------------------------------------
  'dsh-edit': {
    niche: 'developer tools',
    headline: 'Inline edit panel for the dsh web GUI',
    body: 'Propose file edits in place - hunk-by-hunk approval, reject-and-revise on the spot, everything through the approval seam.',
    extra: [],
  },
  'dsh-refactor': {
    niche: 'developer tools',
    headline: 'Refactor workflows for the dsh web GUI',
    body: 'Symbol renames and moves previewed as one whole-change diff before anything writes - multi-file, reviewable, reversible.',
    extra: ['refactor'],
  },
  'dsh-lint': {
    niche: 'developer tools',
    headline: 'Lint findings inline in the dsh web GUI',
    body: 'Problem list with severity chips and jump-to-line, wired into the file manager and the turn review.',
    extra: ['linter'],
  },
  'dsh-test': {
    niche: 'developer tools',
    headline: 'Test runner panel for the dsh web GUI',
    body: 'Run suites, watch mode, and failure output attached to the turn that caused it - rerun one test with one click.',
    extra: ['testing'],
  },
  'dsh-debug': {
    niche: 'developer tools',
    headline: 'Debug console for dsh agents',
    body: 'Step through tool calls, inspect payloads, and replay a turn from any node - the agent loop made observable.',
    extra: ['debugger'],
  },
  'dsh-db': {
    niche: 'developer tools',
    headline: 'Database client tools for dsh agents',
    body: 'Query, inspect schema, and edit rows through the approval seam - read paths free, writes gated.',
    extra: ['database', 'sql'],
  },
  'dsh-api': {
    niche: 'developer tools',
    headline: 'REST client panel for the dsh web GUI',
    body: 'Requests saved as workspace files, replayable from any session; responses attach to the conversation as evidence.',
    extra: ['rest', 'http'],
  },
  'dsh-git': {
    niche: 'developer tools',
    headline: 'Git panel for the dsh web GUI',
    body: 'Branch, status, stage, commit, and diff surfaces in the web GUI, built on the shell seam (ctx.shell). Complements per-session branch selectors with a whole-repo view.',
    extra: ['git'],
  },
  // ---- agent capabilities -----------------------------------------------
  'dsh-agents': {
    niche: 'agent capabilities',
    headline: 'Agent registry panel for the dsh web GUI',
    body: 'Browse, compare, fork, and pin agent presets - what each preset changes, in plain rows, before you switch.',
    extra: [],
  },
  'dsh-planner': {
    niche: 'agent capabilities',
    headline: 'Plan mode for dsh sessions',
    body: 'Editable task trees the agent proposes and you approve - the plan stays visible, checkpoints rollback-able.',
    extra: ['planning'],
  },
  'dsh-rag': {
    niche: 'agent capabilities',
    headline: 'Retrieval-augmented answers over workspace docs',
    body: 'Local index, cited chunks, no external service - answers quote the file and line they came from.',
    extra: ['rag', 'retrieval'],
  },
  'dsh-embeddings': {
    niche: 'agent capabilities',
    headline: 'Embeddings service panel for the DeepSeek Harness',
    body: 'Index, dedupe, and inspect vectors for any local collection - the storage seam with a face.',
    extra: ['embeddings', 'vectors'],
  },
  'dsh-router': {
    niche: 'agent capabilities',
    headline: 'Model router for the DeepSeek Harness',
    body: 'Per-task routing rules - cheap models draft, strong models finish - without editing profiles or restarting.',
    extra: ['router', 'routing'],
  },
  'dsh-search': {
    niche: 'agent capabilities',
    headline: 'Cross-session full-text search for the DeepSeek Harness',
    body: 'Ripgrep over sessions, memory, and the workspace in one query; results jump straight to the conversation node that produced them.',
    extra: ['search'],
  },
  'dsh-deepsearch': {
    niche: 'agent capabilities',
    headline: 'Agentic web research for dsh sessions',
    body: 'The DeepSearch pattern as a harness surface - multi-hop web research with citations, run as a session mode rather than one tool call; every claim links to its source.',
    extra: ['deepsearch', 'research', 'web-search'],
  },
  // ---- multi-agent -------------------------------------------------------
  'dsh-swarm': {
    niche: 'multi-agent',
    headline: 'Multi-agent swarm orchestration for dsh',
    body: 'One declarative swarm - auditable routing, hard budget caps, and a shared run ledger; members run as dsh-bot manifests. Registered externally; promoted into the curated core as the flagship multi-agent name.',
    extra: ['swarm', 'multi-agent', 'orchestration'],
  },
  'dsh-delegate': {
    niche: 'multi-agent',
    headline: 'Delegation tool for dsh agents',
    body: 'A model-facing tool that lets one agent spawn, supervise, and collect from sub-agents - spawn depth and token budgets capped by policy; the primitive under crews and swarms.',
    extra: ['delegate', 'subagent', 'spawn'],
  },
  'dsh-queue': {
    niche: 'multi-agent',
    headline: 'Durable task queues for dsh bots',
    body: 'Named queues with priorities, visibility timeouts, and dead-letter handling - the persistent backbone dsh-jobs dispatches over; local files first, no broker required.',
    extra: ['queue', 'jobs', 'tasks'],
  },
  'dsh-council': {
    niche: 'multi-agent',
    headline: 'Council-of-agents deliberation for dsh',
    body: 'N agents answer independently, critique, and converge - debate as a harness surface for high-stakes calls; verdicts ship with recorded dissent.',
    extra: ['council', 'debate', 'consensus'],
  },
  'dsh-bots': {
    niche: 'agent capabilities',
    headline: 'The plural form of the dsh bot framework',
    body: 'Compatibility name: the bot framework ships as dsh-bot; this form keeps the plural spelling installable.',
    extra: ['bot', 'bots'],
  },
  'dsh-agent': {
    niche: 'agent capabilities',
    headline: 'Agent pattern library for dsh',
    body: 'Ready-made agent patterns - researcher, reviewer, runner - as preset rows you can fork; the singular companion to the agent registry (dsh-agents).',
    extra: ['agent', 'patterns'],
  },
  'dsh-workflows': {
    niche: 'agent capabilities',
    headline: 'The plural form of Workflow Studio',
    body: 'Compatibility name: Workflow Studio ships as dsh-workflow; this form keeps the plural spelling installable.',
    extra: ['workflow', 'workflows'],
  },
  'dsh-channels': {
    niche: 'agent capabilities',
    headline: 'Chat-channel framework for dsh bots',
    body: 'The shared substrate the community platform bridges plug into - telegram, discord, slack, and feishu adapters all speak one channel contract, with approvals gated per platform.',
    extra: ['channels', 'chat', 'bridge'],
  },
  'dsh-tasks': {
    niche: 'agent capabilities',
    headline: 'Durable task tracking for dsh sessions',
    body: 'Checklist state that survives compaction and session switches, linked from planner trees and surfaced in the GUI.',
    extra: ['tasks', 'todo', 'checklist'],
  },
  // ---- ui ----------------------------------------------------------------
  'dsh-panel': {
    niche: 'ui',
    headline: 'Custom panel framework for the dsh web GUI',
    body: 'Compose your own side panels from widgets - layout saved per profile, panels hot-swappable.',
    extra: [],
  },
  'dsh-widget': {
    niche: 'ui',
    headline: 'Widget library for the dsh web GUI',
    body: 'Clocks, token meters, status tiles - small composable widgets for custom panels and the home view.',
    extra: [],
  },
  'dsh-zen': {
    niche: 'ui',
    headline: 'Zen mode for the dsh web GUI',
    body: 'Distraction-free single-column typography - hide chrome, widen the conversation, keep the keyboard.',
    extra: [],
  },
  'dsh-sound': {
    niche: 'ui',
    headline: 'Sound design for the DeepSeek Harness',
    body: 'Subtle completion and approval-ready chimes - off by default, tasteful when on.',
    extra: [],
  },
  'dsh-files': {
    niche: 'ui',
    headline: 'File manager panel for the dsh web GUI',
    body: "Browse and edit workspace files in the GUI, with every write passing the harness approval seam. The Finder's sibling: browsing when you know where things are.",
    extra: [],
  },
  'dsh-diff': {
    niche: 'ui',
    headline: 'Turn diff viewer for the dsh web GUI',
    body: 'Review every file edit a turn made, side by side, before or after approval - one glance instead of scrolling tool output.',
    extra: ['diff'],
  },
  // ---- data --------------------------------------------------------------
  'dsh-export': {
    niche: 'data',
    headline: 'Export sessions from the DeepSeek Harness',
    body: 'Markdown, PDF, JSON - images and tool output inlined, one session or the whole home.',
    extra: ['export'],
  },
  'dsh-archive': {
    niche: 'data',
    headline: 'Archive cold sessions to compressed bundles',
    body: 'Move old sessions out of the live store, keep them searchable without unpacking, restore on demand.',
    extra: [],
  },
  'dsh-cloud': {
    niche: 'data',
    headline: 'Cloud sync for dsh homes',
    body: 'Encrypted session and settings sync to your own storage backend - no vendor lock, endpoints you choose.',
    extra: ['sync'],
  },
  'dsh-link': {
    niche: 'data',
    headline: 'Share links for dsh sessions',
    body: 'Publish a read-only snapshot of a conversation - one command, one URL, no account.',
    extra: ['sharing'],
  },
  // ---- ops ---------------------------------------------------------------
  'dsh-logs': {
    niche: 'ops',
    headline: 'Structured log viewer for the dsh host',
    body: 'Filter by session, tool, or level; jump from a log line to the conversation node that produced it.',
    extra: ['logs'],
  },
  'dsh-metrics': {
    niche: 'ops',
    headline: 'Token and latency metrics for the DeepSeek Harness',
    body: 'Per session, model, and provider - with daily budgets and a spend projection.',
    extra: ['metrics', 'tokens'],
  },
  'dsh-alert': {
    niche: 'ops',
    headline: 'Alerts for dsh sessions',
    body: 'Webhooks, sound, or system notification when a session needs input or fails - walk away safely.',
    extra: ['alerts', 'notifications'],
  },
  'dsh-health': {
    niche: 'ops',
    headline: 'Live health status for dsh installs',
    body: "Liveness of the web host, model adapters, and credentials at a glance - the always-on display to dsh-selfrepair's repair.",
    extra: ['health'],
  },
  'dsh-clean': {
    niche: 'ops',
    headline: 'Safe-clean the dsh home',
    body: 'Caches, spill files, stale backups - a preview of exactly what goes, then it goes.',
    extra: [],
  },
  'dsh-reset': {
    niche: 'ops',
    headline: 'Reset dsh profiles to a known state',
    body: 'Snapshot before experimenting, restore after - the whole profile, not just settings.',
    extra: [],
  },
  'dsh-serve': {
    niche: 'ops',
    headline: 'Serve-mode extras for the dsh web GUI',
    body: 'Auth, TLS, and shareable URLs for the web GUI on a LAN - one flag, safe defaults.',
    extra: [],
  },
  'dsh-jobs': {
    niche: 'ops',
    headline: 'Background jobs for dsh bots',
    body: 'The execution half of the bot framework - queued and recurring runs with logs, retries, and a dead-letter view.',
    extra: ['jobs', 'queue', 'cron'],
  },
  // ---- security ----------------------------------------------------------
  'dsh-secrets': {
    niche: 'security',
    headline: 'Secrets handling for dsh agents',
    body: 'Reference credentials by name, never paste values into prompts - agent sees the reference, never the key.',
    extra: ['secrets'],
  },
  'dsh-policy': {
    niche: 'security',
    headline: 'Approval policy engine for the DeepSeek Harness',
    body: 'Per-tool, per-path rules that decide which agent actions need a human - versioned with the repo, not clicked in a dialog.',
    extra: ['policy', 'approval'],
  },
  'dsh-permission': {
    niche: 'security',
    headline: 'Permission scopes for dsh tools',
    body: 'Grant a session read-only, write-scope, or network access explicitly - scopes shown live in the header.',
    extra: ['permissions'],
  },
  // ---- work & hiring -----------------------------------------------------
  'dsh-hiring': {
    niche: 'work & hiring',
    headline: 'Hiring workflow for engineering teams',
    body: 'From JD to offer - screening rubrics, interview kits, and scorecards the agent drafts and the human approves; every candidate decision traceable to evidence. Pairs with dsh-recruit and dsh-hr.',
    extra: ['hiring', 'recruiting', 'ats'],
  },
  'dsh-job': {
    niche: 'work & hiring',
    headline: 'The singular form of the background-jobs runner',
    body: 'Compatibility name: background jobs ship as dsh-jobs; this form keeps the singular spelling installable.',
    extra: ['job', 'jobs'],
  },
  'dsh-talent': {
    niche: 'work & hiring',
    headline: 'Talent pool manager',
    body: 'A local, private candidate database - search by skill graph, track outreach and status, export anytime; an ATS you own, no SaaS lock-in.',
    extra: ['talent', 'ats', 'candidates'],
  },
  'dsh-jd': {
    niche: 'work & hiring',
    headline: 'Job description library',
    body: 'Versioned JD templates with skill and level ladders - draft, diff, and reuse across openings; the recruiter counterpart to dsh-snippets.',
    extra: ['jd', 'job-description'],
  },
  'dsh-headhunt': {
    niche: 'work & hiring',
    headline: 'Headhunter workbench',
    body: 'Outreach sequences, candidate pipelining, and engagement notes for agency recruiters - batch research on companies and roles, agent-drafted messages with human review.',
    extra: ['headhunt', 'recruiter', 'outreach'],
  },
  // ---- meta / product ----------------------------------------------------
  'dsh-studio': {
    niche: 'meta / product',
    headline: 'Studio shell for the DeepSeek Harness',
    body: 'Arrange sessions, workflows, and files in one persistent layout - the workbench around the conversation.',
    extra: [],
  },
  'dsh-hub': {
    niche: 'meta / product',
    headline: 'Local plugin hub for dsh installs',
    body: 'Your inventory, not a marketplace - installed plugins, their dependency graph, and one-click updates.',
    extra: [],
  },
  'dsh-forge': {
    niche: 'meta / product',
    headline: 'Scaffold new dsh plugins from templates',
    body: "Typed, tested, CI-wired plugin in one command - the generator this suite's own plugins were built with.",
    extra: ['scaffold', 'template'],
  },
  'dsh-canvas': {
    niche: 'meta / product',
    headline: 'Infinite canvas for the DeepSeek Harness',
    body: 'Pin conversation nodes, diffs, and notes spatially - thought work in two dimensions.',
    extra: [],
  },
  'dsh-suite': {
    niche: 'meta / product',
    headline: 'The full suite installer',
    body: 'Every plugin from this developer in one add - finder, git, diff, search, and the rest, pre-wired to agree with each other.',
    extra: [],
  },
  'dsh-workspace': {
    niche: 'meta / product',
    headline: 'Workspace manager for the DeepSeek Harness',
    body: 'Per-project personas, keymaps, and model pins that follow the directory you launch from.',
    extra: [],
  },
  'dsh-profiles': {
    niche: 'meta / product',
    headline: 'Profile manager for the DeepSeek Harness',
    body: 'Create, clone, switch, and inspect dsh profiles from the settings page, each with its own plugin manifest and patch layer.',
    extra: [],
  },
  'dsh-persona': {
    niche: 'meta / product',
    headline: 'Persona marketplace for the DeepSeek Harness',
    body: 'Install, switch, and pin agent personas (dsh-persona rows) from the GUI, with a community listing and per-profile overrides.',
    extra: ['persona'],
  },
  'dsh-skill': {
    niche: 'meta / product',
    headline: 'Skill manager for the DeepSeek Harness',
    body: 'Browse, install, enable, and pin agent skills from the settings page - catalogs, badges, and version pinning in one panel.',
    extra: ['skills'],
  },
  'dsh-update': {
    niche: 'meta / product',
    headline: 'Update manager for the DeepSeek Harness',
    body: 'Check and apply updates for dsh itself and every installed plugin from the GUI, with rollback from the backups each update leaves behind.',
    extra: [],
  },
  // ---- harness surfaces --------------------------------------------------
  'dsh-finder': {
    niche: 'harness surfaces',
    headline: 'File & command palette for the dsh web GUI',
    body: 'Fuzzy-find files in the workspace, jump between sessions, and invoke any slash command - Ctrl+P for the DeepSeek Harness web UI. Pairs with the Workflow Studio suite (dsh-workflow).',
    extra: [],
  },
  'dsh-notes': {
    niche: 'harness surfaces',
    headline: 'Durable notes the agent can see',
    body: 'A persistent scratchpad exposed as a model-facing tool and a sidebar panel - what the agent writes survives compaction and session switches.',
    extra: [],
  },
  'dsh-snippets': {
    niche: 'harness surfaces',
    headline: 'Prompt snippet library for the DeepSeek Harness',
    body: 'Reusable prompt fragments insertable into any session, stored as plain files so they stay versionable and shareable.',
    extra: [],
  },
  'dsh-prompts': {
    niche: 'harness surfaces',
    headline: 'Prompt library for the DeepSeek Harness',
    body: 'Versioned prompt templates attachable to any session or bot run - the fuller sibling of the snippet library.',
    extra: ['prompts', 'templates'],
  },
  'dsh-vscode': {
    niche: 'harness surfaces',
    headline: 'VS Code bridge for the DeepSeek Harness',
    body: 'Open the current workspace or session in VS Code, and drive dsh agents from the editor over the ACP stack.',
    extra: ['vscode'],
  },
  'dsh-zed': {
    niche: 'harness surfaces',
    headline: 'Zed bridge for the DeepSeek Harness',
    body: 'Drive dsh agents from Zed over the Agent Client Protocol - the editor-native counterpart to the VS Code bridge.',
    extra: ['zed', 'acp'],
  },
  'dsh-cursor': {
    niche: 'harness surfaces',
    headline: 'Cursor bridge for the DeepSeek Harness',
    body: 'Open dsh sessions and diffs in Cursor, and hand agent context to the editor - the third editor dock after VS Code and Zed.',
    extra: ['cursor'],
  },
  'dsh-i18n': {
    niche: 'harness surfaces',
    headline: 'Locale packs for the dsh web GUI',
    body: 'Community translations for the DeepSeek Harness web UI - zh, en, ja, and more - as drop-in packs with per-profile selection.',
    extra: ['i18n', 'locale'],
  },
  'dsh-keymap': {
    niche: 'harness surfaces',
    headline: 'Keyboard shortcut manager for the dsh web GUI',
    body: 'Custom chords, vim-mode presets, and importable keymaps for the DeepSeek Harness web UI.',
    extra: ['keymap'],
  },
  'dsh-completions': {
    niche: 'harness surfaces',
    headline: 'Shell completions for the dsh launcher',
    body: 'bash / zsh / fish completion recipes for the dsh CLI and plugin binaries like dsh-selfrepair.',
    extra: [],
  },
  // ---- protocols ----------------------------------------------------------
  'dsh-lsp': {
    niche: 'protocols',
    headline: 'Language Server Protocol bridge for the DeepSeek Harness',
    body: 'Diagnostics, hover, and go-to-definition from any language server, delivered to dsh agents and the web GUI - LSP as the editing interop seam, alongside MCP and A2A.',
    extra: ['lsp', 'language-server', 'protocol'],
  },
}

// External waves live in catalog-external.mjs (generated); merge them in so
// this file stays the hand-curated core and the union remains the catalog.
// Core wins on collision so promoted entries (e.g. dsh-swarm) are not
// shadowed by the generated external record.
export const CATALOG = { ...EXTERNAL, ...CORE }

// Packages with real shipped code - excluded from placeholder generation.
export const REAL_PACKAGES = ['dsh-selfrepair', 'dsh-workflow', 'dsh-bot']

export const PLACEHOLDER_VERSION = '0.0.1'
