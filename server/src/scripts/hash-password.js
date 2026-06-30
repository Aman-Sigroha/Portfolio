import { hashPassword } from '../lib/auth.js'

const password = process.argv[2]

if (!password) {
  console.error('Usage: npm run hash-password -- "your-secure-password"')
  process.exit(1)
}

if (password.length < 12) {
  console.warn('Warning: use at least 12 characters for a strong admin password.')
}

const hash = await hashPassword(password)
console.log('\nAdd this to your .env and Vercel environment variables:\n')
console.log(`ADMIN_PASSWORD_HASH=${hash}`)
console.log('\nAlso set JWT_SECRET to a random string (32+ characters).\n')
