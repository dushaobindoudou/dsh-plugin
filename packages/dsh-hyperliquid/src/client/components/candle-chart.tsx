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
  type Logical,
} from 'lightweight-charts'
import { t, tr } from '../remote'
import { fmtPrice } from '../format'
import type { Candle, ChartMark } from '../types'
import { chartIndicators, type IndicatorId, type ChartPoint } from '../chart-indicators'
import { selectChartCandle, type ChartHit, type ChartSelection } from '../chart-reference'
import type { TradeEvent } from '../trade-events'
import { maLabel, maSeries, type MaLine } from '../../../lib/moving-average.js'
import { DrawingShape, clicksNeeded, completePoints, constrainPoints, geometryPatch, markPoints, type DrawPoint, type DrawingKind, type Projector } from '../drawing-tools'
import { BRUSH_MAX } from '../../../lib/chart-drawings.js'
import { DrawToolbar } from './draw-toolbar'
import { UiIcon } from './panel-icons'
import { pressStillAClick } from '../click-guard'

export type MagnetMode = 'off' | 'weak' | 'strong'
/** Weak magnet radius in pixels (TradingView snaps within roughly this distance). */
const MAGNET_PX = 14

/** What a finished drawing hands back: level a price, trend its flat fields, the rest anchor points. */
export type DrawPayload = { kind: 'level'; price: number } | { kind: 'trend'; fromTime: number; fromPrice: number; toTime: number; toPrice: number } | { kind: Exclude<DrawingKind, 'level' | 'trend'>; points: DrawPoint[] }
/** A copy of an existing drawing: geometry already shifted, style and label kept. */
export type ClonePayload = { kind: DrawingKind; geometry: Record<string, unknown>; style: Record<string, unknown>; label: string }

/** Distinct from the fixed studies' colors (mint / amber / violet / blue). */
const MA_PALETTE = ['#29b6f6', '#ff7eb6', '#c6e377', '#ffb74d', '#b39ddb', '#4dd0e1', '#f48fb1', '#aed581']
export const maColor = (line: MaLine, index: number) => line.color ?? MA_PALETTE[index % MA_PALETTE.length]

const CHART_HEIGHT = 410
/** Load older history once fewer than this many bars remain left of the view. */
const OLDER_THRESHOLD_BARS = 30
const FALLBACK_UP = '#3b9c6d'
const FALLBACK_DOWN = '#e24b4a'
const SMA20_COLOR = '#269c89'
const DRAW_COLOR = '#4c82d8'
const FALLBACK_TEXT = '#888780'
const FALLBACK_BORDER = 'rgba(128,128,128,.25)'

/** Positions preview with their default 2R target as soon as entry and stop exist. */
function completePreview(kind: DrawingKind, points: DrawPoint[]): DrawPoint[] {
  if ((kind === 'long' || kind === 'short') && points.length === 2) return completePoints(kind, points) ?? points.slice(0, 1)
  return points
}

/** The candle whose open time is `time` (ms), by binary search. */
function barAt(candles: Candle[], time: number): Candle | null {
  const t = Math.floor(time / 1000)
  let lo = 0, hi = candles.length - 1
  while (lo <= hi) {
    const mid = (lo + hi) >> 1, value = Math.floor(candles[mid].t / 1000)
    if (value === t) return candles[mid]
    if (value < t) lo = mid + 1; else hi = mid - 1
  }
  return null
}

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
  drawMode: DrawingKind | null
  onDraw: (payload: DrawPayload) => void
  onSelect: (selection: ChartSelection) => void
  priceScale: 'normal' | 'log' | 'percentage'
  visibleRange: { from: number; to: number } | null
  onVisibleRange: (range: { from: number; to: number }) => void
  tradeEvents: TradeEvent[]
  onNeedOlder: () => void
  olderState: 'idle' | 'loading' | 'done' | 'error'
  /** Bring this candle into view and mark it, once per `at`. */
  focus: { t: number; at: number } | null
  /** Configurable moving averages drawn over the candles. */
  maLines: MaLine[]
  /** Snap drawing anchors to the nearest open/high/low/close. */
  magnet: MagnetMode
  /** Lock every drawing against dragging (selection and styling still work). */
  drawingsLocked: boolean
  onEditMark: (id: string, patch: Record<string, unknown>) => void
  onRemoveMark: (id: string) => void
  /** Show each fill's decision reason next to its dot. */
  showReasons: boolean
  /** Take a fill (and its reason) back to the conversation that decided it. */
  onAnalyzeFill: (event: TradeEvent) => void
  onCloneMark: (payload: ClonePayload) => void
  /** Select a drawing and bring it into view (from the drawings list), once per `at`. */
  selectRequest: { id: string; at: number } | null
}

