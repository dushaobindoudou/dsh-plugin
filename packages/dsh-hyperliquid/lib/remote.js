/**
 * dsh-hyperliquid — the `hyper` Remote namespace (Typert), the single host
 * entry point for both the client UI and the agent tools. One method per
 * capability; every method takes one `request` JSON value and returns plain
 * JSON, mirroring dsh-bots' wire contract.
 * @module lib/remote.js
 */

import { homedir } from 'node:os'
import { resolve } from 'node:path'
import { HyperliquidClient, keys, sigFigs } from './hl.js'
import { canonicalMarketCoin } from './market-symbol.js'
import { HyperStore } from './store.js'
import { addressFromPrivateKey, buildL1TypedData, splitSignature } from './signing.js'
import { TradingGuard } from './trading-guard.js'

const TOOL_CALL = Symbol('verified DSH tool call')

const { Remote, TypertRemoteService } = await resolveTypertRuntime()

/** Anchor to the running dsh CLI's typert copy (dsh-bots' proven technique). */
async function resolveTypertRuntime() {
  const { createRequire } = await import('node:module')
  const { realpathSync } = await import('node:fs')
  const candidates = []
  const SPEC = '@deepseek-ai/dsh-typert-protocol'
  // Test hook: HYPERLIQUID_TYPERT_MODULE pins the typert module for out-of-host
  // smoke tests; inside the real dsh host the argv/execPath anchors win.
  if (process.env.HYPERLIQUID_TYPERT_MODULE) {
    const pinned = process.env.HYPERLIQUID_TYPERT_MODULE
    candidates.push(() => {
      const req = createRequire(pinned.startsWith('file:') ? import.meta.url : pinned)
      return req(req.resolve(pinned.startsWith('file:') ? SPEC : pinned))
    })
  }
  const anchors = []
  for (const a of [process.argv?.[1], process.argv?.[0]]) {
    if (typeof a !== 'string' || a.length === 0) continue
    anchors.push(a)
    try { anchors.push(realpathSync(a)) } catch { /* keep original */ }
  }
  // Anchor via CJS require instead of dynamic import: the dsh loader's module
  // hooks stall import(fileUrl) for loader-external absolute paths, while
  // require(esm) (Node ≥ 22.12) resolves the exact same module natively.
  for (const a of anchors) {
    candidates.push(() => {
      const req = createRequire(a)
      return req(req.resolve(SPEC))
    })
  }
  // Last resort: the plugin's own node_modules walk-up.
  candidates.push(() => {
    const req = createRequire(import.meta.url)
    return req(req.resolve(SPEC))
  })
  for (let i = 0; i < candidates.length; i += 1) {
    try {
      const m = await candidates[i]()
      // require(esm) returns the module namespace; import() may wrap it as
      // { default: {...} } (CJS interop) — accept both spellings.
      const mod = m && m.TypertRemoteService ? m : (m && m.default && m.default.TypertRemoteService ? m.default : m)
      if (mod && mod.TypertRemoteService && mod.Remote) return { Remote: mod.Remote, TypertRemoteService: mod.TypertRemoteService }
    } catch { /* try next anchor */ }
  }
  throw new Error('[dsh-hyperliquid] 无法解析 @deepseek-ai/dsh-typert-protocol（宿主锚定与回退均失败）')
}

/** Apply one `@Remote(method)` marker via a decorator-context shim. */
function markRemoteMethod(prototype, method) {
  const decorator = Remote(method)
  decorator(undefined, {
    name: method,
    private: false,
    static: false,
    addInitializer(fn) { fn.call(Object.create(prototype)) },
  })
}

const MARKETS_TTL_MS = 10_000
const ACCOUNT_MODE_TTL_MS = 30_000
const TRADE_CAPACITY_TTL_MS = 15_000
const SUB_SWEEP_MS = 30_000
const SUB_IDLE_MS = 120_000
const BOOK_GROUPINGS = {
  full: null,
  '5': { nSigFigs: 5 },
  '5x2': { nSigFigs: 5, mantissa: 2 },
  '5x5': { nSigFigs: 5, mantissa: 5 },
  '4': { nSigFigs: 4 },
  '3': { nSigFigs: 3 },
  '2': { nSigFigs: 2 },
}

export class HyperRemote extends TypertRemoteService {
  constructor(ctx, config = {}) {
    super(ctx, 'hyper')
    this.hostCtx = ctx // kept for optional-service lookups (ctx.get — never throws)
    this.cfg = {
      dataDir: expandHome(config?.dataDir ?? '~/.dsh-hyperliquid'),
      network: config?.network === 'testnet' ? 'testnet' : 'mainnet',
      tradingMode: config?.tradingMode === 'paper' ? 'paper' : 'live',
      privateKey: config?.privateKey || process.env.HYPERLIQUID_PRIVATE_KEY || '',
      // signer 'local': sign with config.privateKey inside this plugin.
      // signer 'web3': delegate EIP-712 signing to the dsh-web3 vault
      //                (ctx.wallet) — the private key never leaves the vault
      //                and every signature passes the wallet's signing policy.
      signer: config?.signer === 'web3' ? 'web3' : 'local',
      web3Account: config?.web3Account ?? 'main',
      tradingAddress: config?.tradingAddress ?? '',
      autonomousLive: config?.autonomousLive === true,
      allowedCoins: String(config?.allowedCoins ?? 'BTC,ETH').split(',').map((v) => v.trim()).filter(Boolean),
      maxOrderUsd: Number(config?.maxOrderUsd ?? 100),
      maxDailyUsd: Number(config?.maxDailyUsd ?? 500),
      maxPositionUsd: Number(config?.maxPositionUsd ?? 500),
      maxLeverage: Number(config?.maxLeverage ?? 2),
    }
    for (const field of ['maxOrderUsd', 'maxDailyUsd', 'maxPositionUsd', 'maxLeverage']) {
      if (!Number.isFinite(this.cfg[field]) || this.cfg[field] <= 0) throw new Error(`${field} 必须为正数`)
    }
    if (this.cfg.autonomousLive && this.cfg.signer !== 'web3') throw new Error('autonomousLive 仅支持 signer=web3')
    if (this.cfg.tradingAddress && !/^0x[0-9a-fA-F]{40}$/.test(this.cfg.tradingAddress)) throw new Error('tradingAddress 必须为 20 字节 EVM 地址')
    this.client = new HyperliquidClient({ network: this.cfg.network, privateKey: this.cfg.privateKey })
    this.store = new HyperStore(this.cfg.dataDir, this.cfg.network)
    this.guard = new TradingGuard(this.cfg.dataDir, { ...this.cfg, dataDir: this.cfg.dataDir })
    this.paperGuard = new TradingGuard(this.cfg.dataDir, { ...this.cfg, dataDir: this.cfg.dataDir }, { budgetName: this.cfg.network === 'mainnet' ? 'paper-budget-mainnet.json' : 'paper-budget.json' })
    this.marketsCache = null
    this.marketsAt = 0
    this.catalogCache = null
    this.catalogAt = 0
    this.catalogDexIndex = new Map()
    this.detailCache = new Map()
    this.addressCache = null
    this.accountModeCache = null
    this.accountModePending = null
    this.tradeCapacityCache = new Map()
    this.tradeCapacityPending = new Map()
    this.walletAddressCache = null
    this.desk = { coin: 'BTC', interval: '15m', sessionId: null } // active UI session and market focus
    this.lastTouch = new Map() // snapshot key -> last request ms
    this.activeTradeOps = 0
    // Hold the network stable through every order/cancel/leverage operation,
    // including wallet approval and the exchange response.
    for (const method of ['placeOrder', 'cancelOrder', 'setLeverage']) {
      const operation = this[method].bind(this)
      this[method] = async (...args) => {
        this.activeTradeOps += 1
        try { return await operation(...args) }
        finally { this.activeTradeOps -= 1 }
      }
    }
    this.sweepTimer = setInterval(() => this.sweepSubs(), SUB_SWEEP_MS)
  }

  sweepSubs() {
    const now = Date.now()
    for (const [key, at] of this.lastTouch) {
      if (now - at > SUB_IDLE_MS) {
        this.client.unsubscribe(key)
        this.lastTouch.delete(key)
      }
    }
  }

  touch(key) {
    this.lastTouch.set(key, Date.now())
    // subscribe() ref-counts. Polling the desk must not increment that count.
    if (!this.client.subs.has(key)) this.client.subscribe(key, argsOf(key))
    return key
  }

  // ── dsh-web3 signer plumbing ──────────────────────────────────────────
  /** The dsh-web3 wallet service, if the plugin is installed. Optional read — never throws. */
  walletService() {
    const w = this.hostCtx?.get?.('wallet')
    return w && typeof w.signTypedData === 'function' ? w : null
  }

  /** Harness approval gateway (same resolution dsh-web3's own tools use). */
  approvalGateway() {
    return this.hostCtx?.get?.('approval') ?? { async request() { return 'unavailable' } }
  }

  /** Resolve the configured web3 account's address from the vault. */
  async web3Address() {
    const wallet = this.walletService()
    if (!wallet) throw new Error('signer=web3 但 dsh-web3 未安装或未启用 —— 请执行 dsh plugin --profile web add dsh-web3')
    const accounts = typeof wallet.listAccounts === 'function' ? wallet.listAccounts() : []
    if (accounts.length === 0) throw new Error('dsh-web3 保险库里还没有账户 —— 请在 DSH 设置的「Web3 钱包」页创建或导入')
    const want = this.cfg.web3Account
    const meta = accounts.find((a) => a?.id === want || a?.label === want)
    if (!meta) throw new Error(`dsh-web3 中找不到指定签名账户：${want}`)
    if (!meta?.address) throw new Error('dsh-web3 账户缺少地址')
    this.walletAddressCache = meta.address
    return meta.address
  }

