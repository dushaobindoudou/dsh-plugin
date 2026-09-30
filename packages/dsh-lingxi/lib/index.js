/**
 * dsh-lingxi — host half.
 *
 * The mount order tells the layered story (README has the diagram):
 *
 *   settings → bridge → identity (with the dsh logo) → tools
 *            → task watch (events + reconcile) → attention notifier
 *            → sense watches (goals, authorization waits, jobs,
 *              activity feed, context pressure, budget)
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
import { TaskWatch, armInterval } from './tasks.js'
import { AttentionNotifier } from './notify.js'
import { NotifyLog, loggingBridge, notifyLogPath } from './notify-log.js'
import { ReminderSync } from './reminders.js'
import { GoalWatch } from './sense/goal-watch.js'
import { AuthorizationWatch } from './sense/authorization-watch.js'
import { JobWatch } from './sense/job-watch.js'
import { ActivitySense } from './sense/activity.js'
import { ContextWatch } from './sense/context.js'
import { EnvironmentWatch } from './sense/environment.js'
import { BudgetWatch } from './sense/budget.js'
import { dshLogo } from './dsh-logo.js'

/** Cordis plugin name — the id the bundle patch inserts this row under. */
export const name = 'plugin-lingxi'

/**
 * Services this plugin must have before it may start.
 *
 * `timer` is the one that bites. It is a *service* (`@deepseek-ai/cordis-plugin-timer`,
 * mounted by the dsh-base bundle), and cordis refuses property access to a
 * service that was not declared: `ctx.timer` throws `cannot get property "timer"
 * without inject`, and because this row is applied while the tree loads, that
 * single throw fails the whole plugin tree (`plugin tree failed to load`).
 *
 * Declaring it here only orders the load — dsh-base always mounts the timer
 * row, so the plugin still starts everywhere.
 *
 * `typert` is the other one that bites, silently. installLingxiRemote soft-gets
 * it to claim the `lingxi/*` endpoints in the strict registry (the @Remote
 * marker path is dead across typert-protocol module copies — see remote.js).
 * Without the declaration cordis does not order the typert row before this one,
 * the soft get returns undefined at apply time, the claim is skipped, and every
 * settings-page RPC 404s while the tools keep working — the exact bug of
 * 2026-09-30. dsh-base always mounts typert, so waiting on it is safe.
 */
export const inject = ['timer', 'typert']

