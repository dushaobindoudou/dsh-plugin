/**
 * dsh-lingxi — the budget watch: the cat notices when the money runs out.
 *
 * "Token 不够用了" comes in two shapes and dsh already classifies both:
 *
 *  - ACCOUNT quota/balance. Every failed model attempt carries a provider-
 *    neutral `code` on LlmFailure (`dsh-llm` error.js): `QUOTA` is the
 *    canonical "exhausted account quota or balance" class. But coarser
 *    adapters leave only the wording — the installed freeroute, for one,
 *    maps terminal quota text (quota|配额|credit) onto `RATE_LIMIT` — so the
 *    classifier reads BOTH: the code first, the message text second, with
 *    the same terminal-wording shapes the core uses (insufficient /
 *    exceeded / exhausted / depleted over quota, balance, credit, budget)
 *    plus their Chinese counterparts (余额不足、配额/额度耗尽、欠费、免费档失效).
 *  - CONTEXT window. `CONTEXT_WINDOW_EXCEEDED` is the canonical "request
 *    larger than the model's context" code — the sudden sibling of the
 *    gradual rise that sense/context.js warns about at 80%.
 *
 * The `agent/request-error` waterfall carries every failed attempt BEFORE
 * the retry machinery decides anything, so this watch observes it (next()
 * passes through untouched) and speaks ONCE per (session, class) per quiet
 * window: quota exhaustion is a failed-class ALERT — the work is blocked
 * until the user tops up or switches routes — while a context-window
 * rejection reports once. Transient failures (rate limits without quota
 * wording, 5xx, aborts) never speak.
 *
 * The subject of every line is the session's freshest ask — TaskWatch
 * describes sessions from the user's own latest words, because the static
 * session title froze at birth while the work moved on.
 */

/** One bubble per (session, class) per this window. Retries of the same
 * dead request arrive seconds apart; the quiet window folds them into one. */
const QUIET_MS = 10 * 60_000
/** Cap on dedupe memory, so a chatty host cannot grow the map forever. */
const ANNOUNCED_CAP = 64

/** Canonical provider-neutral codes (dsh-llm error.js). */
const QUOTA_CODE = 'QUOTA'
const CONTEXT_CODE = 'CONTEXT_WINDOW_EXCEEDED'

/** Terminal quota wording — a request-rate limit says "too many requests",
 * never these. English shapes mirror the core's own classifier; the Chinese
 * shapes cover DeepSeek's and freeroute's localized failure text. */
const QUOTA_TEXT = new RegExp([
  'insufficient[\\s_-]*(?:quota|balance|credits?)',
  '(?:quota|usage[\\s_-]*limit)[\\s_-]*(?:exceeded|exhausted|reached)',
  '(?:balance|credits?)[\\s_-]*(?:exhausted|depleted)',
  'out[\\s_-]*of[\\s_-]*(?:credits?|budget)',
  '余额不足|(?:配额|额度|余额)(?:已)?(?:耗尽|用完|用尽|不足)|欠费',
  '免费(?:档|额度)(?:失效|用完|耗尽)',
].join('|'), 'i')

/**
 * One failed attempt → 'quota' | 'context' | null. Route on the code first
 * (the stable machine fact); fall back to terminal-quota wording in the
 * message, because adapters with coarser code tables still carry the words.
 * @param {{code?: unknown, message?: unknown}} [failure] - the LlmFailure.
 * @returns {'quota' | 'context' | null}
 */
export function classifyFailure(failure) {
  const code = typeof failure?.code === 'string' ? failure.code : ''
  if (code === QUOTA_CODE) return 'quota'
  if (code === CONTEXT_CODE) return 'context'
  const message = typeof failure?.message === 'string' ? failure.message : ''
  if (message !== '' && QUOTA_TEXT.test(message)) return 'quota'
  return null
}

export class BudgetWatch {
  /**
   * @param {object} options
   * @param {object} options.ctx - the plugin Context (ctx.on).
   * @param {object} options.bridge - PetBridge bound to current settings.
   * @param {() => object} options.getSettings - current validated settings.
   * @param {{describe?: (sessionId: string) => string | null}} [options.taskWatch]
   *   the task watch, for the freshest honest subject per session.
   */
  constructor({ ctx, bridge, getSettings, taskWatch }) {
    this.ctx = ctx
    this.bridge = bridge
    this.getSettings = getSettings
    this.taskWatch = taskWatch
    this.disposeFns = []
    /** @type {Map<string, number>} `${sessionId}|${class}` → last announced at */
    this.announced = new Map()
  }

  start() {
    if (this.ctx === undefined || typeof this.ctx.on !== 'function') return
    this.disposeFns.push(this.ctx.on('agent/request-error', async (payload, next) => {
      try {
        this.observe(payload)
      } catch (error) {
        console.error('dsh-lingxi budget watch: observe failed:', error instanceof Error ? error.message : error)
      }
      // Pure observer: the retry machinery must see the attempt untouched.
      return next()
    }))
  }

  stop() {
    for (const dispose of this.disposeFns) {
      try {
        dispose()
      } catch { /* a disposer that throws must not stop the others */ }
    }
    this.disposeFns = []
    this.announced.clear()
  }

  /**
   * One failed attempt, classified and (maybe) announced. The dedupe key is
   * (session, class): the same session may burn its account quota AND
   * overflow its context in one turn — those are two different sentences.
   * @param {{agent?: {id?: unknown}, provider?: unknown, failure?: unknown}} [payload]
   */
  observe(payload) {
    const kind = classifyFailure(payload?.failure)
    if (kind === null) return
    const id = payload?.agent?.id
    const sessionId = id !== undefined && id !== null ? String(id) : null
    const key = `${sessionId ?? '?'}|${kind}`
    const now = Date.now()
    if (now - (this.announced.get(key) ?? 0) < QUIET_MS) return
    if (this.announced.size >= ANNOUNCED_CAP && !this.announced.has(key)) {
      const oldest = [...this.announced.entries()].sort((a, b) => a[1] - b[1])[0]?.[0]
      if (oldest !== undefined) this.announced.delete(oldest)
    }
    this.announced.set(key, now)
    void this.speak(kind, sessionId, payload?.provider)
  }

  /**
   * The one bubble, in the cat's register — a fact and a way out, no drama.
   * @param {'quota' | 'context'} kind
   * @param {string | null} sessionId
   * @param {unknown} provider - the route the attempt died on.
   */
  async speak(kind, sessionId, provider) {
    const settings = this.getSettings()
    const subject = this.taskWatch?.describe?.(sessionId) ?? null
    const what = subject ? `「${subject}」` : ''
    const route = typeof provider === 'string' && provider.trim() ? provider.trim().slice(0, 40) : null
    const say = kind === 'quota'
      ? (route
        ? `${what}这条线路（${route}）额度不够了，垫一下或换条线路吧。`
        : `${what}模型额度不够了，垫一下或换条线路吧。`)
      : `${what}这步请求超出模型的上下文了，得先整理再继续。`
    await this.bridge.control({
      say,
      agent: settings.agentId,
      priority: kind === 'quota' ? 'alert' : 'report',
    })
  }
}