  /**
   * Trading address for reads (status/account/orders/fills).
   * local → derived from config.privateKey; web3 → the vault account.
   */
  async resolveAddress() {
    if (this.cfg.tradingAddress) return this.cfg.tradingAddress
    if (this.cfg.signer === 'web3') {
      // An API wallet signs for its owner; account reads must use the owner.
      return null
    }
    if (!this.cfg.privateKey) return null
    try { return (this.addressCache ??= await addressFromPrivateKey(this.cfg.privateKey)) } catch { return null }
  }

  /** The account abstraction mode changes where Hyperliquid reports collateral. */
  async accountMode(address, fresh = false) {
    const key = address.toLowerCase()
    if (!fresh && this.accountModeCache?.address === key && Date.now() - this.accountModeCache.at < ACCOUNT_MODE_TTL_MS) return this.accountModeCache.mode
    if (this.accountModePending?.address === key) return this.accountModePending.promise
    const promise = this.client.userAbstraction(address).then((mode) => {
      if (!['default', 'disabled', 'dexAbstraction', 'unifiedAccount', 'portfolioMargin'].includes(mode)) throw new Error(`交易所返回未知账户模式：${String(mode)}`)
      this.accountModeCache = { address: key, mode, at: Date.now() }
      return mode
    }).finally(() => { if (this.accountModePending?.promise === promise) this.accountModePending = null })
    this.accountModePending = { address: key, promise }
    return promise
  }

  /** UI-only capacity cache. Order preflight queries the exchange afresh. */
  async activeAssetFor(address, coin, accountMode) {
    const key = `${address.toLowerCase()}:${accountMode}:${coin}`
    const cached = this.tradeCapacityCache?.get(key)
    if (cached && Date.now() - cached.at < TRADE_CAPACITY_TTL_MS) return cached.value
    const pending = this.tradeCapacityPending?.get(key)
    if (pending) return pending
    const promise = this.client.activeAssetData(address, coin).then((value) => {
      if (!validTradeCapacity(value, coin)) throw new Error('交易所可交易额度响应无效')
      this.tradeCapacityCache ??= new Map()
      this.tradeCapacityCache.set(key, { value, at: Date.now() })
      if (this.tradeCapacityCache.size > 256) {
        for (const [oldKey, row] of this.tradeCapacityCache) {
          if (Date.now() - row.at >= TRADE_CAPACITY_TTL_MS) this.tradeCapacityCache.delete(oldKey)
        }
        while (this.tradeCapacityCache.size > 256) this.tradeCapacityCache.delete(this.tradeCapacityCache.keys().next().value)
      }
      return value
    }).finally(() => this.tradeCapacityPending?.delete(key))
    this.tradeCapacityPending ??= new Map()
    this.tradeCapacityPending.set(key, promise)
    return promise
  }

  /**
   * THE live exchange submit. signer=local keeps the validated in-plugin
   * EIP-712 path; signer=web3 builds the identical typed-data payload and
   * lets dsh-web3 sign it under its signing policy (approval gates, PIN,
   * audit log) — then only transports the opaque signature.
   */
  async submitAction(action, exec) {
    if (this.cfg.signer !== 'web3') return this.client.exchange(action)
    const wallet = this.walletService()
    if (!wallet) throw new Error('signer=web3 但 dsh-web3 未安装 —— 请执行 dsh plugin --profile web add dsh-web3')
    const nonce = this.client.nextNonce()
    const typed = await buildL1TypedData(action, nonce, { isMainnet: this.cfg.network === 'mainnet' })
    const purpose = `Hyperliquid ${this.cfg.network} 交易签名：${action?.type}` +
      (action?.type === 'order' ? ` ${action.orders?.[0]?.b ? '买入' : '卖出'} ${action.orders?.[0]?.s} @ ${action.orders?.[0]?.p}` : '')
    const result = await wallet.signTypedData(
      { account: this.cfg.web3Account, ...typed, purpose },
      this.approvalGateway(),
      { toolName: 'dsh-hyperliquid', agent: exec?.agent, callId: exec?.callId, signal: exec?.signal },
    )
    if (result?.status !== 'signed' || !result.signature) {
      const why = {
        'awaiting-approval-rejected': '用户在钱包审批中拒绝了该签名',
        'denied-by-policy': '钱包签名策略拒绝了该签名（在 DSH 设置 → Web3 钱包调整签名策略；与交易台的交易限额无关）',
        'unavailable-approver': '没有可用的审批通道（钱包安全模式要求逐笔确认）',
      }[result?.status] ?? `签名未完成（status=${result?.status}）`
      throw new Error(`dsh-web3 签名失败：${why}`)
    }
    const signerAddress = await this.web3Address()
    if (result.address?.toLowerCase() !== signerAddress.toLowerCase()) throw new Error('dsh-web3 返回的签名地址与配置账户不一致')
    const signature = splitSignature(result.signature)
    return this.client.exchangeSigned(action, signature, nonce)
  }

  /** Mid price for a perp coin: WS allMids first, REST fallback. */
  async midOf(coin) {
    this.touch(keys.allMids())
    const snap = this.client.snapshot(keys.allMids())
    if (snap?.data && Date.now() - snap.at < 5_000) {
      const v = snap.data.mids?.[coin] ?? snap.data[coin]
      const n = Number(v)
      if (Number.isFinite(n) && n > 0) return n
    }
    try {
      const mids = await this.client.allMids()
      const n = Number(mids?.mids?.[coin] ?? mids?.[coin])
      if (Number.isFinite(n) && n > 0) return n
    } catch { /* fall through */ }
    const markets = await this.markets()
    const row = markets.universe.find((u) => u.name === coin)
    if (row?.markPx) return Number(row.markPx)
    throw new Error(`无法获得 ${coin} 中间价`)
  }

  async markets(request) {
    const now = Date.now()
    if (this.marketsCache && now - this.marketsAt < MARKETS_TTL_MS) return this.marketsCache
    const client = this.client
    const ctxs = await client.metaAndAssetCtxs()
    if (client !== this.client) throw new Error('网络已切换，忽略旧网络市场数据')
    const universe = (ctxs?.[0]?.universe ?? []).map((u, i) => ({
      name: u.name,
      szDecimals: u.szDecimals,
      maxLeverage: u.maxLeverage,
      onlyIsolated: u.onlyIsolated ?? false,
      ctx: ctxs?.[1]?.[i] ?? null,
    }))
    this.marketsCache = { universe, network: this.cfg.network }
    this.marketsAt = now
    return this.marketsCache
  }

  /** Search catalog for the market picker. Extra venues are view-only until
   * their asset IDs, account state and order guards have dedicated support. */
  async marketCatalog(request) {
    const now = Date.now()
    const client = this.client
    const ctxKey = this.touch(keys.allDexsAssetCtxs())
    if (!this.catalogCache || now - this.catalogAt >= 60_000) {
      const base = await this.markets()
      const [spotResult, perpResult, outcomeResult, categoryResult] = await Promise.allSettled([
        client.info('spotMetaAndAssetCtxs'),
        client.info('allPerpMetas'),
        this.cfg.network === 'testnet' ? client.info('outcomeMeta') : Promise.resolve(null),
        client.info('perpCategories'),
      ])
      if (client !== this.client) throw new Error('网络已切换，忽略旧网络市场目录')
      const categories = new Map(categoryResult.status === 'fulfilled' && Array.isArray(categoryResult.value)
        ? categoryResult.value.filter((pair) => Array.isArray(pair) && typeof pair[0] === 'string' && typeof pair[1] === 'string') : [])
      const rows = base.universe.map((row) => ({
        name: row.name, label: `${row.name}-USDC`, kind: 'perp', venue: 'Hyperliquid',
        tradable: true, ctx: row.ctx, maxLeverage: row.maxLeverage,
      }))
      const dexIndex = new Map()
      if (perpResult.status === 'fulfilled' && Array.isArray(perpResult.value)) {
        for (const item of perpResult.value.slice(1)) {
          const meta = Array.isArray(item) ? item[0] : item
          const contexts = Array.isArray(item) ? item[1] : null
          for (const [index, asset] of (meta?.universe ?? []).entries()) {
            const dex = asset.name.split(':')[0] || 'HIP-3'
            dexIndex.set(asset.name, { dex, index })
            rows.push({ name: asset.name, label: asset.name, kind: 'hip3',
              venue: dex, tradable: false, ctx: contexts?.[index] ?? null,
              category: categories.get(asset.name) ?? null, maxLeverage: asset.maxLeverage })
          }
        }
      }
      if (spotResult.status === 'fulfilled') {
        const [meta, ctxs] = spotResult.value ?? []
        const tokens = new Map((meta?.tokens ?? []).map((token) => [token.index, token.name]))
        for (const [index, asset] of (meta?.universe ?? []).entries()) {
          // spotMetaAndAssetCtxs returns contexts in universe order; contexts
          // have no `coin` field in the documented response.
          const ctx = ctxs?.[index]
          const base = tokens.get(asset.tokens?.[0])
          const quote = tokens.get(asset.tokens?.[1])
          const label = base && quote ? `${base}/${quote}` : asset.name
          rows.push({ name: asset.name, label, kind: 'spot', venue: 'Spot',
            tradable: false, ctx: ctx ?? null, maxLeverage: null })
        }
      }
      if (outcomeResult.status === 'fulfilled') {
        for (const outcome of outcomeResult.value?.outcomes ?? []) {
          if (!Number.isSafeInteger(outcome?.outcome) || outcome.outcome < 0) continue
          for (const [side, spec] of (outcome.sideSpecs ?? []).entries()) {
            if (side > 1) break
            const name = `#${10 * outcome.outcome + side}`
            rows.push({ name, label: `${outcome.name || 'Outcome'} · ${spec?.name || (side === 0 ? 'Yes' : 'No')} #${outcome.outcome}`, kind: 'outcome',
              venue: `Outcome #${outcome.outcome}`, tradable: false, ctx: null, maxLeverage: null })
          }
        }
      }
      this.catalogDexIndex = dexIndex
      this.catalogCache = { markets: rows, network: this.cfg.network, observedAt: now }
      this.catalogAt = now
    }
    const live = this.client.snapshot(ctxKey)
    if (!live || now - live.at > 15_000 || !Array.isArray(live.data?.ctxs)) return this.catalogCache
    const byDex = new Map(live.data.ctxs.filter((entry) => Array.isArray(entry) && typeof entry[0] === 'string' && Array.isArray(entry[1])))
    const markets = this.catalogCache.markets.map((row) => {
      const location = this.catalogDexIndex.get(row.name)
      const ctx = location ? byDex.get(location.dex)?.[location.index] : null
      return ctx ? { ...row, ctx } : row
    })
    return { ...this.catalogCache, markets, ctxObservedAt: live.at }
  }

