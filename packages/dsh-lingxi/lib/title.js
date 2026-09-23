/**
 * dsh-lingxi — best-effort human title for a session id.
 *
 * Kept tiny and Defensive on purpose: every service it touches is optional
 * (the host may not have sessionTitle mounted), and a failed lookup returns
 * null instead of throwing — a title is a nicety, never a dependency.
 */
export function sessionTitleFor(ctx, sessionId) {
  if (ctx === undefined || ctx === null || sessionId === undefined || sessionId === null) return null
  const sessions = ctx.get('sessions')
  const session = sessions !== undefined && typeof sessions.get === 'function' ? sessions.get(sessionId) : undefined
  if (session === undefined || session === null) return null
  const titleSvc = ctx.get('sessionTitle')
  if (titleSvc === undefined || typeof titleSvc.get !== 'function') return null
  const snapshot = titleSvc.get(session)
  const title = snapshot?.title
  return typeof title === 'string' && title.trim() ? Array.from(title.trim()).slice(0, 60).join('') : null
}
