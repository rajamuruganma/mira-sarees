'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validate email format
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address')
      return
    }

    // Validate password length
    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setIsLoading(true)

    // Simulate authentication delay
    await new Promise((r) => setTimeout(r, 1200))

    // Accept any valid email + 8+ char password → redirect to homepage
    setIsLoading(false)
    router.push('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-20 px-6">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="font-cormorant text-4xl font-light text-dark-ink">
            Welcome Back
          </h1>
          <p className="font-dm text-sm text-warm-gray">
            Sign in to access your account
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-3 px-4 py-3 bg-burgundy/10 border border-burgundy/20 text-burgundy">
            <AlertCircle size={16} className="flex-shrink-0" />
            <span className="font-dm text-sm">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1">
            <label className="font-dm text-xs tracking-wider uppercase text-warm-gray">
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError('') }}
                className="input-field pl-11"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-dm text-xs tracking-wider uppercase text-warm-gray">
              Password
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray"
              />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError('') }}
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
            <p className="font-dm text-[10px] text-warm-gray mt-1">Minimum 8 characters required</p>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 border-border text-gold focus:ring-gold"
              />
              <span className="font-dm text-sm text-warm-gray">Remember me</span>
            </label>
            <Link
              href="/auth/forgot-password"
              className="font-dm text-sm text-burgundy hover:text-burgundy-dark transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full justify-center group"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-ivory/30 border-t-ivory rounded-full animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRight
                  size={16}
                  className="ml-2 transition-transform group-hover:translate-x-1"
                />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-ivory px-4 font-dm text-xs text-warm-gray uppercase tracking-wider">
              Or continue with
            </span>
          </div>
        </div>

        {/* OAuth Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-3 px-4 py-3 border border-border hover:border-dark-ink transition-colors font-dm text-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </button>
          <button className="flex items-center justify-center gap-3 px-4 py-3 border border-border hover:border-dark-ink transition-colors font-dm text-sm">
            📱 Phone OTP
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="text-center font-dm text-sm text-warm-gray">
          Don&apos;t have an account?{' '}
          <Link
            href="/auth/signup"
            className="text-burgundy hover:text-burgundy-dark font-medium transition-colors"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}
