'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  Heart,
  ShoppingBag,
  Share2,
  Star,
  ChevronDown,
  ChevronRight,
  Minus,
  Plus,
  Truck,
  RotateCcw,
  Shield,
  Palette,
} from 'lucide-react'
import { PRODUCTS, ARTISANS, PRICE_FORMATTER } from '@/lib/constants'
import { ProductCard } from '@/components/ui/ProductCard'
import { useCart } from '@/lib/cart-context'

const MOCK_GALLERY = [
  { id: '1', suffix: '?w=1200&q=90' },
  { id: '2', suffix: '?w=1200&q=90&fit=crop&crop=center' },
  { id: '3', suffix: '?w=1200&q=90&fit=crop&crop=top' },
  { id: '4', suffix: '?w=1200&q=90&fit=crop&crop=bottom' },
]

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const { addItem } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [openAccordion, setOpenAccordion] = useState<string | null>('description')

  const product = PRODUCTS.find((p) => p.slug === slug)

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="font-cormorant text-4xl text-dark-ink mb-4">
          Product Not Found
        </h1>
        <Link href="/shop" className="btn-outline">
          Back to Shop
        </Link>
      </div>
    )
  }

  const baseUrl = product.image_url.split('?')[0]
  const gallery = MOCK_GALLERY.map((g, i) => ({
    id: g.id,
    url: `${baseUrl}${g.suffix}`,
    alt: `${product.name} — View ${i + 1}`,
  }))

  const artisan = ARTISANS[Math.floor(Math.random() * ARTISANS.length)]
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category_name === product.category_name && p.id !== product.id
  ).slice(0, 4)

  const discount = product.compare_price
    ? Math.round(
        ((product.compare_price - product.price) / product.compare_price) * 100
      )
    : 0

  const stockLeft = Math.floor(Math.random() * 8) + 1

  const handleAddToCart = () => {
    addItem(product, quantity)
  }

  const accordions = [
    {
      id: 'description',
      title: 'Description',
      content: `Crafted with meticulous attention to detail, the ${product.name} is a luxurious ${product.fabric} saree from our ${product.category_name} collection. This exquisite piece showcases the finest traditions of Indian handloom weaving, featuring intricate motifs and superior craftsmanship that has been perfected over generations.`,
    },
    {
      id: 'fabric',
      title: 'Fabric Details',
      content: `Fabric: ${product.fabric}\nWeave: Traditional handloom\nWeight: Medium\nLength: 5.5 meters (with blouse piece)\nWidth: 45 inches\nBlouse Piece: Included (0.8 meters)`,
    },
    {
      id: 'weave',
      title: 'Weave Technique',
      content: `This saree is woven using the traditional ${product.category_name} technique, a centuries-old art form passed down through generations. Each piece takes 15-45 days to complete on a handloom, ensuring unparalleled quality and authenticity.`,
    },
    {
      id: 'care',
      title: 'Care Instructions',
      content: `• Dry clean only for the first wash\n• Gently hand wash in cold water with mild detergent after\n• Do not bleach or wring\n• Dry in shade — avoid direct sunlight\n• Iron on low heat with a pressing cloth\n• Store wrapped in muslin or cotton cloth\n• Keep away from moisture and sharp objects`,
    },
    {
      id: 'shipping',
      title: 'Shipping & Returns',
      content: `• Free shipping on orders above ₹5,000\n• Standard delivery: 5-7 business days\n• Express delivery: 2-3 business days (₹199)\n• Same-day delivery: Available in select cities (₹299)\n• 7-day easy returns for unused products with tags intact\n• Quality assurance guaranteed on every piece`,
    },
  ]

  return (
    <div className="pt-24 pb-20">
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
          <Link
            href={`/collections/${product.category_name.toLowerCase()}`}
            className="hover:text-dark-ink transition-colors"
          >
            {product.category_name}
          </Link>
          <ChevronRight size={12} />
          <span className="text-dark-ink">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left — Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-blush group cursor-zoom-in">
              <Image
                src={gallery[selectedImage].url}
                alt={gallery[selectedImage].alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {product.badge && (
                <span
                  className={`absolute top-4 left-4 px-3 py-1.5 text-[10px] font-dm font-medium tracking-[0.15em] uppercase z-10 ${
                    product.badge === 'NEW'
                      ? 'bg-dark-ink text-ivory'
                      : product.badge === 'SALE'
                      ? 'bg-burgundy text-ivory'
                      : product.badge === 'LIMITED'
                      ? 'bg-gold text-dark-ink'
                      : 'bg-gold text-dark-ink'
                  }`}
                >
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-4 gap-3">
              {gallery.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(i)}
                  className={`relative aspect-square overflow-hidden border-2 transition-colors ${
                    selectedImage === i
                      ? 'border-gold'
                      : 'border-transparent hover:border-border'
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right — Product Info */}
          <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            {/* Category & Name */}
            <div>
              <p className="font-dm text-[11px] tracking-[0.2em] uppercase text-warm-gray mb-2">
                {product.category_name} • {product.fabric}
              </p>
              <h1 className="font-cormorant text-3xl md:text-4xl font-light text-dark-ink">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < Math.floor(product.rating)
                        ? 'fill-gold text-gold'
                        : 'text-border'
                    }
                  />
                ))}
              </div>
              <span className="font-dm text-sm text-warm-gray">
                {product.rating} ({product.review_count} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-cormorant text-3xl text-dark-ink">
                {PRICE_FORMATTER.format(product.price)}
              </span>
              {product.compare_price && (
                <>
                  <span className="font-dm text-lg text-warm-gray line-through">
                    {PRICE_FORMATTER.format(product.compare_price)}
                  </span>
                  <span className="px-2 py-1 bg-burgundy/10 text-burgundy text-xs font-dm font-medium">
                    Save {discount}%
                  </span>
                </>
              )}
            </div>

            <div className="h-[1px] bg-border" />

            {/* Color Swatches */}
            <div>
              <p className="font-dm text-xs tracking-wider uppercase text-warm-gray mb-3">
                Color: {product.colors[selectedColor].name}
              </p>
              <div className="flex gap-3">
                {product.colors.map((color, i) => (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(i)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === i
                        ? 'border-gold scale-110 ring-2 ring-gold/20'
                        : 'border-border hover:border-warm-gray'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  stockLeft > 5 ? 'bg-green-500' : stockLeft > 0 ? 'bg-amber-500' : 'bg-red-500'
                }`}
              />
              <span className="font-dm text-sm text-warm-gray">
                {stockLeft > 5
                  ? 'In Stock'
                  : stockLeft > 0
                  ? `Only ${stockLeft} left`
                  : 'Sold Out'}
              </span>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex gap-4">
              <div className="flex items-center border border-border">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-12 flex items-center justify-center hover:bg-blush transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-12 text-center font-dm text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-12 flex items-center justify-center hover:bg-blush transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn-primary flex-1 group"
              >
                <ShoppingBag size={16} className="mr-2" />
                Add to Cart
              </button>

              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`w-12 h-12 flex items-center justify-center border transition-colors ${
                  isWishlisted
                    ? 'border-burgundy text-burgundy bg-burgundy/5'
                    : 'border-border text-dark-ink hover:border-burgundy hover:text-burgundy'
                }`}
              >
                <Heart
                  size={18}
                  className={isWishlisted ? 'fill-burgundy' : ''}
                />
              </button>
            </div>

            {/* Customize Button */}
            {product.is_customizable && (
              <Link
                href="/customize"
                className="btn-gold w-full justify-center group"
              >
                <Palette size={16} className="mr-2" />
                Customize This Saree
              </Link>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-border">
              <div className="flex flex-col items-center gap-2 text-center">
                <Truck size={20} className="text-gold" />
                <span className="font-dm text-[10px] tracking-wider uppercase text-warm-gray">
                  Free Shipping
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <RotateCcw size={20} className="text-gold" />
                <span className="font-dm text-[10px] tracking-wider uppercase text-warm-gray">
                  7-Day Returns
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <Shield size={20} className="text-gold" />
                <span className="font-dm text-[10px] tracking-wider uppercase text-warm-gray">
                  Authenticity
                </span>
              </div>
            </div>

            {/* Share */}
            <button className="flex items-center gap-2 font-dm text-xs tracking-wider uppercase text-warm-gray hover:text-dark-ink transition-colors">
              <Share2 size={14} />
              Share this product
            </button>

            {/* Accordions */}
            <div className="space-y-0 border-t border-border">
              {accordions.map((acc) => (
                <div key={acc.id} className="border-b border-border">
                  <button
                    onClick={() =>
                      setOpenAccordion(openAccordion === acc.id ? null : acc.id)
                    }
                    className="flex items-center justify-between w-full py-4 text-left"
                  >
                    <span className="font-cormorant text-lg text-dark-ink">
                      {acc.title}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-warm-gray transition-transform ${
                        openAccordion === acc.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openAccordion === acc.id && (
                    <div className="pb-4 font-dm text-sm text-warm-gray leading-relaxed whitespace-pre-line">
                      {acc.content}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Artisan Card */}
            <div className="bg-blush p-6 flex gap-4 items-start">
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={artisan.avatar_url}
                  alt={artisan.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div>
                <p className="font-dm text-[10px] tracking-wider uppercase text-gold mb-1">
                  Crafted by Artisan
                </p>
                <p className="font-cormorant text-lg text-dark-ink">
                  {artisan.name}
                </p>
                <p className="font-dm text-xs text-warm-gray">
                  {artisan.region} • {artisan.years_experience} years
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-16 border-t border-border">
            <div className="text-center mb-12">
              <p className="font-dm text-[11px] tracking-[0.3em] uppercase text-warm-gray mb-3">
                You Might Also Love
              </p>
              <h2 className="font-cormorant text-3xl md:text-4xl font-light text-dark-ink">
                Related Sarees
              </h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
