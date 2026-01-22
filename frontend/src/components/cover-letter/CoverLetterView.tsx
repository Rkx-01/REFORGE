'use client'

import React, { useState } from 'react'

interface Props {
  text: string
  name?: string
  loading?: boolean
}

export function CoverLetterView({ text, name, loading }: Props) {
  if (loading) {
    return (
      <div className="cl-loading">
        <div className="cl-loader-bar" />
        <p>Forging your cover letter...</p>
      </div>
    )
  }

  if (!text) return null

  function copyText() {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="cl-view printable">
      <div className="cl-paper">
        <div className="cl-hdr">
          <div className="cl-stamp">CL // {name?.toUpperCase() || 'APPLICANT'}</div>
          <div className="cl-date">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
        </div>
        <div className="cl-body">
          {text.split('\n\n').map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="cl-footer">
          <div className="cl-sign">Sincerely,</div>
          <div className="cl-name">{name || 'Applicant'}</div>
        </div>
      </div>
      <div className="cl-actions result-actions no-print" style={{ justifyContent: 'center', marginTop: '20px' }}>
         <button className="btn btn-ghost btn-sm" onClick={copyText}>Copy Text Content</button>
      </div>
    </div>
  )
}
