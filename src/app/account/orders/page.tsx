'use client'

import Link from 'next/link'
import { Package, ChevronRight, Truck, Check, Clock } from 'lucide-react'
import { PRICE_FORMATTER } from '@/lib/constants'

const MOCK_ORDERS = [
  {
    id: '1', orderNumber: 'MIRA-A8F2K', status: 'delivered', date: '2024-01-15',
    items: [{ name: 'Royal Kanjivaram Gold', price: 14999, quantity: 1 }], total: 14999,
  },
  {
    id: '2', orderNumber: 'MIRA-B3G7L', status: 'shipped', date: '2024-02-01',
    items: [{ name: 'Gulabi Banarasi Silk', price: 8499, quantity: 1 }, { name: 'Pearl Chanderi Tissue', price: 5499, quantity: 1 }], total: 13998,
  },
  {
    id: '3', orderNumber: 'MIRA-C1D9M', status: 'processing', date: '2024-02-10',
    items: [{ name: 'Ivory Organza Dream', price: 6999, quantity: 2 }], total: 13998,
  },
]

const STATUS_CONFIG: Record<string, { icon: React.ElementType; color: string; label: string}> = {
  pending: { icon: Clock, color: 'text-amber-500', label: 'Pending' },
  confirmed: { icon: Check, color: 'text-blue-500', label: 'Confirmed' },
  processing: { icon: Package, color: 'text-purple-500', label: 'Processing' },
  shipped: { icon: Truck, color: 'text-gold', label: 'Shipped' },
  delivered: { icon: Check, color: 'text-green-600', label: 'Delivered' },
}

export default function OrdersPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-2 mb-2 font-dm text-xs text-warm-gray">
          <Link href="/account" className="hover:text-dark-ink transition-colors">Account</Link>
          <ChevronRight size={12} />
          <span className="text-dark-ink">Orders</span>
        </div>
        <h1 className="font-cormorant text-3xl md:text-4xl font-light text-dark-ink mb-8">My Orders</h1>

        <div className="space-y-4">
          {MOCK_ORDERS.map((order) => {
            const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending
            const StatusIcon = status.icon
            return (
              <div key={order.id} className="border border-border/50 p-6 hover:border-gold/30 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                  <div>
                    <p className="font-cormorant text-lg text-dark-ink">{order.orderNumber}</p>
                    <p className="font-dm text-xs text-warm-gray">{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusIcon size={16} className={status.color} />
                    <span className={`font-dm text-sm font-medium ${status.color}`}>{status.label}</span>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between font-dm text-sm">
                      <span className="text-dark-ink">{item.name} × {item.quantity}</span>
                      <span className="text-warm-gray">{PRICE_FORMATTER.format(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-border/50">
                  <span className="font-dm text-sm font-medium">Total: {PRICE_FORMATTER.format(order.total)}</span>
                  <button className="font-dm text-xs tracking-wider uppercase text-burgundy hover:text-burgundy-dark transition-colors">View Details</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