export function CandleChart({ candles, marks, indicators, expanded, resetToken, drawMode, onDraw, onSelect, priceScale, visibleRange, onVisibleRange, tradeEvents, onNeedOlder, olderState, focus, maLines, magnet, drawingsLocked, onEditMark, onRemoveMark, showReasons, onAnalyzeFill, onCloneMark, selectRequest }: ChartProps) {
  const boxRef = React.useRef<HTMLDivElement>(null)
  const refs = React.useRef<ChartRefs | null>(null)
  const priceLines = React.useRef(new Map<string, IPriceLine>())
  const tradeMarkers = React.useRef<ISeriesMarkersPluginApi<Time> | null>(null)
  const fitted = React.useRef(false)
  const firstBarTime = React.useRef<number | null>(null)
  const handledFocus = React.useRef(0)
  const maRefs = React.useRef(new Map<string, { main: ISeriesApi<'Line'>; smooth?: ISeriesApi<'Line'> }>())
  const restoring = React.useRef(false)
  const initialRange = React.useRef(visibleRange)
  const drawModeRef = React.useRef(drawMode)
  const onDrawRef = React.useRef(onDraw)
  const onSelectRef = React.useRef(onSelect)
  const selectionData = React.useRef({ candles, indicators, maLines })
  const onRangeRef = React.useRef(onVisibleRange)
  const onNeedOlderRef = React.useRef(onNeedOlder)
  onNeedOlderRef.current = onNeedOlder
  const pending = React.useRef<DrawPoint[]>([])
  const magnetRef = React.useRef(magnet)
  magnetRef.current = magnet
  const candlesRef = React.useRef(candles)
  candlesRef.current = candles
  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const selectedRef = React.useRef<string | null>(null)
  selectedRef.current = selectedId
  /** Live geometry of the drawing being dragged; saved once on release. */
  const [draft, setDraft] = React.useState<{ id: string; points: DrawPoint[] } | null>(null)
  const [selectedFill, setSelectedFill] = React.useState<string | null>(null)
  const selectedFillRef = React.useRef<string | null>(null)
  selectedFillRef.current = selectedFill
  const snapRef = React.useRef<((event: MouseEvent, previous?: DrawPoint, useMagnet?: boolean) => DrawPoint | null) | null>(null)
  const hoveredHit = React.useRef<ChartHit>(null)
  drawModeRef.current = drawMode
  onDrawRef.current = onDraw
  onSelectRef.current = onSelect
  selectionData.current = { candles, indicators, maLines }
  onRangeRef.current = onVisibleRange
  const [crosshair, setCrosshair] = React.useState<Candle | null>(null)
  const [selectedTime, setSelectedTime] = React.useState<number | null>(null)
  const [themeVersion, setThemeVersion] = React.useState(0)
  const [viewportVersion, setViewportVersion] = React.useState(0)
  const [pendingPoints, setPendingPoints] = React.useState<DrawPoint[]>([])
  const [drawingHover, setDrawingHover] = React.useState<DrawPoint | null>(null)
  const showVolume = indicators.has('volume')
  const studies = React.useMemo(() => chartIndicators(candles), [candles])
  const maComputed = React.useMemo(() => maLines.map((line, index) => ({ line, color: maColor(line, index), ...maSeries(candles, line) })), [candles, maLines])
  // Bar index ↔ time, extrapolated beyond both ends so drawings can reach empty space.
  const timeline = React.useMemo(() => {
    const times = [...new Set(candles.map((candle) => Math.floor(candle.t / 1000)))].sort((a, b) => a - b)
    const step = times.length > 1 ? times[times.length - 1] - times[times.length - 2] : 60
    const toLogical = (ms: number) => {
      const t = ms / 1000
      if (!times.length) return 0
      if (t <= times[0]) return (t - times[0]) / step
      if (t >= times[times.length - 1]) return times.length - 1 + (t - times[times.length - 1]) / step
      let lo = 0, hi = times.length - 1
      while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (times[mid] <= t) lo = mid; else hi = mid }
      return lo + (t - times[lo]) / (times[hi] - times[lo])
    }
    const toTime = (logical: number) => {
      if (!times.length) return Date.now()
      const i = Math.round(logical)
      if (i < 0) return (times[0] + i * step) * 1000
      if (i >= times.length) return (times[times.length - 1] + (i - times.length + 1) * step) * 1000
      return times[i] * 1000
    }
    return { toLogical, toTime }
  }, [candles])
  const timelineRef = React.useRef(timeline)
  timelineRef.current = timeline

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
      color: SMA20_COLOR,
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
    // Browsers still dispatch click after a pointer drag. Keep the press
    // trajectory so panning and scaling never turn into a chart quote or mark.
    let press: { id: number; x: number; y: number; dragged: boolean; range: { from: number; to: number } | null } | null = null
    const down = (event: PointerEvent) => {
      const range = chart.timeScale().getVisibleLogicalRange()
      press = event.button === 0 && event.target instanceof HTMLCanvasElement
        ? { id: event.pointerId, x: event.clientX, y: event.clientY, dragged: false,
            range: range ? { from: range.from, to: range.to } : null } : null
    }
    const move = (event: PointerEvent) => {
      if (press?.id === event.pointerId && Math.hypot(event.clientX - press.x, event.clientY - press.y) > 5) press.dragged = true
      if (drawModeRef.current && event.target instanceof HTMLCanvasElement) {
        const point = pointAt(event, pending.current.at(-1))
        if (point) setDrawingHover(point)
      }
    }
    const cancel = () => { press = null }
    /**
     * Pointer → anchor: time snaps to a bar slot (also in the empty future
     * area); the magnet pulls the price onto that bar's O/H/L/C (weak: within
     * MAGNET_PX, strong: always); Shift keeps the previous anchor's price.
     */
    const snapPoint = (event: MouseEvent, previous?: DrawPoint, useMagnet = true): DrawPoint | null => {
      const rect = box.getBoundingClientRect()
      const y = event.clientY - rect.top
      const logical = chart.timeScale().coordinateToLogical(event.clientX - rect.left)
      let price = Number(candleSeries.coordinateToPrice(y))
      if (logical == null || !Number.isFinite(price) || price <= 0) return null
      const time = timelineRef.current.toTime(Number(logical))
      const mode = magnetRef.current
      if (useMagnet && mode !== 'off') {
        const bar = barAt(candlesRef.current, time)
        if (bar) {
          let best = { price, distance: Infinity }
          for (const value of [bar.o, bar.h, bar.l, bar.c]) {
            const coordinate = candleSeries.priceToCoordinate(value)
            if (coordinate != null && Math.abs(coordinate - y) < best.distance) best = { price: value, distance: Math.abs(coordinate - y) }
          }
          if (mode === 'strong' || best.distance <= MAGNET_PX) price = best.price
        }
      }
      if (event.shiftKey && previous) price = previous.price
      return { time, price }
    }
    snapRef.current = snapPoint
    /** Pointer → time (snapped to a bar slot, also in the empty future area) and price. */
    const pointAt = (event: MouseEvent, previous?: DrawPoint): DrawPoint | null => snapPoint(event, previous)
    box.addEventListener('pointerdown', down, true)
    box.addEventListener('pointermove', move, true)
    box.addEventListener('pointerup', move, true)
    box.addEventListener('pointercancel', cancel, true)
    // LWC's click callback can miss the first click after another control had
    // focus. Handle both drawing and quoting from one native click path.
    const chartClick = (event: MouseEvent) => {
      const visible = chart.timeScale().getVisibleLogicalRange()
      // A live bar arriving mid-click must not cancel it (see click-guard).
      const panned = !pressStillAClick(press?.range ?? null, visible ? { from: visible.from, to: visible.to } : null)
      const clicked = Boolean(press && !press.dragged && !panned && event.button === 0)
      press = null
      if (!clicked) return
      if (!(event.target instanceof HTMLCanvasElement)) return
      const rect = box.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const barTime = chart.timeScale().coordinateToTime(x)
      const mode = drawModeRef.current
      if (mode) {
        void y
        const point = pointAt(event, pending.current.at(-1))
        if (!point) return
        if (mode === 'level') { onDrawRef.current({ kind: 'level', price: point.price }); return }
        const clicks = [...pending.current, point]
        if (clicks.length < clicksNeeded(mode)) { pending.current = clicks; setPendingPoints(clicks); return }
        pending.current = []
        setPendingPoints([])
        const points = completePoints(mode, clicks)
        if (!points) return
        if (mode === 'trend') {
          if (points[0].time === points[1].time) return
          const [from, to] = points[0].time < points[1].time ? points : [points[1], points[0]]
          onDrawRef.current({ kind: 'trend', fromTime: from.time, fromPrice: from.price, toTime: to.time, toPrice: to.price })
        } else onDrawRef.current({ kind: mode, points })
        return
      }
      if (selectedRef.current) { setSelectedId(null); return }
      if (selectedFillRef.current) { setSelectedFill(null); return }
      if (typeof barTime !== 'number') return
      const selection = selectChartCandle(selectionData.current.candles, barTime * 1000, selectionData.current.indicators, hoveredHit.current, selectionData.current.maLines)
      if (selection) { setSelectedTime(selection.candle.t); onSelectRef.current(selection) }
    }
    box.addEventListener('click', chartClick)
    let rangeTimer: ReturnType<typeof setTimeout> | null = null
    let viewportFrame = 0
    const refreshOverlay = () => {
      if (viewportFrame) cancelAnimationFrame(viewportFrame)
      viewportFrame = requestAnimationFrame(() => setViewportVersion((value) => value + 1))
    }
    chart.timeScale().subscribeVisibleLogicalRangeChange(refreshOverlay)
    const sizeObserver = new ResizeObserver(refreshOverlay)
    sizeObserver.observe(box)
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
      smaSeries.applyOptions({ color: SMA20_COLOR })
      setThemeVersion((value) => value + 1)
    }
    const observer = new MutationObserver(applyTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme', 'style'] })

    return () => {
      observer.disconnect()
      box.removeEventListener('pointerdown', down, true)
      box.removeEventListener('pointermove', move, true)
      box.removeEventListener('pointerup', move, true)
      box.removeEventListener('pointercancel', cancel, true)
      box.removeEventListener('click', chartClick)
      chart.timeScale().unsubscribeVisibleLogicalRangeChange(refreshOverlay)
      sizeObserver.disconnect()
      if (viewportFrame) cancelAnimationFrame(viewportFrame)
      if (rangeTimer) clearTimeout(rangeTimer)
      refs.current = null
      maRefs.current.clear()
      priceLines.current.clear()
      chart.remove()
      tradeMarkers.current = null
    }
  }, [])

  // ── data: host candles (ms) → LWC series (UTC seconds, unique, ascending)
  React.useEffect(() => {
    const markers: SeriesMarker<UTCTimestamp>[] = tradeEvents.filter((event) => event.kind === 'order').map((event) => ({
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
    // Configurable MAs: one line series per definition (+ a dashed one for its smoothing).
    const live = new Set(maComputed.map((item) => item.line.id))
    for (const [id, entry] of maRefs.current) {
      if (live.has(id)) continue
      r.chart.removeSeries(entry.main); if (entry.smooth) r.chart.removeSeries(entry.smooth)
      maRefs.current.delete(id)
    }
    const toPoints = (values: Array<number | null>) => {
      const seenMa = new Set<number>(); const out: Array<{ time: UTCTimestamp; value: number }> = []
      values.forEach((value, index) => {
        const time = Math.floor(candles[index].t / 1000)
        if (value == null || seenMa.has(time)) return
        seenMa.add(time); out.push({ time: time as UTCTimestamp, value })
      })
      return out
    }
    for (const item of maComputed) {
      let entry = maRefs.current.get(item.line.id)
      if (!entry) {
        entry = { main: r.chart.addSeries(LineSeries, { lineWidth: 2, lastValueVisible: false, priceLineVisible: false, crosshairMarkerVisible: false }) }
        maRefs.current.set(item.line.id, entry)
      }
      entry.main.applyOptions({ color: item.color })
      entry.main.setData(toPoints(item.values))
      if (item.smoothed) {
        entry.smooth ??= r.chart.addSeries(LineSeries, { lineWidth: 1, lineStyle: LineStyle.Dashed, lastValueVisible: false, priceLineVisible: false, crosshairMarkerVisible: false })
        entry.smooth.applyOptions({ color: item.color })
        entry.smooth.setData(toPoints(item.smoothed))
      } else if (entry.smooth) { r.chart.removeSeries(entry.smooth); entry.smooth = undefined }
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
  }, [candles, studies, indicators, showVolume, maComputed])

  // A reopened quote chip: page in history until the candle exists, then center and mark it.
  React.useEffect(() => {
    const r = refs.current
    if (!r || !focus || focus.at === handledFocus.current || candles.length < 2) return
    if (focus.t < candles[0].t) {
      if (olderState === 'done' || olderState === 'error') handledFocus.current = focus.at
      else if (olderState === 'idle') onNeedOlderRef.current()
      return
    }
    const index = candles.findIndex((candle) => candle.t >= focus.t)
    if (index < 0) return
    handledFocus.current = focus.at
    const view = r.chart.timeScale().getVisibleLogicalRange()
    const half = view ? (view.to - view.from) / 2 : 40
    restoring.current = true
    r.chart.timeScale().setVisibleLogicalRange({ from: index - half, to: index + half })
    setTimeout(() => { restoring.current = false }, 100)
    setSelectedTime(candles[index].t)
  }, [focus, candles, olderState])

  React.useEffect(() => {
    refs.current?.chart.priceScale('right').applyOptions({ mode: priceScale === 'log' ? PriceScaleMode.Logarithmic : priceScale === 'percentage' ? PriceScaleMode.Percentage : PriceScaleMode.Normal })
    setViewportVersion((value) => value + 1)
  }, [priceScale])

  React.useEffect(() => { pending.current = []; setPendingPoints([]); setDrawingHover(null) }, [drawMode])

  React.useEffect(() => {
    if (resetToken > 0) refs.current?.chart.timeScale().fitContent()
  }, [resetToken])

  React.useEffect(() => {
    const r = refs.current
    const box = boxRef.current
    if (!r || !box) return
    for (const line of priceLines.current.values()) r.candles.removePriceLine(line)
    priceLines.current.clear()
    const colorOf = (mark: ChartMark) => mark.color ?? (mark.source === 'user' ? DRAW_COLOR : mark.role === 'support'
      ? cssVar(box, '--dsw-alias-state-success-primary', FALLBACK_UP)
      : mark.role === 'resistance'
        ? cssVar(box, '--dsw-alias-state-error-primary', FALLBACK_DOWN)
        : DRAW_COLOR)
    const styleOf = (mark: ChartMark) => mark.lineStyle === 'dotted' ? LineStyle.Dotted : mark.lineStyle === 'dashed' || (!mark.lineStyle && mark.source !== 'user') ? LineStyle.Dashed : LineStyle.Solid
    // Levels keep an axis price label; every other drawing is projected by the SVG overlay.
    for (const mark of marks) {
      if (mark.kind !== 'level' || mark.hidden || !Number.isFinite(mark.price) || Number(mark.price) <= 0) continue
      priceLines.current.set(mark.id, r.candles.createPriceLine({ price: Number(mark.price), color: colorOf(mark),
        lineWidth: (mark.lineWidth ?? (mark.source === 'user' ? 2 : 1)) as 1 | 2 | 3 | 4, lineStyle: styleOf(mark),
        axisLabelVisible: true, title: mark.label }))
    }
  }, [marks, themeVersion])

  const warming = candles.length < 2

  // ── drawings: projection, selection and direct manipulation ─────────
  const markById = React.useMemo(() => new Map(marks.map((mark) => [mark.id, mark])), [marks])
  const markByIdRef = React.useRef(markById)
  markByIdRef.current = markById
  const lockedRef = React.useRef(drawingsLocked)
  lockedRef.current = drawingsLocked
  const onEditRef = React.useRef(onEditMark)
  onEditRef.current = onEditMark
  const onRemoveRef = React.useRef(onRemoveMark)
  onRemoveRef.current = onRemoveMark
  const shapes = React.useMemo(() => marks.filter((mark) => !mark.hidden).map((mark) => ({ mark, points: markPoints(mark) })), [marks])
  const lastTime = candles.at(-1)?.t ?? Date.now()
  // Recomputed on viewport/scale changes and new candles, not on crosshair moves.
  const view = React.useMemo<Projector | null>(() => {
    const chartApi = refs.current, box = boxRef.current
    if (!chartApi || !box) return null
    return {
      project: (time, price) => {
        const x = chartApi.chart.timeScale().logicalToCoordinate(timeline.toLogical(time) as Logical)
        const y = chartApi.candles.priceToCoordinate(price)
        return x == null || y == null || !Number.isFinite(x) || !Number.isFinite(y) ? null : { x, y }
      },
      width: Math.max(0, box.clientWidth - chartApi.chart.priceScale('right').width()),
      height: chartApi.chart.panes()[0]?.getHeight() ?? box.clientHeight,
      bars: (from, to) => timeline.toLogical(to) - timeline.toLogical(from),
      closes: (from, to) => candles.filter((candle) => candle.t >= from && candle.t <= to).map((candle) => ({ time: candle.t, price: candle.c })),
    }
  }, [viewportVersion, timeline, themeVersion, expanded, indicators])

  React.useEffect(() => { if (selectedId && !markById.has(selectedId)) setSelectedId(null) }, [markById, selectedId])
  React.useEffect(() => { if (drawMode) setSelectedId(null) }, [drawMode])
  // Dragging a level moves its axis price label with it.
  React.useEffect(() => {
    if (!draft) return
    const mark = markById.get(draft.id)
    if (mark?.kind === 'level') priceLines.current.get(draft.id)?.applyOptions({ price: draft.points[0].price })
  }, [draft, markById])
  React.useEffect(() => {
    if (!selectedId) return undefined
    const onKey = (event: KeyboardEvent) => {
      const element = event.target as HTMLElement | null
      if (element?.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(element?.tagName ?? '')) return
      if (event.key === 'Escape') { setSelectedId(null); return }
      if (event.key !== 'Delete' && event.key !== 'Backspace') return
      const mark = markByIdRef.current.get(selectedId)
      if (!mark || mark.locked || lockedRef.current) return
      event.preventDefault()
      onRemoveRef.current(selectedId)
      setSelectedId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedId])

  const [brushPoints, setBrushPoints] = React.useState<DrawPoint[]>([])
  /** Freehand: the overlay captures the pointer (so the chart does not pan) and samples every ~4px. */
  const beginBrush = (event: React.PointerEvent<SVGSVGElement>) => {
    const snap = snapRef.current
    const first = snap?.(event.nativeEvent, undefined, false)
    if (!snap || !first) return
    event.preventDefault(); event.stopPropagation()
    const collected = [first]
    let lastXY = { x: event.clientX, y: event.clientY }, frame = 0
    setBrushPoints(collected)
    const move = (ev: PointerEvent) => {
      if (Math.hypot(ev.clientX - lastXY.x, ev.clientY - lastXY.y) < 4) return
      const point = snap(ev, undefined, false)
      if (!point) return
      lastXY = { x: ev.clientX, y: ev.clientY }
      collected.push(point)
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setBrushPoints([...collected]))
    }
    const up = () => {
      window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up)
      cancelAnimationFrame(frame)
      setBrushPoints([])
      if (collected.length < 2) return
      const stride = Math.ceil(collected.length / BRUSH_MAX)
      const points = collected.filter((_, index) => index % stride === 0 || index === collected.length - 1).slice(-BRUSH_MAX)
      onDrawRef.current({ kind: 'brush', points })
    }
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up)
  }

  /** A copy shifted 5 bars right, with the same style and label. */
  const cloneOf = React.useCallback((mark: ChartMark): ClonePayload => {
    const line = timelineRef.current
    const shifted = markPoints(mark).map((point) => ({ time: line.toTime(line.toLogical(point.time) + 5), price: point.price }))
    const style = Object.fromEntries(Object.entries({ color: mark.color, lineWidth: mark.lineWidth, lineStyle: mark.lineStyle }).filter(([, value]) => value != null))
    return { kind: mark.kind, geometry: geometryPatch(mark.kind, shifted), style, label: mark.label }
  }, [])
  const clipboard = React.useRef<ChartMark | null>(null)
  const onCloneRef = React.useRef(onCloneMark)
  onCloneRef.current = onCloneMark
  // Ctrl/Cmd+C copies the selected drawing; Ctrl/Cmd+V pastes a shifted copy (TradingView-style).
  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.altKey) return
      const element = event.target as HTMLElement | null
      if (element?.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(element?.tagName ?? '')) return
      const key = event.key.toLowerCase()
      if (key === 'c' && selectedRef.current) { clipboard.current = markByIdRef.current.get(selectedRef.current) ?? null; if (clipboard.current) event.preventDefault() }
      if (key === 'v' && clipboard.current) {
        event.preventDefault()
        const copy = cloneOf(clipboard.current)
        onCloneRef.current(copy)
        clipboard.current = { ...clipboard.current, ...(copy.geometry as object) } as ChartMark
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [cloneOf])
  const handledSelect = React.useRef(0)
  React.useEffect(() => {
    const r = refs.current
    if (!selectRequest || selectRequest.at === handledSelect.current || !r) return
    const mark = markById.get(selectRequest.id)
    if (!mark) return
    handledSelect.current = selectRequest.at
    setSelectedId(mark.id)
    const first = mark.kind === 'level' ? null : markPoints(mark)[0]
    if (first) {
      const view = r.chart.timeScale().getVisibleLogicalRange()
      const half = view ? (view.to - view.from) / 2 : 40
      const center = timeline.toLogical(first.time)
      restoring.current = true
      r.chart.timeScale().setVisibleLogicalRange({ from: center - half, to: center + half })
      setTimeout(() => { restoring.current = false }, 100)
    }
  }, [selectRequest, markById, timeline])

  /** Press on a drawing: select it; drag a handle to reshape or the body to move. Saved once on release. */
  const beginDrag = React.useCallback((event: React.PointerEvent<SVGSVGElement>) => {
    if (drawModeRef.current === 'brush' && event.button === 0) { beginBrush(event); return }
    if (drawModeRef.current || event.button !== 0) return
    const target = event.target as Element
    const fillId = target.closest('[data-fill-id]')?.getAttribute('data-fill-id')
    if (fillId) { event.preventDefault(); event.stopPropagation(); setSelectedId(null); setSelectedFill((current) => current === fillId ? null : fillId); return }
    const id = target.closest('[data-mark-id]')?.getAttribute('data-mark-id')
    const mark = id ? markByIdRef.current.get(id) : undefined
    if (!id || !mark) return
    event.preventDefault()
    event.stopPropagation()
    setSelectedId(id)
    const snap = snapRef.current
    if (mark.locked || lockedRef.current || !snap) return
    const anchorAttr = target.getAttribute('data-anchor')
    const anchor = anchorAttr == null ? null : Number(anchorAttr)
    const startPoint = snap(event.nativeEvent, undefined, false)
    if (!startPoint) return
    const line = timelineRef.current
    const startLogical = line.toLogical(startPoint.time)
    const original = markPoints(mark)
    const origin = { x: event.clientX, y: event.clientY }
    let moved = false, frame = 0, last: PointerEvent | null = null, latest: DrawPoint[] | null = null
    const compute = (ev: PointerEvent) => {
      let next: DrawPoint[] | null
      if (anchor != null) {
        const point = snap(ev, original[anchor === 0 ? 1 : 0])
        if (!point) return
        next = original.map((item) => ({ ...item }))
        if (mark.kind === 'level') next[0] = { ...next[0], price: point.price }
        else if (mark.kind === 'vline') next[0] = { time: point.time, price: next[0].price }
        else if ((mark.kind === 'long' || mark.kind === 'short') && anchor > 0) {
          next[anchor] = point
          next[1] = { ...next[1], time: point.time }; next[2] = { ...next[2], time: point.time }
        } else next[anchor] = point
        next = constrainPoints(mark.kind, next)
      } else {
        const point = snap(ev, undefined, false)
        if (!point) return
        const shift = Math.round(line.toLogical(point.time) - startLogical), delta = point.price - startPoint.price
        next = original.map((item) => ({ time: line.toTime(line.toLogical(item.time) + shift), price: item.price + delta }))
        if (next.some((item) => item.price <= 0)) next = null
      }
      if (next) { latest = next; setDraft({ id, points: next }) }
    }
    const move = (ev: PointerEvent) => {
      if (!moved && Math.hypot(ev.clientX - origin.x, ev.clientY - origin.y) < 3) return
      moved = true
      last = ev
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => compute(ev))
    }
    const up = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
      cancelAnimationFrame(frame)
      if (moved && last) compute(last)
      if (moved && latest) onEditRef.current(id, geometryPatch(mark.kind, latest))
      setDraft(null)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
  }, [])

  const fills = React.useMemo(() => tradeEvents.filter((event) => event.kind === 'fill'), [tradeEvents])
  const fillCard = selectedFill ? fills.find((event) => event.id === selectedFill) ?? null : null
  React.useEffect(() => { if (selectedFill && !fills.some((event) => event.id === selectedFill)) setSelectedFill(null) }, [fills, selectedFill])
  React.useEffect(() => {
    if (!selectedFill) return undefined
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setSelectedFill(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedFill])
  const fillAt = fillCard && view ? view.project(fillCard.time, fillCard.px) : null

  const previewPoints = drawMode && drawingHover ? [...pendingPoints, drawingHover] : pendingPoints
  const roleClass = (mark: ChartMark) => mark.source === 'user' ? 'role-user' : `role-${mark.role}`
  const selectedMark = selectedId ? markById.get(selectedId) ?? null : null

  return (
    <div className="dhl-chartbox" ref={boxRef} style={{ height: expanded ? 'calc(100dvh - 160px)' : CHART_HEIGHT + Number(indicators.has('rsi14')) * 125 + Number(indicators.has('macd')) * 125 }}>
      {view ? <svg className={'dhl-chart-drawing-overlay' + (drawMode ? ' drawing' : '') + (drawMode === 'brush' ? ' brushing' : '')} aria-hidden="true" onPointerDown={beginDrag}>
        <defs>
          <clipPath id="dhl-plot-clip"><rect x="0" y="0" width={view.width} height={view.height} /></clipPath>
          <marker id="dhl-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="currentColor" /></marker>
        </defs>
        <g clipPath="url(#dhl-plot-clip)">
          {shapes.map(({ mark, points }) => {
            const live = draft?.id === mark.id ? draft.points : points
            const shown = mark.kind === 'level' ? [{ time: lastTime, price: live[0].price }] : live
            const selected = selectedId === mark.id
            return <DrawingShape key={mark.id} id={mark.id} kind={mark.kind} points={shown} view={view} text={mark.label}
              className={`dhl-drawing ${roleClass(mark)}${mark.kind === 'level' ? ' is-level' : ''}${selected ? ' selected' : ''}${mark.locked || drawingsLocked ? ' locked' : ''}`}
              label={mark.source === 'user' || mark.kind === 'level' ? undefined : mark.label} anchors={selected} interactive={!drawMode}
              color={mark.color} lineWidth={mark.lineWidth} lineStyle={mark.lineStyle} badges={[...(mark.alert ? ['alert' as const] : []), ...(mark.shared ? ['shared' as const] : [])]} />
          })}
          <g className="dhl-fills">
            {fills.map((event) => {
              const point = view.project(event.time, event.px)
              if (!point) return null
              const short = event.reason.length > 18 ? event.reason.slice(0, 17) + '…' : event.reason
              return <g key={event.id} className={`dhl-fill ${event.isBuy ? 'buy' : 'sell'}${event.reason ? ' has-reason' : ''}${selectedFill === event.id ? ' selected' : ''}`} data-fill-id={event.id}>
                {event.reason ? <circle className="dhl-fill-ring" cx={point.x} cy={point.y} r="9" /> : null}
                <circle className="dhl-fill-dot" cx={point.x} cy={point.y} r="5" />
                {showReasons && short ? <text className="dhl-fill-reason" x={point.x + 12} y={point.y + 4}>{short}</text> : null}
              </g>
            })}
          </g>
          {brushPoints.length > 1 ? <DrawingShape kind="brush" points={brushPoints} view={view} className="dhl-drawing dhl-drawing-preview role-user" /> : null}
          {drawMode && drawMode !== 'brush' && previewPoints.length ? <DrawingShape kind={drawMode} points={completePreview(drawMode, previewPoints)} view={view} className="dhl-drawing dhl-drawing-preview role-user" anchors /> : null}
        </g>
      </svg> : null}
      {fillCard && fillAt && view ? <div className="dhl-fill-card" role="dialog" aria-label={tr('成交详情', 'Fill details')}
        style={{ left: Math.max(8, Math.min(fillAt.x + 14, view.width - 300)), top: Math.max(8, Math.min(fillAt.y - 20, view.height - 190)) }}
        onPointerDown={(event) => event.stopPropagation()} onClick={(event) => event.stopPropagation()}>
        <header>
          <b className={fillCard.isBuy ? 'dhl-up' : 'dhl-down'}>{fillCard.isBuy ? tr('买入', 'Buy') : tr('卖出', 'Sell')} {Number.isFinite(fillCard.sz) ? fillCard.sz : '—'} {fillCard.coin} @ {fmtPrice(fillCard.px)}</b>
          <button type="button" aria-label={tr('关闭', 'Close')} onClick={() => setSelectedFill(null)}><UiIcon name="close" size={14} /></button>
        </header>
        <time>{new Date(fillCard.time).toLocaleString(tr('zh-CN', 'en-US'), { hour12: false })}</time>
        <strong>{tr('AI 交易决策原因', 'AI decision rationale')}</strong>
        {fillCard.reason ? <p>{fillCard.reason}</p> : <p className="muted">{tr('这笔成交没有记录原因（旧订单，或在其他客户端下单）。', 'No rationale recorded (older order or placed elsewhere).')}</p>}
        <footer>
          <button type="button" className="dhl-fill-analyze" onClick={() => { onAnalyzeFill(fillCard); setSelectedFill(null) }}>{fillCard.sessionId ? tr('回到决策会话分析', 'Analyze in its session') : tr('在当前会话分析', 'Analyze in this session')}</button>
        </footer>
      </div> : null}
      {selectedMark && !drawMode ? <DrawToolbar mark={selectedMark} globallyLocked={drawingsLocked}
        onEdit={(patch) => onEditMark(selectedMark.id, patch)} onClone={() => onCloneMark(cloneOf(selectedMark))} onRemove={() => { onRemoveMark(selectedMark.id); setSelectedId(null) }} onClose={() => setSelectedId(null)} /> : null}
      {!warming && <div className="dhl-chart-ohlc" aria-live="off">
        <span>{crosshair ? new Date(crosshair.t).toLocaleString(tr('zh-CN', 'en-US'), { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }) : tr('最新 K 线', 'Latest candle')}</span>
        {(['o', 'h', 'l', 'c'] as const).map((key) => <span key={key}>{key.toUpperCase()} <b className={crosshair && crosshair.c < crosshair.o ? 'dhl-down' : 'dhl-up'}>{fmtPrice((crosshair ?? candles.at(-1))?.[key])}</b></span>)}
      </div>}
      {!warming && olderState === 'loading' ? <div className="dhl-chart-older" role="status">{tr('正在加载更早的 K 线…', 'Loading earlier candles…')}</div> : null}
      {!warming && olderState === 'error' ? <div className="dhl-chart-older" role="status">{tr('更早的 K 线加载失败，继续向左拖动可重试', 'Could not load earlier candles; drag left again to retry')}</div> : null}
      {!warming && maComputed.length > 0 ? <div className="dhl-chart-ma-legend" aria-label={tr('均线数值', 'Moving average values')}>
        {maComputed.map((item) => {
          const index = crosshair ? candles.findIndex((candle) => Math.floor(candle.t / 1000) === Math.floor(crosshair.t / 1000)) : candles.length - 1
          const at = (series: Array<number | null> | null) => series && index >= 0 ? series[index] : null
          return <span key={item.line.id} style={{ color: item.color }}>{maLabel(item.line)} <b>{fmtPrice(at(item.values))}</b>{item.smoothed ? <> / <b>{fmtPrice(at(item.smoothed))}</b></> : null}</span>
        })}
      </div> : null}
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
