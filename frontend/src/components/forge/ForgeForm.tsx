'use client'

import { DropZone } from './DropZone'
import type { Step } from '@/types'

interface Props {
  file: File | null
  onFile: (f: File) => void
  jd: string
  onJd: (v: string) => void
  onNext: () => void
  ready: boolean
  step: Step
  error: string | null
  mode: 'targeted' | 'general'
  onMode: (m: 'targeted' | 'general') => void
}

export function ForgeForm({ file, onFile, jd, onJd, onNext, ready, step, error, mode, onMode }: Props) {
  return (
    <div className="forge-form">
      <div className="input-grid">
        <div className="ipanel">
          <p className="ipanel-label"><span>01</span>Current Resume</p>
          <DropZone file={file} onFile={onFile} />
        </div>
        <div className="ipanel">
          <div className="ipanel-label flex justify-between">
            <span>02</span>
            <div className="flex gap-2">
              <button 
                className={`btn btn-xs ${mode === 'targeted' ? 'btn-red' : 'btn-ghost'}`}
                onClick={() => onMode('targeted')}
              >Targeted</button>
              <button 
                className={`btn btn-xs ${mode === 'general' ? 'btn-red' : 'btn-ghost'}`}
                onClick={() => onMode('general')}
              >General</button>
            </div>
          </div>
          <textarea
            className={`jd-textarea ${mode === 'general' ? 'opacity-50 pointer-events-none' : ''}`}
            value={mode === 'general' ? 'General Professional Polish (No Job Description Required)' : jd}
            onChange={e => onJd(e.target.value)}
            disabled={mode === 'general'}
            placeholder="Paste the full job posting — requirements, responsibilities, qualifications…"
          />
        </div>
      </div>
      <div className="action-bar">
        <button className="btn btn-red" onClick={onNext} disabled={!ready || step === 'generating'}>
          {ready ? (mode === 'general' ? 'Polish Resume →' : 'Optimize Resume →') : 'Complete Steps Above'}
        </button>
        {error && <p className="error-msg">{error}</p>}
      </div>
    </div>
  )
}
