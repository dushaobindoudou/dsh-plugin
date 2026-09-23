/**
 * Vendored pet contract - copied verbatim from dsh-pets 0.1.0
 * (packages/dsh-pets in this monorepo).
 *
 * Why vendored: the npm name dsh-pets is currently owned by another account,
 * so dsh-lingxi cannot take a registry dependency on its first release.
 * Once `npm owner add dushaobindoudou dsh-pets` is done (or the account is
 * switched), replace this directory with `dependencies: { "dsh-pets": "^0.1.0" }`
 * and delete it - the monorepo package remains the source of truth.
 */
export {
  TASK_KINDS,
  TASK_MOODS,
  TASK_STATES,
  cleanTaskEvent,
} from './vocab.js'
export { DEFAULT_BRIDGE_PORT, DEFAULT_TOKEN_PATH, PetBridge } from './bridge.js'
export {
  DEFAULT_PET_SETTINGS,
  readPetSettings,
  settingsPath,
  validateSettings,
  writePetSettings,
} from './settings.js'
