# dsh-hyperliquid

[![npm](https://img.shields.io/npm/v/dsh-hyperliquid.svg)](https://www.npmjs.com/package/dsh-hyperliquid)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#license)

Hyperliquid 交易台，运行在 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)（`dsh`）中。它是一个与 bots 平级的主面板应用：

- **左栏 · 交易会话**：每个会话都是一次真实的 DSH 会话，各自记住币种、周期、指标、画线和布局。
- **中栏 · 行情工作台**：合约统计、K 线（TradingView Lightweight Charts）、资金费历史、盘口与成交、持仓 / 挂单 / 历史委托。
- **右栏 · 原生会话**：直接嵌入 DSH 原生对话。行情分析、风险检查和下单都由 agent 通过 `hyper_*` 工具完成；交易票据只把结构化的交易意图送进会话。

> ⚠️ **默认连接 Hyperliquid 主网并以实盘模式运行，交易使用真实资金。** 首次使用请先在「⋯ 更多」中切到测试网或模拟盘熟悉流程，并确认下文的交易限额。

## 要求

- DSH **0.2 或更新版本**（嵌入原生会话需要会话引用与 Conversation Factory 接口）
- Node.js 22.12+（DSH 宿主运行环境）
- 实盘交易需要配置签名钱包：推荐 [dsh-web3](https://www.npmjs.com/package/dsh-web3) 保险库，或插件内私钥

## 安装

```bash
dsh plugin --profile web add dsh-hyperliquid
```

本包是一个 dsh bundle（`dsh.bundle.patch` + `dsh.client`），安装后在侧边栏打开「Hyperliquid 交易台」。修改插件配置后需要重启 DSH 宿主。

## 快速上手：配置实盘钱包

推荐使用 dsh-web3 签名：私钥只保存在本机加密保险库中，每次签名都经过钱包的签名策略与审批。

```bash
dsh plugin --profile web add dsh-web3
```

在 DSH 设置 → Web3 钱包中创建或导入账户，然后在 profile 的 `cordis.patch.yml` 中配置本插件：

```yaml
- id: hyperliquid
  config:
    network: mainnet          # 或 testnet
    tradingMode: live         # 或 paper
    signer: web3
    web3Account: hyper-agent  # dsh-web3 账户 id 或名称
    tradingAddress: '0x你的 Hyperliquid 主账户地址'
    allowedCoins: BTC,ETH
    maxOrderUsd: 100
    maxDailyUsd: 500
    maxPositionUsd: 500
    maxLeverage: 2
```

建议为交易台单独创建 Hyperliquid **API wallet**（agent wallet）用于签名，并把资金主账户填进 `tradingAddress`；持仓与挂单都按主账户查询。

## 使用

- **网络与账户**：顶栏「⋯ 更多」可切换主网 / 测试网、实盘 / 模拟盘，以及盘口 / 成交的位置（自适应或始终在图表下方）。处于测试网或模拟盘时顶栏会显示徽标；切到主网实盘前需要确认。实盘与模拟账户分开显示，切换只在当前宿主进程内生效，重启后恢复插件配置。
- **钱包与收益**：点击顶栏钱包查看地址、余额、权益和收益。实盘收益曲线来自 Hyperliquid 官方 portfolio 数据；模拟盘显示本地已实现与未实现收益。
- **K 线**：支持交易所官方的 14 个周期，以及成交量、SMA20、MA60、EMA20/50、布林带、RSI、MACD。向左拖动会自动加载更早的 K 线，最多可追溯到交易所提供的最近 5000 根。可以画水平线、趋势线，画线按会话、币种和周期保存。点击任意 K 线、成交量柱或指标线，会把该点的数据引用到聊天草稿中。
- **市场选择**：点击合约名或按 `/` 打开市场选择器，支持搜索、分类、排序和自选。现货、HIP-3 与 Outcome 市场目前只读，交易只支持核心永续合约。
- **布局**：三栏都可以收起，分隔条可以拖拽调宽，双击恢复默认宽度。
- **后台恢复**：页面切到后台会暂停轮询，宿主会释放闲置的行情订阅，但与 Hyperliquid 的连接保持不断。切回前台后会自动重新订阅并补齐数据，期间顶栏显示「同步中」。

## 交易限额与钱包签名

订单要经过两套**相互独立**的规则。当前值与今日用量可在「⋯ 更多 → 交易限额与签名规则」查看。

**1. 交易限额（本插件配置）**：模拟盘和实盘都检查，两边的每日额度分开记账；减仓与平仓不受限制。

| 字段 | 默认 | 说明 |
|---|---|---|
| `allowedCoins` | `BTC,ETH` | 允许新开仓的永续币对，逗号分隔 |
| `maxOrderUsd` | `100` | 单笔名义价值上限（USD） |
| `maxDailyUsd` | `500` | 每 UTC 日累计开仓名义价值上限（USD） |
| `maxPositionUsd` | `500` | 每个币的最大仓位名义价值（USD） |
| `maxLeverage` | `2` | 最大杠杆倍数 |

**2. 钱包签名（dsh-web3，仅 `signer: web3` 的实盘订单）**：钱包按自己的签名策略决定一次签名是自动通过、需要审批还是拒绝。它不检查上面的交易限额；签名策略在 DSH 设置 → Web3 钱包中管理。

另外，`autonomousLive: false`（默认）时，agent 的每笔实盘下单、撤单和杠杆变更都会弹出 DSH 审批。

## 全部配置项

| 字段 | 默认 | 说明 |
|---|---|---|
| `dataDir` | `~/.dsh-hyperliquid` | 会话登记表、会话工作台、模拟账本与审计记录的存储目录 |
| `network` | `mainnet` | `mainnet` / `testnet` |
| `tradingMode` | `live` | `live` 真实签名下单；`paper` 本地模拟撮合 |
| `signer` | `local` | `local` 使用插件内私钥签名；`web3` 交给 dsh-web3 保险库签名 |
| `privateKey` | — | `signer: local` 时使用的私钥，也可以用环境变量 `HYPERLIQUID_PRIVATE_KEY` 提供。请使用 API wallet 密钥，不要使用主钱包私钥 |
| `web3Account` | `main` | `signer: web3` 时使用的 dsh-web3 账户 id 或名称 |
| `tradingAddress` | — | Hyperliquid 资金主账户地址；使用 API wallet 签名时必填 |
| `autonomousLive` | `false` | 允许 agent 在交易限额内自主执行实盘操作，仅支持 `signer: web3` |
| `allowedCoins` … `maxLeverage` | 见上表 | 交易限额 |

## Agent 工具

| 工具 | 说明 |
|---|---|
| `hyper_context` | 一次读取当前会话的币对、盘口、K 线、账户权益、仓位与风险限额 |
| `hyper_market` | 行情：overview / book / candles / trades / catalog / indicators（SMA、EMA、RSI、MACD、布林带、ATR、支撑阻力） |
| `hyper_chart` | 在会话图表上添加或删除水平线、趋势线 |
| `hyper_account` | 账户：state / orders / fills / orderStatus（支持 oid、cloid） |
| `hyper_decide` | 实盘预检：提交交易意图与依据，返回 30 秒内有效的一次性 `decisionId` |
| `hyper_order` | place / cancel / leverage；实盘下单必须带匹配的 `decisionId`，可附带止盈止损（目前仅测试网） |
| `hyper_session` | status / bind，同步用户当前查看的币对 |

插件还会向 DSH 注册随包提供的 [`hyperliquid-trading` skill](skills/hyperliquid-trading/SKILL.md)，指导 agent 先核对数据新鲜度、账户与风险，再区分分析和执行，回执异常时先对账。

## 安全设计

- 实盘下单分两步：先用 `hyper_decide` 预检，再用 `hyper_order` 执行。执行时宿主会重新读取行情和账户；价格偏离预检超过 1% 时拒绝下单。
- 每笔实盘订单都带 128 位 `cloid` 并写入本地审计。网络超时后，额度会保守保留，需要先按 `cloid` 核对交易所状态。
- 网络或交易模式切换时，会清空所有行情缓存和未消费的预检决策；有交易正在执行时拒绝切换。
- 行情或宿主数据过期时，交易票据暂停提交。
- 签名实现按官方 Python SDK `signing.py` 逐字节复刻，并用官方测试向量验证；local 和 web3 两条签名路径的结果一致。

## 已知限制

- 模拟盘使用固定滑点，不模拟盘口深度、手续费、资金费和强平，模拟收益不能直接代表实盘收益。模拟盘也不支持止盈止损触发单。
- 带止盈止损的分组订单（`normalTpsl`）目前只在测试网开放。保护单在主单完全成交后才会挂出；执行后请核对真实持仓与保护挂单。
- Portfolio Margin 账户中的非 USDC 资产不计入风控权益，因此可能被保守拒单。

## 开发

```bash
npm install
npm run build      # src/client → client.js（构建产物，请勿手改）
npm run typecheck
npm test
```

- 源码结构：`index.js` 与 `lib/*.js` 是宿主端代码，纯 ESM，无需构建；`src/client/` 是客户端（React + TSX），由 esbuild 打包成 `client.js`。
- 架构说明见 [docs/architecture.md](docs/architecture.md)。
- 修改宿主端代码后需要重启 DSH 宿主；`npm run build` 只更新客户端。

## License

MIT。第三方组件声明见 [NOTICE](NOTICE)。
