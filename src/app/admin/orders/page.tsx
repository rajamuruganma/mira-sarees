'use client'

import { useState } from 'react'
import { Search, Filter, ChevronDown, Truck, Eye } from 'lucide-react'
import { PRICE_FORMATTER } from '@/lib/constants'

const MOCK_ORDERS = [
  { id: 'MIRA-A8F2K', customer: 'Priya Sharma', email: 'priya@example.com', date: '2024-02-10', items: 2, total: 14999, status: 'delivered', tracking: 'AWB123456' },
  { id: 'MIRA-B3G7L', customer: 'Ananya K.', email: 'ananya@example.com', date: '2024-02-09', items: 3, total: 23497, status: 'shipped', tracking: 'AWB789012' },
  { id: 'MIRA-C1D9M', customer: 'Deepa Malhotra', email: 'deepa@example.com', date: '2024-02-08', items: 1, total: 6999, status: 'processing', tracking: '' },
  { id: 'MIRA-D5E4N', customer: 'Ritu Patel', email: 'ritu@example.com', date: '2024-02-07', items: 1, total: 32000, status: 'confirmed', tracking: '' },
  { id: 'MIRA-F7H2P', customer: 'Sneha Iyer', email: 'sneha@example.com', date: '2024-02-06', items: 2, total: 8499, status: 'pending', tracking: '' },
  { id: 'MIRA-G3J8Q', customer: 'Kavita Singh', email: 'kavita@example.com', date: '2024-02-05', items: 1, total: 17500, status: 'delivered', tracking: 'AWB345678' },
]

const STATUSES = ['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped: 'bg-gold/20 text-gold-dark',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default function AdminOrdersPage() {
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = MOCK_ORDERS.filter((o) => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false
    if (searchQuery && !o.id.toLowerCase().includes(searchQuery.toLowerCase()) && !o.customer.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div>
      <h1 className="font-cormorant text-3xl font-light text-dark-ink mb-8">Order Management</h1>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray" />
          <input
            type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by order ID or customer..."
            className="input-field pl-11 bg-ivory"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {STATUSES.map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 font-dm text-xs tracking-wider uppercase whitespace-nowrap border transition-all ${
                statusFilter === s ? 'bg-dark-ink text-ivory border-dark-ink' : 'border-border text-warm-gray hover:border-dark-ink'
              }`}>
              {s === 'all' ? 'All' : s}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-ivory border border-border/50 luxury-shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {['Order', 'Customer', 'Date', 'Items', 'Total', 'Status', 'Actions'].map((h) => (
                <th key={h} className="text-left font-dm text-[10px] tracking-wider uppercase text-warm-gray p-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id} className="border-b border-border/30 hover:bg-blush/30 transition-colors">
                <td className="p-4 font-dm text-sm font-medium text-dark-ink">{order.id}</td>
                <td className="p-4">
                  <p className="font-dm text-sm text-dark-ink">{order.customer}</p>
                  <p className="font-dm text-xs text-warm-gray">{order.email}</p>
                </td>
                <td className="p-4 font-dm text-sm text-warm-gray">{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</td>
                <td className="p-4 font-dm text-sm text-warm-gray">{order.items}</td>
                <td className="p-4 font-dm text-sm font-medium text-dark-ink">{PRICE_FORMATTER.format(order.total)}</td>
                <td className="p-4">
                  <select
                    defaultValue={order.status}
                    className={`px-3 py-1 font-dm text-[10px] tracking-wider uppercase rounded-full border-0 cursor-pointer ${STATUS_COLORS[order.status] || ''}`}
                  >
                    {STATUSES.filter((s) => s !== 'all').map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td className="p-4">
                  <button className="text-warm-gray hover:text-dark-ink transition-colors" title="View details">
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="font-dm text-sm text-warm-gray">No orders found</p>
          </div>
        )}
      </div>
    </div>
  )
}
