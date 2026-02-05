export interface Skills {
  technical: string[]
  soft: string[]
}

export interface Experience {
  title: string
  company: string
  duration: string
  location?: string
  bullets: string[]
}

export interface Education {
  degree: string
  institution: string
  year: string
  gpa?: string
  relevant_courses: string[]
}

export interface Project {
  name: string
  description: string
  tech_stack: string[]
}

export interface Resume {
  name: string
  email?: string
  phone?: string
  linkedin?: string
  github?: string
  location?: string
  summary: string
  skills: Skills
  experience: Experience[]
  education: Education[]
  projects: Project[]
  certifications: (string | { name: string; issuer: string; year?: string })[]
  keywords_injected: string[]
}

export type TemplateId = 'modern' | 'corporate' | 'compact' | 'twocolumn' | 'tech' | 'original'

export interface Template {
  id: TemplateId
  name: string
  description: string
  tag: string
}

export type Step = 'idle' | 'upload' | 'jd' | 'template' | 'generating' | 'done'
