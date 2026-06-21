import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Plan } from '@/lib/models'
import { getAuthCookie, verifyToken } from '@/lib/auth'

export const dynamic = 'force-dynamic'

async function verifyAdmin() {
  const token = await getAuthCookie()
  if (!token) return null
  return verifyToken(token)
}

export async function GET() {
  try {
    await connectDB()
    const plans = await Plan.find().sort({ createdAt: -1 })
    return NextResponse.json({ success: true, plans })
  } catch (error) {
    console.error('[v0] Get plans error:', error)
    return NextResponse.json({ error: 'Failed to fetch plans' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await verifyAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const { title, price, meals, features, image, description } = await request.json()

    if (!title || !price || !meals) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const plan = new Plan({
      title,
      price,
      meals,
      features: features || [],
      image,
      description,
    })

    await plan.save()
    return NextResponse.json({ success: true, plan })
  } catch (error) {
    console.error('[v0] Create plan error:', error)
    return NextResponse.json({ error: 'Failed to create plan' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const admin = await verifyAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const { planId, ...updates } = await request.json()

    if (!planId) {
      return NextResponse.json({ error: 'Plan ID required' }, { status: 400 })
    }

    const plan = await Plan.findByIdAndUpdate(planId, updates, { new: true })

    if (!plan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, plan })
  } catch (error) {
    console.error('[v0] Update plan error:', error)
    return NextResponse.json({ error: 'Failed to update plan' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const admin = await verifyAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const { searchParams } = new URL(request.url)
    const planId = searchParams.get('id')

    if (!planId) {
      return NextResponse.json({ error: 'Plan ID required' }, { status: 400 })
    }

    const plan = await Plan.findByIdAndDelete(planId)

    if (!plan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: 'Plan deleted' })
  } catch (error) {
    console.error('[v0] Delete plan error:', error)
    return NextResponse.json({ error: 'Failed to delete plan' }, { status: 500 })
  }
}
