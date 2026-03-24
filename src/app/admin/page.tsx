'use client'

import { TrendingUp, ShoppingBag, Users, Palette, IndianRupee } from 'lucide-react'
import { PRICE_FORMATTER } from '@/lib/constants'

const STATS = [
  { icon: IndianRupee, label: 'Total Revenue', value: '₹12,45,890', change: '+12.5%', up: true },
  { icon: ShoppingBag, label: 'Total Orders', value: '156', change: '+8.2%', up: true },
  { icon: Users, label: 'New Customers', value: '43', change: '+15.3%', up: true },
  { icon: Palette, label: 'Pending Requests', value: '7', change: '-2', up: false },
]

const RECENT_ORDERS = [
  { id: 'MIRA-A8F2K', customer: 'Priya Sharma', date: '2024-02-10', total: 14999, status: 'delivered' },
  { id: 'MIRA-B3G7L', customer: 'Ananya K.', date: '2024-02-09', total: 13998, status: 'shipped' },
  { id: 'MIRA-C1D9M', customer: 'Deepa M.', date: '2024-02-08', total: 6999, status: 'processing' },
  { id: 'MIRA-D5E4N', customer: 'Ritu Patel', date: '2024-02-07', total: 32000, status: 'confirmed' },
  { id: 'MIRA-F7H2P', customer: 'Sneha Iyer', date: '2024-02-06', total: 8499, status: 'delivered' },
]

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped: 'bg-gold/20 text-gold-dark',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default function AdminDashboard() {
  // Mock revenue data for chart display
  const revenueData = [
    { month: 'Sep', value: 65 },
    { month: 'Oct', value: 78 },
    { month: 'Nov', value: 92 },
    { month: 'Dec', value: 85 },
    { month: 'Jan', value: 110 },
    { month: 'Feb', value: 124 },
  ]
  const maxValue = Math.max(...revenueData.map((d) => d.value))

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-cormorant text-3xl font-light text-dark-ink">Dashboard</h1>
        <p className="font-dm text-sm text-warm-gray mt-1">Welcome back. Here&apos;s your store overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map(({ icon: Icon, label, value, change, up }) => (
          <div key={label} className="bg-ivory p-6 border border-border/50 luxury-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                <Icon size={18} className="text-gold" />
              </div>
            </div>
            <p className="font-cormorant text-2xl md:text-3xl text-dark-ink">{value}</p>
            <div className="flex items-center justify-between mt-2">
              <p className="font-dm text-[10px] tracking-wider uppercase text-warm-gray">{label}</p>
              <span className={`font-dm text-xs font-medium ${up ? 'text-green-600' : 'text-red-500'}`}>{change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart (CSS-based bars) */}
      <div className="bg-ivory p-6 border border-border/50 luxury-shadow mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-cormorant text-xl text-dark-ink">Revenue Overview</h2>
          <div className="flex items-center gap-2 text-green-600">
            <TrendingUp size={16} />
            <span className="font-dm text-xs">+12.5% vs last period</span>
          </div>
        </div>
        <div className="flex items-end gap-4 h-48">
          {revenueData.map((d) => (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-gold/20 rounded-t-sm relative overflow-hidden" style={{ height: `${(d.value / maxValue) * 100}%` }}>
                <div className="absolute inset-0 bg-gold/60 hover:bg-gold transition-colors" />
              </div>
              <span className="font-dm text-[10px] text-warm-gray">{d.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-ivory p-6 border border-border/50 luxury-shadow">
        <h2 className="font-cormorant text-xl text-dark-ink mb-6">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left font-dm text-[10px] tracking-wider uppercase text-warm-gray pb-3">Order</th>
                <th className="text-left font-dm text-[10px] tracking-wider uppercase text-warm-gray pb-3">Customer</th>
                <th className="text-left font-dm text-[10px] tracking-wider uppercase text-warm-gray pb-3 hidden md:table-cell">Date</th>
                <th className="text-right font-dm text-[10px] tracking-wider uppercase text-warm-gray pb-3">Total</th>
                <th className="text-right font-dm text-[10px] tracking-wider uppercase text-warm-gray pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_ORDERS.map((order) => (
                <tr key={order.id} className="border-b border-border/30 hover:bg-blush/30 transition-colors">
                  <td className="py-3 font-dm text-sm text-dark-ink">{order.id}</td>
                  <td className="py-3 font-dm text-sm text-dark-ink">{order.customer}</td>
                  <td className="py-3 font-dm text-sm text-warm-gray hidden md:table-cell">
                    {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </td>
                  <td className="py-3 font-dm text-sm text-dark-ink text-right">{PRICE_FORMATTER.format(order.total)}</td>
                  <td className="py-3 text-right">
                    <span className={`inline-block px-3 py-1 font-dm text-[10px] tracking-wider uppercase rounded-full ${STATUS_COLORS[order.status] || ''}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
