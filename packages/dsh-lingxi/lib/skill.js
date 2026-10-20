import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const path = new URL('../skills/lingxi-dsh/SKILL.md', import.meta.url)
const content = readFileSync(path, 'utf8').replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').trim()

export function registerLingxiSkill(skills) {
  if (typeof skills?.register !== 'function') return null
  return skills.register({
    name: 'lingxi-dsh',
    description: '灵犀桌面猫的 DSH 接入、安装引导、任务报告与克制的自动特效。',
    whenToUse: '使用灵犀、桌面猫、任务通知、轻抚、特效或排查桥接连接时使用。',
    source: 'bundled', path: fileURLToPath(path), content,
  })
}
