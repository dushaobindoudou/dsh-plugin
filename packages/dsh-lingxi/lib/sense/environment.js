/**
 * dsh-lingxi — the environment sense: which model, what changed around it.
 *
 * dsh's environment facts and their signals:
 *  - `agentDefaultModel.currentSelection()` → `{ provider, model }` — the
 *    route the next session takes. Read at start and on every reconcile
 *    pass; `llm/adapters-updated` (provider topology changed) triggers an
 *    immediate re-read. A CHANGE says once, at status priority — visible
 *    without stealing the stage.
 *  - `agent-preset/selected` (sessionId, preset) → an activity note.
 *  - `settings/updated` (ns, next, prev, source) → an activity note. The
 *    feed is ambient; the user changed something, the cat noticed.
 *  - `clientModules.onRebuilt(id, rev)` → one dev-loop say per revision:
 *    "the client bundle for plugin X is ready — refresh and it is there".
 *
 * First observations never announce: mount-time noise is not news.
 */
export class EnvironmentWatch {
  /**
   * @param {object} options
   * @param {object} options.ctx - the plugin Context (ctx.on, ctx.get).
   * @param {object} options.bridge - PetBridge bound to current settings.
   * @param {() => object} options.getSettings - current validated settings.
   * @param {object} [options.activity] - the ActivitySense receiving notes.
   */
  constructor({ ctx, bridge, getSettings, activity }) {
    this.ctx = ctx
    this.bridge = bridge
    this.getSettings = getSettings
    this.activity = activity
    this.started = false
    this.disposeFns = []
    /** undefined = nothing observed yet; a string = last seen provider/model. */
    this.modelKey
    /** clientModule id → last announced revision. */
    this.rebuiltSeen = new Map()
  }

  start() {
    if (this.started || this.ctx === undefined) return
    this.started = true
    const on = (event, handler) => {
      if (typeof this.ctx.on !== 'function') return
      this.disposeFns.push(this.ctx.on(event, (...args) => {
        try {
          handler(...args)
        } catch (error) {
          console.error(`dsh-lingxi environment watch: ${event} handler failed:`, error instanceof Error ? error.message : error)
        }
      }))
    }
    on('llm/adapters-updated', () => { this.refreshModel() })
    on('settings/updated', (ns) => {
      if (typeof ns === 'string' && ns) this.activity?.note('settings', `设置变更：${ns}`)
    })
    on('agent-preset/selected', (sessionId, preset) => {
      const id = sessionId === undefined || sessionId === null ? '' : String(sessionId).slice(0, 24)
      this.activity?.note('preset', typeof preset === 'string' && preset ? `${preset}${id ? ` ← ${id}` : ''}` : null)
    })
    this.ensureClientModules()
    this.refreshModel()
  }

  stop() {
    for (const dispose of this.disposeFns) {
      try {
        dispose()
      } catch { /* a disposer that throws must not stop the others */ }
    }
    this.disposeFns = []
    this.rebuiltSeen.clear()
    this.started = false
  }

  /**
   * Reconcile half: retry the clientModules subscription and re-read the
   * model selection, so late-mounted services are still picked up.
   */
  sweep() {
    if (!this.started) return
    this.ensureClientModules()
    this.refreshModel()
  }

  ensureClientModules() {
    if (this.clientModulesAttached === true) return
    const clientModules = this.ctx?.get?.('clientModules')
    if (clientModules === undefined || typeof clientModules.onRebuilt !== 'function') return
    try {
      const dispose = clientModules.onRebuilt((id, rev) => {
        try {
          this.onRebuilt(id, rev)
        } catch (error) {
          console.error('dsh-lingxi environment watch: rebuilt handler failed:', error instanceof Error ? error.message : error)
        }
      })
      if (typeof dispose === 'function') {
        this.disposeFns.push(() => {
          this.clientModulesAttached = false
          dispose()
        })
        this.clientModulesAttached = true
      }
    } catch (error) {
      console.error('dsh-lingxi environment watch: subscribe(onRebuilt) failed:', error instanceof Error ? error.message : error)
    }
  }

  /** One client bundle rebuilt → one dev-loop say per revision. */
  onRebuilt(id, rev) {
    const pluginId = typeof id === 'string' && id ? id : '未知插件'
    const key = typeof rev === 'string' && rev ? rev : String(Date.now())
    if (this.rebuiltSeen.get(pluginId) === key) return
    this.rebuiltSeen.set(pluginId, key)
    void this.say(`插件 ${pluginId} 的界面编译好了，刷新一下就能看到。`, 'status')
  }

  /** Read the current model selection; announce only a CHANGE. */
  refreshModel() {
    const svc = this.ctx?.get?.('agentDefaultModel')
    if (svc === undefined || typeof svc.currentSelection !== 'function') return
    let selection
    try {
      selection = svc.currentSelection()
    } catch { /* a mid-route registry can refuse; the next sweep retries */ }
    if (selection === null || typeof selection !== 'object') return
    const provider = typeof selection.provider === 'string' ? selection.provider : ''
    const model = typeof selection.model === 'string' ? selection.model : ''
    if (!provider && !model) return
    const key = `${provider}/${model}`
    if (this.modelKey === undefined) {
      this.modelKey = key // first observation: baseline, not news
      return
    }
    if (this.modelKey === key) return
    this.modelKey = key
    this.activity?.note('model', key)
    void this.say(`模型切到 ${key} 了。`, 'status')
  }

  async say(text, priority) {
    const settings = this.getSettings()
    await this.bridge.control({ say: text, agent: settings.agentId, priority })
  }

  /** What the settings page shows: the current route, if any. */
  snapshot() {
    return { model: this.modelKey ?? null }
  }
}
