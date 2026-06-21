import { NextResponse } from 'next/server'
import { clearAuthCookie } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    await clearAuthCookie()
    return NextResponse.json({ success: true, message: 'Logged out successfully' })
  } catch (error) {
    console.error('[v0] Logout error:', error)
    return NextResponse.json({ error: 'Failed to logout' }, { status: 500 })
  }
}
