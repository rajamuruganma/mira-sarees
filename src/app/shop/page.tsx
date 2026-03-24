'use client'

import { useState, useMemo, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag, ChevronDown, X, SlidersHorizontal, Search } from 'lucide-react'
import {
  GENERATED_PRODUCTS,
  PRODUCT_CATEGORIES,
  PRODUCT_SUB_CATEGORIES,
  PRODUCT_MODELS,
} from '@/lib/product-data'

const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹5,000', min: 0, max: 5000 },
  { label: '₹5,000 – ₹10,000', min: 5000, max: 10000 },
  { label: '₹10,000 – ₹20,000', min: 10000, max: 20000 },
  { label: '₹20,000 – ₹35,000', min: 20000, max: 35000 },
  { label: 'Above ₹35,000', min: 35000, max: Infinity },
]

const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Rating', value: 'rating' },
  { label: 'Most Popular', value: 'reviews' },
]

const ITEMS_PER_PAGE = 24

export default function ShopPage() {
  const [category, setCategory] = useState('all')
  const [subCategory, setSubCategory] = useState('all')
  const [model, setModel] = useState('all')
  const [priceRange, setPriceRange] = useState(0)
  const [sortBy, setSortBy] = useState('newest')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)

  const filteredProducts = useMemo(() => {
    let filtered = GENERATED_PRODUCTS

    // Category filter
    if (category !== 'all') {
      filtered = filtered.filter((p) => p.category_name === category)
    }

    // Sub-category filter
    if (subCategory !== 'all') {
      filtered = filtered.filter((p) => p.sub_category === subCategory)
    }

    // Model filter
    if (model !== 'all') {
      filtered = filtered.filter((p) => p.styled_by === model)
    }

    // Price filter
    const range = PRICE_RANGES[priceRange]
    if (range.max !== Infinity || range.min !== 0) {
      filtered = filtered.filter(
        (p) => p.price >= range.min && p.price < range.max
      )
    }

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.category_name.toLowerCase().includes(q)
      )
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered = [...filtered].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered = [...filtered].sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating)
        break
      case 'reviews':
        filtered = [...filtered].sort((a, b) => b.review_count - a.review_count)
        break
      default:
        break
    }

    return filtered
  }, [category, subCategory, model, priceRange, sortBy, searchQuery])

  const visibleProducts = filteredProducts.slice(0, visibleCount)
  const hasMore = visibleCount < filteredProducts.length

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredProducts.length))
  }, [filteredProducts.length])

  const clearFilters = () => {
    setCategory('all')
    setSubCategory('all')
    setModel('all')
    setPriceRange(0)
    setSearchQuery('')
    setVisibleCount(ITEMS_PER_PAGE)
  }

  const activeFiltersCount = [
    category !== 'all',
    subCategory !== 'all',
    model !== 'all',
    priceRange !== 0,
    searchQuery !== '',
  ].filter(Boolean).length

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Page Header */}
        <div className="text-center mb-10">
          <p className="font-dm text-[11px] tracking-[0.3em] uppercase text-warm-gray mb-2">
            {filteredProducts.length} Sarees Found
          </p>
          <h1 className="font-cormorant text-4xl md:text-5xl font-light text-dark-ink">
            Our Collection
          </h1>
          <div className="mt-4 h-[1px] w-16 mx-auto bg-gold" />
        </div>

        {/* Search + Category Chips */}
        <div className="mb-8 space-y-5">
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(ITEMS_PER_PAGE) }}
              placeholder="Search sarees, fabrics..."
              className="input-field pl-11 text-sm"
            />
          </div>

          {/* Category Chips */}
          <div className="flex justify-center gap-2 flex-wrap">
            <button
              onClick={() => { setCategory('all'); setVisibleCount(ITEMS_PER_PAGE) }}
              className={`px-4 py-2 font-dm text-[11px] tracking-[0.1em] uppercase border transition-all ${
                category === 'all'
                  ? 'bg-dark-ink text-ivory border-dark-ink'
                  : 'border-border text-warm-gray hover:border-dark-ink hover:text-dark-ink'
              }`}
            >
              All
            </button>
            {PRODUCT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setCategory(cat); setVisibleCount(ITEMS_PER_PAGE) }}
                className={`px-4 py-2 font-dm text-[11px] tracking-[0.1em] uppercase border transition-all ${
                  category === cat
                    ? 'bg-dark-ink text-ivory border-dark-ink'
                    : 'border-border text-warm-gray hover:border-dark-ink hover:text-dark-ink'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Toolbar: Filters + Sort */}
        <div className="flex items-center justify-between mb-8 border-b border-border pb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 font-dm text-xs tracking-wider uppercase text-dark-ink hover:text-burgundy transition-colors"
          >
            <SlidersHorizontal size={14} />
            Filters
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 bg-burgundy text-white text-[10px] rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-2">
            <span className="font-dm text-xs text-warm-gray hidden sm:block">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="font-dm text-xs border border-border px-3 py-2 bg-transparent text-dark-ink focus:outline-none focus:border-gold"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Expandable Filter Panel */}
        {showFilters && (
          <div className="mb-8 p-6 bg-blush/50 border border-border animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Sub-Category */}
              <div>
                <label className="font-dm text-[10px] tracking-[0.15em] uppercase text-warm-gray block mb-2">
                  Occasion
                </label>
                <select
                  value={subCategory}
                  onChange={(e) => { setSubCategory(e.target.value); setVisibleCount(ITEMS_PER_PAGE) }}
                  className="w-full font-dm text-sm border border-border px-3 py-2.5 bg-ivory focus:outline-none focus:border-gold"
                >
                  <option value="all">All Occasions</option>
                  {PRODUCT_SUB_CATEGORIES.map((sc) => (
                    <option key={sc} value={sc}>{sc.charAt(0).toUpperCase() + sc.slice(1)}</option>
                  ))}
                </select>
              </div>

              {/* Model */}
              <div>
                <label className="font-dm text-[10px] tracking-[0.15em] uppercase text-warm-gray block mb-2">
                  Styled By
                </label>
                <select
                  value={model}
                  onChange={(e) => { setModel(e.target.value); setVisibleCount(ITEMS_PER_PAGE) }}
                  className="w-full font-dm text-sm border border-border px-3 py-2.5 bg-ivory focus:outline-none focus:border-gold"
                >
                  <option value="all">All Models</option>
                  {PRODUCT_MODELS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="font-dm text-[10px] tracking-[0.15em] uppercase text-warm-gray block mb-2">
                  Price Range
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => { setPriceRange(Number(e.target.value)); setVisibleCount(ITEMS_PER_PAGE) }}
                  className="w-full font-dm text-sm border border-border px-3 py-2.5 bg-ivory focus:outline-none focus:border-gold"
                >
                  {PRICE_RANGES.map((r, i) => (
                    <option key={i} value={i}>{r.label}</option>
                  ))}
                </select>
              </div>

              {/* Clear */}
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2.5 border border-burgundy text-burgundy font-dm text-xs tracking-wider uppercase hover:bg-burgundy hover:text-ivory transition-all"
                >
                  <X size={12} />
                  Clear All
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        {visibleProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {visibleProducts.map((product) => (
                <div key={product.id} className="group">
                  <Link href={`/shop/${product.slug}`}>
                    {/* Image */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-blush mb-3">
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        loading="lazy"
                      />

                      {/* Badge */}
                      {product.badge && (
                        <span className={`absolute top-3 left-3 px-2.5 py-1 text-[9px] font-dm tracking-[0.15em] uppercase ${
                          product.badge === 'SALE'
                            ? 'bg-burgundy text-ivory'
                            : product.badge === 'LIMITED'
                            ? 'bg-dark-ink text-gold'
                            : product.badge === 'BESTSELLER'
                            ? 'bg-gold text-dark-ink'
                            : product.badge === 'TRENDING'
                            ? 'bg-burgundy/80 text-ivory'
                            : 'bg-dark-ink/80 text-ivory'
                        }`}>
                          {product.badge}
                        </span>
                      )}

                      {/* Quick Actions */}
                      <div className="absolute top-3 right-3 flex flex-col gap-1.5 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
                        <button
                          className="w-8 h-8 bg-ivory/90 backdrop-blur-sm flex items-center justify-center hover:bg-gold hover:text-dark-ink transition-colors text-dark-ink"
                          onClick={(e) => e.preventDefault()}
                        >
                          <Heart size={13} />
                        </button>
                        <button
                          className="w-8 h-8 bg-ivory/90 backdrop-blur-sm flex items-center justify-center hover:bg-gold hover:text-dark-ink transition-colors text-dark-ink"
                          onClick={(e) => e.preventDefault()}
                        >
                          <ShoppingBag size={13} />
                        </button>
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-dark-ink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="space-y-1">
                    <p className="font-dm text-[10px] tracking-[0.1em] uppercase text-warm-gray">
                      {product.fabric} · {product.category_name}
                    </p>
                    <Link href={`/shop/${product.slug}`}>
                      <h3 className="font-cormorant text-lg text-dark-ink group-hover:text-burgundy transition-colors leading-tight">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2">
                      <span className="font-dm text-sm font-medium text-dark-ink">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.compare_price && (
                        <span className="font-dm text-xs text-warm-gray line-through">
                          ₹{product.compare_price.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    {product.styled_by && (
                      <p className="font-dm text-[10px] text-gold">
                        Styled by {product.styled_by}
                      </p>
                    )}
                    {/* Color Swatches */}
                    <div className="flex gap-1.5 mt-1">
                      {product.colors.map((c) => (
                        <div
                          key={c.name}
                          className="w-3.5 h-3.5 rounded-full border border-border"
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="text-center mt-12">
                <button
                  onClick={loadMore}
                  className="inline-flex items-center gap-2 px-8 py-3.5 border border-dark-ink text-dark-ink font-dm text-xs tracking-[0.15em] uppercase hover:bg-dark-ink hover:text-ivory transition-all"
                >
                  Load More Sarees
                  <ChevronDown size={14} />
                </button>
                <p className="font-dm text-[10px] text-warm-gray mt-2">
                  Showing {visibleCount} of {filteredProducts.length} sarees
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="font-cormorant text-2xl text-warm-gray">No sarees found</p>
            <p className="font-dm text-sm text-warm-gray mt-2">Try adjusting your filters</p>
            <button
              onClick={clearFilters}
              className="mt-6 px-6 py-3 bg-dark-ink text-ivory font-dm text-xs tracking-[0.15em] uppercase hover:bg-burgundy transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
