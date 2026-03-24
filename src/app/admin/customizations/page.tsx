'use client'

import { MessageCircle, Clock, User, Palette } from 'lucide-react'
import { ARTISANS, PRICE_FORMATTER } from '@/lib/constants'

const MOCK_REQUESTS = [
  { id: '1', customer: 'Priya Sharma', fabric: 'Pure Silk', color: '#C41E3A', pattern: 'Temple Border',
    border: 'Grand', zari: 'Gold Zari', blouse: 'Boat Neck', budget: 25000, status: 'pending', date: '2024-02-10' },
  { id: '2', customer: 'Ananya K.', fabric: 'Georgette', color: '#191970', pattern: 'Floral',
    border: 'Medium', zari: 'Silver Zari', blouse: 'V-Neck', budget: 12000, status: 'in_progress', date: '2024-02-08' },
  { id: '3', customer: 'Deepa M.', fabric: 'Mira Blend', color: '#50C878', pattern: 'Paisley',
    border: 'Broad', zari: 'Antique Zari', blouse: 'Princess Cut', budget: 18000, status: 'completed', date: '2024-01-20' },
]

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  in_progress: 'bg-purple-100 text-purple-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default function AdminCustomizationsPage() {
  return (
    <div>
      <h1 className="font-cormorant text-3xl font-light text-dark-ink mb-8">Customization Requests</h1>

      <div className="grid gap-6">
        {MOCK_REQUESTS.map((req) => (
          <div key={req.id} className="bg-ivory border border-border/50 luxury-shadow p-6">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Customer & Status */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                      <User size={16} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-cormorant text-lg text-dark-ink">{req.customer}</p>
                      <p className="font-dm text-xs text-warm-gray flex items-center gap-1">
                        <Clock size={10} /> {new Date(req.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 font-dm text-[10px] tracking-wider uppercase rounded-full ${STATUS_STYLES[req.status] || ''}`}>
                    {req.status.replace('_', ' ')}
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    ['Fabric', req.fabric],
                    ['Pattern', req.pattern],
                    ['Border', req.border],
                    ['Zari', req.zari],
                    ['Blouse', req.blouse],
                    ['Budget', PRICE_FORMATTER.format(req.budget)],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <p className="font-dm text-[10px] tracking-wider uppercase text-warm-gray">{label}</p>
                      <p className="font-dm text-sm text-dark-ink mt-0.5 flex items-center gap-1.5">
                        {label === 'Fabric' && <Palette size={12} className="text-gold" />}
                        {value}
                      </p>
                    </div>
                  ))}
                  <div>
                    <p className="font-dm text-[10px] tracking-wider uppercase text-warm-gray">Color</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-5 h-5 rounded-full border border-border" style={{ backgroundColor: req.color }} />
                      <span className="font-dm text-sm text-dark-ink">{req.color}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 md:w-48">
                <select className="input-field text-sm bg-ivory" defaultValue={req.status}>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <select className="input-field text-sm bg-ivory" defaultValue="">
                  <option value="" disabled>Assign Artisan</option>
                  {ARTISANS.map((a) => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500 text-white font-dm text-xs tracking-wider uppercase hover:bg-green-600 transition-colors">
                  <MessageCircle size={14} /> WhatsApp
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
