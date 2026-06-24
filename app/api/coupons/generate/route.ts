import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const suffix = Math.random().toString(36).slice(2, 7).toUpperCase()
    const couponCode = `DABBA100-${suffix}`

    return NextResponse.json({
      success: true,
      couponCode,
      reward: '₹100 OFF',
    })
  } catch (error) {
    console.error('[scratch] Coupon generation error:', error)
    return NextResponse.json(
      { success: false, error: 'Unable to generate a coupon right now.' },
      { status: 500 },
    )
  }
}
