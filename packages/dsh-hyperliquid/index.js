/**
 * dsh-hyperliquid — host half.
 *
 * Publishes the `hyper` Remote namespace (Typert, dsh-bots-anchored), registers
 * the hyper_* agent tools, and contributes a short system-prompt section so
 * agents in any session know the trading desk exists and how to drive it.
 * The client half (client.js) renders the peer-level trading platform.
 *
 * @module dsh-hyperliquid
 */

import { HyperRemote } from './lib/remote.js'
import { buildToolDefinitions } from './lib/tools.js'
import { registerHyperSkill } from './lib/skill.js'

export const name = 'dsh-hyperliquid'

/** Optional services only: without `tools` the desk still serves the UI. */
export const inject = []

let z = null
try {
  // Prefer the HOST's schemastery copy (same implementation the loader
  // validates with) resolved through the dsh-bin anchor; fall back to the
  // bundled copy. require(esm) — Node ≥ 22.12.
  const { createRequire } = await import('node:module')
  const { realpathSync } = await import('node:fs')
  try {
    const anchor = realpathSync(process.argv?.[1] ?? '')
    z = createRequire(anchor)('@deepseek-ai/schemastery')
    if (!z || typeof z.object !== 'function') z = null
  } catch { /* anchor unavailable → bundled copy */ }
  if (!z) z = (await import('@deepseek-ai/schemastery')).default
} catch (err) {
  throw new Error(`[dsh-hyperliquid] schemastery 加载失败：${String(err?.message ?? err)}`)
}

export const Config = z.object({
  dataDir: z.string().description('插件数据目录（交易会话登记表与 paper 账户落盘处）').default('~/.dsh-hyperliquid'),
  network: z.union([z.const('mainnet'), z.const('testnet')]).description('Hyperliquid 网络，默认 mainnet；testnet 可在交易台「更多」中切换').default('mainnet'),
  tradingMode: z.union([z.const('paper'), z.const('live')]).description('交易模式：live 真实签名下单（默认），paper 本地撮合；可在交易台「更多」中切换').default('live'),
  privateKey: z.string().description('Hyperliquid 钱包私钥（signer=local 时使用；建议用 agent wallet 派生密钥；留空则 live 不可用）。也可用环境变量 HYPERLIQUID_PRIVATE_KEY').default(''),
  signer: z.union([z.const('local'), z.const('web3')]).description('签名方式：local 插件内私钥签名；web3 交给 dsh-web3 钱包保险库签名（私钥不出保险库，逐笔过签名策略与审批）').default('local'),
  web3Account: z.string().description('signer=web3 时使用的 dsh-web3 账户 id 或名称').default('main'),
  tradingAddress: z.string().description('Hyperliquid 主账户地址；使用 dsh-web3 API wallet 签名时必填，账户查询必须用主账户地址').default(''),
  autonomousLive: z.boolean().description('允许 agent 在硬性限额内自主提交 live 订单；默认关闭，且仅支持 dsh-web3 签名').default(false),
  allowedCoins: z.string().description('交易限额（paper/live 均生效）：允许新开仓的币对，逗号分隔；减仓不受限').default('BTC,ETH'),
  maxOrderUsd: z.number().description('交易限额（paper/live 均生效）：单笔名义价值上限 USD').default(100),
  maxDailyUsd: z.number().description('交易限额（paper/live 均生效）：每 UTC 日累计开仓名义价值上限 USD，paper 与 live 分账').default(500),
  maxPositionUsd: z.number().description('交易限额（paper/live 均生效）：每币最大仓位名义价值 USD').default(500),
  maxLeverage: z.number().description('交易限额（paper/live 均生效）：最大杠杆倍数').default(2),
}).description('Hyperliquid 交易台配置')

/**
 * @param ctx - the Cordis plugin context.
 * @param config - validated row config.
 */
