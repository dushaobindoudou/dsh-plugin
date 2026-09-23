/**
 * dsh-pets — the shared layer every desktop-pet plugin for the DeepSeek
 * Harness builds on.
 *
 * Three things live here, and only things a SECOND pet would also need:
 *  - vocab.js    the task contract (8 states, 9 moods) and its boundary cleaner
 *  - bridge.js   the localhost bridge client (token file, hard timeouts,
 *                unreachable-is-a-value semantics)
 *  - settings.js the shared ~/.lingxi/pets-settings.json store
 *
 * The `apply` export provides a `pets` service so sibling plugins can
 * `ctx.get('pets')` instead of each re-deriving paths — but every export also
 * works as a plain library, because a pet plugin that wants its own service
 * topology should not have to mount this package's apply at all.
 */
import { DEFAULT_BRIDGE_PORT, DEFAULT_TOKEN_PATH, PetBridge } from './bridge.js'
import {
  DEFAULT_PET_SETTINGS,
  readPetSettings,
  settingsPath,
  validateSettings,
  writePetSettings,
} from './settings.js'
import { TASK_KINDS, TASK_MOODS, TASK_STATES, cleanTaskEvent } from './vocab.js'

export {
  DEFAULT_BRIDGE_PORT,
  DEFAULT_TOKEN_PATH,
  PetBridge,
  DEFAULT_PET_SETTINGS,
  readPetSettings,
  settingsPath,
  validateSettings,
  writePetSettings,
  TASK_KINDS,
  TASK_MOODS,
  TASK_STATES,
  cleanTaskEvent,
}

/**
 * Mount the shared `pets` service. Reads the settings once and hands out a
 * factory bound to them; a plugin whose settings page rewrites the file
 * should re-run `load()` itself rather than expect live reloads from here —
 * the service is a convenience over the library, not a second source of
 * truth.
 */
export function apply(ctx) {
  const loaded = readPetSettings()
  const service = {
    settings: loaded.settings,
    ignored: loaded.ignored,
    error: loaded.error,
    /** Re-read the shared file; returns the fresh load. */
    load() {
      const fresh = readPetSettings()
      service.settings = fresh.settings
      service.ignored = fresh.ignored
      service.error = fresh.error
      return fresh
    },
    /** Build a bridge bound to the CURRENT settings. */
    createBridge(overrides = {}) {
      return new PetBridge({
        port: service.settings.port,
        ...overrides,
      })
    },
    /** Write settings through validation; returns the stored settings. */
    save(patch) {
      const { settings, ignored } = validateSettings({ ...service.settings, ...patch })
      writePetSettings(undefined, settings)
      service.settings = settings
      service.ignored = ignored
      return { settings, ignored }
    },
  }
  ctx.effect(() => ctx.provide('pets', service), 'dsh-pets: pets service')
}
