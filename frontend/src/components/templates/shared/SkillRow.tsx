import React from 'react'

interface Props {
  category: string
  skills: string[]
}

export function SkillRow({ category, skills }: Props) {
  return (
    <div style={{ display: 'flex', marginBottom: 'var(--space-xs)', breakInside: 'avoid', pageBreakInside: 'avoid' }}>
      <span style={{ fontWeight: 600, width: '130px', flexShrink: 0, color: 'var(--color-text)' }}>
        {category}:
      </span>
      <span style={{ color: 'var(--color-text)', lineHeight: 1.5 }}>
        {skills.join(', ')}
      </span>
    </div>
  )
}
