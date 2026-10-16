/** Trading limits are a durable desk override shared by paper and live guards. */
import * as React from 'react'
import { Button, Input, Modal } from '@deepseek-ai/dsh-client-ui-primitives'
import { hyperCall, tr } from '../remote'
import { fmt } from '../format'
import { notify, useStore } from '../store'
import { loadStatus } from '../data'

type Draft = { allowedCoins: string; maxOrderUsd: string; maxDailyUsd: string; maxPositionUsd: string; maxLeverage: string }
const EMPTY: Draft = { allowedCoins: '', maxOrderUsd: '', maxDailyUsd: '', maxPositionUsd: '', maxLeverage: '' }

function fromLimits(limits: any): Draft {
  return {
    allowedCoins: (limits?.allowedCoins ?? []).join(', '),
    maxOrderUsd: String(limits?.maxOrderUsd ?? ''),
    maxDailyUsd: String(limits?.maxDailyUsd ?? ''),
    maxPositionUsd: String(limits?.maxPositionUsd ?? ''),
    maxLeverage: String(limits?.maxLeverage ?? ''),
  }
}

export function TradingLimits({ open, onClose }: { open: boolean; onClose: () => void }) {
  const st = useStore().status
  const limits = st?.riskLimits
  const paper = st?.tradingMode === 'paper'
  const [draft, setDraft] = React.useState<Draft>(EMPTY)
  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState('')
  const [costs, setCosts] = React.useState({ feeBps: '4.5', slippageBps: '5' })
  React.useEffect(() => { if (open) setCosts({ feeBps: String(st?.paperCosts?.feeBps ?? 4.5), slippageBps: String(st?.paperCosts?.slippageBps ?? 5) }) }, [open])
  React.useEffect(() => {
    if (open && limits) { setDraft(fromLimits(limits)); setError('') }
  }, [open, Boolean(limits)])

  const change = (key: keyof Draft, value: string) => setDraft((current) => ({ ...current, [key]: value }))
  const save = async (event?: React.FormEvent) => {
    event?.preventDefault()
    setBusy(true)
    setError('')
    try {
      await hyperCall('updateRiskSettings', { limits: {
        allowedCoins: draft.allowedCoins,
        maxOrderUsd: Number(draft.maxOrderUsd),
        maxDailyUsd: Number(draft.maxDailyUsd),
        maxPositionUsd: Number(draft.maxPositionUsd),
        maxLeverage: Number(draft.maxLeverage),
      } })
      await loadStatus()
      notify(tr('交易限额已保存并立即生效', 'Trading limits saved and applied immediately'))
    } catch (cause) { setError(String((cause as Error)?.message ?? cause)) }
    finally { setBusy(false) }
  }
  const reset = async () => {
    setBusy(true)
    setError('')
    try {
      const result = await hyperCall('resetRiskSettings')
      setDraft(fromLimits(result.riskLimits))
      await loadStatus()
      notify(tr('已恢复插件配置中的交易限额', 'Restored trading limits from plugin configuration'))
    } catch (cause) { setError(String((cause as Error)?.message ?? cause)) }
    finally { setBusy(false) }
  }

  const field = (key: keyof Draft, label: string, props: React.InputHTMLAttributes<HTMLInputElement>, wide = false) =>
    <label className={wide ? 'dhl-risk-wide' : undefined}><span>{label}</span>
      <Input className="dhl-risk-input" value={draft[key]} onChange={(event) => change(key, event.target.value)} required {...props} /></label>
  const footer = limits ? <>
    {st?.riskSettingsSource === 'desk' ? <Button variant="outline" disabled={busy} onClick={() => void reset()}>{tr('恢复插件配置', 'Restore plugin config')}</Button> : null}
    <Button variant="primary" type="submit" form="dhl-risk-form" disabled={busy}>{busy ? tr('保存中…', 'Saving…') : tr('保存', 'Save')}</Button>
  </> : null

  return <Modal open={open} onClose={onClose} title={tr('交易限额与签名规则', 'Trading limits & signing rules')} closeLabel={tr('关闭', 'Close')} className="dhl-limits-modal" footer={footer}>
    <section className="dhl-limits-section">
      <h3>{tr('交易限额', 'Trading limits')}<span className="dhl-limits-ledger">{paper ? tr('模拟盘账本', 'Paper ledger') : tr('实盘账本', 'Live ledger')}</span></h3>
      {limits ? <form id="dhl-risk-form" className="dhl-risk-form" onSubmit={(event) => void save(event)}>
        {field('allowedCoins', tr('允许开仓币对', 'Coins allowed to open'), { placeholder: 'BTC, ETH', maxLength: 1000 }, true)}
        {field('maxOrderUsd', tr('单笔名义价值上限 · USD', 'Max per order · USD'), { type: 'number', min: '0.01', step: 'any' })}
        {field('maxDailyUsd', tr('每日开仓额度 · USD', 'Daily opening budget · USD'), { type: 'number', min: '0.01', step: 'any' })}
        {field('maxPositionUsd', tr('单币仓位上限 · USD', 'Max position per coin · USD'), { type: 'number', min: '0.01', step: 'any' })}
        {field('maxLeverage', tr('最大杠杆 · 倍', 'Max leverage · x'), { type: 'number', min: '1', max: '50', step: '1' })}
        <p className="dhl-risk-budget">{tr('今日已用额度（UTC）', 'Used today (UTC)')}：{fmt(limits.usedTodayUsd ?? 0)} / {fmt(limits.maxDailyUsd)} USD</p>
        {error ? <p className="dhl-risk-error" role="alert">{error}</p> : null}
      </form> : <div className="dhl-empty">{tr('正在读取…', 'Loading…')}</div>}
      <p className="dhl-limits-note">{tr('保存后立即作用于模拟盘和实盘，重启后继续生效。两种模式的每日额度分开记账；减仓和平仓不受开仓限额阻止。',
        'Changes apply immediately to paper and live trading and survive restart. Each mode has its own daily budget; reducing and closing remain available.')}</p>
    </section>
    <section className="dhl-limits-section">
      <h3>{tr('模拟成交成本', 'Paper execution costs')}</h3>
      <div className="dhl-risk-form">{(['feeBps', 'slippageBps'] as const).map((key) => <label key={key}><span>{key === 'feeBps' ? tr('手续费 · bps', 'Fee · bps') : tr('不利滑点 · bps', 'Adverse slippage · bps')}</span><Input type="number" aria-label={key === 'feeBps' ? tr('模拟手续费 bps', 'Paper fee bps') : tr('模拟滑点 bps', 'Paper slippage bps')} min="0" max="100" step="any" value={costs[key]} onChange={(e) => setCosts((old) => ({ ...old, [key]: e.target.value }))} /></label>)}</div>
      <p className="dhl-limits-note">{tr('1 bps = 0.01%。这是模拟假设，不是实盘费率。仅作用于之后的模拟成交，旧记录保留原值；不模拟盘口深度、资金费和强平。', '1 bps = 0.01%. Simulation assumptions, not exchange fee tiers. Future paper fills only; historical assumptions are preserved. No depth, funding or liquidation simulation.')}</p>
      <Button variant="outline" disabled={busy} onClick={() => { setBusy(true); setError(''); void hyperCall('updatePaperCosts', { costs: { feeBps: costs.feeBps.trim() ? Number(costs.feeBps) : NaN, slippageBps: costs.slippageBps.trim() ? Number(costs.slippageBps) : NaN } }).then(() => loadStatus()).then(() => notify(tr('模拟成本已保存', 'Paper costs saved'))).catch((cause) => setError(String(cause.message))).finally(() => setBusy(false)) }}>{tr('保存模拟成本', 'Save paper costs')}</Button>
    </section>
    <section className="dhl-limits-section">
      <h3>{tr('钱包签名', 'Wallet signing')}</h3>
      <p className="dhl-limits-note">{paper
        ? tr('模拟盘在本地撮合，不签名，也不经过钱包规则。', 'Paper orders fill locally and do not use wallet signing.')
        : st?.signer === 'web3'
          ? tr('实盘订单通过限额检查后，由 dsh-web3 钱包按其签名策略处理。签名策略在 DSH 设置 → Web3 钱包中管理。',
            'After the limits check, live orders use the dsh-web3 wallet signing policy. Manage it in DSH Settings → Web3 wallet.')
          : tr('实盘使用插件配置中的私钥签名。私钥与签名方式仍在 DSH 插件配置中管理。',
            'Live orders use the private key from plugin configuration. Manage the key and signing method in DSH plugin settings.')}</p>
      {!paper && !st?.autonomousLive ? <p className="dhl-limits-note">{tr('agent 每笔实盘下单或改杠杆前仍需 DSH 审批。', 'Each agent live order or leverage change still requires DSH approval.')}</p> : null}
    </section>
  </Modal>
}
