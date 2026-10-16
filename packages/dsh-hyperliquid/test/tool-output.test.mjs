// DSH rejects tool output that is not lossless JSON ("value is not lossless JSON"). Regression: after a
// style was cleared (null → undefined) or an alert re-armed, hyper_chart list/update returned undefined fields.
import assert from 'node:assert/strict'
import { mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { HyperStore } from '../lib/store.js'
import { HyperRemote } from '../lib/remote.js'
import { buildToolDefinitions, losslessJson } from '../lib/tools.js'

const problems = (value) => {
  const bad = []
  const walk = (item, path) => {
    if (item === undefined) bad.push(`${path} is undefined`)
    else if (typeof item === 'number' && !Number.isFinite(item)) bad.push(`${path} is ${item}`)
    else if (item && typeof item === 'object') for (const [key, child] of Object.entries(item)) walk(child, `${path}.${key}`)
  }
  walk(value, 'output')
  return bad
}

assert.deepEqual(losslessJson({ a: undefined, b: NaN, c: [1, Infinity], d: { e: undefined, f: 'x' } }), { b: null, c: [1, null], d: { f: 'x' } })

const store = new HyperStore(mkdtempSync(join(tmpdir(), 'dhl-tool-output-')))
store.registerSession('s', { coin: 'HYPE' })
const remote = Object.create(HyperRemote.prototype)
Object.assign(remote, { store, desk: { coin: 'HYPE', interval: '1h' }, alertSides: new Map() })
remote.candles = async () => ({ candles: [] })
const chart = buildToolDefinitions(remote).find((tool) => tool.name === 'hyper_chart')
const exec = { agent: { id: 's' } }
const added = await chart.execute({ action: 'add', kind: 'level', label: '支撑', price: 40 }, exec)
await remote.updateChartMark({ sessionId: 's', id: added.mark.id, patch: { color: '#ef5f6c', lineWidth: 3 } })
await remote.updateChartMark({ sessionId: 's', id: added.mark.id, patch: { color: null, lineWidth: null, alert: true } })
assert.ok(!('color' in store.getChartMark('s', added.mark.id)), 'cleared fields are removed, not left as undefined')
for (const args of [{ action: 'update', id: added.mark.id, label: '新支撑' }, { action: 'list' }, { action: 'update', id: added.mark.id, alert: false },
  { action: 'add', kind: 'ma', maType: 'smma', period: 7 }, { action: 'list' }, { action: 'remove', id: added.mark.id }]) {
  const output = await chart.execute(args, exec)
  assert.deepEqual(problems(output), [], `hyper_chart ${args.action} returns lossless JSON`)
}
console.log('hyper_* 工具输出均为无损 JSON（清除样式、重新开启提醒后 list/update 不再报错）')
