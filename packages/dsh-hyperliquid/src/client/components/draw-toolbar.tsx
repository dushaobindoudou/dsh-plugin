/** Floating toolbar for the selected drawing: color, width, line style, text, lock and delete. */
import * as React from 'react'
import { tr } from '../remote'
import type { ChartMark } from '../types'
import { isTextKind, toolOf } from '../drawing-tools'
import { saveStyleTemplate } from '../drawing-templates'
import { ALERT_KINDS } from '../../../lib/chart-drawings.js'
import { UiIcon } from './panel-icons'
import { Select } from './select'

export const DRAW_COLORS = ['#4c82d8', '#2fd3a0', '#ef5f6c', '#e2a943', '#9b86db', '#26b5c8', '#8a8f98']
const STYLES: Array<['solid' | 'dashed' | 'dotted', string, string]> = [['solid', '实线', 'Solid'], ['dashed', '虚线', 'Dashed'], ['dotted', '点线', 'Dotted']]

export function DrawToolbar({ mark, globallyLocked, onEdit, onRemove, onClose, onClone, onCoordinates }: {
  mark: ChartMark; globallyLocked: boolean; onEdit: (patch: Record<string, unknown>) => void; onRemove: () => void; onClose: () => void; onClone: () => void; onCoordinates: () => void
}) {
  const [savedDefault, setSavedDefault] = React.useState(false)
  React.useEffect(() => { setSavedDefault(false) }, [mark.id, mark.color, mark.lineWidth, mark.lineStyle])
  const [text, setText] = React.useState(mark.label)
  React.useEffect(() => { setText(mark.label) }, [mark.id, mark.label])
  const locked = Boolean(mark.locked) || globallyLocked
  const width = mark.lineWidth ?? 2
  const style = mark.lineStyle ?? 'solid'
  const tool = toolOf(mark.kind)
  // Keep the chart from treating toolbar presses as chart clicks or drags.
  const stop = (event: React.SyntheticEvent) => event.stopPropagation()
  return (
    <div className="dhl-draw-toolbar" role="toolbar" aria-label={tr('画线样式', 'Drawing style')} onPointerDown={stop} onClick={stop}>
      <span className="dhl-draw-toolbar-name">{tr(tool.zh, tool.en)}</span>
      {isTextKind(mark.kind) ? <input className="dhl-draw-toolbar-text" value={text} maxLength={200} disabled={locked} aria-label={tr('文本内容', 'Text')}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={(event) => { if (event.key === 'Enter' && text.trim() && text !== mark.label) onEdit({ label: text.trim() }); if (event.key === 'Escape') setText(mark.label) }}
        onBlur={() => { if (text.trim() && text !== mark.label) onEdit({ label: text.trim() }) }} /> : null}
      <span className="dhl-draw-toolbar-group" role="group" aria-label={tr('颜色', 'Color')}>
        {DRAW_COLORS.map((color) => <button type="button" key={color} className={'dhl-swatch' + ((mark.color ?? '') === color ? ' on' : '')} style={{ background: color }} disabled={locked}
          aria-label={`${tr('颜色', 'Color')} ${color}`} aria-pressed={(mark.color ?? '') === color} onClick={() => onEdit({ color })} />)}
      </span>
      {mark.kind !== 'text' ? <span className="dhl-draw-toolbar-group" role="group" aria-label={tr('线宽', 'Line width')}>
        {[1, 2, 3, 4].map((value) => <button type="button" key={value} className={width === value ? 'on' : ''} disabled={locked} aria-pressed={width === value}
          aria-label={`${tr('线宽', 'Width')} ${value}`} title={`${tr('线宽', 'Width')} ${value}`} onClick={() => onEdit({ lineWidth: value })}>
          <svg viewBox="0 0 18 18" width="16" height="16" aria-hidden="true"><line x1="2" x2="16" y1="9" y2="9" stroke="currentColor" strokeWidth={value} /></svg>
        </button>)}
      </span> : null}
      {mark.kind !== 'text' ? <span className="dhl-draw-toolbar-group" role="group" aria-label={tr('线型', 'Line style')}>
        {STYLES.map(([value, zh, en]) => <button type="button" key={value} className={style === value ? 'on' : ''} disabled={locked} aria-pressed={style === value}
          aria-label={tr(zh, en)} title={tr(zh, en)} onClick={() => onEdit({ lineStyle: value })}>
          <svg viewBox="0 0 18 18" width="16" height="16" aria-hidden="true"><line x1="2" x2="16" y1="9" y2="9" stroke="currentColor" strokeWidth="2" strokeDasharray={value === 'dashed' ? '4 3' : value === 'dotted' ? '1 3' : undefined} strokeLinecap="round" /></svg>
        </button>)}
      </span> : null}
      {mark.kind === 'vprofile' ? <span className="dhl-draw-toolbar-group" role="group" aria-label={tr('成交量分布设置', 'Volume profile settings')}>
        <Select aria-label={tr('价格行数', 'Rows')} title={tr('价格行数', 'Rows')} value={String(mark.rows ?? 48)} disabled={locked} onChange={(event) => onEdit({ rows: Number(event.target.value) })}>
          {[24, 48, 96, 150].map((value) => <option key={value} value={value}>{tr(`${value} 行`, `${value} rows`)}</option>)}
        </Select>
        <Select aria-label={tr('价值区比例', 'Value area')} title={tr('价值区成交量占比', 'Value area volume')} value={String(mark.valueArea ?? 0.7)} disabled={locked} onChange={(event) => onEdit({ valueArea: Number(event.target.value) })}>
          {[0.68, 0.7, 0.8].map((value) => <option key={value} value={value}>{`VA ${Math.round(value * 100)}%`}</option>)}
        </Select>
      </span> : null}
      <span className="dhl-draw-toolbar-group">
        <button type="button" disabled={locked} title={tr('精确编辑时间、价格与名称', 'Edit exact time, price and name')} aria-label={tr('编辑画线坐标', 'Edit drawing coordinates')} onClick={onCoordinates}><UiIcon name="settings" size={15} /></button>
        <button type="button" className={savedDefault ? 'on' : ''} title={tr(`设为${tool.zh}的默认样式`, `Use as default ${tool.en} style`)} aria-label={tr('设为默认样式', 'Save as default style')}
          onClick={() => { saveStyleTemplate(mark.kind, { color: mark.color, lineWidth: mark.lineWidth, lineStyle: mark.lineStyle }); setSavedDefault(true) }}>
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 4h11l3 3v13H5zM8 4v5h7V4M8 20v-6h8v6" /></svg>
        </button>
        {ALERT_KINDS.includes(mark.kind) ? <button type="button" className={mark.alert ? 'on' : ''} aria-pressed={Boolean(mark.alert)} disabled={locked}
          title={mark.alert ? tr('关闭价格提醒', 'Turn off price alert') : mark.alertTriggeredAt ? tr(`上次触发：${new Date(mark.alertTriggeredAt).toLocaleString()}，点击重新开启`, `Last fired ${new Date(mark.alertTriggeredAt).toLocaleString()}; click to re-arm`) : tr('价格穿越时提醒（触发一次）', 'Alert when price crosses (once)')}
          aria-label={mark.alert ? tr('关闭价格提醒', 'Turn off price alert') : tr('开启价格提醒', 'Turn on price alert')} onClick={() => onEdit({ alert: !mark.alert })}>
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0" /></svg>
        </button> : null}
        <button type="button" className={mark.shared ? 'on' : ''} aria-pressed={Boolean(mark.shared)} disabled={locked}
          title={mark.shared ? tr('取消同步（只保留在当前会话）', 'Stop syncing (keep in this session)') : tr('同步到该币种的所有交易会话', 'Sync to every session of this coin')}
          aria-label={mark.shared ? tr('取消同步', 'Stop syncing') : tr('同步到所有会话', 'Sync to all sessions')} onClick={() => onEdit({ shared: !mark.shared })}>
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M7 7h11l-3-3M17 17H6l3 3" /></svg>
        </button>
        <button type="button" title={tr('复制一份（Ctrl/Cmd+C、V）', 'Clone (Ctrl/Cmd+C, V)')} aria-label={tr('复制画线', 'Clone drawing')} onClick={onClone}>
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" /></svg>
        </button>
        <button type="button" className={mark.locked ? 'on' : ''} aria-pressed={Boolean(mark.locked)} disabled={globallyLocked}
          title={mark.locked ? tr('解锁', 'Unlock') : tr('锁定（防止误拖动）', 'Lock (prevent dragging)')} aria-label={mark.locked ? tr('解锁', 'Unlock') : tr('锁定', 'Lock')} onClick={() => onEdit({ locked: !mark.locked })}>
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2" /><path d={mark.locked ? 'M8 11V8a4 4 0 0 1 8 0v3' : 'M8 11V8a4 4 0 0 1 7.5-2'} /></svg>
        </button>
        <button type="button" disabled={locked} title={tr('删除（Delete）', 'Delete (Del)')} aria-label={tr('删除画线', 'Delete drawing')} onClick={onRemove}>
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" /></svg>
        </button>
        <button type="button" title={tr('取消选择（Esc）', 'Deselect (Esc)')} aria-label={tr('取消选择', 'Deselect')} onClick={onClose}><UiIcon name="close" size={14} /></button>
      </span>
    </div>
  )
}
