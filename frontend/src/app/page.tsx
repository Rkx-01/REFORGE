'use client'

import { useRef, useEffect } from 'react'
import { useForge } from '@/hooks/useForge'
import { ForgeForm } from '@/components/forge/ForgeForm'
import { TemplatePicker } from '@/components/templates/TemplatePicker'
import { ResumeOutput } from '@/components/resume/ResumeOutput'
import { Loader } from '@/components/ui/Loader'
import { initScene } from '@/lib/scene'

const HOW = [
  ['01', 'Upload Resume', 'Drop in your existing PDF. Every real detail gets extracted — nothing invented, nothing assumed.'],
  ['02', 'Add Job Description', 'Paste the full posting. The AI reads every required skill, responsibility and qualification.'],
  ['03', 'Pick a Template', 'Choose from four professional layouts. Classic, Minimal, Sidebar, or Compact — switch anytime.'],
  ['04', 'ATS Optimisation', 'Every keyword from the job description is injected naturally so automated filters cannot reject you.'],
  ['05', 'Zero Fabrication', 'The AI only rewrites and reframes what already exists. Your real experience, presented at its best.'],
  ['06', 'PDF Export', 'Print-ready output straight from the browser. No extra software, no reformatting needed.'],
]

const MARQUEE = [
  'ATS Keyword Injection', 'Four Resume Templates', 'Bullet Rewriting',
  'Zero Fabrication', 'PDF Export', 'Gemini 1.5 Flash', 'One-Click Download',
]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)
  const curRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  const {
    file, pickFile,
    jd, setJd,
    template, setTemplate,
    result, coverLetter, clLoading, 
    step, setStep, error,
    ready, forge, forgeCoverLetter, reset, next,
    mode, setMode
  } = useForge()

  useEffect(() => {
    if (!canvasRef.current) return
    return initScene(canvasRef.current)
  }, [])

  useEffect(() => {
    let rx = 0, ry = 0, cx = 0, cy = 0, raf: number
    const onMove = (e: MouseEvent) => {
      cx = e.clientX; cy = e.clientY
      if (curRef.current) { curRef.current.style.left = `${cx}px`; curRef.current.style.top = `${cy}px` }
    }
    const tick = () => {
      rx += (cx - rx) * 0.11; ry += (cy - ry) * 0.11
      if (ringRef.current) { ringRef.current.style.left = `${rx}px`; ringRef.current.style.top = `${ry}px` }
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', onMove)
    tick()
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  useEffect(() => {
    if (step === 'done') {
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 400)
    }
  }, [step])

  function handleRegenerate() {
    reset()
    scrollTo('forge')
  }

  function handleChangeTemplate() {
    if (result) {
      setStep('template')
      scrollTo('forge')
    }
  }

  function goToTemplatePicker() {
    if (ready) {
      next()
      scrollTo('forge')
    }
  }

  const stepClass = (key: string) => {
    if (step === 'done') return 'done'
    if (key === 'upload' && !!file) return 'done'
    if (key === 'jd' && jd.length > 30) return 'done'
    if (key === 'template' && step === 'template') return 'active'
    if (key === 'upload' && step === 'upload') return 'active'
    if (key === 'jd' && (step === 'jd' || (!!file && jd.length > 30))) return 'active'
    return ''
  }

  return (
    <>
      <div className="app-bg no-print">
        <div id="bg-wrap" />
        <canvas ref={canvasRef} id="bg" />
        <div id="cursor" ref={curRef} />
        <div id="cursor-ring" ref={ringRef} />
      </div>
      <Loader active={step === 'generating'} />

      <div className="app">
        <header className="app-header no-print">
          <div className="brand">RE<em>FORGE</em></div>
          <nav className="hdr-links">
            <a href="#how-it-works">How it works</a>
            <a href="#forge">Start</a>
          </nav>
        </header>

        <section className="hero no-print">
          <div className="hero-l">
            <p className="hero-eyebrow">AI Resume Tailoring</p>
            <h1 className="hero-h1">
              YOUR<br />
              RESUME<br />
              <span className="stroke">REBUILT</span><br />
              <span className="ital">for the job.</span>
            </h1>
            <p className="hero-p">
              Upload your resume. Paste any job description.<br />
              <strong>Choose your template. Every keyword matched.</strong><br />
              Beat the ATS. Land the interview.
            </p>
            <div className="hero-btns">
              <button className="btn btn-red" onClick={() => scrollTo('forge')}>Start Forging</button>
              <button className="btn btn-ghost" onClick={() => scrollTo('how-it-works')}>How it works</button>
            </div>
          </div>
          <div className="hero-r">
            <div className="hero-stats">
              <div className="stat"><div className="stat-n">4<sup>×</sup></div><div className="stat-l">Resume Templates</div></div>
              <div className="stat"><div className="stat-n">98<sup>%</sup></div><div className="stat-l">ATS Pass Rate</div></div>
              <div className="stat"><div className="stat-n">45<sup>s</sup></div><div className="stat-l">Generation Time</div></div>
            </div>
          </div>
        </section>

        <div className="marquee-wrap">
          <div className="marquee-track">
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <div key={i} className={`mq-item${i % 2 === 0 ? ' r' : ''}`}>{item}</div>
            ))}
          </div>
        </div>

        <section className="sec" id="how-it-works">
          <div className="sec-top">
            <div className="sec-idx">01 — Process</div>
            <div className="sec-h">HOW IT<br />WORKS</div>
            <div className="sec-desc">Upload, describe, choose a template, generate. Done in under a minute.</div>
          </div>
          <div className="how-grid">
            {HOW.map(([n, title, body]) => (
              <div key={n} className="how-item">
                <div className="how-n">{n}</div>
                <div className="how-title">{title}</div>
                <div className="how-body">{body}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="forge" id="forge">
          <div className="forge-top">
            <div className="forge-h">LOAD<br />THE<br /><em>Forge.</em></div>
            <p className="forge-desc">
              Upload your resume, paste the job description, pick a template.
              The AI rebuilds your resume with every keyword matched and every
              bullet strengthened — using only your real experience.
            </p>
          </div>

          <div className="steps">
            {[
              { key: 'upload', label: 'Upload Resume' },
              { key: 'jd', label: 'Job Description' },
              { key: 'template', label: 'Choose Template' },
              { key: 'done', label: 'Generate & Export' },
            ].map(({ key, label }, i) => (
              <div key={key} className={`step ${stepClass(key)}`}>
                <div className="step-num">0{i + 1}</div>
                <div className="step-lbl">{label}</div>
              </div>
            ))}
          </div>

          {step !== 'template' && step !== 'generating' && step !== 'done' && (
            <ForgeForm
              file={file}
              onFile={pickFile}
              jd={jd}
              onJd={setJd}
              onNext={goToTemplatePicker}
              ready={ready}
              step={step}
              error={error}
              mode={mode}
              onMode={setMode}
            />
          )}

          {(step === 'template' || step === 'generating' || (step === 'done' && !result)) && (
            <TemplatePicker
              selected={template}
              onChange={setTemplate}
              onGenerate={forge}
              loading={step === 'generating'}
              hasResult={!!result}
              onClose={result ? () => setStep('done') : undefined}
              error={error}
            />
          )}

          <div ref={resultRef}>
            {result && step === 'done' && (
              <ResumeOutput
                data={result}
                templateId={template}
                onRegenerate={handleRegenerate}
                onChangeTemplate={handleChangeTemplate}
                coverLetter={coverLetter}
                onGenerateCL={forgeCoverLetter}
                clLoading={clLoading}
                error={error}
              />
            )}
          </div>
        </section>
      </div>
    </>
  )
}
