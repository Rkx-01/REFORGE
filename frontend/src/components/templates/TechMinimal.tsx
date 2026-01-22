import React from 'react'
import type { Resume } from '@/types'
import { Section } from './shared/Section'
import { BulletList } from './shared/BulletList'
import { CertificationItem } from './shared/CertificationItem'

export function TechMinimal({ data }: { data: Resume }) {
  return (
    <div className="tech-layout font-mono text-slate-800">
      {/* Dev Header */}
      <header className="resume-header !flex-col !items-center">
        <div className="text-[12px] font-mono text-emerald-600 mb-2 tracking-[0.2em] font-bold px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
          SYSTEM.ROOT.USER: {data.name.split(' ').join('_').toUpperCase()}
        </div>
        <h1 className="resume-name !text-slate-900 !uppercase tracking-tight">
          {data.name}
        </h1>
        <div className="resume-contact !justify-center gap-x-6 border-y border-slate-100 py-3 w-full">
          <span>{data.email}</span>
          <span>{data.phone}</span>
          <span>{data.location}</span>
          {data.github && <a href={data.github} target="_blank" rel="noreferrer" className="text-slate-900 hover:text-emerald-600 underline underline-offset-4">GITHUB</a>}
          {data.linkedin && <a href={data.linkedin} target="_blank" rel="noreferrer" className="text-slate-900 hover:text-emerald-600 underline underline-offset-4">LINKEDIN</a>}
        </div>
      </header>

      {/* Core Summary */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 italic relative overflow-hidden group mb-8">
        <div className="absolute top-0 right-0 p-2 text-[10px] text-slate-300 font-bold tracking-widest opacity-20 group-hover:opacity-100 transition-opacity uppercase">
          ExecutiveSummary.v1
        </div>
        <div className="resume-summary !text-slate-700 font-medium relative z-10">
          {data.summary}
        </div>
      </div>

      {/* Technology Stack */}
      <Section title="Technology Stack">
        <div className="flex flex-wrap gap-2 mt-2">
          {data.skills.technical.map(skill => (
            <span key={skill} className="px-3 py-1.5 bg-white border-2 border-slate-200 text-slate-900 text-[12px] font-black group hover:border-emerald-500 hover:text-emerald-600 transition-all cursor-default">
              {`> ${skill}`}
            </span>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-slate-500 italic font-medium">
           <span className="text-slate-300 uppercase font-black not-italic text-[10px] tracking-widest leading-6">Also Proficient In:</span>
           {data.skills.soft.join(' · ')}
        </div>
      </Section>

      {/* Projects */}
      {data.projects.length > 0 && (
        <Section title="Core Projects">
          {data.projects.map((proj, i) => (
            <div key={i} className="resume-item !border-l-4 border-slate-900 pl-6 py-1 group hover:border-emerald-500 transition-colors">
              <div className="resume-item-header">
                <h3 className="resume-item-title !text-lg !font-black text-slate-900 group-hover:text-emerald-600 transition-colors underline decoration-slate-200 decoration-2 underline-offset-4">{proj.name}</h3>
                <span className="resume-item-subtitle !font-bold bg-slate-900 text-white px-2 py-0.5 rounded uppercase tracking-tighter">
                  {proj.tech_stack.slice(0, 2).join(' + ')}
                </span>
              </div>
              <div className="resume-summary !text-left !text-slate-600 font-medium my-2">
                {proj.description}
              </div>
              <div className="flex gap-4 text-[11px] font-bold text-slate-400">
                <span># ProjectInstance_{i+1}</span>
                <span>{proj.tech_stack.join(' | ')}</span>
              </div>
            </div>
          ))}
        </Section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <Section title="Experience Log">
          {data.experience.map((exp, i) => (
            <div key={i} className="resume-item">
              <div className="resume-item-header border-b border-slate-50 pb-2 mb-3">
                <div>
                  <h3 className="resume-item-title !font-black !uppercase tracking-tight">{exp.title}</h3>
                  <p className="text-[13px] font-bold text-emerald-600">@ {exp.company}</p>
                </div>
                <div className="text-right">
                  <span className="resume-item-subtitle !font-black !text-slate-400">{exp.duration}</span>
                  <p className="text-[11px] text-slate-300 uppercase tracking-widest mt-0.5 font-bold">{exp.location}</p>
                </div>
              </div>
              <BulletList items={exp.bullets} className="!text-slate-700 font-medium" />
            </div>
          ))}
        </Section>
      )}

      {/* Education & Certs */}
      <div className="grid grid-cols-2 gap-12">
         {data.education.length > 0 && (
           <Section title="Education">
             {data.education.map((edu, i) => (
               <div key={i} className="resume-item !mb-4">
                 <p className="text-[13px] font-black text-slate-900 uppercase tracking-tighter">{edu.degree}</p>
                 <p className="text-[12px] text-slate-500 italic mt-1 font-bold">{edu.institution}</p>
                 <p className="text-[11px] text-slate-400 mt-2 font-black">{edu.year} {edu.gpa ? `// GPA ${edu.gpa}` : ''}</p>
               </div>
             ))}
           </Section>
         )}
         {data.certifications.length > 0 && (
           <Section title="Certifications">
             <ul className="resume-bullets !space-y-2">
               {data.certifications.map((cert, i) => (
                 <li key={i} className="!text-[12px] !text-slate-600 font-bold border-b border-slate-50 pb-1">
                   {`[v] `}<CertificationItem cert={cert} />
                 </li>
               ))}
             </ul>
           </Section>
         )}
      </div>
    </div>
  )
}