  /** Refresh one selected market; the picker catalog is not the live price source. */
  async marketDetail(request) {
    const coin = requireCoin(request)
    // Core perps have a small, separately cached metadata endpoint. Do not
    // build the broad spot/HIP-3 catalog merely to refresh a BTC strip.
    if (!coin.includes(':') && !coin.startsWith('#') && !coin.startsWith('@') && !coin.includes('/')) {
      const { universe } = await this.markets()
      const market = universe.find((entry) => entry.name === coin)
      if (market) return { market: { name: coin, label: `${coin}-USDC`, kind: 'perp', venue: 'Hyperliquid', tradable: true,
        ctx: market.ctx, maxLeverage: market.maxLeverage }, observedAt: this.marketsAt }
    }
    const catalog = await this.marketCatalog()
    const row = catalog.markets.find((market) => market.name === coin)
    if (!row) throw new Error(`市场目录中没有 ${coin}`)
    if (row.kind === 'spot') {
      const cached = this.detailCache.get('__spot__')
      if (cached && Date.now() - cached.at < 15_000) return { market: { ...row, ctx: cached.rows.get(coin) ?? row.ctx }, observedAt: cached.at }
      const [meta, ctxs] = await this.client.info('spotMetaAndAssetCtxs')
      const rows = new Map((meta?.universe ?? []).map((asset, index) => [asset.name, ctxs?.[index] ?? null]))
      const at = Date.now()
      this.detailCache.set('__spot__', { at, rows })
      return { market: { ...row, ctx: rows.get(coin) ?? null }, observedAt: at }
    }
    if (row.kind === 'outcome') {
      const key = this.touch(keys.l2Book(coin))
      const live = this.client.snapshot(key)
      const fresh = live && Date.now() - live.at < 5_000 && Array.isArray(live.data?.levels)
      const book = fresh ? live.data : await this.client.l2Book(coin).catch(() => null)
      const bid = Number(book?.levels?.[0]?.[0]?.px)
      const ask = Number(book?.levels?.[1]?.[0]?.px)
      const markPx = bid > 0 && ask > 0 ? String(Number(((bid + ask) / 2).toPrecision(12))) : bid > 0 ? String(bid) : ask > 0 ? String(ask) : null
      return { market: { ...row, ctx: markPx ? { markPx, midPx: markPx } : null }, observedAt: book ? (fresh ? live.at : Date.now()) : 0 }
    }
    if (row.ctx && catalog.ctxObservedAt && Date.now() - catalog.ctxObservedAt < 10_000) {
      return { market: row, observedAt: catalog.ctxObservedAt }
    }
    const dex = coin.split(':')[0]
    const cached = this.detailCache.get(dex)
    if (cached && Date.now() - cached.at < 15_000) return { market: { ...row, ctx: cached.rows.get(coin) ?? row.ctx }, observedAt: cached.at }
    const [meta, ctxs] = await this.client.info('metaAndAssetCtxs', { dex })
    const rows = new Map((meta?.universe ?? []).map((asset, index) => [asset.name, ctxs?.[index] ?? null]))
    const at = Date.now()
    this.detailCache.set(dex, { at, rows })
    return { market: { ...row, ctx: rows.get(coin) ?? row.ctx }, observedAt: at }
  }

  /** Browser reads only the marks for its active registered DSH session. */
  async chartMarks(request) {
    const sessionId = String(request?.sessionId ?? '')
    if (!this.store.getSession(sessionId)) return { marks: [] }
    const coin = requireCoin(request)
    const interval = requireInterval(request?.interval ?? this.desk.interval)
    return { marks: this.store.listChartMarks(sessionId, coin, interval) }
  }

  addChartMark(request, sessionId, source = 'agent') {
    this.requireTradingSession(sessionId)
    const coin = requireCoin(request)
    const interval = requireInterval(request?.interval ?? this.desk.interval)
    const kind = request?.kind === 'trend' ? 'trend' : 'level'
    const role = ['support', 'resistance', 'neutral'].includes(request?.role) ? request.role : 'neutral'
    const label = String(request?.label ?? '').trim()
    if (!label || label.length > 60) throw new Error('图表标注需要 1-60 字标签')
    const mark = { sessionId, coin, interval, kind, role, label, source }
    if (kind === 'level') {
      const price = Number(request?.price)
      if (!Number.isFinite(price) || price <= 0) throw new Error('水平线 price 必须为正数')
      mark.price = price
    } else {
      const fromTime = Number(request?.fromTime)
      const toTime = Number(request?.toTime)
      const fromPrice = Number(request?.fromPrice)
      const toPrice = Number(request?.toPrice)
      const oldest = Date.now() - 90 * 86_400_000
      const latest = Date.now() + 86_400_000
      if (!(fromTime >= oldest && toTime > fromTime && toTime <= latest && fromPrice > 0 && toPrice > 0 && Number.isFinite(fromPrice) && Number.isFinite(toPrice))) {
        throw new Error('趋势线需要最近 90 天内递增的毫秒时间戳及正数价格')
      }
      Object.assign(mark, { fromTime, toTime, fromPrice, toPrice })
    }
    return this.store.addChartMark(mark)
  }

  removeChartMark(id, sessionId) {
    this.requireTradingSession(sessionId)
    return this.store.removeChartMark(sessionId, String(id ?? ''))
  }

  /** Session-scoped workbench state shared by the native UI and agent tools. */
  async sessionWorkspace(request) {
    return this.store.getSessionWorkspace(String(request?.sessionId ?? ''))
  }

  async updateSessionWorkspace(request) {
    const sessionId = String(request?.sessionId ?? '')
    this.requireTradingSession(sessionId)
    const input = request?.patch ?? {}
    if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('工作台配置无效')
    const patch = {}
    if ('interval' in input) patch.interval = requireInterval(input.interval)
    if ('bookGrouping' in input) {
      if (!Object.hasOwn(BOOK_GROUPINGS, input.bookGrouping)) throw new Error('盘口精度无效')
      patch.bookGrouping = input.bookGrouping
    }
    if ('chartTab' in input) {
      if (!['chart', 'funding'].includes(input.chartTab)) throw new Error('图表页签无效')
      patch.chartTab = input.chartTab
    }
    if ('tapeTab' in input) {
      if (!['book', 'trades'].includes(input.tapeTab)) throw new Error('行情页签无效')
      patch.tapeTab = input.tapeTab
    }
    if ('bottomTab' in input) {
      if (!['positions', 'orders', 'account'].includes(input.bottomTab)) throw new Error('账户页签无效')
      patch.bottomTab = input.bottomTab
    }
    if ('indicators' in input) {
      const allowed = ['volume', 'sma20', 'sma60', 'ema20', 'ema50', 'bollinger20', 'rsi14', 'macd']
      if (!Array.isArray(input.indicators) || input.indicators.length > allowed.length || input.indicators.some((id) => !allowed.includes(id))) throw new Error('图表指标无效')
      patch.indicators = [...new Set(input.indicators)]
    }
    if ('priceScale' in input) {
      if (!['normal', 'log', 'percentage'].includes(input.priceScale)) throw new Error('价格刻度无效')
      patch.priceScale = input.priceScale
    }
    if ('chartLayers' in input) {
      const layers = input.chartLayers
      if (!layers || typeof layers !== 'object' || Array.isArray(layers) || Object.keys(layers).some((key) => !['orders', 'fills', 'drawings'].includes(key)) || Object.values(layers).some((value) => typeof value !== 'boolean')) throw new Error('图表图层无效')
      patch.chartLayers = layers
    }
    if ('layout' in input) {
      const l = input.layout
      if (!l || typeof l !== 'object' || Array.isArray(l)) throw new Error('工作台布局无效')
      const clean = {}
      for (const [key, min, max] of [['sessionsWidth', 160, 400], ['chatWidth', 320, 700]]) {
        if (key in l) {
          const value = Number(l[key])
          if (!Number.isFinite(value)) throw new Error('工作台宽度无效')
          clean[key] = Math.max(min, Math.min(max, Math.round(value)))
        }
      }
      for (const key of ['sessionsCollapsed', 'deskCollapsed', 'chatCollapsed']) {
        if (key in l) {
          if (typeof l[key] !== 'boolean') throw new Error('工作台折叠状态无效')
          clean[key] = l[key]
        }
      }
      patch.layout = clean
    }
    if ('chartRanges' in input) {
      const ranges = input.chartRanges
      if (!ranges || typeof ranges !== 'object' || Array.isArray(ranges) || Object.keys(ranges).length > 1) throw new Error('图表视区无效')
      const clean = {}
      for (const [key, range] of Object.entries(ranges)) {
        if (key.length > 100 || key === '__proto__' || !range || !Number.isFinite(range.from) || !Number.isFinite(range.to) || range.from >= range.to) throw new Error('图表视区无效')
        clean[key] = { from: range.from, to: range.to }
      }
      patch.chartRanges = clean
    }
    const result = this.store.updateSessionWorkspace(sessionId, patch)
    if (this.desk?.sessionId === sessionId && patch.interval) this.desk.interval = patch.interval
    return result
  }

