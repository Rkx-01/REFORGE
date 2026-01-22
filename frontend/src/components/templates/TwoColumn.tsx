import React from 'react'
import type { Resume } from '@/types'
import { BaseResumeLayout } from './shared/BaseResumeLayout'
import { Header } from './shared/Header'
import { Section } from './shared/Section'
import { ExperienceItem } from './shared/ExperienceItem'
import { ProjectItem } from './shared/ProjectItem'
import { CertificationItem } from './shared/CertificationItem'

export function TwoColumn({ data }: { data: Resume }) {
  return (
    <BaseResumeLayout
      style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        gap: 0,
        padding: 0 // Remove the BaseResumeLayout padding because we want full height sidebar
      }}
    >
      {/* Sidebar - Skill & Contact focused */}
      <aside 
        style={{
          backgroundColor: '#1e293b', // slate-800
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-md)',
          // Dark mode token overrides for the sidebar!
          // The atomic components will automatically adjust to these new colors natively
          '--color-text': '#ffffff',
          '--color-subtext': '#94a3b8',
          '--color-border': '#334155',
        } as React.CSSProperties}
      >
        {/* Name and Contact Information */}
        <Header data={data} align="left" />
        
        {(data.skills.technical.length > 0 || data.skills.soft.length > 0) && (
          <Section title="Expertise">
            {data.skills.technical.length > 0 && (
              <div style={{ marginBottom: 'var(--space-xs)' }}>
                <div style={{ fontWeight: 600, color: 'var(--color-text)', marginBottom: '4px' }}>Technical</div>
                <div style={{ color: 'var(--color-subtext)', lineHeight: 1.4 }}>{data.skills.technical.join(', ')}</div>
              </div>
            )}
            {data.skills.soft.length > 0 && (
              <div style={{ marginBottom: 'var(--space-xs)' }}>
                <div style={{ fontWeight: 600, color: 'var(--color-text)', marginBottom: '4px' }}>Professional</div>
                <div style={{ color: 'var(--color-subtext)', lineHeight: 1.4 }}>{data.skills.soft.join(', ')}</div>
              </div>
            )}
          </Section>
        )}

        {data.education.length > 0 && (
          <Section title="Education">
            {data.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: 'var(--space-sm)' }}>
                <div style={{ fontWeight: 600, color: 'var(--color-text)' }}>{edu.degree}</div>
                <div style={{ color: 'var(--color-subtext)', fontSize: 'calc(var(--font-base) - 1px)', marginTop: '2px' }}>{edu.institution}</div>
                <div style={{ color: 'var(--color-subtext)', fontSize: 'calc(var(--font-base) - 2px)', marginTop: '2px', fontStyle: 'italic' }}>
                  {edu.year} {edu.gpa && `| GPA: ${edu.gpa}`}
                </div>
              </div>
            ))}
          </Section>
        )}

        {data.certifications.length > 0 && (
          <Section title="Certifications">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
              {data.certifications.map((cert, i) => (
                <div key={i} style={{ color: 'var(--color-subtext)', fontSize: 'calc(var(--font-base) - 1px)', lineHeight: 1.3 }}>
                  <CertificationItem cert={cert} />
                </div>
              ))}
            </div>
          </Section>
        )}
      </aside>

      {/* Main Content */}
      <main 
        style={{
          flex: 1,
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-md)'
        }}
      >
        {data.summary && (
          <Section title="Professional Narrative">
            <div style={{ lineHeight: 1.5, color: 'var(--color-text)' }}>
              {data.summary}
            </div>
          </Section>
        )}

        {data.experience.length > 0 && (
          <Section title="Work Experience">
            {data.experience.map((exp, i) => (
              <ExperienceItem key={i} data={exp} />
            ))}
          </Section>
        )}

        {data.projects.length > 0 && (
          <Section title="High-Impact Projects">
            {data.projects.map((proj, i) => (
              <ProjectItem key={i} data={proj} />
            ))}
          </Section>
        )}
      </main>
    </BaseResumeLayout>
  )
}

