/** Market workspace: contract strip, chart/funding, depth and account. */
import * as React from 'react'
import { hyperCall, t, tr } from '../remote'
import { fmt, fmtPrice, INTERVALS, MORE_INTERVALS } from '../format'
import { notify, store, useStore } from '../store'
import { insertChartReference, loadCandles, loadChartMarks, loadOlderCandles, loadFunding, loadTradeHistory, pushDeskInterval, saveSessionWorkspace } from '../data'
import { CandleChart } from './candle-chart'
import { MarketTape } from './market-tape'
import { BottomTable } from './bottom-table'
import type { ChartMark, Interval, SessionWorkspace } from '../types'
import { FoldIcon } from './panel-icons'
import { MarketPicker } from './market-picker'
import { MarketIcon } from './market-icon'
import type { IndicatorId } from '../chart-indicators'
import { chartTradeEvents } from '../trade-events'

const INDICATOR_CHOICES: Array<[IndicatorId, string, string]> = [
  ['volume', '成交量', 'K 线下方的成交量柱'],
  ['sma20', 'SMA 20', '20 根收盘价的简单均线'],
  ['sma60', 'MA 60', '60 根收盘价的简单均线'],
  ['ema20', 'EMA 20', '20 根收盘价的指数均线'],
  ['ema50', 'EMA 50', '50 根收盘价的指数均线'],
  ['bollinger20', '布林带 20', '均线及上下两倍标准差'],
  ['rsi14', 'RSI 14', '相对强弱指数副图'],
  ['macd', 'MACD', '12 / 26 / 9 动量副图'],
]
const INDICATOR_EN: Partial<Record<IndicatorId, [string, string]>> = {
  volume: ['Volume', 'Volume bars below the candles'], sma20: ['SMA 20', '20-close simple moving average'],
  sma60: ['MA 60', '60-close simple moving average'],
  ema20: ['EMA 20', '20-close exponential moving average'], ema50: ['EMA 50', '50-close exponential moving average'],
  bollinger20: ['Bollinger 20', 'Mean and two standard deviation bands'], rsi14: ['RSI 14', 'Relative strength index'],
  macd: ['MACD', '12 / 26 / 9 momentum panel'],
}

function finite(value: unknown): number | null {
  if (value == null || value === '') return null
  const number = Number(value)
  return Number.isFinite(number) ? number : null
}

