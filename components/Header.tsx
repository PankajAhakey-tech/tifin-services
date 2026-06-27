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
          ? 'bg-background/95 backdrop-blur shadow-lg'
          : 'bg-background/80 backdrop-blur'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
     <div className="container mx-auto px-8 py-5 flex items-center justify-between">
        {/* Logo */}
       <Link href="/" className="flex items-center ml-4">
  <Image
    src="/images/logo.png"
    alt="Dabbawala India"
    width={90}
    height={90}
    className="object-contain"
  />
</Link>

        {/* Navigation */}
        <nav className="flex items-center gap-10">
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