'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, CreditCard, ArrowRight, Check, Truck, Shield } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { PRICE_FORMATTER } from '@/lib/constants'

const DELIVERY_OPTIONS = [
  { id: 'standard', label: 'Standard Delivery', time: '5-7 business days', price: 0, minOrder: 5000 },
  { id: 'express', label: 'Express Delivery', time: '2-3 business days', price: 199, minOrder: 0 },
  { id: 'sameday', label: 'Same-Day Delivery', time: 'Today (select cities)', price: 299, minOrder: 0 },
]

export default function CheckoutPage() {
  const { items, subtotal, itemCount, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [deliveryOption, setDeliveryOption] = useState('standard')
  const [address, setAddress] = useState({
    name: '', phone: '', street: '', city: '', state: '', pincode: '',
  })

  const delivery = DELIVERY_OPTIONS.find((d) => d.id === deliveryOption)!
  const shippingCost = delivery.id === 'standard' && subtotal >= delivery.minOrder ? 0 : delivery.price
  const total = subtotal + shippingCost

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-20 text-center px-6">
        <h1 className="font-cormorant text-4xl text-dark-ink mb-4">No items to checkout</h1>
        <Link href="/shop" className="btn-primary inline-flex">Continue Shopping</Link>
      </div>
    )
  }

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <h1 className="font-cormorant text-4xl md:text-5xl font-light text-dark-ink text-center mb-4">
          Checkout
        </h1>

        {/* Steps Indicator */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {['Address', 'Delivery', 'Payment'].map((s, i) => (
            <div key={s} className="flex items-center gap-4">
              <div className={`flex items-center gap-2 ${i + 1 <= step ? 'text-dark-ink' : 'text-warm-gray/50'}`}>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-dm ${
                  i + 1 < step ? 'bg-gold text-dark-ink' : i + 1 === step ? 'bg-dark-ink text-ivory' : 'bg-border text-warm-gray'
                }`}>
                  {i + 1 < step ? <Check size={14} /> : i + 1}
                </span>
                <span className="font-dm text-xs tracking-wider uppercase hidden sm:inline">{s}</span>
              </div>
              {i < 2 && <div className={`w-12 h-[1px] ${i + 1 < step ? 'bg-gold' : 'bg-border'}`} />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Address */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="font-cormorant text-2xl text-dark-ink flex items-center gap-3">
                  <MapPin size={20} className="text-gold" /> Delivery Address
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-dm text-xs tracking-wider uppercase text-warm-gray">Full Name</label>
                    <input type="text" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} className="input-field" placeholder="Enter your name" required />
                  </div>
                  <div className="space-y-1">
                    <label className="font-dm text-xs tracking-wider uppercase text-warm-gray">Phone</label>
                    <input type="tel" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} className="input-field" placeholder="+91 98765 43210" required />
                  </div>
                  <div className="sm:col-span-2 space-y-1">
                    <label className="font-dm text-xs tracking-wider uppercase text-warm-gray">Street Address</label>
                    <input type="text" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} className="input-field" placeholder="House/Flat number, Street" required />
                  </div>
                  <div className="space-y-1">
                    <label className="font-dm text-xs tracking-wider uppercase text-warm-gray">City</label>
                    <input type="text" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} className="input-field" placeholder="City" required />
                  </div>
                  <div className="space-y-1">
                    <label className="font-dm text-xs tracking-wider uppercase text-warm-gray">State</label>
                    <input type="text" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} className="input-field" placeholder="State" required />
                  </div>
                  <div className="space-y-1">
                    <label className="font-dm text-xs tracking-wider uppercase text-warm-gray">Pincode</label>
                    <input type="text" value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} className="input-field" placeholder="Pincode" required />
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="btn-primary group">
                  Continue to Delivery <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            )}

            {/* Step 2: Delivery */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="font-cormorant text-2xl text-dark-ink flex items-center gap-3">
                  <Truck size={20} className="text-gold" /> Delivery Options
                </h2>
                <div className="space-y-3">
                  {DELIVERY_OPTIONS.map((opt) => (
                    <label key={opt.id} className={`flex items-center justify-between p-5 border cursor-pointer transition-colors ${
                      deliveryOption === opt.id ? 'border-gold bg-gold/5' : 'border-border hover:border-warm-gray'
                    }`}>
                      <div className="flex items-center gap-4">
                        <input type="radio" name="delivery" value={opt.id} checked={deliveryOption === opt.id} onChange={() => setDeliveryOption(opt.id)} className="text-gold focus:ring-gold" />
                        <div>
                          <p className="font-dm text-sm font-medium text-dark-ink">{opt.label}</p>
                          <p className="font-dm text-xs text-warm-gray">{opt.time}</p>
                        </div>
                      </div>
                      <span className="font-dm text-sm font-medium">
                        {opt.id === 'standard' && subtotal >= opt.minOrder ? <span className="text-green-600">Free</span> : PRICE_FORMATTER.format(opt.price)}
                      </span>
                    </label>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="btn-outline">Back</button>
                  <button onClick={() => setStep(3)} className="btn-primary group">
                    Continue to Payment <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="font-cormorant text-2xl text-dark-ink flex items-center gap-3">
                  <CreditCard size={20} className="text-gold" /> Payment
                </h2>
                <div className="bg-blush p-6 text-center space-y-4">
                  <Shield size={32} className="text-gold mx-auto" />
                  <p className="font-dm text-sm text-dark-ink">
                    Secure payment powered by Razorpay
                  </p>
                  <p className="font-dm text-xs text-warm-gray">
                    UPI • Credit/Debit Card • Netbanking • Wallets • EMI • COD
                  </p>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep(2)} className="btn-outline">Back</button>
                  <Link href="/order-confirmation" onClick={() => clearCart()} className="btn-gold flex-1 justify-center group">
                    Pay {PRICE_FORMATTER.format(total)}
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-blush p-6 space-y-4 sticky top-28">
              <h3 className="font-cormorant text-xl text-dark-ink">Order Summary</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-14 h-18 flex-shrink-0 bg-ivory overflow-hidden">
                      <Image src={item.image_url} alt={item.name} fill className="object-cover" sizes="56px" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-dm text-xs text-dark-ink truncate">{item.name}</p>
                      <p className="font-dm text-[10px] text-warm-gray">Qty: {item.quantity}</p>
                      <p className="font-dm text-xs font-medium">{PRICE_FORMATTER.format(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="h-[1px] bg-border" />
              <div className="space-y-2">
                <div className="flex justify-between font-dm text-sm">
                  <span className="text-warm-gray">Subtotal</span>
                  <span>{PRICE_FORMATTER.format(subtotal)}</span>
                </div>
                <div className="flex justify-between font-dm text-sm">
                  <span className="text-warm-gray">Shipping</span>
                  <span>{shippingCost === 0 ? <span className="text-green-600">Free</span> : PRICE_FORMATTER.format(shippingCost)}</span>
                </div>
              </div>
              <div className="h-[1px] bg-border" />
              <div className="flex justify-between items-baseline">
                <span className="font-cormorant text-lg text-dark-ink">Total</span>
                <span className="font-cormorant text-2xl text-dark-ink">{PRICE_FORMATTER.format(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
