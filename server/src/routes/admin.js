import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { query } from '../db/index.js'
import { requireAdmin } from '../middleware/requireAdmin.js'
import {
  COOKIE_NAME,
  clearSessionCookieOptions,
  isAdminConfigured,
  sessionCookieOptions,
  signAdminToken,
  verifyAdminToken,
  verifyPassword,
} from '../lib/auth.js'

const router = Router()

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Try again in 15 minutes.' },
})

// POST /api/admin/login
router.post('/login', loginLimiter, async (req, res) => {
  if (!isAdminConfigured()) {
    return res.status(503).json({ error: 'Admin access is not configured.' })
  }

  const { password } = req.body
  if (!password || typeof password !== 'string') {
    return res.status(400).json({ error: 'Password is required.' })
  }

  const valid = await verifyPassword(password)
  if (!valid) {
    return res.status(401).json({ error: 'Invalid credentials.' })
  }

  const token = signAdminToken()
  res.cookie(COOKIE_NAME, token, sessionCookieOptions())
  return res.json({ success: true })
})

// POST /api/admin/logout
router.post('/logout', (_req, res) => {
  res.clearCookie(COOKIE_NAME, clearSessionCookieOptions())
  return res.json({ success: true })
})

// GET /api/admin/me
router.get('/me', (req, res) => {
  const token = req.cookies?.[COOKIE_NAME]
  if (!token) {
    return res.status(401).json({ authenticated: false })
  }

  try {
    const payload = verifyAdminToken(token)
    if (payload.role !== 'admin') {
      return res.status(401).json({ authenticated: false })
    }
    return res.json({ authenticated: true })
  } catch {
    return res.status(401).json({ authenticated: false })
  }
})

// GET /api/admin/messages
router.get('/messages', requireAdmin, async (_req, res) => {
  try {
    const result = await query(
      `SELECT id, name, email, company, service, message, read, created_at
       FROM contact_messages
       ORDER BY created_at DESC`
    )
    return res.json(result.rows)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Failed to load messages.' })
  }
})

// PATCH /api/admin/messages/:id/read
router.patch('/messages/:id/read', requireAdmin, async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'Invalid message id.' })
  }

  try {
    const result = await query(
      `UPDATE contact_messages SET read = true WHERE id = $1 RETURNING id, read`,
      [id]
    )
    if (!result.rows.length) {
      return res.status(404).json({ error: 'Message not found.' })
    }
    return res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Failed to update message.' })
  }
})

export default router
