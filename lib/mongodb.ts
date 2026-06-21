import mongoose from 'mongoose'

const mongoUri = process.env.MONGODB_URI

let cached = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

export async function connectDB() {
  if (!mongoUri) {
    throw new Error('MONGODB_URI environment variable is not defined')
  }

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoUri).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

declare global {
  var mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
}
