/**
 * dsh-lingxi — host Remote namespace `lingxi`, the channel the settings page
 * uses. The browser half calls `connection.rpc.call('/api', 'lingxi/<method>',
 * …)`; methods return plain JSON only, business failures are `{ error }`
 * return values (the panel's error-display path), never thrown errors.
 *
 * `status` reads the bridge's OWN provided interfaces (/health, /integration,
 * /agents) — the settings page renders what the pet app says about itself,
 * not a cached copy.
 */
import { PetBridge } from './pet-contract/index.js'
import { Remote, TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol'

/** Apply one `@Remote(method)` marker without decorator syntax. */
function markRemoteMethod(prototype, method) {
  const decorator = Remote(method)
  decorator(undefined, {
    name: method,
    private: false,
    static: false,
    addInitializer(fn) { fn.call(Object.create(prototype)); },
  })
}

/**
 * @param {object} controller - the live plugin state, built in index.js.
 * @param {() => object} controller.getSettings - current validated settings.
 * @param {() => object} controller.getLoadInfo - what the mount read (ignored keys, read error).
 * @param {(patch: object) => object} controller.saveSettings - validate, persist, rebuild, return {settings, ignored}.
 * @param {(text: string) => Promise<object>} controller.testSay - one bridge say, for the page's test button.
 */
export class LingxiRemote extends TypertRemoteService {
  constructor(ctx, controller) {
    super(ctx, 'lingxi')
    this.controller = controller
  }

  /**
   * Everything the settings page needs for one paint: the pet app's own
   * health/contract (from ITS interfaces), the agent registry, and this
   * plugin's settings. Never throws — every bridge answer has a shape.
   */
  async status() {
    const settings = this.controller.getSettings()
    const bridge = new PetBridge({ port: settings.port })
    const [health, agents] = await Promise.all([bridge.health(), bridge.agents()])
    const running = health.ok === true
    const agentList = agents.ok === true && Array.isArray(agents.data?.agents)
      ? agents.data.agents
      : agents.ok === true && Array.isArray(agents.data)
        ? agents.data
        : []
    return {
      settings,
      loadInfo: this.controller.getLoadInfo(),
      bridge: {
        running,
        port: settings.port,
        baseUrl: bridge.baseUrl,
        detail: running ? String(health.data?.howTo ?? '').slice(0, 200) || null : (health.error ?? null),
      },
      agents: agentList.slice(0, 8).map((a) => ({
        id: String(a?.id ?? '').slice(0, 64),
        name: String(a?.name ?? a?.id ?? '').slice(0, 24),
        badge: String(a?.badge ?? '').slice(0, 2),
      })),
      meRegistered: agentList.some((a) => a?.id === settings.agentId),
    }
  }

  async getSettings() {
    return { settings: this.controller.getSettings(), loadInfo: this.controller.getLoadInfo() }
  }

  /**
   * Validate + persist + rebuild. Returns the stored settings and what was
   * ignored, so the page can show the exact effect of one save.
   */
  async setSettings(request) {
    const patch = request !== null && typeof request === 'object' ? request : {}
    return this.controller.saveSettings(patch)
  }

  /** One live `say` through the bridge — the page's "does the cat answer" button. */
  async testSay(request) {
    const text = request !== null && typeof request === 'object' && typeof request.text === 'string'
      ? request.text
      : ''
    return this.controller.testSay(text)
  }
}

/**
 * Mark the methods once and register the service on `ctx`. Returns null when
 * `ctx` is not a Cordis context capable of registering a Service (a test
 * double should not have to emulate the typert gateway).
 */
export function installLingxiRemote(ctx, controller) {
  if (ctx === undefined || ctx === null || ctx.reflect === undefined) return null
  for (const m of ['status', 'getSettings', 'setSettings', 'testSay']) markRemoteMethod(LingxiRemote.prototype, m)
  return new LingxiRemote(ctx, controller)
}
