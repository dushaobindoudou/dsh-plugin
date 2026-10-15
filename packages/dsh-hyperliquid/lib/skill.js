/** Register the packaged trading skill in DSH's native skill catalog. */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const skillUrl = new URL('../skills/hyperliquid-trading/SKILL.md', import.meta.url)
const source = readFileSync(skillUrl, 'utf8')
const content = source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').trim()

export function registerHyperSkill(skills) {
  if (typeof skills?.register !== 'function') return null
  return skills.register({
    name: 'hyperliquid-trading',
    description: '分析 Hyperliquid 实时行情、账户和风险，并在 DSH 交易会话中安全决策、下单、撤单和对账。',
    whenToUse: '讨论当前交易台、Hyperliquid 市场、持仓、订单、paper 或 testnet/live 交易时使用。',
    source: 'bundled',
    path: fileURLToPath(skillUrl),
    content,
  })
}
