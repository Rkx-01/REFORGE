import React from 'react'
import type { Resume } from '@/types'
import { BaseResumeLayout } from './shared/BaseResumeLayout'
import { Header } from './shared/Header'
import { Section } from './shared/Section'
import { ExperienceItem } from './shared/ExperienceItem'
import { ProjectItem } from './shared/ProjectItem'
import { EducationItem } from './shared/EducationItem'
import { SkillRow } from './shared/SkillRow'
import { CertificationItem } from './shared/CertificationItem'

export function Compact({ data }: { data: Resume }) {
  return (
    <BaseResumeLayout
      style={{
        /* Token override for high density */
        '--space-md': '8px',
        '--space-sm': '4px',
        '--space-xs': '2px',
        '--font-base': '12px',      /* Slightly smaller base text */
        '--font-heading': '13px',   /* Smaller headings */
        '--font-title': '22px',     /* Smaller name */
      } as React.CSSProperties}
    >
      <Header data={data} align="center" />

      {data.summary && (
        <Section title="Summary">
          <div style={{ lineHeight: 1.4, color: 'var(--color-text)' }}>
            {data.summary}
          </div>
        </Section>
      )}

      {data.experience.length > 0 && (
        <Section title="Experience">
          {data.experience.map((exp, i) => (
            <ExperienceItem key={i} data={exp} />
          ))}
        </Section>
      )}

      {data.projects.length > 0 && (
        <Section title="Projects">
          {data.projects.map((proj, i) => (
            <ProjectItem key={i} data={proj} />
          ))}
        </Section>
      )}

      {(data.skills.technical.length > 0 || data.skills.soft.length > 0) && (
        <Section title="Skills">
          {data.skills.technical.length > 0 && <SkillRow category="Technical" skills={data.skills.technical} />}
          {data.skills.soft.length > 0 && <SkillRow category="Professional" skills={data.skills.soft} />}
        </Section>
      )}

      {data.education.length > 0 && (
        <Section title="Education">
          {data.education.map((edu, i) => (
            <EducationItem key={i} data={edu} />
          ))}
        </Section>
      )}

      {data.certifications.length > 0 && (
        <Section title="Certifications">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
            {data.certifications.map((cert, i) => (
              <CertificationItem key={i} cert={cert} />
            ))}
          </div>
        </Section>
      )}
    </BaseResumeLayout>
  )
}

