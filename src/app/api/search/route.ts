import { NextResponse } from 'next/server'
import { PRODUCTS } from '@/lib/constants'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.toLowerCase() || ''

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [], count: 0 })
  }

  // In production: use Supabase full-text search
  // const { data } = await supabase.from('products').select().textSearch('fts', query)

  const results = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.fabric.toLowerCase().includes(query) ||
      p.category_name.toLowerCase().includes(query)
  )

  return NextResponse.json({ results, count: results.length })
}
