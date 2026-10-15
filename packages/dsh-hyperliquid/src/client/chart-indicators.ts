import type { Candle } from './types'

export type IndicatorId = 'sma20' | 'sma60' | 'ema20' | 'ema50' | 'bollinger20' | 'rsi14' | 'macd' | 'volume'
export type ChartPoint = { time: number; value: number }

function points(rows: Candle[], values: Array<number | null>): ChartPoint[] {
  return values.flatMap((value, index) => value == null || !Number.isFinite(value)
    ? [] : [{ time: Math.floor(rows[index].t / 1000), value }])
}

function sma(values: number[], period: number): Array<number | null> {
  let sum = 0
  return values.map((value, index) => {
    sum += value
    if (index >= period) sum -= values[index - period]
    return index >= period - 1 ? sum / period : null
  })
}

function ema(values: Array<number | null>, period: number): Array<number | null> {
  const result: Array<number | null> = Array(values.length).fill(null)
  const alpha = 2 / (period + 1)
  let seed: number[] = []
  let prior: number | null = null
  for (let i = 0; i < values.length; i += 1) {
    const value = values[i]
    if (value == null) continue
    if (prior == null) {
      seed.push(value)
      if (seed.length < period) continue
      prior = seed.reduce((total, current) => total + current, 0) / period
    } else prior = value * alpha + prior * (1 - alpha)
    result[i] = prior
  }
  return result
}

export function chartIndicators(candles: Candle[]) {
  const rows = candles.filter((row) => Number.isFinite(row.c) && row.c > 0 && Number.isFinite(row.t))
  const closes = rows.map((row) => row.c)
  const mean = sma(closes, 20)
  const ema12 = ema(closes, 12)
  const ema26 = ema(closes, 26)
  const macd = ema12.map((value, index) => value == null || ema26[index] == null ? null : value - ema26[index]!)
  const signal = ema(macd, 9)
  const deviation = mean.map((value, index) => value == null ? null : Math.sqrt(
    closes.slice(index - 19, index + 1).reduce((total, close) => total + (close - value) ** 2, 0) / 20,
  ))
  const rsi: Array<number | null> = Array(rows.length).fill(null)
  let gain = 0; let loss = 0
  for (let i = 1; i < rows.length; i += 1) {
    const delta = closes[i] - closes[i - 1]
    const up = Math.max(delta, 0); const down = Math.max(-delta, 0)
    if (i <= 14) { gain += up; loss += down }
    else { gain = (gain * 13) / 14 + up; loss = (loss * 13) / 14 + down }
    if (i === 14) { gain /= 14; loss /= 14 }
    if (i >= 14) rsi[i] = loss === 0 ? gain === 0 ? 50 : 100 : 100 - 100 / (1 + gain / loss)
  }
  const point = (values: Array<number | null>) => points(rows, values)
  return {
    sma20: point(mean), sma60: point(sma(closes, 60)), ema20: point(ema(closes, 20)), ema50: point(ema(closes, 50)),
    upper: point(mean.map((value, index) => value == null ? null : value + 2 * deviation[index]!)),
    lower: point(mean.map((value, index) => value == null ? null : value - 2 * deviation[index]!)),
    rsi14: point(rsi), macd: point(macd), signal: point(signal),
    histogram: point(macd.map((value, index) => value == null || signal[index] == null ? null : value - signal[index]!)),
  }
}
