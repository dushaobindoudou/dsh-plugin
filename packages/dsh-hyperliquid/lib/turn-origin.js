/**
 * Track who started the current turn, so an automatic alert can never authorize money operations
 * (orders, pre-checks, limit changes, transfers).
 *
 * In memory: `turn/start` opens a turn; an event message from this plugin marks it as an alert turn.
 * On disk (`origin.get/set`): the session's last known origin — set to "alert" before the waker delivers,
 * cleared only when a human message is seen. A turn the guard did not observe (plugin reloaded mid-turn)
 * falls back to that record, so a reload never turns an alert turn into an authorised one, however long
 * it has been; the trader sending a new message is what clears it.
 */

const isPluginEvent = (source) => source?.kind === 'plugin:dsh-hyperliquid' && source.form === 'event'
const sessionIdOf = (session) => session?.id ?? null

/**
 * @param ctx - host context (`session/event`).
 * @param options.origin - persisted `{ get(sessionId): boolean | undefined, set(sessionId, alert: boolean) }`.
 */
export function createTurnOriginGuard(ctx, { origin = { get: () => undefined, set: () => {} } } = {}) {
  const turns = new WeakMap()
  ctx.on('session/event', (session, event) => {
    // A turn is trusted only once a human message is seen in it; until then the persisted origin decides.
    if (event.type === 'turn/start') turns.set(session, { alert: false, human: false })
    if (event.type !== 'user/message') return
    const source = event.data?.source
    if (isPluginEvent(source)) {
      turns.set(session, { alert: true, human: false })
      if (sessionIdOf(session)) origin.set(sessionIdOf(session), true)
    } else if (source?.kind === 'user' && !turns.get(session)?.alert) {
      // A human instruction makes this a trusted turn and retires the persisted alert origin.
      turns.set(session, { alert: false, human: true })
      if (sessionIdOf(session)) origin.set(sessionIdOf(session), false)
    }
  })
  return (tool, args, exec) => {
    const money = tool === 'hyper_order' || tool === 'hyper_decide' || (tool === 'hyper_account' && ['limits', 'transfer'].includes(args?.action))
    if (!money) return
    const turn = turns.get(exec?.agent?.session)
    if (turn?.alert) throw new Error('交易台自动通知不能授权下单、改限额或划转；请等待用户的新指令')
    if (turn?.human) return
    // No human message seen in this turn (not observed at all, only turn/start, or a scheduled turn):
    // the persisted origin decides until a human message clears it.
    const sessionId = exec?.agent?.id ?? sessionIdOf(exec?.agent?.session)
    if (sessionId && origin.get(sessionId) === true) throw new Error('无法确认本轮是否来自自动通知，资金操作已阻止；请用户直接发一条新指令')
  }
}
