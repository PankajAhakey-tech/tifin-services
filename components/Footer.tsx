'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />

      {/* CTA Banner */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-10">

          <div className="bg-gradient-to-r from-orange-500 to-green-600 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">

            <div>
              <h3 className="text-3xl font-black mb-2">
                🍱 Ready For Fresh Homemade Food?
              </h3>

              <p className="text-white/90">
                Join hundreds of happy customers across Indore.
              </p>
            </div>

            <a
              href="https://wa.me/919009208389"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-orange-600 font-bold px-8 py-4 rounded-xl hover:scale-105 transition"
            >
              💬 Order On WhatsApp
            </a>

          </div>

        </div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">

          {/* Brand */}
          <div>

            <Link href="/" className="flex items-center gap-3 mb-5">
              <Image
                src="/images/logo.png"
                alt="Dabbawala India"
                width={55}
                height={55}
                className="rounded-full"
              />

              <div>
                <h3 className="font-bold text-xl">
                  Dabbawala India
                </h3>

                <p className="text-sm text-orange-400">
                  Homemade Tiffin Service
                </p>
              </div>
            </Link>

            <p className="text-slate-300 leading-relaxed">
              Fresh, hygienic and delicious homemade meals delivered daily
              across Indore. Perfect for students, working professionals,
              bachelors and families.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 mt-6">

              <div className="bg-white/10 px-3 py-2 rounded-lg text-sm">
                🌱 Fresh Food
              </div>

              <div className="bg-white/10 px-3 py-2 rounded-lg text-sm">
                🚚 Fast Delivery
              </div>

              <div className="bg-white/10 px-3 py-2 rounded-lg text-sm">
                ⭐ 4.9 Rating
              </div>

            </div>

          </div>

          {/* Quick Links */}
          <div>

            <h4 className="font-bold text-lg mb-5 text-orange-400">
              Quick Links
            </h4>

            <ul className="space-y-3">

              <li>
                <Link
                  href="/"
                  className="text-slate-300 hover:text-white transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="#plans"
                  className="text-slate-300 hover:text-white transition"
                >
                  Meal Plans
                </Link>
              </li>

              <li>
                <Link
                  href="#about"
                  className="text-slate-300 hover:text-white transition"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/claim-discount"
                  className="text-slate-300 hover:text-white transition"
                >
                  Claim Discount
                </Link>
              </li>

            </ul>

          </div>

          {/* Delivery Areas */}
          <div>

            <h4 className="font-bold text-lg mb-5 text-green-400">
              Delivery Areas
            </h4>

            <ul className="space-y-3 text-slate-300">

              <li>📍 Vijay Nagar</li>
              <li>📍 Bhawarkua</li>
              <li>📍 Palasia</li>
              <li>📍 Bengali Square</li>
              <li>📍 Rajendra Nagar</li>
              <li>📍 Sudama Nagar</li>
              <li>📍 And More...</li>

            </ul>

          </div>

          {/* Contact */}
          <div>

            <h4 className="font-bold text-lg mb-5 text-orange-400">
              Contact Us
            </h4>

            <div className="space-y-4">

              <a
                href="tel:+919009208389"
                className="block text-slate-300 hover:text-white"
              >
                📞 +91 90092 08389
              </a>

              {/* <a
                href="mailto:info@dabbawalaindia.com"
                className="block text-slate-300 hover:text-white"
              >
                📧 info@dabbawalaindia.com
              </a> */}

              <div className="text-slate-300">
                🕒 10 AM - 9 PM
              </div>

              <div className="text-slate-300">
                📍 Indore, Madhya Pradesh
              </div>

            </div>

            {/* Social */}
            <div className="flex gap-3 mt-6">

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 transition"
              >
                📷
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-500 transition"
              >
                👍
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-sky-500 transition"
              >
                🐦
              </a>

            </div>

          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-8">

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            <p className="text-slate-400 text-sm">
              © 2026 Dabbawala India. All Rights Reserved.
            </p>

            <div className="flex gap-6 text-sm text-slate-400">
              <Link href="/privacy-policy">
                Privacy Policy
              </Link>

              <Link href="/terms">
                Terms & Conditions
              </Link>
            </div>

          </div>

          <div className="text-center mt-6 text-slate-500 text-sm">
            Made with ❤️ for food lovers in Indore 🍱
          </div>

        </div>

      </div>
    </footer>
  )
}