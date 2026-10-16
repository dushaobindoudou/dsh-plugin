import { chromium, CHROME, readUrl, openDesk, store, waitCandles, check } from './common.mjs'
const url = await readUrl()
const browser = await chromium.launch({ headless: true, executablePath: CHROME })
try {
  const page = await browser.newPage({ viewport: { width: 2100, height: 1000 } })
  await openDesk(page, url)
  await page.getByRole('button', { name: /新建交易会话/ }).click()
  await page.locator('.dhl-chatmount').waitFor({ state: 'visible', timeout: 20_000 }); await waitCandles(page)
  // 100 drawings (the per-chart cap) of every kind, volume profiles included, injected into the desk store
  await page.evaluate(() => {
    const s = window.__dhlStore.get(), c = s.candles, n = c.length, kinds = ['vprofile', 'regression', 'gannfan', 'pitchfork', 'fibext', 'fibchannel', 'fibtime', 'brush', 'circle', 'triangle', 'callout', 'arrow', 'trend', 'ray', 'extended', 'hray', 'vline', 'channel', 'fib', 'rect', 'measure', 'long', 'text', 'level', 'short']
    const marks = Array.from({ length: 100 }, (_, i) => {
      const j = i % 30
      const kind = kinds[i % kinds.length], a = c[n - 200 + j * 5], b = c[n - 120 + j * 3], d = c[n - 160 + j * 4]
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
    window.__perfMarks = marks
    window.__dhlStore.patch({ chartMarks: marks })
  })
  await page.waitForTimeout(800)
  check(await page.locator('.dhl-chart-drawing-overlay .dhl-drawing').count() >= 90, '100 drawings rendered')
  const box = await page.locator('.dhl-chart canvas').first().boundingBox()
  await page.evaluate(() => { window.__frames = []; let last = performance.now(); const loop = (t) => { window.__frames.push(t - last); last = t; if (window.__frames.length < 2000) requestAnimationFrame(loop) }; requestAnimationFrame(loop) })
  const y = box.y + box.height * .5
  await page.mouse.move(box.x + box.width * .8, y); await page.mouse.down()
  for (let i = 0; i < 90; i += 1) { await page.mouse.move(box.x + box.width * (.8 - i * .006), y + Math.sin(i / 6) * 20); }
  await page.mouse.up()
  const frames = await page.evaluate(() => window.__frames.slice(5))
  const sorted = [...frames].sort((a, b) => a - b), avg = frames.reduce((a, b) => a + b, 0) / frames.length
  console.log(`frames ${frames.length} · avg ${avg.toFixed(1)}ms · p95 ${sorted[Math.floor(sorted.length * .95)].toFixed(1)}ms · max ${sorted.at(-1).toFixed(1)}ms`)
  check(sorted[Math.floor(sorted.length * .95)] < 34, 'panning with 100 drawings stays smooth (p95 frame < 34ms)')

  // The pan above may grab an injected drawing; its failed save reloads the (empty) host list, so re-inject.
  // 5000 bars and a volume profile over 3000 of them: dragging its end anchor re-bins on every frame
  // (no cache hit), then the price axis is dragged. Esc cancels the anchor drag, so nothing is saved.
  const measure = async (label, gesture) => {
    await page.evaluate(() => { window.__frames = []; let last = performance.now(); const loop = (t) => { window.__frames.push(t - last); last = t; if (window.__frames.length < 2000 && !window.__stop) requestAnimationFrame(loop) }; window.__stop = false; requestAnimationFrame(loop) })
    await gesture()
    const list = await page.evaluate(() => { window.__stop = true; return window.__frames.slice(3) })
    const order = [...list].sort((x, y) => x - y), p95 = order[Math.floor(order.length * .95)]
    console.log(`${label}: frames ${list.length} · avg ${(list.reduce((x, y) => x + y, 0) / list.length).toFixed(1)}ms · p95 ${p95.toFixed(1)}ms · max ${order.at(-1).toFixed(1)}ms`)
    return p95
  }
  await page.waitForTimeout(2500)
  await page.evaluate(() => {
    const s = window.__dhlStore.get(), c = s.candles, step = c[1].t - c[0].t, extra = []
    for (let i = 5000 - c.length; i > 0; i -= 1) { const src = c[i % c.length]; extra.push({ ...src, t: c[0].t - i * step }) }
    const candles = [...extra, ...c]
    window.__dhlStore.patch({ candles, chartMarks: [...window.__perfMarks, { id: 'perf-vp', sessionId: s.activeSessionId, coin: s.activeCoin, interval: s.interval, kind: 'vprofile', role: 'neutral', label: 'perf-vp', source: 'user', createdAt: Date.now(),
      points: [{ time: candles[1900].t, price: candles[1900].c }, { time: candles[4900].t, price: candles[4900].c }] }] })
  })
  await page.waitForTimeout(800)
  check((await store(page)).candles >= 5000, '5000 bars loaded')
  await page.locator('.dhl-drawing-list').getByRole('button', { name: /perf-vp/ }).first().click()
  await page.waitForTimeout(500)
  const handle = await page.locator('[data-mark-id="perf-vp"] [data-anchor="1"]').first().boundingBox()
  check(Boolean(handle), 'the profile end anchor is on screen')
  const dragP95 = await measure('vprofile anchor drag (3000 bars, re-binned per frame)', async () => {
    await page.mouse.move(handle.x + handle.width / 2, handle.y + handle.height / 2); await page.mouse.down()
    for (let i = 0; i < 60; i += 1) await page.mouse.move(handle.x - i * 4, handle.y + handle.height / 2)
    await page.keyboard.press('Escape'); await page.mouse.up()
  })
  check(dragP95 < 34, 'dragging a 3000-bar volume profile anchor stays smooth (p95 frame < 34ms)')
  check((await store(page)).chartMarks.find((m) => m.id === 'perf-vp').points[1].time === (await page.evaluate(() => window.__dhlStore.get().candles[4900].t)), 'Esc cancelled the drag: the anchor is back')
  const chartBox = await page.locator('.dhl-chartbox').first().boundingBox()
  const axisX = chartBox.x + chartBox.width - 25
  const axisP95 = await measure('price axis drag', async () => {
    await page.mouse.move(axisX, chartBox.y + 120); await page.mouse.down()
    for (let i = 0; i < 60; i += 1) await page.mouse.move(axisX, chartBox.y + 120 + i * 3)
    await page.mouse.up()
  })
  check(axisP95 < 34, 'scaling the price axis with 101 drawings and 5000 bars stays smooth (p95 frame < 34ms)')
} finally { await browser.close() }
