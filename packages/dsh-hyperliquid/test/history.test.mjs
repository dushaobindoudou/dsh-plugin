import assert from 'node:assert/strict'
import { mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { HyperStore } from '../lib/store.js'
import { HyperRemote } from '../lib/remote.js'

const dir = mkdtempSync(join(tmpdir(), 'dhl-history-'))
const store = new HyperStore(dir)
store.paperFill({ coin: 'BTC', isBuy: true, sz: 0.1, px: 100, reason: '突破区间高点后买入' })
store.paperOrderRecord({ coin: 'BTC', isBuy: true, sz: 0.1, px: 100, reason: '突破区间高点后买入' })
const paperRemote = Object.create(HyperRemote.prototype)
paperRemote.cfg = { tradingMode: 'paper' }
paperRemote.store = new HyperStore(dir)
const paper = await paperRemote.tradeHistory()
assert.equal(paper.orders[0].reason, '突破区间高点后买入')
assert.equal(paper.fills[0].reason, '突破区间高点后买入')
assert.equal(paper.orders[0].status, 'filled')

const liveRemote = Object.create(HyperRemote.prototype)
liveRemote.cfg = { tradingMode: 'live' }
liveRemote.resolveAddress = async () => '0x0000000000000000000000000000000000000001'
liveRemote.client = {
  historicalOrders: async () => [{ order: { coin: 'ETH', oid: 7, cloid: '0xabc', timestamp: 1000 }, status: 'canceled', statusTimestamp: 2000 }],
  userFills: async () => [{ coin: 'ETH', oid: 7, px: '2000', time: 1500 }],
}
liveRemote.store = { liveOrders: { '0xabc': { thesis: '风险回报比合适', decisionId: 'd1' } }, liveDecisions: {} }
const live = await liveRemote.tradeHistory()
assert.equal(live.orders[0].status, 'canceled')
assert.equal(live.orders[0].reason, '风险回报比合适')
assert.equal(live.fills[0].oid, 7)
console.log('paper 历史落盘与 live 历史订单、成交和原因关联通过')
