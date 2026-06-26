import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import 'dotenv/config'
import pool from './index.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function setup() {
  console.log('Setting up database...')
  const sql = readFileSync(join(__dirname, 'schema.sql'), 'utf8')
  try {
    await pool.query(sql)
    console.log('✅ Database schema created and seeded successfully.')
  } catch (err) {
    console.error('❌ Database setup failed:', err.message)
  } finally {
    await pool.end()
  }
}

setup()
