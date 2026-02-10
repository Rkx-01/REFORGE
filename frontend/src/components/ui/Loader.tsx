'use client'

import { useEffect, useState } from 'react'

const steps = [
  'Parsing PDF',
  'Extracting experience',
  'Reading job requirements',
  'Mapping keywords',
  'Rewriting bullets',
  'Injecting keywords',
  'Optimising structure',
  'Finalising',
]

const messages = [
  'Parsing PDF…',
  'Reading your experience…',
  'Analysing job description…',
  'Matching keywords…',
  'Rewriting bullets…',
  'Injecting keywords…',
  'Structuring output…',
  'Almost done…',
]

export function Loader({ active }: { active: boolean }) {
  const [msg, setMsg]   = useState(0)
  const [done, setDone] = useState<number[]>([])

  useEffect(() => {
    if (!active) { setMsg(0); setDone([]); return }

    const t1 = setInterval(() => setMsg(i => (i + 1) % messages.length), 1700)
    let s = 0
    const t2 = setInterval(() => { if (s < steps.length) { setDone(p => [...p, s]); s++ } }, 2000)

    return () => { clearInterval(t1); clearInterval(t2) }
  }, [active])

  if (!active) return null

  return (
    <div className="loader-overlay">
      <div className="loader-ring">
        <div className="loader-core" />
      </div>
      <p className="loader-heading">FORGING</p>
      <p className="loader-msg">{messages[msg]}</p>
      <ul className="loader-steps">
        {steps.map((s, i) => (
          <li key={i} className={done.includes(i) ? 'done' : ''}>{s}</li>
        ))}
      </ul>
    </div>
  )
}
