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
  'role presets',
  'interaction',
  'evaluation',
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

export const CORE = {
  // ---- model bridges ----------------------------------------------------
  'dsh-ollama': {
    niche: 'model bridges',
    headline: 'Ollama model bridge',
    body: 'Local models as dsh providers - the Ollama catalog exposed through the LLM adapter seam, zero egress by default. Registered externally; promoted into the curated core.',
    extra: ['ollama', 'local', 'llama'],
  },
  'dsh-openrouter': {
    niche: 'model bridges',
    headline: 'OpenRouter model bridge',
    body: 'Every OpenRouter model as a dsh provider - one key, hundreds of models, routing decisions and pricing surfaced per turn. Registered externally; promoted into the curated core.',
    extra: ['openrouter', 'routing', 'bridge'],
  },
  'dsh-mistral': {
    niche: 'model bridges',
    headline: 'Mistral model bridge',
    body: 'Mistral endpoints as dsh providers - open-weight European models with per-turn pricing. Registered externally; promoted into the curated core.',
    extra: ['mistral', 'bridge'],
  },
  'dsh-cohere': {
    niche: 'model bridges',
    headline: 'Cohere model bridge',
    body: 'Cohere endpoints as dsh providers - Command R and rerank surfaces exposed for retrieval-heavy work. Registered externally; promoted into the curated core.',
    extra: ['cohere', 'rag'],
  },
  'dsh-groq': {
    niche: 'model bridges',
    headline: 'Groq model bridge',
    body: 'Groq LPU speed for open models as dsh providers - tokens/second surfaced in the metrics line. Registered externally; promoted into the curated core.',
    extra: ['groq', 'fast', 'bridge'],
  },
  'dsh-vllm': {
    niche: 'model bridges',
    headline: 'vLLM model bridge',
    body: 'Self-hosted vLLM serving as a dsh provider - your GPUs, your endpoints, batch throughput surfaced. Registered externally; promoted into the curated core.',
    extra: ['vllm', 'self-hosted', 'gpu'],
  },
  'dsh-together': {
    niche: 'model bridges',
    headline: 'Together AI model bridge',
    body: 'Together endpoints as dsh providers - open-model serving with per-turn pricing. Registered externally; promoted into the curated core.',
    extra: ['together', 'bridge'],
  },
  'dsh-lmstudio': {
    niche: 'model bridges',
    headline: 'LM Studio model bridge',
    body: "LM Studio's local server as a dsh provider - desktop-class local models, no egress. Registered externally; promoted into the curated core.",
    extra: ['lmstudio', 'local'],
  },
  'dsh-glm': {
    niche: 'model bridges',
    headline: 'GLM model bridge',
    body: 'Zhipu GLM models as dsh providers - bilingual strength and agentic tool use surfaced per turn. Registered externally; promoted into the curated core.',
    extra: ['glm', 'zhipu'],
  },
  'dsh-doubao': {
    niche: 'model bridges',
    headline: 'Doubao model bridge',
    body: 'ByteDance Doubao models as dsh providers - Volcano endpoints, pricing per turn. Registered externally; promoted into the curated core.',
    extra: ['doubao', 'bytedance'],
  },
  'dsh-minimax': {
    niche: 'model bridges',
    headline: 'MiniMax model bridge',
    body: 'MiniMax models as dsh providers - long-context strength surfaced in the budget line. Registered externally; promoted into the curated core.',
    extra: ['minimax', 'bridge'],
  },
  'dsh-baichuan': {
    niche: 'model bridges',
    headline: 'Baichuan model bridge',
    body: 'Baichuan models as dsh providers through the LLM adapter seam - Chinese-language strength, pricing surfaced per turn.',
    extra: ['baichuan', 'llm', 'bridge'],
  },
  'dsh-perplexity': {
    niche: 'model bridges',
    headline: 'Perplexity bridge for sourced answers',
    body: 'Routes questions through Sonar endpoints - answers arrive with citations, mapped into the harness citation surface; the search-grounded provider.',
    extra: ['perplexity', 'search', 'citations'],
  },
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
  'dsh-windsurf': {
    niche: 'developer tools',
    headline: 'Windsurf IDE bridge',
    body: 'Run dsh sessions from the Windsurf editor - selection as context, diffs applied in place; the IDE seam beside dsh-cursor and dsh-zed.',
    extra: ['windsurf', 'ide', 'editor'],
  },
  'dsh-tmux': {
    niche: 'developer tools',
    headline: 'tmux surface for dsh',
    body: 'Panes as sessions - spawn a bot per pane, live status in the status bar, pane titles as presence; terminal-native parallelism for dsh-bot fleets.',
    extra: ['tmux', 'terminal', 'multiplexer'],
  },
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
  // ---- role presets ------------------------------------------------------
  // The persona form of the multi-agent story: one install = one role seat
  // for a session, a crew, or a swarm. Third-party dsh-crew ships fixed
  // roles; these names keep every role composable and ours.
  'dsh-frontend': {
    niche: 'role presets',
    headline: 'Frontend developer role preset',
    body: 'A frontend specialist persona - component architecture instincts, accessibility and bundle-size reflexes, edit proposals biased toward the rendering layer. Composes into crews and swarms as the frontend seat.',
    extra: ['frontend', 'react', 'vue', 'persona'],
  },
  'dsh-backend': {
    niche: 'role presets',
    headline: 'Backend developer role preset',
    body: 'A backend specialist persona - API and schema design, failure modes, caching and concurrency instincts; the counterpart to dsh-frontend and the default engineer seat in any crew.',
    extra: ['backend', 'api', 'server', 'persona'],
  },
  'dsh-fullstack': {
    niche: 'role presets',
    headline: 'Full-stack developer role preset',
    body: 'The generalist persona that inherits both ends - biased toward shipping vertical slices end to end, with the judgment to know when to split work into specialists.',
    extra: ['fullstack', 'persona'],
  },
  'dsh-dev': {
    niche: 'role presets',
    headline: 'Developer role preset (short form)',
    body: 'Compatibility name: the generic developer persona; the specialist forms ship as dsh-frontend and dsh-backend.',
    extra: ['dev', 'developer', 'persona'],
  },
  'dsh-engineer': {
    niche: 'role presets',
    headline: 'Software engineer role preset',
    body: 'The discipline-first engineer persona - tests before refactors, small diffs, reversible changes; the seat every other preset composes with.',
    extra: ['engineer', 'persona'],
  },
  'dsh-devops': {
    niche: 'role presets',
    headline: 'DevOps role preset',
    body: 'Pipelines, containers, and environments as first-class citizens - a persona that reads CI logs like prose and treats infrastructure as code. Registered externally; promoted into the curated core.',
    extra: ['devops', 'ci', 'infra', 'persona'],
  },
  'dsh-sre': {
    niche: 'role presets',
    headline: 'Site reliability engineer role preset',
    body: 'The SRE persona - SLIs and SLOs, incident forensics, blameless postmortems; biased toward observability and rollback paths over feature work. Registered externally; promoted into the curated core.',
    extra: ['sre', 'reliability', 'incident', 'persona'],
  },
  'dsh-dba': {
    niche: 'role presets',
    headline: 'Database administrator role preset',
    body: 'Schema reviews, index strategy, and query plans - the DBA persona for crews touching data layers; the role behind the dsh-db tool surface.',
    extra: ['dba', 'database', 'persona'],
  },
  'dsh-architect': {
    niche: 'role presets',
    headline: 'Software architect role preset',
    body: 'System-level judgment - boundaries, seams, and tradeoff memos before code; the architect seat crews consult before the first commit.',
    extra: ['architect', 'design', 'persona'],
  },
  'dsh-designer': {
    niche: 'role presets',
    headline: 'Product designer role preset',
    body: 'Interface judgment as a persona - hierarchy, typography, and flow critiques on the diffs a crew produces; pairs with dsh-ux.',
    extra: ['designer', 'ui', 'persona'],
  },
  'dsh-tester': {
    niche: 'role presets',
    headline: 'QA tester role preset',
    body: 'The quality persona - test matrices, edge cases, and regression instincts applied to every proposal; the adversarial reader every crew needs. (The qa-spelled name ships as a community package.)',
    extra: ['tester', 'qa', 'quality', 'persona'],
  },
  'dsh-analyst': {
    niche: 'role presets',
    headline: 'Data analyst role preset',
    body: 'Questions before dashboards - the analyst persona that frames metrics, guards against survivorship bias, and writes SQL you can audit.',
    extra: ['analyst', 'data', 'persona'],
  },
  'dsh-algorithm': {
    niche: 'role presets',
    headline: 'Algorithm engineer role preset',
    body: 'The algorithms persona - complexity instincts, evaluation methodology, and the honesty to prefer boring solutions; complements dsh-ml.',
    extra: ['algorithm', 'persona'],
  },
  'dsh-ios': {
    niche: 'role presets',
    headline: 'iOS developer role preset',
    body: 'The Apple-platform specialist - Swift conventions, interface-guideline reflexes, and App Store release hygiene.',
    extra: ['ios', 'swift', 'persona'],
  },
  'dsh-android': {
    niche: 'role presets',
    headline: 'Android developer role preset',
    body: 'The Android specialist - Kotlin idioms, fragmentation strategy, and Play release hygiene.',
    extra: ['android', 'kotlin', 'persona'],
  },
  'dsh-embedded': {
    niche: 'role presets',
    headline: 'Embedded developer role preset',
    body: 'Firmware and hardware-adjacent judgment - resource ceilings, timing, and safety margins; the persona for crews that ship to devices.',
    extra: ['embedded', 'firmware', 'persona'],
  },
  'dsh-security': {
    niche: 'role presets',
    headline: 'Security engineer role preset',
    body: 'The adversarial persona - threat modeling, dependency audits, and secrets hygiene; pairs with dsh-secrets and dsh-policy.',
    extra: ['security', 'appsec', 'persona'],
  },
  'dsh-researcher': {
    niche: 'role presets',
    headline: 'Researcher role preset',
    body: "The crew's evidence gatherer - sourced claims, primary documents, and the discipline to say what is not known; the role third-party crew packages made popular, as a standalone preset.",
    extra: ['research', 'persona'],
  },
  'dsh-product-manager': {
    niche: 'role presets',
    headline: 'Product manager role preset',
    body: 'The PM persona - scope carving, acceptance criteria, and status prose that executives actually read; the default non-engineering seat in a crew. (The pm-spelled name ships as a community package.)',
    extra: ['product-manager', 'pm', 'persona'],
  },
  'dsh-hiring-manager': {
    niche: 'role presets',
    headline: 'Hiring manager role preset',
    body: 'The hiring-manager persona - bar calibration, interview debriefs, and evidence-based scorecards over the dsh-hiring pipeline.',
    extra: ['hiring-manager', 'interview', 'persona'],
  },
  'dsh-engineering-manager': {
    niche: 'role presets',
    headline: 'Engineering manager role preset',
    body: 'The EM persona - growth feedback, delegation plans, and delivery-risk reads; the management counterpart to dsh-architect.',
    extra: ['engineering-manager', 'persona'],
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
  // ---- interaction -------------------------------------------------------
  // The attention/voice/input layer - patterns the best agents proved:
  // interruptible voice (ChatGPT), mid-run steering (Claude Code),
  // @-mentions (Cursor), ambient presence (Devin). The interaction layer
  // is the second-most-colonized niche after multi-agent; nine names
  // (speak, notify, status, hud, theme, feedback, replay, pulse, history)
  // already ship as third-party community packages.
  'dsh-tts': {
    niche: 'interaction',
    headline: 'Spoken status and voice alerts for dsh sessions',
    body: 'The voice-alert layer - results summaries, approval-ready prompts, and bot outcomes spoken aloud (macOS say / Windows SAPI / Piper); pluggable voices, off by default.',
    extra: ['tts', 'speech', 'voice', 'alerts'],
  },
  'dsh-stt': {
    niche: 'interaction',
    headline: 'Speech-to-text input for dsh sessions',
    body: "Dictate prompts to any session - push-to-talk and hands-free modes, locally processed by default (whisper.cpp); typed input's faster sibling.",
    extra: ['stt', 'dictation', 'whisper', 'voice'],
  },
  'dsh-speech': {
    niche: 'interaction',
    headline: 'Bidirectional voice mode with barge-in',
    body: 'The agent speaks and listens with interruptible back-and-forth - speak to redirect mid-answer; the ChatGPT-voice pattern for a harness, composed from dsh-tts and dsh-stt.',
    extra: ['voice', 'speech', 'conversation'],
  },
  'dsh-wake': {
    niche: 'interaction',
    headline: 'Wake-word activation for the voice loop',
    body: "A local 'hey dsh' spotter that opens the voice loop from anywhere - no cloud round-trip, no always-on recording that leaves the machine.",
    extra: ['wake-word', 'voice', 'hands-free'],
  },
  'dsh-audio': {
    niche: 'interaction',
    headline: 'Audio I/O substrate for the harness',
    body: 'The shared layer dsh-tts and dsh-stt build on - device selection, voice-activity detection, and output routing in one service. Registered externally; promoted into the curated core.',
    extra: ['audio', 'io'],
  },
  'dsh-toast': {
    niche: 'interaction',
    headline: 'Toast notifications for the dsh web GUI',
    body: 'Transient, stackable, clickable in-app notices - run finished, approval ready, budget hit. (The notify-spelled desktop bridge ships as a community package.)',
    extra: ['toast', 'notification'],
  },
  'dsh-bell': {
    niche: 'interaction',
    headline: 'Terminal bell and title management',
    body: 'The minimal attention primitive - bell on approval-ready and completion, plus live terminal-title state (model, elapsed, waiting-on) for every session tab.',
    extra: ['bell', 'terminal'],
  },
  'dsh-dnd': {
    niche: 'interaction',
    headline: 'Focus-aware notification routing',
    body: 'Do-not-disturb that actually routes - silence during focus sessions, batch digests after, escalate only what matters; the policy layer over dsh-alert and dsh-toast.',
    extra: ['dnd', 'focus', 'mute'],
  },
  'dsh-nudge': {
    niche: 'interaction',
    headline: 'Proactive agent check-ins',
    body: 'The agent nudges you when it needs a decision, when a run has waited too long, or when work finished while you were away - a cadence you configure, not a firehose.',
    extra: ['nudge', 'reminder'],
  },
  'dsh-presence': {
    niche: 'interaction',
    headline: 'Teammate presence for agents',
    body: 'Working / thinking / waiting-on-you states exposed like a chat contact list, so parallel sessions read at a glance. (The status-spelled line ships as a community package.)',
    extra: ['presence', 'status'],
  },
  'dsh-progress': {
    niche: 'interaction',
    headline: 'Progress affordances for long work',
    body: 'Plan trees rendered as trackable progress with ETAs - in the GUI as bars, in the terminal as one-line summaries that stay honest.',
    extra: ['progress', 'eta'],
  },
  'dsh-ambient': {
    niche: 'interaction',
    headline: 'Ambient status display',
    body: 'A desk-clock mode for a spare screen or tablet - live session presence, budgets, and the current action, glanceable from across the room.',
    extra: ['ambient', 'dashboard'],
  },
  'dsh-next': {
    niche: 'interaction',
    headline: 'Next-step suggestions after each answer',
    body: 'Continue, commit, test, or delegate - one-click follow-ups that keep momentum; the Copilot-pattern affordance. Registered externally; promoted into the curated core.',
    extra: ['next', 'suggestions'],
  },
  'dsh-attach': {
    niche: 'interaction',
    headline: 'Attachments for prompts',
    body: 'Drag-and-drop files, screenshots, and images into any session; paste-as-file; everything lands in the workspace, not in chat limbo.',
    extra: ['attach', 'upload', 'paste'],
  },
  'dsh-mention': {
    niche: 'interaction',
    headline: '@-mentions in prompts',
    body: '@file, @dir, @agent, and @bot references resolved at prompt time into exact context - the reference grammar Cursor made essential.',
    extra: ['mention', 'reference'],
  },
  'dsh-steer': {
    niche: 'interaction',
    headline: 'Mid-run steering',
    body: 'Queue messages and redirects while the agent works - they land at the next checkpoint instead of being lost or interrupting; the Claude Code pattern.',
    extra: ['steer', 'queue'],
  },
  'dsh-autocomplete': {
    niche: 'interaction',
    headline: 'Prompt autocomplete',
    body: 'History- and workspace-aware completion for the prompt box; distinct from shell completions (dsh-completions).',
    extra: ['autocomplete'],
  },
  'dsh-tour': {
    niche: 'interaction',
    headline: 'Interactive product tours',
    body: 'First-run walkthroughs for panels and features, step-annotated in the live GUI - the onboarding layer mature products ship. (Community theme packs ship separately.)',
    extra: ['tour', 'onboarding'],
  },
  'dsh-mirror': {
    niche: 'interaction',
    headline: 'Mirror a session to a second surface',
    body: 'A read-only live view for another screen, browser, or projector - present what the agent is doing without leaning over shoulders.',
    extra: ['mirror', 'screen'],
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
  'dsh-headless': {
    niche: 'ops',
    headline: 'Headless mode toolkit',
    body: 'The no-GUI invocation contract - profile setup, prompt capture, and exit-code discipline for headless dsh runs; the layer dsh-bot spawns through.',
    extra: ['headless', 'cli', 'automation'],
  },
  'dsh-daemon': {
    niche: 'ops',
    headline: 'Background daemon for dsh bots',
    body: 'A launchd/systemd-friendly supervisor that keeps scheduled bots alive - starts on boot, restarts on crash, fronts the dsh-bot health socket.',
    extra: ['daemon', 'service', 'supervisor'],
  },
  'dsh-run': {
    niche: 'ops',
    headline: 'Programmatic one-shot runner',
    body: 'Run a dsh session from code or CI - argv in, structured result out; the thin sibling of dsh-bot for non-scheduled work.',
    extra: ['run', 'runner', 'ci'],
  },
  'dsh-sessions': {
    niche: 'ops',
    headline: 'Session manager and browser',
    body: 'List, inspect, and resume past dsh sessions from terminal or GUI - filters by project, date, and outcome; the multi-session ops view.',
    extra: ['sessions', 'resume', 'history'],
  },
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
  'dsh-registry': {
    niche: 'meta / product',
    headline: 'Local plugin registry',
    body: "An index of everything installed across profiles - plugins, presets, skills, with versions and provenance; the registry behind the hub panel. (Community stores and marketplaces ship separately.)",
    extra: ['registry', 'plugins', 'index'],
  },
  'dsh-hub': {
    niche: 'meta / product',
    headline: 'The plugin hub panel',
    body: "Browse, install, update, and remove harness extensions from the dsh web GUI - one view over every profile's inventory. Registered externally; promoted into the curated core.",
    extra: ['hub', 'plugins', 'panel'],
  },
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
  // ---- evaluation --------------------------------------------------------
  // Quality rails for agent output: judged runs, reproducible rubrics,
  // and edit coverage. (eval, bench, and score-spelled names already ship
  // as third-party community packages.)
  'dsh-judge': {
    niche: 'evaluation',
    headline: 'LLM-as-judge evaluation',
    body: 'Score agent output against a rubric with a second model pass - verdicts with per-criterion reasoning, disagreements flagged; pairs with dsh-council.',
    extra: ['judge', 'evaluation', 'llm-as-judge'],
  },
  'dsh-rubric': {
    niche: 'evaluation',
    headline: 'Scoring rubrics for agent work',
    body: 'Declarative rubric files - criteria, weights, pass thresholds - shared by dsh-judge and humans; the contract that makes evaluation reproducible.',
    extra: ['rubric', 'evaluation', 'scoring'],
  },
  'dsh-coverage': {
    niche: 'evaluation',
    headline: 'Agent edit coverage map',
    body: 'Which files, functions, and paths the agent actually touched - a coverage report for agent work, diffable run over run.',
    extra: ['coverage', 'report', 'diff'],
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
