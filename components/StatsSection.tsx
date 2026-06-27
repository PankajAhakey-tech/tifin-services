'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const StatCounter = ({ end, label }: { end: number; label: string }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const timer = setInterval(() => {
      start += end / 50
      if (start > end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 30)

    return () => clearInterval(timer)
  }, [end])

  return (
    <div className="text-center">
      <div className="text-5xl font-bold text-secondary mb-2">{count}+</div>
      <div className="text-foreground/60">{label}</div>
    </div>
  )
}

export default function StatsSection() {
  const stats = [
    { end: 1000, label: 'Happy Customers' },
    { end: 10000, label: 'Meals Delivered' },
    { end: 15, label: 'City Coverage' },
    { end: 98, label: 'Satisfaction Rate' },
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <StatCounter end={stat.end} label={stat.label} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
