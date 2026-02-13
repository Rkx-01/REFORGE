import React from 'react'

interface Props {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

/**
 * BaseResumeLayout: The central Document Engineering wrapper.
 * Every template MUST use this as its root.
 * Enforces strict Document Engineering tokens by inheriting from .resume-page
 */
export function BaseResumeLayout({ children, className = '', style = {} }: Props) {
  return (
    <div 
      className={`base-resume-layout w-full h-full ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        // Default gap between sections is md (16px)
        gap: 'var(--space-md)',
        ...style
      }}
    >
      {children}
    </div>
  )
}
