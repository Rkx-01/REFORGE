import React from 'react'
import type { Resume } from '@/types'

interface PDFHeaderProps {
  data: Resume
}

export function PDFHeader({ data }: PDFHeaderProps) {
  const contactLine1 = [data.email, data.phone, data.location].filter(Boolean).join(' | ')
  const links = [
    data.linkedin && { label: 'LinkedIn', href: data.linkedin },
    data.github && { label: 'GitHub', href: data.github },
  ].filter(Boolean) as { label: string; href: string }[]

  return (
    <div style={{
      borderBottom: '2px solid #1a1a1a',
      paddingBottom: '10px',
      marginBottom: '14px',
    }}>
      {/* Name */}
      <div style={{
        fontSize: '24px',
        fontWeight: '700',
        color: '#0f0f0f',
        letterSpacing: '-0.3px',
        marginBottom: '4px',
        lineHeight: '1.2',
      }}>
        {data.name}
      </div>

      {/* Contact: Email | Phone | Location */}
      {contactLine1 && (
        <div style={{
          fontSize: '11px',
          color: '#444',
          letterSpacing: '0.01em',
          marginBottom: '2px',
        }}>
          {contactLine1}
        </div>
      )}

      {/* Links: LinkedIn | GitHub */}
      {links.length > 0 && (
        <div style={{ fontSize: '11px', color: '#444' }}>
          {links.map((l, i) => (
            <span key={l.label}>
              {i > 0 && <span style={{ margin: '0 6px', color: '#bbb' }}>|</span>}
              <span style={{ color: '#1a56db', textDecoration: 'underline' }}>{l.label}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
