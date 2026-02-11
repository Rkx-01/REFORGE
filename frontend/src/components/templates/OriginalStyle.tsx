import React from 'react'
import type { Resume } from '@/types'
import { Section } from './shared/Section'
import { BulletList } from './shared/BulletList'
import { CertificationItem } from './shared/CertificationItem'

export function OriginalStyle({ data }: { data: Resume }) {
  const contact = [
    data.email,
    data.phone,
    data.location,
    data.linkedin && 'LinkedIn',
    data.github && 'GitHub'
  ].filter(Boolean)

  return (
    <div className="bg-white p-12 shadow-sm min-h-[1100px] font-sans text-slate-900 printable max-w-[850px] mx-auto">
      {/* Standard Left-Aligned Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-black border-b border-gray-200 pb-2 mb-3">{data.name}</h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-slate-600 font-medium">
          {contact.map((item, i) => (
            <React.Fragment key={i}>
              {item === 'LinkedIn' ? (
                <a href={data.linkedin} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">{item}</a>
              ) : item === 'GitHub' ? (
                <a href={data.github} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">{item}</a>
              ) : (
                <span>{item}</span>
              )}
              {i < contact.length - 1 && <span className="opacity-30">|</span>}
            </React.Fragment>
          ))}
        </div>
      </header>

      {/* Summary */}
      <div className="mb-8">
        <Section title="Summary">
          <p className="text-[14px] leading-relaxed text-slate-800">
            {data.summary}
          </p>
        </Section>
      </div>

      <div className="space-y-8">
        {/* Experience */}
        {data.experience.length > 0 && (
          <Section title="Work Experience">
            <div className="space-y-6">
              {data.experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-[15px] font-bold text-black">{exp.title}</h3>
                    <span className="text-[13px] text-slate-600 font-medium">{exp.duration}</span>
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-[14px] font-semibold text-slate-700">{exp.company}</span>
                    <span className="text-[13px] text-slate-500 italic">{exp.location}</span>
                  </div>
                  <BulletList items={exp.bullets} className="text-[14px] text-slate-800 space-y-1" />
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Skills */}
        <Section title="Skills">
          <div className="space-y-2">
            <div className="text-[14px]">
              <span className="font-bold text-slate-700 mr-2">Technical:</span>
              <span className="text-slate-800">{data.skills.technical.join(', ')}</span>
            </div>
            <div className="text-[14px]">
              <span className="font-bold text-slate-700 mr-2">Professional:</span>
              <span className="text-slate-800">{data.skills.soft.join(', ')}</span>
            </div>
          </div>
        </Section>

        {/* Projects */}
        {data.projects.length > 0 && (
          <Section title="Projects">
            <div className="space-y-5">
              {data.projects.map((proj, i) => (
                <div key={i}>
                  <div className="flex flex-wrap gap-2 items-center mb-1">
                    <h3 className="text-[15px] font-bold text-black">{proj.name}</h3>
                    <div className="flex gap-1.5 overflow-hidden">
                      {proj.tech_stack.map((tech, ti) => (
                        <span key={ti} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-[14px] text-slate-700 leading-relaxed">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <Section title="Education">
            <div className="space-y-4">
              {data.education.map((edu, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="text-[15px] font-bold text-black">{edu.degree}</h3>
                    <span className="text-[13px] text-slate-600">{edu.year}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <p className="text-[14px] text-slate-800 font-medium">{edu.institution}</p>
                    {edu.gpa && <p className="text-[12px] text-slate-500">GPA: {edu.gpa}</p>}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}
        {/* Certifications */}
        {data.certifications.length > 0 && (
          <Section title="Certifications">
             <div className="space-y-1">
                {data.certifications.map((cert, i) => (
                  <div key={i} className="text-[14px] text-slate-800 flex items-center gap-2">
                    <span className="text-blue-500">•</span>
                    <CertificationItem cert={cert} />
                  </div>
                ))}
             </div>
          </Section>
        )}
      </div>

    </div>
  )
}
