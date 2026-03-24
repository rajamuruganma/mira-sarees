'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { PRODUCTS } from '@/lib/constants'
import { ProductCard } from '@/components/ui/ProductCard'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        p.category_name.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-warm-gray" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for sarees, fabrics, collections..."
              className="w-full px-14 py-5 bg-white border border-border font-dm text-base text-dark-ink placeholder:text-warm-gray focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-warm-gray hover:text-dark-ink transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Popular Searches */}
          {!query && (
            <div className="mt-6 text-center">
              <p className="font-dm text-xs text-warm-gray mb-3">Popular searches</p>
              <div className="flex gap-2 flex-wrap justify-center">
                {['Banarasi Silk', 'Bridal', 'Kanjivaram', 'Under ₹5000', 'Chanderi', 'Organza'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-4 py-2 border border-border font-dm text-xs tracking-wider hover:border-gold hover:text-gold transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {query && (
          <>
            <p className="font-dm text-sm text-warm-gray mb-8">
              {results.length} result{results.length !== 1 ? 's' : ''} for &quot;{query}&quot;
            </p>

            {results.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <p className="font-cormorant text-2xl text-dark-ink">No sarees found</p>
                <p className="font-dm text-sm text-warm-gray">
                  Try searching for a different fabric, category, or product name.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12">
                {results.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
