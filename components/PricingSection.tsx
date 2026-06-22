'use client'

import { motion } from 'framer-motion'

const plans = [
  {
    icon: '🍱',
    name: 'Daily Lunch Tiffin',
    meals: '28 Fresh Lunch Tiffins',
    price: 2099,
    popular: false,
    description:
      'Perfect for students, bachelors and office professionals.',
    features: [
      'Fresh Home-Style Food',
      'Dal, Rice, Sabzi & 5 Roti',
      'Healthy & Hygienic Kitchen',
      'Timely Delivery',
      'Weekly Special Dish',
    ],
  },
  {
    icon: '🍲',
    name: 'Lunch + Dinner Pack',
    meals: '56 Fresh Meals',
    price: 3599,
    popular: true,
    description:
      'Enjoy both lunch and dinner throughout the month.',
    features: [
      'Lunch + Dinner Included',
      'Fresh Daily Cooking',
      'Balanced Nutrition',
      'Priority Delivery',
      'Weekly Special Dish',
    ],
  },
  {
    icon: '👨‍👩‍👧‍👦',
    name: 'Family Tiffin',
    meals: 'Custom Requirement',
    price: null,
    popular: false,
    description:
      'Special plans for families, offices and bulk orders.',
    features: [
      'Family Meals',
      'Office Lunch Orders',
      'Corporate Catering',
      'Bulk Quantity',
      'Customized Menu',
    ],
  },
]
const includedItems = [
  'Dal',
  'Rice',
  'Sabzi',
  '5 Roti',
  'Salad',
  'Pickle / Chutney / Papad',
  'Sweet / Mouth Freshener',
  'Tissue Paper',
]

const specialMeals = [
  'Dal Bafla',
  'Idli Sambhar',
  'Chole Bhature',
  'Veg Pulav',
  'Puri Sabzi',
  'Special Paneer',
  'Stuffed Parathe',
]

export default function PricingSection() {
  return (
    <section
      id="plans"
      className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-orange-50"
    >
      {/* Background Blur */}
      <div className="absolute top-20 left-0 w-80 h-80 bg-orange-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-300/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">

        {/* Heading */}
       <div className="text-center max-w-4xl mx-auto mb-16">
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-5 py-2 rounded-full font-semibold mb-5"
  >
    🏠 Homemade Food Delivered Across Indore
  </motion.div>

  <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
    Ghar Jaisa Khana,
    <span className="block text-orange-500">
      Roz Aapke Darwaze Tak
    </span>
  </h2>

  <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
    Maa ke haath jaisa swaad, fresh ingredients aur
    hygienic cooking ke saath. Roz garma-garam tiffin
    delivery Indore mein.
  </p>
</div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8">

          {plans.map((plan, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              className={`relative rounded-3xl overflow-hidden shadow-xl ${
                plan.popular
                  ? 'border-2 border-orange-500 bg-white scale-105'
                  : 'bg-white border border-orange-100'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-green-500 text-white text-center py-2 font-semibold">
                 ❤️ Customer Favourite
                </div>
              )}

              <div className={`p-8 ${plan.popular ? 'pt-14' : ''}`}>

                <h3 className="text-2xl font-bold text-slate-900">
                  {plan.name}
                </h3>

                <p className="text-green-600 font-semibold mt-2">
                  {plan.meals}
                </p>

                <p className="text-slate-500 mt-4 min-h-[50px]">
                  {plan.description}
                </p>

                <div className="my-6">

                  {plan.price ? (
                    <>
                      <span className="text-5xl font-black text-orange-500">
                        ₹{plan.price}
                      </span>

                      <span className="text-slate-500">
                        /month
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-black text-green-600">
                      Contact Us
                    </span>
                  )}

                </div>

                <a
                  href="https://wa.me/917415442359"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center py-4 rounded-xl font-bold transition ${
                    plan.popular
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : 'border-2 border-orange-500 text-orange-500 hover:bg-orange-50'
                  }`}
                >
                  {plan.price
                    ? '🍽️ Order Now'
                    : '📲 Contact Us'}
                </a>

                <ul className="mt-8 space-y-4">

                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3"
                    >
                      <span className="text-green-600 text-lg">
                        ✓
                      </span>

                      <span className="text-slate-700">
                        {feature}
                      </span>
                    </li>
                  ))}

                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* What's Included */}
        <div className="mt-24 bg-white rounded-3xl shadow-xl p-10">

          <h3 className="text-3xl font-bold text-center text-slate-900 mb-4">
            🍽️ Every Tiffin Includes
          </h3>

          <p className="text-center text-slate-600 mb-10">
            Freshly prepared meals with balanced nutrition.
          </p>

          <div className="grid md:grid-cols-4 gap-4">

            {includedItems.map((item, index) => (
              <div
                key={index}
                className="bg-orange-50 border border-orange-100 rounded-xl p-4 text-center font-medium"
              >
                ✅ {item}
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Special */}
        <div className="mt-16 bg-gradient-to-r from-orange-500 to-green-600 rounded-3xl p-10 text-white">

          <div className="text-center">

            <h3 className="text-3xl font-bold mb-4">
              🎉 Weekly Special Meal
            </h3>

            <p className="text-lg opacity-90 mb-8">
              Every week enjoy a special surprise meal.
            </p>

            <div className="flex flex-wrap justify-center gap-4">

              {specialMeals.map((meal, index) => (
                <div
                  key={index}
                  className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-full"
                >
                  {meal}
                </div>
              ))}

            </div>
          </div>
        </div>

        {/* CTA */}
        <h3 className="text-4xl font-bold text-slate-900 mb-4">
  Maa Ka Khana Miss Kar Rahe Ho?
</h3>

<p className="text-slate-600 mb-8 text-lg">
  Ab roz milega ghar jaisa swaad, fresh aur hygienic tiffin
  service ke saath.
</p>

<a
  href="https://wa.me/917415442359"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-2xl font-bold shadow-xl"
>
  🍱 WhatsApp Par Tiffin Book Karein
</a>

      </div>
    </section>
  )
}