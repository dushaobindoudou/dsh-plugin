/**
 * dsh-hyperliquid — chart drawing kinds shared by the host (validation, the
 * hyper_chart tool) and the browser chart (tools menu, rendering).
 *
 * level / trend keep their original flat fields (price; fromTime…toPrice);
 * every other kind stores `points: [{ time, price }]` in click order.
 * @module lib/chart-drawings
 */

/** kind → number of anchor points (level: a price only). */
export const DRAWING_POINTS = {
  level: 1, hray: 1, vline: 1, text: 1, trend: 2, ray: 2, extended: 2, fib: 2, rect: 2, measure: 2, channel: 3,
  // Positions store [entry, stop, target]; the desk creates them with 2 clicks (target defaults to 2R).
  long: 3, short: 3,
  // Fibonacci family, Gann, pitchfork, regression.
  fibext: 3, fibchannel: 3, fibtime: 2, gannfan: 2, pitchfork: 3, regression: 2,
  // Annotation and shapes. brush is freehand: 0 = variable (BRUSH_MIN..BRUSH_MAX points).
  arrow: 2, callout: 2, circle: 2, triangle: 3, brush: 0,
  // More lines and measures: cross line, price label, info line, trend angle, price-only and date-only ranges.
  crossline: 1, pricelabel: 1, infoline: 2, trendangle: 2, pricerange: 2, daterange: 2,
  // Advanced: Elliott waves, harmonic / chart patterns, Gann box & square, pitchfork variants, icons.
  elliott: 6, elliottabc: 4, xabcd: 5, abcd: 4, headshoulders: 7,
  gannbox: 2, gannsquare: 2, schiff: 3, modschiff: 3, icon: 1,
}
/** Icon stickers (the drawing's label holds the icon name). */
export const ICON_NAMES = ['flag', 'star', 'up', 'down', 'warning', 'check', 'cross', 'fire', 'target', 'bell', 'pin', 'clock', 'dollar', 'shield', 'bolt', 'heart', 'question', 'info']
/** Sticker library (TradingView's emoji stickers): category → emoji. An icon label is a name or `emoji:<char>`. */
export const STICKERS = {
  trading: ['📈', '📉', '💰', '💸', '🚀', '🎯', '🔥', '💎', '🐂', '🐻', '🐋', '🚨', '🔔', '⏰', '📌', '🧭', '🛑', '🏦', '⚖️', '🪙'],
  faces: ['😀', '😂', '😎', '🤔', '😱', '😭', '😡', '🥳', '🤯', '🙏', '👍', '👎', '👀', '💪', '🫡', '🤝'],
  symbols: ['⭐', '❗', '❓', '💡', '🔒', '🔓', '⛔', '🟢', '🔴', '🟡', '⬆️', '⬇️', '↗️', '↘️', '🏁', '🎉', '✅', '❌', '⚠️', '♻️', '⏸️', '▶️'],
}
const STICKER_SET = new Set(Object.values(STICKERS).flat())
/** Whether an icon drawing's label names a built-in icon or a library sticker. */
export function isIconLabel(label) {
  if (ICON_NAMES.includes(label)) return true
  if (typeof label !== 'string' || !label.startsWith('emoji:')) return false
  const emoji = label.slice(6)
  return STICKER_SET.has(emoji) || isSingleEmoji(emoji)
}

/** Any one emoji (a single grapheme that is pictographic, or a regional-indicator flag), so the whole emoji set works as stickers. */
export function isSingleEmoji(value) {
  if (typeof value !== 'string' || !value || value.length > 32 || !/\p{Extended_Pictographic}|\p{Regional_Indicator}/u.test(value)) return false
  return [...new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(value)].length === 1
}
/** Gann box divisions on both axes (TradingView defaults). */
export const GANN_BOX_LEVELS = [0, 0.25, 0.382, 0.5, 0.618, 0.75, 1]
/** Drawings a price can cross: alerts fire when the mid price crosses them (once, like TradingView). */
export const ALERT_KINDS = ['level', 'hray', 'trend', 'ray', 'extended']

/** The line's price at `time`, or null when the drawing does not exist at that time. */
export function linePriceAt(mark, time) {
  if (mark.kind === 'level') return Number(mark.price)
  const [a, b] = mark.kind === 'trend'
    ? [{ time: mark.fromTime, price: mark.fromPrice }, { time: mark.toTime, price: mark.toPrice }]
    : mark.points ?? []
  if (!a) return null
  if (mark.kind === 'hray') return time >= a.time ? a.price : null
  if (!b || b.time === a.time) return null
  if (mark.kind === 'trend' && (time < Math.min(a.time, b.time) || time > Math.max(a.time, b.time))) return null
  if (mark.kind === 'ray' && (time - a.time) * (b.time - a.time) < 0) return null
  return a.price + (b.price - a.price) * (time - a.time) / (b.time - a.time)
}