export function apply(ctx, config = {}) {
  const remote = new HyperRemote(ctx, config)
  const disposers = []

  // Live channel lifecycle: stop the upstream WS on teardown.
  ctx.effect(() => () => remote.stopWs())

  // Agent tools (optional service — degrade gracefully).
  const tools = typeof ctx?.get === 'function' ? ctx.get('tools') : undefined
  if (tools && typeof tools.register === 'function') {
    for (const def of buildToolDefinitions(remote)) {
      const remove = tools.register(def)
      disposers.push(remove)
      ctx.effect(() => () => { try { remove() } catch { /* already gone */ } })
    }
  } else {
    ctx.logger?.warn?.('[dsh-hyperliquid] tools 服务不可用，仅提供 UI 远端')
  }

  const skillRemove = registerHyperSkill(typeof ctx?.get === 'function' ? ctx.get('skills') : null)
  if (skillRemove) {
    disposers.push(skillRemove)
    ctx.effect(() => () => { try { skillRemove() } catch { /* already gone */ } })
  }

  // System-prompt section: make the desk discoverable to every agent, with
  // LIVE desk context (what the user is looking at right now) evaluated per
  // prompt — the desk and the conversation stay in lockstep both ways.
  const systemPrompt = typeof ctx?.get === 'function' ? ctx.get('systemPrompt') : undefined
  if (systemPrompt && typeof systemPrompt.section === 'function') {
    const remove = systemPrompt.section({
      name: 'hyperliquid-desk',
      order: 500,
      text: () => {
        const mode = remote.cfg.tradingMode
        const net = remote.cfg.network
        const lines = [
          '## Hyperliquid 交易台（dsh-hyperliquid）',
          `本 Harness 装有 Hyperliquid 交易台（mode=${mode}，network=${net}）。用户可在面板看行情并填写交易票据；票据只把意图送入当前会话，所有实际下单只能由你调用工具完成。`,
          '可用工具只有这 7 个，没有其它 hyper_* 工具：hyper_context（会话交易上下文）、hyper_market（行情：action=overview/catalog/book 盘口/candles/indicators/trades）、hyper_chart（画线 41 种、kind=ma 均线、action=view 切周期与 RSI/MACD 等副图指标）、hyper_account（账户）、hyper_decide（交易决策预检并返回一次性 decisionId）、hyper_order（执行/撤单/杠杆）、hyper_session（会话视角与绑定币对）。',
          '均线用 hyper_chart add kind=ma、RSI/MACD 等用 hyper_chart action=view show=[...]，图表会实时计算；不要自己计算均线再用多段趋势线拼折线。工具返回错误时换正确参数重试一次，仍失败就直接告诉用户，不要反复推演。',
          '用户说"当前/界面上这个币"时，先 hyper_context 或 hyper_session status；需要技术判断时用 hyper_market indicators 验证趋势、动量、波动和支撑阻力，可用 hyper_chart 将依据画给用户看。交易前核对行情与账户，说明方向、数量、依据及风险。paper 模式用 hyper_order 执行；live 模式先用 hyper_decide 预检，并用返回的一次性 decisionId 执行 hyper_order。是否可自主执行由宿主配置和钱包策略决定。',
        ]
        if (skillRemove) lines.push('复杂的 Hyperliquid 分析、交易或异常对账，请先加载 hyperliquid-trading skill。')
        // Live desk focus: what coin/interval the desk shows right now.
        try {
          const desk = remote.desk ?? {}
          if (desk.coin) lines.push(`当前交易台焦点：${desk.coin} · K线 ${desk.interval ?? '15m'}。用户消息里说"这个币/当前价格/图上"时指的就是它。`)
        } catch { /* desk context is best-effort */ }
        return lines.join('\n')
      },
    })
    disposers.push(remove)
  }

  return () => {
    for (const d of disposers) {
      try { d() } catch { /* best effort */ }
    }
    remote.stopWs()
  }
}
