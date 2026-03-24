// ============================================================
// MIRA. — Type Definitions
// ============================================================

export interface User {
  id: string
  email: string
  full_name: string | null
  phone: string | null
  avatar_url: string | null
  role: 'user' | 'admin' | 'artisan'
  created_at: string
}

export interface Address {
  id: string
  user_id: string
  label: string
  street: string
  city: string
  state: string
  pincode: string
  is_default: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  parent_id: string | null
  sort_order: number
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  category_id: string
  fabric: string
  weave_type: string | null
  origin_state: string | null
  care_instructions: string | null
  is_customizable: boolean
  is_active: boolean
  created_at: string
  category?: Category
  variants?: ProductVariant[]
  images?: ProductImage[]
  reviews?: Review[]
  artisan?: Artisan
}

export interface ProductVariant {
  id: string
  product_id: string
  color_name: string
  color_hex: string
  size: string
  price: number
  compare_price: number | null
  sku: string
  stock_quantity: number
}

export interface ProductImage {
  id: string
  product_id: string
  variant_id: string | null
  url: string
  alt_text: string
  is_primary: boolean
}

export interface Review {
  id: string
  product_id: string
  user_id: string
  rating: number
  title: string
  body: string
  is_verified: boolean
  created_at: string
  user?: User
}

export interface WishlistItem {
  id: string
  user_id: string
  product_variant_id: string
  added_at: string
  variant?: ProductVariant & { product?: Product }
}

export interface Cart {
  id: string
  user_id: string | null
  session_id: string | null
  created_at: string
  items?: CartItem[]
}

export interface CartItem {
  id: string
  cart_id: string
  product_variant_id: string
  quantity: number
  customization_json: Record<string, unknown> | null
  variant?: ProductVariant & { product?: Product & { images?: ProductImage[] } }
}

export interface Order {
  id: string
  user_id: string
  order_number: string
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
  address_id: string
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
  payment_id: string | null
  razorpay_order_id: string | null
  created_at: string
  items?: OrderItem[]
  address?: Address
}

export interface OrderItem {
  id: string
  order_id: string
  product_variant_id: string
  quantity: number
  price_at_purchase: number
  variant?: ProductVariant & { product?: Product & { images?: ProductImage[] } }
}

export interface Coupon {
  id: string
  code: string
  type: 'percentage' | 'fixed'
  value: number
  min_order: number
  max_uses: number
  used_count: number
  is_active: boolean
}

export interface CustomizationRequest {
  id: string
  user_id: string
  fabric: string
  color: string
  pattern: string
  blouse_style: string
  border_width: string
  embroidery_type: string
  notes: string | null
  budget: number
  reference_images: string[]
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  created_at: string
}

export interface Artisan {
  id: string
  name: string
  region: string
  speciality: string
  bio: string
  avatar_url: string
  rating: number
  years_experience?: number
}

// Product card display type (computed from product + variants)
export interface ProductCardData {
  id: string
  name: string
  slug: string
  fabric: string
  category_name: string
  image_url: string
  price: number
  compare_price: number | null
  rating: number
  review_count: number
  badge: string | null
  is_customizable: boolean
  colors: { name: string; hex: string }[]
  styled_by?: string
  sub_category?: string
}

// Testimonial
export interface Testimonial {
  id: string
  name: string
  city: string
  avatar: string
  quote: string
  rating: number
}
