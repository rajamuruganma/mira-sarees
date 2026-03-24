'use client'

import Image from 'next/image'
import { Star, MapPin, Award, Heart } from 'lucide-react'
import { ARTISANS } from '@/lib/constants'

const TIMELINE = [
  { year: '1996', title: 'The First Loom', description: 'Founded in the ancient weaving lanes of Varanasi with a single handloom and a dream.' },
  { year: '2005', title: 'National Recognition', description: 'Awarded the National Handloom Award for preserving endangered weaving techniques.' },
  { year: '2015', title: 'Digital Journey', description: 'Launched our online platform to bring artisan sarees to doorsteps across India.' },
  { year: '2020', title: 'Customization Studio', description: 'Introduced our bespoke saree customization service connecting customers directly with artisans.' },
  { year: '2024', title: '28 Years of Legacy', description: '500+ designs, 50+ artisan families, and a community of 100,000 happy patrons.' },
]

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden mb-20">
        <Image
          src="https://images.unsplash.com/photo-1609748340878-bc0f02e2b98c?w=1600&q=90"
          alt="Artisan weaving on a traditional handloom"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-dark-ink/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="font-dm text-[11px] tracking-[0.3em] uppercase text-gold-light mb-4">Our Story</p>
          <h1 className="font-cormorant text-5xl md:text-7xl font-light text-ivory leading-tight">
            Where Threads<br />
            <em className="italic text-gold-light">Become Stories</em>
          </h1>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Brand Story */}
        <section className="max-w-3xl mx-auto text-center mb-24">
          <h2 className="font-cormorant text-3xl md:text-4xl font-light text-dark-ink mb-6">
            A Legacy Woven in Silk
          </h2>
          <p className="font-dm text-base text-warm-gray leading-relaxed mb-6">
            MIRA was born from a profound reverence for India&apos;s textile heritage — a heritage that stretches
            back thousands of years, carried forward by the skilled hands of artisan families who have dedicated
            generations to the art of weaving.
          </p>
          <p className="font-dm text-base text-warm-gray leading-relaxed mb-6">
            Our founder traveled to the weaving villages of Varanasi, Kanchipuram, Chanderi, and Paithan,
            witnessing firsthand the extraordinary craftsmanship that goes into every thread. Each saree takes
            15 to 45 days to weave on a handloom — a labor of love that no machine can replicate.
          </p>
          <p className="font-dm text-base text-warm-gray leading-relaxed">
            Today, MIRA bridges the gap between these master artisans and discerning patrons worldwide,
            ensuring that ancient weaving traditions not only survive but thrive in the modern world.
          </p>
          <div className="mt-8 h-[1px] w-16 mx-auto bg-gold" />
        </section>

        {/* Values */}
        <section className="grid md:grid-cols-3 gap-8 mb-24">
          {[
            { icon: Heart, title: 'Artisan First', description: 'Fair wages. Direct partnerships. We ensure 70% of every sale reaches the artisan families who create these masterpieces.' },
            { icon: Award, title: 'Uncompromised Quality', description: 'Every saree undergoes a 12-point quality check. We reject anything that doesn\'t meet our exacting standards of craftsmanship.' },
            { icon: Star, title: 'Sustainable Luxury', description: 'Natural dyes. Handloom weaving. Zero power looms. Our sarees are created with respect for both heritage and the environment.' },
          ].map(({ icon: Icon, title, description }) => (
            <div key={title} className="text-center p-8 border border-border/50 hover:border-gold/30 transition-colors">
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-5">
                <Icon size={24} className="text-gold" />
              </div>
              <h3 className="font-cormorant text-xl text-dark-ink mb-3">{title}</h3>
              <p className="font-dm text-sm text-warm-gray leading-relaxed">{description}</p>
            </div>
          ))}
        </section>

        {/* Timeline */}
        <section className="mb-24">
          <div className="text-center mb-14">
            <p className="font-dm text-[11px] tracking-[0.3em] uppercase text-warm-gray mb-3">Our Journey</p>
            <h2 className="font-cormorant text-3xl md:text-4xl font-light text-dark-ink">28 Years of Trust</h2>
            <div className="mt-4 h-[1px] w-16 mx-auto bg-gold" />
          </div>
          <div className="max-w-2xl mx-auto space-y-0">
            {TIMELINE.map((item, i) => (
              <div key={item.year} className="flex gap-8 pb-10 relative">
                {/* Line */}
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-gold flex-shrink-0 z-10" />
                  {i < TIMELINE.length - 1 && <div className="w-[1px] flex-1 bg-border" />}
                </div>
                <div className="pb-2">
                  <span className="font-cormorant text-2xl text-gold">{item.year}</span>
                  <h3 className="font-cormorant text-lg text-dark-ink mt-1">{item.title}</h3>
                  <p className="font-dm text-sm text-warm-gray mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Artisan Profiles */}
        <section className="mb-12">
          <div className="text-center mb-14">
            <p className="font-dm text-[11px] tracking-[0.3em] uppercase text-warm-gray mb-3">Meet the Makers</p>
            <h2 className="font-cormorant text-3xl md:text-4xl font-light text-dark-ink">Our Artisans</h2>
            <div className="mt-4 h-[1px] w-16 mx-auto bg-gold" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ARTISANS.map((artisan) => (
              <div key={artisan.id} className="bg-blush p-8 text-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-5">
                  <Image src={artisan.avatar_url} alt={artisan.name} fill className="object-cover" sizes="96px" />
                </div>
                <h3 className="font-cormorant text-xl text-dark-ink">{artisan.name}</h3>
                <p className="font-dm text-xs text-gold mt-1">{artisan.speciality}</p>
                <div className="flex items-center justify-center gap-1.5 mt-2">
                  <MapPin size={12} className="text-warm-gray" />
                  <span className="font-dm text-xs text-warm-gray">{artisan.region}</span>
                </div>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Star size={12} className="fill-gold text-gold" />
                  <span className="font-dm text-xs text-warm-gray">{artisan.rating} • {artisan.years_experience} years</span>
                </div>
                <p className="font-dm text-xs text-warm-gray leading-relaxed mt-4">{artisan.bio}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
