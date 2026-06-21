import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dabbawala'

interface AdminUser {
  email: string
  password: string
  createdAt?: Date
}

interface Plan {
  title: string
  price: number
  meals: number
  features: string[]
  description?: string
  createdAt?: Date
}

async function seed() {
  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('Connected!')

    // Create admin user
    const adminCollection = mongoose.connection.collection('adminusers')
    const hashedPassword = await bcryptjs.hash('password123', 10)

    const adminData: AdminUser = {
      email: 'admin@dabbawalaindia.com',
      password: hashedPassword,
      createdAt: new Date(),
    }

    await adminCollection.updateOne(
      { email: adminData.email },
      { $set: adminData },
      { upsert: true }
    )
    console.log('✓ Admin user created/updated')

    // Create sample plans
    const plansCollection = mongoose.connection.collection('plans')

    const samplePlans: Plan[] = [
      {
        title: '7 Tiffin Per Week',
        price: 1200,
        meals: 7,
        features: ['Monday - Sunday', 'Fresh vegetables', 'Homemade touch', 'WhatsApp support'],
        description: 'Perfect for busy professionals',
        createdAt: new Date(),
      },
      {
        title: '14 Tiffin Per Week',
        price: 2200,
        meals: 14,
        features: ['Lunch & Dinner', 'Customizable menu', 'Priority delivery', 'Phone support'],
        description: 'Popular choice',
        createdAt: new Date(),
      },
      {
        title: '28 Tiffin Per Month',
        price: 4200,
        meals: 28,
        features: ['Every day included', 'Special occasions', 'Dedicated support', 'Free delivery'],
        description: 'Best value',
        createdAt: new Date(),
      },
    ]

    for (const plan of samplePlans) {
      await plansCollection.updateOne(
        { title: plan.title },
        { $set: plan },
        { upsert: true }
      )
    }
    console.log('✓ Sample plans created/updated')

    console.log('\n✅ Database seeded successfully!')
    console.log('\nDemo credentials:')
    console.log('Email: admin@dabbawalaindia.com')
    console.log('Password: password123')
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  } finally {
    await mongoose.connection.close()
  }
}

seed()
