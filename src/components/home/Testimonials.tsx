'use client'

import Image from 'next/image'
import { Star } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/constants'

export function Testimonials() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-dm text-[11px] tracking-[0.3em] uppercase text-warm-gray mb-3">
            What Our Patrons Say
          </p>
          <h2 className="font-cormorant text-4xl md:text-5xl font-light text-dark-ink">
            Woven with Trust
          </h2>
          <div className="mt-4 h-[1px] w-16 mx-auto bg-gold" />
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-ivory border border-border/50 p-8 md:p-10 relative luxury-shadow hover:luxury-shadow-lg transition-shadow duration-500"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Decorative Quote Mark */}
              <span className="absolute top-6 left-8 font-cormorant text-8xl text-gold/20 leading-none select-none pointer-events-none">
                &ldquo;
              </span>

              {/* Quote */}
              <blockquote className="relative z-10 pt-8">
                <p className="font-cormorant text-lg md:text-xl italic leading-relaxed text-dark-ink/80">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </blockquote>

              {/* Stars */}
              <div className="flex gap-1 mt-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-gold text-gold"
                  />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-border/50">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="font-cormorant text-base font-medium text-dark-ink">
                    {testimonial.name}
                  </p>
                  <p className="font-dm text-xs text-warm-gray">
                    {testimonial.city} • Verified Purchase
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
