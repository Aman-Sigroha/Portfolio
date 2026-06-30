export const API_BASE = import.meta.env.VITE_API_URL || ''

export function apiUrl(path) {
  return `${API_BASE}${path}`
}

/** Static resume in client/public — reliable on Vercel without serverless file I/O */
export const RESUME_DOWNLOAD = {
  href: '/Aman_Sigroha_Resume.pdf',
  filename: 'Aman_Sigroha_Resume.pdf',
}
