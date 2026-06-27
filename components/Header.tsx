'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handlePlanClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    const plansSection = document.getElementById('plans')
    if (plansSection) {
      plansSection.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }

  const navLinkClass =
    'text-lg font-medium transition-all duration-300 hover:text-secondary'

  return (
    <motion.header
  className={`sticky top-0 z-50 transition-all duration-300 ${
    isScrolled
      ? 'bg-white shadow-lg'
      : 'bg-white/95 backdrop-blur'
  }`}
>
<div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">

  {/* Logo */}
  <Link href="/" className="flex-shrink-0">
    <Image
      src="/images/logo.png"
      alt="Dabbawala India"
      width={120}
      height={120}
      className="object-contain w-[110px] h-[110px] md:w-[90px] md:h-[90px]"
    />
  </Link>

  {/* Trust Badges */}
  <div className="flex flex-col md:flex-row items-end md:items-center gap-2 md:gap-3">

    <div className="flex gap-2">

      <div className="cursor-pointer hover:scale-105 transition-all bg-yellow-50 border border-yellow-200 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
        ⭐ 4.9 Rating
      </div>

      <div className="bg-orange-50 border border-orange-200 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold">
        🎁 ₹100 OFF
      </div>

    </div>

    <span className="text-xs md:text-sm font-medium text-slate-600">
      Starting at <span className="text-green-600 font-bold">₹65/Meal</span>
    </span>

  </div>

  {/* Desktop Navigation */}
  <nav className="hidden md:flex items-center gap-8">
    <Link
      href="/"
      className={`${navLinkClass} ${
        pathname === '/'
          ? 'text-primary border-b-2 border-primary pb-1'
          : 'text-foreground'
      }`}
    >
      Home
    </Link>

    <a
      href="#plans"
      onClick={handlePlanClick}
      className={`${navLinkClass} text-foreground cursor-pointer`}
    >
      Plans
    </a>

    <Link
      href="/admin/login"
      className="px-5 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:scale-105 transition-all"
    >
      Admin
    </Link>
  </nav>

</div>
    </motion.header>
  )
}