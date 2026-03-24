'use client'

import { useState } from 'react'
import { Send, Check } from 'lucide-react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitted(true)
    setIsLoading(false)
    setEmail('')
  }

  return (
    <section className="bg-dark-ink py-20 md:py-28">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <p className="font-dm text-[11px] tracking-[0.3em] uppercase text-gold">
            Join the MIRA Family
          </p>

          <h2 className="font-cormorant text-4xl md:text-5xl font-light text-ivory leading-tight">
            Stay Woven In
          </h2>

          <p className="font-dm text-sm text-ivory/50 leading-relaxed max-w-md mx-auto">
            Subscribe for exclusive early access to new collections, artisan
            stories, styling guides, and a{' '}
            <span className="text-gold">10% discount</span> on your first order.
          </p>

          {isSubmitted ? (
            <div className="flex items-center justify-center gap-3 py-4 animate-fade-in">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                <Check size={20} className="text-gold" />
              </div>
              <p className="font-dm text-sm text-ivory/80">
                Welcome to MIRA! Check your email for your discount code.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-0 max-w-lg mx-auto mt-8">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-5 py-4 bg-ivory/10 border border-ivory/15 text-ivory font-dm text-sm placeholder:text-ivory/30 focus:outline-none focus:border-gold transition-colors"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-4 bg-gold text-dark-ink font-dm text-sm font-medium tracking-wider uppercase hover:bg-gold-light transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isLoading ? (
                  <span className="w-4 h-4 border-2 border-dark-ink/30 border-t-dark-ink rounded-full animate-spin" />
                ) : (
                  <>
                    Subscribe
                    <Send size={14} />
                  </>
                )}
              </button>
            </form>
          )}

          <p className="font-dm text-[10px] text-ivory/25 mt-4">
            No spam, ever. Unsubscribe anytime. We respect your inbox.
          </p>
        </div>
      </div>
    </section>
  )
}
