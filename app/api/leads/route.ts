import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Lead } from '@/lib/models'
import { generateCouponCode, validatePhoneNumber } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const { name, mobile, area, address } = await request.json()

    // Validation
    if (!name || !mobile || !area || !address) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!validatePhoneNumber(mobile)) {
      return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 })
    }

    // Generate unique coupon code
    let couponCode = generateCouponCode()
    let existingCoupon = await Lead.findOne({ couponCode })
    
    while (existingCoupon) {
      couponCode = generateCouponCode()
      existingCoupon = await Lead.findOne({ couponCode })
    }

    // Create lead
    const lead = new Lead({
      name,
      mobile,
      area,
      address,
      couponCode,
    })

    await lead.save()

    return NextResponse.json({
      success: true,
      couponCode,
      leadId: lead._id,
    })
  } catch (error) {
    console.error('[v0] Lead creation error:', error)
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 })
  }
}
