/**
 * dsh-lingxi — host half.
 *
 * Mount order matters and is documented in the README: read the shared pet
 * settings, build a bridge over them, register the enabled tools, install
 * the `lingxi` Remote namespace for the settings page, then (if
 * autoAnnounce) ping the cat once so the user can see the mount worked.
 *
 * Everything registrations own is effect-disposed; a settings save rebuilds
 * the tool set in place (dispose the old registrations, register the new
 * set) so toggles take effect without a process restart.
 */
import { PetBridge, readPetSettings, validateSettings, writePetSettings } from './pet-contract/index.js'
import { buildLingxiTools } from './tools.js'
import { installLingxiRemote } from './remote.js'

export function apply(ctx) {
  const tools = ctx.get('tools')
  if (tools === undefined) {
    console.error('dsh-lingxi: the host tool registry is not mounted; tools unavailable, settings page still served.')
  }

  // ---- settings state (one source of truth: the shared file) ----
  const firstLoad = readPetSettings()
  let settings = firstLoad.settings
  let loadInfo = { ignored: firstLoad.ignored, error: firstLoad.error, existed: firstLoad.existed }

  let bridge = new PetBridge({ port: settings.port })

  // ---- tool registration lifecycle ----
  let disposeTools = null
  function registerTools() {
    if (tools === undefined) return
    const definitions = buildLingxiTools({ bridge, settings })
    const disposers = definitions.map((definition) => tools.register(definition))
    disposeTools = () => { for (const off of disposers) off() }
  }
  function rebuild() {
    if (disposeTools !== null) disposeTools()
    disposeTools = null
    registerTools()
  }

  ctx.effect(() => {
    registerTools()
    return () => {
      if (disposeTools !== null) disposeTools()
      disposeTools = null
    }
  }, 'dsh-lingxi: tools lifecycle')

  // ---- the controller the Remote namespace and the settings page share ----
  const controller = {
    getSettings: () => settings,
    getLoadInfo: () => loadInfo,
    saveSettings(patch) {
      const { settings: next, ignored } = validateSettings({ ...settings, ...patch })
      const portChanged = next.port !== settings.port
      writePetSettings(undefined, next)
      settings = next
      loadInfo = { ignored, error: null, existed: true }
      if (portChanged) bridge = new PetBridge({ port: settings.port })
      rebuild()
      return { settings, ignored }
    },
    async testSay(text) {
      const trimmed = String(text).trim().slice(0, 140)
      if (!trimmed) return { ok: false, error: 'empty text' }
      return bridge.control({ say: trimmed, agent: settings.agentId, priority: 'status' })
    },
  }

  installLingxiRemote(ctx, controller)

  // ---- identity + optional announce (fire and forget, never blocks mount) ----
  const announce = async () => {
    await bridge.registerAgent({
      id: settings.agentId,
      name: settings.agentName,
      badge: settings.agentBadge,
      color: '#4D6BFE',
    }).catch(() => {})
    if (settings.autoAnnounce) {
      await bridge.taskEvent({
        state: 'running',
        kind: 'chat',
        summary: 'DSH 已接入，灵犀桥接就绪',
      }, settings.agentId)
    }
  }
  void announce()
}
