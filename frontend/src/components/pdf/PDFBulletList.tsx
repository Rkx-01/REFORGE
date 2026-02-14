import React from 'react'

interface PDFBulletListProps {
  items: string[]
}

export function PDFBulletList({ items }: PDFBulletListProps) {
  if (!items || items.length === 0) return null

  return (
    <div style={{ marginTop: '4px' }}>
      {items.map((item, i) => (
        <div key={i} style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '6px',
          marginBottom: '3px',
          pageBreakInside: 'avoid',
          breakInside: 'avoid',
        }}>
          <span style={{
            minWidth: '10px',
            fontSize: '11px',
            color: '#555',
            lineHeight: '1.5',
            marginTop: '0px',
            fontWeight: '600',
            flexShrink: 0,
          }}>•</span>
          <span style={{
            fontSize: '11.5px',
            color: '#2d2d2d',
            lineHeight: '1.5',
            flex: 1,
          }}>{item}</span>
        </div>
      ))}
    </div>
  )
}
