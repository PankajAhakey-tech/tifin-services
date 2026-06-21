'use client'

import { motion } from 'framer-motion'

const reviews = [
  {
    name: 'Rajesh Kumar',
    role: 'Software Engineer',
    content: 'Finally found someone who cooks like my mom! The tiffin arrives hot and fresh every single day.',
    rating: 5,
  },
  {
    name: 'Priya Singh',
    role: 'Medical Student',
    content: 'As a busy med student, this service is a lifesaver. Nutritious, homemade meals at affordable prices.',
    rating: 5,
  },
  {
    name: 'Vikram Patel',
    role: 'CA Student',
    content: 'The variety in the menu is amazing. Never felt like I&apos;m eating the same thing twice.',
    rating: 5,
  },
  {
    name: 'Anjali Sharma',
    role: 'Working Professional',
    content: 'Customer support is excellent. They even customize meals according to my dietary preferences.',
    rating: 5,
  },
  {
    name: 'Akshay Nair',
    role: 'Bachelor',
    content: 'Worth every penny! Tastes authentic and healthy. Highly recommended to anyone away from home.',
    rating: 5,
  },
  {
    name: 'Neha Gupta',
    role: 'Designer',
    content: 'The packaging is eco-friendly and the delivery is always on time. Great service overall.',
    rating: 5,
  },
]

export default function ReviewsSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center text-primary mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Why Customers Love Us
        </motion.h2>
        <p className="text-center text-foreground/60 mb-12 max-w-2xl mx-auto">
          Real feedback from our happy customers across the country
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="bg-background p-6 rounded-xl border border-border hover:shadow-lg transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-primary">{review.name}</h4>
                  <p className="text-sm text-foreground/60">{review.role}</p>
                </div>
                <div className="flex gap-1">
                  {Array(review.rating)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i} className="text-lg">
                        ⭐
                      </span>
                    ))}
                </div>
              </div>
              <p className="text-foreground/80">&quot;{review.content}&quot;</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
