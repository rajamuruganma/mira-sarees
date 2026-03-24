'use client'

import { useState, useRef, useEffect } from 'react'
import { GENERATED_PRODUCTS } from '@/lib/product-data'
import { ProductCard } from '@/components/ui/ProductCard'

const FILTER_TABS = [
  'All',
  'Banarasi',
  'Kanjivaram',
  'Chanderi',
  'Organza',
  'Printed',
  'Embroidered',
]

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('All')
  const sectionRef = useRef<HTMLElement>(null)

  const filteredProducts =
    activeTab === 'All'
      ? GENERATED_PRODUCTS.slice(0, 8)
      : GENERATED_PRODUCTS.filter((p) => p.category_name === activeTab).slice(0, 8)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in')
          }
        })
      },
      { threshold: 0.05 }
    )
    const section = sectionRef.current
    if (section) observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-blush/50">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="font-dm text-[11px] tracking-[0.3em] uppercase text-warm-gray mb-3">
            Handpicked Treasures
          </p>
          <h2 className="font-cormorant text-4xl md:text-5xl font-light text-dark-ink">
            Featured Sarees
          </h2>
          <div className="mt-4 h-[1px] w-16 mx-auto bg-gold" />
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex gap-1 bg-ivory/80 p-1 border border-border">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 font-dm text-xs tracking-wider uppercase whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-dark-ink text-ivory'
                    : 'text-warm-gray hover:text-dark-ink'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-14">
          <a href="/shop" className="btn-outline">
            View All Collections
          </a>
        </div>
      </div>
    </section>
  )
}
