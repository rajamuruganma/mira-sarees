'use client'

import { MARQUEE_ITEMS } from '@/lib/constants'

export function MarqueeBar() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <section className="bg-dark-ink py-4 overflow-hidden relative">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-dark-ink to-transparent z-10" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-dark-ink to-transparent z-10" />

      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="font-cormorant text-sm md:text-base tracking-wider text-gold-light/90 mx-4">
              {item}
            </span>
            <span className="text-gold/40 mx-2">◆</span>
          </span>
        ))}
      </div>
    </section>
  )
}
