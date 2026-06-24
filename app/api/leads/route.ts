import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Lead } from '@/lib/models'
import { generateCouponCode, validatePhoneNumber } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'API Working',
  })
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const { name, mobile, area } = await request.json()

    // Validation
    if (!name || !mobile || !area) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!validatePhoneNumber(mobile)) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      )
    }

    // Check existing mobile
    const existingLead = await Lead.findOne({
      mobile,
    })

    if (existingLead) {
      return NextResponse.json(
        {
          error:
            'This mobile number has already claimed a discount.',
        },
        { status: 409 }
      )
    }

    // Generate unique coupon
    let couponCode = generateCouponCode()

    while (
      await Lead.findOne({
        couponCode,
      })
    ) {
      couponCode = generateCouponCode()
    }

    // Random reward
    const rewards = [
      '₹50 OFF',
      '₹100 OFF',
      'Free Dessert',
      'Free Delivery',
      '10% OFF',
    ]

    const reward =
      rewards[
        Math.floor(
          Math.random() * rewards.length
        )
      ]

    const lead = await Lead.create({
      name,
      mobile,
      area,
      couponCode,
      reward,
      isScratched: false,
    })

    return NextResponse.json({
      success: true,
      leadId: lead._id,
      couponCode,
      reward,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: 'Failed to create lead',
      },
      { status: 500 }
    )
  }
}