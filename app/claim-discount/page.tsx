import Header from '@/components/Header'
import DiscountForm from '@/components/DiscountForm'
import Footer from '@/components/Footer'

export default function ClaimDiscountPage() {
  return (
    <main>
      <Header />
      <section className="min-h-screen bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Get Your Exclusive Discount
            </h1>
            <p className="text-lg text-foreground/70">
              Join thousands of happy customers and enjoy authentic homemade meals. Fill in your details below to claim your special discount coupon.
            </p>
          </div>

          <DiscountForm />

          <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl mb-2">🎁</div>
              <h3 className="font-semibold text-primary mb-2">Special Discount</h3>
              <p className="text-sm text-foreground/70">Get up to 20% off on your first month</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold text-primary mb-2">Instant Coupon</h3>
              <p className="text-sm text-foreground/70">Use your code immediately after claiming</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💬</div>
              <h3 className="font-semibold text-primary mb-2">Quick Support</h3>
              <p className="text-sm text-foreground/70">Our team contacts you within 2 hours</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
