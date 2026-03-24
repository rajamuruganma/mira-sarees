'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Heart, ShoppingBag, Menu, X, User } from 'lucide-react'
import { NAVIGATION_LINKS } from '@/lib/constants'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Split nav links: first 3 on left, rest on right
  const leftLinks = NAVIGATION_LINKS.slice(0, 3)
  const rightLinks = NAVIGATION_LINKS.slice(3)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'frosted-glass border-b border-border/50 shadow-sm'
            : 'bg-ivory/80 backdrop-blur-sm'
        }`}
      >
        <nav className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-dark-ink hover:text-burgundy transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Left Nav Links */}
            <div className="hidden lg:flex items-center gap-6 flex-1">
              {leftLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-dm text-[12px] tracking-[0.1em] uppercase text-dark-ink hover:text-burgundy transition-colors duration-300 relative group whitespace-nowrap"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-burgundy transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Center — Logo */}
            <Link href="/" className="flex-shrink-0 mx-8">
              <h1 className="font-cormorant text-3xl md:text-4xl font-light tracking-wider text-dark-ink">
                MIRA<span className="text-gold">.</span>
              </h1>
            </Link>

            {/* Right Nav Links + Icons */}
            <div className="hidden lg:flex items-center gap-6 flex-1 justify-end">
              {rightLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-dm text-[12px] tracking-[0.1em] uppercase text-dark-ink hover:text-burgundy transition-colors duration-300 relative group whitespace-nowrap"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-burgundy transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}

              <div className="w-[1px] h-5 bg-border mx-2" />

              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-dark-ink hover:text-burgundy transition-colors"
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              <Link
                href="/account"
                className="text-dark-ink hover:text-burgundy transition-colors"
                aria-label="Account"
              >
                <User size={18} />
              </Link>

              <Link
                href="/account/wishlist"
                className="relative text-dark-ink hover:text-burgundy transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={18} />
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-burgundy text-white text-[9px] rounded-full flex items-center justify-center font-dm">
                  0
                </span>
              </Link>

              <Link
                href="/cart"
                className="relative text-dark-ink hover:text-burgundy transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag size={18} />
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-burgundy text-white text-[9px] rounded-full flex items-center justify-center font-dm">
                  0
                </span>
              </Link>
            </div>

            {/* Mobile Icons */}
            <div className="flex items-center gap-4 lg:hidden">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-dark-ink hover:text-burgundy transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <Link
                href="/cart"
                className="relative text-dark-ink hover:text-burgundy transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-burgundy text-white text-[9px] rounded-full flex items-center justify-center font-dm">
                  0
                </span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Search Modal */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-ivory border-b border-border p-6 animate-fade-in">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray"
                />
                <input
                  type="text"
                  placeholder="Search for sarees, fabrics, collections..."
                  className="input-field pl-12 text-base"
                  autoFocus
                />
              </div>
              <div className="mt-4 flex gap-3 flex-wrap">
                <span className="text-xs text-warm-gray font-dm">Popular:</span>
                {['Banarasi Silk', 'Bridal', 'Kanjivaram', 'Under ₹5000'].map(
                  (term) => (
                    <Link
                      key={term}
                      href={`/search?q=${encodeURIComponent(term)}`}
                      className="text-xs font-dm px-3 py-1 border border-border rounded-full hover:border-gold hover:text-gold transition-colors"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      {term}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-dark-ink/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-ivory p-8 pt-24 animate-slide-up overflow-y-auto">
            <div className="flex flex-col gap-6">
              {NAVIGATION_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-cormorant text-2xl text-dark-ink hover:text-burgundy transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-[1px] bg-border my-2" />
              <Link
                href="/auth/login"
                className="font-dm text-sm tracking-wider uppercase text-warm-gray hover:text-dark-ink transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/contact"
                className="font-dm text-sm tracking-wider uppercase text-warm-gray hover:text-dark-ink transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
