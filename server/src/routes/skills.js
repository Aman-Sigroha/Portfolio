import { Router } from 'express'
import { query } from '../db/index.js'

const router = Router()

// GET /api/skills — grouped by category
router.get('/', async (req, res) => {
  try {
    const result = await query(
      `SELECT * FROM skills ORDER BY category ASC, sort_order ASC, level DESC`
    )

    // Group by category
    const grouped = result.rows.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = []
      acc[skill.category].push(skill)
      return acc
    }, {})

    res.json(grouped)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch skills' })
  }
})

export default router
