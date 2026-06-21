import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import TrustSection from '@/components/TrustSection'
import PricingSection from '@/components/PricingSection'
import StatsSection from '@/components/StatsSection'
import ReviewsSection from '@/components/ReviewsSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <TrustSection />
      <PricingSection />
      {/* <StatsSection /> */}
      {/* <ReviewsSection /> */}
      <Footer />
    </main>
  )
}
