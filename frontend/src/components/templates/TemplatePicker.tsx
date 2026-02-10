'use client'

import { TEMPLATES } from '@/lib/templates'
import type { TemplateId } from '@/types'

interface Props {
  selected: TemplateId
  onChange: (id: TemplateId) => void
  onGenerate: () => void
  loading: boolean
  hasResult?: boolean
  onClose?: () => void
  error?: string | null
}

export function TemplatePicker({ selected, onChange, onGenerate, loading, hasResult, onClose, error }: Props) {
  return (
    <div className="template-picker relative">
      {onClose && (
        <button 
          className="absolute top-4 right-4 text-[10px] uppercase font-bold text-slate-400 hover:text-white transition-colors"
          onClick={onClose}
        >
          Close [ESC]
        </button>
      )}
      <div className="tp-header">
        <div className="tp-index">03</div>
        <div>
          <h2 className="tp-title">Choose a Template</h2>
          <p className="tp-sub">Pick the layout for your generated resume. You can switch and regenerate at any time.</p>
        </div>
      </div>

      <div className="template-grid">
        {TEMPLATES.map(t => (
          <button
            key={t.id}
            className={`template-card${selected === t.id ? ' selected' : ''}`}
            onClick={() => onChange(t.id)}
          >
            <div className="tc-preview">
              <TemplatePreview id={t.id} />
            </div>
            <div className="tc-body">
              <div className="tc-top">
                <span className="tc-name">{t.name}</span>
                <span className="tc-tag">{t.tag}</span>
              </div>
              <p className="tc-desc">{t.description}</p>
            </div>
            {selected === t.id && <div className="tc-check">✓</div>}
          </button>
        ))}
      </div>

      <div className="action-bar flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-4">
          <button className="btn btn-red" onClick={onGenerate} disabled={loading}>
            {loading ? 'Generating…' : hasResult ? 'Regenerate Resume' : 'Generate Resume'}
          </button>
          {hasResult && onClose && (
            <button className="btn btn-ghost" onClick={onClose}>
              View Current Result
            </button>
          )}
        </div>

        {error && (
          <div className="flex-grow min-w-[300px] p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs flex items-center gap-2 animate-in fade-in zoom-in-95 duration-300">
            <span className="text-base leading-none">⚠️</span>
            <div className="leading-tight">
              <p className="font-bold uppercase tracking-widest text-[9px] opacity-70 mb-0.5">System Status</p>
              <p>{error}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function TemplatePreview({ id }: { id: TemplateId }) {
  if (id === 'modern') return (
    <div className="w-full h-full bg-[#0a0a0c] relative overflow-hidden flex flex-col p-3 border border-white/5">
      <div className="w-full h-5 bg-[#ff4d00]/90 mb-3 rounded-sm shadow-lg shadow-[#ff4d00]/20"></div>
      <div className="w-3/4 h-2 bg-white/20 mb-1.5 rounded-full"></div>
      <div className="w-full h-0.5 bg-white/5 mb-4"></div>
      <div className="space-y-1.5 opacity-60">
        <div className="w-full h-1 bg-white/10 rounded-full"></div>
        <div className="w-11/12 h-1 bg-white/10 rounded-full"></div>
        <div className="w-4/5 h-1 bg-white/10 rounded-full"></div>
      </div>
      <div className="mt-6 space-y-2 opacity-40">
        <div className="w-1/3 h-2.5 bg-white/10 rounded-full"></div>
        <div className="w-full h-1 bg-white/5 rounded-full"></div>
      </div>
    </div>
  )

  if (id === 'corporate') return (
    <div className="w-full h-full bg-[#fafafc] relative overflow-hidden flex flex-col items-center p-3 border-t-[6px] border-[#0a0a0c]">
      <div className="w-2/3 h-4 bg-[#0a0a0c]/90 mb-5 mt-2 rounded-sm"></div>
      <div className="w-full h-px bg-[#0a0a0c]/5 mb-5"></div>
      <div className="w-full px-2 space-y-3">
        <div className="flex justify-between items-center">
           <div className="w-2/5 h-2 bg-[#0a0a0c]/20 rounded-full"></div>
           <div className="w-1/4 h-1.5 bg-[#0a0a0c]/10 rounded-full"></div>
        </div>
        <div className="w-full h-1 bg-[#0a0a0c]/5 rounded-full"></div>
        <div className="w-full h-1 bg-[#0a0a0c]/5 rounded-full"></div>
        <div className="w-5/6 h-1 bg-[#0a0a0c]/5 rounded-full"></div>
      </div>
      <div className="absolute bottom-4 w-1/3 h-1 bg-[#ff4d00]/20 rounded-full"></div>
    </div>
  )

  if (id === 'twocolumn') return (
    <div className="w-full h-full bg-[#0a0a0c] relative overflow-hidden flex border border-white/5">
      <div className="w-1/3 h-full bg-[#111115] p-3 space-y-3 border-r border-white/5">
        <div className="w-full h-4 bg-white/10 rounded-sm"></div>
        <div className="w-4/5 h-1 bg-white/5 rounded-full"></div>
        <div className="w-2/3 h-1 bg-white/5 rounded-full"></div>
        <div className="mt-8 space-y-2">
          <div className="w-full h-1.5 bg-[#ff4d00]/30 rounded-full"></div>
          <div className="w-full h-1 bg-white/5 rounded-full"></div>
          <div className="w-full h-1 bg-white/5 rounded-full"></div>
        </div>
      </div>
      <div className="flex-grow p-3 space-y-4">
        <div className="w-1/2 h-3 bg-white/10 rounded-full"></div>
        <div className="space-y-2 opacity-40">
          <div className="w-full h-1 bg-white/5 rounded-full"></div>
          <div className="w-full h-1 bg-white/5 rounded-full"></div>
          <div className="w-full h-1 bg-white/5 rounded-full"></div>
          <div className="w-11/12 h-1 bg-white/5 rounded-full"></div>
        </div>
      </div>
    </div>
  )

  if (id === 'compact') return (
    <div className="w-full h-full bg-[#f8f9fa] relative overflow-hidden p-3 border border-[#0a0a0c]/5">
       <div className="flex justify-between items-start mb-3">
         <div className="w-2/5 h-4 bg-[#0a0a0c]/80 rounded-sm"></div>
         <div className="w-1/5 h-2 bg-[#0a0a0c]/10 rounded-full"></div>
       </div>
       <div className="w-full h-px bg-[#0a0a0c]/10 mb-3"></div>
       <div className="grid grid-cols-2 gap-3">
         <div className="space-y-1.5">
            <div className="w-full h-1.5 bg-[#0a0a0c]/15 rounded-full"></div>
            <div className="w-full h-1 bg-[#0a0a0c]/5 rounded-full"></div>
            <div className="w-full h-1 bg-[#0a0a0c]/5 rounded-full"></div>
            <div className="w-4/5 h-1 bg-[#0a0a0c]/5 rounded-full"></div>
         </div>
         <div className="space-y-1.5">
            <div className="w-full h-1.5 bg-[#0a0a0c]/15 rounded-full"></div>
            <div className="w-full h-1 bg-[#0a0a0c]/5 rounded-full"></div>
            <div className="w-3/4 h-1 bg-[#0a0a0c]/5 rounded-full"></div>
         </div>
       </div>
    </div>
  )

  if (id === 'tech') return (
    <div className="w-full h-full bg-[#0a0a0c] relative overflow-hidden flex flex-col p-3 space-y-3 border border-white/5">
      <div className="w-full h-2.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full mb-2"></div>
      <div className="w-3/4 h-5 bg-white/5 border border-white/10 mx-auto rounded-sm"></div>
      <div className="w-full h-px bg-white/5"></div>
      <div className="space-y-2.5 mt-5 px-1">
        <div className="flex gap-2 items-center">
          <div className="w-4 h-4 rounded-full border border-white/10"></div>
          <div className="w-2/3 h-1.5 bg-white/10 rounded-full"></div>
        </div>
        <div className="w-full h-1 bg-white/5 rounded-full opacity-40"></div>
        <div className="w-11/12 h-1 bg-white/5 rounded-full opacity-40"></div>
      </div>
      <div className="absolute bottom-0 right-0 p-2 opacity-10">
        <div className="text-[8px] font-mono text-white">SYS_REV_2.4</div>
      </div>
    </div>
  )

  if (id === 'original') return (
    <div className="w-full h-full bg-white relative overflow-hidden flex flex-col p-3 border border-slate-200">
      <div className="w-2/3 h-3.5 bg-slate-900 mb-2 rounded-sm"></div>
      <div className="w-1/2 h-1.5 bg-slate-400/20 mb-4 rounded-full"></div>
      <div className="w-full h-px bg-slate-100 mb-4"></div>
      <div className="space-y-4">
        <div>
          <div className="w-1/3 h-2 bg-slate-300 mb-2 rounded-full"></div>
          <div className="space-y-1.5 opacity-60">
            <div className="w-full h-1 bg-slate-200 rounded-full"></div>
            <div className="w-full h-1 bg-slate-200 rounded-full"></div>
          </div>
        </div>
        <div>
          <div className="w-1/4 h-2 bg-slate-300 mb-2 rounded-full"></div>
          <div className="w-full h-1 bg-slate-200 rounded-full opacity-60"></div>
        </div>
      </div>
    </div>
  )

  return null
}
