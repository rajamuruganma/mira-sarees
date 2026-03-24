'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, Check, MessageCircle } from 'lucide-react'

const CONTACT_INFO = [
  { icon: MapPin, label: 'Visit Us', value: '42 Silk Weavers Lane, Varanasi,\nUttar Pradesh 221001, India' },
  { icon: Phone, label: 'Call Us', value: '+91 98765 43210' },
  { icon: Mail, label: 'Email', value: 'hello@mirasarees.in' },
  { icon: Clock, label: 'Hours', value: 'Mon – Sat: 10 AM – 7 PM IST\nSunday: Closed' },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setIsSubmitted(true)
    setIsLoading(false)
  }

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-dm text-[11px] tracking-[0.3em] uppercase text-warm-gray mb-3">Get in Touch</p>
          <h1 className="font-cormorant text-4xl md:text-5xl font-light text-dark-ink">
            We&apos;d Love to Hear<br />
            <em className="italic text-burgundy">From You</em>
          </h1>
          <div className="mt-4 h-[1px] w-16 mx-auto bg-gold" />
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            {CONTACT_INFO.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-blush flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-gold" />
                </div>
                <div>
                  <p className="font-cormorant text-lg text-dark-ink">{label}</p>
                  <p className="font-dm text-sm text-warm-gray whitespace-pre-line mt-1">{value}</p>
                </div>
              </div>
            ))}

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919876543210?text=Hi%20MIRA%2C%20I%20have%20a%20question"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-4 bg-green-500 text-white hover:bg-green-600 transition-colors w-full justify-center"
            >
              <MessageCircle size={20} />
              <span className="font-dm text-sm font-medium">Chat on WhatsApp</span>
            </a>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            {isSubmitted ? (
              <div className="text-center py-16 space-y-4 bg-blush">
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto">
                  <Check size={28} className="text-gold" />
                </div>
                <h2 className="font-cormorant text-2xl text-dark-ink">Message Sent!</h2>
                <p className="font-dm text-sm text-warm-gray">
                  We&apos;ll get back to you within 24 hours. Thank you for reaching out!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" data-netlify="true" name="contact">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-dm text-xs tracking-wider uppercase text-warm-gray">Name</label>
                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="Your name" required />
                  </div>
                  <div className="space-y-1">
                    <label className="font-dm text-xs tracking-wider uppercase text-warm-gray">Email</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" placeholder="you@example.com" required />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-dm text-xs tracking-wider uppercase text-warm-gray">Phone</label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field" placeholder="+91 98765 43210" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-dm text-xs tracking-wider uppercase text-warm-gray">Subject</label>
                    <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input-field" required>
                      <option value="">Select a topic</option>
                      <option value="order">Order Inquiry</option>
                      <option value="custom">Custom Order</option>
                      <option value="return">Return / Exchange</option>
                      <option value="general">General Question</option>
                      <option value="bulk">Bulk / Wholesale</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="font-dm text-xs tracking-wider uppercase text-warm-gray">Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="input-field min-h-[160px] resize-none"
                    placeholder="Tell us how we can help..."
                    required
                  />
                </div>
                {/* Honeypot for spam */}
                <div className="hidden">
                  <input type="text" name="bot-field" />
                </div>
                <button type="submit" disabled={isLoading} className="btn-primary group">
                  {isLoading ? (
                    <span className="w-5 h-5 border-2 border-ivory/30 border-t-ivory rounded-full animate-spin" />
                  ) : (
                    <>Send Message <Send size={16} className="ml-2 transition-transform group-hover:translate-x-1" /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
