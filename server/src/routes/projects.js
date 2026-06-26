import { Router } from 'express'
import { query } from '../db/index.js'

const router = Router()

// GET /api/projects — list all projects, optional ?featured=true
router.get('/', async (req, res) => {
  try {
    const { featured, tag } = req.query
    let sql = `SELECT * FROM projects`
    const params = []
    const conditions = []

    if (featured === 'true') {
      conditions.push(`featured = true`)
    }
    if (tag) {
      params.push(tag)
      conditions.push(`$${params.length} = ANY(tags)`)
    }
    if (conditions.length) sql += ` WHERE ${conditions.join(' AND ')}`
    sql += ` ORDER BY sort_order ASC, created_at DESC`

    const result = await query(sql, params)
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch projects' })
  }
})

// GET /api/projects/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await query('SELECT * FROM projects WHERE id = $1', [req.params.id])
    if (!result.rows.length) return res.status(404).json({ error: 'Project not found' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch project' })
  }
})

export default router
