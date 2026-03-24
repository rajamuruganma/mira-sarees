import { HeroSection } from '@/components/home/HeroSection'
import { MarqueeBar } from '@/components/home/MarqueeBar'
import { CollectionsGrid } from '@/components/home/CollectionsGrid'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { SareeShowcase } from '@/components/home/SareeShowcase'
import { BridalBanner } from '@/components/home/BridalBanner'
import { CustomizationCTA } from '@/components/home/CustomizationCTA'
import { ArtisanStories } from '@/components/home/ArtisanStories'
import { Testimonials } from '@/components/home/Testimonials'
import { Newsletter } from '@/components/home/Newsletter'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeBar />
      <CollectionsGrid />
      <SareeShowcase />
      <FeaturedProducts />
      <BridalBanner />
      <CustomizationCTA />
      <ArtisanStories />
      <Testimonials />
      <Newsletter />
    </>
  )
}
