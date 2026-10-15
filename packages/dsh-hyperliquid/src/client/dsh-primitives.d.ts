declare module '@deepseek-ai/dsh-client-ui-primitives' {
  import type { ReactNode, KeyboardEventHandler } from 'react'
  export function Modal(props: {
    open: boolean
    onClose: () => void
    title: string
    closeLabel?: string
    description?: string
    children?: ReactNode
    footer?: ReactNode
    className?: string
    contentClassName?: string
    onKeyDownCapture?: KeyboardEventHandler<HTMLDivElement>
    headless?: boolean
    backdropBlur?: boolean
  }): ReactNode
}
