'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { CATEGORIES, PRODUCTS } from '@/lib/constants'

const FEATURED_CATEGORIES = CATEGORIES.slice(0, 4) // Banarasi, Kanjivaram, Chanderi, Organza

export function CollectionsGrid() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up')
          }
        })
      },
      { threshold: 0.1 }
    )

    const cards = sectionRef.current?.querySelectorAll('.collection-card')
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-28">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="font-dm text-[11px] tracking-[0.3em] uppercase text-warm-gray mb-3">
            Curated For You
          </p>
          <h2 className="font-cormorant text-4xl md:text-5xl font-light text-dark-ink">
            Our Collections
          </h2>
          <div className="mt-4 h-[1px] w-16 mx-auto bg-gold" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {FEATURED_CATEGORIES.map((category, index) => {
            const productCount = PRODUCTS.filter(
              (p) => p.category_name === category.name
            ).length

            return (
              <Link
                key={category.id}
                href={`/collections/${category.slug}`}
                className="collection-card group relative aspect-[3/4] overflow-hidden opacity-0"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <Image
                  src={category.image_url || ''}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />

                {/* Gradient Overlay */}
                <div className="collection-overlay absolute inset-0 z-10" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-20">
                  {/* Design Count Badge */}
                  <span className="inline-block px-2.5 py-1 bg-gold/20 backdrop-blur-sm text-gold-light text-[10px] font-dm tracking-wider uppercase mb-3">
                    {productCount} Designs
                  </span>

                  <h3 className="font-cormorant text-2xl md:text-3xl text-ivory font-light">
                    {category.name}
                  </h3>

                  {/* Hover CTA Arrow */}
                  <div className="flex items-center gap-2 mt-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                    <span className="font-dm text-xs tracking-wider uppercase text-gold-light">
                      Explore
                    </span>
                    <ArrowUpRight size={14} className="text-gold-light" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
