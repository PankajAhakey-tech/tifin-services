import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Lead } from '@/lib/models'
import { getAuthCookie, verifyToken } from '@/lib/auth'

export const dynamic = 'force-dynamic'

async function verifyAdmin() {
  const token = await getAuthCookie()
  if (!token) return null
  return verifyToken(token)
}

export async function GET(request: NextRequest) {
  try {
    const admin = await verifyAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    let query: any = {}
    if (status) {
      query.status = status
    }

    const leads = await Lead.find(query).sort({ createdAt: -1 })

    return NextResponse.json({ success: true, leads })
  } catch (error) {
    console.error('[v0] Get leads error:', error)
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const admin = await verifyAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const { leadId, status } = await request.json()

    if (!leadId || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const lead = await Lead.findByIdAndUpdate(
      leadId,
      { status },
      { new: true }
    )

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, lead })
  } catch (error) {
    console.error('[v0] Update lead error:', error)
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 })
  }
}
