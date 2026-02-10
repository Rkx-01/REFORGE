'use client'

import { useState } from 'react'
import type { Resume, TemplateId } from '@/types'
import { ModernProfessional } from '../templates/ModernProfessional'
import { ClassicCorporate } from '../templates/ClassicCorporate'
import { Compact } from '../templates/Compact'
import { TwoColumn } from '../templates/TwoColumn'
import { TechMinimal } from '../templates/TechMinimal'
import { OriginalStyle } from '../templates/OriginalStyle'
import { RefinedTextView } from './RefinedTextView'
import { CoverLetterView } from '../cover-letter/CoverLetterView'
import { ResumePDFLayout } from './ResumePDFLayout'

interface Props {
  data: Resume
  templateId: TemplateId
  onRegenerate: () => void
  onChangeTemplate: () => void
  coverLetter: string | null
  onGenerateCL: () => void
  clLoading: boolean
  error: string | null
}

export function ResumeOutput({
  data,
  templateId,
  onRegenerate,
  onChangeTemplate,
  coverLetter,
  onGenerateCL,
  clLoading,
  error
}: Props) {
  const [view, setView] = useState<'resume' | 'cl' | 'text'>('resume')
  const kw = data.keywords_injected ?? []
  function handlePrint() {
    window.print()
  }

  function copyText() {
    const lines: string[] = [
      data.name, '',
      [data.email, data.phone, data.location, data.linkedin, data.github].filter(Boolean).join(' | '),
      '', 'SUMMARY', data.summary, '',
      'TECHNICAL: ' + data.skills.technical.join(', '),
      'PROFESSIONAL: ' + data.skills.soft.join(', '), '',
    ]
    data.experience.forEach(ex => {
      lines.push(`${ex.title} — ${ex.company} | ${ex.duration}`)
      ex.bullets.forEach(b => lines.push('• ' + b))
      lines.push('')
    })
    data.education.forEach(ed => lines.push(`${ed.degree}, ${ed.institution} (${ed.year})`, ''))
    data.projects.forEach(p => { lines.push(p.name, p.description, p.tech_stack.join(', '), '') })
    navigator.clipboard.writeText(lines.join('\n'))
  }

  const templates: Record<TemplateId, React.ReactNode> = {
    modern: <ModernProfessional data={data} />,
    corporate: <ClassicCorporate data={data} />,
    compact: <Compact data={data} />,
    twocolumn: <TwoColumn data={data} />,
    tech: <TechMinimal data={data} />,
    original: <OriginalStyle data={data} />,
  }

  return (
    <div className="result-wrap">
      {/* ── NATIVE PRINT CONTAINER ── */}
      <div id="print-root">
        <div className="pdf-layout-container">
          {view === 'resume' ? (
            <div className="resume-page">
              <ResumePDFLayout data={data} templateId={templateId} />
            </div>
          ) : view === 'cl' && coverLetter ? (
            <div className="cl-view printable">
              <div className="cl-paper">
                <div className="cl-hdr">
                  <div className="cl-stamp">CL // {data.name.toUpperCase()}</div>
                  <div className="cl-date">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                </div>
                <div className="cl-body">
                  {coverLetter.split('\n\n').map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="cl-footer">
                  <div className="cl-sign">Sincerely,</div>
                  <div className="cl-name">{data.name}</div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="result-hdr no-print">
        <div className="result-left">
          <button
            className={`btn btn-sm ${view === 'resume' ? 'btn-red' : 'btn-ghost'}`}
            onClick={() => setView('resume')}
          >
            Resume
          </button>
          <button
            className={`btn btn-sm ${view === 'cl' ? 'btn-red' : 'btn-ghost'}`}
            onClick={() => {
              setView('cl')
              if (!coverLetter && !clLoading) onGenerateCL()
            }}
          >
            Cover Letter
          </button>
          <button
            className={`btn btn-sm ${view === 'text' ? 'btn-red' : 'btn-ghost'}`}
            onClick={() => setView('text')}
          >
            Refined Text
          </button>
          <span className="badge badge-kw">{kw.length} keywords injected</span>
        </div>
        <div className="result-actions">
          {(view === 'resume' || view === 'cl') && (
            <button
              type="button"
              className="btn btn-red btn-sm"
              onClick={handlePrint}
              disabled={view === 'cl' && !coverLetter}
            >
              Download PDF Export
            </button>
          )}
          {view === 'resume' && (
            <>
              <button className="btn btn-ghost btn-sm" onClick={copyText}>Copy Content</button>
              <button className="btn btn-ghost btn-sm" onClick={onChangeTemplate}>Style Picker</button>
            </>
          )}
          <button className="btn btn-ghost btn-sm" onClick={onRegenerate}>↺ Restart</button>
        </div>
      </div>

      <div className="result-content no-print">
        {view === 'resume' ? (
          <div key={templateId} className="template-transition-wrap resume-layer">
            <div className="resume-page">
              {templates[templateId]}
            </div>
          </div>
        ) : view === 'text' ? (
          <RefinedTextView data={data} />
        ) : (
          <div className="flex flex-col items-center">
            {error && view === 'cl' && (
              <div className="error-msg mb-6 max-w-[600px] text-center">
                <p className="font-bold underline mb-1 uppercase tracking-tighter">AI Service Interruption</p>
                {error}
              </div>
            )}
            <CoverLetterView text={coverLetter || ''} name={data.name} loading={clLoading} />
          </div>
        )}
      </div>
    </div>
  )
}