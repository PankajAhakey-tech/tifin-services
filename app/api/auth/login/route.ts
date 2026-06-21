import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { AdminUser } from '@/lib/models'
import { generateToken, setAuthCookie } from '@/lib/auth'
import bcryptjs from 'bcryptjs'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 })
    }

    const admin = await AdminUser.findOne({ email })

    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const isPasswordValid = await bcryptjs.compare(password, admin.password)

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = generateToken(email)
    await setAuthCookie(token)

    return NextResponse.json({
      success: true,
      message: 'Login successful',
    })
  } catch (error) {
    console.error('[v0] Login error:', error)
    return NextResponse.json({ error: 'Failed to login' }, { status: 500 })
  }
}
