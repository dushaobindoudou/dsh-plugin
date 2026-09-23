/**
 * Vendored pet contract - copied verbatim from packages/dsh-pets in this
 * monorepo (see scripts/sync-pet-contract.mjs).
 *
 * Why vendored: the npm name dsh-pets is currently owned by another account,
 * so dsh-lingxi cannot take a registry dependency on its first release.
 * Once ownership is granted, replace this directory with
 * dependencies: { "dsh-pets": "^<version>" } and delete it - the monorepo
 * package remains the source of truth. GENERATED FILE: do not edit.
 */

export {
  TASK_KINDS,
  TASK_MOODS,
  TASK_STATES,
  cleanTaskEvent,
} from './vocab.js'
export {
  DEFAULT_BRIDGE_PORT,
  DEFAULT_TOKEN_PATH,
  PetBridge,
} from './bridge.js'
export {
  DEFAULT_PET_SETTINGS,
  readPetSettings,
  settingsPath,
  validateSettings,
  writePetSettings,
} from './settings.js'
export {
  ATTENTION_LEVELS,
  DEFAULT_ATTENTION_POLICY,
  SILENT_STATES,
  attentionLevel,
  cleanAttentionPolicy,
  stagePriorityFor,
} from './policy.js'
export {
  REMINDER_MARKER,
  REMINDER_REPEAT_FLOOR_MINUTES,
  REMINDER_TEXT_CAP,
  cleanReminder,
  isManagedReminder,
  reminderText,
} from './reminders.js'
