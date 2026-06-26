import { Router } from 'express'
import { query } from '../db/index.js'
import rateLimit from 'express-rate-limit'

const router = Router()

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { error: 'Too many messages sent. Please try again in an hour.' },
})

// POST /api/contact
router.post('/', contactLimiter, async (req, res) => {
  const { name, email, company, service, message } = req.body

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Name, email, and message are required.' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' })
  }

  if (message.length > 2000) {
    return res.status(400).json({ error: 'Message too long (max 2000 characters).' })
  }

  try {
    await query(
      `INSERT INTO contact_messages (name, email, company, service, message)
       VALUES ($1, $2, $3, $4, $5)`,
      [name.trim(), email.trim().toLowerCase(), company?.trim() || null, service?.trim() || null, message.trim()]
    )

    // Optional: send email notification (configure SMTP in .env)
    // await sendNotificationEmail({ name, email, message })

    res.json({ success: true, message: 'Message received! I\'ll get back to you soon.' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to send message. Please try again.' })
  }
})

export default router
