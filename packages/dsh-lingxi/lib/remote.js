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

  /** Requirement 1 made visible: the running-task registry, as dsh sees it. */
  async tasks() {
    return {
      tasks: this.controller.listTasks(),
      watching: this.controller.isWatching(),
    }
  }

  /** Requirement 3 made visible: declarations + the pet app's live list. */
  async reminders() {
    const settings = this.controller.getSettings()
    const bridge = new PetBridge({ port: settings.port })
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
 * Mark the methods once and register the service on `ctx`. Returns null when
 * `ctx` is not a Cordis context capable of registering a Service (a test
 * double should not have to emulate the typert gateway).
 */
export function installLingxiRemote(ctx, controller) {
  if (ctx === undefined || ctx === null || ctx.reflect === undefined) return null
  for (const m of ['status', 'tasks', 'getSettings', 'setSettings', 'reminders', 'syncReminders', 'testSay']) {
    markRemoteMethod(LingxiRemote.prototype, m)
  }
  return new LingxiRemote(ctx, controller)
}
