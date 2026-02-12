import React from 'react'
import type { Resume, TemplateId } from '@/types'
import { ModernProfessional } from '../templates/ModernProfessional'
import { ClassicCorporate } from '../templates/ClassicCorporate'
import { Compact } from '../templates/Compact'
import { TwoColumn } from '../templates/TwoColumn'
import { TechMinimal } from '../templates/TechMinimal'
import { OriginalStyle } from '../templates/OriginalStyle'

interface Props {
  data: Resume
  templateId: TemplateId
}

export function ResumePDFLayout({ data, templateId }: Props) {
  const templates: Record<TemplateId, React.ReactNode> = {
    modern: <ModernProfessional data={data} />,
    corporate: <ClassicCorporate data={data} />,
    compact: <Compact data={data} />,
    twocolumn: <TwoColumn data={data} />,
    tech: <TechMinimal data={data} />,
    original: <OriginalStyle data={data} />,
  }

  return (
    <div className="resume-container">
      {templates[templateId]}
    </div>
  )
}
