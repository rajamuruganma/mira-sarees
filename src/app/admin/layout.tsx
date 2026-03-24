import Link from 'next/link'
import { LayoutDashboard, Package, ShoppingBag, Palette, Tag, Settings } from 'lucide-react'

const ADMIN_NAV = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: ShoppingBag, label: 'Orders', href: '/admin/orders' },
  { icon: Package, label: 'Products', href: '/admin/products' },
  { icon: Palette, label: 'Customizations', href: '/admin/customizations' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-20 min-h-screen bg-blush/30">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-dark-ink min-h-[calc(100vh-5rem)] p-6 sticky top-20">
          <div className="mb-8">
            <h2 className="font-cormorant text-2xl text-ivory tracking-wider">
              MIRA<span className="text-gold">.</span> Admin
            </h2>
          </div>
          <nav className="space-y-1 flex-1">
            {ADMIN_NAV.map(({ icon: Icon, label, href }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-4 py-3 font-dm text-sm text-ivory/60 hover:text-ivory hover:bg-ivory/5 transition-all rounded"
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}
          </nav>
          <Link href="/" className="flex items-center gap-3 px-4 py-3 font-dm text-xs text-ivory/40 hover:text-ivory/60 transition-colors mt-auto">
            ← Back to Store
          </Link>
        </aside>

        {/* Mobile Nav */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-dark-ink flex justify-around py-3 px-4 safe-bottom">
          {ADMIN_NAV.map(({ icon: Icon, label, href }) => (
            <Link key={href} href={href} className="flex flex-col items-center gap-1 text-ivory/60 hover:text-ivory transition-colors">
              <Icon size={18} />
              <span className="text-[9px] font-dm tracking-wider uppercase">{label}</span>
            </Link>
          ))}
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 lg:p-10 pb-24 lg:pb-10">
          {children}
        </main>
      </div>
    </div>
  )
}
