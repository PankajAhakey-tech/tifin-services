'use client'

import { motion } from 'framer-motion'

const trustItems = [
  {
    icon: '🥗',
    title: 'Fresh & Nutritious Meals',
    description:
      'Daily prepared meals using fresh vegetables, quality ingredients and balanced nutrition.',
  },
  {
    icon: '🛡️',
    title: '100% Hygienic Kitchen',
    description:
      'Prepared in clean kitchens with strict hygiene standards and quality checks.',
  },
  {
    icon: '🚚',
    title: 'On-Time Delivery',
    description:
      'Hot and fresh lunch & dinner delivered across Indore exactly when you need it.',
  },
  {
    icon: '❤️',
    title: 'Taste Like Home',
    description:
      'Simple, delicious and comforting food just like Maa prepares at home.',
  },
]

export default function TrustSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-orange-50">

      {/* Background Blur Effects */}
      <div className="absolute top-20 left-0 w-80 h-80 bg-orange-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-300/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-6"
        >
          <div className="bg-orange-100 text-orange-700 px-5 py-2 rounded-full font-semibold shadow-md">
            ⭐ Trusted By Hundreds Of Families In Indore
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-slate-900">
            Why Indore Chooses
            <span className="block bg-gradient-to-r from-orange-500 to-green-600 bg-clip-text text-transparent">
              Our Tiffin Service?
            </span>
          </h2>

          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            Whether you're a student, working professional, living in a PG,
            hostel or away from family, we bring fresh homemade food right
            to your doorstep every day.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
              }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-green-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />

              <div className="relative bg-white/80 backdrop-blur-lg border border-white shadow-xl rounded-3xl p-8 h-full">

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-green-500 flex items-center justify-center text-3xl mb-6 shadow-lg">
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-slate-600 leading-relaxed">
                  {item.description}
                </p>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
          }}
          className="mt-20"
        >
          <div className="bg-white rounded-3xl shadow-2xl border border-orange-100 p-10">

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

              <div>
                <h3 className="text-4xl font-black text-orange-500">
                  500+
                </h3>
                <p className="text-slate-600 mt-2">
                  Happy Customers
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-black text-green-600">
                  10K+
                </h3>
                <p className="text-slate-600 mt-2">
                  Meals Delivered
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-black text-orange-500">
                  ⭐ 4.9
                </h3>
                <p className="text-slate-600 mt-2">
                  Customer Rating
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-black text-green-600">
                  100%
                </h3>
                <p className="text-slate-600 mt-2">
                  Freshly Cooked
                </p>
              </div>

            </div>

          </div>
        </motion.div>

        {/* Bottom Highlight */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-3 bg-green-100 text-green-700 px-6 py-4 rounded-2xl font-semibold shadow-md">
            🍱 Fresh Lunch & Dinner Delivered Across Indore Every Day
          </div>
        </motion.div>

      </div>
    </section>
  )
}