---
name: hyperliquid-trading
description: 在 DSH 交易会话中分析 Hyperliquid 实时行情、账户与风险，并安全执行 testnet、paper 或已授权的 live 交易。
---

# Hyperliquid 交易会话

当用户讨论 Hyperliquid 行情、当前交易台、仓位、挂单、风险或交易决策时，加载本 skill。使用当前 DSH 会话的 `hyper_*` 工具获取事实；界面显示的币种只是会话焦点，不是可直接据此下单的最新报价。

## 建立上下文

1. 先调用 `hyper_context`，确认会话币种、周期、网络、paper/live 模式、实时价格、盘口、资金费、K 线、账户权益、仓位、挂单、数据时间和风险限额。用户明确指定其他币种时，传入 `coin`；需要改变会话焦点时再用 `hyper_session bind`。
2. 做深度分析时按需调用 `hyper_market overview/book/candles/indicators/trades`；管理订单时调用 `hyper_account state/orders/fills/orderStatus`。不得把截图、记忆价格或上一次回答当作实时数据。
3. 发现市场时用 `hyper_market action=catalog`，可按 `kind` 和官方 `category` 检索 HIP-3 的 Crypto、TradFi、Pre-IPO 标签。后续工具调用必须使用目录返回的 `name`，不要把展示名缩写为 API 参数；例如 XYZ100 的合约名是 `xyz:XYZ100`。目录中的 HIP-3、现货和 Outcome 仅支持行情，不能因为价格或分类可见就调用下单工具；分类缺失时不要凭名称自行归类。
4. 检查盘口和 mid 的观测时间、WS 状态、买卖价差、资金费、可用余额以及现有仓位。数据缺失、过期、盘口异常或账户不可读时，先说明限制并停止执行交易。
5. 读取 `accountMode` 与 `balanceSource`：Standard 的核心永续权益来自永续账户；Unified/Portfolio 的 USDC 余额来自现货账户状态，`tradeCapacity` 是交易所对当前核心永续币对返回的可交易额度。不要把旧的永续 `marginSummary` 当成 Unified/Portfolio 账户总权益，也不要把 USDC 余额称为整个 Portfolio 的估值。切换币对后重新读取额度。

## 技术指标与图表

1. 用 `hyper_market action=indicators` 读取对应币种和周期的 SMA20、EMA20/50、RSI14、MACD、布林带、ATR14、20 根量比以及最近摆动高低点推导的支撑/阻力。工具只用交易所 `T` 收盘时间已过去的 K 线计算，并返回 `excludedOpen`；图表上的实时末根 K 线仍可能形成中。先检查 `ready`、已收盘 K 线数量和 `observedAt`（最新收盘时间），并按周期判断数据是否过期；旧数据或少于 50 根已收盘 K 线不可作为入场依据。需要跨周期验证时分别查询当前周期与更高周期，不把两者混作同一信号。
2. 将趋势、动量、波动和量能分开判断：例如价格相对 EMA20/50、MACD 与 RSI 是否同向，价格是否接近支撑/阻力，量比是否支持突破，ATR 所示正常波动是否足以触及止损。指标相互矛盾、价格已经远离合理入场区、盘口过薄或止损所需风险超过限额时，选择观望。支撑/阻力是历史区间，不是保证成交或反弹的价格。
3. 给人解释图表时可用 `hyper_chart action=add` 画水平支撑/阻力线、两点趋势线，或用 points 画射线、平行通道、斐波那契回撤（第 1 点为波段起点）、矩形区间与价格区间测量、文本备注，或用 long/short 标出入场、止损与止盈（points 为 [入场, 止损, 止盈]）；波段结构可用 fibext（第 3 点为回撤点）、pitchfork、regression（按收盘价拟合 ±2σ）、gannfan / gannbox 表达，浪型与形态用 elliott（0-5）、elliottabc、xabcd、abcd、headshoulders 标出，关键位用 callout / pricelabel / icon 标注；已有画线用 `action=update` 按 id 调整，不必删除重画；用户要求盯某个价位或趋势线时，可对 level/hray/trend/ray/extended 设置 `alert=true`（穿越时提醒，触发一次），需要在同币种所有会话可见时设置 `shared=true`，标签写明依据和周期；画线前用实际 K 线核实价格与时间（趋势线使用 epoch 毫秒）。每条线只属于当前 DSH 交易会话、币种和周期，可用 `list/remove` 管理。图表标注不触发交易，也不替代 `hyper_decide` 的实时预检。需要平滑均线（SMMA/RMA）或任意周期的 SMA/EMA/WMA 时，用 `hyper_chart action=add kind=ma maType=smma period=…` 叠加到图上（可加 smoothingType/smoothingPeriod 二次平滑），用 `hyper_market action=indicators` 读取其最新已收盘值；不要再建议用户去外部图表工具。

