/**
 * dsh-hyperliquid — candle chart on the real TradingView Lightweight Charts
 * (npm `lightweight-charts`, Apache-2.0, version-pinned in package.json).
 *
 * Replaces the hand-rolled SVG chart AND the abandoned base64-vendored
 * bundle. The library source ships through esbuild; upgrading is a
 * package.json bump + `npm run build`, never a re-vendor.
 *
 * Colors: up=green / down=red (Hyperliquid convention) read from the shell
 * theme tokens, re-applied when the shell theme flips.
 * @module src/client/components/candle-chart
 */

import * as React from 'react'
import {
  createChart,
  CandlestickSeries,
  HistogramSeries,
  LineSeries,
  LineStyle,
  createSeriesMarkers,
  PriceScaleMode,
  type IChartApi,
  type IPriceLine,
  type ISeriesApi,
  type UTCTimestamp,
  type ISeriesMarkersPluginApi,
  type SeriesMarker,
  type Time,
} from 'lightweight-charts'
import { t, tr } from '../remote'
import { fmtPrice } from '../format'
import type { Candle, ChartMark } from '../types'
import { chartIndicators, type IndicatorId, type ChartPoint } from '../chart-indicators'
import { selectChartCandle, type ChartHit, type ChartSelection } from '../chart-reference'
import type { TradeEvent } from '../trade-events'

const CHART_HEIGHT = 410
/** Load older history once fewer than this many bars remain left of the view. */
const OLDER_THRESHOLD_BARS = 30
const FALLBACK_UP = '#3b9c6d'
const FALLBACK_DOWN = '#e24b4a'
const FALLBACK_TEXT = '#888780'
const FALLBACK_BORDER = 'rgba(128,128,128,.25)'

function cssVar(el: HTMLElement, name: string, fallback: string): string {
  const v = getComputedStyle(el).getPropertyValue(name).trim()
  return v || fallback
}

interface ChartRefs {
  chart: IChartApi
  candles: ISeriesApi<'Candlestick'>
  volume: ISeriesApi<'Histogram'>
  sma: ISeriesApi<'Line'>
  sma60: ISeriesApi<'Line'>
  ema20: ISeriesApi<'Line'>
  ema50: ISeriesApi<'Line'>
  upper: ISeriesApi<'Line'>
  lower: ISeriesApi<'Line'>
  rsi?: ISeriesApi<'Line'>
  macd?: ISeriesApi<'Line'>
  signal?: ISeriesApi<'Line'>
  histogram?: ISeriesApi<'Histogram'>
}

function chartData(points: ChartPoint[]): Array<{ time: UTCTimestamp; value: number }> {
  return points.map((point) => ({ time: point.time as UTCTimestamp, value: point.value }))
}

interface ChartProps {
  candles: Candle[]; marks: ChartMark[]; indicators: Set<IndicatorId>; expanded: boolean; resetToken: number
  drawMode: 'level' | 'trend' | null
  onDraw: (mark: Pick<ChartMark, 'kind' | 'price' | 'fromTime' | 'fromPrice' | 'toTime' | 'toPrice'>) => void
  onSelect: (selection: ChartSelection) => void
  priceScale: 'normal' | 'log' | 'percentage'
  visibleRange: { from: number; to: number } | null
  onVisibleRange: (range: { from: number; to: number }) => void
  tradeEvents: TradeEvent[]
  onNeedOlder: () => void
  olderState: 'idle' | 'loading' | 'done' | 'error'
}

