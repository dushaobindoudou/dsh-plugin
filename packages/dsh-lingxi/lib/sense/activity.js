/**
 * dsh-lingxi — the activity sense: what the work is touching right now.
 *
 * `tools/result` (emit) fires for every settled tool call with the execution
 * frozen: `exec.name`, `exec.arguments` (lossless-JSON parsed and
 * deep-frozen — safe to read LEAF fields from), `exec.agent?.id`. From those
 * leaves the sense keeps a small rolling feed: which files were written or
 * edited, which commands ran. The feed is AMBIENT — it surfaces in the
 * settings page ("最近在做什么") and nowhere else. It never rides the pet
 * wire: per-tool task-events would drown the feed that matters.
 *
 * Privacy shape: only tool NAME + path/command leaves are kept, capped and
 * in-memory only. No result content, no arguments beyond the one leaf the
 * tool is about.
 */

/** Rolling feed size. Small on purpose: a glance, not a log. */
const FEED_CAP = 24

/** Summary cap per row (chars). */
const LABEL_CAP = 120

function firstString(value) {
  return typeof value === 'string' && value.trim() ? value.trim() : ''
}

function clip(text, cap = LABEL_CAP) {
  return Array.from(text).slice(0, cap).join('')
}

/**
 * One row of what a tool call was about, or null when nothing worth showing.
 * Deliberately leaf-only: an unknown tool degrades to its name, never to a
 * dump of its arguments.
 * @param {string} name
 * @param {unknown} args - the frozen parsed arguments (read-only).
 */
export function describeToolCall(name, args) {
  if (name === 'bash') {
    const command = firstString(args?.command)
    if (!command) return null
    const firstLine = command.split('\n', 1)[0] ?? command
    return { type: 'command', label: clip(firstLine) }
  }
  if (name === 'write' || name === 'edit' || name === 'read') {
    const path = firstString(args?.file_path) || firstString(args?.path)
    if (!path) return null
    return { type: 'file', label: clip(`${name} ${path}`) }
  }
  if (name === 'web_search') {
    const query = firstString(args?.queries) || firstString(args?.query)
    return query ? { type: 'web', label: clip(`搜索 ${query}`) } : null
  }
  if (name.startsWith('lingxi_')) return null // our own tools are not activity
  return { type: 'tool', label: name }
}

export class ActivitySense {
  constructor() {
    /** @type {Array<{at: number, taskId: string|null, type: string, label: string}>} */
    this.items = []
    this.started = false
    this.disposeFns = []
  }

  /**
   * @param {object} ctx - the plugin Context (ctx.on).
   * @returns {boolean} whether the listener attached.
   */
  attach(ctx) {
    if (this.started || ctx === undefined || typeof ctx.on !== 'function') return false
    this.started = true
    this.disposeFns.push(ctx.on('tools/result', (...args) => {
      try {
        this.record(...args)
      } catch (error) {
        console.error('dsh-lingxi activity sense: record failed:', error instanceof Error ? error.message : error)
      }
    }))
    return true
  }

  detach() {
    for (const dispose of this.disposeFns) {
      try {
        dispose()
      } catch { /* a disposer that throws must not stop the others */ }
    }
    this.disposeFns = []
    this.items = []
    this.started = false
  }

  /** One settled tool call → one feed row. */
  record(exec) {
    if (exec === null || typeof exec !== 'object') return
    const name = typeof exec.name === 'string' ? exec.name : ''
    if (!name) return
    const described = describeToolCall(name, exec.arguments)
    if (described === null) return
    const agentId = exec.agent !== undefined && exec.agent !== null && exec.agent.id !== undefined
      ? String(exec.agent.id).slice(0, 128)
      : null
    this.items.unshift({ at: Date.now(), taskId: agentId, ...described })
    if (this.items.length > FEED_CAP) this.items.length = FEED_CAP
  }

  /**
   * One ambient note from outside the tool pipeline (settings changes,
   * preset switches) — same feed, same caps.
   */
  note(type, label) {
    const text = typeof label === 'string' && label.trim() ? clip(label.trim()) : ''
    if (!text || typeof type !== 'string' || !type) return
    this.items.unshift({ at: Date.now(), taskId: null, type, label: text })
    if (this.items.length > FEED_CAP) this.items.length = FEED_CAP
  }

  /** Newest first, smallest owned objects. */
  list() {
    return this.items.map((item) => ({ ...item }))
  }
}
