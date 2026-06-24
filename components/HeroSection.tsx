'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
return ( <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-8 md:pt-12">

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
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >

        {/* Offer Badge */}
        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-5 py-2 rounded-full font-semibold shadow-md">
          🎁 Get ₹100 OFF On Your First Tiffin Order
        </div>

        {/* Heading */}
      {/* Heading */}
<div className="space-y-4">

  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">

    <span className="block text-slate-900">
      माँ के हाथ का खाना
    </span>

    <span className="block text-orange-500">
      मिस कर rahe ho?
    </span>

    <span className="block text-green-600 mt-2">
      Ghar Jaisa Khana,
    </span>

    <span className="block text-slate-900">
      Har Din, Time Par.
    </span>

  </h1>

  <p className="text-base md:text-xl font-medium text-slate-700">
    Taste of Home, Delivered to You
  </p>

</div>

        {/* Description */}
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl">
          Hostel mein ho? Office ki busy life mein ghar ka khana miss kar rahe ho?

          Dabbawala India laata hai fresh, hygienic aur homemade meals,
          jo maa ke haath ke swaad ki yaad dilaye aur roz time par
          aapke doorstep tak pahunchaye.
        </p>

        {/* Plan Card */}
        <div className="inline-flex items-center gap-5 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-xl border border-orange-100">

          <div>
            <p className="text-sm text-slate-500">
              Starting Plan
            </p>

            <h3 className="text-3xl font-bold text-orange-500">
              ₹2099
            </h3>
          </div>

          <div className="h-12 w-px bg-slate-200" />

          <div>
            <p className="text-sm text-slate-500">
              Includes
            </p>

            <h3 className="font-bold text-green-600">
              28 Tiffins 🍱
            </h3>
          </div>

        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4">

          <Link
            href="/claim-discount"
            className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold shadow-xl transition-all duration-300 hover:scale-105"
          >
            🎁 Claim ₹100 Discount
          </Link>

          <a
            href="https://wa.me/919009208389"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-xl transition-all duration-300 hover:scale-105"
          >
            💬 WhatsApp Us
          </a>

        </div>

        {/* Trust Features */}
        <div className="flex flex-wrap gap-3">

          <div className="bg-white/90 backdrop-blur-sm px-5 py-3 rounded-xl shadow-md">
            🌱 Pure & Nutritious
          </div>

          <div className="bg-white/90 backdrop-blur-sm px-5 py-3 rounded-xl shadow-md">
            🛡 Hygienic & Safe
          </div>

          <div className="bg-white/90 backdrop-blur-sm px-5 py-3 rounded-xl shadow-md">
            🚚 On Time Delivery
          </div>

          <div className="bg-white/90 backdrop-blur-sm px-5 py-3 rounded-xl shadow-md">
            ❤️ Made With Care
          </div>

        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-10 pt-4">

          <div>
            <div className="text-4xl font-bold text-orange-500">
              5000+
            </div>
            <div className="text-slate-600">
              Happy Customers
            </div>
          </div>

          <div>
            <div className="text-4xl font-bold text-green-600">
              ⭐ 4.9
            </div>
            <div className="text-slate-600">
              Customer Rating
            </div>
          </div>

          <div>
            <div className="text-4xl font-bold text-slate-900">
              100%
            </div>
            <div className="text-slate-600">
              Fresh & Hygienic
            </div>
          </div>

        </div>

      </motion.div>

      {/* RIGHT SIDE */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative flex justify-center items-center"
      >

        <Image
          src="/images/logo.png"
          alt="Dabbawala India"
          width={550}
          height={550}
          priority
          className="drop-shadow-2xl"
        />

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-10 right-0 bg-white/90 backdrop-blur-md px-5 py-4 rounded-2xl shadow-xl"
        >
          <div className="font-bold">🍱 Fresh Meals</div>
          <div className="text-sm text-slate-500">Cooked Daily</div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-10 left-0 bg-white/90 backdrop-blur-md px-5 py-4 rounded-2xl shadow-xl"
        >
          <div className="font-bold">🚚 Free Delivery</div>
          <div className="text-sm text-slate-500">On Time Everyday</div>
        </motion.div>

      </motion.div>

    </div>
  </div>

</section>

)
}
