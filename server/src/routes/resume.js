import { Router } from 'express'
import { existsSync, readdirSync } from 'fs'
import { join, dirname, extname } from 'path'
import { fileURLToPath } from 'url'

const router = Router()
const __dirname = dirname(fileURLToPath(import.meta.url))

const RESUME_DIRS = [
  join(__dirname, '..', '..', 'assets', 'resume'),
  join(__dirname, '..', '..', '..', '..'),
]

const preferredNames = [
  'Aman_Sigroha_Resume.pdf',
  'resume.pdf',
  'cv.pdf',
  'Aman_Resume.pdf',
]

function findResumeFile() {
  for (const dir of RESUME_DIRS) {
    for (const name of preferredNames) {
      const filePath = join(dir, name)
      if (existsSync(filePath)) return filePath
    }

    try {
      const files = readdirSync(dir)
      const pdf = files.find((file) => extname(file).toLowerCase() === '.pdf')
      if (pdf) return join(dir, pdf)
    } catch (_) {}
  }

  return null
}

// GET /api/resume/download
router.get('/download', (_req, res) => {
  const filePath = findResumeFile()

  if (!filePath) {
    return res.status(404).json({ error: 'Resume PDF not found. Add it to server/assets/resume/.' })
  }

  return res.download(filePath, 'Aman_Sigroha_Resume.pdf')
})

export default router
