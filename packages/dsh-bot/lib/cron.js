// Minimal five-field cron support: minute hour day-of-month month day-of-week.
// Supports "*", lists ("a,b"), ranges ("a-b"), and steps ("*/n", "a-b/n",
// "a/n" == a..max/n per POSIX). Day-of-week 0 and 7 are both Sunday.
// Month and weekday names are not supported - numbers only.

const FIELD_RANGES = [
  [0, 59], // minute
  [0, 23], // hour
  [1, 31], // day of month
  [1, 12], // month
  [0, 7], // day of week
]

function toInt(token) {
  if (!/^\d+$/.test(token)) {
    throw new Error(`cron: non-numeric value "${token}" (names are not supported)`)
  }
  return Number(token)
}

function parseField(raw, index, expr) {
  const [min, max] = FIELD_RANGES[index]
  const out = new Set()
  for (const part of raw.split(',')) {
    const [rangePart, stepPart] = part.split('/')
    const step = stepPart === undefined ? 1 : toInt(stepPart)
    if (step < 1) throw new Error(`cron: step must be >= 1 in "${raw}" (${expr})`)
    let lo
    let hi
    if (rangePart === '*') {
      lo = min
      hi = max
    } else if (rangePart.includes('-')) {
      const [a, b] = rangePart.split('-')
      lo = toInt(a)
      hi = toInt(b)
      if (lo > hi) throw new Error(`cron: inverted range "${rangePart}" (${expr})`)
    } else {
      lo = toInt(rangePart)
      hi = stepPart === undefined ? lo : max
    }
    if (lo < min || hi > max) {
      throw new Error(`cron: value out of range in "${raw}" (${expr})`)
    }
    for (let v = lo; v <= hi; v += step) out.add(v)
  }
  return out
}

export function parseCron(expr) {
  const text = String(expr).trim()
  const fields = text.split(/\s+/)
  if (fields.length !== 5) {
    throw new Error(`cron: expected 5 fields, got ${fields.length}: "${text}"`)
  }
  const sets = fields.map((raw, i) => parseField(raw, i, text))
  const dow = new Set([...sets[4]].map((v) => (v === 7 ? 0 : v)))
  return {
    minute: sets[0],
    hour: sets[1],
    dom: sets[2],
    month: sets[3],
    dow,
    domRestricted: fields[2] !== '*' && fields[2] !== '*/1',
    dowRestricted: fields[4] !== '*' && fields[4] !== '*/1',
  }
}

export function cronMatches(parsed, date) {
  if (!parsed.minute.has(date.getMinutes())) return false
  if (!parsed.hour.has(date.getHours())) return false
  if (!parsed.month.has(date.getMonth() + 1)) return false
  const domOk = parsed.dom.has(date.getDate())
  const dowOk = parsed.dow.has(date.getDay())
  if (parsed.domRestricted && parsed.dowRestricted) return domOk || dowOk
  return domOk && dowOk
}

// First matching minute strictly after `after`; null if none within ~2 years.
export function nextRun(exprOrParsed, after = new Date()) {
  const parsed = typeof exprOrParsed === 'string' ? parseCron(exprOrParsed) : exprOrParsed
  const cursor = new Date(after.getTime())
  cursor.setSeconds(0, 0)
  cursor.setMinutes(cursor.getMinutes() + 1)
  const cap = cursor.getTime() + 2 * 366 * 24 * 60 * 60000
  while (cursor.getTime() <= cap) {
    if (cronMatches(parsed, cursor)) return new Date(cursor.getTime())
    cursor.setMinutes(cursor.getMinutes() + 1)
  }
  return null
}
