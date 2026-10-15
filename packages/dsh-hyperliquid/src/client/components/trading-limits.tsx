/**
 * Two independent rule sets gate an order, and the desk shows them apart:
 *   1. trading limits — this plugin's config, checked for paper AND live;
 *   2. wallet signing — dsh-web3's own policy, consulted only when a live
 *      order is signed through the vault (signer=web3).
 * @module src/client/components/trading-limits
 */
import * as React from 'react'
import { Modal } from '@deepseek-ai/dsh-client-ui-primitives'
import { tr } from '../remote'
import { fmt } from '../format'
import { useStore } from '../store'

export function TradingLimits({ open, onClose }: { open: boolean; onClose: () => void }) {
  const st = useStore().status
  const limits = st?.riskLimits
  const paper = st?.tradingMode === 'paper'
  const used = Number(limits?.usedTodayUsd ?? 0)
  const daily = Number(limits?.maxDailyUsd ?? 0)
  const rows: Array<[string, string]> = limits ? [
    [tr('允许开仓币对', 'Coins allowed to open'), (limits.allowedCoins ?? []).join(', ') || '—'],
    [tr('单笔名义价值上限', 'Max per order'), `${fmt(limits.maxOrderUsd)} USD`],
    [tr('今日开仓额度（UTC）', 'Daily opening budget (UTC)'), `${fmt(used)} / ${fmt(daily)} USD`],
    [tr('单币仓位上限', 'Max position per coin'), `${fmt(limits.maxPositionUsd)} USD`],
    [tr('杠杆上限', 'Max leverage'), `${fmt(limits.maxLeverage, 0)}x`],
  ] : []
  return <Modal open={open} onClose={onClose} title={tr('交易限额与签名规则', 'Trading limits & signing rules')} closeLabel={tr('关闭', 'Close')} className="dhl-limits-modal">
    <section className="dhl-limits-section">
      <h3>{tr('交易限额 · 交易台', 'Trading limits · desk')}<span className="dhl-badge">{paper ? tr('模拟盘账本', 'Paper ledger') : tr('实盘账本', 'Live ledger')}</span></h3>
      {rows.length ? <div className="dhl-wallet-stats">{rows.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
        : <div className="dhl-empty">{tr('正在读取…', 'Loading…')}</div>}
      <p className="dhl-ticket-note">{tr(
        '由 dsh-hyperliquid 插件配置决定，模拟盘和实盘都会检查，每日额度两边分开记账；减仓与平仓不受限。agent 自主下单与你填写的票据都受同一套限额约束。修改方式：DSH 设置中的 hyperliquid 插件配置，或 profile 的 cordis.patch.yml 里 id: hyperliquid 下的 allowedCoins / maxOrderUsd / maxDailyUsd / maxPositionUsd / maxLeverage，重启后生效。',
        'Set by the dsh-hyperliquid plugin config and checked in both paper and live, with separate daily budgets; reducing or closing is never blocked. Agent orders and your tickets share these limits. Change them in the hyperliquid plugin config in DSH Settings, or allowedCoins / maxOrderUsd / maxDailyUsd / maxPositionUsd / maxLeverage under id: hyperliquid in the profile cordis.patch.yml; restart to apply.')}</p>
    </section>
    <section className="dhl-limits-section">
      <h3>{tr('钱包签名 · 与交易限额无关', 'Wallet signing · separate from limits')}</h3>
      <p className="dhl-ticket-note">{paper
        ? tr('模拟盘在本地撮合，不签名，也不经过任何钱包规则。', 'Paper orders fill locally; nothing is signed and no wallet rules apply.')
        : st?.signer === 'web3'
          ? tr('实盘订单通过限额检查后，还要交给 dsh-web3 钱包签名。钱包按自己的签名策略决定这次签名是自动通过、需要你确认还是拒绝；它不知道也不检查上面的交易限额。签名策略在 DSH 设置 → Web3 钱包中管理。',
            'After passing the limits above, a live order is signed by the dsh-web3 wallet. Its signing policy decides whether that signature is automatic, needs your approval or is refused; it neither knows nor checks the trading limits. Manage it in DSH Settings → Web3 wallet.')
          : tr('实盘使用插件配置中的私钥直接签名，没有额外的钱包审批；只有上面的交易限额在把关。', 'Live orders are signed with the configured private key; there is no separate wallet approval, only the trading limits above.')}</p>
      {!paper && !st?.autonomousLive ? <p className="dhl-ticket-note">{tr('autonomousLive 关闭：agent 每笔实盘下单、改杠杆前都会弹出 DSH 审批，需要你批准。', 'autonomousLive is off: every live order or leverage change by the agent waits for your DSH approval.')}</p> : null}
    </section>
  </Modal>
}
