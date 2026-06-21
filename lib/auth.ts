import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export function generateToken(email: string) {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { email: string }
  } catch (error) {
    return null
  }
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  })
}

export async function getAuthCookie() {
  const cookieStore = await cookies()
  return cookieStore.get('admin_token')?.value
}

export async function clearAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_token')
}

export function generateCouponCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = 'DABBA-'
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export function validatePhoneNumber(phone: string) {
  const phoneRegex = /^[0-9]{10}$/
  return phoneRegex.test(phone.replace(/\D/g, ''))
}

export function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
