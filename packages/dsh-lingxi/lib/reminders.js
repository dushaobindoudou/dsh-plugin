/**
 * dsh-lingxi — the reminder sync: settings-declared reminders made real on
 * the pet's side.
 *
 * Requirement 3 ("定时任务…需要能够提醒用户什么时候该检查什么任务的状态")
 * splits cleanly by owner:
 *
 *  - WHAT and HOW OFTEN: declared in the settings page (`reminders[]`,
 *    e.g. { id: 'deploy', title: '检查部署', detail: 'staging 状态',
 *    everyMinutes: 30 }) and persisted in the shared settings file.
 *  - THE CLOCK: the pet app's. It checks once a minute and re-arms standing
 *    reminders (repeatEveryMinutes ≥ 5) — the cat remembers, not the host.
 *  - THE JOIN: this module. The app assigns its own ids, so the sync keys on
 *    the deterministic marker text (dsh-pets reminders.js) and diff-syncs:
 *    whatever the app still holds from us but settings no longer declares
 *    gets deleted; missing or changed declarations get posted. Re-running
 *    with unchanged settings posts nothing — sync is idempotent.
 */
import { cleanReminder, isManagedReminder, reminderText } from './pet-contract/index.js'

export class ReminderSync {
  /**
   * @param {object} options
   * @param {object} options.bridge - PetBridge bound to current settings.
   * @param {() => object} options.getSettings - current validated settings.
   */
  constructor({ bridge, getSettings }) {
    this.bridge = bridge
    this.getSettings = getSettings
  }

  /**
   * One idempotent pass. Never throws: an unreachable pet means "nothing to
   * do right now", and the next pass (settings save or the re-assert timer)
   * catches up.
   *
   * @returns {Promise<{posted: number, removed: number, kept: number, available: boolean}>}
   */
  async sync() {
    const declarations = this.getSettings().reminders ?? []
    const expected = new Map() // text → declaration
    for (const declaration of declarations) {
      if (declaration?.enabled === false) continue
      const clean = cleanReminder(declaration)
      if (clean === null) continue
      expected.set(clean.text, clean)
    }

    const list = await this.bridge.reminders()
    if (!list.ok || !Array.isArray(list.data)) {
      return { posted: 0, removed: 0, kept: 0, available: false }
    }

    // The app's live entries that belong to a host sync (marker-prefixed).
    const mine = list.data.filter((entry) => isManagedReminder(entry))
    let posted = 0
    let removed = 0
    let kept = 0

    for (const entry of mine) {
      const wanted = expected.get(entry.text)
      if (wanted === undefined) {
        // Settings no longer declares it — cancel it with the cat.
        const gone = await this.bridge.removeReminder(String(entry.id ?? ''))
        if (gone.ok || gone.status === 404) removed += 1
        continue
      }
      const appRepeat = Number(entry.repeatEveryMinutes ?? entry.repeat_every_minutes ?? 0)
      if (appRepeat !== Number(wanted.repeatEveryMinutes ?? 0)) {
        // Changed cadence: the app has no update, so replace in place.
        await this.bridge.removeReminder(String(entry.id ?? ''))
        await this.bridge.remind(wanted)
        removed += 1
        posted += 1
      } else {
        kept += 1
      }
      expected.delete(entry.text)
    }

    for (const wanted of expected.values()) {
      const result = await this.bridge.remind(wanted)
      if (result.ok) posted += 1
    }
    return { posted, removed, kept, available: true }
  }

  /** The reminder lines as the settings page should show them. */
  declared() {
    return (this.getSettings().reminders ?? []).map((d) => ({
      id: d.id,
      title: d.title,
      detail: d.detail ?? '',
      everyMinutes: d.everyMinutes ?? null,
      mood: d.mood ?? null,
      enabled: d.enabled !== false,
      text: reminderText(d),
    }))
  }
}
