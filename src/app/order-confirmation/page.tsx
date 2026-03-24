'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Check, Package, ArrowRight, Home } from 'lucide-react'

export default function OrderConfirmationPage() {
  useEffect(() => {
    // Canvas confetti animation
    const launchConfetti = async () => {
      try {
        const confetti = (await import('canvas-confetti')).default
        const duration = 3000
        const end = Date.now() + duration

        const colors = ['#C9A84C', '#E8D08A', '#8B2635', '#FAF7F2']

        const frame = () => {
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.7 },
            colors,
          })
          confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.7 },
            colors,
          })
          if (Date.now() < end) requestAnimationFrame(frame)
        }
        frame()
      } catch {
        // canvas-confetti not available
      }
    }
    launchConfetti()
  }, [])

  const orderNumber = `MIRA-${Date.now().toString(36).toUpperCase()}`
  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-lg mx-auto text-center space-y-8">
        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mx-auto animate-fade-in">
          <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center">
            <Check size={28} className="text-dark-ink" strokeWidth={3} />
          </div>
        </div>

        <div className="space-y-3 animate-slide-up">
          <h1 className="font-cormorant text-4xl md:text-5xl font-light text-dark-ink">
            Order Confirmed!
          </h1>
          <p className="font-dm text-sm text-warm-gray">
            Thank you for your order. We&apos;ve sent a confirmation to your email.
          </p>
        </div>

        {/* Order Card */}
        <div className="bg-blush p-8 space-y-5 text-left animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <Package size={20} className="text-gold" />
            <div>
              <p className="font-dm text-[10px] tracking-wider uppercase text-warm-gray">
                Order Number
              </p>
              <p className="font-cormorant text-xl text-dark-ink">
                {orderNumber}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between font-dm text-sm">
              <span className="text-warm-gray">Estimated Delivery</span>
              <span className="text-dark-ink font-medium">{estimatedDelivery}</span>
            </div>
            <div className="flex justify-between font-dm text-sm">
              <span className="text-warm-gray">Payment Status</span>
              <span className="text-green-600 font-medium">✓ Paid</span>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <Link href="/account/orders" className="btn-primary group">
            Track Your Order
            <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="/shop" className="btn-outline group">
            <Home size={16} className="mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