export function DeskColumn({ onCollapse }: { onCollapse: () => void }) {
  const s = useStore()
  const coin = s.activeCoin
  const row = (s.selectedMarket?.name === coin ? s.selectedMarket : null) ?? s.marketCatalog.find((u) => u.name === coin) ?? s.markets.find((u) => u.name === coin)
  const ctx = row?.ctx
  const liveMid = s.snapshot?.observedAt?.mids && Date.now() - s.snapshot.observedAt.mids < 10_000
    ? finite(s.snapshot?.mids?.mids?.[coin] ?? s.snapshot?.mids?.[coin]) : null
  const book = s.snapshot?.book?.levels
  const bid = finite(book?.[0]?.[0]?.px)
  const ask = finite(book?.[1]?.[0]?.px)
  const bookMid = bid != null && ask != null ? (bid + ask) / 2 : bid ?? ask
  const mark = row?.kind === 'outcome' ? bookMid ?? finite(ctx?.markPx)
    : row?.kind === 'perp' ? liveMid ?? finite(ctx?.markPx)
      : finite(ctx?.markPx) ?? liveMid
  const prev = finite(ctx?.prevDayPx)
  const volume = finite(ctx?.dayNtlVlm)
  const openInterest = finite(ctx?.openInterest)
  const funding = finite(ctx?.funding)
  const change = mark != null && mark > 0 && prev != null && prev > 0 ? (mark / prev - 1) * 100 : null
  const chartTab = s.workspaceSessionId === s.activeSessionId ? s.workspace?.chartTab ?? 'chart' : 'chart'
  const indicators = React.useMemo(() => new Set<IndicatorId>(s.workspaceSessionId === s.activeSessionId ? s.workspace?.indicators ?? ['volume'] : ['volume']), [s.workspace, s.workspaceSessionId, s.activeSessionId])
  const [drawMode, setDrawMode] = React.useState<'level' | 'trend' | null>(null)
  const [pickerOpen, setPickerOpen] = React.useState(false)
  const [chartExpanded, setChartExpanded] = React.useState(false)
  const [chartResetToken, setChartResetToken] = React.useState(0)
  const toggleIndicator = (id: IndicatorId) => {
    const next = new Set(indicators)
    if (next.has(id)) next.delete(id); else next.add(id)
    saveSessionWorkspace({ indicators: [...next] })
  }
  React.useEffect(() => { setDrawMode(null); setChartExpanded(false) }, [s.activeSessionId])
  const marks = s.chartMarksKey === `${s.activeSessionId ?? ''}:${coin}:${s.interval}` ? s.chartMarks : []
  const layers = { orders: true, fills: true, drawings: true, ...s.workspace?.chartLayers }
  const tradeEvents = React.useMemo(() => chartTradeEvents(s.candles, coin,
    layers.orders ? s.tradeHistory?.orders ?? [] : [], layers.fills ? s.tradeHistory?.fills ?? [] : []),
  [s.candles, coin, s.tradeHistory, layers.orders, layers.fills])
  const draw = React.useCallback(async (mark: Pick<ChartMark, 'kind' | 'price' | 'fromTime' | 'fromPrice' | 'toTime' | 'toPrice'>) => {
    const sessionId = store.get().activeSessionId
    if (!sessionId) { notify(tr('请先选择交易会话', 'Choose a trading session first')); return }
    const { activeCoin, interval } = store.get()
    try {
      await hyperCall('drawChartMark', { ...mark, sessionId, coin: activeCoin, interval, role: 'neutral',
        label: mark.kind === 'level' ? tr('水平线', 'Horizontal line') : tr('趋势线', 'Trend line') })
      if (store.get().activeSessionId === sessionId) void loadChartMarks()
    } catch (error) { notify(tr('画线失败', 'Could not draw line') + '：' + String((error as Error)?.message ?? error)) }
    setDrawMode(null)
  }, [])
  const erase = React.useCallback(async (id: string) => {
    const sessionId = store.get().activeSessionId
    if (!sessionId) return
    try { await hyperCall('eraseChartMark', { sessionId, id }); if (store.get().activeSessionId === sessionId) void loadChartMarks() }
    catch (error) { notify(tr('删除画线失败', 'Could not remove line') + '：' + String((error as Error)?.message ?? error)) }
  }, [])

  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey || pickerOpen) return
      const element = event.target as HTMLElement
      if (element.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(element.tagName)) return
      event.preventDefault()
      setPickerOpen(true)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [pickerOpen])
  React.useEffect(() => {
    if (!chartExpanded) return undefined
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !pickerOpen) { event.preventDefault(); setChartExpanded(false) }
    }
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [chartExpanded, pickerOpen])
  React.useEffect(() => {
    if (!drawMode) return undefined
    const cancel = (event: KeyboardEvent) => { if (event.key === 'Escape') setDrawMode(null) }
    window.addEventListener('keydown', cancel)
    return () => window.removeEventListener('keydown', cancel)
  }, [drawMode])

  React.useEffect(() => {
    if (chartTab === 'funding' && row?.kind !== 'spot' && row?.kind !== 'outcome' && store.get().fundingCoin !== coin) void loadFunding()
    if (chartTab === 'funding' && (row?.kind === 'spot' || row?.kind === 'outcome')) saveSessionWorkspace({ chartTab: 'chart' })
  }, [chartTab, coin, row?.kind])
  React.useEffect(() => { void loadChartMarks() }, [s.activeSessionId, coin, s.interval])
  React.useEffect(() => { void loadTradeHistory() }, [s.status?.network, s.status?.tradingMode])
  const changeInterval = React.useCallback((next: Interval) => {
    store.patch({ interval: next })
    pushDeskInterval(next)
    void loadCandles()
  }, [])

  const stats: Array<[string, string, string?]> = [
    [tr('标记价格', 'Mark'), fmtPrice(mark)],
    [tr('预言机', 'Oracle'), fmtPrice(ctx?.oraclePx)],
    [tr('24h 涨跌', '24h change'), change == null ? '—' : `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`, change == null ? '' : change >= 0 ? 'dhl-up' : 'dhl-down'],
    [tr('24h 成交额', '24h volume'), volume == null ? '—' : `$${fmt(volume, 0)}`],
    [tr('未平仓量', 'Open interest'), openInterest == null || mark == null ? '—' : `$${fmt(openInterest * mark, 0)}`],
    [tr('资金费 / h', 'Funding / h'), funding == null ? '—' : `${(funding * 100).toFixed(4)}%`],
  ]

  return (
    <main id="dhl-panel-desk" className="dhl-col-desk">
      <header className="dhl-market-strip">
        <div className="dhl-market-name">
          <button type="button" className="dhl-market-trigger" aria-haspopup="dialog" aria-expanded={pickerOpen} onClick={() => setPickerOpen(true)}>
            <MarketIcon market={row ?? { name: coin, label: `${coin}-USDC`, kind: 'perp' }} />
            <strong>{row?.label ?? `${coin}-USDC`}</strong>
            <span className="dhl-market-chevron" aria-hidden="true">⌄</span>
          </button>
          <span className="dhl-market-kind">{row?.kind === 'spot' ? 'SPOT' : row?.kind === 'hip3' ? 'HIP-3' : row?.kind === 'outcome' ? 'OUTCOME' : 'PERP'}</span>
          {row?.maxLeverage ? <span className="dhl-market-tag">{row.maxLeverage}x</span> : null}
          {row?.tradable === false ? <span className="dhl-market-readonly">{tr('只读', 'View only')}</span> : null}
        </div>
        <div className="dhl-market-stats">
          {stats.map(([label, value, tone]) => (
            <div className="dhl-market-stat" key={label}>
              <span>{label}</span><strong className={tone ?? ''}>{value}</strong>
            </div>
          ))}
        </div>
        <button className="dhl-panel-iconbtn" type="button" onClick={onCollapse} aria-label={tr('收起行情区', 'Collapse market panel')} title={tr('收起行情区', 'Collapse market panel')}><FoldIcon direction="right" /></button>
      </header>
      {pickerOpen ? <MarketPicker activeCoin={coin} onClose={() => setPickerOpen(false)} /> : null}

      <div className={'dhl-market-workspace' + (s.tapePlacement === 'below' ? ' dhl-tape-below' : '')}>
        <section className={'dhl-chart-panel' + (chartExpanded ? ' dhl-chart-panel-expanded' : '')} aria-label={tr('行情图表', 'Market chart')}>
          <div className="dhl-chart-tabs" role="tablist" aria-label={tr('图表内容', 'Chart content')}>
            <button type="button" role="tab" aria-selected={chartTab === 'chart'} className={chartTab === 'chart' ? 'on' : ''} onClick={() => saveSessionWorkspace({ chartTab: 'chart' })}>{tr('K 线', 'Chart')}</button>
            {row?.kind !== 'spot' && row?.kind !== 'outcome' ? <button type="button" role="tab" aria-selected={chartTab === 'funding'} className={chartTab === 'funding' ? 'on' : ''} onClick={() => saveSessionWorkspace({ chartTab: 'funding' })}>{tr('资金费历史', 'Funding history')}</button> : null}
          </div>
          {chartTab === 'chart' ? (
            <div role="tabpanel">
              <div className="dhl-chart-tools">
                <div className="dhl-intervals" aria-label={tr('K 线周期', 'Chart interval')}>
                  {INTERVALS.map((iv) => <button key={iv} type="button" className={s.interval === iv ? 'on' : ''} onClick={() => changeInterval(iv)}>{iv}</button>)}
                  <select className="dhl-interval-more" aria-label={tr('更多 K 线周期', 'More chart intervals')} value={MORE_INTERVALS.includes(s.interval) ? s.interval : ''} onChange={(event) => changeInterval(event.target.value as Interval)}>
                    <option value="" disabled>{tr('更多', 'More')}</option>
                    {MORE_INTERVALS.map((iv) => <option key={iv} value={iv}>{iv}</option>)}
                  </select>
                </div>
                <div className="dhl-chart-actions">
                  <details className="dhl-layer-menu">
                    <summary>{tr('显示', 'Show')}</summary>
                    <div className="dhl-layer-popover">
                      {([['orders', tr('委托', 'Orders')], ['fills', tr('成交', 'Fills')], ['drawings', tr('画线', 'Drawings')]] as const).map(([id, label]) => <label key={id}><input type="checkbox" checked={layers[id]} onChange={(event) => saveSessionWorkspace({ chartLayers: { ...layers, [id]: event.target.checked } })} />{label}</label>)}
                    </div>
                  </details>
                  <details className="dhl-indicator-menu">
                    <summary aria-label={tr('选择图表指标', 'Choose chart indicators')}>{tr('指标', 'Indicators')} <span className="dhl-indicator-count">{indicators.size}</span></summary>
                    <div className="dhl-indicator-popover" role="group" aria-label={tr('图表指标', 'Chart indicators')}>
                      <strong>{tr('图表指标', 'Chart indicators')}</strong>
                      {INDICATOR_CHOICES.map(([id, label, description]) => <button type="button" key={id} className={indicators.has(id) ? 'on' : ''} aria-pressed={indicators.has(id)} onClick={() => toggleIndicator(id)}>
                        <span className="dhl-indicator-check" aria-hidden="true">{indicators.has(id) ? '✓' : ''}</span>
                        <span><b>{tr(label, INDICATOR_EN[id]?.[0] ?? label)}</b><small>{tr(description, INDICATOR_EN[id]?.[1] ?? description)}</small></span>
                      </button>)}
                    </div>
                  </details>
                  <button type="button" className={drawMode === 'level' ? 'on' : ''} aria-pressed={drawMode === 'level'} onClick={() => setDrawMode(drawMode === 'level' ? null : 'level')} title={tr('单击图表添加水平线', 'Click chart to add a horizontal line')}>{tr('水平线', 'H Line')}</button>
                  <button type="button" className={drawMode === 'trend' ? 'on' : ''} aria-pressed={drawMode === 'trend'} onClick={() => setDrawMode(drawMode === 'trend' ? null : 'trend')} title={tr('单击图表两次添加趋势线', 'Click chart twice to add a trend line')}>{tr('趋势线', 'Trend')}</button>
                  <button type="button" disabled={!marks.some((item) => item.source === 'user')} title={tr('撤销最近一条手动画线', 'Undo last drawing')} onClick={() => { const last = [...marks].reverse().find((item) => item.source === 'user'); if (last) void erase(last.id) }}>{tr('撤销', 'Undo')}</button>
                  <select className="dhl-interval-more" aria-label={tr('价格刻度', 'Price scale')} value={s.workspace?.priceScale ?? 'normal'} onChange={(event) => saveSessionWorkspace({ priceScale: event.target.value as SessionWorkspace['priceScale'] })}>
                    <option value="normal">{tr('线性', 'Linear')}</option><option value="log">{tr('对数', 'Log')}</option><option value="percentage">%</option>
                  </select>
                  <span className="dhl-chart-action-separator" aria-hidden="true" />
                  <button type="button" className="dhl-chart-iconbtn" aria-label={tr('复位图表视图', 'Reset chart view')} title={tr('复位图表视图', 'Reset chart view')} onClick={() => setChartResetToken((value) => value + 1)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M3 11a9 9 0 1 0 2.6-6.4M3 4v6h6" /><path d="M12 7v5l3 2" /></svg>
                  </button>
                  <button type="button" className="dhl-chart-iconbtn" aria-label={chartExpanded ? tr('退出放大图表', 'Exit expanded chart') : tr('放大图表', 'Expand chart')} aria-pressed={chartExpanded} title={chartExpanded ? tr('退出放大图表 (Esc)', 'Exit expanded chart (Esc)') : tr('放大图表', 'Expand chart')} onClick={() => setChartExpanded((value) => !value)}>
                    {chartExpanded
                      ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M9 3v6H3m18 6h-6v6M3 9h6V3m12 12h-6v6" /></svg>
                      : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M9 3H3v6m12-6h6v6M3 15v6h6m12-6v6h-6" /></svg>}
                  </button>
                </div>
              </div>
              <div className="dhl-chart">
                <CandleChart candles={s.candles} marks={layers.drawings ? marks : []} tradeEvents={tradeEvents} indicators={indicators} expanded={chartExpanded} resetToken={chartResetToken}
                  drawMode={drawMode} onDraw={draw} onSelect={(selection) => insertChartReference(selection, coin, s.interval)} onNeedOlder={loadOlderCandles} olderState={s.candlesOlder} priceScale={s.workspace?.priceScale ?? 'normal'}
                  visibleRange={s.workspace?.chartRanges?.[`${coin}:${s.interval}`] ?? null}
                  onVisibleRange={(range) => saveSessionWorkspace({ chartRanges: { [`${coin}:${s.interval}`]: range } })}
                  key={`${s.activeSessionId ?? ''}:${s.workspaceSessionId === s.activeSessionId ? 'ready' : 'pending'}:${coin}:${s.interval}`} />
                <div className="dhl-chart-click-hint">{drawMode
                  ? drawMode === 'level' ? tr('单击 K 线图设置水平线 · Esc 取消', 'Click chart to place line · Esc to cancel') : tr('在 K 线图上依次选择起点和终点 · Esc 取消', 'Click start and end points · Esc to cancel')
                  : tr('点击 K 线、成交量柱或指标线，将该点数据加入聊天输入框', 'Click a candle, volume bar or study line to add its data to the chat draft')}</div>
                {marks.length > 0 ? <div className="dhl-chart-mark-list" aria-label={tr('本会话画线', 'This session’s lines')}>
                  {marks.map((item) => <span key={item.id}>{item.label}<button type="button" aria-label={`${tr('删除画线', 'Remove line')} ${item.label}`} onClick={() => void erase(item.id)}>×</button></span>)}
                </div> : null}
                {s.candlesState === 'error' ? <div className="dhl-inline-error">{tr('K 线暂时不可用。切换周期可重试。', 'Chart data is unavailable. Change interval to retry.')}</div> : null}
              </div>
            </div>
          ) : (
            <div className="dhl-funding-panel" role="tabpanel">
              <div className="dhl-funding-summary">
                <span>{tr('当前小时资金费', 'Current hourly funding')}</span>
                <strong>{funding == null ? '—' : `${(funding * 100).toFixed(4)}%`}</strong>
                <span>{tr('最近 7 天 · 按小时结算', 'Last 7 days · hourly settlement')}</span>
              </div>
              {s.fundingState === 'loading' ? <div className="dhl-empty">{tr('正在读取资金费历史…', 'Loading funding history…')}</div> : null}
              {s.fundingState === 'error' ? <button type="button" className="dhl-ghost" onClick={() => void loadFunding()}>{tr('加载失败，重试', 'Load failed, retry')}</button> : null}
              {s.fundingState === 'ready' && s.fundingRows.length === 0 ? <div className="dhl-empty">{tr('暂无资金费记录', 'No funding records')}</div> : null}
              <div className="dhl-funding-list">
                {s.fundingRows.slice(-30).reverse().map((item) => {
                  const rate = Number(item.fundingRate) * 100
                  return <div className="dhl-funding-row" key={item.time}>
                    <time>{new Date(item.time).toLocaleString(tr('zh-CN', 'en-US'), { hour12: false })}</time>
                    <span className={rate >= 0 ? 'dhl-up' : 'dhl-down'}>{`${rate >= 0 ? '+' : ''}${rate.toFixed(5)}%`}</span>
                  </div>
                })}
              </div>
            </div>
          )}
        </section>
        <MarketTape snapshot={s.snapshot} />
      </div>
      <div className="dhl-desk-foot">
        <div className="dhl-banner">
          <span className="dhl-banner-signal" aria-hidden="true" />
          <span><b>{t('banner.title', '会话驱动交易')}</b> · {t('banner.body', '在右侧会话中讨论行情、风险与交易决策；盘口价格可用于辅助填写票据。')}</span>
        </div>
        <BottomTable account={s.account} accountError={s.accountError} />
      </div>
    </main>
  )
}