export function CandleChart({ candles, marks, indicators, expanded, resetToken, drawMode, onDraw, onSelect, priceScale, visibleRange, onVisibleRange, tradeEvents, onNeedOlder, olderState }: ChartProps) {
  const boxRef = React.useRef<HTMLDivElement>(null)
  const refs = React.useRef<ChartRefs | null>(null)
  const priceLines = React.useRef<IPriceLine[]>([])
  const trendSeries = React.useRef<Array<ISeriesApi<'Line'>>>([])
  const tradeMarkers = React.useRef<ISeriesMarkersPluginApi<Time> | null>(null)
  const fitted = React.useRef(false)
  const firstBarTime = React.useRef<number | null>(null)
  const restoring = React.useRef(false)
  const initialRange = React.useRef(visibleRange)
  const drawModeRef = React.useRef(drawMode)
  const onDrawRef = React.useRef(onDraw)
  const onSelectRef = React.useRef(onSelect)
  const selectionData = React.useRef({ candles, indicators })
  const onRangeRef = React.useRef(onVisibleRange)
  const onNeedOlderRef = React.useRef(onNeedOlder)
  onNeedOlderRef.current = onNeedOlder
  const firstPoint = React.useRef<{ time: number; price: number } | null>(null)
  const hoveredHit = React.useRef<ChartHit>(null)
  drawModeRef.current = drawMode
  onDrawRef.current = onDraw
  onSelectRef.current = onSelect
  selectionData.current = { candles, indicators }
  onRangeRef.current = onVisibleRange
  const [crosshair, setCrosshair] = React.useState<Candle | null>(null)
  const [selectedTime, setSelectedTime] = React.useState<number | null>(null)
  const [themeVersion, setThemeVersion] = React.useState(0)
  const showVolume = indicators.has('volume')
  const studies = React.useMemo(() => chartIndicators(candles), [candles])

  // ── chart lifecycle: create once per mount, tear down on unmount ──────
  React.useEffect(() => {
    const box = boxRef.current
    if (!box) return undefined

    const readTheme = () => ({
      up: cssVar(box, '--dsw-alias-state-success-primary', FALLBACK_UP),
      down: cssVar(box, '--dsw-alias-state-error-primary', FALLBACK_DOWN),
      text: cssVar(box, '--dsw-alias-label-secondary', FALLBACK_TEXT),
      border: cssVar(box, '--dsw-alias-border-l1', FALLBACK_BORDER),
    })

    const theme = readTheme()
    const chart = createChart(box, {
      width: box.clientWidth || 720,
      height: CHART_HEIGHT,
      autoSize: true,
      layout: { background: { color: 'transparent' }, textColor: theme.text, fontFamily: 'inherit' },
      grid: { vertLines: { color: theme.border }, horzLines: { color: theme.border } },
      rightPriceScale: { borderColor: theme.border },
      timeScale: { borderColor: theme.border, timeVisible: true, secondsVisible: false },
    })

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: theme.up, downColor: theme.down,
      borderUpColor: theme.up, borderDownColor: theme.down,
      wickUpColor: theme.up, wickDownColor: theme.down,
    })
    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceFormat: { type: 'volume' },
      priceScaleId: 'dhl-vol',
      lastValueVisible: false,
      priceLineVisible: false,
    })
    const smaSeries = chart.addSeries(LineSeries, {
      color: cssVar(box, '--dsw-alias-brand-primary', '#54cbbb'),
      lineWidth: 2, lastValueVisible: false, priceLineVisible: false,
    })
    const sma60 = chart.addSeries(LineSeries, { color: '#d78c78', lineWidth: 2, lastValueVisible: false, priceLineVisible: false })
    const ema20 = chart.addSeries(LineSeries, { color: '#e2a943', lineWidth: 2, lastValueVisible: false, priceLineVisible: false })
    const ema50 = chart.addSeries(LineSeries, { color: '#9b86db', lineWidth: 2, lastValueVisible: false, priceLineVisible: false })
    const upper = chart.addSeries(LineSeries, { color: '#7aa4d4', lineWidth: 1, lineStyle: LineStyle.Dashed, lastValueVisible: false, priceLineVisible: false })
    const lower = chart.addSeries(LineSeries, { color: '#7aa4d4', lineWidth: 1, lineStyle: LineStyle.Dashed, lastValueVisible: false, priceLineVisible: false })
    chart.priceScale('dhl-vol').applyOptions({ scaleMargins: { top: 0.82, bottom: 0 } })
    refs.current = { chart, candles: candleSeries, volume: volumeSeries, sma: smaSeries, sma60, ema20, ema50, upper, lower }
    tradeMarkers.current = createSeriesMarkers(candleSeries, [])
    fitted.current = false
    const identifyHit = (hovered: unknown): ChartHit => {
      const r = refs.current
      if (!r || !hovered) return null
      if (hovered === r.volume) return 'volume'
      if (hovered === r.sma) return 'sma20'
      if (hovered === r.sma60) return 'sma60'
      if (hovered === r.ema20) return 'ema20'
      if (hovered === r.ema50) return 'ema50'
      if (hovered === r.upper) return 'bollingerUpper'
      if (hovered === r.lower) return 'bollingerLower'
      if (hovered === r.rsi) return 'rsi14'
      if (hovered === r.macd) return 'macd'
      if (hovered === r.signal) return 'macdSignal'
      if (hovered === r.histogram) return 'macdHistogram'
      return null
    }
    chart.subscribeCrosshairMove((param) => {
      hoveredHit.current = identifyHit(param.hoveredSeries)
      const point = param.seriesData.get(candleSeries) as { open?: number; high?: number; low?: number; close?: number } | undefined
      if (point?.open != null && point.high != null && point.low != null && point.close != null) {
        setCrosshair({ t: Number(param.time ?? 0) * 1000, o: point.open, h: point.high, l: point.low, c: point.close, v: 0 })
      } else setCrosshair(null)
    })
    chart.subscribeClick((param) => {
      const mode = drawModeRef.current
      if (!param.point || param.time == null) return
      if (!mode) return
      const price = candleSeries.coordinateToPrice(param.point.y)
      const time = Number(param.time) * 1000
      if (price == null || !Number.isFinite(Number(price)) || Number(price) <= 0 || !Number.isFinite(time)) return
      if (mode === 'level') onDrawRef.current({ kind: 'level', price: Number(price) })
      else if (!firstPoint.current) firstPoint.current = { time, price: Number(price) }
      else {
        const a = firstPoint.current
        firstPoint.current = null
        if (a.time === time) return
        const [from, to] = a.time < time ? [a, { time, price: Number(price) }] : [{ time, price: Number(price) }, a]
        onDrawRef.current({ kind: 'trend', fromTime: from.time, fromPrice: from.price, toTime: to.time, toPrice: to.price })
      }
    })
    // LWC's click callback does not fire for every click immediately after the
    // composer loses focus. Read the time scale from the native click so
    // referencing a point works while the trader is writing a draft.
    const quoteClick = (event: MouseEvent) => {
      if (drawModeRef.current || !(event.target instanceof HTMLCanvasElement)) return
      const x = event.clientX - box.getBoundingClientRect().left
      const time = chart.timeScale().coordinateToTime(x)
      if (typeof time !== 'number') return
      const selection = selectChartCandle(selectionData.current.candles, time * 1000, selectionData.current.indicators, hoveredHit.current)
      if (selection) { setSelectedTime(selection.candle.t); onSelectRef.current(selection) }
    }
    box.addEventListener('click', quoteClick)
    let rangeTimer: ReturnType<typeof setTimeout> | null = null
    chart.timeScale().subscribeVisibleTimeRangeChange((range) => {
      if (!fitted.current || restoring.current || !range || typeof range.from !== 'number' || typeof range.to !== 'number') return
      if (rangeTimer) clearTimeout(rangeTimer)
      rangeTimer = setTimeout(() => onRangeRef.current({ from: Number(range.from), to: Number(range.to) }), 650)
    })
    // Scrolling toward the oldest loaded bar pages in more history.
    chart.timeScale().subscribeVisibleLogicalRangeChange((range) => {
      if (!fitted.current || restoring.current || !range) return
      if (range.from < OLDER_THRESHOLD_BARS) onNeedOlderRef.current()
    })

    // Shell theme flip (class/attr toggle) → re-read tokens and re-apply.
    const applyTheme = () => {
      const th = readTheme()
      candleSeries.applyOptions({
        upColor: th.up, downColor: th.down,
        borderUpColor: th.up, borderDownColor: th.down,
        wickUpColor: th.up, wickDownColor: th.down,
      })
      chart.applyOptions({
        layout: { textColor: th.text },
        grid: { vertLines: { color: th.border }, horzLines: { color: th.border } },
        rightPriceScale: { borderColor: th.border },
        timeScale: { borderColor: th.border },
      })
      smaSeries.applyOptions({ color: cssVar(box, '--dsw-alias-brand-primary', '#54cbbb') })
      setThemeVersion((value) => value + 1)
    }
    const observer = new MutationObserver(applyTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme', 'style'] })

    return () => {
      observer.disconnect()
      box.removeEventListener('click', quoteClick)
      if (rangeTimer) clearTimeout(rangeTimer)
      refs.current = null
      priceLines.current = []
      trendSeries.current = []
      chart.remove()
      tradeMarkers.current = null
    }
  }, [])

  // ── data: host candles (ms) → LWC series (UTC seconds, unique, ascending)
  React.useEffect(() => {
    const markers: SeriesMarker<UTCTimestamp>[] = tradeEvents.map((event) => ({
      time: Math.floor(event.candleTime / 1000) as UTCTimestamp,
      position: event.isBuy ? 'belowBar' : 'aboveBar',
      color: event.kind === 'order' ? '#dda64d' : event.isBuy ? FALLBACK_UP : FALLBACK_DOWN,
      shape: event.kind === 'order' ? 'circle' : event.isBuy ? 'arrowUp' : 'arrowDown',
      text: event.kind === 'order' ? tr('委托', 'Order') : tr('成交', 'Fill'),
    }))
    if (selectedTime != null && candles.some((candle) => candle.t === selectedTime)) markers.push({
      time: Math.floor(selectedTime / 1000) as UTCTimestamp,
      position: 'inBar', color: '#e2a943', shape: 'circle', text: tr('引用', 'Quote'),
    })
    markers.sort((a, b) => Number(a.time) - Number(b.time))
    tradeMarkers.current?.setMarkers(markers)
  }, [tradeEvents, selectedTime, candles])

  React.useEffect(() => {
    const r = refs.current
    if (!r) return
    const rows = candles
    if (rows.length < 2) return
    const seen = new Set<number>()
    const bars: Array<{ time: UTCTimestamp; open: number; high: number; low: number; close: number }> = []
    const vols: Array<{ time: UTCTimestamp; value: number; color: string }> = []
    for (const c of rows) {
      const time = Math.floor(c.t / 1000) as UTCTimestamp
      if (seen.has(time)) continue
      seen.add(time)
      const up = c.c >= c.o
      bars.push({ time, open: c.o, high: c.h, low: c.l, close: c.c })
      vols.push({ time, value: c.v, color: up ? FALLBACK_UP : FALLBACK_DOWN })
    }
    if (bars.length < 2) return
    const th = { up: FALLBACK_UP, down: FALLBACK_DOWN }
    const box = boxRef.current
    if (box) {
      th.up = cssVar(box, '--dsw-alias-state-success-primary', FALLBACK_UP)
      th.down = cssVar(box, '--dsw-alias-state-error-primary', FALLBACK_DOWN)
    }
    // Prepending history shifts every logical index; keep the trader's view on the same bars.
    const viewBefore = fitted.current ? r.chart.timeScale().getVisibleLogicalRange() : null
    const prevFirst = firstBarTime.current
    const prepended = prevFirst != null && bars[0].time < prevFirst ? Math.max(0, bars.findIndex((bar) => bar.time >= prevFirst)) : 0
    firstBarTime.current = bars[0].time
    r.candles.setData(bars)
    r.volume.setData(vols.map((v) => ({ ...v, color: v.color === FALLBACK_UP ? th.up : th.down })))
    r.sma.setData(chartData(studies.sma20))
    r.sma60.setData(chartData(studies.sma60))
    r.ema20.setData(chartData(studies.ema20))
    r.ema50.setData(chartData(studies.ema50))
    r.upper.setData(chartData(studies.upper))
    r.lower.setData(chartData(studies.lower))
    r.volume.applyOptions({ visible: showVolume })
    r.sma.applyOptions({ visible: indicators.has('sma20') })
    r.sma60.applyOptions({ visible: indicators.has('sma60') })
    r.ema20.applyOptions({ visible: indicators.has('ema20') })
    r.ema50.applyOptions({ visible: indicators.has('ema50') })
    r.upper.applyOptions({ visible: indicators.has('bollinger20') })
    r.lower.applyOptions({ visible: indicators.has('bollinger20') })
    if (indicators.has('rsi14')) {
      if (!r.rsi) {
        const pane = r.chart.addPane()
        pane.setStretchFactor(0.28)
        r.rsi = pane.addSeries(LineSeries, { color: '#a788df', lineWidth: 2, priceLineVisible: false, lastValueVisible: true })
        for (const price of [30, 70]) r.rsi.createPriceLine({ price, color: '#8d8d8d', lineWidth: 1, lineStyle: LineStyle.Dashed, axisLabelVisible: false })
      }
      r.rsi.setData(chartData(studies.rsi14))
    } else if (r.rsi) { r.chart.removeSeries(r.rsi); r.rsi = undefined }
    if (indicators.has('macd')) {
      if (!r.macd) {
        const pane = r.chart.addPane()
        pane.setStretchFactor(0.28)
        r.histogram = pane.addSeries(HistogramSeries, { priceLineVisible: false, lastValueVisible: false })
        r.macd = pane.addSeries(LineSeries, { color: '#55a6ce', lineWidth: 2, priceLineVisible: false, lastValueVisible: false })
        r.signal = pane.addSeries(LineSeries, { color: '#e2a943', lineWidth: 2, priceLineVisible: false, lastValueVisible: false })
      }
      r.macd.setData(chartData(studies.macd))
      r.signal!.setData(chartData(studies.signal))
      r.histogram!.setData(studies.histogram.map((point) => ({ time: point.time as UTCTimestamp, value: point.value, color: point.value >= 0 ? th.up : th.down })))
    } else if (r.macd) {
      r.chart.removeSeries(r.macd); r.chart.removeSeries(r.signal!); r.chart.removeSeries(r.histogram!)
      r.macd = undefined; r.signal = undefined; r.histogram = undefined
    }
    if (viewBefore && prepended > 0) {
      restoring.current = true
      r.chart.timeScale().setVisibleLogicalRange({ from: viewBefore.from + prepended, to: viewBefore.to + prepended })
      setTimeout(() => { restoring.current = false }, 100)
    }
    // A live candle must not reset a trader's manual zoom or pan.
    if (!fitted.current) {
      restoring.current = true
      r.chart.timeScale().fitContent()
      const saved = initialRange.current
      if (saved && saved.from < saved.to) {
        try { r.chart.timeScale().setVisibleRange({ from: saved.from as UTCTimestamp, to: saved.to as UTCTimestamp }) }
        catch { /* historical range may no longer overlap loaded candles */ }
      }
      fitted.current = true
      setTimeout(() => { restoring.current = false }, 100)
    }
  }, [candles, studies, indicators, showVolume])

  React.useEffect(() => {
    refs.current?.chart.priceScale('right').applyOptions({ mode: priceScale === 'log' ? PriceScaleMode.Logarithmic : priceScale === 'percentage' ? PriceScaleMode.Percentage : PriceScaleMode.Normal })
  }, [priceScale])

  React.useEffect(() => { firstPoint.current = null }, [drawMode])

  React.useEffect(() => {
    if (resetToken > 0) refs.current?.chart.timeScale().fitContent()
  }, [resetToken])

  React.useEffect(() => {
    const r = refs.current
    const box = boxRef.current
    if (!r || !box) return
    for (const line of priceLines.current) r.candles.removePriceLine(line)
    for (const series of trendSeries.current) r.chart.removeSeries(series)
    priceLines.current = []
    trendSeries.current = []
    const colorOf = (role: ChartMark['role']) => role === 'support'
      ? cssVar(box, '--dsw-alias-state-success-primary', FALLBACK_UP)
      : role === 'resistance'
        ? cssVar(box, '--dsw-alias-state-error-primary', FALLBACK_DOWN)
        : cssVar(box, '--dsw-alias-brand-primary', '#54cbbb')
    for (const mark of marks) {
      const color = colorOf(mark.role)
      if (mark.kind === 'level' && Number.isFinite(mark.price) && Number(mark.price) > 0) {
        priceLines.current.push(r.candles.createPriceLine({ price: Number(mark.price), color, lineWidth: 1, lineStyle: LineStyle.Dashed, axisLabelVisible: true, title: mark.label }))
      }
      if (mark.kind === 'trend' && Number.isFinite(mark.fromTime) && Number.isFinite(mark.toTime) && Number.isFinite(mark.fromPrice) && Number.isFinite(mark.toPrice)) {
        const series = r.chart.addSeries(LineSeries, { color, lineWidth: 2, lastValueVisible: false, priceLineVisible: false, crosshairMarkerVisible: false })
        series.setData([
          { time: Math.floor(Number(mark.fromTime) / 1000) as UTCTimestamp, value: Number(mark.fromPrice) },
          { time: Math.floor(Number(mark.toTime) / 1000) as UTCTimestamp, value: Number(mark.toPrice) },
        ])
        trendSeries.current.push(series)
      }
    }
  }, [marks, themeVersion])

  const warming = candles.length < 2

  return (
    <div className="dhl-chartbox" ref={boxRef} style={{ height: expanded ? 'calc(100dvh - 160px)' : CHART_HEIGHT + Number(indicators.has('rsi14')) * 125 + Number(indicators.has('macd')) * 125 }}>
      {!warming && <div className="dhl-chart-ohlc" aria-live="off">
        <span>{crosshair ? new Date(crosshair.t).toLocaleString(tr('zh-CN', 'en-US'), { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }) : tr('最新 K 线', 'Latest candle')}</span>
        {(['o', 'h', 'l', 'c'] as const).map((key) => <span key={key}>{key.toUpperCase()} <b className={crosshair && crosshair.c < crosshair.o ? 'dhl-down' : 'dhl-up'}>{fmtPrice((crosshair ?? candles.at(-1))?.[key])}</b></span>)}
      </div>}
      {!warming && olderState === 'loading' ? <div className="dhl-chart-older" role="status">{tr('正在加载更早的 K 线…', 'Loading earlier candles…')}</div> : null}
      {!warming && olderState === 'error' ? <div className="dhl-chart-older" role="status">{tr('更早的 K 线加载失败，继续向左拖动可重试', 'Could not load earlier candles; drag left again to retry')}</div> : null}
      {marks.length > 0 ? <div className="dhl-chart-annotations" aria-label={tr('会话图表标注', 'Session chart annotations')}>
        {marks.slice(-4).map((mark) => <span key={mark.id} className={`role-${mark.role}`} title={`${mark.label} · ${mark.kind === 'level' ? fmtPrice(mark.price) : tr('趋势线', 'Trend line')}`}>{mark.label}</span>)}
        {marks.length > 4 ? <span>+{marks.length - 4}</span> : null}
      </div> : null}
      {crosshair && tradeEvents.some((event) => event.candleTime === crosshair.t) ? <div className="dhl-chart-trade-detail" aria-live="off">
        {tradeEvents.filter((event) => event.candleTime === crosshair.t).slice(0, 4).map((event) => <div key={event.id}>
          <strong>{event.kind === 'order' ? tr('委托', 'Order') : tr('成交', 'Fill')} · {event.isBuy ? tr('买入', 'Buy') : tr('卖出', 'Sell')}</strong>
          <span>{Number.isFinite(event.sz) ? event.sz : '—'} @ {fmtPrice(event.px)} · {new Date(event.time).toLocaleString()}</span>
          {event.reason ? <span title={event.reason}>{tr('原因', 'Reason')}：{event.reason}</span> : null}
        </div>)}
      </div> : null}
      {indicators.has('rsi14') || indicators.has('macd') ? <div className="dhl-chart-study-legend" aria-label={tr('副图指标数值', 'Study values')}>
        {indicators.has('rsi14') ? <span>RSI 14 <b>{studies.rsi14.at(-1)?.value.toFixed(1) ?? '—'}</b></span> : null}
        {indicators.has('macd') ? <span>MACD <b>{studies.macd.at(-1)?.value.toFixed(4) ?? '—'}</b> / {studies.signal.at(-1)?.value.toFixed(4) ?? '—'}</span> : null}
      </div> : null}
      {warming ? <div className="dhl-empty" style={{ height: CHART_HEIGHT }}>{t('chart.loading', 'K 线加载中…')}</div> : null}
    </div>
  )
}
