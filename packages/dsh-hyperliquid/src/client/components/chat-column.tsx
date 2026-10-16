/** The trading desk hosts DSH's native Conversation body for the selected Session. */

import * as React from 'react'
import { getContext, t, tr } from '../remote'
import { notify, setActiveRef, store, useStore } from '../store'
import { queueToAgent } from '../data'
import { chartReferenceChipsReady } from '../dsh-extensions'
import { CHART_REFERENCE_SOURCE, encodeChartReference } from '../chart-reference'
import { TradeTicket } from './trade-ticket'
import type { RetainedSession } from '../types'
import { FoldIcon } from './panel-icons'
import { readNativeSessionList } from '../native-session-list'

interface ConversationKit {
  SessionProvider?: React.ComponentType<{ session: RetainedSession; children: React.ReactNode }>
  renderFactorySlot?: (name: string, props?: Record<string, unknown>, options?: Record<string, unknown>) => React.ReactNode
}

/** Keep the embedded occurrence on Chat even if the main Conversation shows another View. */
function FixedChatView({ renderSlot }: { renderSlot: (name: string, props?: Record<string, unknown>) => React.ReactNode }) {
  return <>{renderSlot('conversation.session', { view: 'chat' })}</>
}

export function ChatColumn({ width, fill = false, onCollapse, SessionProvider, renderFactorySlot }: { width?: number; fill?: boolean; onCollapse: () => void } & ConversationKit) {
  const s = useStore()
  const activeId = s.activeSessionId
  const nativeKnown = Boolean(activeId && s.nativeSessionIds.includes(activeId))
  const [bindError, setBindError] = React.useState<string | null>(null)
  const [ref, setRef] = React.useState<RetainedSession | null>(null)
  const [legacy, setLegacy] = React.useState(false)
  const [showTicket, setShowTicket] = React.useState(false)

  // Clicking a book price is an explicit request to edit a limit-order intent.
  React.useEffect(() => {
    if (s.ticketDraft) setShowTicket(true)
  }, [s.ticketDraft?.at])
  React.useEffect(() => { setShowTicket(false) }, [s.activeSessionId])

  React.useEffect(() => {
    setActiveRef(null)
    setRef(null)
    setLegacy(false)
    setBindError(null)
    if (!activeId) return undefined
    let cancelled = false
    let retained: RetainedSession | null = null
    const setup = async () => {
      try {
        const sessionsSvc = getContext()?.get('sessions')
        if (!sessionsSvc) throw new Error(tr('sessions 服务不可用', 'DSH sessions service unavailable'))
        // On reload the plugin registry may arrive before DSH has hydrated
        // its native session list. Retain only after that session is known;
        // otherwise retain() rejects and the chat never retries.
        const nativeList = readNativeSessionList(sessionsSvc.list)
        if (nativeList && !nativeList.byId?.[activeId]) {
          if (nativeList.phase === 'ready') throw new Error(tr('该交易会话已不在 DSH 会话列表中', 'This trading session no longer exists in DSH'))
          return
        }
        if (typeof sessionsSvc.retain !== 'function') {
          // DSH 0.1.x owns one selected Session; open() only changes that
          // selection. The main-panel choice remains on this trading desk.
          sessionsSvc.open(activeId)
          const binding = sessionsSvc.binding?.(activeId)
          if (binding) setActiveRef({ binding })
          if (!cancelled) setLegacy(true)
          return
        }
        retained = sessionsSvc.retain(activeId, { source: 'dsh-hyperliquid.desk' }) as RetainedSession
        await retained.ready
        if (cancelled) { try { retained.release?.() } catch { /* gone */ } return }
        setActiveRef(retained)
        setRef(retained)
      } catch (e) {
        if (!cancelled) setBindError(String((e as Error)?.message ?? e))
      }
    }
    void setup()
    return () => {
      cancelled = true
      setActiveRef(null)
      try { retained?.release?.() } catch { /* already gone */ }
    }
  }, [activeId, nativeKnown, s.nativeSessionsReady])

  const title = React.useMemo(() => {
    if (!activeId) return ''
    const row = readNativeSessionList(getContext()?.get('sessions')?.list)?.byId?.[activeId]
    return s.sessionTitles?.[activeId] ?? row?.displayTitle ?? s.sessions.find((r) => r.sessionId === activeId)?.title ?? t('session.defaultTitle', 'Hyperliquid 交易会话')
  }, [activeId, s.sessions, s.sessionTitles, s.localeRevision])
  const readyRef = ref?.sessionId === activeId ? ref : null
  const pendingQuotes = s.chartReferences.filter((item) => item.sessionId === activeId)

  React.useEffect(() => {
    if (pendingQuotes.length && showTicket) setShowTicket(false)
  }, [pendingQuotes.length, showTicket])
  React.useEffect(() => {
    if (!pendingQuotes.length || !readyRef || showTicket) return
    const sessionCtx = readyRef.binding?.ctx
    const input = sessionCtx ? getContext()?.get('conversation')?.input?.for?.(sessionCtx) : null
    const actions = input?.actions
    if (!actions?.captureInsertion || !actions?.insertText || !input?.state?.getSnapshot) {
      notify(tr('当前 DSH 输入框无法接收图表引用', 'This DSH composer cannot accept chart quotes'))
      store.patch((current) => ({ chartReferences: current.chartReferences.filter((item) => item.sessionId !== activeId) }))
      return
    }
    const inserted: number[] = []
    const chips = chartReferenceChipsReady() && typeof input.insertReference === 'function'
    for (const quote of pendingQuotes) {
      const draft = String(input.state.getSnapshot().draft ?? '')
      // Collapse a selected range so citing a chart point never deletes the
      // trader's existing words or structured reference chips.
      const captured = actions.captureInsertion()
      const span = { ...captured, start: captured.end }
      // A chip shows a short label; the full point text reaches the model on send.
      const ok = chips
        ? input.insertReference({ source: CHART_REFERENCE_SOURCE, label: quote.label, clipboardText: quote.text,
          ref: encodeChartReference({ coin: quote.coin, interval: quote.interval, t: quote.t, text: quote.text }) }, span)
        : actions.insertText(`${draft ? '\n\n' : ''}${quote.text}`, span)
      if (!ok) break
      inserted.push(quote.id)
    }
    if (inserted.length) {
      store.patch((current) => ({ chartReferences: current.chartReferences.filter((item) => !inserted.includes(item.id)) }))
      requestAnimationFrame(() => input.focus?.())
    }
  }, [activeId, readyRef, showTicket, s.chartReferences])

  const askMarket = React.useCallback(() => {
    queueToAgent(tr(`请调用 hyper_context 读取当前交易台的 ${s.activeCoin} 实时行情、盘口和账户信息，概括市场状态、关键风险与可能的交易条件。仅分析，不要下单。`,
      `Use hyper_context to read live ${s.activeCoin} market data, order book and account state. Summarize conditions, key risks and possible trade criteria. Analysis only; do not place an order.`))
  }, [s.activeCoin])
  const askRisk = React.useCallback(() => {
    queueToAgent(tr(`请调用 hyper_context 检查当前交易会话的账户、${s.activeCoin} 仓位、杠杆、挂单和风险限额，指出需要注意的风险与可采取的管理动作。仅分析，不要下单或撤单。`,
      `Use hyper_context to review the account, ${s.activeCoin} position, leverage, open orders and risk limits. Identify risks and possible management actions. Analysis only; do not place or cancel orders.`))
  }, [s.activeCoin])

  const content = !activeId
    ? <div className="dhl-empty">{t('chat.noSession', '选择左侧交易会话，在这里直接与交易 agent 对话。')}</div>
    : bindError
      ? <div className="dhl-inline-error" role="alert">{t('chat.bindError', '会话绑定失败：') + bindError}</div>
      : legacy
        ? <div className="dhl-chat-unavailable" role="alert">{t('chat.upgrade', '当前 DSH 版本不支持嵌入原生会话；请使用 DSH 0.2 或更新版本。')}</div>
      : !readyRef
        ? <div className="dhl-empty">{t('chat.linking', '正在接入会话…')}</div>
        : !SessionProvider || !renderFactorySlot
          ? <div className="dhl-inline-error" role="alert">{t('chat.noFactory', 'DSH 原生会话组件不可用。')}</div>
          : <div className="dhl-chatmount" data-trading-session={activeId}>
              <SessionProvider session={readyRef}>
                {renderFactorySlot('conversation.content', { variant: 'embedded', phase: 'active', hero: false }, { slots: { views: FixedChatView } })}
              </SessionProvider>
            </div>

  return (
    <div id="dhl-panel-chat" className="dhl-col-chat" style={fill ? { flex: '1 1 0', width: 'auto' } : width ? { width } : undefined}>
      <div className="dhl-chat-header">
        <div className="dhl-chat-heading">
          <strong>{t('chat.title', '交易会话')}</strong>
          {activeId ? <span title={title}>{title}</span> : null}
        </div>
        <button type="button" className="dhl-chat-ticket-toggle" aria-expanded={showTicket} onClick={() => setShowTicket((value) => !value)}>
          {showTicket ? t('chat.back', '返回会话') : t('chat.ticket', '交易票据')}
        </button>
        <button className="dhl-panel-iconbtn" type="button" onClick={onCollapse} aria-label={tr('收起对话栏', 'Collapse chat')} title={tr('收起对话栏', 'Collapse chat')}><FoldIcon direction="right" /></button>
      </div>
      {activeId && !showTicket && !legacy ? <div className="dhl-chat-prompts" role="group" aria-label={t('chat.prompts', '快捷提问')}>
        <button type="button" onClick={askMarket}>{t('chat.analyze', '分析行情')}</button>
        <button type="button" onClick={askRisk}>{t('chat.risk', '检查风险')}</button>
      </div> : null}
      {showTicket ? <TradeTicket key={activeId ?? 'anonymous'} onSubmitted={() => setShowTicket(false)} /> : content}
    </div>
  )
}