  async drawChartMark(request) {
    const sessionId = String(request?.sessionId ?? '')
    return this.addChartMark(request, sessionId, 'user')
  }

  async eraseChartMark(request) {
    const sessionId = String(request?.sessionId ?? '')
    return this.removeChartMark(request?.id, sessionId)
  }

  // ── remote methods ───────────────────────────────────────────────────

  /** Change the desk's data and trade network for this host process. */
  async switchNetwork(request) {
    const network = request?.network
    if (network !== 'mainnet' && network !== 'testnet') throw new Error('network 必须为 mainnet 或 testnet')
    if (network === this.cfg.network) return { network }
    if (this.activeTradeOps > 0) throw new Error('交易操作仍在进行，无法切换网络')
    if (network === 'mainnet' && request?.acknowledgeMainnet !== true) throw new Error('切换主网需要确认')
    const nextPaperGuard = this.cfg.dataDir ? new TradingGuard(this.cfg.dataDir, { ...this.cfg, dataDir: this.cfg.dataDir }, { budgetName: network === 'mainnet' ? 'paper-budget-mainnet.json' : 'paper-budget.json' }) : null
    this.store.selectPaperNetwork?.(network)
    const previous = this.cfg.network
    this.client.close()
    this.cfg.network = network
    this.client = new HyperliquidClient({ network, privateKey: this.cfg.privateKey })
    this.lastTouch.clear()
    this.marketsCache = null
    this.marketsAt = 0
    this.catalogCache = null
    this.catalogAt = 0
    this.catalogDexIndex.clear()
    this.detailCache.clear()
    this.accountModeCache = null
    this.accountModePending = null
    this.tradeCapacityCache.clear()
    this.tradeCapacityPending.clear()
    this.guard.plans.clear()
    if (nextPaperGuard) this.paperGuard = nextPaperGuard
    this.store.recordEvent('network.changed', { from: previous, to: network })
    return { network }
  }

  /** Change between real-account (live) and local paper trading for this host process. */
  async switchTradingMode(request) {
    const mode = request?.mode
    if (mode !== 'live' && mode !== 'paper') throw new Error('mode 必须为 live 或 paper')
    if (mode === this.cfg.tradingMode) return { mode }
    if (this.activeTradeOps > 0) throw new Error('交易操作仍在进行，无法切换交易模式')
    if (mode === 'live' && request?.acknowledgeLive !== true) throw new Error('切换实盘需要确认')
    const previous = this.cfg.tradingMode
    this.cfg.tradingMode = mode
    this.accountModeCache = null
    this.accountModePending = null
    this.tradeCapacityCache.clear()
    this.tradeCapacityPending.clear()
    this.guard.plans.clear()
    this.store.recordEvent('mode.changed', { from: previous, to: mode })
    return { mode }
  }

  /** Today's (UTC) notional already counted against maxDailyUsd for the active mode. */
  usedTodayUsd() {
    const guard = this.cfg.tradingMode === 'paper' ? this.paperGuard : this.guard
    if (!guard?.budget) return 0
    return guard.budget.day === new Date().toISOString().slice(0, 10) ? guard.budget.usedUsd : 0
  }

  /** Plugin status: network, mode, account identity, ws health. */
  async status(request) {
    const address = await this.resolveAddress()
    const wallet = this.cfg.signer === 'web3' ? this.walletService() : null
    return {
      network: this.cfg.network,
      tradingMode: this.cfg.tradingMode,
      signer: this.cfg.signer,
      autonomousLive: this.cfg.autonomousLive,
      riskLimits: { allowedCoins: this.cfg.allowedCoins, maxOrderUsd: this.cfg.maxOrderUsd, maxDailyUsd: this.cfg.maxDailyUsd, maxPositionUsd: this.cfg.maxPositionUsd, maxLeverage: this.cfg.maxLeverage,
        // Day budget of the ledger that applies to the current mode (paper and live are separate).
        usedTodayUsd: this.usedTodayUsd() },
      walletConfigured: this.cfg.signer === 'web3' ? Boolean(wallet && this.cfg.tradingAddress) : Boolean(this.cfg.privateKey),
      address,
      ws: this.client.wsStatus(),
      desk: { ...this.desk },
      eventSeq: this.store.eventSeq,
    }
  }

  /** Live snapshot for one coin: mids + book + recent trades (REST fallbacks for the WS warm-up window). */
  async snapshot(request) {
    const client = this.client
    const network = this.cfg?.network ?? client.network ?? 'testnet'
    const coin = requireCoin(request)
    const interval = requireInterval(request?.interval ?? this.desk.interval)
    const bookGrouping = request?.bookGrouping ?? 'full'
    if (!Object.hasOwn(BOOK_GROUPINGS, bookGrouping)) throw new Error(`不支持的盘口价格档位：${bookGrouping}`)
    const grouping = BOOK_GROUPINGS[bookGrouping]
    const bookKey = this.touch(keys.l2Book(coin))
    const groupedKey = grouping ? this.touch(keys.l2Book(coin, grouping)) : null
    const tradesKey = this.touch(keys.trades(coin))
    const candleKey = this.touch(keys.candle(coin, interval))
    this.touch(keys.allMids())
    const book = client.snapshot(bookKey)
    const groupedBook = groupedKey ? client.snapshot(groupedKey) : null
    const trades = client.snapshot(tradesKey)
    const candle = client.snapshot(candleKey)
    const mids = client.snapshot(keys.allMids())
    const now = Date.now()
    const bookFresh = book && now - book.at < 5_000
    const groupedFresh = groupedBook && now - groupedBook.at < 5_000
    const midsFresh = mids && now - mids.at < 5_000
    // Warm-up fallback: the upstream WS needs ~1s after first touch; paint
    // the first frame from REST instead of leaving the desk blank.
    const [restBook, restMids, restGrouped] = await Promise.all([
      bookFresh ? null : client.l2Book(coin).catch(() => null),
      midsFresh ? null : client.allMids().catch(() => null),
      !grouping || groupedFresh ? null : client.l2Book(coin, grouping).catch(() => null),
    ])
    if (client !== this.client) throw new Error('网络已切换，忽略旧网络行情')
    return {
      network,
      coin,
      book: bookFresh ? book.data : (restBook ?? book?.data ?? null),
      bookGrouping,
      groupedBook: grouping ? (groupedFresh ? groupedBook.data : restGrouped) : null,
      trades: trades?.data ?? null,
      candle: candle?.data ?? null,
      interval,
      mids: midsFresh ? mids.data : (restMids ?? mids?.data ?? null),
      observedAt: { book: restBook ? Date.now() : (book?.at ?? 0), groupedBook: groupedFresh ? groupedBook.at : restGrouped ? Date.now() : 0, trades: trades?.at ?? 0, candle: candle?.at ?? 0, mids: restMids ? Date.now() : (mids?.at ?? 0) },
      seqs: { book: book?.seq ?? 0, groupedBook: groupedBook?.seq ?? 0, trades: trades?.seq ?? 0, candle: candle?.seq ?? 0, mids: mids?.seq ?? 0 },
      ws: client.wsStatus(),
    }
  }

  /** Candle history via REST (the WS candle channel is an M2 upgrade). */
  async candles(request) {
    const coin = requireCoin(request)
    const interval = requireInterval(request?.interval ?? '1h')
    const endMs = Number(request?.endMs) || Date.now()
    const startMs = Number(request?.startMs) || endMs - defaultSpanMs(interval)
    let rows
    try {
      rows = await this.client.candleSnapshot(coin, interval, startMs, endMs)
    } catch (error) {
      // The info endpoint returns HTTP 500 for an unknown coin. Distinguish an
      // invalid symbol from a real market whose candle service is unavailable.
      if (error?.response?.status === 500 || /^500\s/.test(String(error?.message ?? ''))) {
        const catalog = await this.marketCatalog().catch(() => null)
        if (catalog && !catalog.markets.some((market) => market.name === coin)) {
          throw new Error(`未知市场 ${coin}；请用 hyper_market action=catalog 查询官方合约名`, { cause: error })
        }
      }
      throw error
    }
    const list = Array.isArray(rows) ? rows : []
    // HL candle timestamps are already ms since epoch.
    return { coin, interval, candles: list.map((c) => ({
      t: Number(c.t ?? c.time ?? 0),
      T: Number(c.T ?? c.closeTime ?? 0),
      o: Number(c.o), h: Number(c.h), l: Number(c.l), c: Number(c.c), v: Number(c.v),
    })) }
  }

  /** Recent hourly funding rates for the selected perpetual market. */
  async fundingHistory(request) {
    const coin = requireCoin(request)
    const startTime = Date.now() - 7 * 86400_000
    const rows = await this.client.info('fundingHistory', { coin, startTime })
    return { coin, rows: Array.isArray(rows) ? rows.slice(-168) : [] }
  }

