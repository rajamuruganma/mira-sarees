'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Search, Plus, Edit, Trash2, Eye } from 'lucide-react'
import { PRODUCTS, PRICE_FORMATTER } from '@/lib/constants'

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category_name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-cormorant text-3xl font-light text-dark-ink">Products</h1>
        <button className="btn-primary text-sm">
          <Plus size={16} className="mr-2" /> Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray" />
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..." className="input-field pl-11 bg-ivory" />
      </div>

      {/* Products Table */}
      <div className="bg-ivory border border-border/50 luxury-shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {['Product', 'Category', 'Price', 'Badge', 'Actions'].map((h) => (
                <th key={h} className="text-left font-dm text-[10px] tracking-wider uppercase text-warm-gray p-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr key={product.id} className="border-b border-border/30 hover:bg-blush/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-14 flex-shrink-0 bg-blush overflow-hidden">
                      <Image src={product.image_url} alt={product.name} fill className="object-cover" sizes="48px" />
                    </div>
                    <div>
                      <p className="font-dm text-sm font-medium text-dark-ink">{product.name}</p>
                      <p className="font-dm text-xs text-warm-gray">{product.fabric}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 font-dm text-sm text-warm-gray">{product.category_name}</td>
                <td className="p-4">
                  <p className="font-dm text-sm font-medium text-dark-ink">{PRICE_FORMATTER.format(product.price)}</p>
                  {product.compare_price && (
                    <p className="font-dm text-xs text-warm-gray line-through">{PRICE_FORMATTER.format(product.compare_price)}</p>
                  )}
                </td>
                <td className="p-4">
                  {product.badge && (
                    <span className={`px-2 py-1 text-[10px] font-dm tracking-wider uppercase ${
                      product.badge === 'NEW' ? 'bg-dark-ink text-ivory' :
                      product.badge === 'SALE' ? 'bg-burgundy text-ivory' :
                      product.badge === 'LIMITED' ? 'bg-gold text-dark-ink' :
                      'bg-gold/20 text-gold'
                    }`}>
                      {product.badge}
                    </span>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button className="text-warm-gray hover:text-dark-ink transition-colors" title="View"><Eye size={16} /></button>
                    <button className="text-warm-gray hover:text-gold transition-colors" title="Edit"><Edit size={16} /></button>
                    <button className="text-warm-gray hover:text-burgundy transition-colors" title="Delete"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
