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

export function ClassicCorporate({ data }: { data: Resume }) {
  return (
    <BaseResumeLayout>
      {/* Centered Header for Classic Corporate */}
      <Header data={data} align="center" />

      {/* Profile */}
      {data.summary && (
        <Section title="Professional Profile">
          <div style={{ lineHeight: 1.5, color: 'var(--color-text)', textAlign: 'justify' }}>
            {data.summary}
          </div>
        </Section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <Section title="Professional Experience">
          {data.experience.map((exp, i) => (
            <ExperienceItem key={i} data={exp} />
          ))}
        </Section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <Section title="Key Projects">
          {data.projects.map((proj, i) => (
            <ProjectItem key={i} data={proj} />
          ))}
        </Section>
      )}

      {/* Skills */}
      {(data.skills.technical.length > 0 || data.skills.soft.length > 0) && (
        <Section title="Core Competencies">
          {data.skills.technical.length > 0 && <SkillRow category="Technical" skills={data.skills.technical} />}
          {data.skills.soft.length > 0 && <SkillRow category="Professional" skills={data.skills.soft} />}
        </Section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <Section title="Academic Background">
          {data.education.map((edu, i) => (
            <EducationItem key={i} data={edu} />
          ))}
        </Section>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <Section title="Certifications & Credentials">
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

