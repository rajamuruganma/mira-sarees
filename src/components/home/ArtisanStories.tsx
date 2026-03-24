'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { Star, MapPin } from 'lucide-react'
import { ARTISANS } from '@/lib/constants'

export function ArtisanStories() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -340, behavior: 'smooth' })
  }

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 340, behavior: 'smooth' })
  }

  return (
    <section className="py-20 md:py-28 bg-blush/30">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="text-center mb-14 px-6">
          <p className="font-dm text-[11px] tracking-[0.3em] uppercase text-warm-gray mb-3">
            The Hands Behind The Threads
          </p>
          <h2 className="font-cormorant text-4xl md:text-5xl font-light text-dark-ink">
            Artisan Stories
          </h2>
          <div className="mt-4 h-[1px] w-16 mx-auto bg-gold" />
        </div>

        {/* Horizontal Scroll */}
        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-ivory/90 backdrop-blur-sm border border-border rounded-full flex items-center justify-center hover:bg-ivory hover:border-gold transition-all shadow-sm hidden md:flex"
            aria-label="Scroll left"
          >
            ←
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-ivory/90 backdrop-blur-sm border border-border rounded-full flex items-center justify-center hover:bg-ivory hover:border-gold transition-all shadow-sm hidden md:flex"
            aria-label="Scroll right"
          >
            →
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto px-6 md:px-12 pb-4 scrollbar-hide snap-x snap-mandatory"
          >
            {ARTISANS.map((artisan) => (
              <div
                key={artisan.id}
                className="flex-shrink-0 w-[300px] bg-ivory border border-border/50 overflow-hidden group snap-start luxury-shadow hover:luxury-shadow-lg transition-shadow duration-500"
              >
                {/* Avatar */}
                <div className="relative h-[280px] overflow-hidden">
                  <Image
                    src={artisan.avatar_url}
                    alt={artisan.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="300px"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-ink/60 to-transparent h-24" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-1">
                    <Star size={12} className="fill-gold text-gold" />
                    <span className="text-xs font-dm text-ivory/90">
                      {artisan.rating}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 space-y-2">
                  <h3 className="font-cormorant text-xl text-dark-ink">
                    {artisan.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-warm-gray">
                    <MapPin size={12} />
                    <span className="font-dm text-xs">{artisan.region}</span>
                  </div>
                  <p className="font-dm text-[11px] tracking-wider uppercase text-gold">
                    {artisan.speciality}
                  </p>
                  {artisan.years_experience && (
                    <p className="font-dm text-xs text-warm-gray">
                      {artisan.years_experience} years of experience
                    </p>
                  )}
                  <p className="font-dm text-xs text-warm-gray/80 leading-relaxed line-clamp-3 pt-1">
                    {artisan.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
