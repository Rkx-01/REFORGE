import React from 'react'
import type { Project } from '@/types'

export function ProjectItem({ data }: { data: Project }) {
  return (
    <div style={{ marginBottom: 'var(--space-xs)', breakInside: 'avoid', pageBreakInside: 'avoid' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 'var(--space-xs)' }}>
        <span style={{ fontWeight: 600, color: 'var(--color-text)', marginRight: '8px' }}>{data.name}</span>
        <span style={{ color: 'var(--color-subtext)', fontSize: 'calc(var(--font-base) - 1px)', fontStyle: 'italic' }}>
          {data.tech_stack.join(', ')}
        </span>
      </div>
      <div style={{ color: 'var(--color-text)', lineHeight: 1.5 }}>
        {data.description}
      </div>
    </div>
  )
}
