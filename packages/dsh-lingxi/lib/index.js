/**
 * dsh-lingxi — host half.
 *
 * The mount order tells the layered story (README has the diagram):
 *
 *   settings → bridge → identity (with the dsh logo) → tools
 *            → task watch (events + reconcile) → attention notifier
 *            → reminder sync → lingxi Remote namespace → announce
 *
 * Requirements this wiring satisfies:
 *  1. 知道现在正在运行哪些任务 — TaskWatch (lib/tasks.js): dsh lifecycle
 *     events + a 60s reconcile sweep against agents/jobs registries.
 *  2. 需要用户知道的状态通过宠物提示，dsh logo 标注来源 — AttentionNotifier
 *     (lib/notify.js) applies the attention policy; the logo travels with the
 *     agent identity (dsh-logo.js) and the pet app pins it to the bubble.
 *  3. 定时任务提醒 — ReminderSync (lib/reminders.js): settings-declared
 *     standing reminders diff-synced into the pet app, whose clock does the
 *     remembering.
 *
 * Everything registrations own is effect-disposed; a settings save rebuilds
 * the tool set and re-syncs reminders in place.
 */
import { PetBridge, readPetSettings, validateSettings, writePetSettings } from './pet-contract/index.js'
import { buildLingxiTools } from './tools.js'
import { installLingxiRemote } from './remote.js'
import { TaskWatch } from './tasks.js'
import { AttentionNotifier } from './notify.js'
import { ReminderSync } from './reminders.js'
import { dshLogo } from './dsh-logo.js'

export function apply(ctx) {
  const tools = ctx.get('tools')
  if (tools === undefined) {
    console.error('dsh-lingxi: the host tool registry is not mounted; tools unavailable, settings page still served.')
  }

  // ---- settings state (one source of truth: the shared file) ----
  const firstLoad = readPetSettings()
  let settings = firstLoad.settings
  let loadInfo = { ignored: firstLoad.ignored, error: firstLoad.error, existed: firstLoad.existed }

  let bridge = new PetBridge({ port: settings.port })

  // ---- shared live state the Remote namespace reads ----
  const taskWatch = new TaskWatch({
    ctx,
    bridge,
    getSettings: () => settings,
    onTransition: (transition) => notifier.handle(transition),
  })
  const notifier = new AttentionNotifier({ bridge, getSettings: () => settings })
  const reminderSync = new ReminderSync({ bridge, getSettings: () => settings })
  let reminderSyncState = { posted: 0, removed: 0, kept: 0, available: false, at: null }

  // ---- tool registration lifecycle ----
  let disposeTools = null
  function registerTools() {
    if (tools === undefined) return
    const definitions = buildLingxiTools({ bridge, settings })
    const disposers = definitions.map((definition) => tools.register(definition))
    disposeTools = () => { for (const off of disposers) off() }
  }
  function rebuild() {
    if (disposeTools !== null) disposeTools()
    disposeTools = null
    registerTools()
  }

  // ---- the controller the Remote namespace and the settings page share ----
  const controller = {
    getSettings: () => settings,
    getLoadInfo: () => loadInfo,
    listTasks: () => [...taskWatch.tracked.entries()]
      .map(([taskId, entry]) => ({
        taskId,
        title: entry.title,
        kind: entry.kind,
        state: entry.state,
        source: entry.source,
        since: entry.since,
      }))
      .sort((a, b) => a.since - b.since)
      .slice(0, 32),
    isWatching: () => taskWatch.started,
    listDeclaredReminders: () => reminderSync.declared(),
    reminderSyncState: () => reminderSyncState,
    syncRemindersNow: async () => {
      const result = await reminderSync.sync()
      reminderSyncState = { ...result, at: Date.now() }
      return reminderSyncState
    },
    saveSettings(patch) {
      const { settings: next, ignored } = validateSettings({ ...settings, ...patch })
      const portChanged = next.port !== settings.port
      writePetSettings(undefined, next)
      settings = next
      loadInfo = { ignored, error: null, existed: true }
      if (portChanged) {
        bridge = new PetBridge({ port: settings.port })
        taskWatch.bridge = bridge
        notifier.bridge = bridge
        reminderSync.bridge = bridge
        notifier.reset()
      }
      rebuild()
      void controller.syncRemindersNow()
      return { settings, ignored }
    },
    async testSay(text) {
      const trimmed = String(text).trim().slice(0, 140)
      if (!trimmed) return { ok: false, error: 'empty text' }
      return bridge.control({ say: trimmed, agent: settings.agentId, priority: 'status' })
    },
  }

  // ---- effects: everything with a side effect, disposed on stop ----
  ctx.effect(() => {
    registerTools()
    taskWatch.start()
    return () => {
      if (disposeTools !== null) disposeTools()
      disposeTools = null
      taskWatch.stop()
    }
  }, 'dsh-lingxi: tools + task watch lifecycle')

  ctx.effect(() => {
    void controller.syncRemindersNow()
    // Re-assert every 10 minutes: the pet app persists reminders, but a fresh
    // install, a cleared store, or a truncated list should self-heal.
    const disposer = ctx.timer?.interval
      ? ctx.timer.interval(() => { void controller.syncRemindersNow() }, 600_000)
      : (() => { const id = setInterval(() => { void controller.syncRemindersNow() }, 600_000); id.unref?.(); return () => clearInterval(id) })()
    return disposer
  }, 'dsh-lingxi: reminder sync loop')

  installLingxiRemote(ctx, controller)

  // ---- identity (badge + dsh logo) + optional announce, fire and forget ----
  const announce = async () => {
    await bridge.registerAgent({
      id: settings.agentId,
      name: settings.agentName,
      badge: settings.agentBadge,
      color: '#4D6BFE',
      logo: dshLogo(),
    }).catch(() => {})
    if (settings.autoAnnounce) {
      await bridge.taskEvent({
        state: 'running',
        kind: 'chat',
        summary: 'DSH 已接入，灵犀桥接就绪',
      }, settings.agentId)
    }
  }
  void announce()
}
