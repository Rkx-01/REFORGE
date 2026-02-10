import React from 'react'

interface BulletListProps {
  items: string[]
  className?: string
}

export function BulletList({ items, className = '' }: BulletListProps) {
  if (!items || items.length === 0) return null

  return (
    <ul className={`resume-bullets ${className}`}>
      {items.map((item, index) => (
        <li key={index}>
          {item}
        </li>
      ))}
    </ul>
  )
}
