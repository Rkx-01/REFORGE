import React from 'react'
import type { Education } from '@/types'

export function EducationItem({ data }: { data: Education }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-xs)', alignItems: 'flex-start', breakInside: 'avoid', pageBreakInside: 'avoid' }}>
      <div>
        <div style={{ fontWeight: 600, color: 'var(--color-text)' }}>{data.institution}</div>
        <div style={{ color: 'var(--color-text)' }}>{data.degree}</div>
        {data.gpa && <div style={{ color: 'var(--color-subtext)', fontSize: 'calc(var(--font-base) - 1px)', marginTop: '2px' }}>GPA: {data.gpa}</div>}
      </div>
      <div style={{ color: 'var(--color-text)', fontSize: 'var(--font-base)', whiteSpace: 'nowrap' }}>
        {data.year}
      </div>
    </div>
  )
}
