'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

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
      plansSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Dabbawala India"
            width={48}
            height={48}
            className="rounded-full"
          />
          <span className="font-bold text-lg text-primary hidden sm:inline">Dabbawala India</span>
        </Link>

        <nav className="flex items-center gap-8 text-sm">
          <Link href="/" className="text-foreground hover:text-secondary transition">
            Home
          </Link>
          <a href="#plans" onClick={handlePlanClick} className="text-foreground hover:text-secondary transition cursor-pointer">
            Plans
          </a>
          <Link href="/admin/login" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-opacity-90 transition">
            Admin
          </Link>
        </nav>
      </div>
    </motion.header>
  )
}