  /** Account view: mode-aware balances and all-DEX positions when WS is fresh. */
  async account(request) {
    if (this.cfg.tradingMode === 'paper') {
      const paper = this.store.paperAccount()
      const mids = await safeMids(this)
      const risk = paperRiskState(paper, mids)
      return { mode: 'paper', usd: paper.usd, equity: risk.equity, uPnl: risk.uPnl,
        marginUsed: risk.marksConfirmed ? risk.marginUsed : null,
        availableMargin: risk.marksConfirmed ? Math.max(0, risk.equity - risk.marginUsed) : null,
        marksConfirmed: risk.marksConfirmed, positions: risk.positions, fills: paper.fills.slice(0, 50),
        simulation: '固定滑点；未模拟盘口深度、手续费、资金费或强平' }
    }
    const address = await this.resolveAddress()
    if (!address) throw new Error('live 模式需要钱包（config.privateKey 或 signer=web3）')
    const accountMode = await this.accountMode(address)
    const sharedBalance = accountMode === 'unifiedAccount' || accountMode === 'portfolioMargin'
    const activeCoin = canonicalMarketCoin(request?.coin ?? this.desk?.coin)
    const accountDex = activeCoin.includes(':') ? activeCoin.split(':')[0] : ''
    const stateKey = this.touch(keys.allDexsClearinghouseState(address))
    const wsState = this.client.snapshot(stateKey)
    const liveStates = wsState && Date.now() - wsState.at < 10_000 &&
      wsState.data?.user?.toLowerCase() === address.toLowerCase() && Array.isArray(wsState.data?.clearinghouseStates)
      ? new Map(wsState.data.clearinghouseStates.filter((entry) => Array.isArray(entry) && typeof entry[0] === 'string' && entry[1] && Array.isArray(entry[1].assetPositions)))
      : null
    const [state, open, markets, spot] = await Promise.all([
      liveStates?.get(accountDex) ?? (accountDex
        ? this.client.info('clearinghouseState', { user: address, dex: accountDex })
        : this.client.clearinghouseState(address)),
      this.client.frontendOpenOrders(address),
      this.markets().catch(() => null),
      sharedBalance ? this.client.spotClearinghouseState(address) : Promise.resolve(null),
    ])
    if (!state || !Array.isArray(state.assetPositions) || (!sharedBalance && (!state.marginSummary || !Number.isFinite(Number(state.marginSummary.accountValue))))) {
      throw new Error('交易所永续账户响应无效；账户状态未确认')
    }
    if (!Array.isArray(open)) throw new Error('交易所挂单响应无效；账户状态未确认')
    if (sharedBalance && !Array.isArray(spot?.balances)) throw new Error('交易所统一账户余额响应无效；账户状态未确认')
    const usdcRow = sharedBalance ? spot.balances.find((row) => row.coin === 'USDC' && row.token === 0) : null
    const usdcBalance = sharedBalance ? Number(usdcRow?.total ?? 0) : null
    const unheldUsdc = sharedBalance ? usdcBalance - Number(usdcRow?.hold ?? 0) : null
    if (sharedBalance && (!Number.isFinite(usdcBalance) || !Number.isFinite(unheldUsdc))) throw new Error('统一账户 USDC 余额无效')
    const isCorePerp = Boolean(markets?.universe?.some((market) => market.name === activeCoin))
    const tradeCapacity = sharedBalance && isCorePerp
      ? await this.activeAssetFor(address, activeCoin, accountMode) : null
    const marketByCoin = new Map([...(markets?.universe ?? []), ...(this.catalogCache?.markets ?? [])].map((market) => [market.name, market]))
    const positionStates = liveStates ? new Map(liveStates) : new Map()
    positionStates.set(accountDex, state)
    const assetPositions = [...positionStates].flatMap(([dex, dexState]) => (dexState.assetPositions ?? []).map((row) => ({
      dex,
      coin: row.position?.coin,
      size: Number(row.position?.szi ?? 0),
      entryPx: Number(row.position?.entryPx ?? 0),
      markPx: Number(marketByCoin.get(row.position?.coin)?.ctx?.markPx) ||
        (Number(row.position?.szi) ? Number(row.position?.positionValue) / Math.abs(Number(row.position.szi)) : null),
      positionValue: Number(row.position?.positionValue ?? 0),
      uPnl: Number(row.position?.unrealizedPnl ?? 0),
      returnOnEquity: row.position?.returnOnEquity == null ? null : Number(row.position.returnOnEquity),
      liquidationPx: row.position?.liquidationPx == null ? null : Number(row.position.liquidationPx),
      marginUsed: row.position?.marginUsed == null ? null : Number(row.position.marginUsed),
      cumFunding: row.position?.cumFunding ?? null,
      maxLeverage: row.position?.maxLeverage ?? null,
      leverage: row.position?.leverage ?? null,
    })))
    return {
      mode: 'live',
      address,
      accountMode,
      accountDex,
      positionsCoverage: liveStates ? 'all-dexs' : 'selected-dex',
      positionsObservedAt: liveStates ? wsState.at : Date.now(),
      balanceSource: sharedBalance ? 'spot' : 'perp',
      marginSummary: sharedBalance ? null : state.marginSummary,
      withdrawable: sharedBalance ? null : Number(state.withdrawable),
      usdcBalance,
      unheldUsdc,
      spotBalances: sharedBalance ? spot.balances : null,
      tradeCapacity,
      positions: assetPositions,
      openOrders: open,
    }
  }

  /** Open orders (live mode; paper has none resting). */
  async orders(request) {
    if (this.cfg.tradingMode === 'paper') return { mode: 'paper', orders: [] }
    const address = await this.resolveAddress()
    if (!address) throw new Error('live 模式需要钱包（config.privateKey 或 signer=web3）')
    const rows = await this.client.frontendOpenOrders(address)
    return { mode: 'live', orders: Array.isArray(rows) ? rows : [] }
  }

  /** Recent fills (live mode; paper reads the local ledger). */
  async fills(request) {
    if (this.cfg.tradingMode === 'paper') {
      return { mode: 'paper', fills: this.store.paperAccount().fills.slice(0, 100) }
    }
    const address = await this.resolveAddress()
    if (!address) throw new Error('live 模式需要钱包（config.privateKey 或 signer=web3）')
    const rows = await this.client.userFills(address)
    return { mode: 'live', fills: Array.isArray(rows) ? rows : [] }
  }

  /** Explicitly loaded history: these weighted API calls must not join the 3s account poll. */
  async tradeHistory() {
    if (this.cfg.tradingMode === 'paper') {
      const paper = this.store.paperAccount()
      return { mode: 'paper', orders: paper.orders.slice(0, 200), fills: paper.fills.slice(0, 200) }
    }
    const address = await this.resolveAddress()
    if (!address) throw new Error('未配置交易主账户地址')
    const [orders, fills] = await Promise.all([
      this.client.historicalOrders(address), this.client.userFills(address),
    ])
    if (!Array.isArray(orders) || !Array.isArray(fills)) throw new Error('交易所历史数据响应无效')
    const localByCloid = this.store.liveOrders
    const decisions = this.store.liveDecisions
    return { mode: 'live', orders: orders.slice(0, 2000).map((entry) => {
      const order = entry.order ?? entry
      const local = localByCloid[order.cloid]
      return { ...order, status: entry.status ?? local?.status ?? 'unknown', statusTimestamp: entry.statusTimestamp,
        reason: local?.thesis ?? (local?.decisionId ? decisions[local.decisionId]?.thesis ?? null : null) }
    }), fills: fills.slice(0, 2000) }
  }

  /** Hyperliquid portfolio samples are display data, not an accounting ledger. */
  async portfolio() {
    if (this.cfg.tradingMode === 'paper') {
      const account = await this.account({})
      const fills = this.store.paperAccount().fills
      return { mode: 'paper', equity: account.equity, unrealizedPnl: account.uPnl,
        realizedPnl: fills.reduce((sum, fill) => sum + Number(fill.realized ?? 0), 0), series: {} }
    }
    const address = await this.resolveAddress()
    if (!address) throw new Error('未配置交易主账户地址')
    const rows = await this.client.portfolio(address)
    if (!Array.isArray(rows)) throw new Error('交易所收益数据响应无效')
    return { mode: 'live', series: Object.fromEntries(rows.filter((row) => Array.isArray(row) && typeof row[0] === 'string' && row[1])) }
  }

  async orderStatus(request) {
    if (this.cfg.tradingMode !== 'live') throw new Error('paper 模式没有交易所订单状态')
    const raw = request?.oid
    const oid = typeof raw === 'string' && /^[1-9][0-9]*$/.test(raw) ? Number(raw) : raw
    if (!(Number.isInteger(oid) && oid > 0) && !/^0x[0-9a-fA-F]{32}$/.test(String(oid ?? ''))) throw new Error('orderStatus 需要 oid 或 128 位 cloid')
    const address = await this.resolveAddress()
    if (!address) throw new Error('未配置交易主账户地址')
    const exchange = await this.client.info('orderStatus', { user: address, oid })
    const local = typeof oid === 'string' ? this.store.getLiveOrder(oid) : null
    return { exchange, local }
  }

  // ── trading sessions ─────────────────────────────────────────────────
  async sessions(request) {
    return { sessions: this.store.listSessions() }
  }

  async registerSession(request) {
    const sessionId = String(request?.sessionId ?? '').trim()
    if (!sessionId) throw new Error('registerSession requires sessionId')
    const row = this.store.registerSession(sessionId, { coin: request?.coin == null ? undefined : canonicalMarketCoin(request.coin), title: request?.title })
    this.store.recordEvent('session.register', { sessionId })
    return row
  }

  async removeSession(request) {
    const sessionId = String(request?.sessionId ?? '').trim()
    if (!sessionId) throw new Error('removeSession requires sessionId')
    this.store.removeSession(sessionId)
    return { ok: true }
  }

