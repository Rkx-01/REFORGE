import React from 'react'
import type { Resume } from '@/types'

interface Props {
  data: Resume
  align?: 'left' | 'center'
}

export function Header({ data, align = 'center' }: Props) {
  const contact: string[] = []
  if (data.email) contact.push(data.email)
  if (data.phone) contact.push(data.phone)
  if (data.location) contact.push(data.location)
  if (data.linkedin) contact.push(data.linkedin)
  if (data.github) contact.push(data.github)

  return (
    <div 
      style={{
        textAlign: align,
        marginBottom: 'var(--space-md)',
      }}
    >
      <div 
        style={{
          fontSize: 'var(--font-title)',
          fontWeight: 800,
          letterSpacing: '0.02em',
          lineHeight: 1.2,
          color: 'var(--color-text)',
          marginBottom: 'var(--space-xs)',
          textTransform: 'uppercase'
        }}
      >
        {data.name}
      </div>
      <div 
        style={{
          fontSize: 'var(--font-base)',
          color: 'var(--color-subtext)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-sm)',
          justifyContent: align === 'center' ? 'center' : 'flex-start',
        }}
      >
        {contact.map((item, i) => (
          <React.Fragment key={i}>
            <span>{item}</span>
            {i < contact.length - 1 && <span>•</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
