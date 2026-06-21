import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { WeeklySpecial } from '@/lib/models'
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
    const specials = await WeeklySpecial.find().sort({ createdAt: -1 })
    return NextResponse.json({ success: true, specials })
  } catch (error) {
    console.error('[v0] Get specials error:', error)
    return NextResponse.json({ error: 'Failed to fetch specials' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await verifyAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const { day, name, description, image, price } = await request.json()

    if (!day || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const special = new WeeklySpecial({
      day,
      name,
      description,
      image,
      price,
    })

    await special.save()
    return NextResponse.json({ success: true, special })
  } catch (error) {
    console.error('[v0] Create special error:', error)
    return NextResponse.json({ error: 'Failed to create special' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const admin = await verifyAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const { specialId, ...updates } = await request.json()

    if (!specialId) {
      return NextResponse.json({ error: 'Special ID required' }, { status: 400 })
    }

    const special = await WeeklySpecial.findByIdAndUpdate(specialId, updates, { new: true })

    if (!special) {
      return NextResponse.json({ error: 'Special not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, special })
  } catch (error) {
    console.error('[v0] Update special error:', error)
    return NextResponse.json({ error: 'Failed to update special' }, { status: 500 })
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
    const specialId = searchParams.get('id')

    if (!specialId) {
      return NextResponse.json({ error: 'Special ID required' }, { status: 400 })
    }

    const special = await WeeklySpecial.findByIdAndDelete(specialId)

    if (!special) {
      return NextResponse.json({ error: 'Special not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: 'Special deleted' })
  } catch (error) {
    console.error('[v0] Delete special error:', error)
    return NextResponse.json({ error: 'Failed to delete special' }, { status: 500 })
  }
}
