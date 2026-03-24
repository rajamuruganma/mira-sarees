import Link from 'next/link'
import { FOOTER_LINKS } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-dark-ink text-ivory/80 pb-20 lg:pb-0">
      {/* Main Footer */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/">
              <h2 className="font-cormorant text-4xl font-light tracking-wider text-ivory">
                MIRA<span className="text-gold">.</span>
              </h2>
            </Link>
            <p className="mt-4 font-dm text-sm leading-relaxed text-ivory/60">
              Where Threads Become Stories. Handcrafted luxury sarees from
              India&apos;s finest artisans, woven with centuries of tradition
              and modern elegance.
            </p>
            <div className="flex gap-4 mt-6">
              {['Instagram', 'Facebook', 'Pinterest', 'YouTube'].map(
                (social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-full border border-ivory/20 flex items-center justify-center text-ivory/50 hover:border-gold hover:text-gold transition-all duration-300 text-xs font-dm"
                    aria-label={social}
                  >
                    {social[0]}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Collections */}
          <div>
            <h3 className="font-cormorant text-lg text-ivory mb-6 tracking-wider">
              Collections
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.collections.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-dm text-sm text-ivory/50 hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="font-cormorant text-lg text-ivory mb-6 tracking-wider">
              Customer Care
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.customerCare.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-dm text-sm text-ivory/50 hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-cormorant text-lg text-ivory mb-6 tracking-wider">
              Connect
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.connect.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-dm text-sm text-ivory/50 hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <p className="font-dm text-xs text-ivory/40 mb-2">Email us</p>
              <a
                href="mailto:hello@mirasarees.in"
                className="font-dm text-sm text-gold hover:text-gold-light transition-colors"
              >
                hello@mirasarees.in
              </a>
            </div>
          </div>
        </div>

        {/* Payment Badges */}
        <div className="mt-16 pt-8 border-t border-ivory/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 flex-wrap justify-center">
              {['UPI', 'Visa', 'Mastercard', 'Razorpay', 'COD'].map(
                (badge) => (
                  <span
                    key={badge}
                    className="px-4 py-2 border border-ivory/15 rounded text-[11px] font-dm tracking-wider text-ivory/40 hover:border-gold/30 hover:text-ivory/60 transition-all"
                  >
                    {badge}
                  </span>
                )
              )}
            </div>
            <p className="font-dm text-xs text-ivory/30 text-center">
              © {new Date().getFullYear()} MIRA. All rights reserved. Made with
              ♥ in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