  async bindCoin(request) {
    const sessionId = String(request?.sessionId ?? '').trim()
    const coin = requireCoin(request)
    const source = request?.source === 'ui' ? 'ui' : 'agent'
    const clientId = source === 'ui' ? String(request?.clientId ?? '') : ''
    // Commit the session binding before publishing the desk focus. An agent
    // changing a background session must not move the visible desk.
    const row = sessionId ? this.store.bindCoin(sessionId, coin) : null
    if (source === 'ui') this.desk.sessionId = sessionId || null
    if (!this.desk.sessionId || this.desk.sessionId === sessionId) {
      this.desk.coin = coin
      this.store.recordEvent('desk.state', { ...this.desk, source, clientId })
    }
    if (row) {
      this.store.recordEvent('session.coin', { sessionId, coin, source, clientId })
      return row
    }
    return { coin }
  }

  /**
   * Desk focus two-way sync: the UI pushes what the user is looking at
   * (coin/interval); the agent reads the same state through status() and the
   * dynamic system-prompt section. Agent-driven changes (bindCoin) publish
   * `desk.state` events the UI follows back.
   */
  async deskState(request) {
    const patch = {}
    if (request?.coin !== undefined) patch.coin = requireCoin(request)
    if (request?.sessionId === null) this.desk.sessionId = null
    if (request?.interval !== undefined) {
      const iv = String(request.interval)
      if (!INTERVALS.includes(iv)) throw new Error(`不支持的 K 线周期：${iv}`)
      patch.interval = iv
    }
    if (patch.coin !== undefined && patch.coin !== this.desk.coin) {
      this.desk.coin = patch.coin
      this.store.recordEvent('desk.state', { ...this.desk, source: 'ui', clientId: String(request?.clientId ?? '') })
    }
    if (patch.interval !== undefined) this.desk.interval = patch.interval
    return { ...this.desk }
  }

  // ── orders ───────────────────────────────────────────────────────────
  /** Agent proposal: quote, account and hard limits are checked on the host. */
  async prepareOrder(request, sessionId) {
    if (this.cfg.tradingMode !== 'live') throw new Error('paper 下单无需 live 决策预检')
    this.requireTradingSession(sessionId)
    const thesis = String(request?.thesis ?? '').trim()
    if (thesis.length < 10 || thesis.length > 1000) throw new Error('交易决策需要 10-1000 字的依据')
    const order = orderOf(request)
    const preview = await this.checkLiveOrder(order)
    const decision = this.guard.create(order, sessionId, preview)
    this.store.recordLiveDecision(decision.decisionId, { sessionId, order, thesis, preview, expiresAt: decision.expiresAt })
    return decision
  }

  async checkLiveOrder(order) {
    const client = this.client
    const network = this.cfg.network
    if ((order.takeProfitPx != null || order.stopLossPx != null) && this.cfg.network !== 'testnet') {
      throw new Error('分组止盈止损尚待 funded testnet 验收，目前仅在 testnet 开放')
    }
    const address = await this.resolveAddress()
    if (!address) throw new Error('live 交易需要有效的 tradingAddress 或本地钱包')
    if (this.cfg.signer === 'web3') await this.web3Address()
    const [market, mids, state, accountMode] = await Promise.all([
      this.markets(), client.allMids(), client.clearinghouseState(address), this.accountMode(address, true),
    ])
    if (!Array.isArray(state?.assetPositions)) throw new Error('交易所持仓状态未确认，拒绝 live 下单')
    const sharedBalance = accountMode === 'unifiedAccount' || accountMode === 'portfolioMargin'
    const asset = market.universe.find((u) => u.name === order.coin)
    if (!asset) throw new Error(`未知合约 ${order.coin}`)
    const mid = Number(mids?.mids?.[order.coin] ?? mids?.[order.coin])
    if (!Number.isFinite(mid) || mid <= 0) throw new Error('无法获取实时价格，拒绝 live 下单')
    validateProtection(order, mid)
    if (Number(wireSz(order.sz, asset.szDecimals)) !== order.sz) throw new Error(`数量不符合 ${order.coin} 的精度 ${asset.szDecimals}`)
    const row = (state?.assetPositions ?? []).find((p) => p.position?.coin === order.coin)?.position
    const otherExposureUsd = (state?.assetPositions ?? []).reduce((sum, p) => {
      if (p.position?.coin === order.coin) return sum
      const value = Number(p.position?.positionValue)
      if (!Number.isFinite(value)) throw new Error('无法读取其他仓位敞口')
      return sum + Math.abs(value)
    }, 0)
    const positionSize = Number(row?.szi ?? 0)
    const leverage = Number(row?.leverage?.value ?? row?.leverage?.leverage ?? 1)
    let accountValue = Number(state?.marginSummary?.accountValue)
    if (sharedBalance) {
      const [spot, capacity] = await Promise.all([
        client.spotClearinghouseState(address), client.activeAssetData(address, order.coin),
      ])
      if (!Array.isArray(spot?.balances) || !validTradeCapacity(capacity, order.coin)) throw new Error('统一账户余额或可交易额度未确认，拒绝 live 下单')
      // Core perps use USDC collateral. Other eligible portfolio assets cannot
      // be valued as dollars here; this bound may reject a funded portfolio.
      accountValue = Number(spot.balances.find((balance) => balance.coin === 'USDC' && balance.token === 0)?.total ?? 0)
      const sideCapacity = Math.min(...capacity.maxTradeSzs.map(Number))
      if (!order.reduceOnly && order.sz > sideCapacity + 1e-10) throw new Error('订单数量超过交易所当前可交易额度')
    }
    const riskPrice = order.type === 'limit' ? Math.max(mid * 1.05, order.px) : mid * 1.05
    const checked = this.guard.validate({ ...order, price: riskPrice, positionSize, otherExposureUsd, accountValue, leverage })
    if (client !== this.client || network !== this.cfg.network) throw new Error('网络已切换，请重新预检交易')
    return { coin: order.coin, side: order.isBuy ? 'buy' : 'sell', mid, riskPrice, accountValue, accountMode, positionSize, otherExposureUsd, leverage, ...checked, network, address }
  }

  async executeToolOrder(request, exec, sessionId) {
    this.requireTradingSession(sessionId)
    return this.placeOrder({ ...request, [TOOL_CALL]: { exec, sessionId } })
  }

  requireTradingSession(sessionId) {
    if (!sessionId || !this.store.getSession(sessionId)) throw new Error('交易操作必须来自已登记的交易会话')
  }

  async authorizeToolAction(reason, exec) {
    if (!exec?.agent) throw new Error('live 签名仅允许从 DSH agent 工具调用')
    const outcome = await this.approvalGateway().request({ toolName: 'dsh-hyperliquid', callId: exec.callId, agent: exec.agent, signal: exec.signal, reason })
    if (outcome !== 'allowed-once') throw new Error(`用户未批准 live 操作（${outcome}）`)
  }

