'use client'

import { useRef, useState } from 'react'

interface Props {
  file: File | null
  onFile: (f: File) => void
}

export function DropZone({ file, onFile }: Props) {
  const ref = useRef<HTMLInputElement>(null)
  const [over, setOver] = useState(false)

  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    setOver(false)
    const f = e.dataTransfer.files[0]
    if (f?.type === 'application/pdf') onFile(f)
  }

  return (
    <div
      className={`dropzone${over ? ' over' : ''}`}
      onClick={() => ref.current?.click()}
      onDragOver={e => { e.preventDefault(); setOver(true) }}
      onDragLeave={() => setOver(false)}
      onDrop={onDrop}
    >
      <span className="dropzone-icon">📄</span>
      <p className="dropzone-label">Drop your PDF here</p>
      <p className="dropzone-sub">or click to browse</p>
      <input
        ref={ref}
        type="file"
        accept=".pdf"
        hidden
        onChange={e => { const f = e.target.files?.[0]; if (f) onFile(f) }}
      />
      {file && <span className="file-chip">✓ {file.name}</span>}
    </div>
  )
}
