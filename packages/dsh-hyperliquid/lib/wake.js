/**
 * dsh-hyperliquid — wake the trading session's agent when something it should know about happens
 * (a price alert on one of its lines). v1 is notify-only: the message asks the agent to re-check and
 * tell the trader; it is explicitly not an instruction or an authorisation to trade.
 *
 * Guard rails (codex review): each event is delivered once, events within a short window are merged,
 * a session is woken at most once per cooldown (later events wait for the next slot and are merged),
 * stale events are dropped, and deliveries for one session are serial.
 * @module lib/wake
 */

const DEFAULTS = { debounceMs: 5_000, cooldownMs: 5 * 60_000, staleMs: 10 * 60_000 }

/**
 * @param {{ deliver: (sessionId: string, text: string) => Promise<boolean>, describe?: (events: object[]) => string,
 *   now?: () => number, setTimer?: typeof setTimeout, clearTimer?: typeof clearTimeout, debounceMs?: number, cooldownMs?: number, staleMs?: number }} options
 */
export function createAgentWaker(options) {
  const { deliver, describe = alertWakeText, now = Date.now, setTimer = setTimeout, clearTimer = clearTimeout } = options
  const { debounceMs, cooldownMs, staleMs } = { ...DEFAULTS, ...options }
  let disposed = false
  const controller = new AbortController()
  const seen = new Set()
  const sessions = new Map() // sessionId → { pending: event[], timer, lastAt, busy }
  const state = (id) => { if (!sessions.has(id)) sessions.set(id, { pending: [], timer: null, lastAt: -Infinity, busy: false }); return sessions.get(id) }

  const flush = async (sessionId) => {
    if (disposed) return
    const s = state(sessionId)
    s.timer = null
    if (s.busy) { schedule(sessionId, debounceMs); return }
    // A timer set while the previous delivery was in flight may fire early: honour the cooldown here.
    const wait = s.lastAt + cooldownMs - now()
    if (wait > 0) { schedule(sessionId, wait); return }
    const fresh = s.pending.filter((event) => now() - event.at <= staleMs)
    s.pending = []
    if (!fresh.length) return
    s.busy = true
    try {
      if (await deliver(sessionId, describe(fresh), { signal: controller.signal })) s.lastAt = now()
    } catch { /* the desk still shows the alert; never retry into a loop */ }
    finally { s.busy = false }
    if (s.pending.length) schedule(sessionId, Math.max(debounceMs, s.lastAt + cooldownMs - now()))
  }
  const schedule = (sessionId, delay) => {
    if (disposed) return
    const s = state(sessionId)
    if (s.timer) return
    s.timer = setTimer(() => { void flush(sessionId) }, Math.max(0, delay))
    s.timer?.unref?.()
  }

  return {
    /** Queue one event (`{ id, at, sessionId, ... }`); returns false when it was a duplicate or unroutable. */
    notify(event) {
      if (disposed || !event?.sessionId || !event.id) return false
      const key = `${event.id}:${event.at}`
      if (seen.has(key)) return false
      seen.add(key)
      if (seen.size > 5000) seen.delete(seen.values().next().value)
      const s = state(event.sessionId)
      s.pending.push(event)
      schedule(event.sessionId, Math.max(debounceMs, s.lastAt + cooldownMs - now()))
      return true
    },
    /** Last delivery time for a session (the turn-origin guard uses it when a turn was not observed). */
    wokenAt(sessionId) { const s = sessions.get(sessionId); return s && Number.isFinite(s.lastAt) ? s.lastAt : undefined },
    dispose() { disposed = true; controller.abort(); for (const s of sessions.values()) if (s.timer) clearTimer(s.timer); sessions.clear() },
  }
}

const fmtPrice = (value) => Number(value).toLocaleString('en-US', { maximumFractionDigits: Number(value) >= 100 ? 2 : 6 })

/** The message the agent receives. Facts first, then exactly what it may and may not do. */
export function alertWakeText(events) {
  const lines = events.map((event) => `- ${event.coin} 价格${event.direction === 'up' ? '上穿' : '下穿'}「${event.label}」（线价 ${fmtPrice(event.line)}，现价 ${fmtPrice(event.price)}，${new Date(event.at).toISOString().slice(11, 19)}Z）`)
  return [
    '[交易台事件] 价格提醒已触发：',
    ...lines,
    '这是交易台自动发出的事件通知，不是用户的指令或授权。请：',
    '1. 用 hyper_context 复核最新价格、仓位和挂单；',
    '2. 对照 hyper_journal 里与这条线有关的计划，用两三句话告诉用户发生了什么、你建议怎么做；',
    '3. 不要因为这条通知直接下单、改限额或划转。需要操作时，按托管模式说明并等待用户确认。',
  ].join('\n')
}
