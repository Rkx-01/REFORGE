import type { Template, TemplateId } from '@/types'

export const TEMPLATES: Template[] = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Single column, clean spacing, optimized for ATS and modern tech roles.',
    tag: 'Popular',
  },
  {
    id: 'corporate',
    name: 'Classic Corporate',
    description: 'Traditional layout with strong dividers. Best for finance, law, or executive roles.',
    tag: 'Traditional',
  },
  {
    id: 'compact',
    name: 'Compact One-Page',
    description: 'High-density layout designed to fit extensive experience into a single page.',
    tag: 'High Density',
  },
  {
    id: 'twocolumn',
    name: 'Two-Column Smart',
    description: 'Sidebar for skills and contact, main panel for experience. Modern and dynamic.',
    tag: 'Modern',
  },
  {
    id: 'tech',
    name: 'Tech Minimal',
    description: 'Developer-focused layout highlighting GitHub, tech stacks, and core projects.',
    tag: 'Developer',
  },
  {
    id: 'original',
    name: 'Preserved Standard',
    description: 'Minimal, neutral layout that mimics a traditional resume. Best if you want to keep your original feel while passing ATS.',
    tag: 'Preserved',
  },
]

export function getTemplate(id: TemplateId): Template {
  return TEMPLATES.find(t => t.id === id) ?? TEMPLATES[0]
}

export const DEFAULT_TEMPLATE: TemplateId = 'modern'
