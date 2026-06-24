'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface SuccessClientProps {
  couponCode: string
}

export default function SuccessClient({ couponCode }: SuccessClientProps) {
  const handleWhatsApp = () => {
    const message = `Hi! I just claimed my Dabbawala India discount coupon: ${couponCode}. I'd like to know more about the meal plans available in my area.`
    const encoded = encodeURIComponent(message)
    window.open(`https://wa.me/919009208389?text=${encoded}`, '_blank')
  }

  return (
    <main>
      <Header />
      <section className="min-h-screen bg-gradient-to-b from-secondary/10 to-background py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-7xl mb-6 flex justify-center"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 0.6 }}
            >
              🎉
            </motion.div>

            <h1 className="text-5xl font-bold text-primary mb-4">Congratulations!</h1>
            <p className="text-xl text-foreground/70 mb-8">
              Your discount coupon has been generated successfully!
            </p>

            <motion.div
              className="bg-white border-4 border-secondary rounded-2xl p-8 mb-8 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-sm font-semibold text-foreground/60 mb-2">YOUR COUPON CODE</p>
              <motion.div
                className="text-5xl font-black text-secondary tracking-wider"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                {couponCode}
              </motion.div>
              <p className="text-sm text-foreground/60 mt-4">
                Save this code and use it when placing your first order
              </p>
            </motion.div>

            <div className="bg-accent/20 rounded-xl p-6 mb-8 border border-accent/30">
              <h3 className="font-semibold text-primary mb-4">What&apos;s Included:</h3>
              <ul className="space-y-2 text-left text-foreground/70">
                <li className="flex gap-3">
                  <span className="text-accent">✓</span>
                  <span>20% discount on your first month</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">✓</span>
                  <span>Free delivery on all orders</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">✓</span>
                  <span>Priority customer support</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">✓</span>
                  <span>Customize your meal preferences</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={handleWhatsApp}
                className="px-8 py-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition flex items-center justify-center gap-2"
              >
                💬 Share on WhatsApp
              </button>
              <Link
                href="/"
                className="px-8 py-4 border-2 border-secondary text-secondary rounded-lg font-semibold hover:bg-secondary/10 transition"
              >
                Browse Plans
              </Link>
            </div>

            <div className="bg-muted/50 rounded-xl p-6">
              <h3 className="font-semibold text-primary mb-4">Next Steps:</h3>
              <ol className="space-y-3 text-left text-foreground/70">
                <li className="flex gap-3">
                  <span className="font-semibold text-secondary">1.</span>
                  <span>Our team will contact you within 2 hours via phone/WhatsApp</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-secondary">2.</span>
                  <span>Discuss your meal preferences and dietary requirements</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-secondary">3.</span>
                  <span>Confirm your first delivery date and time</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-secondary">4.</span>
                  <span>Start enjoying authentic homemade meals at your doorstep!</span>
                </li>
              </ol>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
