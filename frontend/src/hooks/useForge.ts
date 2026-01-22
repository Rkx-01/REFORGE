'use client'

import { useState } from 'react'
import { generateResume, generateCoverLetter } from '@/lib/api'
import { DEFAULT_TEMPLATE } from '@/lib/templates'
import type { Resume, Step, TemplateId } from '@/types'

export function useForge() {
  const [file, setFile]             = useState<File | null>(null)
  const [jd, setJd]                 = useState('')
  const [template, setTemplate]     = useState<TemplateId>(DEFAULT_TEMPLATE)
  const [result, setResult]         = useState<Resume | null>(null)
  const [coverLetter, setCoverLetter] = useState<string | null>(null)
  const [step, setStep]             = useState<Step>('idle')
  const [mode, setMode]             = useState<'targeted' | 'general'>('targeted')
  const [error, setError]           = useState<string | null>(null)
  const [clLoading, setClLoading]   = useState(false)

  const ready = !!file && (mode === 'general' || jd.trim().length > 30)

  function pickFile(f: File) {
    setFile(f)
    setStep('upload')
  }

  async function forge() {
    if (!ready) return
    setError(null)
    setStep('generating')
    try {
      const finalJd = mode === 'general' ? 'General Professional Resume Polish' : jd
      const data = await generateResume(file!, finalJd)
      setResult(data)
      setStep('done')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong'
      if (msg.includes('429') || msg.includes('500')) {
        setError('Our AI servers are currently busy right now. Please try again after some time.')
      } else {
        setError(msg)
      }
      setStep('template')
    }
  }

  async function forgeCoverLetter() {
    if (!file || !jd) return
    setClLoading(true)
    setError(null)
    try {
      const { cover_letter } = await generateCoverLetter(file, jd, result?.name)
      setCoverLetter(cover_letter)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Cover letter generation failed')
    } finally {
      setClLoading(false)
    }
  }

  function reset() {
    setFile(null)
    setJd('')
    setTemplate(DEFAULT_TEMPLATE)
    setResult(null)
    setCoverLetter(null)
    setStep('idle')
    setError(null)
  }

  function next() {
    if (ready) setStep('template')
  }

  return {
    file, pickFile,
    jd, setJd,
    mode, setMode,
    template, setTemplate,
    result, coverLetter, clLoading,
    step, setStep, error,
    ready, forge, forgeCoverLetter, reset, next,
  }
}
