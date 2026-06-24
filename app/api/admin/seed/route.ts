import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { AdminUser } from '@/lib/models'
import bcryptjs from 'bcryptjs'

export async function GET() {
  try {
    await connectDB()

    const existingAdmin = await AdminUser.findOne({
      email: 'admin@dabbawala.com',
    })

    if (existingAdmin) {
      return NextResponse.json({
        message: 'Admin already exists',
      })
    }

    const hashedPassword = await bcryptjs.hash(
      'dbaemp@123',
      10
    )

    await AdminUser.create({
      email: 'admin@dabbawala.com',
      password: hashedPassword,
    })

    return NextResponse.json({
      success: true,
      email: 'admin@dabbawala.com',
      password: 'dbaemp@123',
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: 'Failed to create admin',
      },
      {
        status: 500,
      }
    )
  }
}