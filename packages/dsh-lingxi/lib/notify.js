/**
 * dsh-lingxi — the attention notifier: turning task transitions into pet
 * notifications, exactly as loudly as the policy says.
 *
 * Requirement 2 ("任务和状态需要用户知道时，通过桌面宠物给用户提示，并且用
 * dsh 的 logo 表示来源") decomposes into three pieces and each lives where
 * it belongs:
 *
 *  - WHICH states interrupt the user: the attention policy (dsh-pets
 *    policy.js), user-editable through settings.notify.
 *  - HOW the pet shows it: the pet app's own machinery — a /task-event
 *    updates the event feed and maps state→expression, and a /control say
 *    puts a sentence in the bubble. The stage/priority ladder is the app's.
 *  - WHO is speaking: the agent identity registered at mount (badge `DS`,
 *    dsh blue, the DeepSeek whale logo) — the app pins that mark to the
 *    bubble itself, so attribution needs no work per notification.
 *
 * The notifier's only job is the join: policy level → which of the two
 * pushes to send, and how loud the say's priority should be. Duplicate
 * announcements for the same (task, state) are suppressed.
 */
import { attentionLevel, stagePriorityFor } from './pet-contract/index.js'

export class AttentionNotifier {
  /**
   * @param {object} options
   * @param {object} options.bridge - PetBridge bound to current settings.
   * @param {() => object} options.getSettings - current validated settings.
   */
  constructor({ bridge, getSettings }) {
    this.bridge = bridge
    this.getSettings = getSettings
    /** @type {Map<string, string>} taskId → last announced state */
    this.announced = new Map()
  }

  /** Reset the dedup memory (settings change, mount). */
  reset() {
    this.announced.clear()
  }

  /**
   * Handle one task transition. Fire-and-forget by design: a dead bridge is
   * a value, and a notification must never throw into the event handler.
   */
  handle(transition) {
    const { taskId, state, kind, summary } = transition
    if (this.announced.get(taskId) === state) return
    const settings = this.getSettings()
    const level = attentionLevel(state, settings.notify)
    if (level === null) {
      // Still report the event (the feed + expression mapping), just no nudge.
      this.announced.set(taskId, state)
      void this.bridge.taskEvent({ taskId, state, kind, summary }, settings.agentId)
      return
    }
    this.announced.set(taskId, state)
    void this.announce({ taskId, state, kind, summary }, level, settings)
  }

  async announce({ taskId, state, kind, summary }, level, settings) {
    await this.bridge.taskEvent({ taskId, state, kind, summary }, settings.agentId)
    // The say IS the notification — the requirement is that the user hears
    // about it through the pet, and a bubble beats a bare expression change.
    await this.bridge.control({
      say: sayLine(state, summary),
      agent: settings.agentId,
      priority: stagePriorityFor(level),
    })
  }
}

/** One sentence per attention state, in the cat's register — short, no drama. */
function sayLine(state, summary) {
  const what = summary ? `「${summary}」` : ''
  switch (state) {
    case 'needs_approval': return `${what}需要你授权，我在等你点头。`
    case 'needs_input': return `${what}有个问题想问你。`
    case 'blocked': return `${what}卡住了，需要你看一眼。`
    case 'failed': return `${what}失败了，别慌，我记下了。`
    default: return `${what}${state}`
  }
}
