import * as React from 'react'

export type PanelKind = 'sessions' | 'desk' | 'chat'

const paths: Record<PanelKind, React.ReactNode> = {
  sessions: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M9 4v16M12 9h6M12 13h6" /></>,
  desk: <><path d="M3 19h18M4 15l4-5 4 3 5-7 3 2" /><circle cx="17" cy="6" r="1" /></>,
  chat: <><path d="M4 5h16v11H9l-5 4V5Z" /><path d="M8 9h8M8 12h5" /></>,
}

export function PanelIcon({ kind, size = 18 }: { kind: PanelKind; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[kind]}</svg>
}

export function FoldIcon({ direction }: { direction: 'left' | 'right' }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d={direction === 'left' ? 'M9 4v16m7-11-3 3 3 3' : 'M15 4v16m-7-11 3 3-3 3'} />
  </svg>
}

export function SearchIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /></svg>
}
