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
          <div className="space-y-3">

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-slate-900">
              <span className="block">
                माँ के हाथ का स्वाद,
              </span>

              <span className="block text-orange-500">
                अब हर दिन आपके साथ।
              </span>
            </h1>

            <p className="text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Fresh, hygienic and homemade meals delivered daily across Indore
              for students, working professionals and families.
            </p>

          </div>

          {/* Description */}
          <p className="text-sm md:text-base text-slate-600 leading-7 max-w-2xl">
            Hostel mein ho ya office ki busy life mein ghar ka khana miss kar rahe ho?
            Dabbawala India fresh, hygienic aur homemade meals aapke doorstep tak
            time par pahunchata hai, bilkul ghar ke swaad ke saath.
          </p>

          {/* stats card */}
          <div className="flex flex-wrap gap-10 py-2">

            <div>
              <div className="text-4xl font-bold text-orange-500">
                5000+
              </div>
              <div className="text-slate-600 text-sm">
                Happy Customers
              </div>
            </div>

            <div>
              <div className="text-4xl font-bold text-green-600">
                4.9★
              </div>
              <div className="text-slate-600 text-sm">
                Customer Rating
              </div>
            </div>

            <div>
              <div className="text-4xl font-bold text-slate-900">
                100%
              </div>
              <div className="text-slate-600 text-sm">
                Freshly Cooked
              </div>
            </div>

          </div>

          {/* Plan Card */}
          <div className="inline-flex items-center gap-5 bg-white px-6 py-4 rounded-2xl shadow-lg border border-slate-100">

            <div>
              <p className="text-sm text-slate-500">
                Starting From
              </p>

              <h3 className="text-3xl font-bold text-orange-500">
                ₹2099
              </h3>
            </div>

            <div className="h-12 w-px bg-slate-200" />

            <div>
              <p className="text-sm text-slate-500">
                Monthly Plan
              </p>

              <h3 className="font-semibold text-slate-900">
                28 Meals Included
              </h3>
            </div>

          </div>


          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">

            <Link
              href="/claim-discount"
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold shadow-lg transition"
            >
              Get ₹100 OFF
            </Link>

            <a
              href="https://wa.me/919009208389"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold shadow-lg transition"
            >
              Order On WhatsApp
            </a>

          </div>

          {/* Trust Features */}
          <div className="flex flex-wrap gap-3">

            {[
              'Freshly Cooked Daily',
              '100% Hygienic Kitchen',
              'On-Time Delivery',
              'Homemade Taste'
            ].map((item) => (
              <div
                key={item}
                className="bg-white px-4 py-2 rounded-full border border-slate-200 text-sm font-medium text-slate-700 shadow-sm"
              >
                {item}
              </div>
            ))}

          </div>

        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative hidden lg:flex justify-center items-center"
        >

          <Image
            src="/images/bg_logo.png"
            alt="Homemade Tiffin"
            width={550}
            height={550}
            priority
            className="drop-shadow-2xl"
          />

          {/* Floating Stats */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-10 right-0 bg-white px-5 py-4 rounded-2xl shadow-xl"
          >
            <div className="text-2xl font-bold text-orange-500">
              5000+
            </div>
            <div className="text-sm text-slate-500">
              Customers Served
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute bottom-10 left-0 bg-white px-5 py-4 rounded-2xl shadow-xl"
          >
            <div className="text-2xl font-bold text-green-600">
              4.9★
            </div>
            <div className="text-sm text-slate-500">
              Average Rating
            </div>
          </motion.div>

        </motion.div>

      </div>
    </div>

  </section>

  )
}
