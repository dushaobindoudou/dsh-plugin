/**
 * dsh-lingxi — host Remote namespace `lingxi`, the channel the settings page
 * uses. The browser half calls `connection.rpc.call('/api', 'lingxi/<method>',
 * …)`; methods return plain JSON only, business failures are `{ error }`
 * return values (the panel's error-display path), never thrown errors.
 *
 * Method surface:
 *  - status       — the pet app's own /health + /agents answers, plus settings
 *  - tasks        — what dsh is running right now (the task watch's registry)
 *  - getSettings / setSettings — the settings item itself
 *  - reminders    — declared reminders + the pet app's live list + last sync
 *  - syncReminders — push one sync pass now (the page's "同步到宠物" button)
 *  - testSay      — one live say, for the page's "does the cat answer" button
 */
import { PetBridge } from './pet-contract/index.js'
import { TASK_STATES, TASK_KINDS, TASK_MOODS } from './pet-contract/index.js'
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

/** Every method takes the same single wire field: the client's lingxiCall
 * always posts `{ args: { request } }` (null when absent), and no-param host
 * methods simply ignore the extra positional argument. */
const LINGXI_REMOTE_METHODS = ['status', 'tasks', 'sweep', 'activity', 'getSettings', 'setSettings', 'reminders', 'syncReminders', 'testSay']

/**
 * Compare the app's published /integration vocabulary against the lists this
 * plugin was built against. Returns null when the app did not answer; a
 * drifted list is named, not silently tolerated.
 */
function contractCheck(integration) {
  if (integration === undefined || integration === null) return null
  const result = integration.ok === true ? integration.data : null
  if (result === null || typeof result !== 'object') return null
  const published = result.taskEvent !== null && typeof result.taskEvent === 'object' ? result.taskEvent : null
  if (published === null) return { schemaVersion: result.schemaVersion ?? null, drift: ['taskEvent'] }
  const drift = []
  const compare = (ours, theirs, name) => {
    const list = Array.isArray(theirs) ? theirs.map(String) : null
    if (list === null || ours.some((word) => !list.includes(word))) drift.push(name)
  }
  compare(TASK_STATES, published.states, 'states')
  compare(TASK_KINDS, published.kinds, 'kinds')
  compare(TASK_MOODS, published.moods, 'moods')
  return {
    schemaVersion: Number.isFinite(result.schemaVersion) ? result.schemaVersion : null,
    drift,
  }
}

/**
 * The strict-registry contribution claiming the `lingxi/*` endpoints.
 *
 * Why this exists: the SRC marker path that `@Remote` feeds is keyed on a
 * WeakMap PRIVATE to the exact `@deepseek-ai/dsh-typert-protocol` module
 * instance. A link-mounted plugin can be loaded against a different instance
 * than the gateway's (its own node_modules copy), so the gateway's
 * `remoteMethods()` sees nothing and every `lingxi/*` call 404s. The strict
 * registry (`ctx.typert.register`) is the identity-free path the gateway
 * checks FIRST, so claiming the endpoints there survives any module split.
 * `src-json` codecs keep the boundary plain JSON, matching this namespace's
 * "return values, never thrown errors" design.
 */
export function lingxiTypertContribution() {
  return {
    package: 'dsh-lingxi',
    face: 'host',
    schemas: [],
    invocations: LINGXI_REMOTE_METHODS.map((method) => ({
      id: `dsh-lingxi#lingxi/${method}`,
      service: 'lingxi',
      namespace: 'lingxi',
      method,
      invocation: { kind: 'direct' },
      parameters: [
        { name: 'request', wire: 'request', source: 'json', codec: { mode: 'src-json' } },
      ],
      result: { mode: 'src-json' },
    })),
  }
}

/**
 * @param {object} ctx - the Cordis context (or a test double).
 * @param {object} controller - the live plugin state, built in index.js.
 */
export class LingxiRemote extends TypertRemoteService {
  constructor(ctx, controller) {
    super(ctx, 'lingxi')
    this.controller = controller
  }

  async status() {
    const settings = this.controller.getSettings()
    const bridge = new PetBridge({ port: settings.port, agentId: settings.agentId })
    const [health, agents, integration] = await Promise.all([bridge.health(), bridge.agents(), bridge.integration()])
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
      model: this.controller.environment(),
      // Live contract check against GET /integration: the app publishes the
      // vocabulary it actually enforces, so drift shows here instead of as
      // silently-dropped events.
      contract: contractCheck(integration),
    }
  }

  /** Requirement 1 made visible: the running-task registry, as dsh sees it. */
  async tasks() {
    return {
      tasks: this.controller.listTasks(),
      watching: this.controller.isWatching(),
    }
  }

  /** Run one reconcile pass now — the page's refresh, and tests' clock. */
  async sweep() {
    return this.controller.sweepNow()
  }

  /** The ambient feed: what the work is touching + live context occupancy. */
  async activity() {
    return this.controller.listActivity()
  }

  /** Requirement 3 made visible: declarations + the pet app's live list. */
  async reminders() {
    const settings = this.controller.getSettings()
    const bridge = new PetBridge({ port: settings.port, agentId: settings.agentId })
    const list = await bridge.reminders()
    const appEntries = list.ok === true && Array.isArray(list.data)
      ? list.data
        .filter((e) => typeof e?.text === 'string')
        .slice(0, 32)
        .map((e) => ({ id: String(e.id ?? ''), text: e.text, repeatEveryMinutes: Number(e.repeatEveryMinutes ?? e.repeat_every_minutes ?? 0) }))
      : []
    return {
      declared: this.controller.listDeclaredReminders(),
      appEntries,
      lastSync: this.controller.reminderSyncState(),
      available: list.ok === true || list.unreachable !== true,
    }
  }

  /** Push one sync pass from the page. */
  async syncReminders() {
    return this.controller.syncRemindersNow()
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

  async testSay(request) {
    const text = request !== null && typeof request === 'object' && typeof request.text === 'string'
      ? request.text
      : ''
    return this.controller.testSay(text)
  }
}

/**
 * Mark the methods once, claim the endpoints on the strict typert registry,
 * and register the service on `ctx`. Returns null when `ctx` is not a Cordis
 * context capable of registering a Service (a test double should not have to
 * emulate the typert gateway).
 *
 * The strict claim is the load-bearing half in a real mount: marker
 * discovery breaks when the plugin and the gateway resolve different
 * protocol module instances (see lingxiTypertContribution), while the
 * registry claim is identity-free. It is skipped when the host has no
 * `typert` service (smoke stubs) — the SRC markers above stay the fallback,
 * and the registry rejects a duplicate claim so both paths never fight.
 */
export function installLingxiRemote(ctx, controller) {
  if (ctx === undefined || ctx === null || ctx.reflect === undefined) return null
  for (const m of LINGXI_REMOTE_METHODS) markRemoteMethod(LingxiRemote.prototype, m)
  const service = new LingxiRemote(ctx, controller)
  const typert = typeof ctx.get === 'function' ? ctx.get('typert') : undefined
  if (typert !== undefined && typeof typert.register === 'function') {
    const disposeClaim = typert.register(lingxiTypertContribution())
    if (typeof disposeClaim === 'function') {
      ctx.effect(() => disposeClaim, 'dsh-lingxi: typert strict claim')
    }
  }
  return service
}
