'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Save, User, Mail, Phone, MapPin } from 'lucide-react'

export default function SettingsPage() {
  const [form, setForm] = useState({
    name: 'Priya Sharma', email: 'priya@example.com', phone: '+91 98765 43210',
  })

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-2xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-2 mb-2 font-dm text-xs text-warm-gray">
          <Link href="/account" className="hover:text-dark-ink transition-colors">Account</Link>
          <ChevronRight size={12} />
          <span className="text-dark-ink">Settings</span>
        </div>
        <h1 className="font-cormorant text-3xl md:text-4xl font-light text-dark-ink mb-8">Profile Settings</h1>

        <form className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-6 pb-6 border-b border-border">
            <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center">
              <span className="font-cormorant text-3xl text-gold">P</span>
            </div>
            <div>
              <button type="button" className="font-dm text-xs tracking-wider uppercase text-burgundy hover:text-burgundy-dark transition-colors">
                Change Photo
              </button>
              <p className="font-dm text-[10px] text-warm-gray mt-1">JPG, PNG or WEBP. Max 2MB.</p>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-dm text-xs tracking-wider uppercase text-warm-gray">Full Name</label>
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray" />
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field pl-11" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-dm text-xs tracking-wider uppercase text-warm-gray">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray" />
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field pl-11" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-dm text-xs tracking-wider uppercase text-warm-gray">Phone</label>
            <div className="relative">
              <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray" />
              <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field pl-11" />
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button type="submit" className="btn-primary">
              <Save size={16} className="mr-2" /> Save Changes
            </button>
            <button type="button" className="btn-outline text-sm">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
