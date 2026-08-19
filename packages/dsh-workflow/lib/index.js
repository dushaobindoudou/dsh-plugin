/**
 * Workflow Studio — host half.
 *
 * Consumes host services (sessionQuery, workspaceRegistry, agents,
 * agentDefaultModel), listens to durable session events for workflow runs,
 * and publishes the `wfx` Remote namespace through the Typert Gateway
 * (source-mode descriptors: single `request` JSON parameter per method).
 */
import { Remote, TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol'

/**
 * Apply one `@Remote(method)` marker without decorator syntax: the shim
 * mimics the decorator context `addMarkerInitializer` expects, and the
 * initializer marks the prototype exactly like a real decorator would.
 */
function markRemoteMethod(prototype, method) {
  const decorator = Remote(method)
  decorator(undefined, {
    name: method,
    private: false,
    static: false,
    addInitializer(fn) { fn.call(Object.create(prototype)) },
  })
}

export function apply(ctx) {
  const sessionQuery = ctx.get('sessionQuery')
  if (sessionQuery === undefined) return

  const MAX_SCAN_SESSIONS = 40
  const MAX_CALLS_PER_SESSION = 12
  const MAX_WF_EVENTS_PER_SESSION = 800

  const savedDefs = new Map()
  const cache = { scanned: false, scannedAt: 0, sessions: new Map() }
  const runIndex = new Map()

  const NL = String.fromCharCode(10)
  const hashText = (text) => {
    let h = 5381
    for (let i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) | 0
    return (h >>> 0).toString(36)
  }
  const newId = () => 'd-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
  const statusOfStop = (reason) => (reason === 'completed' ? 'completed' : reason === 'cancelled' ? 'cancelled' : 'failed')
  const baseName = (p) => {
    const parts = String(p).split('/')
    return parts[parts.length - 1] || String(p)
  }
  const shortId = (id) => String(id).slice(0, 10)

  const ensureEntry = (sessionId) => {
    let entry = cache.sessions.get(sessionId)
    if (entry === undefined) {
      entry = { id: sessionId, title: '', createdAt: 0, cwd: undefined, lastActive: 0, live: true, runs: new Map(), calls: [] }
      cache.sessions.set(sessionId, entry)
    }
    return entry
  }

  const ensureRun = (entry, runId, name, time) => {
    let run = entry.runs.get(runId)
    if (run === undefined) {
      run = { runId: runId, name: name || '(workflow)', sessionId: entry.id, startedAt: time, endedAt: 0, status: 'running', stopReason: null, error: null, agentsStarted: 0, logs: [], phaseCalls: [], agents: new Map() }
      entry.runs.set(runId, run)
      runIndex.set(runId, run)
    } else if (name) {
      run.name = name
    }
    if (time > entry.lastActive) entry.lastActive = time
    return run
  }

  const applyWorkflowRecord = (entry, type, time, data) => {
    if (data === undefined || data === null) return
    if (type === 'tool-workflow/run-start') {
      ensureRun(entry, data.runId, data.name, time)
    } else if (type === 'tool-workflow/agent-start') {
      const run = ensureRun(entry, data.runId, '', time)
      run.agentsStarted += 1
      if (!run.agents.has(data.seq)) {
        run.agents.set(data.seq, { seq: data.seq, label: data.label || ('#' + data.seq), phase: data.phase === undefined ? null : data.phase, childId: data.childId, outcome: null, startedAt: time, endedAt: 0 })
      }
    } else if (type === 'tool-workflow/agent-end') {
      const run = entry.runs.get(data.runId)
      if (run !== undefined) {
        const m = run.agents.get(data.seq)
        if (m !== undefined) { m.outcome = data.outcome; m.endedAt = time }
        if (time > entry.lastActive) entry.lastActive = time
      }
    } else if (type === 'tool-workflow/run-end') {
      const run = entry.runs.get(data.runId)
      if (run !== undefined) {
        run.endedAt = time
        run.status = statusOfStop(data.stopReason)
        run.stopReason = data.stopReason
        if (time > entry.lastActive) entry.lastActive = time
      }
    }
  }

  const parseCallArgs = (raw) => {
    try {
      const parsed = JSON.parse(raw)
      if (parsed !== null && typeof parsed === 'object') return parsed
    } catch (err) {}
    return null
  }

  const normalizeDef = (call) => ({
    id: 'd-' + hashText(call.script),
    name: (call.meta && call.meta.name) || 'workflow',
    description: (call.meta && call.meta.description) || '',
    whenToUse: (call.meta && call.meta.whenToUse) || '',
    phases: (call.meta && Array.isArray(call.meta.phases)) ? call.meta.phases : [],
    script: call.script,
  })

  const findDefinition = (id) => {
    const saved = savedDefs.get(id)
    if (saved !== undefined) return saved
    for (const entry of cache.sessions.values()) {
      for (const call of entry.calls) {
        if (call.meta !== undefined && typeof call.script === 'string' && ('d-' + hashText(call.script)) === id) return normalizeDef(call)
      }
    }
    return undefined
  }

  ctx.on('session/event', (session, event) => {
    const type = event.type
    if (type !== 'tool-workflow/run-start' && type !== 'tool-workflow/agent-start' && type !== 'tool-workflow/agent-end' && type !== 'tool-workflow/run-end' && type !== 'tool/call' && type !== 'session/title') return
    const entry = ensureEntry(session.id)
    if (type === 'session/title') {
      if (event.data && event.data.title) entry.title = event.data.title
      return
    }
    if (type === 'tool/call') {
      if (!event.data || event.data.name !== 'workflow') return
      if (entry.calls.length >= MAX_CALLS_PER_SESSION) return
      const parsed = parseCallArgs(event.data.arguments)
      if (parsed !== null && parsed.meta && typeof parsed.script === 'string') {
        entry.calls.push({ seq: event.seq, time: event.time, meta: parsed.meta, script: parsed.script })
      }
      if (event.time > entry.lastActive) entry.lastActive = event.time
      return
    }
    applyWorkflowRecord(entry, type, event.time, event.data)
  })

  ctx.on('workflow/log', (info, message) => {
    const run = runIndex.get(info.id)
    if (run !== undefined && run.logs.length < 200) run.logs.push({ time: Date.now(), message: String(message) })
  })
  ctx.on('workflow/phase', (info, title) => {
    const run = runIndex.get(info.id)
    if (run !== undefined && run.phaseCalls.indexOf(title) < 0) run.phaseCalls.push(title)
  })
  ctx.on('workflow/end', (info, result) => {
    const run = runIndex.get(info.id)
    if (run !== undefined && run.endedAt === 0) {
      run.endedAt = Date.now()
      run.status = statusOfStop(result.stopReason)
      run.stopReason = result.stopReason
      run.error = result.error === undefined ? null : result.error
    }
  })

  const scan = async (force) => {
    if (cache.scanned && !force) return
    const headersById = new Map()
    let records = []
    try {
      records = await sessionQuery.listSessions()
    } catch (err) {
      return
    }
    for (const r of records) headersById.set(r.header.id, r.header)
    let candidateIds = null
    try {
      const page = await sessionQuery.searchSessions({ query: 'workflow', eventFilters: [{ kind: 'type', values: ['tool/call'] }], limit: 60 })
      candidateIds = page.items.map((hit) => hit.header.id)
    } catch (err) {
      candidateIds = null
    }
    if (candidateIds === null) {
      candidateIds = []
      const top = records
        .filter((r) => r.header.origin !== 'subagent')
        .sort((a, b) => b.header.createdAt - a.header.createdAt)
        .slice(0, MAX_SCAN_SESSIONS)
      for (const r of top) {
        let evs = []
        try { evs = await sessionQuery.listEvents(r.header.id) } catch (err) { continue }
        if (evs.some((e) => e.type.indexOf('tool-workflow/') === 0 || e.type === 'tool/call')) candidateIds.push(r.header.id)
      }
    }
    const fresh = new Map()
    for (const sid of candidateIds) {
      const header = headersById.get(sid)
      if (header === undefined || header.origin === 'subagent') continue
      let log
      try { log = await sessionQuery.readSession(sid) } catch (err) { continue }
      const entry = { id: sid, title: '', createdAt: header.createdAt, cwd: header.cwd, lastActive: 0, live: false, runs: new Map(), calls: [] }
      let wfSeen = 0
      for (const ev of log.events) {
        if (ev.time > entry.lastActive) entry.lastActive = ev.time
        if (ev.type.indexOf('tool-workflow/') === 0) {
          if (wfSeen++ < MAX_WF_EVENTS_PER_SESSION) applyWorkflowRecord(entry, ev.type, ev.time, ev.data)
        } else if (ev.type === 'tool/call' && ev.data && ev.data.name === 'workflow') {
          if (entry.calls.length < MAX_CALLS_PER_SESSION) {
            const parsed = parseCallArgs(ev.data.arguments)
            if (parsed !== null && parsed.meta && typeof parsed.script === 'string') entry.calls.push({ seq: ev.seq, time: ev.time, meta: parsed.meta, script: parsed.script })
          }
        } else if (ev.type === 'session/title' && ev.data && ev.data.title) {
          entry.title = ev.data.title
        }
      }
      if (entry.runs.size === 0 && entry.calls.length === 0) continue
      fresh.set(sid, entry)
    }
    const needTitles = []
    for (const e of fresh.values()) if (!e.title) needTitles.push(e.id)
    if (needTitles.length > 0) {
      try {
        const obs = await sessionQuery.readTitleSnapshots(needTitles)
        for (const o of obs) {
          if (o.status === 'fulfilled' && o.value.title !== undefined) {
            const e = fresh.get(o.sessionId)
            if (e !== undefined) e.title = o.value.title.title
          }
        }
      } catch (err) {}
    }
    for (const [sid, entry] of cache.sessions) {
      if (!fresh.has(sid) && entry.live) fresh.set(sid, entry)
    }
    cache.sessions = fresh
    cache.scanned = true
    cache.scannedAt = Date.now()
  }

  const summarizeRun = (run) => ({ runId: run.runId, name: run.name, status: run.status, startedAt: run.startedAt, endedAt: run.endedAt, agents: run.agents.size, stopReason: run.stopReason, error: run.error })
  const summarizeEntry = (entry) => ({
    id: entry.id,
    title: entry.title || shortId(entry.id),
    createdAt: entry.createdAt,
    cwd: entry.cwd === undefined ? null : entry.cwd,
    lastActive: entry.lastActive,
    callCount: entry.calls.length,
    runs: Array.from(entry.runs.values()).sort((a, b) => b.startedAt - a.startedAt).slice(0, 30).map(summarizeRun),
  })

  const buildGroups = () => {
    const registry = ctx.get('workspaceRegistry')
    const workspaces = registry !== undefined ? registry.list() : []
    const groups = []
    const groupBySession = new Map()
    for (const ws of workspaces) {
      const g = { key: 'ws:' + ws.id, workspaceId: ws.id, title: ws.title, kind: 'workspace', sessions: [] }
      groups.push(g)
      for (const sid of ws.sessionIds) groupBySession.set(sid, g)
    }
    const cwdGroups = new Map()
    for (const entry of cache.sessions.values()) {
      if (entry.runs.size === 0 && entry.calls.length === 0) continue
      let g = groupBySession.get(entry.id)
      if (g === undefined) {
        const key = 'cwd:' + (entry.cwd === undefined ? '' : entry.cwd)
        g = cwdGroups.get(key)
        if (g === undefined) {
          g = { key: key, workspaceId: null, title: entry.cwd === undefined ? '未分组会话' : baseName(entry.cwd), kind: 'folder', sessions: [] }
          cwdGroups.set(key, g)
          groups.push(g)
        }
      }
      g.sessions.push(summarizeEntry(entry))
    }
    const out = []
    for (const g of groups) {
      if (g.sessions.length === 0) continue
      g.sessions.sort((a, b) => b.lastActive - a.lastActive)
      out.push(g)
    }
    return out
  }

  const buildDefinitions = () => {
    const stats = new Map()
    for (const entry of cache.sessions.values()) {
      for (const run of entry.runs.values()) {
        let s = stats.get(run.name)
        if (s === undefined) { s = { count: 0, lastAt: 0 }; stats.set(run.name, s) }
        s.count += 1
        if (run.startedAt > s.lastAt) s.lastAt = run.startedAt
      }
    }
    const out = []
    const seen = new Set()
    const push = (def, saved, source) => {
      if (seen.has(def.script)) return
      seen.add(def.script)
      const s = stats.get(def.name) || { count: 0, lastAt: 0 }
      out.push({ id: def.id, name: def.name, description: def.description, whenToUse: def.whenToUse || '', phases: def.phases || [], script: def.script, saved: saved, source: source, runCount: s.count, lastRunAt: s.lastAt })
    }
    for (const def of savedDefs.values()) push(def, true, null)
    for (const entry of cache.sessions.values()) {
      for (const call of entry.calls) {
        if (call.meta === undefined || typeof call.script !== 'string') continue
        push(normalizeDef(call), false, { kind: 'session', sessionId: entry.id, seq: call.seq })
      }
    }
    out.sort((a, b) => b.runCount - a.runCount || b.lastRunAt - a.lastRunAt)
    return out
  }

  const runPrompt = (def) => {
    const meta = { name: def.name, description: def.description }
    if (def.whenToUse) meta.whenToUse = def.whenToUse
    if (def.phases && def.phases.length > 0) meta.phases = def.phases
    return ['[工作流模式] 请立即使用 workflow 工具运行工作流「' + def.name + '」。参数必须原样传入,不要改写:', '', 'meta 参数(JSON):', JSON.stringify(meta, null, 2), '', 'script 参数(纯 JS 脚本体,原样传入):', def.script, '', '运行完成后,请汇报:各阶段执行情况、成功与失败的 agent 数量、以及最终返回值的简要摘要。'].join(NL)
  }
  const designPrompt = (goal) => ['[工作流设计协作] 目标:' + goal, '', '请协助设计一个可复用的工作流(workflow 工具脚本):', '1. 先给出工作流的 meta(name / description / phases)与 script 的设计草案,并解释每个阶段的职责;', '2. 使用 workflow 工具实际试运行验证(如果样本过大可以先缩小规模);', '3. 最后以完整代码块输出最终版 meta(JSON)与 script(纯 JS 脚本体),以便我保存为工作流模板。'].join(NL)
  const buildMessage = (text) => ({ id: 'wfx-msg-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8), role: 'user', content: [{ type: 'text', text: text }], source: { kind: 'user' } })

  const parsePhasesText = (text) => {
    const phases = []
    for (const line of String(text || '').split(NL)) {
      const t = line.trim()
      if (!t) continue
      const idx = t.indexOf('|')
      const title = (idx >= 0 ? t.slice(0, idx) : t).trim()
      const detail = idx >= 0 ? t.slice(idx + 1).trim() : ''
      if (title) phases.push(detail ? { title: title, detail: detail } : { title: title })
    }
    return phases
  }

  /** The `wfx` Remote namespace: every method takes one `request` JSON value. */
  class WfxRemote extends TypertRemoteService {
    constructor(c) { super(c, 'wfx') }

    async overview(request) {
      const r = request === null || typeof request !== 'object' ? {} : request
      await scan(r.refresh === true)
      return { groups: buildGroups(), definitions: buildDefinitions(), scannedAt: cache.scannedAt, scanned: cache.scanned }
    }

    async runDetail(request) {
      const r = request || {}
      const entry = cache.sessions.get(r.sessionId)
      if (entry === undefined) return { error: '会话不在缓存中,请刷新重试' }
      const run = entry.runs.get(r.runId)
      if (run === undefined) return { error: '未找到该运行记录' }
      const phaseOrder = []
      const byPhase = new Map()
      const members = Array.from(run.agents.values()).sort((a, b) => a.seq - b.seq)
      for (const m of members) {
        const key = (m.phase === null || m.phase === undefined) ? '' : m.phase
        if (!byPhase.has(key)) { byPhase.set(key, []); phaseOrder.push(key) }
        byPhase.get(key).push({ seq: m.seq, label: m.label, childId: m.childId === undefined ? null : m.childId, outcome: m.outcome, startedAt: m.startedAt, endedAt: m.endedAt })
      }
      for (const p of run.phaseCalls) {
        if (!byPhase.has(p)) { byPhase.set(p, []); phaseOrder.push(p) }
      }
      return {
        runId: run.runId,
        name: run.name,
        sessionId: run.sessionId,
        status: run.status,
        startedAt: run.startedAt,
        endedAt: run.endedAt,
        stopReason: run.stopReason,
        error: run.error,
        agentsStarted: run.agentsStarted,
        logs: run.logs,
        phases: phaseOrder.map((k) => ({ title: k === '' ? null : k, members: byPhase.get(k) })),
      }
    }

    async sessionCalls(request) {
      const r = request || {}
      const entry = cache.sessions.get(r.sessionId)
      if (entry === undefined) return { calls: [] }
      return { calls: entry.calls.map((c) => ({ seq: c.seq, time: c.time, meta: c.meta, script: c.script })) }
    }

    async createDef(request) {
      const r = request || {}
      const name = String(r.name || '').trim()
      const description = String(r.description || '').trim()
      const script = String(r.script || '')
      if (!name || !description || !script.trim()) return { error: 'name、description、script 均不能为空' }
      const def = { id: newId(), name: name, description: description, whenToUse: String(r.whenToUse || '').trim(), phases: parsePhasesText(r.phasesText), script: script }
      savedDefs.set(def.id, def)
      return { id: def.id }
    }

    async updateDef(request) {
      const r = request || {}
      const def = savedDefs.get(r.id)
      if (def === undefined) return { error: '仅已保存的工作流可编辑' }
      const name = String(r.name || '').trim()
      const description = String(r.description || '').trim()
      const script = String(r.script || '')
      if (!name || !description || !script.trim()) return { error: 'name、description、script 均不能为空' }
      def.name = name
      def.description = description
      def.whenToUse = String(r.whenToUse || '').trim()
      def.phases = parsePhasesText(r.phasesText)
      def.script = script
      return { ok: true }
    }

    async deleteDef(request) {
      const r = request || {}
      savedDefs.delete(r.id)
      return { ok: true }
    }

    async saveFromCall(request) {
      const r = request || {}
      const entry = cache.sessions.get(r.sessionId)
      if (entry === undefined) return { error: '未找到源会话' }
      const call = entry.calls.find((c) => c.seq === r.seq)
      if (call === undefined) return { error: '未找到该工作流调用' }
      const def = normalizeDef(call)
      if (!savedDefs.has(def.id)) savedDefs.set(def.id, def)
      return { id: def.id }
    }

    async launch(request) {
      const r = request || {}
      const agentsSvc = ctx.get('agents')
      if (agentsSvc === undefined) return { error: 'agents 服务不可用' }
      let prompt
      if (r.mode === 'design') {
        const goal = String(r.goal || '').trim()
        if (!goal) return { error: '请先填写目标描述' }
        prompt = designPrompt(goal)
      } else {
        const def = findDefinition(r.definitionId)
        if (def === undefined) return { error: '未找到工作流定义' }
        prompt = runPrompt(def)
      }
      let cwd
      try {
        const obs = await sessionQuery.readTitleSnapshot(r.sessionId)
        cwd = obs.session.cwd
      } catch (err) {}
      const modelSvc = ctx.get('agentDefaultModel')
      const selection = modelSvc !== undefined ? modelSvc.currentSelection() : undefined
      let agent = agentsSvc.get(r.sessionId)
      if (agent === undefined) {
        const handle = await agentsSvc.create({
          sessionId: r.sessionId,
          meta: cwd !== undefined ? { cwd: cwd } : {},
          agentOptions: selection !== undefined ? { provider: selection.provider, model: selection.model } : {},
        })
        agent = handle.agent
      }
      agent.followup(buildMessage(prompt))
      return { ok: true, sessionId: r.sessionId }
    }
  }

  for (const m of ['overview', 'runDetail', 'sessionCalls', 'createDef', 'updateDef', 'deleteDef', 'saveFromCall', 'launch']) {
    markRemoteMethod(WfxRemote.prototype, m)
  }
  new WfxRemote(ctx)
}

/**
 * Wait for the services this plugin depends on before apply() runs. Without
 * this, apply() executes during boot before the host services exist and the
 * early return would silently skip registering the `wfx` Remote namespace.
 */
export const inject = ['sessionQuery', 'agents', 'agentDefaultModel', 'workspaceRegistry']
