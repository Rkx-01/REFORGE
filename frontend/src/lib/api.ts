function getBase(): string {
  let url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'
  url = url.replace(/\/+$/, '') // Strip trailing slashes
  if (!url.endsWith('/api/v1')) {
    url = `${url}/api/v1`
  }
  return url
}

const BASE = getBase()

export async function generateResume(file: File, jd: string) {
  const fd = new FormData()
  fd.append('resume', file)
  fd.append('job_description', jd)

  const res = await fetch(`${BASE}/generate-resume`, { method: 'POST', body: fd })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail ?? `Backend Error: ${res.status}`)
  }
  return res.json()
}

export async function generateCoverLetter(file: File, jd: string, name?: string) {
  const fd = new FormData()
  fd.append('resume', file)
  fd.append('job_description', jd)
  if (name) fd.append('applicant_name', name)

  const res = await fetch(`${BASE}/cover-letter`, { method: 'POST', body: fd })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail ?? `Backend Error: ${res.status}`)
  }
  return res.json()
}
