/**
 * dsh-hyperliquid — chart drawing tools (TradingView's common set) and their
 * SVG geometry. Every drawing is stored in time/price space and re-projected
 * on each viewport change, so lines stay attached to candles while the chart
 * pans, zooms, rescales or pages in history.
 *
 * Each shape renders twice: a visible layer and a transparent, wide "hit"
 * layer (pointer-events on strokes only) so thin lines are easy to grab while
 * empty chart space still pans the chart.
 * @module src/client/drawing-tools
 */

import * as React from 'react'
import { tr } from './remote'
import { fmtPrice } from './format'
import { volumeProfile, DRAWING_CLICKS, FIB_EXT_LEVELS, FIB_LEVELS, FIB_TIME_SERIES, GANN_BOX_LEVELS, GANN_RATIOS, ICON_NAMES, TEXT_KINDS, type DrawingKind, type LineStyleName } from '../../lib/chart-drawings.js'
import type { ChartMark } from './types'

export type { DrawingKind }
export interface DrawPoint { time: number; price: number }

export interface DrawingTool { kind: DrawingKind; zh: string; en: string; hintZh: string; hintEn: string; icon: string; group: 'lines' | 'channels' | 'fib' | 'patterns' | 'shapes' | 'annotation' | 'measure' }
export const isTextKind = (kind: DrawingKind) => (TEXT_KINDS as string[]).includes(kind)