export const BRUSH_MIN = 2
export const BRUSH_MAX = 500
/** Kinds whose label is free text shown on the chart (up to 200 characters). */
export const TEXT_KINDS = ['text', 'callout']
/** Clicks that create a drawing when they differ from its stored anchor count. */
export const DRAWING_CLICKS = { ...Object.fromEntries(Object.entries(DRAWING_POINTS)), long: 2, short: 2 }
export const DRAWING_KINDS = Object.keys(DRAWING_POINTS)
/** Fibonacci retracement levels (0 = second point, 1 = first point, as in TradingView). */
export const FIB_LEVELS = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1]
/** Trend-based Fibonacci extension levels (projected from the third point, TradingView defaults). */
export const FIB_EXT_LEVELS = [0, 0.382, 0.618, 1, 1.272, 1.618, 2, 2.618]
/** Fibonacci time zones: bar multiples of the first two points' spacing. */
export const FIB_TIME_SERIES = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
/** Gann fan angles as price/time ratios relative to the 1×1 line. */
export const GANN_RATIOS = [[1, 8], [1, 4], [1, 3], [1, 2], [1, 1], [2, 1], [3, 1], [4, 1], [8, 1]]

const OLDEST = Date.UTC(2015, 0, 1)

/**
 * Validate the geometry of one drawing request (throws on invalid input).
 * @returns the geometry fields to persist for that kind.
 */
export function drawingGeometry(kind, request, now = Date.now()) {
  if (!DRAWING_KINDS.includes(kind)) throw new Error(`画线类型必须为 ${DRAWING_KINDS.join('/')}`)
  const latest = now + 365 * 86_400_000
  const point = (time, price, label) => {
    const t = Number(time), p = Number(price)
    if (!Number.isFinite(t) || t < OLDEST || t > latest) throw new Error(`${label}时间必须为 2015 年至今后一年内的毫秒时间戳`)
    if (!Number.isFinite(p) || p <= 0) throw new Error(`${label}价格必须为正数`)
    return { time: t, price: p }
  }
  if (kind === 'level') {
    const price = Number(request?.price)
    if (!Number.isFinite(price) || price <= 0) throw new Error('水平线 price 必须为正数')
    return { price }
  }
  if (kind === 'trend') {
    const from = point(request?.fromTime, request?.fromPrice, '趋势线起点')
    const to = point(request?.toTime, request?.toPrice, '趋势线终点')
    if (to.time <= from.time) throw new Error('趋势线终点时间必须晚于起点')
    return { fromTime: from.time, fromPrice: from.price, toTime: to.time, toPrice: to.price }
  }
  const need = DRAWING_POINTS[kind]
  const raw = request?.points
  if (kind === 'brush') {
    if (!Array.isArray(raw) || raw.length < BRUSH_MIN || raw.length > BRUSH_MAX) throw new Error(`brush 需要 ${BRUSH_MIN}-${BRUSH_MAX} 个 points`)
  } else if (!Array.isArray(raw) || raw.length !== need) throw new Error(`${kind} 需要 ${need} 个 points（{ time, price }）`)
  const points = raw.map((item, index) => point(item?.time, item?.price, `第 ${index + 1} 个点`))
  if (['trend', 'ray', 'extended', 'channel', 'fibchannel', 'gannfan', 'regression', 'fibtime', 'infoline', 'trendangle'].includes(kind) && points[0].time === points[1].time) throw new Error('前两个点的时间不能相同')
  if ((kind === 'regression' || kind === 'fibtime' || kind === 'gannfan') && points[1].time < points[0].time) throw new Error('第二个点必须晚于第一个点')
  if (kind === 'long' || kind === 'short') {
    const [entry, stop, target] = points.map((item) => item.price)
    const ok = kind === 'long' ? stop < entry && entry < target : target < entry && entry < stop
    if (!ok) throw new Error(kind === 'long' ? '多头头寸需要 止损 < 入场 < 止盈' : '空头头寸需要 止盈 < 入场 < 止损')
    if (points[1].time <= points[0].time) throw new Error('头寸右边界时间必须晚于入场时间')
  }
  return { points }
}

const COLOR = /^#[0-9a-fA-F]{6}$/
export const LINE_STYLES = ['solid', 'dashed', 'dotted']

/** Validate optional appearance fields; absent keys are left untouched. */
export function drawingStyle(request) {
  const style = {}
  if (request?.color != null) {
    if (typeof request.color !== 'string' || !COLOR.test(request.color)) throw new Error('画线颜色必须为 #RRGGBB')
    style.color = request.color.toLowerCase()
  }
  if (request?.lineWidth != null) {
    const width = Number(request.lineWidth)
    if (!Number.isInteger(width) || width < 1 || width > 4) throw new Error('线宽必须为 1-4 的整数')
    style.lineWidth = width
  }
  if (request?.lineStyle != null) {
    if (!LINE_STYLES.includes(request.lineStyle)) throw new Error(`线型必须为 ${LINE_STYLES.join('/')}`)
    style.lineStyle = request.lineStyle
  }
  for (const flag of ['shared', 'alert']) {
    if (request?.[flag] == null) continue
    if (typeof request[flag] !== 'boolean') throw new Error(`${flag} 必须为布尔值`)
    style[flag] = request[flag]
  }
  if (style.alert && request?.kind != null && !ALERT_KINDS.includes(request.kind)) throw new Error(`只有 ${ALERT_KINDS.join('/')} 支持价格提醒`)
  if (request?.hidden != null) {
    if (typeof request.hidden !== 'boolean') throw new Error('hidden 必须为布尔值')
    style.hidden = request.hidden
  }
  if (request?.locked != null) {
    if (typeof request.locked !== 'boolean') throw new Error('locked 必须为布尔值')
    style.locked = request.locked
  }
  return style
}
