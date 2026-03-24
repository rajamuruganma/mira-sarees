'use client'

import Link from 'next/link'
import { Home, ShoppingBag, Search, Heart, User } from 'lucide-react'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: ShoppingBag, label: 'Shop', href: '/shop' },
  { icon: Search, label: 'Search', href: '/search' },
  { icon: Heart, label: 'Wishlist', href: '/account/wishlist' },
  { icon: User, label: 'Account', href: '/account' },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-ivory border-t border-border safe-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {NAV_ITEMS.map(({ icon: Icon, label, href }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 px-3 py-1 transition-colors ${
                isActive ? 'text-burgundy' : 'text-warm-gray hover:text-dark-ink'
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
              <span className="text-[10px] font-dm tracking-wider uppercase">
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
