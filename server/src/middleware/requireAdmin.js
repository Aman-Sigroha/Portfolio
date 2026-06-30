import { COOKIE_NAME, verifyAdminToken } from '../lib/auth.js'

export function requireAdmin(req, res, next) {
  const token = req.cookies?.[COOKIE_NAME]

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const payload = verifyAdminToken(token)
    if (payload.role !== 'admin') {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    req.admin = payload
    return next()
  } catch {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}
