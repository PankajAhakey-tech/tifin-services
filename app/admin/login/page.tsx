'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function AdminLoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Login failed')
        return
      }

      router.push('/admin/dashboard')
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('[v0] Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md bg-background rounded-2xl shadow-2xl p-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-center mb-6">
          <Image
            src="/images/logo.png"
            alt="Dabbawala India"
            width={60}
            height={60}
            className="rounded-full"
          />
        </div>

        <h1 className="text-3xl font-bold text-center text-primary mb-2">Admin Portal</h1>
        <p className="text-center text-foreground/60 mb-8">Dabbawala India Management</p>

        {error && (
          <motion.div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
              placeholder="admin@dabbawalaindia.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm text-foreground/60 mt-6">
          Not an admin?{' '}
          <Link href="/" className="text-secondary hover:underline">
            Go to home
          </Link>
        </p>

        <div className="mt-8 p-4 bg-muted/50 rounded-lg text-xs text-foreground/70">
          <p className="font-semibold mb-2">Demo Credentials:</p>
          <p>Email: admin@dabbawalaindia.com</p>
          <p>Password: password123</p>
        </div>
      </motion.div>
    </div>
  )
}
