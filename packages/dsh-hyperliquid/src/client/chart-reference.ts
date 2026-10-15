/** A chart click becomes an editable, time-addressed quote in the native composer. */
import type { Candle, Interval } from './types'
import type { IndicatorId } from './chart-indicators'
import { chartIndicators } from './chart-indicators'

export type ChartHit = IndicatorId | 'bollingerUpper' | 'bollingerLower' | 'macdSignal' | 'macdHistogram' | null

export interface ChartSelection {
  candle: Candle
  /** The indicator line or pane the pointer hit, when the chart identifies one. */
  hit: ChartHit
  /** Displayed studies at the selected candle, with no guessed values. */
  values: Array<{ label: string; value: number }>
  priorVolumeMean20: number | null
}

const SERIES: Array<[IndicatorId, string, string]> = [
  ['sma20', 'SMA20', 'sma20'], ['sma60', 'MA60', 'sma60'],
  ['ema20', 'EMA20', 'ema20'], ['ema50', 'EMA50', 'ema50'],
  ['bollinger20', 'BOLL上轨', 'upper'], ['bollinger20', 'BOLL下轨', 'lower'],
  ['rsi14', 'RSI14', 'rsi14'], ['macd', 'MACD', 'macd'],
  ['macd', '信号线', 'signal'], ['macd', 'MACD柱', 'histogram'],
]

/** Match the chart's candles and study windows exactly. */
export function selectChartCandle(candles: Candle[], time: number, active: ReadonlySet<IndicatorId>, hit: ChartHit): ChartSelection | null {
  const rows = candles
  const index = rows.findIndex((candle) => Math.floor(candle.t / 1000) === Math.floor(time / 1000))
  if (index < 0) return null
  const candle = rows[index]
  const studies = chartIndicators(rows)
  const epoch = Math.floor(candle.t / 1000)
  const values = SERIES.flatMap(([id, label, key]) => {
    if (!active.has(id)) return []
    const point = studies[key as keyof typeof studies].find((item) => item.time === epoch)
    return point ? [{ label, value: point.value }] : []
  })
  const previous = rows.slice(Math.max(0, index - 20), index).map((row) => row.v).filter((value) => Number.isFinite(value) && value >= 0)
  const priorVolumeMean20 = previous.length === 20 ? previous.reduce((sum, value) => sum + value, 0) / 20 : null
  return { candle, hit, values, priorVolumeMean20 }
}

export function formatChartReference(selection: ChartSelection, coin: string, interval: Interval, english = false): string {
  const { candle, hit, values, priorVolumeMean20 } = selection
  const number = (value: number) => String(value)
  const computed = (value: number) => String(Number(value.toPrecision(10)))
  const time = new Date(candle.t).toISOString().replace('T', ' ').replace('.000Z', ' UTC')
  const hitLabel: Partial<Record<Exclude<ChartHit, null>, string>> = {
    volume: english ? 'Volume' : '成交量', sma20: 'SMA20', sma60: 'MA60', ema20: 'EMA20', ema50: 'EMA50',
    bollingerUpper: english ? 'BOLL upper' : 'BOLL上轨', bollingerLower: english ? 'BOLL lower' : 'BOLL下轨',
    rsi14: 'RSI14', macd: 'MACD', macdSignal: english ? 'MACD signal' : '信号线', macdHistogram: english ? 'MACD histogram' : 'MACD柱',
  }
  const lines = [
    english ? `[Chart point] ${coin} ${interval} candle opened ${time}` : `【图表点位】${coin} ${interval} K 线开盘 ${time}`,
    english ? `OHLC: ${number(candle.o)} / ${number(candle.h)} / ${number(candle.l)} / ${number(candle.c)}`
      : `开/高/低/收：${number(candle.o)} / ${number(candle.h)} / ${number(candle.l)} / ${number(candle.c)}`,
    english ? `Volume: ${number(candle.v)}` : `成交量：${number(candle.v)}`,
  ]
  if (priorVolumeMean20 != null && priorVolumeMean20 > 0) {
    lines.push(english
      ? `Previous 20-candle mean volume: ${computed(priorVolumeMean20)}; current/mean: ${(candle.v / priorVolumeMean20).toFixed(2)}x`
      : `前 20 根均量：${computed(priorVolumeMean20)}；当前/均量：${(candle.v / priorVolumeMean20).toFixed(2)} 倍`)
  }
  if (values.length) lines.push(`${english ? 'Displayed studies' : '已显示指标'}：${values.map(({ label, value }) => `${label}=${computed(value)}`).join('，')}`)
  if (hit && hit !== 'volume') lines.push(`${english ? 'Selected study' : '点击指标'}：${hitLabel[hit] ?? hit}`)
  return lines.join('\n')
}
