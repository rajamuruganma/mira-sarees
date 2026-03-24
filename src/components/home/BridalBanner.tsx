'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function BridalBanner() {
  return (
    <section className="bg-dark-ink overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-2 min-h-[600px]">
          {/* Left — Image */}
          <div className="relative h-[400px] lg:h-auto overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=1200&q=90"
              alt="Bridal Kanjivaram saree with gold zari weaving"
              fill
              className="object-cover hover:scale-105 transition-transform duration-1000"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-dark-ink/30 hidden lg:block" />
          </div>

          {/* Right — Content */}
          <div className="flex items-center p-10 md:p-16 lg:p-20">
            <div className="space-y-6 max-w-lg">
              <p className="font-dm text-[11px] tracking-[0.3em] uppercase text-gold">
                Bridal Collection
              </p>

              <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-light text-ivory leading-tight">
                The Bridal
                <br />
                <em className="italic text-gold-light">Trousseau Edit</em>
              </h2>

              <p className="font-dm text-sm leading-relaxed text-ivory/60 max-w-md">
                A curated symphony of Kanjivaram silk and purest gold zari,
                woven by master artisans who have dedicated their lives to
                preserving this sacred craft. Each bridal saree is an heirloom
                in the making — a piece of art that transcends time and tells
                your love story in every thread.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <div>
                  <p className="font-cormorant text-3xl text-gold">₹14,999</p>
                  <p className="font-dm text-[10px] text-ivory/40 tracking-wider uppercase mt-1">
                    Starting from
                  </p>
                </div>
                <div>
                  <p className="font-cormorant text-3xl text-ivory">40+</p>
                  <p className="font-dm text-[10px] text-ivory/40 tracking-wider uppercase mt-1">
                    Bridal Designs
                  </p>
                </div>
              </div>

              <Link href="/collections/kanjivaram" className="btn-gold group inline-flex mt-2">
                Explore Bridal Edit
                <ArrowRight
                  size={16}
                  className="ml-2 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
