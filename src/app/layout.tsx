import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { MobileNav } from '@/components/layout/MobileNav'
import { WhatsAppBubble } from '@/components/ui/WhatsAppBubble'
import { MagneticCursor } from '@/components/ui/MagneticCursor'
import { LoadingScreen } from '@/components/layout/LoadingScreen'
import { CartDrawer } from '@/components/layout/CartDrawer'
import { Providers } from './providers'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mira-sarees.vercel.app'),
  title: {
    default: 'MIRA. | Where Threads Become Stories — Luxury Indian Sarees',
    template: '%s | MIRA.',
  },
  description:
    'Discover handcrafted luxury sarees from India\'s finest artisans. Banarasi, Kanjivaram, Chanderi, and custom bridal sarees woven with centuries of tradition.',
  keywords: [
    'luxury sarees',
    'Indian sarees',
    'Banarasi silk',
    'Kanjivaram',
    'Chanderi',
    'bridal sarees',
    'handloom sarees',
    'designer sarees',
  ],
  openGraph: {
    title: 'MIRA. | Where Threads Become Stories',
    description:
      'Discover handcrafted luxury sarees from India\'s finest artisans.',
    url: 'https://mirasarees.in',
    siteName: 'MIRA.',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MIRA. | Where Threads Become Stories',
    description:
      'Discover handcrafted luxury sarees from India\'s finest artisans.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-dm bg-ivory text-dark-ink antialiased">
        <Providers>
          <LoadingScreen />
          <MagneticCursor />
          <Navbar />
          <CartDrawer />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <MobileNav />
          <WhatsAppBubble />
        </Providers>
      </body>
    </html>
  )
}
