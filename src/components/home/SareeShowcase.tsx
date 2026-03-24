'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag, Eye } from 'lucide-react'

const SHOWCASE_MODELS = [
  {
    name: 'Anika',
    style: 'Bridal Elegance',
    saree: 'Royal Red Banarasi',
    image: '/images/sarees/banarasi-red.png',
    category: 'wedding',
  },
  {
    name: 'Priya',
    style: 'Traditional Grace',
    saree: 'Golden Kanjivaram Silk',
    image: '/images/sarees/kanjivaram-purple.png',
    category: 'traditional',
  },
  {
    name: 'Kavya',
    style: 'Classic Beauty',
    saree: 'Chanderi Green Silk',
    image: '/images/sarees/chanderi-green.png',
    category: 'traditional',
  },
  {
    name: 'Meera',
    style: 'Bridal Luxe',
    saree: 'Bridal Gold Silk',
    image: '/images/sarees/bridal-gold.png',
    category: 'wedding',
  },
  {
    name: 'Diya',
    style: 'Festive Glamour',
    saree: 'Festive Orange Silk',
    image: '/images/sarees/festive-orange.png',
    category: 'party',
  },
  {
    name: 'Isha',
    style: 'Modern Heritage',
    saree: 'Royal Blue Silk',
    image: '/images/sarees/silk-blue.png',
    category: 'designer',
  },
]

const FILTERS = ['all', 'wedding', 'traditional', 'designer', 'party']

export function SareeShowcase() {
  const [activeFilter, setActiveFilter] = useState('all')
  const filtered = activeFilter === 'all'
    ? SHOWCASE_MODELS
    : SHOWCASE_MODELS.filter((m) => m.category === activeFilter)

  return (
    <section className="py-20 md:py-28 bg-dark-ink">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="font-dm text-[11px] tracking-[0.3em] uppercase text-gold-light mb-3">
            Style Inspiration
          </p>
          <h2 className="font-cormorant text-4xl md:text-5xl font-light text-ivory">
            The Saree <em className="italic text-gold">Gallery</em>
          </h2>
          <div className="mt-4 h-[1px] w-16 mx-auto bg-gold/50" />
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-3 flex-wrap mb-12">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 font-dm text-[11px] tracking-[0.15em] uppercase border transition-all duration-300 ${
                activeFilter === f
                  ? 'bg-gold text-dark-ink border-gold'
                  : 'border-ivory/20 text-ivory/60 hover:border-gold/50 hover:text-gold-light'
              }`}
            >
              {f === 'all' ? 'All Styles' : f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filtered.map((model, index) => (
            <Link
              href="/shop"
              key={model.name}
              className="group relative aspect-[3/4] overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Image
                src={model.image}
                alt={`${model.name} wearing ${model.saree}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, 33vw"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-ink/90 via-dark-ink/20 to-transparent" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Quick action icons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
                <button className="w-9 h-9 bg-ivory/90 backdrop-blur-sm flex items-center justify-center hover:bg-gold hover:text-dark-ink transition-colors" onClick={(e) => e.preventDefault()}>
                  <Heart size={14} />
                </button>
                <button className="w-9 h-9 bg-ivory/90 backdrop-blur-sm flex items-center justify-center hover:bg-gold hover:text-dark-ink transition-colors" onClick={(e) => e.preventDefault()}>
                  <Eye size={14} />
                </button>
                <button className="w-9 h-9 bg-ivory/90 backdrop-blur-sm flex items-center justify-center hover:bg-gold hover:text-dark-ink transition-colors" onClick={(e) => e.preventDefault()}>
                  <ShoppingBag size={14} />
                </button>
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <span className="inline-block px-2.5 py-1 bg-gold/20 backdrop-blur-sm text-gold-light text-[9px] font-dm tracking-[0.15em] uppercase mb-3">
                  {model.style}
                </span>
                <h3 className="font-cormorant text-xl md:text-2xl text-ivory">{model.saree}</h3>
                <p className="font-dm text-xs text-ivory/50 mt-1">Styled by {model.name}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/shop" className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-dark-ink font-dm text-xs tracking-[0.15em] uppercase hover:bg-gold-light transition-colors">
            View All Sarees
            <ShoppingBag size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
