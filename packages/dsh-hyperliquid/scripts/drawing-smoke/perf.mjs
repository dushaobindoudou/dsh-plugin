import { chromium, CHROME, readUrl, openDesk, store, waitCandles, check } from './common.mjs'
const url = await readUrl()
const browser = await chromium.launch({ headless: true, executablePath: CHROME })
try {
  const page = await browser.newPage({ viewport: { width: 2100, height: 1000 } })
  await openDesk(page, url)
  await page.getByRole('button', { name: /新建交易会话/ }).click()
  await page.locator('.dhl-chatmount').waitFor({ state: 'visible', timeout: 20_000 }); await waitCandles(page)
  // 30 drawings (the per-chart cap) of every kind, injected into the desk store
  await page.evaluate(() => {
    const s = window.__dhlStore.get(), c = s.candles, n = c.length, kinds = ['regression', 'gannfan', 'pitchfork', 'fibext', 'fibchannel', 'fibtime', 'brush', 'circle', 'triangle', 'callout', 'arrow', 'trend', 'ray', 'extended', 'hray', 'vline', 'channel', 'fib', 'rect', 'measure', 'long', 'text', 'level', 'short']
    const marks = Array.from({ length: 30 }, (_, i) => {
      const kind = kinds[i % kinds.length], a = c[n - 200 + i * 5], b = c[n - 120 + i * 3], d = c[n - 160 + i * 4]
      const base = { id: 'perf-' + i, sessionId: s.activeSessionId, coin: s.activeCoin, interval: s.interval, kind, role: 'neutral', label: kind + i, source: 'user', createdAt: Date.now() }
      if (kind === 'level') return { ...base, price: a.c }
      if (kind === 'trend') return { ...base, fromTime: a.t, fromPrice: a.c, toTime: b.t, toPrice: b.c }
      if (kind === 'long') return { ...base, points: [{ time: a.t, price: a.c }, { time: b.t, price: a.c * .99 }, { time: b.t, price: a.c * 1.02 }] }
      if (kind === 'brush') return { ...base, points: Array.from({ length: 150 }, (_, k) => ({ time: c[n - 150 + k].t, price: c[n - 150 + k].h })) }
      if (kind === 'short') return { ...base, points: [{ time: a.t, price: a.c }, { time: b.t, price: a.c * 1.01 }, { time: b.t, price: a.c * .98 }] }
      if (['pitchfork', 'fibext', 'fibchannel', 'triangle'].includes(kind)) return { ...base, points: [{ time: a.t, price: a.c }, { time: b.t, price: b.c }, { time: d.t, price: d.c * 1.01 }] }
      if (kind === 'channel') return { ...base, points: [{ time: a.t, price: a.c }, { time: b.t, price: b.c }, { time: d.t, price: d.c * 1.01 }] }
      if (['hray', 'vline', 'text'].includes(kind)) return { ...base, points: [{ time: a.t, price: a.c }] }
      return { ...base, points: [{ time: a.t, price: a.c }, { time: b.t, price: b.c }] }
    })
    window.__dhlStore.patch({ chartMarks: marks })
  })
  await page.waitForTimeout(800)
  check(await page.locator('.dhl-chart-drawing-overlay .dhl-drawing').count() >= 25, '30 drawings rendered')
  const box = await page.locator('.dhl-chart canvas').first().boundingBox()
  await page.evaluate(() => { window.__frames = []; let last = performance.now(); const loop = (t) => { window.__frames.push(t - last); last = t; if (window.__frames.length < 2000) requestAnimationFrame(loop) }; requestAnimationFrame(loop) })
  const y = box.y + box.height * .5
  await page.mouse.move(box.x + box.width * .8, y); await page.mouse.down()
  for (let i = 0; i < 90; i += 1) { await page.mouse.move(box.x + box.width * (.8 - i * .006), y + Math.sin(i / 6) * 20); }
  await page.mouse.up()
  const frames = await page.evaluate(() => window.__frames.slice(5))
  const sorted = [...frames].sort((a, b) => a - b), avg = frames.reduce((a, b) => a + b, 0) / frames.length
  console.log(`frames ${frames.length} · avg ${avg.toFixed(1)}ms · p95 ${sorted[Math.floor(sorted.length * .95)].toFixed(1)}ms · max ${sorted.at(-1).toFixed(1)}ms`)
  check(sorted[Math.floor(sorted.length * .95)] < 34, 'panning with 30 drawings stays smooth (p95 frame < 34ms)')
} finally { await browser.close() }
