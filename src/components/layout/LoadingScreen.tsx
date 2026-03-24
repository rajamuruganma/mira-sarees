'use client'

import { useEffect, useState } from 'react'

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-ivory transition-all duration-600 ${
        !isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        <h1 className="font-cormorant text-6xl md:text-8xl font-light tracking-wider">
          <span className="shimmer-text">MIRA</span>
          <span className="text-gold">.</span>
        </h1>
        <div className="mt-4 h-[1px] w-32 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent animate-shimmer" />
        <p className="mt-3 font-dm text-xs tracking-[0.3em] text-warm-gray uppercase">
          Where Threads Become Stories
        </p>
      </div>
    </div>
  )
}
