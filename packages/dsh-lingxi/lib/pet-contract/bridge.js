/**
 * dsh-pets — the localhost bridge client.
 *
 * Every desktop pet on this machine speaks the same tiny HTTP bridge:
 * 127.0.0.1:<port>, Bearer token from a 0600 file, JSON in and out. The
 * bridge is the pet's app process; it comes and goes with the app, which is
 * why NOTHING in here throws on a dead bridge — an unreachable pet is a
 * normal Tuesday, and a companion that crashes the agent's tool call because
 * the app was quit has its priorities backwards.
 */
import { readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { cleanTaskEvent } from './vocab.js'
import { cleanReminder } from './reminders.js'

/** The lingxi app's default bridge port. */
export const DEFAULT_BRIDGE_PORT = 47811

/** Where the app writes its 0600 bridge token (macOS app-group convention). */
export const DEFAULT_TOKEN_PATH = join(
  homedir(),
  'Library',
  'Application Support',
  'com.dushaobin.lingxi-desktop',
  'bridge-token',
)

/** Hard timeout per call: the pet shares attention with someone working. */
const REQUEST_TIMEOUT_MS = 3000

/**
 * One bridge connection. Cheap to construct, safe to hold for the process
 * lifetime; the token is re-read on demand so an app restart that rotates it
 * does not strand the plugin.
 */
export class PetBridge {
  /**
   * @param {object} [options]
   * @param {number} [options.port]
   * @param {string} [options.tokenPath] - overrides the default token file.
   * @param {string} [options.token] - explicit token (tests); skips the file.
   * @param {typeof fetch} [options.fetchImpl] - injectable for tests.
   */
  constructor(options = {}) {
    this.port = Number.isInteger(options.port) ? options.port : DEFAULT_BRIDGE_PORT
    this.tokenPath = typeof options.tokenPath === 'string' && options.tokenPath ? options.tokenPath : DEFAULT_TOKEN_PATH
    this.token = typeof options.token === 'string' ? options.token : null
    this.fetchImpl = options.fetchImpl || fetch
  }

  get baseUrl() {
    return `http://127.0.0.1:${this.port}`
  }

  /** The token file, or null. Missing file = bridge not installed / not run yet. */
  readToken() {
    if (this.token !== null) return this.token
    try {
      const token = readFileSync(this.tokenPath, 'utf8').trim()
      return token || null
    } catch {
      return null
    }
  }

  /**
   * One authenticated call. Resolves to a result object, never throws:
   *  - { ok: true, status, data }              — the bridge answered with JSON
   *  - { ok: false, status, data, error? }     — the bridge answered with an error
   *  - { ok: false, unreachable: true, error } — app not running / transport died
   */
  async request(method, path, body) {
    const headers = { 'Content-Type': 'application/json' }
    const token = this.readToken()
    if (token) headers.Authorization = `Bearer ${token}`
    let response
    try {
      response = await this.fetchImpl(this.baseUrl + path, {
        method,
        headers,
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      })
    } catch (error) {
      return { ok: false, unreachable: true, error: error instanceof Error ? error.message : String(error) }
    }
    let data = null
    try {
      data = await response.json()
    } catch {
      data = null
    }
    if (!response.ok) {
      const message = data && typeof data === 'object' && typeof data.error === 'string' ? data.error : `HTTP ${response.status}`
      return { ok: false, status: response.status, data, error: message }
    }
    return { ok: true, status: response.status, data }
  }

  /** GET /health — the one unauthenticated endpoint; "is the pet app up". */
  async health() {
    return this.request('GET', '/health')
  }

  /** GET /integration — the live contract the app serves about itself. */
  async integration() {
    return this.request('GET', '/integration')
  }

  /** GET /perception — what the pet is doing right now. */
  async perception() {
    return this.request('GET', '/perception')
  }

  /** GET /agents — the agent identity registry the pet shows badges for. */
  async agents() {
    return this.request('GET', '/agents')
  }

  /** POST /agents — upsert this plugin's identity (badge, color, name). Idempotent. */
  async registerAgent(identity) {
    return this.request('POST', '/agents', identity)
  }

  /** POST /task-event with a vocabulary-validated event. agent defaults to the provider identity. */
  async taskEvent(event, provider) {
    const clean = cleanTaskEvent({ agent: provider, ...event }, provider)
    if (clean === null) return { ok: false, error: 'event has no state the pet knows' }
    return this.request('POST', '/task-event', clean)
  }

  /** POST /control — one stage action ({say}, {expression}, {action}, …). */
  async control(action) {
    return this.request('POST', '/control', action)
  }

  /** POST /memory — persist one fact about the user on the pet's side. */
  async memory(entry) {
    return this.request('POST', '/memory', entry)
  }

  /**
   * POST /reminders — one timed nudge. Accepts the declarative shape
   * ({title, detail?, everyMinutes?, inMinutes?}) and validates it through
   * the reminder boundary first; junk entries are refused WITHOUT touching
   * the wire (the pet app would silently truncate what it half-understands).
   */
  async remind(entry) {
    const clean = cleanReminder(entry)
    if (clean === null) return { ok: false, error: 'reminder has nothing the pet can act on' }
    return this.request('POST', '/reminders', clean)
  }

  /** GET /reminders — the pet's live reminder list (managed entries carry the marker text). */
  async reminders() {
    return this.request('GET', '/reminders')
  }

  /** DELETE /reminders/:id — cancel one. 404 is a normal answer, not an error. */
  async removeReminder(id) {
    const clean = typeof id === 'string' && id ? id : null
    if (!clean) return { ok: false, error: 'reminder id required' }
    return this.request('DELETE', `/reminders/${encodeURIComponent(clean)}`)
  }
}
