import React from 'react'
import type { Resume } from '@/types'
import { PDFHeader } from './PDFHeader'
import { PDFSection } from './PDFSection'
import { PDFBulletList } from './PDFBulletList'

interface ResumePDFLayoutProps {
  data: Resume
}

/**
 * Dedicated print-only layout for PDF export.
 * Uses ONLY inline styles — no Tailwind, no animations, no screen UI.
 * Designed to A4 width (794px) with controlled margins and typography.
 */
export function ResumePDFLayout({ data }: ResumePDFLayoutProps) {
  return (
    <div
      style={{
        width: '100%',
        background: '#ffffff',
        fontFamily: 'Inter, Arial, Helvetica, sans-serif',
        fontSize: '12px',
        lineHeight: '1.5',
        color: '#1a1a1a',
        boxSizing: 'border-box',
      }}
    >
      {/* ── HEADER ─────────────────────────────────── */}
      <PDFHeader data={data} />

      {/* ── SUMMARY ────────────────────────────────── */}
      {data.summary && (
        <PDFSection title="Summary">
          <p style={{ fontSize: '11.5px', color: '#3a3a3a', lineHeight: '1.55', margin: 0 }}>
            {data.summary}
          </p>
        </PDFSection>
      )}

      {/* ── EXPERIENCE ─────────────────────────────── */}
      {data.experience && data.experience.length > 0 && (
        <PDFSection title="Work Experience">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {data.experience.map((exp, i) => (
              <div key={i} style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
                {/* Title + Duration */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#111' }}>{exp.title}</span>
                  <span style={{ fontSize: '10.5px', color: '#666', fontWeight: '600', whiteSpace: 'nowrap', marginLeft: '8px' }}>{exp.duration}</span>
                </div>
                {/* Company + Location */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3px' }}>
                  <span style={{ fontSize: '11px', color: '#444', fontWeight: '600' }}>{exp.company}</span>
                  {exp.location && <span style={{ fontSize: '10.5px', color: '#888', marginLeft: '8px' }}>{exp.location}</span>}
                </div>
                {/* Bullets */}
                <PDFBulletList items={exp.bullets} />
              </div>
            ))}
          </div>
        </PDFSection>
      )}

      {/* ── SKILLS ─────────────────────────────────── */}
      {(data.skills?.technical?.length > 0 || data.skills?.soft?.length > 0) && (
        <PDFSection title="Skills">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {data.skills.technical.length > 0 && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#111', whiteSpace: 'nowrap', minWidth: '72px' }}>Technical:</span>
                <span style={{ fontSize: '11px', color: '#3a3a3a', lineHeight: '1.5' }}>{data.skills.technical.join(', ')}</span>
              </div>
            )}
            {data.skills.soft.length > 0 && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#111', whiteSpace: 'nowrap', minWidth: '72px' }}>Soft Skills:</span>
                <span style={{ fontSize: '11px', color: '#3a3a3a', lineHeight: '1.5' }}>{data.skills.soft.join(', ')}</span>
              </div>
            )}
          </div>
        </PDFSection>
      )}

      {/* ── PROJECTS ───────────────────────────────── */}
      {data.projects && data.projects.length > 0 && (
        <PDFSection title="Projects">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {data.projects.map((proj, i) => (
              <div key={i} style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#111' }}>{proj.name}</span>
                  {proj.tech_stack && proj.tech_stack.length > 0 && (
                    <span style={{ fontSize: '10px', color: '#666', fontStyle: 'italic', marginLeft: '8px' }}>
                      {proj.tech_stack.slice(0, 4).join(' · ')}
                    </span>
                  )}
                </div>
                {proj.description && (
                  <PDFBulletList items={[proj.description]} />
                )}
              </div>
            ))}
          </div>
        </PDFSection>
      )}

      {/* ── EDUCATION ──────────────────────────────── */}
      {data.education && data.education.length > 0 && (
        <PDFSection title="Education">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.education.map((edu, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#111' }}>{edu.degree}</div>
                  <div style={{ fontSize: '11px', color: '#555' }}>{edu.institution}</div>
                  {edu.relevant_courses && edu.relevant_courses.length > 0 && (
                    <div style={{ fontSize: '10.5px', color: '#777', marginTop: '2px' }}>
                      Relevant Courses: {edu.relevant_courses.join(', ')}
                    </div>
                  )}
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '8px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#555' }}>{edu.year}</div>
                  {edu.gpa && <div style={{ fontSize: '10.5px', color: '#777' }}>GPA: {edu.gpa}</div>}
                </div>
              </div>
            ))}
          </div>
        </PDFSection>
      )}

      {/* ── CERTIFICATIONS ─────────────────────────── */}
      {data.certifications && data.certifications.length > 0 && (
        <PDFSection title="Certifications">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 32px' }}>
            {data.certifications.map((cert, i) => (
              <div key={i} style={{ fontSize: '11px', color: '#3a3a3a' }}>
                <span style={{ fontWeight: '600' }}>{typeof cert === 'string' ? cert : cert.name}</span>
                {typeof cert !== 'string' && cert.issuer && (
                  <span style={{ color: '#777' }}> — {cert.issuer}</span>
                )}
              </div>
            ))}
          </div>
        </PDFSection>
      )}
    </div>
  )
}
