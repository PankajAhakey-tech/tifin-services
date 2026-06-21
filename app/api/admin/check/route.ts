import { NextResponse } from 'next/server'
import { getAuthCookie, verifyToken } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const token = await getAuthCookie()
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const verified = verifyToken(token)
    if (!verified) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    return NextResponse.json({ success: true, email: verified.email })
  } catch (error) {
    console.error('[v0] Auth check error:', error)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
