'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const STEPS = [
  {
    number: '01',
    title: 'Choose Fabric',
    description: 'Select from premium silks, georgettes, organza, and our signature Mira blends.',
  },
  {
    number: '02',
    title: 'Pick Pattern',
    description: 'Browse our library of traditional and contemporary motifs curated by master designers.',
  },
  {
    number: '03',
    title: 'Personalize Details',
    description: 'Define border width, zari type, blouse style, and embellishments to your taste.',
  },
  {
    number: '04',
    title: 'Delivered in 21 Days',
    description: 'Your bespoke creation woven by artisan hands, delivered to your doorstep.',
  },
]

export function CustomizationCTA() {
  return (
    <section className="py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Steps */}
          <div className="space-y-6">
            <p className="font-dm text-[11px] tracking-[0.3em] uppercase text-warm-gray">
              Bespoke Craftsmanship
            </p>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-dark-ink leading-tight">
              Design Your
              <br />
              <em className="italic text-burgundy">Dream Saree</em>
            </h2>
            <div className="h-[1px] w-16 bg-gold" />

            <div className="space-y-8 pt-4">
              {STEPS.map((step, index) => (
                <div
                  key={step.number}
                  className="flex gap-6 group"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <span className="font-cormorant text-4xl md:text-5xl font-light text-gold/30 group-hover:text-gold transition-colors duration-500 flex-shrink-0 leading-none pt-1">
                    {step.number}
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-cormorant text-xl text-dark-ink">
                      {step.title}
                    </h3>
                    <p className="font-dm text-sm text-warm-gray leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/customize" className="btn-primary group inline-flex mt-6">
              Start Customizing
              <ArrowRight
                size={16}
                className="ml-2 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Right — Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1609748340878-bc0f02e2b98c?w=1200&q=90"
                alt="Artisan hand-weaving a custom saree on a traditional loom"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Decorative frame */}
            <div className="absolute -top-4 -right-4 w-full h-full border border-gold/20 -z-10 hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  )
}
