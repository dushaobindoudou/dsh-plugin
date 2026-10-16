// Touch: draw, select, drag an anchor and pan with a finger (emulated touch via CDP).
import { chromium, CHROME, readUrl, openDesk, store, waitCandles, check, toolItem } from './common.mjs'

const url = await readUrl()
const browser = await chromium.launch({ headless: true, executablePath: CHROME })
try {
  const context = await browser.newContext({ viewport: { width: 1400, height: 1000 }, hasTouch: true })
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(String(e?.message ?? e)))
  await openDesk(page, url)
  await page.getByRole('button', { name: /新建交易会话/ }).click()
  await page.locator('.dhl-chatmount').waitFor({ state: 'visible', timeout: 20_000 })
  await waitCandles(page)
  const cdp = await context.newCDPSession(page)
  const touch = (type, points) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: points.map((p) => ({ x: p.x, y: p.y })) })
  // Through Chrome's gesture pipeline, like a real finger: it decides whether a click follows.
  const tap = async (p) => { await cdp.send('Input.synthesizeTapGesture', { x: p.x, y: p.y, gestureSourceType: 'touch' }); await page.waitForTimeout(250) }
  const swipe = async (from, to) => {
    await touch('touchStart', [from])
    for (let i = 1; i <= 10; i += 1) { await touch('touchMove', [{ x: from.x + (to.x - from.x) * i / 10, y: from.y + (to.y - from.y) * i / 10 }]); await page.waitForTimeout(16) }
    await touch('touchEnd', []); await page.waitForTimeout(250)
  }
  const box = await page.locator('.dhl-chart canvas').first().boundingBox()
  const at = (fx, fy) => ({ x: box.x + box.width * fx, y: box.y + box.height * fy })
  const marks = async () => (await store(page)).chartMarks
  const settle = () => page.waitForTimeout(1600)

  // Choose the trend tool from the menu with taps, then place two anchors with taps.
  await page.locator('.dhl-draw-menu summary').tap()
  await toolItem(page, '趋势线').tap()
  await tap(at(.3, .62)); await tap(at(.5, .42)); await settle()
  const trend = (await marks()).find((m) => m.kind === 'trend')
  check(Boolean(trend), 'touch: two taps draw a trend line')

  // Tap the line to select it, then drag its second anchor with a finger.
  const anchor = async (i) => page.evaluate(([id, k]) => {
    const c = document.querySelector(`circle.dhl-chart-anchor[data-mark-id="${id}"][data-anchor="${k}"]`), o = document.querySelector('.dhl-chart-drawing-overlay').getBoundingClientRect()
    return c ? { x: o.left + +c.getAttribute('cx'), y: o.top + +c.getAttribute('cy') } : null
  }, [trend.id, i])
  await tap(at(.4, .52))
  const a1 = await anchor(1)
  check(Boolean(a1) && await page.getByRole('toolbar', { name: '画线样式' }).isVisible(), 'touch: tapping the line selects it', { a1 })
  await swipe(a1, { x: a1.x, y: a1.y - 80 }); await settle()
  const reshaped = (await marks()).find((m) => m.id === trend.id)
  check(reshaped.toPrice > trend.toPrice && reshaped.fromPrice === trend.fromPrice, 'touch: dragging an anchor reshapes the line', { trend, reshaped })

  // Deselect, then a one-finger swipe on empty chart pans instead of drawing or scrolling the page.
  await tap(at(.85, .9))
  const range0 = await page.evaluate(() => window.__dhlStore.get().candles.length)
  const before = (await marks()).length, scrollY0 = await page.evaluate(() => window.scrollY)
  const firstX = await anchor(0).then(() => page.evaluate((id) => document.querySelector(`.dhl-drawing[data-mark-id="${id}"] > line`)?.getAttribute('x1'), trend.id))
  await swipe(at(.6, .8), at(.3, .8)); await page.waitForTimeout(400)
  const movedX = await page.evaluate((id) => document.querySelector(`.dhl-drawing[data-mark-id="${id}"] > line`)?.getAttribute('x1'), trend.id)
  check((await marks()).length === before && Number(movedX) < Number(firstX) - 50 && await page.evaluate(() => window.scrollY) === scrollY0, 'touch: a one-finger swipe pans the chart', { firstX, movedX, range0 })
  check(errors.length === 0, 'touch: no page errors', errors)
} finally { await browser.close() }
