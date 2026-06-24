'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Sparkles, Trophy } from 'lucide-react'

type CouponData = {
    couponCode: string
    reward: string
    isRevealed?: boolean
}

type ScratchCardSectionProps = {
    couponData: CouponData | null
    isLoading: boolean
    error: string | null
    isRevealed: boolean
    onReveal: () => void
}

export default function ScratchCardSection({
    couponData,
    isLoading,
    error,
    isRevealed,
    onReveal,
}: ScratchCardSectionProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [scratchProgress, setScratchProgress] = useState(0)
    const [isScratching, setIsScratching] = useState(false)
    const revealTriggered = useRef(false)
    const moveCounter = useRef(0)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const width = 320
        const height = 240
        canvas.width = width
        canvas.height = height
        const dpr = window.devicePixelRatio || 1

        canvas.width = width * dpr
        canvas.height = height * dpr

        ctx.scale(dpr, dpr)
        canvas.style.width = '100%'
        canvas.style.height = '100%'

        ctx.clearRect(0, 0, width, height)
        ctx.save()
        const gradient = ctx.createLinearGradient(0, 0, width, height)
        gradient.addColorStop(0, '#f97316')
        gradient.addColorStop(1, '#fb923c')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)

        ctx.fillStyle = 'rgba(255,255,255,0.16)'
        ctx.fillRect(18, 18, width - 36, height - 36)

        ctx.fillStyle = '#fff7ed'
        ctx.font = '700 24px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('SCRATCH TO WIN', width / 2, height / 2 - 10)
        ctx.font = '500 14px sans-serif'
        ctx.fillText('Reveal your reward', width / 2, height / 2 + 18)
        ctx.fillText('Swipe here', width / 2, height / 2 + 42)
        ctx.restore()

        setScratchProgress(0)
        revealTriggered.current = false
    }, [couponData, isRevealed, error])

    const scratchAt = (clientX: number, clientY: number) => {
        const canvas = canvasRef.current

        if (!canvas || isRevealed || !couponData) return

        const rect = canvas.getBoundingClientRect()

        const x =
            ((clientX - rect.left) / rect.width) *
            canvas.width

        const y =
            ((clientY - rect.top) / rect.height) *
            canvas.height

        const ctx = canvas.getContext('2d')

        if (!ctx) return

        ctx.save()

        ctx.globalCompositeOperation =
            'destination-out'

        ctx.beginPath()

        ctx.arc(x, y, 30, 0, Math.PI * 2)

        ctx.fill()

        ctx.restore()

        moveCounter.current += 1

        if (moveCounter.current % 8 !== 0) return

        const imageData = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        )

        const pixels = imageData.data

        let removed = 0

        for (let i = 3; i < pixels.length; i += 4) {
            if (pixels[i] === 0) removed++
        }

        const progress = Math.round(
            (removed / (canvas.width * canvas.height)) * 100
        )

        setScratchProgress(progress)

        if (
            progress >= 50 &&
            !revealTriggered.current
        ) {
            revealTriggered.current = true
            onReveal()
        }
    }
    const handlePointerDown = (
        event: React.PointerEvent<HTMLCanvasElement>
    ) => {
        console.log('SCRATCH START')

        event.preventDefault()

        event.currentTarget.setPointerCapture(
            event.pointerId
        )

        setIsScratching(true)

        scratchAt(
            event.clientX,
            event.clientY
        )
    }
    const handlePointerMove = (
        event: React.PointerEvent<HTMLCanvasElement>
    ) => {
        if (!isScratching) return

        scratchAt(
            event.clientX,
            event.clientY
        )
    }

    const handlePointerUp = (
        event: React.PointerEvent<HTMLCanvasElement>
    ) => {
        setIsScratching(false)

        try {
            event.currentTarget.releasePointerCapture(
                event.pointerId
            )
        } catch { }
    }

    if (isLoading) {
        return (
            <div className="rounded-[2rem] border border-orange-100 bg-white p-4 shadow-sm sm:p-6">
                <div className="animate-pulse space-y-3">
                    <div className="h-4 w-28 rounded-full bg-orange-100" />
                    <div className="h-8 w-3/4 rounded-full bg-slate-100" />
                    <div className="h-56 rounded-[1.5rem] bg-slate-100" />
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="rounded-[2rem] border border-red-100 bg-red-50 p-6 text-red-700 shadow-sm">
                <div className="flex items-center gap-2 font-semibold">
                    <Sparkles className="h-5 w-5" /> Oops!
                </div>
                <p className="mt-3 text-sm">{error}</p>
            </div>
        )
    }

    if (isRevealed && couponData) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="overflow-hidden rounded-[2rem] border border-green-200 bg-white shadow-[0_20px_70px_rgba(34,197,94,0.15)]"
            >
                <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 p-8 text-center text-white">
                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 3,
                        }}
                        className="absolute left-10 top-10 text-4xl"
                    >
                        🎊
                    </motion.div>

                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 2.5,
                        }}
                        className="absolute right-10 top-20 text-4xl"
                    >
                        🎁
                    </motion.div>

                    <h2 className="mt-4 text-4xl font-black">
                        Congratulations!
                    </h2>

                    <p className="mt-2 text-lg opacity-90">
                        Your coupon has been generated successfully
                    </p>
                </div>

                <div className="p-8 text-center">

                    <div className="mb-6 text-6xl">
                        🏆
                    </div>

                    <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
                        You Won
                    </p>

                    <h3 className="mt-2 text-5xl font-black text-slate-900">
                        {couponData.reward}
                    </h3>

                    <div className="mt-8 rounded-3xl border-2 border-dashed border-orange-300 bg-orange-50 p-6">
                        <p className="text-sm text-slate-500">
                            Coupon Code
                        </p>

                        <p className="mt-2 text-3xl font-black tracking-widest text-orange-600">
                            {couponData.couponCode}
                        </p>
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-2 text-green-600">
                        <span className="text-xl">✅</span>
                        <span className="font-semibold">
                            Coupon Generated Successfully
                        </span>
                    </div>

                    <a
                        href={`https://wa.me/919009208389?text=${encodeURIComponent(
                            `Hi Dabbawala India,

I won a scratch card reward.

Coupon Code: ${couponData.couponCode}

Reward: ${couponData.reward}

I would like to claim my offer.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-green-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-green-700"
                    >
                        💬 Claim on WhatsApp
                    </a>

                </div>
            </motion.div>
        )
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[2rem] border border-orange-100 bg-white p-4 shadow-[0_20px_70px_rgba(249,115,22,0.12)] sm:p-6"
        >
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <p className="text-sm font-semibold text-orange-600">Scratch Card</p>
                    <p className="text-sm text-slate-500">Reveal the reward with a single swipe.</p>
                </div>
                <div className="rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-600">
                    {scratchProgress}% scratched
                </div>
            </div>

            <div className="relative overflow-hidden rounded-[1.5rem] border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50 p-3">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.16),_transparent_45%)]" />
                <div className="relative rounded-[1.25rem] border border-white/80 bg-white/70 p-2">
                    <div className="relative h-[240px] overflow-hidden rounded-[1rem] bg-slate-100">
                        <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(22,163,74,0.15),_rgba(249,115,22,0.08))]" />
                        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
                            <div className="rounded-full bg-white/80 p-3 shadow-sm">
                                <Trophy className="h-6 w-6 text-orange-500" />
                            </div>
                            <p className="text-lg font-semibold text-slate-800">Your reward is waiting</p>
                            <p className="text-sm text-slate-600">Scratch at least 50% to unlock your coupon.</p>
                        </div>
                        <canvas
                            ref={canvasRef}
                            className="
    absolute
    inset-0
    z-50
    h-full
    w-full
    cursor-grab
    active:cursor-grabbing
    touch-none
    pointer-events-auto
  "
                            onPointerDown={handlePointerDown}
                            onPointerMove={handlePointerMove}
                            onPointerUp={handlePointerUp}
                            onPointerCancel={handlePointerUp}
                            onPointerLeave={handlePointerUp}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                <p className="font-semibold">Tip</p>
                <p>Use your finger or mouse to clear the silver coating. Your reward appears once you reveal over half the card.</p>
            </div>
        </motion.div>
    )
}
