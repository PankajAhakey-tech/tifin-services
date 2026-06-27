'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  return (<section className="relative min-h-[90vh] flex items-center overflow-hidden pt-8 md:pt-12">

    {/* Background Image */}
    <div className="absolute inset-0">
      <Image
        src="/images/hero-bg.png"
        alt="Homemade Tiffin"
        fill
        priority
        className="object-cover"
      />
    </div>

    {/* Overlay */}
    <div className="absolute inset-0 bg-white/85" />

    {/* Decorative Blurs */}
    <div className="absolute top-20 right-20 w-80 h-80 bg-orange-300/20 rounded-full blur-3xl" />
    <div className="absolute bottom-10 left-10 w-96 h-96 bg-green-300/20 rounded-full blur-3xl" />

<div className="container mx-auto px-4 relative z-20">
  <div className="grid lg:grid-cols-2 gap-12 items-center">

    {/* LEFT CONTENT */}
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      className="order-2 lg:order-1 space-y-6"
    >

     

      {/* Offer */}
      <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold">
        🎁 Get ₹100 OFF On Your First Tiffin Order
      </div>

      {/* Heading */}
      <div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-slate-900">
          माँ के हाथ का स्वाद,
          <span className="block text-orange-500">
            अब हर दिन आपके साथ।
          </span>
        </h1>

        <p className="mt-4 text-base md:text-lg text-slate-600">
          Fresh, hygienic and homemade meals delivered daily across Indore.
        </p>
      </div>

      {/* Description */}
      <p className="text-slate-600 leading-7">
        Hostel, PG ya office life mein ghar ka khana miss kar rahe ho?
        Dabbawala India fresh homemade meals roz time par aapke doorstep tak
        pahunchata hai.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl md:text-3xl font-bold text-orange-500">
            1000+
          </div>
          <p className="text-xs md:text-sm text-slate-600">
            Customers
          </p>
        </div>

        <div>
          <div className="text-2xl md:text-3xl font-bold text-green-600">
            4.9★
          </div>
          <p className="text-xs md:text-sm text-slate-600">
            Rating
          </p>
        </div>

        <div>
          <div className="text-2xl md:text-3xl font-bold text-slate-900">
            100%
          </div>
          <p className="text-xs md:text-sm text-slate-600">
            Fresh Food
          </p>
        </div>
      </div>

      {/* Pricing Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>
            <p className="text-sm text-slate-500">
              Starting From
            </p>

            <h3 className="text-3xl font-bold text-orange-500">
              ₹2099
            </h3>

            <p className="text-sm text-green-600 font-medium">
              Approx ₹65 per meal
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Monthly Plan
            </p>

            <h4 className="font-semibold text-slate-900">
              28 Fresh Tiffins Included
            </h4>
          </div>

        </div>
      </div>

      {/* CTA */}
<div className="flex flex-col sm:flex-row gap-4">
  <Link
    href="/claim-discount"
    className="text-center px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold shadow-lg hover:bg-orange-600 transition"
  >
    Get ₹100 OFF
  </Link>

  <a
    href="https://wa.me/919009208389"
    target="_blank"
    rel="noopener noreferrer"
    className="text-center px-8 py-4 bg-green-600 text-white rounded-xl font-semibold shadow-lg hover:bg-green-700 transition"
  >
    Order On WhatsApp
  </a>
</div>

{/* Mobile Image */}
<div className="flex justify-center lg:hidden pt-2">
  <Image
    src="/images/bg_logo.png"
    alt="Dabbawala India"
    width={260}
    height={260}
    priority
    className="drop-shadow-xl"
  />
</div>

      {/* Trust Badges */}
      <div className="flex flex-wrap gap-3">
        {[
          'Freshly Cooked Daily',
          '100% Hygienic',
          'On-Time Delivery',
          'Homemade Taste',
        ].map((item) => (
          <span
            key={item}
            className="bg-white border border-slate-200 rounded-full px-4 py-2 text-sm text-slate-700"
          >
            {item}
          </span>
        ))}
      </div>

    </motion.div>

    {/* DESKTOP IMAGE */}
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      className="hidden lg:flex justify-center order-2"
    >
      <Image
        src="/images/bg_logo.png"
        alt="Dabbawala India"
        width={520}
        height={520}
        priority
        className="drop-shadow-2xl"
      />
    </motion.div>

  </div>
</div>

  </section>

  )
}
