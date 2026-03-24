'use client'

import Link from 'next/link'
import { ChevronRight, Heart } from 'lucide-react'
import { PRODUCTS } from '@/lib/constants'
import { ProductCard } from '@/components/ui/ProductCard'

export default function WishlistPage() {
  // Mock: show first 4 products as wishlisted
  const wishlistItems = PRODUCTS.slice(0, 4)

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex items-center gap-2 mb-2 font-dm text-xs text-warm-gray">
          <Link href="/account" className="hover:text-dark-ink transition-colors">Account</Link>
          <ChevronRight size={12} />
          <span className="text-dark-ink">Wishlist</span>
        </div>
        <h1 className="font-cormorant text-3xl md:text-4xl font-light text-dark-ink mb-2">
          My Wishlist
        </h1>
        <p className="font-dm text-sm text-warm-gray mb-8">
          {wishlistItems.length} saved items
        </p>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <div className="w-20 h-20 rounded-full bg-blush flex items-center justify-center mx-auto">
              <Heart size={32} className="text-warm-gray" />
            </div>
            <p className="font-cormorant text-2xl text-dark-ink">Your wishlist is empty</p>
            <Link href="/shop" className="btn-primary inline-flex">Explore Collections</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12">
            {wishlistItems.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
