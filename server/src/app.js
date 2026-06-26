import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { errorHandler } from './middleware/errorHandler.js'
import projectsRouter from './routes/projects.js'
import contactRouter from './routes/contact.js'
import resumeRouter from './routes/resume.js'
import skillsRouter from './routes/skills.js'

const app = express()

const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
      return
    }
    callback(null, false)
  },
  credentials: true,
}))
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api/projects', projectsRouter)
app.use('/api/contact', contactRouter)
app.use('/api/resume', resumeRouter)
app.use('/api/skills', skillsRouter)

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

app.use(errorHandler)

export default app
