import { Router } from 'express'
import { existsSync, readdirSync, readFileSync } from 'fs'
import { join, dirname, extname } from 'path'
import { fileURLToPath } from 'url'

const router = Router()
const __dirname = dirname(fileURLToPath(import.meta.url))

const DOWNLOAD_NAME = 'Aman_Sigroha_Resume.pdf'

const preferredNames = [
  'Aman_Sigroha_Resume.pdf',
  'Aman Sigroha Resume.pdf',
  'resume.pdf',
  'cv.pdf',
  'Aman_Resume.pdf',
]

function resumeSearchDirs() {
  const serverRoot = join(__dirname, '..', '..')
  const repoRoot = join(serverRoot, '..')

  return [
    join(serverRoot, 'assets', 'resume'),
    repoRoot,
    join(process.cwd(), 'assets', 'resume'),
    join(process.cwd(), 'server', 'assets', 'resume'),
  ]
}

function findResumeFile() {
  for (const dir of resumeSearchDirs()) {
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
    return res.status(404).json({
      error: 'Resume PDF not found. Add Aman Sigroha Resume.pdf to the project root or server/assets/resume/.',
    })
  }

  try {
    const pdf = readFileSync(filePath)
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="${DOWNLOAD_NAME}"`)
    res.setHeader('Content-Length', pdf.length)
    return res.send(pdf)
  } catch (err) {
    return res.status(500).json({ error: 'Failed to read resume file.' })
  }
})

export default router
