// Phase 5: multi-select with batch delete + one-step undo, undo of a first-time lock, TradingView
// shortcuts, Esc peeling one layer at a time, and the Ctrl/⌘ magnet inversion with its snap ring.
import { chromium, CHROME, readUrl, openDesk, store, waitCandles, check } from './common.mjs'
const url = await readUrl()
const browser = await chromium.launch({ headless: true, executablePath: CHROME })
try {
  const page = await browser.newPage({ viewport: { width: 2100, height: 1000 } })
  const errors = []; page.on('pageerror', (e) => errors.push(String(e?.message ?? e)))
  await openDesk(page, url)
  await page.getByRole('button', { name: /新建交易会话/ }).click()
  await page.locator('.dhl-chatmount').waitFor({ state: 'visible', timeout: 20_000 }); await waitCandles(page)
  const box = await page.locator('.dhl-chart canvas').first().boundingBox()
  const at = (fx, fy) => ({ x: box.x + box.width * fx, y: box.y + box.height * fy })
  const clickXY = async ({ x, y }, modifiers = []) => { await page.mouse.move(x, y); await page.waitForTimeout(60); for (const key of modifiers) await page.keyboard.down(key); await page.mouse.click(x, y); for (const key of modifiers) await page.keyboard.up(key); await page.waitForTimeout(200) }
  const pick = async (name) => { await page.locator('.dhl-draw-menu summary').click(); await page.getByRole('menuitemradio', { name: new RegExp('^' + name) }).click() }
  // Earlier phases leave drawings synced to every BTC session; count only this session's own.
  const marks = async () => (await store(page)).chartMarks.filter((m) => !m.shared)
  const settle = () => page.waitForTimeout(1500)
  const mod = process.platform === 'darwin' ? 'Meta' : 'Control'
  const hostMarks = () => page.evaluate(() => { const s = window.__dhlStore.get(); return window.__dhlCall('chartMarks', { sessionId: s.activeSessionId, coin: s.activeCoin, allIntervals: true }).then((r) => r.marks.filter((m) => !m.shared)) })

  // ── two drawings, Shift-click group, batch delete, one undo restores both ──
  await pick('水平线'); await clickXY(at(.5, .3)); await settle()
  await pick('水平线'); await clickXY(at(.5, .65)); await settle()
  check((await marks()).length === 2, 'two horizontal lines drawn')
  const lineYs = async () => page.evaluate((ids) => ids.map((id) => document.querySelector(`.dhl-chart-drawing-overlay [data-mark-id="${id}"] line`)?.getBoundingClientRect().top).filter((y) => y != null), (await marks()).map((m) => m.id))
  const ys = await lineYs()
  check(ys.length >= 2, 'both lines are on the overlay', ys)
  await clickXY({ x: at(.4, 0).x, y: ys[0] })
  await clickXY({ x: at(.4, 0).x, y: ys[ys.length - 1] }, ['Shift'])
  await page.getByRole('toolbar', { name: '批量编辑画线' }).waitFor({ state: 'visible', timeout: 5000 })
  check(await page.getByText('已选 2 条画线').isVisible(), 'Shift-click builds a two-drawing selection with a batch toolbar')
  await page.keyboard.press('Delete'); await settle()
  check((await marks()).length === 0 && (await hostMarks()).length === 0, 'Delete removes the whole group')
  await page.keyboard.press(`${mod}+z`); await page.waitForTimeout(2500)
  check((await marks()).length === 2 && (await hostMarks()).length === 2, 'one undo restores the whole group', { local: (await marks()).length, host: (await hostMarks()).length })

  // ── group drag moves both lines together (one undo step) and the batch toolbar recolors them ──
  const prices0 = (await marks()).map((m) => m.price).sort((x, y) => x - y)
  const ys1 = await lineYs()
  await clickXY({ x: at(.4, 0).x, y: ys1[0] })
  await clickXY({ x: at(.4, 0).x, y: ys1[1] }, ['Shift'])
  await page.mouse.move(at(.4, 0).x, ys1[0]); await page.mouse.down(); await page.mouse.move(at(.42, 0).x, ys1[0] + 40, { steps: 10 }); await page.mouse.up(); await settle()
  const prices1 = (await marks()).map((m) => m.price).sort((x, y) => x - y)
  check(prices1.every((p, i) => p < prices0[i]) && Math.abs((prices0[0] - prices1[0]) - (prices0[1] - prices1[1])) < 1e-6 * prices0[0], 'dragging a grouped line moves the whole group by the same offset', { prices0, prices1 })
  await page.getByRole('toolbar', { name: '批量编辑画线' }).getByRole('button', { name: '全部改为 #ef5f6c' }).click(); await settle()
  check((await hostMarks()).every((m) => m.color === '#ef5f6c'), 'the batch toolbar recolors every selected drawing')
  await page.keyboard.press('Escape')
  await page.keyboard.press(`${mod}+z`); await settle(); await page.keyboard.press(`${mod}+z`); await settle()
  const prices2 = (await hostMarks()).map((m) => m.price).sort((x, y) => x - y)
  check(prices2.every((p, i) => Math.abs(p - prices0[i]) < 1e-9 * p) && (await hostMarks()).every((m) => !m.color), 'two undos restore color and the group move', { prices0, prices2 })

  // ── first-time lock, then undo: the host must unlock too (undo used to send null, which the host ignored) ──
  const ys2 = await lineYs()
  await clickXY({ x: at(.4, 0).x, y: ys2[0] })
  await page.getByRole('toolbar', { name: '画线样式' }).getByRole('button', { name: '锁定' }).click(); await settle()
  check((await hostMarks()).some((m) => m.locked), 'lock reaches the host')
  await page.keyboard.press('Escape')
  await page.keyboard.press(`${mod}+z`); await settle()
  check((await hostMarks()).every((m) => !m.locked) && (await marks()).every((m) => !m.locked), 'undoing a first lock unlocks on the host as well')

  // ── shortcuts and Esc layering in the expanded chart ──
  await page.getByRole('button', { name: '放大图表' }).click(); await page.waitForTimeout(600)
  const expanded = () => page.locator('.dhl-chart-panel-expanded').count()
  await page.keyboard.press('Alt+KeyT'); await page.waitForTimeout(200)
  check(await page.locator('.dhl-chart-drawing-overlay.drawing').count() === 1, 'Alt+T starts the trend line tool')
  await page.keyboard.press('Escape'); await page.waitForTimeout(200)
  check(await page.locator('.dhl-chart-drawing-overlay.drawing').count() === 0 && await expanded() === 1, 'first Esc only cancels the tool; the chart stays expanded')
  await page.keyboard.press('Escape'); await page.waitForTimeout(300)
  check(await expanded() === 0, 'second Esc leaves the expanded chart')

  // ── magnet: off by default; holding Ctrl/⌘ snaps to O/H/L/C and shows the ring ──
  const box2 = await page.locator('.dhl-chart canvas').first().boundingBox()
  await page.keyboard.press('Alt+KeyH'); await page.waitForTimeout(150)
  const mid = { x: box2.x + box2.width * .55, y: box2.y + box2.height * .12 }
  await page.mouse.move(mid.x, mid.y); await page.mouse.move(mid.x + 3, mid.y + 2); await page.waitForTimeout(200)
  check(await page.locator('.dhl-snap-ring').count() === 0, 'magnet off: no snap ring')
  await page.keyboard.down('Control'); await page.mouse.move(mid.x + 6, mid.y + 4); await page.waitForTimeout(200)
  check(await page.locator('.dhl-snap-ring').count() === 1, 'holding Ctrl turns the magnet on and shows where it snaps')
  await page.keyboard.up('Control'); await page.keyboard.press('Escape')

  // ── volume profile settings from the toolbar ──
  await page.keyboard.press('Escape')
  await page.locator('.dhl-draw-menu summary').click(); await page.getByRole('menuitemradio', { name: /^固定范围成交量分布/ }).click()
  await clickXY({ x: box2.x + box2.width * .3, y: box2.y + box2.height * .5 }); await clickXY({ x: box2.x + box2.width * .6, y: box2.y + box2.height * .5 }); await settle()
  const vp = (await marks()).find((m) => m.kind === 'vprofile')
  check(Boolean(vp), 'volume profile drawn')
  await page.locator('.dhl-drawing-list').getByRole('button', { name: /成交量分布|固定范围/ }).first().click()
  await page.getByRole('toolbar', { name: '画线样式' }).getByLabel('价格行数').selectOption('96'); await settle()
  check((await hostMarks()).find((m) => m.id === vp.id)?.rows === 96 && await page.locator(`[data-mark-id="${vp.id}"] .dhl-vprofile-up`).count() >= 60, 'changing rows to 96 re-bins the profile')

  check(errors.length === 0, 'no page errors', errors)
  console.log('phase5 ok')
} finally { await browser.close() }
