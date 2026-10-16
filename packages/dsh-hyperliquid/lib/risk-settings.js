/** Validate the user-editable trading limits before they reach either guard. */
export function normalizeRiskSettings(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('交易设置无效')
  const allowed = ['allowedCoins', 'maxOrderUsd', 'maxDailyUsd', 'maxPositionUsd', 'maxLeverage']
  if (Object.keys(input).some((key) => !allowed.includes(key)) || allowed.some((key) => !(key in input))) throw new Error('交易设置字段无效')
  const coins = typeof input.allowedCoins === 'string' ? input.allowedCoins.split(',') : input.allowedCoins
  if (!Array.isArray(coins)) throw new Error('允许交易的币对无效')
  const allowedCoins = [...new Set(coins.map((coin) => String(coin).trim()).filter(Boolean))]
  if (!allowedCoins.length || allowedCoins.length > 100 || allowedCoins.some((coin) => coin.length > 32 || !/^[A-Za-z0-9:_-]+$/.test(coin))) {
    throw new Error('允许交易的币对无效')
  }
  const values = {}
  for (const key of allowed.slice(1)) {
    const value = Number(input[key])
    if (!Number.isFinite(value) || value <= 0 || value > 1_000_000_000) throw new Error(`${key} 必须为正数`)
    values[key] = value
  }
  if (!Number.isInteger(values.maxLeverage) || values.maxLeverage > 50) throw new Error('maxLeverage 必须为 1–50 的整数')
  return { allowedCoins, ...values }
}
