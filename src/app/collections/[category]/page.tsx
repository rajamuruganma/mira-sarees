'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { CATEGORIES } from '@/lib/constants'
import { GENERATED_PRODUCTS } from '@/lib/product-data'
import { ProductCard } from '@/components/ui/ProductCard'

export default function CollectionPage() {
  const params = useParams()
  const categorySlug = params.category as string

  const category = CATEGORIES.find((c) => c.slug === categorySlug)
  const products = GENERATED_PRODUCTS.filter(
    (p) => p.category_name.toLowerCase() === categorySlug?.toLowerCase()
  )

  if (!category) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="font-cormorant text-4xl text-dark-ink mb-4">
          Collection Not Found
        </h1>
        <Link href="/shop" className="btn-outline">
          View All Collections
        </Link>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-20">
      {/* Hero Banner */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden mb-12">
        <Image
          src={category.image_url || ''}
          alt={category.name}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-dark-ink/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="font-dm text-[11px] tracking-[0.3em] uppercase text-gold-light mb-4">
            Collection
          </p>
          <h1 className="font-cormorant text-5xl md:text-7xl font-light text-ivory">
            {category.name}
          </h1>
          <p className="mt-4 font-dm text-sm text-ivory/70 max-w-lg">
            {category.description}
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-8 font-dm text-xs text-warm-gray">
          <Link href="/" className="hover:text-dark-ink transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-dark-ink transition-colors">
            Shop
          </Link>
          <ChevronRight size={12} />
          <span className="text-dark-ink">{category.name}</span>
        </nav>

        <p className="font-dm text-sm text-warm-gray mb-8">
          {products.length} {products.length === 1 ? 'design' : 'designs'}
        </p>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-cormorant text-2xl text-dark-ink mb-4">
              No designs available yet
            </p>
            <Link href="/shop" className="btn-outline">
              Explore All Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