  /**
   * THE order path — every order (tool or UI) goes through here.
   * Wire contract (research §3.2/§4.4): orders carry SHORT keys
   * `{a, b, p, s, r, t}` where `a` is the universe index and px/sz are
   * decimal STRINGS with trailing zeros stripped; market orders are Ioc
   * limit orders at ±5% by default.
   * @returns paper: the fill; live: the exchange response
   */
  async placeOrder(request) {
    const coin = requireCoin(request)
    if (typeof request?.isBuy !== 'boolean') throw new Error('place 需要明确的 isBuy 布尔值')
    const isBuy = request.isBuy
    const sz = Number(request?.sz)
    if (!Number.isFinite(sz) || sz <= 0) throw new Error('下单数量 sz 必须为正数')
    const reduceOnly = Boolean(request?.reduceOnly)
    if (this.cfg.tradingMode === 'paper') {
      if (request?.takeProfitPx != null || request?.stopLossPx != null) throw new Error('paper 暂不模拟止盈止损触发单；请移除保护价格或切换 testnet live')
      const { universe } = await this.markets()
      if (!universe.some((row) => row.name === coin)) throw new Error(`当前仅支持核心永续合约模拟交易：${coin}`)
      const mid = await this.midOf(coin)
      const pos = this.store.paper.positions[coin]?.size ?? 0
      if (reduceOnly && (pos === 0 || Math.sign(isBuy ? sz : -sz) === Math.sign(pos) || sz > Math.abs(pos) + 1e-10)) throw new Error('只减仓订单会增加或翻转仓位')
      if (request?.type === 'limit') {
        const limit = Number(request?.px)
        if (!Number.isFinite(limit) || limit <= 0) throw new Error('限价单需要有效 px')
        if ((isBuy && limit < mid) || (!isBuy && limit > mid)) throw new Error('paper 当前只支持可立即成交的限价单')
      }
      const slip = Number(request?.slippagePct)
      const pct = Number.isFinite(slip) ? Math.min(Math.max(slip, 0), 10) / 100 : 0.0005
      const px = mid * (isBuy ? 1 + pct : 1 - pct)
      if (request?.type === 'limit' && (isBuy ? px > Number(request.px) : px < Number(request.px))) throw new Error('paper 模拟滑点后无法满足限价')
      const paper = this.store.paperAccount()
      const risk = paperRiskState(paper, { ...await safeMids(this), [coin]: px }, true)
      const positionSize = Number(paper.positions[coin]?.size ?? 0)
      const leverage = Number(paper.positions[coin]?.leverage ?? paper.leverageByCoin?.[coin] ?? 1)
      const otherExposureUsd = risk.positions.reduce((sum, p) => sum + (p.coin === coin ? 0 : Math.abs(p.size) * p.markPx), 0)
      const guard = this.paperGuard ??= new TradingGuard(this.cfg.dataDir, { ...this.cfg, dataDir: this.cfg.dataDir }, { budgetName: this.cfg.network === 'mainnet' ? 'paper-budget-mainnet.json' : 'paper-budget.json' })
      const checked = guard.validate({ coin, isBuy, sz, price: px, positionSize, otherExposureUsd, accountValue: risk.equity, leverage, reduceOnly })
      const currentMargin = Math.abs(positionSize) * px / leverage
      const projectedMargin = risk.marginUsed - currentMargin + Math.abs(checked.nextSize) * px / leverage
      if (!checked.riskReducing && projectedMargin > risk.equity + 1e-8) throw new Error('模拟账户可用保证金不足')
      const budgetTicket = guard.reserve(checked.notionalUsd, { riskReducing: checked.riskReducing })
      let fill
      try { fill = this.store.paperFill({ coin, isBuy, sz, px, reason: request?.reason ?? 'chat' }) }
      catch (err) { guard.release(budgetTicket); throw err }
      this.store.paperOrderRecord({ coin, isBuy, sz, px: request?.type === 'limit' ? Number(request.px) : px,
        filledPx: px, type: request?.type === 'limit' ? 'limit' : 'market', reduceOnly,
        reason: request?.reason ?? '' })
      return { mode: 'paper', fill, marginUsed: projectedMargin, availableMargin: Math.max(0, risk.equity - projectedMargin),
        simulation: '固定滑点；未模拟盘口深度、手续费、资金费或强平' }
    }
    // live
    const trusted = request?.[TOOL_CALL]
    if (!trusted?.exec?.agent) throw new Error('live 下单仅允许从 DSH agent 工具调用')
    const orderSpec = orderOf(request)
    const preview = this.guard.consume(request?.decisionId, orderSpec, trusted.sessionId)
    if (preview.network !== this.cfg.network) throw new Error('交易决策的网络与当前网络不一致，请重新预检')
    const fresh = await this.checkLiveOrder(orderSpec)
    if (Math.abs(fresh.mid / preview.mid - 1) > 0.01) throw new Error('价格已偏离预检超过 1%，请重新决策')
    if (!this.cfg.autonomousLive) {
      await this.authorizeToolAction(`Hyperliquid ${this.cfg.network} ${coin} ${isBuy ? '买入' : '卖出'} ${sz}，预估名义价值 ${fresh.notionalUsd.toFixed(2)} USD。是否允许本次交易？`, trusted.exec)
    }
    const { universe } = await this.markets()
    const idx = universe.findIndex((u) => u.name === coin)
    if (idx < 0) throw new Error(`未知合约 ${coin}`)
    const szDecimals = universe[idx].szDecimals
    const tif = request?.type === 'limit' ? (request?.tif === 'Alo' ? 'Alo' : 'Gtc') : 'Ioc'
    const mid = await this.midOf(coin)
    let pxNum
    if (request?.type === 'limit') {
      pxNum = Number(request?.px)
      if (!Number.isFinite(pxNum) || pxNum <= 0) throw new Error('限价单需要有效 px')
    } else {
      // Market = Ioc limit; docs/SDK use a 5% slippage collar.
      pxNum = mid * (isBuy ? 1.05 : 0.95)
    }
    // Exchange rule: minimum order notional is $10 (rejected otherwise).
    const notional = pxNum * sz
    if (!(notional >= 10)) {
      throw new Error(`订单名义价值 ${notional.toFixed(2)} USD 低于 Hyperliquid 最低 10 USD`)
    }
    const order = {
      a: idx,
      b: isBuy,
      p: wirePx(pxNum, szDecimals),
      s: wireSz(sz, szDecimals),
      r: reduceOnly,
      t: { limit: { tif } },
      c: '0x' + request.decisionId.replaceAll('-', ''),
    }
    const children = protectionOrders(orderSpec, idx, szDecimals, order.s)
    if (children.length) {
      const triggerOf = (kind) => {
        const child = children.find((row) => row.t.trigger.tpsl === kind)
        return child ? Number(child.t.trigger.triggerPx) : null
      }
      validateProtection({ ...orderSpec, px: orderSpec.type === 'limit' ? Number(order.p) : null,
        takeProfitPx: triggerOf('tp'), stopLossPx: triggerOf('sl') }, mid)
    }
    const action = { type: 'order', orders: [order, ...children], grouping: children.length ? 'normalTpsl' : 'na' }
    const budgetTicket = this.guard.reserve(fresh.notionalUsd, { riskReducing: fresh.riskReducing })
    this.store.recordLiveOrder(order.c, { status: 'submitting', coin, isBuy, sz, sessionId: trusted.sessionId,
      decisionId: request.decisionId, thesis: this.store.liveDecisions?.[request.decisionId]?.thesis ?? null,
      protection: { takeProfitPx: orderSpec.takeProfitPx, stopLossPx: orderSpec.stopLossPx }, at: Date.now() })
    let res
    try {
      res = await this.submitAction(action, trusted.exec)
    } catch (err) {
      this.store.recordLiveOrder(order.c, { status: 'unknown', error: String(err?.message ?? err) })
      throw new Error(`订单状态未确认；请先用 hyper_account action=orderStatus, oid=${order.c} 查询，勿直接重下。原因：${String(err?.message ?? err)}`)
    }
    try {
      assertExchangeAccepted(res)
      if (children.length && res?.response?.data?.statuses?.length !== action.orders.length) throw new Error('保护单回执不完整')
    } catch (err) {
      const parent = res?.response?.data?.statuses?.[0]
      if ((parent && !parent.error && (parent.resting || parent.filled)) || (children.length && res?.status === 'ok')) {
        this.store.recordLiveOrder(order.c, { status: 'protection-unknown', response: res })
        throw new Error(`主单可能已生效，但保护单未全部确认；请立即核对挂单、持仓和订单 ${order.c}，勿直接重下。原因：${String(err?.message ?? err)}`)
      }
      this.guard.release(budgetTicket)
      this.store.recordLiveOrder(order.c, { status: 'rejected', response: res })
      throw err
    }
    const parentFilledSz = Number(res?.response?.data?.statuses?.[0]?.filled?.totalSz)
    const protectionState = children.length
      ? parentFilledSz >= Number(order.s) - 1e-10 ? 'verify-active' : 'parent-not-fully-filled'
      : null
    this.store.recordLiveOrder(order.c, { status: 'accepted', protectionState, response: res })
    return { mode: 'live', cloid: order.c, protectionState, response: res }
  }

  async cancelOrder(request) {
    const coin = requireCoin(request)
    const oid = Number(request?.oid)
    if (!Number.isInteger(oid) || oid <= 0) throw new Error('cancelOrder 需要有效的 oid')
    if (this.cfg.tradingMode === 'paper') throw new Error('paper 模式没有挂单')
    const exec = request?.[TOOL_CALL]?.exec
    if (!exec?.agent) throw new Error('live 撤单仅允许从 DSH agent 工具调用')
    if (!this.cfg.autonomousLive || !this.cfg.allowedCoins.includes(coin)) await this.authorizeToolAction(`Hyperliquid ${this.cfg.network} 撤销 ${coin} 订单 oid=${oid}？`, exec)
    const { universe } = await this.markets()
    const idx = universe.findIndex((u) => u.name === coin)
    if (idx < 0) throw new Error(`未知合约 ${coin}`)
    const res = await this.submitAction({ type: 'cancel', cancels: [{ a: idx, o: oid }] }, exec)
    assertExchangeAccepted(res)
    this.store.recordEvent('live.cancel', { coin, oid })
    return { mode: 'live', response: res }
  }

  async setLeverage(request) {
    const coin = requireCoin(request)
    const leverage = Number(request?.leverage)
    if (!Number.isInteger(leverage) || leverage < 1 || leverage > 50) throw new Error('leverage 需要是 1-50 的整数')
    const { universe } = await this.markets()
    const idx = universe.findIndex((u) => u.name === coin)
    if (idx < 0) throw new Error(`未知合约 ${coin}`)
    if (leverage > Number(universe[idx].maxLeverage ?? 50)) throw new Error(`杠杆超过 ${coin} 市场上限 ${universe[idx].maxLeverage}x`)
    const isCross = request?.marginMode !== 'isolated'
    if (this.cfg.tradingMode === 'paper') {
      if (leverage > this.cfg.maxLeverage) throw new Error(`杠杆超过配置上限 ${this.cfg.maxLeverage}x`)
      if (!this.cfg.allowedCoins.includes(coin)) throw new Error(`${coin} 不在允许交易币对内`)
      const paper = this.store.paperAccount()
      if (paper.positions[coin]) {
        const risk = paperRiskState(paper, await safeMids(this), true)
        const pos = paper.positions[coin]
        const marked = risk.positions.find((row) => row.coin === coin)
        const currentMargin = Math.abs(pos.size) * marked.markPx / marked.leverage
        const projectedMargin = risk.marginUsed - currentMargin + Math.abs(pos.size) * marked.markPx / leverage
        if (projectedMargin > risk.equity + 1e-8) throw new Error('降低杠杆后模拟账户保证金不足')
      }
      this.store.paperSetLeverage(coin, leverage)
      return { mode: 'paper', ok: true }
    }
    if (leverage > this.cfg.maxLeverage) throw new Error(`杠杆超过配置上限 ${this.cfg.maxLeverage}x`)
    if (!this.cfg.allowedCoins.includes(coin)) throw new Error(`交易限额：${coin} 不在允许交易币对内（allowedCoins）`)
    const exec = request?.[TOOL_CALL]?.exec
    if (!exec?.agent) throw new Error('live 杠杆变更仅允许从 DSH agent 工具调用')
    if (!this.cfg.autonomousLive) await this.authorizeToolAction(`Hyperliquid ${this.cfg.network} 将 ${coin} 杠杆设为 ${leverage}x？`, exec)
    const res = await this.submitAction({ type: 'updateLeverage', asset: idx, isCross, leverage }, exec)
    assertExchangeAccepted(res)
    this.store.recordEvent('live.leverage', { coin, leverage, isCross })
    return { mode: 'live', response: res }
  }