/** Menu order follows TradingView's lines → channels/Fibonacci → shapes/annotation → measure/positions. */
export const DRAWING_TOOLS: DrawingTool[] = [
  { group: 'lines', kind: 'trend', zh: '趋势线', en: 'Trend line', hintZh: '依次点击起点和终点（Alt+T）', hintEn: 'Click start and end points (Alt+T)', icon: 'M4 19 20 5' },
  { group: 'lines', kind: 'ray', zh: '射线', en: 'Ray', hintZh: '点击起点，再点击方向点，向前无限延伸', hintEn: 'Click origin, then direction; extends forward', icon: 'M4 19 20 5M4 19h.01' },
  { group: 'lines', kind: 'extended', zh: '延长线', en: 'Extended line', hintZh: '点击两点，两端无限延伸', hintEn: 'Click two points; extends both ways', icon: 'M2 21 22 3' },
  { group: 'lines', kind: 'level', zh: '水平线', en: 'Horizontal line', hintZh: '单击设置价格（Alt+H）', hintEn: 'Click to set the price (Alt+H)', icon: 'M3 12h18' },
  { group: 'lines', kind: 'hray', zh: '水平射线', en: 'Horizontal ray', hintZh: '单击起点，向右延伸（Alt+J）', hintEn: 'Click origin; extends right (Alt+J)', icon: 'M6 12h15M6 12h.01' },
  { group: 'lines', kind: 'infoline', zh: '信息线', en: 'Info line', hintZh: '两点画线，显示涨跌、根数、时长和角度', hintEn: 'Two points; shows change, bars, time and angle', icon: 'M4 18 18 6M14 4h6v5' },
  { group: 'lines', kind: 'trendangle', zh: '趋势角度', en: 'Trend angle', hintZh: '两点画线，显示与水平线的夹角', hintEn: 'Two points; shows the angle to horizontal', icon: 'M4 19 19 6M4 19h15M10 19a6 6 0 0 0-1.6-4' },
  { group: 'lines', kind: 'crossline', zh: '十字线', en: 'Cross line', hintZh: '单击放置水平与垂直交叉线（Alt+C）', hintEn: 'Click to place a horizontal and vertical cross (Alt+C)', icon: 'M12 3v18M3 12h18' },
  { group: 'lines', kind: 'vline', zh: '垂直线', en: 'Vertical line', hintZh: '单击标记时间（Alt+V）', hintEn: 'Click to mark a time (Alt+V)', icon: 'M12 3v18' },
  { group: 'channels', kind: 'channel', zh: '平行通道', en: 'Parallel channel', hintZh: '点击两点画基线，第三点设置通道宽度', hintEn: 'Two points for the base, a third for width', icon: 'M3 15 15 5M9 19 21 9' },
  { group: 'channels', kind: 'pitchfork', zh: '安德鲁叉子线', en: 'Pitchfork', hintZh: '点击枢轴点，再点击波段高点与低点', hintEn: 'Click the pivot, then the swing high and low', icon: 'M4 20 12 4M12 4l8 8M12 4 4 12M8 16l12-4' },
  { group: 'channels', kind: 'schiff', zh: 'Schiff 叉子线', en: 'Schiff pitchfork', hintZh: '同叉子线，起点移到 A、B 价格中点', hintEn: 'Pitchfork with the handle at A–B price midpoint', icon: 'M4 14 12 4M12 4l8 8M12 4 4 12M8 16l12-4' },
  { group: 'channels', kind: 'modschiff', zh: '改良 Schiff 叉子线', en: 'Modified Schiff pitchfork', hintZh: '同叉子线，起点移到 A、B 时间与价格中点', hintEn: 'Pitchfork with the handle at the A–B midpoint', icon: 'M6 12 12 4M12 4l8 8M12 4 4 12M8 16l12-4' },
  { group: 'channels', kind: 'regression', zh: '回归趋势', en: 'Regression trend', hintZh: '点击区间起点和终点，按收盘价拟合 ±2σ 通道', hintEn: 'Click range start and end; fits closes with ±2σ', icon: 'M3 17 21 7M3 13 21 3M3 21 21 11' },
  { group: 'channels', kind: 'vprofile', zh: '固定范围成交量分布', en: 'Fixed range volume profile', hintZh: '点击区间起点和终点，按价格统计成交量，标出 POC 与 70% 价值区', hintEn: 'Click range start and end; volume by price with POC and 70% value area', icon: 'M4 3v18M4 6h7M4 9h12M4 12h16M4 15h9M4 18h5' },
  { group: 'fib', kind: 'fib', zh: '斐波那契回撤', en: 'Fib retracement', hintZh: '从波段起点点到终点（终点为 0）（Alt+F）', hintEn: 'Click swing start, then end (end = 0) (Alt+F)', icon: 'M3 5h18M3 9h18M3 13h18M3 19h18' },
  { group: 'fib', kind: 'fibext', zh: '斐波那契扩展', en: 'Trend-based fib extension', hintZh: '点击波段起点、终点，再点击回撤点，自回撤点投射', hintEn: 'Swing start, swing end, then the retracement point', icon: 'M3 20 9 6l6 9M15 4h7M15 8h7M15 12h7' },
  { group: 'fib', kind: 'fibchannel', zh: '斐波那契通道', en: 'Fib channel', hintZh: '两点画基线，第三点设置通道宽度', hintEn: 'Two points for the base, a third for width', icon: 'M3 19 21 9M3 15 21 5M3 11 21 1' },
  { group: 'fib', kind: 'fibtime', zh: '斐波那契时间周期', en: 'Fib time zone', hintZh: '点击两点确定单位间隔', hintEn: 'Click two points to set the unit spacing', icon: 'M4 3v18M7 3v18M10 3v18M15 3v18M22 3v18' },
  { group: 'fib', kind: 'gannbox', zh: '江恩箱', en: 'Gann box', hintZh: '点击两个对角，按 0.25/0.382/0.5/0.618/0.75 分割', hintEn: 'Click two corners; divided at Gann levels', icon: 'M4 4h16v16H4zM4 12h16M12 4v16M4 4l16 16' },
  { group: 'fib', kind: 'gannsquare', zh: '江恩方格', en: 'Gann square', hintZh: '点击两个对角，画四分网格、对角线与扇线', hintEn: 'Click two corners; quarters, diagonals and fans', icon: 'M4 4h16v16H4zM4 4l16 16M20 4 4 20M4 12h16M12 4v16' },
  { group: 'fib', kind: 'gannfan', zh: '江恩扇形', en: 'Gann fan', hintZh: '点击原点，再点击确定 1×1 线', hintEn: 'Click the origin, then a point on the 1×1 line', icon: 'M3 21 21 3M3 21 21 12M3 21 12 3M3 21h18' },
  { group: 'patterns', kind: 'elliott', zh: '艾略特推动浪', en: 'Elliott impulse wave', hintZh: '依次点击 0、1、2、3、4、5 六个点', hintEn: 'Click points 0 through 5', icon: 'M2 18 6 10l3 4 5-10 3 6 5-6' },
  { group: 'patterns', kind: 'elliottabc', zh: '艾略特调整浪', en: 'Elliott correction wave', hintZh: '依次点击 0、A、B、C 四个点', hintEn: 'Click 0, A, B, C', icon: 'M3 6l6 10 5-6 7 10' },
  { group: 'patterns', kind: 'xabcd', zh: 'XABCD 谐波', en: 'XABCD pattern', hintZh: '依次点击 X、A、B、C、D，显示斐波那契比值', hintEn: 'Click X, A, B, C, D; shows Fibonacci ratios', icon: 'M2 18 7 5l4 9 5-7 6 12M2 18l9-4M11 14l11 5' },
  { group: 'patterns', kind: 'abcd', zh: 'ABCD 形态', en: 'ABCD pattern', hintZh: '依次点击 A、B、C、D', hintEn: 'Click A, B, C, D', icon: 'M3 19 9 6l5 8 7-10' },
  { group: 'patterns', kind: 'headshoulders', zh: '头肩形态', en: 'Head and shoulders', hintZh: '依次点击左底、左肩、颈线点、头、颈线点、右肩、右底', hintEn: 'Click 7 points from left base to right base', icon: 'M2 18l3-6 3 3 4-10 4 10 3-3 3 6M5 15h14' },
  { group: 'shapes', kind: 'rect', zh: '矩形', en: 'Rectangle', hintZh: '点击两个对角（Alt+Shift+R）', hintEn: 'Click two opposite corners (Alt+Shift+R)', icon: 'M4 6h16v12H4z' },
  { group: 'shapes', kind: 'circle', zh: '圆形', en: 'Circle', hintZh: '点击圆心，再点击边缘', hintEn: 'Click the center, then the edge', icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z' },
  { group: 'shapes', kind: 'triangle', zh: '三角形', en: 'Triangle', hintZh: '依次点击三个顶点', hintEn: 'Click three corners', icon: 'M12 4 21 20H3z' },
  { group: 'shapes', kind: 'brush', zh: '画笔', en: 'Brush', hintZh: '按住鼠标拖动自由绘制', hintEn: 'Press and drag to draw freehand', icon: 'M3 17c3-6 5 2 8-3s4-6 7-4 3 4 3 4' },
  { group: 'annotation', kind: 'text', zh: '文本', en: 'Text', hintZh: '单击位置后输入文字', hintEn: 'Click a spot, then type', icon: 'M5 6h14M12 6v13M9 19h6' },
  { group: 'annotation', kind: 'callout', zh: '标注气泡', en: 'Callout', hintZh: '点击要标注的位置，再点击文本框位置，然后输入文字', hintEn: 'Click the target, then the box, then type', icon: 'M4 4h16v10H10l-4 5v-5H4z' },
  { group: 'annotation', kind: 'pricelabel', zh: '价格标签', en: 'Price label', hintZh: '单击在该价格处放置标签', hintEn: 'Click to tag a price', icon: 'M3 12l5-6h13v12H8z' },
  { group: 'annotation', kind: 'icon', zh: '图标', en: 'Icon', hintZh: '单击位置后选择图标', hintEn: 'Click a spot, then pick an icon', icon: 'M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.6 6.7 19.4l1.2-6L3.4 9.3l6-.7z' },
  { group: 'annotation', kind: 'arrow', zh: '箭头', en: 'Arrow', hintZh: '点击起点和箭头指向的位置', hintEn: 'Click tail, then head', icon: 'M4 20 20 4M12 4h8v8' },
  { group: 'measure', kind: 'pricerange', zh: '价格区间', en: 'Price range', hintZh: '点击两点，测量价格差与百分比', hintEn: 'Click two points to measure price change', icon: 'M12 3v18M8 7l4-4 4 4M8 17l4 4 4-4M5 3h14M5 21h14' },
  { group: 'measure', kind: 'daterange', zh: '日期区间', en: 'Date range', hintZh: '点击两点，测量 K 线根数与时长', hintEn: 'Click two points to measure bars and time', icon: 'M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4M3 5v14M21 5v14' },
  { group: 'measure', kind: 'measure', zh: '日期与价格区间', en: 'Date & price range', hintZh: '点击起点和终点，显示涨跌、根数与时长', hintEn: 'Click two points to measure change, bars and time', icon: 'M12 3v18M8 7l4-4 4 4M8 17l4 4 4-4' },
  { group: 'measure', kind: 'long', zh: '多头头寸', en: 'Long position', hintZh: '点击入场价，再点击止损价（止盈默认 2R，可拖动）', hintEn: 'Click entry, then stop (target defaults to 2R)', icon: 'M4 4h16v8H4zM4 12h16v8H4zM4 12h16' },
  { group: 'measure', kind: 'short', zh: '空头头寸', en: 'Short position', hintZh: '点击入场价，再点击止损价（止盈默认 2R，可拖动）', hintEn: 'Click entry, then stop (target defaults to 2R)', icon: 'M4 4h16v8H4zM4 12h16v8H4zM4 12h16' },
]
export const toolOf = (kind: DrawingKind) => DRAWING_TOOLS.find((tool) => tool.kind === kind)!

/** Icon stickers: name → [zh, en, 24×24 path]. */
export const ICONS: Record<string, [string, string, string]> = {
  flag: ['旗帜', 'Flag', 'M6 3v18M6 4h11l-2 4 2 4H6'], star: ['星标', 'Star', 'M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.6 6.7 19.4l1.2-6L3.4 9.3l6-.7z'],
  up: ['看涨', 'Up', 'M12 4l7 8h-4v8H9v-8H5z'], down: ['看跌', 'Down', 'M12 20l7-8h-4V4H9v8H5z'],
  warning: ['警示', 'Warning', 'M12 3 22 20H2zM12 9v5M12 17v.5'], check: ['确认', 'Check', 'M5 12l5 5 9-10'],
  cross: ['否定', 'Cross', 'M6 6l12 12M18 6 6 18'], fire: ['热点', 'Fire', 'M12 3c1 4 6 6 6 11a6 6 0 0 1-12 0c0-3 2-4 2-6 2 1 3 3 3 3 0-3 1-6 1-8z'],
  pin: ['图钉', 'Pin', 'M12 21s-6-5.6-6-10a6 6 0 0 1 12 0c0 4.4-6 10-6 10zM12 8.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z'],
  clock: ['时钟', 'Clock', 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2'],
  dollar: ['资金', 'Dollar', 'M12 3v18M16 7.5c-.8-1-2.2-1.5-4-1.5-2.2 0-3.8 1-3.8 2.7 0 4 7.8 1.8 7.8 5.6 0 1.7-1.6 2.7-4 2.7-1.8 0-3.2-.5-4-1.5'],
  shield: ['防守', 'Shield', 'M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6z'],
  bolt: ['突发', 'Bolt', 'M13 2 4 14h7l-1 8 9-12h-7z'],
  heart: ['关注', 'Heart', 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z'],
  question: ['疑问', 'Question', 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .8-1 1.4v.8M12 17v.5'],
  info: ['说明', 'Info', 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 11v5M12 8v.5'],
  target: ['目标', 'Target', 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 11.5v1'], bell: ['提醒', 'Bell', 'M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0'],
}
export const ICON_LIST = ICON_NAMES
export const clicksNeeded = (kind: DrawingKind) => DRAWING_CLICKS[kind]

export function ToolIcon({ kind, size = 16 }: { kind: DrawingKind; size?: number }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={toolOf(kind).icon} /></svg>
}

/** Anchor points of a saved mark in click order (level: one point at its price). */
export function markPoints(mark: ChartMark): DrawPoint[] {
  if (mark.kind === 'level') return [{ time: mark.createdAt ?? Date.now(), price: Number(mark.price) }]
  if (mark.kind === 'trend') return [{ time: Number(mark.fromTime), price: Number(mark.fromPrice) }, { time: Number(mark.toTime), price: Number(mark.toPrice) }]
  return (mark.points ?? []).map((point) => ({ time: Number(point.time), price: Number(point.price) }))
}

/** Geometry patch for the host from edited anchor points. */
export function geometryPatch(kind: DrawingKind, points: DrawPoint[]): Record<string, unknown> {
  if (kind === 'level') return { price: points[0].price }
  if (kind === 'trend') {
    const [a, b] = points[0].time <= points[1].time ? points : [points[1], points[0]]
    return { fromTime: a.time, fromPrice: a.price, toTime: b.time, toPrice: b.price }
  }
  return { points }
}

/** A finished set of clicks → the anchors to store (positions add a 2R target). */
export function completePoints(kind: DrawingKind, clicks: DrawPoint[]): DrawPoint[] | null {
  if (kind !== 'long' && kind !== 'short') return clicks
  const [entry, stopClick] = clicks
  const risk = entry.price - stopClick.price
  if ((kind === 'long' && risk <= 0) || (kind === 'short' && risk >= 0)) return null
  const right = Math.max(stopClick.time, entry.time + 1)
  return [entry, { time: right, price: stopClick.price }, { time: right, price: entry.price + 2 * risk }]
}

/** Keep positions valid while an anchor is dragged; null rejects the move. */
export function constrainPoints(kind: DrawingKind, points: DrawPoint[]): DrawPoint[] | null {
  if (kind !== 'long' && kind !== 'short') return points
  const [entry, stop, target] = points
  const ok = kind === 'long' ? stop.price < entry.price && entry.price < target.price : target.price < entry.price && entry.price < stop.price
  return ok && stop.time > entry.time ? points : null
}

/** Default label for a trader's own drawing, stored with the mark. */
export function drawingLabel(kind: DrawingKind, points: DrawPoint[], price?: number): string {
  const name = tr(toolOf(kind).zh, toolOf(kind).en)
  if (kind === 'level') return `${name} ${fmtPrice(price)}`
  const first = points[0]
  if (!first) return name
  if (kind === 'hray' || kind === 'long' || kind === 'short') return `${name} ${fmtPrice(first.price)}`
  const when = new Date(first.time).toLocaleString(tr('zh-CN', 'en-US'), { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false })
  return `${name} ${when}`
}

/* ── geometry ────────────────────────────────────────────────────── */

export interface Projector {
  /** time/price → plot pixels (time may lie beyond the last candle). */
  project: (time: number, price: number) => { x: number; y: number } | null
  /** Plot area (excludes the price axis and lower panes). */
  width: number
  height: number
  /** Bar index distance between two times, for measure. */
  bars: (from: number, to: number) => number
  /** Closes of the bars in [from, to] (ms), for regression. */
  closes: (from: number, to: number) => DrawPoint[]
  /** Full bars in [from, to] (ms), for the volume profile. */
  candles?: (from: number, to: number) => Array<{ time: number; open: number; high: number; low: number; close: number; volume: number }>
  /** Volume profile of [from, to], cached per candle set by the chart. */
  profile?: (from: number, to: number, options?: { rows?: number; valueArea?: number }) => ReturnType<typeof volumeProfile>
  /** Open time of the first loaded bar and the bar spacing, to tell whether a range is fully covered. */
  firstTime?: number
  barMs?: number
}

type Pt = { x: number; y: number }

/** Clip the infinite line through a→b to the plot (Liang–Barsky); `from` 0 = ray from a, -Inf = both ways. */
function clipLine(a: Pt, b: Pt, w: number, h: number, from: number): [Pt, Pt] | null {
  const dx = b.x - a.x, dy = b.y - a.y
  let t0 = from, t1 = Infinity
  for (const [p, q] of [[-dx, a.x], [dx, w - a.x], [-dy, a.y], [dy, h - a.y]] as const) {
    if (p === 0) { if (q < 0) return null; continue }
    const r = q / p
    if (p < 0) { if (r > t1) return null; if (r > t0) t0 = r } else { if (r < t0) return null; if (r < t1) t1 = r }
  }
  if (!Number.isFinite(t0) || !Number.isFinite(t1)) return null
  return [{ x: a.x + t0 * dx, y: a.y + t0 * dy }, { x: a.x + t1 * dx, y: a.y + t1 * dy }]
}

/** A solid arrowhead at `tip`, pointing away from `from` (marker-free so it takes the stroke color). */
function arrowHead(from: Pt, tip: Pt, size = 10): string {
  const angle = Math.atan2(tip.y - from.y, tip.x - from.x)
  const left = { x: tip.x - size * Math.cos(angle - 0.45), y: tip.y - size * Math.sin(angle - 0.45) }
  const right = { x: tip.x - size * Math.cos(angle + 0.45), y: tip.y - size * Math.sin(angle + 0.45) }
  return `${tip.x},${tip.y} ${left.x},${left.y} ${right.x},${right.y}`
}

/** Signed price change with the magnitude's own precision (fmtPrice treats negatives as < 1). */
function signed(value: number): string { return `${value >= 0 ? '+' : '-'}${fmtPrice(Math.abs(value))}` }

function duration(ms: number): string {
  const minutes = Math.round(Math.abs(ms) / 60_000)
  if (minutes < 60) return `${minutes}m`
  const hours = minutes / 60
  if (hours < 48) return `${Math.round(hours * 10) / 10}h`
  return `${Math.round(hours / 24 * 10) / 10}d`
}

/** Approximate rendered width of 11px chart text: CJK and emoji are wide, Latin is narrow. */
const textWidth = (value: string) => [...value].reduce((sum, ch) => sum + (ch.charCodeAt(0) > 255 ? 12 : 6.6), 0)

/** Greedy wrap to `max` px; explicit newlines are kept, words longer than a line are broken. */
export function wrapText(value: string, max: number): string[] {
  const out: string[] = []
  for (const paragraph of value.split('\n')) {
    let line = ''
    for (const ch of paragraph) {
      if (line && textWidth(line + ch) > max) {
        const space = line.lastIndexOf(' ')
        if (ch !== ' ' && space > 0 && /^[\x20-\x7e]+$/.test(line.slice(space + 1))) { out.push(line.slice(0, space)); line = line.slice(space + 1) + ch }
        else { out.push(line); line = ch === ' ' ? '' : ch }
      } else line += ch
    }
    out.push(line)
  }
  return out.slice(0, 12)
}

/** Least-squares line through closes by bar index, with the residual standard deviation. */
export function regressionFit(bars: DrawPoint[]): { slope: number; intercept: number; sigma: number } | null {
  const n = bars.length
  if (n < 2) return null
  let sx = 0, sy = 0, sxx = 0, sxy = 0
  bars.forEach((bar, i) => { sx += i; sy += bar.price; sxx += i * i; sxy += i * bar.price })
  const slope = (n * sxy - sx * sy) / (n * sxx - sx * sx)
  const intercept = (sy - slope * sx) / n
  const variance = bars.reduce((sum, bar, i) => sum + (bar.price - (intercept + slope * i)) ** 2, 0) / n
  return { slope, intercept, sigma: Math.sqrt(variance) }
}

/** Polyline through the clicked points with a label at each. */
function wave(p: Pt[], labels: string[], text: (x: number, y: number, value: string, anchor?: 'start' | 'end' | 'middle', cls?: string) => React.ReactNode) {
  return <>
    <polyline className="dhl-pattern" points={p.map((point) => `${point.x},${point.y}`).join(' ')} />
    {p.map((point, index) => {
      const up = index === 0 ? (p[1] ? p[1].y > point.y : true) : point.y < p[index - 1].y
      return labels[index] ? <g key={index}>{text(point.x, point.y + (up ? -8 : 16), labels[index], 'middle', 'dhl-drawing-text dhl-wave-label')}</g> : null
    })}
  </>
}

const ratio = (a: number, b: number) => (b === 0 ? '—' : (Math.abs(a) / Math.abs(b)).toFixed(3))

/** Ratio label at the middle of a dashed guide between two points. */
function guide(a: Pt, b: Pt, value: string, key: string, text: (x: number, y: number, value: string, anchor?: 'start' | 'end' | 'middle', cls?: string) => React.ReactNode) {
  return <g key={key}><line className="dhl-drawing-mid" x1={a.x} y1={a.y} x2={b.x} y2={b.y} />{text((a.x + b.x) / 2, (a.y + b.y) / 2 - 4, value, 'middle', 'dhl-drawing-text dhl-ratio-label')}</g>
}

const BADGE_PATHS = { alert: 'M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0', shared: 'M4 9h13l-3-3M20 15H7l3 3' }

const DASH: Record<LineStyleName, string | undefined> = { solid: undefined, dashed: '7 5', dotted: '1.5 4' }

export interface ShapeProps {
  kind: DrawingKind
  points: DrawPoint[]
  label?: string
  /** Free text of a text drawing. */
  text?: string
  className?: string
  view: Projector
  /** Show anchor handles (selected or previewing). */
  anchors?: boolean
  /** Render the transparent hit layer and handle data attributes. */
  interactive?: boolean
  color?: string
  lineWidth?: number
  lineStyle?: LineStyleName
  id?: string
  /** Status icons near the first anchor (primitives, so React.memo holds). */
  alert?: boolean
  shared?: boolean
  /** Volume profile settings. */
  rows?: number
  valueArea?: number
}

/** One drawing as SVG; `points` are in click order (a preview passes clicks + hover). */
export const DrawingShape = React.memo(function DrawingShape({ kind, points, label, text: textValue, className, view, anchors = false, interactive = false, color, lineWidth, lineStyle, id, alert, shared, rows, valueArea }: ShapeProps) {
  const badges = [...(alert ? ['alert' as const] : []), ...(shared ? ['shared' as const] : [])]
  const { width: w, height: h } = view
  const px = points.map((point) => view.project(point.time, point.price))
  if (!px.length || px.some((point) => point == null)) return null
  const p = px as Pt[]
  const text = (x: number, y: number, value: string, anchor: 'start' | 'end' | 'middle' = 'start', cls = 'dhl-drawing-text') =>
    <text className={cls} x={x} y={y} textAnchor={anchor}>{value}</text>
  let body: React.ReactNode = null
  let handles: Pt[] = p

  switch (kind) {
    case 'level': body = <line x1="0" x2={w} y1={p[0].y} y2={p[0].y} />; handles = [{ x: Math.min(w - 24, Math.max(24, p[0].x)), y: p[0].y }]; break
    case 'hray': body = <line x1={p[0].x} x2={w} y1={p[0].y} y2={p[0].y} />; break
    case 'vline': body = <line x1={p[0].x} x2={p[0].x} y1="0" y2={h} />; handles = [{ x: p[0].x, y: Math.min(h - 12, Math.max(12, p[0].y)) }]; break
    case 'trend': body = p[1] ? <line x1={p[0].x} y1={p[0].y} x2={p[1].x} y2={p[1].y} /> : null; break
    case 'ray':
    case 'extended': {
      if (!p[1]) break
      const seg = clipLine(p[0], p[1], w, h, kind === 'ray' ? 0 : -Infinity)
      body = seg ? <line x1={seg[0].x} y1={seg[0].y} x2={seg[1].x} y2={seg[1].y} /> : null
      break
    }
    case 'channel': {
      if (!p[1]) break
      const base = <line x1={p[0].x} y1={p[0].y} x2={p[1].x} y2={p[1].y} />
      if (!p[2]) { body = base; break }
      // Offset in price space: the third point's distance from the base line at its time.
      const k = points[1].time === points[0].time ? 0 : (points[2].time - points[0].time) / (points[1].time - points[0].time)
      const offset = points[2].price - (points[0].price + (points[1].price - points[0].price) * k)
      const a2 = view.project(points[0].time, points[0].price + offset), b2 = view.project(points[1].time, points[1].price + offset)
      const am = view.project(points[0].time, points[0].price + offset / 2), bm = view.project(points[1].time, points[1].price + offset / 2)
      if (!a2 || !b2 || !am || !bm) { body = base; break }
      body = <>
        <polygon className="dhl-drawing-fill" points={`${p[0].x},${p[0].y} ${p[1].x},${p[1].y} ${b2.x},${b2.y} ${a2.x},${a2.y}`} />
        {base}<line x1={a2.x} y1={a2.y} x2={b2.x} y2={b2.y} />
        <line className="dhl-drawing-mid" x1={am.x} y1={am.y} x2={bm.x} y2={bm.y} />
      </>
      break
    }
    case 'fib': {
      if (!p[1]) break
      const [start, end] = points
      const x0 = Math.min(p[0].x, p[1].x), x1 = Math.max(p[0].x, p[1].x, x0 + 40)
      const rows = FIB_LEVELS.map((level) => ({ level, price: end.price + (start.price - end.price) * level }))
        .map((row) => ({ ...row, y: view.project(end.time, row.price)?.y })).filter((row): row is { level: number; price: number; y: number } => row.y != null)
      body = <>
        {rows.slice(1).map((row, index) => <rect key={`b${row.level}`} className={`dhl-fib-band band-${index % 3}`} x={x0} width={x1 - x0} y={Math.min(row.y, rows[index].y)} height={Math.abs(row.y - rows[index].y)} />)}
        {rows.map((row) => <g key={row.level}>
          <line className={row.level === 0.5 || row.level === 0.618 ? 'dhl-fib-key' : undefined} x1={x0} x2={x1} y1={row.y} y2={row.y} />
          {text(x0 + 4, row.y - 3, `${row.level} (${fmtPrice(row.price)})`)}
        </g>)}
        <line className="dhl-drawing-mid" x1={p[0].x} y1={p[0].y} x2={p[1].x} y2={p[1].y} />
      </>
      break
    }
    case 'rect': {
      if (!p[1]) break
      body = <rect className="dhl-drawing-fill" x={Math.min(p[0].x, p[1].x)} y={Math.min(p[0].y, p[1].y)} width={Math.abs(p[1].x - p[0].x)} height={Math.abs(p[1].y - p[0].y)} />
      break
    }
    case 'crossline': body = <><line x1="0" x2={w} y1={p[0].y} y2={p[0].y} /><line x1={p[0].x} x2={p[0].x} y1="0" y2={h} /></>; break
    case 'pricelabel': {
      const value = fmtPrice(points[0].price)
      const width = 16 + value.length * 7
      body = <>
        <polygon className="dhl-price-tag" points={`${p[0].x},${p[0].y} ${p[0].x + 8},${p[0].y - 11} ${p[0].x + 8 + width},${p[0].y - 11} ${p[0].x + 8 + width},${p[0].y + 11} ${p[0].x + 8},${p[0].y + 11}`} />
        {text(p[0].x + 14, p[0].y + 4, value, 'start', 'dhl-drawing-text dhl-price-tag-text')}
      </>
      break
    }
    case 'infoline':
    case 'trendangle': {
      if (!p[1]) break
      const angle = Math.atan2(p[0].y - p[1].y, p[1].x - p[0].x) * 180 / Math.PI
      if (kind === 'trendangle') {
        const radius = 34, rad = angle * Math.PI / 180
        const arcEnd = { x: p[0].x + radius * Math.cos(rad), y: p[0].y - radius * Math.sin(rad) }
        body = <>
          <line x1={p[0].x} y1={p[0].y} x2={p[1].x} y2={p[1].y} />
          <line className="dhl-drawing-mid" x1={p[0].x} y1={p[0].y} x2={p[0].x + radius + 16} y2={p[0].y} />
          <path className="dhl-angle-arc" d={`M${p[0].x + radius},${p[0].y} A${radius},${radius} 0 0 ${angle > 0 ? 0 : 1} ${arcEnd.x},${arcEnd.y}`} />
          {text(p[0].x + radius + 20, p[0].y + (angle > 0 ? -6 : 14), `${angle.toFixed(1)}°`)}
        </>
        break
      }
      const [a, b] = points
      const change = b.price - a.price, pct = a.price > 0 ? change / a.price * 100 : 0
      body = <>
        <line x1={p[0].x} y1={p[0].y} x2={p[1].x} y2={p[1].y} />
        <rect className="dhl-measure-box" x={p[1].x + 8} y={p[1].y - 30} width="172" height="52" rx="4" />
        {text(p[1].x + 16, p[1].y - 14, `${signed(change)} (${change >= 0 ? '+' : ''}${pct.toFixed(2)}%)`)}
        {text(p[1].x + 16, p[1].y + 1, `${Math.round(view.bars(a.time, b.time))} ${tr('根', 'bars')} · ${duration(b.time - a.time)}`)}
        {text(p[1].x + 16, p[1].y + 16, `${tr('角度', 'Angle')} ${angle.toFixed(1)}°`)}
      </>
      break
    }
    case 'pricerange':
    case 'daterange': {
      if (!p[1]) break
      const [a, b] = points
      const x0 = Math.min(p[0].x, p[1].x), x1 = Math.max(p[0].x, p[1].x), y0 = Math.min(p[0].y, p[1].y), y1 = Math.max(p[0].y, p[1].y)
      if (kind === 'pricerange') {
        const change = b.price - a.price, pct = a.price > 0 ? change / a.price * 100 : 0, cx = (x0 + x1) / 2
        body = <>
          <rect className="dhl-drawing-fill" x={x0} y={y0} width={Math.max(2, x1 - x0)} height={y1 - y0} />
          <line x1={cx} x2={cx} y1={p[0].y} y2={p[1].y} /><polygon className="dhl-arrow-head" points={arrowHead(p[0].y < p[1].y ? { x: cx, y: y0 } : { x: cx, y: y1 }, { x: cx, y: p[1].y })} />
          {text(cx, (change >= 0 ? y0 - 6 : y1 + 14), `${signed(change)} (${change >= 0 ? '+' : ''}${pct.toFixed(2)}%)`, 'middle')}
        </>
      } else {
        const cy = (y0 + y1) / 2
        body = <>
          <rect className="dhl-drawing-fill" x={x0} y={y0} width={x1 - x0} height={Math.max(2, y1 - y0)} />
          <line x1={p[0].x} x2={p[1].x} y1={cy} y2={cy} /><polygon className="dhl-arrow-head" points={arrowHead({ x: p[0].x, y: cy }, { x: p[1].x, y: cy })} />
          {text((x0 + x1) / 2, y1 + 14, `${Math.abs(Math.round(view.bars(a.time, b.time)))} ${tr('根', 'bars')} · ${duration(b.time - a.time)}`, 'middle')}
        </>
      }
      break
    }
    case 'arrow': {
      if (!p[1]) break
      body = <><line x1={p[0].x} y1={p[0].y} x2={p[1].x} y2={p[1].y} /><polygon className="dhl-arrow-head" points={arrowHead(p[0], p[1])} /></>
      break
    }
    case 'circle': {
      if (!p[1]) break
      body = <circle className="dhl-drawing-fill" cx={p[0].x} cy={p[0].y} r={Math.hypot(p[1].x - p[0].x, p[1].y - p[0].y)} />
      break
    }
    case 'triangle': {
      body = p.length === 2 ? <line x1={p[0].x} y1={p[0].y} x2={p[1].x} y2={p[1].y} />
        : p.length >= 3 ? <polygon className="dhl-drawing-fill" points={p.slice(0, 3).map((point) => `${point.x},${point.y}`).join(' ')} /> : null
      break
    }
    case 'brush': {
      if (p.length < 2) break
      body = <polyline className="dhl-brush" points={p.map((point) => `${point.x},${point.y}`).join(' ')} />
      handles = []
      break
    }
    case 'callout': {
      if (!p[1]) break
      const value = textValue || label || tr('标注', 'Note')
      const width = Math.min(280, 16 + [...value].reduce((sum, ch) => sum + (ch.charCodeAt(0) > 255 ? 12 : 6.6), 0))
      body = <>
        <line x1={p[0].x} y1={p[0].y} x2={p[1].x} y2={p[1].y + 12} />
        <circle className="dhl-callout-dot" cx={p[0].x} cy={p[0].y} r="3" />
        <rect className="dhl-text-box" x={p[1].x} y={p[1].y} width={width} height="26" rx="6" />
        {text(p[1].x + 8, p[1].y + 17, value, 'start', 'dhl-drawing-text dhl-text-value')}
      </>
      break
    }
    case 'fibext': {
      if (!p[1]) break
      if (!p[2]) { body = <line className="dhl-drawing-mid" x1={p[0].x} y1={p[0].y} x2={p[1].x} y2={p[1].y} />; break }
      const [a, b, c] = points
      const x0 = p[2].x, x1 = Math.max(x0 + Math.abs(p[1].x - p[0].x), x0 + 60)
      const rows = FIB_EXT_LEVELS.map((level) => ({ level, price: c.price + (b.price - a.price) * level }))
        .map((row) => ({ ...row, y: view.project(c.time, row.price)?.y })).filter((row): row is { level: number; price: number; y: number } => row.y != null)
      body = <>
        <polyline className="dhl-drawing-mid" points={`${p[0].x},${p[0].y} ${p[1].x},${p[1].y} ${p[2].x},${p[2].y}`} />
        {rows.map((row) => <g key={row.level}>
          <line className={row.level === 1 || row.level === 1.618 ? 'dhl-fib-key' : undefined} x1={x0} x2={x1} y1={row.y} y2={row.y} />
          {text(x0 + 4, row.y - 3, `${row.level} (${fmtPrice(row.price)})`)}
        </g>)}
      </>
      break
    }
    case 'fibchannel': {
      if (!p[1]) break
      if (!p[2]) { body = <line x1={p[0].x} y1={p[0].y} x2={p[1].x} y2={p[1].y} />; break }
      const k = (points[2].time - points[0].time) / ((points[1].time - points[0].time) || 1)
      const offset = points[2].price - (points[0].price + (points[1].price - points[0].price) * k)
      body = <>{FIB_LEVELS.map((level) => {
        const a2 = view.project(points[0].time, points[0].price + offset * level), b2 = view.project(points[1].time, points[1].price + offset * level)
        const seg = a2 && b2 ? clipLine(a2, b2, w, h, 0) : null
        return seg ? <g key={level}>
          <line className={level === 0.5 || level === 0.618 ? 'dhl-fib-key' : undefined} x1={seg[0].x} y1={seg[0].y} x2={seg[1].x} y2={seg[1].y} />
          {text(a2!.x + 4, a2!.y - 3, String(level))}
        </g> : null
      })}</>
      break
    }
    case 'fibtime': {
      if (!p[1]) break
      const step = points[1].time - points[0].time
      body = <>{FIB_TIME_SERIES.map((n) => {
        const x = view.project(points[0].time + step * n, points[0].price)?.x
        return x == null || x < -2 || x > w + 2 ? null : <g key={n}><line className={n === 0 || n === 1 ? 'dhl-fib-key' : undefined} x1={x} x2={x} y1="0" y2={h} />{text(x + 3, 12, String(n))}</g>
      })}</>
      break
    }
    case 'gannfan': {
      if (!p[1]) break
      const dx = p[1].x - p[0].x, dy = p[1].y - p[0].y
      body = <>{GANN_RATIOS.map(([priceUnits, timeUnits]) => {
        // 1×1 runs through the second point; n×m scales its price/time slope by n/m.
        const end = { x: p[0].x + dx, y: p[0].y + dy * priceUnits / timeUnits }
        const seg = clipLine(p[0], end, w, h, 0)
        if (!seg) return null
        const one = priceUnits === 1 && timeUnits === 1
        return <g key={`${priceUnits}x${timeUnits}`}><line className={one ? 'dhl-fib-key' : undefined} x1={seg[0].x} y1={seg[0].y} x2={seg[1].x} y2={seg[1].y} />
          {text(Math.min(seg[1].x - 4, w - 30), Math.max(12, Math.min(h - 4, seg[1].y)), `${priceUnits}×${timeUnits}`, 'end')}</g>
      })}</>
      break
    }
    case 'pitchfork':
    case 'schiff':
    case 'modschiff': {
      if (!p[1]) break
      if (!p[2]) { body = <line x1={p[0].x} y1={p[0].y} x2={p[1].x} y2={p[1].y} />; break }
      const mid = { x: (p[1].x + p[2].x) / 2, y: (p[1].y + p[2].y) / 2 }
      // Schiff moves the handle to the A–B price midpoint; modified Schiff to the A–B midpoint in time and price.
      const origin = kind === 'schiff' ? { x: p[0].x, y: (p[0].y + p[1].y) / 2 } : kind === 'modschiff' ? { x: (p[0].x + p[1].x) / 2, y: (p[0].y + p[1].y) / 2 } : p[0]
      const dir = { x: mid.x - origin.x, y: mid.y - origin.y }
      const median = clipLine(origin, mid, w, h, 0)
      const prong = (from: Pt) => clipLine(from, { x: from.x + dir.x, y: from.y + dir.y }, w, h, 0)
      const upper = prong(p[1]), lower = prong(p[2])
      body = <>
        {upper && lower ? <polygon className="dhl-drawing-fill" points={`${upper[0].x},${upper[0].y} ${upper[1].x},${upper[1].y} ${lower[1].x},${lower[1].y} ${lower[0].x},${lower[0].y}`} /> : null}
        {median ? <line x1={median[0].x} y1={median[0].y} x2={median[1].x} y2={median[1].y} /> : null}
        {upper ? <line x1={upper[0].x} y1={upper[0].y} x2={upper[1].x} y2={upper[1].y} /> : null}
        {lower ? <line x1={lower[0].x} y1={lower[0].y} x2={lower[1].x} y2={lower[1].y} /> : null}
        <line className="dhl-drawing-mid" x1={p[1].x} y1={p[1].y} x2={p[2].x} y2={p[2].y} />
        {origin !== p[0] ? <line className="dhl-drawing-mid" x1={p[0].x} y1={p[0].y} x2={origin.x} y2={origin.y} /> : null}
      </>
      break
    }
    case 'elliott': body = wave(p, ['0', '(1)', '(2)', '(3)', '(4)', '(5)'], text); break
    case 'elliottabc': body = wave(p, ['0', '(A)', '(B)', '(C)'], text); break
    case 'abcd': {
      body = <>{wave(p, ['A', 'B', 'C', 'D'], text)}
        {p[2] ? guide(p[0], p[2], ratio(points[2].price - points[1].price, points[1].price - points[0].price), 'ac', text) : null}
        {p[3] ? guide(p[1], p[3], ratio(points[3].price - points[2].price, points[2].price - points[1].price), 'bd', text) : null}</>
      break
    }
    case 'xabcd': {
      const [X, A, B, C, D] = points
      body = <>
        {p[2] ? <polygon className="dhl-drawing-fill" points={`${p[0].x},${p[0].y} ${p[1].x},${p[1].y} ${p[2].x},${p[2].y}`} /> : null}
        {p[4] ? <polygon className="dhl-drawing-fill" points={`${p[2].x},${p[2].y} ${p[3].x},${p[3].y} ${p[4].x},${p[4].y}`} /> : null}
        {wave(p, ['X', 'A', 'B', 'C', 'D'], text)}
        {p[2] ? guide(p[0], p[2], ratio(B.price - A.price, A.price - X.price), 'xb', text) : null}
        {p[3] ? guide(p[1], p[3], ratio(C.price - B.price, B.price - A.price), 'ac', text) : null}
        {p[4] ? guide(p[2], p[4], ratio(D.price - C.price, C.price - B.price), 'bd', text) : null}
        {p[4] ? guide(p[0], p[4], ratio(D.price - A.price, A.price - X.price), 'xd', text) : null}
      </>
      break
    }
    case 'headshoulders': {
      const names = ['', tr('左肩', 'LS'), '', tr('头', 'Head'), '', tr('右肩', 'RS'), '']
      const neck = p[4] ? clipLine(p[2], p[4], w, h, -Infinity) : null
      body = <>
        {p[4] ? <polygon className="dhl-drawing-fill" points={`${p[2].x},${p[2].y} ${p[3].x},${p[3].y} ${p[4].x},${p[4].y}`} /> : null}
        {wave(p, names, text)}
        {neck ? <line className="dhl-neckline" x1={neck[0].x} y1={neck[0].y} x2={neck[1].x} y2={neck[1].y} /> : null}
      </>
      break
    }
    case 'gannbox':
    case 'gannsquare': {
      if (!p[1]) break
      const x0 = Math.min(p[0].x, p[1].x), x1 = Math.max(p[0].x, p[1].x), y0 = Math.min(p[0].y, p[1].y), y1 = Math.max(p[0].y, p[1].y)
      const levels = kind === 'gannbox' ? GANN_BOX_LEVELS : [0, 0.25, 0.5, 0.75, 1]
      const xs = levels.map((level) => x0 + (x1 - x0) * level), ys = levels.map((level) => y0 + (y1 - y0) * level)
      body = <>
        <rect className="dhl-drawing-fill" x={x0} y={y0} width={x1 - x0} height={y1 - y0} />
        {xs.slice(1, -1).map((x, i) => <line key={`v${i}`} className="dhl-drawing-mid" x1={x} x2={x} y1={y0} y2={y1} />)}
        {ys.slice(1, -1).map((y, i) => <line key={`h${i}`} className="dhl-drawing-mid" x1={x0} x2={x1} y1={y} y2={y} />)}
        <line x1={x0} y1={y1} x2={x1} y2={y0} /><line x1={x0} y1={y0} x2={x1} y2={y1} />
        {kind === 'gannsquare' ? [[x0, y1, x1, (y0 + y1) / 2], [x0, y1, (x0 + x1) / 2, y0], [x0, y0, x1, (y0 + y1) / 2], [x0, y0, (x0 + x1) / 2, y1]].map(([ax, ay, bx, by], i) => <line key={`f${i}`} className="dhl-drawing-mid" x1={ax} y1={ay} x2={bx} y2={by} />) : null}
        {kind === 'gannbox' ? levels.map((level, i) => <g key={`l${level}`}>{text(xs[i], y0 - 4, String(level), 'middle')}{text(x0 - 4, ys[i] + 3, String(level), 'end')}</g>) : null}
      </>
      break
    }
    case 'icon': {
      // The icon name lives in the drawing's label, passed as `text` for every source (user or agent).
      const name = textValue || label || ''
      if (name.startsWith('emoji:')) { body = <text className="dhl-sticker" x={p[0].x} y={p[0].y + 9} textAnchor="middle">{name.slice(6)}</text>; handles = [{ x: p[0].x, y: p[0].y }]; break }
      const glyph = ICONS[name] ?? ICONS.star
      body = <g className="dhl-icon">
        <circle className="dhl-icon-bg" cx={p[0].x} cy={p[0].y} r="13" />
        <path d={glyph[2]} transform={`translate(${p[0].x - 9} ${p[0].y - 9}) scale(.75)`} />
      </g>
      break
    }
    case 'regression': {
      if (!p[1]) break
      const [from, to] = points[0].time <= points[1].time ? points : [points[1], points[0]]
      const bars = view.closes(from.time, to.time)
      const fit = regressionFit(bars)
      if (!fit) { body = <line className="dhl-drawing-mid" x1={p[0].x} y1={p[0].y} x2={p[1].x} y2={p[1].y} />; break }
      const at = (offset: number, index: number) => view.project(bars[index].time, fit.intercept + fit.slope * index + offset)
      const last = bars.length - 1
      const lines = [0, 2 * fit.sigma, -2 * fit.sigma].map((offset) => [at(offset, 0), at(offset, last)] as const)
      if (lines.some(([a, b]) => !a || !b)) break
      const [[c0, c1], [u0, u1], [l0, l1]] = lines as Array<readonly [Pt, Pt]>
      body = <>
        <polygon className="dhl-drawing-fill" points={`${u0.x},${u0.y} ${u1.x},${u1.y} ${l1.x},${l1.y} ${l0.x},${l0.y}`} />
        <line x1={c0.x} y1={c0.y} x2={c1.x} y2={c1.y} />
        <line className="dhl-drawing-mid" x1={u0.x} y1={u0.y} x2={u1.x} y2={u1.y} />
        <line className="dhl-drawing-mid" x1={l0.x} y1={l0.y} x2={l1.x} y2={l1.y} />
        {text(c1.x + 4, c1.y - 4, `σ ${fmtPrice(fit.sigma)}`)}
      </>
      handles = [c0, c1]
      break
    }
    case 'vprofile': {
      if (!p[1]) break
      const [from, to] = points[0].time <= points[1].time ? points : [points[1], points[0]]
      const x0 = Math.min(p[0].x, p[1].x), x1 = Math.max(p[0].x, p[1].x)
      const settings = { rows: rows ?? 48, valueArea: valueArea ?? 0.7 }
      const profile = view.profile ? view.profile(from.time, to.time, settings) : volumeProfile(view.candles?.(from.time, to.time) ?? [], settings)
      const partial = view.firstTime != null && view.barMs != null && view.firstTime - from.time > view.barMs
      if (!profile) {
        body = <><rect className="dhl-drawing-fill" x={x0} y={0} width={Math.max(1, x1 - x0)} height={h} />{text(x0 + 4, 16, tr('区间内暂无成交量数据', 'No volume in this range'), 'start')}</>
        handles = [p[0], p[1]]
        break
      }
      const y = (price: number) => view.project(from.time, price)?.y
      const maxRow = Math.max(...profile.rows.map((row) => row.up + row.down)) || 1
      const span = Math.max(24, (x1 - x0) * 0.3)
      const yTop = y(profile.rows.at(-1)!.high), yBottom = y(profile.rows[0].low), yPoc = y(profile.poc), yVah = y(profile.vah), yVal = y(profile.val)
      body = <g className="dhl-vprofile">
        {yTop != null && yBottom != null ? <rect className="dhl-vprofile-range" x={x0} y={yTop} width={Math.max(1, x1 - x0)} height={Math.max(1, yBottom - yTop)} /> : null}
        {profile.rows.map((row, index) => {
          const top = y(row.high), bottom = y(row.low)
          if (top == null || bottom == null) return null
          const height = Math.max(1, bottom - top - 0.5), inValue = index >= profile.valueLow && index <= profile.valueHigh
          const upWidth = span * row.up / maxRow, downWidth = span * row.down / maxRow
          return <g key={index} className={inValue ? 'dhl-vprofile-va' : 'dhl-vprofile-out'}>
            <rect className="dhl-vprofile-up" x={x0} y={top} width={upWidth} height={height} />
            <rect className="dhl-vprofile-down" x={x0 + upWidth} y={top} width={downWidth} height={height} />
          </g>
        })}
        {yPoc != null ? <><line className="dhl-vprofile-poc" x1={x0} y1={yPoc} x2={x1} y2={yPoc} />{text(x1 - 4, yPoc - 4, `POC ${fmtPrice(profile.poc)}`, 'end')}</> : null}
        {yVah != null ? <><line className="dhl-drawing-mid" x1={x0} y1={yVah} x2={x1} y2={yVah} />{text(x1 - 4, yVah - 4, `VAH ${fmtPrice(profile.vah)}`, 'end')}</> : null}
        {yVal != null ? <><line className="dhl-drawing-mid" x1={x0} y1={yVal} x2={x1} y2={yVal} />{text(x1 - 4, yVal + 12, `VAL ${fmtPrice(profile.val)}`, 'end')}</> : null}
        {yBottom != null ? text(x0 + 4, Math.min(h - 4, yBottom + 14), partial ? tr('K 线估算 · 区间前段历史未加载', 'Estimated from bars · early range not loaded') : tr('K 线估算', 'Estimated from bars'), 'start', partial ? 'dhl-drawing-text dhl-vprofile-warn' : 'dhl-drawing-text') : null}
      </g>
      handles = [p[0], p[1]]
      break
    }
    case 'text': {
      const value = textValue || label || tr('文本', 'Text')
      const lines = wrapText(value, 300)
      const width = 14 + Math.max(...lines.map(textWidth))
      body = <>
        <rect className="dhl-text-box" x={p[0].x} y={p[0].y - 20} width={width} height={8 + lines.length * 16} rx="4" />
        {lines.map((line, index) => <React.Fragment key={index}>{text(p[0].x + 7, p[0].y - 4 + index * 16, line, 'start', 'dhl-drawing-text dhl-text-value')}</React.Fragment>)}
      </>
      break
    }
    case 'measure': {
      if (!p[1]) break
      const [a, b] = points
      const change = b.price - a.price, pct = a.price > 0 ? change / a.price * 100 : 0
      const bars = Math.round(view.bars(a.time, b.time))
      const up = change >= 0
      const cx = (p[0].x + p[1].x) / 2
      const boxY = up ? Math.min(p[0].y, p[1].y) - 44 : Math.max(p[0].y, p[1].y) + 8
      body = <g className={`dhl-measure ${up ? 'up' : 'down'}`}>
        <rect className="dhl-drawing-fill" x={Math.min(p[0].x, p[1].x)} y={Math.min(p[0].y, p[1].y)} width={Math.abs(p[1].x - p[0].x)} height={Math.abs(p[1].y - p[0].y)} />
        <line x1={cx} x2={cx} y1={p[0].y} y2={p[1].y} markerEnd="url(#dhl-arrow)" />
        <rect className="dhl-measure-box" x={cx - 78} y={boxY} width="156" height="36" rx="4" />
        {text(cx, boxY + 15, `${signed(change)} (${up ? '+' : ''}${pct.toFixed(2)}%)`, 'middle')}
        {text(cx, boxY + 29, `${Math.abs(bars)} ${tr('根', 'bars')} · ${duration(b.time - a.time)}`, 'middle')}
      </g>
      break
    }
    case 'long':
    case 'short': {
      const [entry, stop, target] = points
      if (!p[1]) break
      const right = p[1].x, left = p[0].x
      const yEntry = p[0].y, yStop = p[1].y, yTarget = p[2]?.y
      const risk = Math.abs(entry.price - stop.price)
      const reward = target ? Math.abs(target.price - entry.price) : 0
      const pct = (value: number) => entry.price > 0 ? (value / entry.price * 100).toFixed(2) : '0.00'
      const x0 = Math.min(left, right), width = Math.max(2, Math.abs(right - left))
      body = <g className="dhl-position">
        <rect className="dhl-position-stop" x={x0} width={width} y={Math.min(yEntry, yStop)} height={Math.abs(yStop - yEntry)} />
        {yTarget != null ? <rect className="dhl-position-target" x={x0} width={width} y={Math.min(yEntry, yTarget)} height={Math.abs(yTarget - yEntry)} /> : null}
        <line className="dhl-position-entry" x1={x0} x2={x0 + width} y1={yEntry} y2={yEntry} />
        {yTarget != null ? text(x0 + width / 2, yTarget + (kind === 'long' ? -6 : 14), `${tr('止盈', 'Target')} ${fmtPrice(target.price)} (+${pct(reward)}%)`, 'middle', 'dhl-drawing-text dhl-position-text') : null}
        {text(x0 + width / 2, yStop + (kind === 'long' ? 14 : -6), `${tr('止损', 'Stop')} ${fmtPrice(stop.price)} (-${pct(risk)}%)`, 'middle', 'dhl-drawing-text dhl-position-text')}
        {text(x0 + width / 2, yEntry + (kind === 'long' ? -6 : 14), `${kind === 'long' ? tr('多', 'Long') : tr('空', 'Short')} ${fmtPrice(entry.price)} · R:R ${risk > 0 ? (reward / risk).toFixed(2) : '—'}`, 'middle', 'dhl-drawing-text dhl-position-text')}
      </g>
      handles = [p[0], p[1], ...(p[2] ? [p[2]] : [])]
      break
    }
  }
  if (body == null) return null
  const style = { color, '--dhl-line-width': lineWidth ? String(lineWidth) : undefined, '--dhl-dash': lineStyle ? DASH[lineStyle] ?? 'none' : undefined } as React.CSSProperties
  return <g className={className} style={style} data-mark-id={id}>
    {body}
    {label && !isTextKind(kind) && kind !== 'icon' && p[0] ? text(Math.min(Math.max(p[0].x + 6, 4), w - 120), p[0].y - 6, label) : null}
    {badges?.length && p[0] ? badges.map((badge, index) => <svg key={badge} className="dhl-drawing-badge" x={Math.min(Math.max(p[0].x + 6, 4), w - 40) + index * 16} y={p[0].y + 5} width="13" height="13" viewBox="0 0 24 24">
      <path d={BADGE_PATHS[badge]} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>) : null}
    {interactive ? <g className="dhl-drawing-hit" data-mark-id={id} data-hit="body">{body}</g> : null}
    {anchors ? handles.map((point, index) => <circle key={index} className="dhl-chart-anchor" data-mark-id={id} data-anchor={index} cx={point.x} cy={point.y} r="5" />) : null}
  </g>
})
