import React from 'react'

interface CertObj {
  name: string
  issuer: string
  year?: string
}

export function CertificationItem({ cert, className }: { cert: string | CertObj; className?: string }) {
  if (typeof cert === 'string') {
    return <span className={className}>{cert}</span>
  }

  return (
    <span className={className}>
      <span className="font-bold">{cert.name}</span>
      {cert.issuer && <span className="opacity-70"> — {cert.issuer}</span>}
      {cert.year && <span className="opacity-50 ml-1">({cert.year})</span>}
    </span>
  )
}
