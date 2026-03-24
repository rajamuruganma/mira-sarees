'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag, Star } from 'lucide-react'
import type { ProductCardData } from '@/lib/types'
import { PRICE_FORMATTER } from '@/lib/constants'

interface ProductCardProps {
  product: ProductCardData
  index?: number
}

const BADGE_STYLES: Record<string, string> = {
  NEW: 'bg-dark-ink text-ivory',
  SALE: 'bg-burgundy text-ivory',
  LIMITED: 'bg-gold text-dark-ink',
  CUSTOMIZABLE: 'bg-gradient-to-r from-gold to-gold-light text-dark-ink',
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const discount = product.compare_price
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : 0

  return (
    <div
      className="product-card group relative"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image Container */}
      <Link href={`/shop/${product.slug}`} className="block relative overflow-hidden aspect-[3/4] bg-blush">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className={`object-cover product-card-image transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          onLoad={() => setImageLoaded(true)}
        />

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 px-3 py-1 text-[10px] font-dm font-medium tracking-[0.15em] uppercase z-10 ${
              BADGE_STYLES[product.badge] || BADGE_STYLES.NEW
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute top-3 right-3 px-2 py-1 bg-burgundy text-ivory text-[10px] font-dm font-medium z-10">
            -{discount}%
          </span>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-dark-ink/0 group-hover:bg-dark-ink/10 transition-colors duration-500 z-[1]" />

        {/* Quick Actions */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 z-10">
          <button
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-ivory/95 backdrop-blur-sm text-dark-ink text-xs font-dm font-medium tracking-wider uppercase hover:bg-dark-ink hover:text-ivory transition-colors"
            onClick={(e) => {
              e.preventDefault()
              // TODO: Add to cart
            }}
          >
            <ShoppingBag size={14} />
            Add to Cart
          </button>
        </div>
      </Link>

      {/* Wishlist Button */}
      <button
        className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center bg-ivory/80 backdrop-blur-sm rounded-full hover:bg-ivory transition-all duration-300"
        onClick={() => setIsWishlisted(!isWishlisted)}
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        style={{ display: discount > 0 ? 'none' : 'flex' }}
      >
        <Heart
          size={14}
          className={`transition-colors ${
            isWishlisted ? 'fill-burgundy text-burgundy' : 'text-dark-ink'
          }`}
        />
      </button>

      {/* Details */}
      <div className="pt-4 space-y-2">
        {/* Color Swatches */}
        {product.colors.length > 1 && (
          <div className="flex gap-1.5">
            {product.colors.map((color) => (
              <span
                key={color.hex}
                className="w-3.5 h-3.5 rounded-full border border-border"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        )}

        {/* Category */}
        <p className="text-[10px] font-dm tracking-[0.15em] uppercase text-warm-gray">
          {product.category_name} • {product.fabric}
        </p>

        {/* Name */}
        <Link href={`/shop/${product.slug}`} className="block">
          <h3 className="font-cormorant text-lg leading-tight text-dark-ink group-hover:text-burgundy transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={11}
                className={`${
                  i < Math.floor(product.rating)
                    ? 'fill-gold text-gold'
                    : 'text-border'
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] font-dm text-warm-gray">
            ({product.review_count})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-dm text-base font-medium text-dark-ink">
            {PRICE_FORMATTER.format(product.price)}
          </span>
          {product.compare_price && (
            <span className="font-dm text-sm text-warm-gray line-through">
              {PRICE_FORMATTER.format(product.compare_price)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