export function apply(ctx) {
  const tools = ctx.get('tools')
  if (tools === undefined) {
    console.error('dsh-lingxi: the host tool registry is not mounted; tools unavailable, settings page still served.')
  }

  // ---- settings state (one source of truth: the shared file) ----
  const firstLoad = readPetSettings()
  let settings = firstLoad.settings
  let loadInfo = { ignored: firstLoad.ignored, error: firstLoad.error, existed: firstLoad.existed }

  // The bridge sits behind a holder + logging wrapper: every mouth (notifier,
  // tools, sense watches) speaks through ONE logged object, and a port or
  // identity rebuild swaps the inner bridge without touching any consumer.
  const bridgeRef = { current: new PetBridge({ port: settings.port, agentId: settings.agentId }) }
  const notifyLog = new NotifyLog({ path: notifyLogPath() })
  const bridge = loggingBridge(bridgeRef, notifyLog)

  // ---- shared live state the Remote namespace reads ----
  const taskWatch = new TaskWatch({
    ctx,
    bridge,
    getSettings: () => settings,
    onTransition: (transition) => notifier.handle(transition),
  })
  // Pending running-says ride the host timer so they die with the plugin.
  const delay = (fn, ms) => {
    const timer = typeof ctx.get === 'function' ? ctx.get('timer') : undefined
    if (timer !== undefined && typeof timer.timeout === 'function') {
      const dispose = timer.timeout(fn, ms)
      return typeof dispose === 'function' ? dispose : () => {}
    }
    const id = setTimeout(fn, ms)
    id.unref?.()
    return () => clearTimeout(id)
  }
  const notifier = new AttentionNotifier({ bridge, getSettings: () => settings, delay, log: notifyLog })
  const reminderSync = new ReminderSync({ bridge, getSettings: () => settings })
  let reminderSyncState = { posted: 0, removed: 0, kept: 0, available: false, at: null }

  // ---- sense watches: more of dsh's states, same pipeline ----
  // Goals (objective + round progress) and authorization waits (the third
  // way dsh stops for the user) track rows into the SAME task registry and
  // announce through the SAME notifier — one mouthpiece, one vocabulary.
  const goalWatch = new GoalWatch({ ctx, taskWatch })
  const authorizationWatch = new AuthorizationWatch({ ctx, taskWatch })
  taskWatch.sweeps.push(() => goalWatch.sweep(), () => authorizationWatch.sweep())
  // Jobs report the moment they settle (onJobDone) instead of on the next
  // reconcile tick; the reconcile listing stays as the truth sweep.
  const jobWatch = new JobWatch({ ctx, taskWatch })
  taskWatch.sweeps.push(() => jobWatch.sweep())
  // Ambient activity: what the work touches (files, commands), feed only.
  const activitySense = new ActivitySense()
  // Context occupancy: one report per filling, re-armed by recovery. The
  // subject of the warning is the session's freshest ask (TaskWatch keeps
  // the user's own latest words — the static title freezes at birth).
  const contextWatch = new ContextWatch({ ctx, bridge, getSettings: () => settings, taskWatch })
  taskWatch.sweeps.push(() => contextWatch.sweep())
  // Budget: a failed model attempt that reads as exhausted quota/balance
  // alerts once per (session, class); a context-window rejection reports.
  const budgetWatch = new BudgetWatch({ ctx, bridge, getSettings: () => settings, taskWatch })
  // Environment: current model route (say on change), settings/preset notes,
  // client-bundle rebuilds for the dev loop.
  const environmentWatch = new EnvironmentWatch({ ctx, bridge, getSettings: () => settings, activity: activitySense })
  taskWatch.sweeps.push(() => environmentWatch.sweep())

  // ---- tool registration lifecycle ----
  let disposeTools = null
  function registerTools() {
    if (tools === undefined) return
    const definitions = buildLingxiTools({ bridge, settings, notifier })
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
        ...(entry.progress === undefined ? {} : { progress: entry.progress }),
      }))
      .sort((a, b) => a.since - b.since)
      .slice(0, 32),
    isWatching: () => taskWatch.started,
    // One manual reconcile pass, for the settings page's refresh button (and
    // the smoke test): the 60s sweep, run now.
    sweepNow: async () => {
      await taskWatch.reconcile()
      return { tracked: taskWatch.tracked.size }
    },
    // The ambient feed: recent tool activity + live context occupancy.
    listActivity: () => ({ items: activitySense.list(), pressure: contextWatch.snapshot() }),
    // The environment snapshot: the current model route.
    environment: () => environmentWatch.snapshot(),
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
      // The agent id rides EVERY bridge call as X-Lingxi-Agent — the app
      // gates persistent writes (memory, reminders) on the id's permission
      // tier, so a rename must rebuild the connection, not just the tools.
      const agentChanged = next.agentId !== settings.agentId
      writePetSettings(undefined, next)
      settings = next
      loadInfo = { ignored, error: null, existed: true }
      if (portChanged || agentChanged) {
        bridgeRef.current = new PetBridge({ port: settings.port, agentId: settings.agentId })
        notifier.reset()
      }
      rebuild()
      // The log is the baseline for every later "was this notification any
      // good" judgement — a settings change is a boundary in that series.
      notifyLog.record({
        channel: 'settings',
        decision: 'changed',
        agentId: settings.agentId,
        notify: settings.notify,
        tools: settings.tools,
      })
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
    goalWatch.start()
    authorizationWatch.start()
    jobWatch.start()
    activitySense.attach(ctx)
    contextWatch.ensureSubscribed()
    environmentWatch.start()
    budgetWatch.start()
    return () => {
      if (disposeTools !== null) disposeTools()
      disposeTools = null
      taskWatch.stop()
      goalWatch.stop()
      authorizationWatch.stop()
      jobWatch.stop()
      activitySense.detach()
      contextWatch.stop()
      environmentWatch.stop()
      budgetWatch.stop()
    }
  }, 'dsh-lingxi: tools + task watch lifecycle')

  ctx.effect(() => {
    void controller.syncRemindersNow()
    // Re-assert every 10 minutes: the pet app persists reminders, but a fresh
    // install, a cleared store, or a truncated list should self-heal.
    return armInterval(ctx, () => { void controller.syncRemindersNow() }, 600_000)
  }, 'dsh-lingxi: reminder sync loop')

  // Identity re-assert: the pet app holds the agent registry in memory, so
  // every app restart silently drops who we are — and with it the bubble
  // attribution (badge + whale logo) and the activity rows' name/color. The
  // mount-time registerAgent cannot cover that; a cheap periodic re-assert
  // (the same POST, idempotent) heals it within one tick of the app coming
  // back, without waiting for the next dsh restart.
  ctx.effect(() => {
    const reassert = () => {
      void bridge.registerAgent({
        id: settings.agentId,
        name: settings.agentName,
        badge: settings.agentBadge,
        color: '#4D6BFE',
        logo: dshLogo(),
      }).catch(() => {})
    }
    reassert()
    return armInterval(ctx, reassert, 600_000)
  }, 'dsh-lingxi: identity re-assert loop')

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
