import React from 'react'

interface SectionProps {
  title: string
  children: React.ReactNode
}

export function Section({ title, children }: SectionProps) {
  return (
    <section 
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 'var(--space-md)'
      }}
    >
      <div 
        style={{
          fontSize: 'var(--font-heading)',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: 'var(--color-text)',
          marginBottom: 'var(--space-sm)',
          borderBottom: '1px solid var(--color-border)',
          paddingBottom: '4px'
        }}
      >
        {title}
      </div>
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-sm)'
        }}
      >
        {children}
      </div>
    </section>
  )
}
