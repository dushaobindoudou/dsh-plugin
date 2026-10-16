/**
 * dsh-hyperliquid — drawing operations with undo / redo.
 *
 * Every create, edit and delete the trader makes on the chart goes through
 * here: the desk updates optimistically, the host persists, and the inverse
 * operation is pushed onto a per-chart history (session + coin). Re-creating
 * a deleted drawing yields a new id, so ids inside the history are remapped.
 * @module src/client/drawing-history
 */

import * as React from 'react'
import { hyperCall, tr } from './remote'
import { notify, store } from './store'
import { loadChartMarks } from './data'
import type { ChartMark } from './types'

type Op =
  | { type: 'create'; mark: ChartMark }
  | { type: 'delete'; mark: ChartMark }
  | { type: 'edit'; id: string; before: Record<string, unknown>; after: Record<string, unknown> }
  | { type: 'batch'; ops: Op[] }

const HISTORY_LIMIT = 100
const GEOMETRY = ['price', 'fromTime', 'fromPrice', 'toTime', 'toPrice', 'points'] as const
const STYLE = ['color', 'lineWidth', 'lineStyle', 'locked', 'hidden'] as const

/** Everything needed to recreate a drawing on the host. */
function recreateRequest(mark: ChartMark): Record<string, unknown> {
  const out: Record<string, unknown> = { kind: mark.kind, label: mark.label, role: mark.role, coin: mark.coin, interval: mark.interval }
  for (const key of [...GEOMETRY, ...STYLE]) if (mark[key as keyof ChartMark] != null) out[key] = mark[key as keyof ChartMark]
  return out
}

function remap(ops: Op[], from: string, to: string): void {
  for (const op of ops) {
    if (op.type === 'batch') remap(op.ops, from, to)
    else if (op.type === 'edit') { if (op.id === from) op.id = to }
    else if (op.mark.id === from) op.mark = { ...op.mark, id: to }
  }
}

export interface DrawingHistory {
  create: (request: Record<string, unknown>) => Promise<ChartMark | null>
  edit: (id: string, patch: Record<string, unknown>) => Promise<void>
  remove: (id: string) => Promise<void>
  removeMany: (ids: string[]) => Promise<void>
  undo: () => Promise<void>
  redo: () => Promise<void>
  canUndo: boolean
  canRedo: boolean
}

/** History is scoped to one chart (session + coin) and resets when that changes. */
export function useDrawingHistory(scope: string): DrawingHistory {
  const undoStack = React.useRef<Op[]>([])
  const redoStack = React.useRef<Op[]>([])
  const [, setVersion] = React.useState(0)
  const bump = () => setVersion((value) => value + 1)
  React.useEffect(() => { undoStack.current = []; redoStack.current = []; bump() }, [scope])

  const session = () => store.get().activeSessionId
  const fail = (what: string, error: unknown) => {
    notify(`${what}：${String((error as Error)?.message ?? error)}`)
    void loadChartMarks()
  }
  // ── host primitives (optimistic; never recorded) ──
  const apiCreate = async (request: Record<string, unknown>): Promise<ChartMark | null> => {
    const sessionId = session()
    if (!sessionId) { notify(tr('请先选择交易会话', 'Choose a trading session first')); return null }
    const { activeCoin, interval } = store.get()
    try {
      const saved = await hyperCall('drawChartMark', { coin: activeCoin, interval, role: 'neutral', ...request, sessionId }) as ChartMark
      store.patch((current) => ({ chartMarks: [...current.chartMarks.filter((item) => item.id !== saved.id), saved] }))
      return saved
    } catch (error) { fail(tr('画线失败', 'Could not draw'), error); return null }
  }
  const apiDelete = async (id: string) => {
    const sessionId = session()
    if (!sessionId) return
    store.patch((current) => ({ chartMarks: current.chartMarks.filter((item) => item.id !== id) }))
    try { await hyperCall('eraseChartMark', { sessionId, id }) } catch (error) { fail(tr('删除画线失败', 'Could not remove drawing'), error) }
  }
  const apiEdit = async (id: string, patch: Record<string, unknown>) => {
    const sessionId = session()
    if (!sessionId) return
    store.patch((current) => ({ chartMarks: current.chartMarks.map((item) => {
      if (item.id !== id) return item
      const next = { ...item, ...patch } as Record<string, unknown>
      for (const [key, value] of Object.entries(patch)) if (value === null) delete next[key]
      return next as unknown as ChartMark
    }) }))
    try { await hyperCall('updateChartMark', { sessionId, id, patch }) } catch (error) { fail(tr('修改画线失败', 'Could not edit drawing'), error) }
  }

  const record = (op: Op) => {
    undoStack.current.push(op)
    if (undoStack.current.length > HISTORY_LIMIT) undoStack.current.shift()
    redoStack.current = []
    bump()
  }
  const current = (id: string) => store.get().chartMarks.find((item) => item.id === id)

  /** Apply one op forward (redo) or backward (undo); returns false if it could not be applied. */
  const apply = async (op: Op, forward: boolean): Promise<void> => {
    if (op.type === 'batch') { for (const inner of forward ? op.ops : [...op.ops].reverse()) await apply(inner, forward); return }
    if (op.type === 'edit') { await apiEdit(op.id, forward ? op.after : op.before); return }
    const shouldExist = (op.type === 'create') === forward
    if (shouldExist) {
      const saved = await apiCreate(recreateRequest(op.mark))
      if (saved) { const old = op.mark.id; remap(undoStack.current, old, saved.id); remap(redoStack.current, old, saved.id); op.mark = { ...op.mark, id: saved.id } }
    } else await apiDelete(op.mark.id)
  }

  return {
    async create(request) {
      const saved = await apiCreate(request)
      if (saved) record({ type: 'create', mark: saved })
      return saved
    },
    async edit(id, patch) {
      const mark = current(id)
      if (!mark) return
      const before = Object.fromEntries(Object.keys(patch).map((key) => [key, (mark as unknown as Record<string, unknown>)[key] ?? null]))
      record({ type: 'edit', id, before, after: patch })
      await apiEdit(id, patch)
    },
    async remove(id) {
      const mark = current(id)
      if (!mark) return
      record({ type: 'delete', mark })
      await apiDelete(id)
    },
    async removeMany(ids) {
      const marks = ids.map(current).filter((mark): mark is ChartMark => Boolean(mark))
      if (!marks.length) return
      record({ type: 'batch', ops: marks.map((mark) => ({ type: 'delete', mark })) })
      for (const mark of marks) await apiDelete(mark.id)
    },
    async undo() {
      const op = undoStack.current.pop()
      if (!op) return
      redoStack.current.push(op); bump()
      await apply(op, false)
    },
    async redo() {
      const op = redoStack.current.pop()
      if (!op) return
      undoStack.current.push(op); bump()
      await apply(op, true)
    },
    canUndo: undoStack.current.length > 0,
    canRedo: redoStack.current.length > 0,
  }
}
