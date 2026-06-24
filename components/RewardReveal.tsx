'use client'

import { motion } from 'framer-motion'
import { Gift, Sparkles } from 'lucide-react'
import WhatsAppClaimButton from '@/components/WhatsAppClaimButton'

type CouponData = {
  couponCode: string
  reward: string
  isRevealed?: boolean
}

type RewardRevealProps = {
  couponData: CouponData | null
  isRevealed: boolean
  isLoading: boolean
  error: string | null
}

const confettiPieces = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  left: `${(index * 7) % 100}%`,
  delay: `${index * 0.04}s`,
  color: index % 2 === 0 ? '#f97316' : '#16a34a',
}))

export default function RewardReveal({ couponData, isRevealed, isLoading, error }: RewardRevealProps) {
  if (isLoading) {
    return (
      <div className="rounded-[2rem] border border-orange-100 bg-white p-6 shadow-sm">
        <div className="animate-pulse space-y-3">
          <div className="h-4 w-24 rounded-full bg-orange-100" />
          <div className="h-8 w-3/4 rounded-full bg-slate-100" />
          <div className="h-20 rounded-[1.25rem] bg-slate-100" />
        </div>
      </div>
    )
  }

  if (error || !couponData) {
    return (
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 text-orange-600">
          <Sparkles className="h-5 w-5" />
          <p className="font-semibold">Your reward is on the way</p>
        </div>
        <p className="mt-3 text-sm text-slate-600">
          {error || 'A fresh coupon will appear here once the card is ready.'}
        </p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-[2rem] border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-green-50 p-6 shadow-[0_20px_70px_rgba(22,163,74,0.12)]"
    >
      {isRevealed && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {confettiPieces.map((piece) => (
            <motion.span
              key={piece.id}
              className="absolute top-0 h-3 w-2 rounded-full"
              style={{ left: piece.left, backgroundColor: piece.color }}
              initial={{ y: -20, opacity: 0, rotate: 0 }}
              animate={{ y: [0, 1000], opacity: [0, 1, 0], rotate: [0, 360] }}
              transition={{ duration: 2.2, delay: Number(piece.delay.replace('s', '')), ease: 'easeOut' }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-sm font-semibold text-orange-600 shadow-sm">
          <Gift className="h-4 w-4" />
          {isRevealed ? 'Reward unlocked' : 'Ready to reveal'}
        </div>

        {isRevealed ? (
          <>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="rounded-[1.5rem] border border-emerald-100 bg-white/90 p-5 shadow-lg"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">🎉 Congratulations!</p>
              <h2 className="mt-2 text-3xl font-black text-slate-900">You Won</h2>
              <p className="mt-2 text-2xl font-bold text-orange-600">{couponData.reward}</p>
              <div className="mt-4 rounded-2xl border border-dashed border-orange-200 bg-orange-50 p-4">
                <p className="text-sm font-semibold text-slate-500">Coupon Code</p>
                <p className="mt-1 font-mono text-lg font-bold tracking-[0.18em] text-slate-900">
                  {couponData.couponCode}
                </p>
              </div>
            </motion.div>

            <WhatsAppClaimButton couponCode={couponData.couponCode} reward={couponData.reward} />
          </>
        ) : (
          <div className="rounded-[1.5rem] border border-orange-100 bg-white/80 p-5 shadow-sm">
            <p className="text-base font-semibold text-slate-800">Scratch your card to unlock your reward.</p>
            <p className="mt-2 text-sm text-slate-600">
              Each card reveals an instant meal discount from Dabbawala India. Use it on your next order.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
