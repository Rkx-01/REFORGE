import React from 'react'

interface HighlightProps {
  text: string
  keywords: string[]
  className?: string
}

export function Highlight({ text, keywords, className = '' }: HighlightProps) {
  if (!keywords || keywords.length === 0 || !text) return <>{text}</>

  // Escape special chars for regex and filter out empty strings
  const validKeywords = keywords
    .filter(k => {
      const trimmed = k.trim()
      // Skip very short keywords that lead to false positives (like "ga", "in", "at")
      // unless they are likely technical acronyms (all caps and >= 2 chars)
      if (trimmed.length < 3 && trimmed !== trimmed.toUpperCase()) return false
      return trimmed.length > 0
    })
    .map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))

  if (validKeywords.length === 0) return <>{text}</>

  // Use word boundaries \b to prevent matching inside other words (e.g. "ga" in "engagement")
  const regex = new RegExp(`\\b(${validKeywords.join('|')})\\b`, 'gi')
  const parts = text.split(regex)

  return (
    <>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <span key={i} className={`bg-amber-100 text-amber-900 px-0.5 rounded-sm font-semibold print:bg-transparent print:text-inherit ${className}`}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  )
}
