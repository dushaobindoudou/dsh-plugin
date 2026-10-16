/** Object tree for the chart's drawings: select / focus, show-hide, lock and delete each one. */
import * as React from 'react'
import { tr } from '../remote'
import type { ChartMark } from '../types'
import { ToolIcon, toolOf } from '../drawing-tools'
import { UiIcon } from './panel-icons'

const OPEN_KEY = 'dsh-hyperliquid.draw.listOpen'

export const DrawingList = React.memo(function DrawingList({ marks, locked, onSelect, onEdit, onRemove, language }: {
  language: string
  marks: ChartMark[]; locked: boolean; onSelect: (id: string) => void; onEdit: (id: string, patch: Record<string, unknown>) => void; onRemove: (id: string) => void
}) {
  const [open, setOpen] = React.useState(() => { try { return localStorage.getItem(OPEN_KEY) !== '0' } catch { return true } })
  const toggle = () => setOpen((value) => { try { localStorage.setItem(OPEN_KEY, value ? '0' : '1') } catch { /* storage unavailable */ } return !value })
  const hidden = marks.filter((mark) => mark.hidden).length
  return (
    <section className="dhl-drawing-list" lang={language} aria-label={tr('画线列表', 'Drawings')}>
      <button type="button" className="dhl-drawing-list-head" aria-expanded={open} onClick={toggle}>
        <span>{tr('画线', 'Drawings')} {marks.length}{hidden ? tr(` · 隐藏 ${hidden}`, ` · ${hidden} hidden`) : ''}</span>
        <UiIcon name={open ? 'chevronDown' : 'chevronRight'} size={14} />
      </button>
      {open ? <ul>
        {marks.map((mark) => {
          const tool = toolOf(mark.kind)
          return <li key={mark.id} className={mark.hidden ? 'is-hidden' : ''}>
            <button type="button" className="dhl-drawing-list-name" title={tr('在图上定位并选中', 'Find and select on the chart')} onClick={() => onSelect(mark.id)} disabled={mark.hidden}>
              <span style={{ color: mark.color }}><ToolIcon kind={mark.kind} size={14} /></span>
              <b>{mark.label}</b>
              <small>{mark.alert ? <span className="dhl-list-flag" title={tr('价格提醒已开启', 'Price alert armed')}><UiIcon name="bell" size={12} /></span> : null}{mark.shared ? <span className="dhl-list-flag" title={tr('已同步到所有会话', 'Synced to all sessions')}><UiIcon name="sync" size={12} /></span> : null}{tr(tool.zh, tool.en)} · {mark.interval}{mark.source === 'agent' ? ' · agent' : ''}</small>
            </button>
            <button type="button" aria-pressed={!mark.hidden} title={mark.hidden ? tr('显示', 'Show') : tr('隐藏', 'Hide')} aria-label={`${mark.hidden ? tr('显示', 'Show') : tr('隐藏', 'Hide')} ${mark.label}`} onClick={() => onEdit(mark.id, { hidden: !mark.hidden })}>
              <UiIcon name={mark.hidden ? 'eyeOff' : 'eye'} size={14} />
            </button>
            <button type="button" className={mark.locked ? 'on' : ''} aria-pressed={Boolean(mark.locked)} disabled={locked} title={mark.locked ? tr('解锁', 'Unlock') : tr('锁定', 'Lock')} aria-label={`${mark.locked ? tr('解锁', 'Unlock') : tr('锁定', 'Lock')} ${mark.label}`} onClick={() => onEdit(mark.id, { locked: !mark.locked })}>
              <UiIcon name={mark.locked ? 'lock' : 'unlock'} size={14} />
            </button>
            <button type="button" disabled={locked || mark.locked} title={tr('删除', 'Delete')} aria-label={`${tr('删除画线', 'Remove line')} ${mark.label}`} onClick={() => onRemove(mark.id)}><UiIcon name="trash" size={14} /></button>
          </li>
        })}
      </ul> : null}
    </section>
  )
})
