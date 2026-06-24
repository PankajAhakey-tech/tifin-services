'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function DiscountForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    area: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    console.log('Submitting to:', '/api/leads')
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to claim discount')
        return
      }

      // Redirect to success page with coupon code
      // router.push(`/claim-discount/success?coupon=${data.couponCode}`)
      localStorage.setItem(
        'leadId',
        data.leadId
      )

      router.push(
        `/scratch?leadId=${data.leadId}`
      )
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('[v0] Form submission error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
  Claim Your Exclusive Discount
</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="
    w-full
    px-4
    py-3
    bg-white
    text-gray-900
    placeholder:text-gray-400
    border
    border-gray-300
    rounded-lg
    focus:ring-2
    focus:ring-orange-500
    focus:border-orange-500
    outline-none
  "
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
             className="
    w-full
    px-4
    py-3
    bg-white
    text-gray-900
    placeholder:text-gray-400
    border
    border-gray-300
    rounded-lg
    focus:ring-2
    focus:ring-orange-500
    focus:border-orange-500
    outline-none
  "
            placeholder="10-digit mobile number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Area/Colony</label>
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
             className="
    w-full
    px-4
    py-3
    bg-white
    text-gray-900
    placeholder:text-gray-400
    border
    border-gray-300
    rounded-lg
    focus:ring-2
    focus:ring-orange-500
    focus:border-orange-500
    outline-none
  "
            placeholder="Your area or colony name"
          />
        </div>
      </div>

   <button
  type="submit"
  disabled={loading}
  className="
    w-full
    mt-6
    bg-orange-500
    text-white
    py-3
    rounded-lg
    font-semibold
    hover:bg-orange-600
    transition
    disabled:opacity-50
  "
>
        {loading ? 'Processing...' : 'Claim Discount & Get Coupon Code'}
      </button>

      <p className="text-xs text-foreground/60 text-center mt-4">
        We&apos;ll contact you within 2 hours to confirm your first order.
      </p>
    </motion.form>
  )
}
