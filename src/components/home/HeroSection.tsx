'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const STATS = [
  { number: '500+', label: 'Designs' },
  { number: '12', label: 'Weave Traditions' },
  { number: '28', label: 'Years of Trust' },
]

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP parallax effect on scroll
    const handleScroll = () => {
      if (!imageRef.current) return
      const scrolled = window.scrollY
      imageRef.current.style.transform = `translateY(${scrolled * 0.15}px)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 items-center min-h-screen pt-24 pb-12">
          {/* Left — Content */}
          <div className="relative z-10 space-y-8 lg:pr-16">
            <div className="space-y-2">
              <p className="font-dm text-[11px] tracking-[0.3em] uppercase text-warm-gray animate-fade-in">
                Luxury Indian Heritage
              </p>
              <h2 className="font-cormorant text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] animate-slide-up">
                The Art of
                <br />
                Draping{' '}
                <em className="font-cormorant italic text-gold not-italic font-light">
                  Reimagined
                </em>
              </h2>
            </div>

            <p className="font-dm text-base text-warm-gray max-w-md leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Each MIRA saree is a testament to India&apos;s timeless weaving
              heritage — where centuries-old traditions meet contemporary
              elegance, one thread at a time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Link href="/shop" className="btn-primary group">
                Explore Collection
                <ArrowRight
                  size={16}
                  className="ml-2 transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link href="/customize" className="btn-outline">
                Customize Yours
              </Link>
            </div>

            {/* Stats Row */}
            <div className="flex gap-10 pt-6 border-t border-border animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-cormorant text-3xl md:text-4xl font-light text-dark-ink">
                    {stat.number}
                  </p>
                  <p className="font-dm text-[11px] tracking-[0.1em] uppercase text-warm-gray mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Image */}
          <div className="relative lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-1/2">
            <div ref={imageRef} className="relative h-[60vh] lg:h-full w-full overflow-hidden">
              <Image
                src="/images/sarees/banarasi-red.png"
                alt="Luxury silk saree draped elegantly"
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/30 to-transparent lg:block hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-ivory via-transparent to-transparent lg:hidden" />
            </div>

            {/* Floating Price Badge */}
            <div className="absolute bottom-8 left-8 bg-ivory/90 backdrop-blur-md p-5 luxury-shadow animate-float hidden lg:block">
              <p className="font-dm text-[10px] tracking-[0.2em] uppercase text-warm-gray">
                Starting from
              </p>
              <p className="font-cormorant text-3xl font-light text-dark-ink mt-1">
                ₹2,899
              </p>
              <p className="font-dm text-[10px] text-gold mt-1">
                Handcrafted with Love
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