## 策略研究框架

交易台的“策略框架”只用已收盘 K 线展示可核对的观察条件；它没有证明当前币种、周期或执行方式能够盈利。若用户询问策略，先确认其交易周期与风险预算，区分**理论依据、当下满足的条件、反证、执行成本**，再决定观望或继续分析。不得把单个指标称为买卖信号。尤其是布林带碰到上/下轨本身不是反转信号，轨外收盘也可能延续趋势（[Bollinger 原始规则](https://www.bollingerbands.com/bollinger-band-rules)）。

- **趋势跟随**：观察已收盘价相对 EMA20/50 的位置、均线斜率，并用更高周期确认方向。时间序列动量有跨传统期货资产的研究证据（[Moskowitz、Ooi、Pedersen，2012](https://doi.org/10.1016/j.jfineco.2011.11.003)），不能直接外推为 5 分钟加密永续合约的预期收益。说明回撤入场条件、趋势失效点和追价风险。
- **区间突破**：以前 20 根已收盘 K 线高低点和量比做候选条件；必须检查收盘是否站稳、盘口滑点与假突破。20 根和 1.5 倍量比只是产品默认观察参数，尚未在当前市场回测优化；不要把它们描述成已验证阈值。
- **波动带回归**：只在相对平缓的趋势中，观察前根收盘越轨、随后收回轨内以及 RSI 的配合；出现强单边趋势时优先观望。布林带的 20 根、2 倍标准差为常见默认参数，需按市场和任务重新验证。

任何框架都要结合 `hyper_market indicators` 的最新已收盘时间、ATR、成交量、盘口、资金费与账户暴露。波动升高时应审查仓位规模；波动管理的研究来自股票因子等资产，并不保证该合约收益（[Moreira、Muir，2017](https://www.nber.org/system/files/working_papers/w22208/w22208.pdf)）。若用历史 K 线比较方案，要计入手续费、滑点和资金费，并区分样本内、样本外与实际交易；模拟表现有显著局限（[CFTC 说明](https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/fraudadv_tradingsystem.html)）。

## 决策与执行

- 先陈述方向、入场条件、数量、杠杆、止损/退出条件、账户影响及不交易的条件。没有足够依据时明确选择观望；不要仅因用户问“能否买”就默认买入。
- paper 模式可在核对后用 `hyper_order place`，并传入 10–1000 字的 `reason` 记录本次下单依据；与 live 共用允许币对、单笔、每日、仓位、杠杆限额，并单独记录 paper 日额度和保证金占用。paper 只支持立即成交的限价单，不模拟静置挂单、撤单或止盈止损触发。撮合仍是固定滑点，不模拟盘口深度、手续费、资金费或强平；不要据此推断 live 收益。减仓在额度耗尽或权益不足时仍可退出。
- live 模式先用 `hyper_decide` 提交完整交易依据和订单参数，再在同一会话、30 秒内用返回的 `decisionId` 调用 `hyper_order place`。两次调用的方向、数量、价格、只减仓及止盈止损参数必须一致。决定放弃就不要调用执行工具。
- `hyper_order cancel` 先用 `hyper_account orders` 或 `orderStatus` 核对目标；`hyper_order leverage` 先核对市场与账户限制。自主执行是否放行由插件 `autonomousLive`、硬性限额和 dsh-web3 钱包策略共同决定；不能绕过拒绝或审批。
- live 止盈/止损与主单使用 `normalTpsl` 分组提交，目前仅在 testnet 开放。子单仅在父单完全成交，或部分成交后因保证金不足被撤时才会挂出；部分成交后手动撤销父单会连同子单撤销。IOC 等可能留下部分成交仓位却没有生效的保护单。提交后用 `hyper_account orderStatus`、`orders` 和 `state` 核对主单、保护单和仓位；回执部分成功、超时或未知时尤其要先对账，未确认保护前不要声称仓位已有止损。

## 回答格式

区分“计划”“已提交”“挂单中”“已成交”“已撤销”和“状态未知”。引用本次工具读到的价格、数据时间及账户状态；不要把签名成功当作成交。简明说明决策依据、主要风险和下一步。