  executeToolCancel(request, exec) {
    this.requireTradingSession(exec?.agent?.id ?? exec?.agent?.session?.id)
    return this.cancelOrder({ ...request, [TOOL_CALL]: { exec } })
  }
  executeToolLeverage(request, exec) {
    this.requireTradingSession(exec?.agent?.id ?? exec?.agent?.session?.id)
    return this.setLeverage({ ...request, [TOOL_CALL]: { exec } })
  }

  /** UI event ring replay (order placed, fills, session changes). */
  async eventsSince(request) {
    return this.store.eventsSince(Number(request?.seq) || 0)
  }

  /** Stop the WS loop on teardown. */
  stopWs() {
    clearInterval(this.sweepTimer)
    this.client.close()
  }
}

// ── helpers ────────────────────────────────────────────────────────────
function requireCoin(request) {
  const coin = canonicalMarketCoin(request?.coin)
  if (!coin) throw new Error('需要 coin（如 BTC / ETH）')
  return coin
}

const INTERVALS = ['1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '8h', '12h', '1d', '3d', '1w', '1M']

function requireInterval(value) {
  const interval = String(value)
  if (!INTERVALS.includes(interval)) throw new Error(`不支持的 K 线周期：${interval}`)
  return interval
}

function orderOf(request) {
  return {
    coin: requireCoin(request),
    isBuy: request?.isBuy,
    sz: Number(request?.sz),
    type: request?.type === 'limit' ? 'limit' : 'market',
    px: request?.type === 'limit' ? Number(request?.px) : null,
    tif: request?.tif === 'Alo' ? 'Alo' : 'Gtc',
    reduceOnly: request?.reduceOnly === true,
    takeProfitPx: request?.takeProfitPx == null ? null : Number(request.takeProfitPx),
    stopLossPx: request?.stopLossPx == null ? null : Number(request.stopLossPx),
  }
}

function validateProtection(order, mid) {
  const tp = order.takeProfitPx
  const sl = order.stopLossPx
  if (tp == null && sl == null) return
  if (order.reduceOnly) throw new Error('只减仓主单不能附加新的止盈止损保护单')
  const entry = order.type === 'limit' ? order.px : mid
  if (!Number.isFinite(entry) || entry <= 0) throw new Error('保护单需要有效的主单价格')
  const upper = Math.max(entry, mid)
  const lower = Math.min(entry, mid)
  if (tp != null && (!Number.isFinite(tp) || tp <= 0 || (order.isBuy ? tp <= upper : tp >= lower))) throw new Error('止盈价必须位于入场价与当前价的盈利方向之外')
  if (sl != null && (!Number.isFinite(sl) || sl <= 0 || (order.isBuy ? sl >= lower : sl <= upper))) throw new Error('止损价必须位于入场价与当前价的止损方向之外')
}

function protectionOrders(order, asset, szDecimals, size) {
  const children = []
  for (const [kind, trigger] of [['tp', order.takeProfitPx], ['sl', order.stopLossPx]]) {
    if (trigger == null) continue
    const triggerPx = wirePx(trigger, szDecimals)
    if (Number(triggerPx) <= 0) throw new Error(`${kind} 触发价精度无效`)
    children.push({
      a: asset, b: !order.isBuy, p: triggerPx, s: size, r: true,
      t: { trigger: { isMarket: true, triggerPx, tpsl: kind } },
    })
  }
  return children
}

function assertExchangeAccepted(response) {
  if (response?.status !== 'ok') throw new Error(`Hyperliquid 拒绝操作：${JSON.stringify(response).slice(0, 500)}`)
  const statuses = response?.response?.data?.statuses
  const rejected = Array.isArray(statuses) ? statuses.find((s) => s?.error) : null
  if (rejected) throw new Error(`Hyperliquid 拒单：${rejected.error}`)
}

/**
 * float_to_wire equivalent (SDK signing.py): format to 8 decimals, strip
 * trailing zeros, normalize -0 → 0. Prices are additionally capped to 5
 * significant figures with ≤ (6 − szDecimals) decimals for perps.
 */
function wireStr(value) {
  let s = Number(value).toFixed(8)
  if (s.includes('.')) s = s.replace(/0+$/, '').replace(/\.$/, '')
  if (s === '-0') s = '0'
  return s
}

function wirePx(pxNum, szDecimals) {
  const capped = Number(sigFigs(pxNum, 5, Math.max(0, 6 - szDecimals)))
  return wireStr(capped)
}

function wireSz(szNum, szDecimals) {
  return wireStr(Number(szNum.toFixed(szDecimals)))
}

function validTradeCapacity(value, coin) {
  return value?.coin === coin && ['availableToTrade', 'maxTradeSzs'].every((field) =>
    Array.isArray(value[field]) && value[field].length === 2 && value[field].every((part) => Number.isFinite(Number(part)) && Number(part) >= 0))
}

function expandHome(p) {
  if (p === '~') return homedir()
  if (p?.startsWith('~/')) return resolve(homedir(), p.slice(2))
  return resolve(p)
}

function defaultSpanMs(interval) {
  const spans = { '1m': 6 * 3600e3, '3m': 18 * 3600e3, '5m': 24 * 3600e3, '15m': 3 * 86400e3, '30m': 6 * 86400e3, '1h': 7 * 86400e3, '2h': 14 * 86400e3, '4h': 30 * 86400e3, '8h': 60 * 86400e3, '12h': 90 * 86400e3, '1d': 180 * 86400e3, '3d': 540 * 86400e3, '1w': 1095 * 86400e3, '1M': 5475 * 86400e3 }
  return spans[interval] ?? 7 * 86400e3
}

function argsOf(key) {
  const sep = key.indexOf(':')
  const head = sep < 0 ? key : key.slice(0, sep)
  const rest = sep < 0 ? '' : key.slice(sep + 1)
  if (head === 'allMids') return { type: 'allMids' }
  if (head === 'allDexsAssetCtxs') return { type: 'allDexsAssetCtxs' }
  if (head === 'allDexsClearinghouseState') return { type: 'allDexsClearinghouseState', user: rest }
  if (head === 'l2Book') return { type: 'l2Book', coin: rest }
  if (head === 'l2BookGrouped') {
    const parts = rest.match(/^(.+):([2345]):([025])$/)
    if (!parts) throw new Error(`invalid grouped book key: ${key}`)
    const nSigFigs = Number(parts[2]); const mantissa = Number(parts[3])
    return { type: 'l2Book', coin: decodeURIComponent(parts[1]), nSigFigs, ...(mantissa ? { mantissa } : {}) }
  }
  if (head === 'trades') return { type: 'trades', coin: rest }
  if (head === 'candle') {
    const last = rest.lastIndexOf(':')
    return { type: 'candle', coin: rest.slice(0, last), interval: rest.slice(last + 1) }
  }
  throw new Error(`unknown snapshot key: ${key}`)
}

async function safeMids(remote) {
  const cached = remote.client.snapshot(keys.allMids())
  if (cached?.data && Date.now() - cached.at < 5_000) return cached.data.mids ?? cached.data
  try {
    const res = await remote.client.allMids()
    return res?.mids ?? res ?? {}
  } catch {
    return {}
  }
}

/** Mark every paper position before computing equity and occupied margin. */
function paperRiskState(paper, mids, strict = false) {
  let uPnl = 0
  let marginUsed = 0
  let marksConfirmed = true
  const positions = Object.entries(paper.positions ?? {}).map(([coin, p]) => {
    const liveMark = Number(mids?.[coin])
    const validMark = Number.isFinite(liveMark) && liveMark > 0
    if (!validMark) {
      if (strict) throw new Error(`${coin} 实时价格未确认，拒绝模拟交易`)
      marksConfirmed = false
    }
    const markPx = validMark ? liveMark : Number(p.entryPx)
    const size = Number(p.size)
    const entryPx = Number(p.entryPx)
    const leverage = Number(p.leverage ?? paper.leverageByCoin?.[coin] ?? 1)
    if (!(Number.isFinite(markPx) && markPx > 0 && Number.isFinite(size) && Number.isFinite(entryPx) && entryPx > 0 &&
      Number.isFinite(leverage) && leverage >= 1)) throw new Error('模拟账户持仓数据无效')
    const positionPnl = (markPx - entryPx) * size
    uPnl += positionPnl
    marginUsed += Math.abs(size) * markPx / leverage
    return { coin, size, entryPx, markPx, uPnl: positionPnl, leverage }
  })
  const equity = Number(paper.usd) + uPnl
  if (!Number.isFinite(equity)) throw new Error('模拟账户权益无效')
  return { equity, uPnl, marginUsed, marksConfirmed, positions }
}

// Remote markers: every method the web client may call.
for (const m of [
  'status', 'switchNetwork', 'switchTradingMode', 'markets', 'marketCatalog', 'marketDetail', 'chartMarks', 'drawChartMark', 'eraseChartMark', 'sessionWorkspace', 'updateSessionWorkspace', 'snapshot', 'candles', 'fundingHistory', 'account', 'fills', 'tradeHistory', 'portfolio',
  'sessions', 'registerSession', 'removeSession', 'bindCoin', 'deskState',
  'eventsSince',
]) {
  markRemoteMethod(HyperRemote.prototype, m)
}
