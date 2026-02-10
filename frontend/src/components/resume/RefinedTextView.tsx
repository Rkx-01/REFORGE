import React, { useState } from 'react'
import type { Resume } from '@/types'

interface Props {
  data: Resume
}

export function RefinedTextView({ data }: Props) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null)

  const keywords = data.keywords_injected || []

  function highlightKeywords(text: string) {
    if (!keywords.length) return text

    // Filter out very short noise keywords (like "ga", "in", "at") 
    // unless they are technical acronyms (uppercase)
    const validKeywords = keywords
      .filter(k => {
        const trimmed = k.trim()
        if (trimmed.length < 3 && trimmed !== trimmed.toUpperCase()) return false
        return trimmed.length > 0
      })
      .map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))

    if (validKeywords.length === 0) return <>{text}</>

    // Sort keywords by length descending to avoid partial matches
    const sortedKeywords = [...validKeywords].sort((a, b) => b.length - a.length)
    
    // Use word boundaries \b to prevent matching inside other words (e.g. "ga" in "engagement")
    const regex = new RegExp(`\\b(${sortedKeywords.join('|')})\\b`, 'gi')
    
    const parts = text.split(regex)
    
    return (
      <>
        {parts.map((part, i) => {
          const isKeyword = sortedKeywords.some(k => k.toLowerCase() === part.toLowerCase())
          return isKeyword ? (
            <mark key={i} className="bg-orange-500/20 text-orange-400 border-b border-orange-500/40 rounded-sm px-0.5 font-semibold">
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        })}
      </>
    )
  }

  function copyToClipboard(text: string, sectionId: string) {
    navigator.clipboard.writeText(text)
    setCopiedSection(sectionId)
    setTimeout(() => setCopiedSection(null), 2000)
  }

  const sections = [
    { 
      id: 'summary', 
      title: 'Professional Summary', 
      content: data.summary 
    },
    { 
      id: 'experience', 
      title: 'Work Experience', 
      items: data.experience.map(exp => ({
        label: `${exp.title} at ${exp.company}`,
        text: exp.bullets.join('\n')
      }))
    },
    {
      id: 'projects',
      title: 'Projects',
      items: data.projects.map(p => ({
        label: p.name,
        text: p.description
      }))
    },
    {
      id: 'skills',
      title: 'Skills & Competencies',
      content: `Technical: ${data.skills.technical.join(', ')}\nSoft Skills: ${data.skills.soft.join(', ')}`
    }
  ]

  return (
    <div className="space-y-12 pb-24">
      <div className="p-6 bg-orange-500/5 border border-orange-500/10 rounded-2xl mb-8">
        <h3 className="text-orange-400 font-bold uppercase tracking-widest text-xs mb-2">Instructions</h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          Copy these optimized sections and paste them directly into your original <strong>Canva, Word, or Google Docs</strong> file. 
          The <span className="text-orange-400 font-bold">highlighted areas</span> show keywords and improvements added by the AI to help you pass ATS filters.
        </p>
      </div>

      {sections.map(section => (
        <div key={section.id} className="group relative">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-xl font-bold text-white tracking-tight">{section.title}</h2>
            {section.content && (
              <button 
                onClick={() => copyToClipboard(section.content!, section.id)}
                className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full transition-all ${
                  copiedSection === section.id 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {copiedSection === section.id ? 'Copied!' : 'Copy Section'}
              </button>
            )}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            {section.content ? (
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                {highlightKeywords(section.content)}
              </p>
            ) : (
              <div className="space-y-8">
                {section.items?.map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{item.label}</h4>
                      <button 
                        onClick={() => copyToClipboard(item.text, `${section.id}-${idx}`)}
                        className={`text-[9px] uppercase font-bold tracking-widest px-2 py-1 rounded transition-all ${
                          copiedSection === `${section.id}-${idx}`
                            ? 'text-emerald-400'
                            : 'text-slate-500 hover:text-white'
                        }`}
                      >
                        {copiedSection === `${section.id}-${idx}` ? 'Copied!' : 'Copy Copy'}
                      </button>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap pl-4 border-l border-white/10">
                      {highlightKeywords(item.text)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
