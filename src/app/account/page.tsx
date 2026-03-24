'use client'

import Link from 'next/link'
import { Package, Heart, Settings, LogOut, ChevronRight, ShoppingBag, Palette } from 'lucide-react'

const MENU_ITEMS = [
  { icon: Package, label: 'My Orders', href: '/account/orders', description: 'Track and manage your orders' },
  { icon: Heart, label: 'Wishlist', href: '/account/wishlist', description: 'Your saved sarees' },
  { icon: Palette, label: 'Customization Requests', href: '/account/orders', description: 'Custom saree orders' },
  { icon: Settings, label: 'Settings', href: '/account/settings', description: 'Profile and preferences' },
]

export default function AccountPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex items-center gap-6 mb-12">
          <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center">
            <span className="font-cormorant text-3xl text-gold">M</span>
          </div>
          <div>
            <h1 className="font-cormorant text-3xl md:text-4xl font-light text-dark-ink">
              My Account
            </h1>
            <p className="font-dm text-sm text-warm-gray mt-1">
              Welcome back! Manage your orders, wishlist, and settings.
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Orders', value: '3' },
            { label: 'Wishlist', value: '7' },
            { label: 'Custom Requests', value: '1' },
            { label: 'Rewards Points', value: '850' },
          ].map((stat) => (
            <div key={stat.label} className="bg-blush p-5 text-center">
              <p className="font-cormorant text-3xl text-dark-ink">{stat.value}</p>
              <p className="font-dm text-[10px] tracking-wider uppercase text-warm-gray mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Menu */}
        <div className="space-y-3">
          {MENU_ITEMS.map(({ icon: Icon, label, href, description }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-5 p-5 border border-border/50 hover:border-gold/30 hover:bg-blush/50 transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-blush flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                <Icon size={20} className="text-warm-gray group-hover:text-gold transition-colors" />
              </div>
              <div className="flex-1">
                <p className="font-cormorant text-lg text-dark-ink">{label}</p>
                <p className="font-dm text-xs text-warm-gray">{description}</p>
              </div>
              <ChevronRight size={16} className="text-warm-gray group-hover:text-gold transition-colors" />
            </Link>
          ))}
        </div>

        {/* Sign Out */}
        <button className="flex items-center gap-3 mt-8 font-dm text-sm text-warm-gray hover:text-burgundy transition-colors">
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  )
}
