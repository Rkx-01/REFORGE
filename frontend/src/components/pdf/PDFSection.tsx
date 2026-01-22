import React from 'react'

interface PDFSectionProps {
  title: string
  children: React.ReactNode
}

export function PDFSection({ title, children }: PDFSectionProps) {
  return (
    <div style={{ marginBottom: '14px', pageBreakInside: 'avoid', breakInside: 'avoid' }}>
      {/* Section Heading */}
      <div style={{
        fontSize: '10px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        color: '#111',
        borderBottom: '1.5px solid #d1d5db',
        paddingBottom: '3px',
        marginBottom: '8px',
      }}>
        {title}
      </div>
      {children}
    </div>
  )
}
