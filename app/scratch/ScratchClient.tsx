'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, UtensilsCrossed } from 'lucide-react'
import ScratchCardSection from '@/components/ScratchCardSection'
import RewardReveal from '@/components/RewardReveal'
import { useSearchParams } from 'next/navigation'

type CouponData = {
    couponCode: string
    reward: string
    isRevealed?: boolean
}

const STORAGE_KEY = 'dabbawala-scratch-reward'

export default function ScratchPage() {
    const searchParams = useSearchParams()
    const [couponData, setCouponData] = useState<CouponData | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isRevealed, setIsRevealed] = useState(false)

    useEffect(() => {
        const stored = window.localStorage.getItem(STORAGE_KEY)
        if (stored) {
            try {
                const parsed = JSON.parse(stored) as CouponData
                setCouponData(parsed)
                setIsRevealed(true)
                setIsLoading(false)
                return
            } catch {
                window.localStorage.removeItem(STORAGE_KEY)
            }
        }

        const fetchCoupon = async () => {
            try {
                const leadId =
                    searchParams.get('leadId') ||
                    localStorage.getItem('leadId')

                if (!leadId) {
                    throw new Error(
                        'Invalid coupon link'
                    )
                }

                const response = await fetch(
                    `/api/leads/${leadId}`,
                    {
                        cache: 'no-store',
                    }
                )

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(
                        data?.error ||
                        'Coupon not found'
                    )
                }

                setCouponData({
                    couponCode: data.couponCode,
                    reward: data.reward,
                })
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Unable to load coupon'
                )
            } finally {
                setIsLoading(false)
            }
        }

        void fetchCoupon()
    }, [searchParams])

    const handleReveal = () => {
        if (!couponData) return
        setIsRevealed(true)
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(couponData))
    }

    const headline = useMemo(() => {
        if (isRevealed) {
            return 'Your reward is ready to enjoy'
        }
        return 'Scan & Win Instant Discount'
    }, [isRevealed])



    return (
        <>
            {isRevealed && couponData && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div className="mx-4 max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">
                        <div className="text-6xl mb-4">
                            🎉🎊🥳
                        </div>

                        <h2 className="text-3xl font-black text-green-600">
                            Congratulations!
                        </h2>

                        <p className="mt-3 text-slate-600">
                            Your coupon has been generated successfully.
                        </p>

                        <div className="mt-6 rounded-2xl bg-orange-50 p-4">
                            <p className="text-sm text-slate-500">
                                Coupon Code
                            </p>

                            <p className="mt-2 text-2xl font-black text-orange-500">
                                {couponData.couponCode}
                            </p>

                            <p className="mt-2 font-semibold text-green-600">
                                {couponData.reward}
                            </p>
                        </div>

                        <a
                            href={`https://wa.me/917415442359?text=Hi%20Dabbawala,%20I%20want%20to%20claim%20my%20coupon%20${couponData.couponCode}`}
                            className="mt-6 inline-block rounded-xl bg-green-600 px-6 py-3 font-bold text-white"
                        >
                            Claim on WhatsApp
                        </a>
                    </div>
                </div>
            )}
            <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.12),_transparent_30%),linear-gradient(135deg,_#fffaf4_0%,_#fffdf9_100%)] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">

                <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
                    <motion.section
                        initial={{ opacity: 0, x: -18 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-full rounded-[2rem] border border-orange-100 bg-white/85 p-5 shadow-[0_20px_70px_rgba(15,23,42,0.06)] backdrop-blur sm:p-8 lg:max-w-xl"
                    >
                        <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-600">
                            <Sparkles className="h-4 w-4" />
                            Dabbawala India
                        </div>

                        <div className="mt-5 flex items-start gap-3">
                            <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">
                                <UtensilsCrossed className="h-6 w-6" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black leading-tight sm:text-4xl">{headline}</h1>
                                <p className="mt-3 text-base leading-7 text-slate-600">
                                    Scratch the card to reveal your instant food reward and claim a tasty discount on your next order.
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 rounded-[1.5rem] border border-emerald-100 bg-emerald-50/80 p-4 text-sm text-emerald-800">
                            <p className="font-semibold">How it works</p>
                            <ul className="mt-2 space-y-2">
                                <li>• Scan the QR code and land on this page.</li>
                                <li>• Scratch the card to reveal your reward.</li>
                                <li>• Share it instantly on WhatsApp to place your order.</li>
                            </ul>
                        </div>
                    </motion.section>

                    <div className="w-full space-y-6 lg:max-w-2xl">
                        {!isRevealed && (
                            <ScratchCardSection
                                couponData={couponData}
                                isLoading={isLoading}
                                error={error}
                                isRevealed={isRevealed}
                                onReveal={handleReveal}
                            />
                        )}

                        <RewardReveal couponData={couponData} isRevealed={isRevealed} isLoading={isLoading} error={error} />
                    </div>
                </div>
            </main>
        </>
    )
}
