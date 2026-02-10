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

export function ModernProfessional({ data }: { data: Resume }) {
  return (
    <BaseResumeLayout>
      {/* 1. Header is left aligned for Modern Professional */}
      <Header data={data} align="left" />

      {/* 2. Summary */}
      {data.summary && (
        <Section title="Professional Summary">
          <div style={{ lineHeight: 1.5, color: 'var(--color-text)' }}>
            {data.summary}
          </div>
        </Section>
      )}

      {/* 3. Experience */}
      {data.experience.length > 0 && (
        <Section title="Experience">
          {data.experience.map((exp, i) => (
            <ExperienceItem key={i} data={exp} />
          ))}
        </Section>
      )}

      {/* 4. Projects */}
      {data.projects.length > 0 && (
        <Section title="Projects">
          {data.projects.map((proj, i) => (
            <ProjectItem key={i} data={proj} />
          ))}
        </Section>
      )}

      {/* 5. Skills */}
      {(data.skills.technical.length > 0 || data.skills.soft.length > 0) && (
        <Section title="Skills">
          {data.skills.technical.length > 0 && <SkillRow category="Technical" skills={data.skills.technical} />}
          {data.skills.soft.length > 0 && <SkillRow category="Professional" skills={data.skills.soft} />}
        </Section>
      )}

      {/* 6. Education */}
      {data.education.length > 0 && (
        <Section title="Education">
          {data.education.map((edu, i) => (
            <EducationItem key={i} data={edu} />
          ))}
        </Section>
      )}

      {/* 7. Certifications */}
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

