'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight } from 'lucide-react'

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-20 px-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <h1 className="font-cormorant text-4xl font-light text-dark-ink">
            Create Account
          </h1>
          <p className="font-dm text-sm text-warm-gray">
            Join us to start your journey
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div className="space-y-1">
            <label className="font-dm text-xs tracking-wider uppercase text-warm-gray">
              Full Name
            </label>
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray" />
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input-field pl-11"
                placeholder="Your full name"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-dm text-xs tracking-wider uppercase text-warm-gray">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field pl-11"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-dm text-xs tracking-wider uppercase text-warm-gray">
              Phone Number
            </label>
            <div className="relative">
              <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray" />
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="input-field pl-11"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-dm text-xs tracking-wider uppercase text-warm-gray">
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="input-field pl-11 pr-11"
                placeholder="Min. 8 characters"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-warm-gray hover:text-dark-ink transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <input type="checkbox" required className="mt-1 w-4 h-4 border-border text-gold focus:ring-gold" />
            <span className="font-dm text-xs text-warm-gray leading-relaxed">
              I agree to MIRA&apos;s{' '}
              <Link href="#" className="text-burgundy underline">Terms of Service</Link> and{' '}
              <Link href="#" className="text-burgundy underline">Privacy Policy</Link>
            </span>
          </div>

          <button type="submit" disabled={isLoading} className="btn-primary w-full justify-center group">
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-ivory/30 border-t-ivory rounded-full animate-spin" />
            ) : (
              <>
                Create Account
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        <p className="text-center font-dm text-sm text-warm-gray">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-burgundy hover:text-burgundy-dark font-medium transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
