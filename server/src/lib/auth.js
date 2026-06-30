import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const COOKIE_NAME = 'admin_session'
const BCRYPT_ROUNDS = 12

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD_HASH && process.env.JWT_SECRET)
}

function getJwtSecret() {
  const secret = process.env.JWT_SECRET
  if (!secret || secret.length < 32) {
    throw new Error('JWT_SECRET must be set and at least 32 characters')
  }
  return secret
}

export async function hashPassword(plainPassword) {
  return bcrypt.hash(plainPassword, BCRYPT_ROUNDS)
}

export async function verifyPassword(plainPassword) {
  const hash = process.env.ADMIN_PASSWORD_HASH
  if (!hash) return false
  return bcrypt.compare(plainPassword, hash)
}

export function signAdminToken() {
  const hours = Number(process.env.ADMIN_SESSION_HOURS || 8)
  return jwt.sign({ role: 'admin' }, getJwtSecret(), { expiresIn: `${hours}h` })
}

export function verifyAdminToken(token) {
  return jwt.verify(token, getJwtSecret())
}

export function sessionCookieOptions() {
  const hours = Number(process.env.ADMIN_SESSION_HOURS || 8)
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: hours * 60 * 60 * 1000,
    path: '/',
  }
}

export function clearSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  }
}
