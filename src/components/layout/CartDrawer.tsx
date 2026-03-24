'use client'

import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { PRICE_FORMATTER } from '@/lib/constants'

export function CartDrawer() {
  const { items, isOpen, closeDrawer, removeItem, updateQuantity, subtotal, itemCount } = useCart()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-dark-ink/50 z-[60] transition-opacity"
        onClick={closeDrawer}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-ivory z-[61] flex flex-col shadow-2xl animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-dark-ink" />
            <h2 className="font-cormorant text-2xl font-light">
              Your Cart
              <span className="font-dm text-sm text-warm-gray ml-2">
                ({itemCount})
              </span>
            </h2>
          </div>
          <button
            onClick={closeDrawer}
            className="w-8 h-8 flex items-center justify-center hover:bg-blush rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-blush flex items-center justify-center">
                <ShoppingBag size={32} className="text-warm-gray" />
              </div>
              <p className="font-cormorant text-xl text-dark-ink">
                Your cart is empty
              </p>
              <p className="font-dm text-sm text-warm-gray">
                Explore our collections to find your perfect saree.
              </p>
              <Link
                href="/shop"
                className="btn-primary text-sm"
                onClick={closeDrawer}
              >
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-4 border-b border-border/50"
                >
                  {/* Image */}
                  <Link
                    href={`/shop/${item.slug}`}
                    onClick={closeDrawer}
                    className="relative w-20 h-24 flex-shrink-0 bg-blush overflow-hidden"
                  >
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <Link
                      href={`/shop/${item.slug}`}
                      onClick={closeDrawer}
                      className="font-cormorant text-base text-dark-ink hover:text-burgundy transition-colors block truncate"
                    >
                      {item.name}
                    </Link>
                    <p className="font-dm text-[10px] tracking-wider uppercase text-warm-gray">
                      {item.fabric}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-3 h-3 rounded-full border border-border"
                        style={{ backgroundColor: item.color.hex }}
                      />
                      <span className="font-dm text-xs text-warm-gray">
                        {item.color.name}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity */}
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-blush transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center font-dm text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-blush transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-dm text-sm font-medium">
                        {PRICE_FORMATTER.format(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-warm-gray hover:text-burgundy transition-colors self-start mt-1"
                    aria-label="Remove item"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-dm text-sm text-warm-gray">Subtotal</span>
              <span className="font-cormorant text-2xl font-light">
                {PRICE_FORMATTER.format(subtotal)}
              </span>
            </div>
            <p className="font-dm text-[10px] text-warm-gray">
              Shipping & taxes calculated at checkout
            </p>
            <Link
              href="/checkout"
              className="btn-primary w-full justify-center group"
              onClick={closeDrawer}
            >
              Proceed to Checkout
              <ArrowRight
                size={16}
                className="ml-2 transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/cart"
              className="block text-center font-dm text-xs tracking-wider uppercase text-warm-gray hover:text-dark-ink transition-colors"
              onClick={closeDrawer}
            >
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
