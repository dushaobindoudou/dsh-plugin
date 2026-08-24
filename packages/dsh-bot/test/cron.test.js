import test from 'node:test'
import assert from 'node:assert/strict'
import { parseCron, cronMatches, nextRun } from '../lib/cron.js'

test('wildcards build full sets and dow 7 normalizes to 0', () => {
  const p = parseCron('* * * * *')
  assert.equal(p.minute.size, 60)
  assert.equal(p.hour.size, 24)
  assert.equal(p.dom.size, 31)
  assert.equal(p.month.size, 12)
  assert.equal(p.dow.size, 7)
  assert.equal(p.domRestricted, false)
  assert.equal(p.dowRestricted, false)

  const sunday = parseCron('0 0 * * 7')
  assert.equal(sunday.dow.has(0), true)
  assert.equal(sunday.dow.has(7), false)
})

test('lists, ranges, and steps combine in one field', () => {
  const p = parseCron('1,5-7,*/20 2 * 1-3 1')
  for (const m of [0, 1, 5, 6, 7, 20, 40]) assert.equal(p.minute.has(m), true, `minute ${m}`)
  for (const m of [2, 3, 15, 21, 59]) assert.equal(p.minute.has(m), false, `minute ${m}`)
  assert.deepEqual([...p.month].sort((a, b) => a - b), [1, 2, 3])
})

test('malformed expressions throw', () => {
  assert.throws(() => parseCron('* * * *'))
  assert.throws(() => parseCron('60 * * * *'))
  assert.throws(() => parseCron('* * * 13 *'))
  assert.throws(() => parseCron('* * * * 9'))
  assert.throws(() => parseCron('a * * * *'))
  assert.throws(() => parseCron('5-1 * * * *'))
  assert.throws(() => parseCron('*/0 * * * *'))
})

test('matching respects time fields', () => {
  const p = parseCron('30 2 * * *')
  assert.equal(cronMatches(p, new Date(2026, 7, 26, 2, 30)), true)
  assert.equal(cronMatches(p, new Date(2026, 7, 26, 2, 31)), false)
  assert.equal(cronMatches(p, new Date(2026, 7, 26, 3, 30)), false)
})

test('restricted dom and dow match with OR (Vixie rule)', () => {
  const p = parseCron('0 0 13 * 5') // the 13th, or any Friday
  assert.equal(cronMatches(p, new Date(2026, 7, 14)), true) // Friday
  assert.equal(cronMatches(p, new Date(2026, 7, 13)), true) // the 13th (Thursday)
  assert.equal(cronMatches(p, new Date(2026, 7, 12)), false) // neither
})

test('nextRun finds the next matching minute', () => {
  const quarter = nextRun('*/15 * * * *', new Date(2026, 7, 26, 10, 7))
  assert.equal(quarter.getTime(), new Date(2026, 7, 26, 10, 15).getTime())

  const overnight = nextRun('30 2 * * *', new Date(2026, 7, 26, 3, 0))
  assert.equal(overnight.getTime(), new Date(2026, 7, 27, 2, 30).getTime())
})

test('nextRun gives up on impossible schedules', () => {
  assert.equal(nextRun('0 0 30 2 *', new Date(2026, 0, 1)), null)
})
