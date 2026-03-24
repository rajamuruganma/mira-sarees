'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X, ArrowRight, Tag, Truck } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { PRICE_FORMATTER } from '@/lib/constants'

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, itemCount, clearCart } = useCart()

  const shipping = subtotal >= 5000 ? 0 : 199
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-20 text-center px-6">
        <div className="max-w-md mx-auto space-y-6">
          <div className="w-24 h-24 rounded-full bg-blush flex items-center justify-center mx-auto">
            <span className="text-4xl">🛍️</span>
          </div>
          <h1 className="font-cormorant text-4xl text-dark-ink">
            Your Cart is Empty
          </h1>
          <p className="font-dm text-sm text-warm-gray">
            Looks like you haven&apos;t added anything to your cart yet. Explore our collections to find your perfect saree.
          </p>
          <Link href="/shop" className="btn-primary inline-flex">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <h1 className="font-cormorant text-4xl md:text-5xl font-light text-dark-ink text-center mb-12">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-border font-dm text-[10px] tracking-wider uppercase text-warm-gray">
              <span className="col-span-6">Product</span>
              <span className="col-span-2 text-center">Quantity</span>
              <span className="col-span-2 text-right">Price</span>
              <span className="col-span-2 text-right">Total</span>
            </div>

            {items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-4 pb-6 border-b border-border/50 items-center"
              >
                {/* Product */}
                <div className="col-span-12 md:col-span-6 flex gap-4">
                  <Link href={`/shop/${item.slug}`} className="relative w-24 h-32 flex-shrink-0 bg-blush overflow-hidden">
                    <Image src={item.image_url} alt={item.name} fill className="object-cover" sizes="96px" />
                  </Link>
                  <div className="space-y-1 min-w-0">
                    <Link href={`/shop/${item.slug}`} className="font-cormorant text-lg text-dark-ink hover:text-burgundy transition-colors block">
                      {item.name}
                    </Link>
                    <p className="font-dm text-[10px] tracking-wider uppercase text-warm-gray">{item.fabric}</p>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full border border-border" style={{ backgroundColor: item.color.hex }} />
                      <span className="font-dm text-xs text-warm-gray">{item.color.name}</span>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="font-dm text-xs text-burgundy hover:text-burgundy-dark transition-colors mt-2 flex items-center gap-1">
                      <X size={12} /> Remove
                    </button>
                  </div>
                </div>

                {/* Quantity */}
                <div className="col-span-4 md:col-span-2 flex justify-center">
                  <div className="flex items-center border border-border">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-blush transition-colors">
                      <Minus size={12} />
                    </button>
                    <span className="w-10 text-center font-dm text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-blush transition-colors">
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-4 md:col-span-2 text-right">
                  <span className="font-dm text-sm">{PRICE_FORMATTER.format(item.price)}</span>
                </div>

                {/* Total */}
                <div className="col-span-4 md:col-span-2 text-right">
                  <span className="font-dm text-sm font-medium">{PRICE_FORMATTER.format(item.price * item.quantity)}</span>
                </div>
              </div>
            ))}

            <button onClick={clearCart} className="font-dm text-xs tracking-wider uppercase text-warm-gray hover:text-burgundy transition-colors">
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-blush p-8 space-y-6 sticky top-28">
              <h2 className="font-cormorant text-2xl text-dark-ink">
                Order Summary
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between font-dm text-sm">
                  <span className="text-warm-gray">Subtotal ({itemCount} items)</span>
                  <span>{PRICE_FORMATTER.format(subtotal)}</span>
                </div>
                <div className="flex justify-between font-dm text-sm">
                  <span className="text-warm-gray flex items-center gap-1">
                    <Truck size={14} /> Shipping
                  </span>
                  <span>{shipping === 0 ? <span className="text-green-600">Free</span> : PRICE_FORMATTER.format(shipping)}</span>
                </div>
                {subtotal < 5000 && (
                  <p className="font-dm text-[10px] text-gold">
                    Add {PRICE_FORMATTER.format(5000 - subtotal)} more for free shipping!
                  </p>
                )}
              </div>

              {/* Coupon */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray" />
                    <input type="text" placeholder="Coupon code" className="input-field pl-9 text-sm py-2.5" />
                  </div>
                  <button className="px-4 py-2.5 bg-dark-ink text-ivory font-dm text-xs tracking-wider uppercase hover:bg-burgundy transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              <div className="h-[1px] bg-border" />

              <div className="flex justify-between items-baseline">
                <span className="font-cormorant text-xl text-dark-ink">Total</span>
                <span className="font-cormorant text-2xl text-dark-ink">
                  {PRICE_FORMATTER.format(total)}
                </span>
              </div>

              <Link href="/checkout" className="btn-primary w-full justify-center group">
                Proceed to Checkout
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link href="/shop" className="block text-center font-dm text-xs tracking-wider uppercase text-warm-gray hover:text-dark-ink transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
