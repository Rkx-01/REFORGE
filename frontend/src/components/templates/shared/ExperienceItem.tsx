import React from 'react'
import type { Experience } from '@/types'

export function ExperienceItem({ data }: { data: Experience }) {
  return (
    <div style={{ marginBottom: 'var(--space-xs)', breakInside: 'avoid', pageBreakInside: 'avoid' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-xs)' }}>
        <div>
          <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>{data.title}</span>
          <span style={{ margin: '0 6px', color: 'var(--color-subtext)' }}>|</span>
          <span style={{ color: 'var(--color-text)', fontWeight: 500 }}>{data.company}</span>
        </div>
        <div style={{ color: 'var(--color-text)', fontSize: 'var(--font-base)', whiteSpace: 'nowrap' }}>
          {data.duration}
        </div>
      </div>
      <ul style={{ paddingLeft: '18px', margin: 0, color: 'var(--color-text)' }}>
        {data.bullets.map((b, i) => (
          <li key={i} style={{ marginBottom: '2px', lineHeight: 1.5 }}>{b}</li>
        ))}
      </ul>
    </div>
  )
}
