/**
 * dsh-lingxi — the notify log: every decision and every wire emission,
 * as JSONL, so notification quality can be AUDITED instead of felt.
 *
 * The optimisation loop this serves ("提示要准、时机要对、不多不少") cannot
 * run on memory: a bubble that never showed, a say the policy suppressed, a
 * dedup that swallowed a real update — none of them leave any other trace.
 * Two layers, one file:
 *
 *  - DECISION records from the attention notifier (notify.js): emit / dedup /
 *    suppressed-by-policy / debounced-start, each with the summary it would
 *    have used and WHERE that summary came from (provenance) — the 准 axis.
 *  - WIRE records from the logging bridge wrapper below: every say / react /
 *    task-event that actually left the plugin, with the app's answer —
 *    including the 400 stage-busy rejections that are otherwise invisible —
 *    the 时机 and 不多不少 axes.
 *
 * `taskId` is the dsh session/agent id, so entries join with the harness's own
 * session records for the combined analysis.
 *
 * Rules the module enforces on itself:
 *  - JSONL, one object per line, flat fields only — grep/jq/awk are the UI.
 *  - Rotation by size (default 1 MiB), keeping `generations` older files, so
 *    a chatty host cannot grow it forever.
 *  - Logging must NEVER break notifying: every filesystem touch is guarded,
 *    and a failed append is silent — the notification is the product, this
 *    is its shadow.
 */
import { appendFileSync, existsSync, mkdirSync, renameSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { homedir } from 'node:os'

/** Where the log lives — beside the pet settings file it observes. */
export function notifyLogPath(home = homedir()) {
  return join(home, '.lingxi', 'notify-log.jsonl')
}

/** Wire format version — bump when the field set changes shape. */
const LOG_VERSION = 1

export class NotifyLog {
  /**
   * @param {object} [options]
   * @param {string} [options.path] - JSONL file path (defaults under ~/.lingxi).
   * @param {number} [options.maxBytes] - rotate when the file exceeds this.
   * @param {number} [options.generations] - rotated files kept (.1 .. .N-1).
   */
  constructor({ path = notifyLogPath(), maxBytes = 1_048_576, generations = 2 } = {}) {
    this.path = path
    this.maxBytes = maxBytes
    this.generations = Math.max(1, generations)
    this.seq = 0
  }

  /** One emission id for the decision records of a single transition: the
   *  task-event emit and every say decision it spawns share it. It never
   *  crosses the wire (the pet's control endpoint owes nothing to this
   *  audit), so a DELIVERY joins its decision by (taskId, sayText) — which
   *  the control call carries for exactly that reason. */
  nextEid() {
    this.seq = (this.seq + 1) % Number.MAX_SAFE_INTEGER
    return `${Date.now().toString(36)}-${this.seq.toString(36)}`
  }

  /**
   * Append one record. Never throws; never logs its own failures (that way
   * lies recursion). `ts` and `v` are stamped here, caller fields after.
   * @param {Record<string, unknown>} fields
   */
  record(fields) {
    try {
      const entry = { ts: Date.now(), v: LOG_VERSION, ...fields }
      this.rotateIfNeeded()
      mkdirSync(dirname(this.path), { recursive: true })
      appendFileSync(this.path, `${JSON.stringify(entry)}\n`)
    } catch { /* the shadow must not break the show */ }
  }

  /** Shift notify-log.jsonl → .1 → .2 when the live file outgrows its cap. */
  rotateIfNeeded() {
    try {
      if (!existsSync(this.path) || statSync(this.path).size < this.maxBytes) return
      for (let generation = this.generations - 1; generation >= 1; generation--) {
        const from = generation === 1 ? this.path : `${this.path}.${generation - 1}`
        const to = `${this.path}.${generation}`
        if (existsSync(from)) renameSync(from, to)
      }
    } catch { /* a failed rotation only costs disk, never notifications */ }
  }
}

/**
 * Wrap a PetBridge so every wire emission records itself with its delivery
 * result. One wrap covers ALL mouths — the notifier, the five tools, and the
 * sense watches — because they all speak through control()/taskEvent().
 * A Proxy delegates every other bridge method (reminders, perception, …) to
 * `ref.current` at access time, so a port/identity rebuild swaps the inner
 * bridge without touching a single consumer, and future bridge methods are
 * forwarded without this file learning about them.
 *
 * @param {{ current: object }} ref - holder for the live PetBridge.
 * @param {NotifyLog} log
 */
export function loggingBridge(ref, log) {
  /** One logged wire call: what left, and what the pet answered. */
  const recordDelivery = (channel, fields, result) => {
    log.record({
      channel,
      decision: result?.ok === true ? 'delivered' : 'dropped',
      delivery: result === undefined || result === null
        ? { ok: false, note: 'no-response' }
        : { ok: result.ok === true, status: result.status, error: result.error },
      ...fields,
    })
  }
  return new Proxy(ref.current, {
    get(target, prop) {
      if (prop === 'control') {
        return async (action) => {
          const result = await target.control(action)
          recordDelivery(typeof action?.say === 'string' ? 'say' : 'react', {
            taskId: typeof action?.taskId === 'string' ? action.taskId : undefined,
            sayText: typeof action?.say === 'string' ? action.say : undefined,
            expression: action?.expression,
            action: action?.action,
            priority: action?.priority,
          }, result)
          return result
        }
      }
      if (prop === 'taskEvent') {
        return async (event, provider) => {
          const result = await target.taskEvent(event, provider)
          recordDelivery('task-event', {
            taskId: event?.taskId,
            source: event?.source,
            state: event?.state,
            kind: event?.kind,
            mood: event?.mood,
            progress: event?.progress,
            summary: event?.summary,
          }, result)
          return result
        }
      }
      const value = Reflect.get(target, prop, target)
      return typeof value === 'function' ? value.bind(target) : value
    },
  })
}
