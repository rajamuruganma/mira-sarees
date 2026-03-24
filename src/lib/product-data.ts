import type { ProductCardData } from './types'

// ============================================================
// Saree Product Generator — 100% saree-only AI-generated images
// 34 unique AI images of Indian women in traditional sarees
// ============================================================

const STYLED_BY = [
  'Anika', 'Priya', 'Kavya', 'Meera', 'Diya', 'Isha',
  'Sneha', 'Riya', 'Pooja', 'Sanya', 'Tara', 'Nisha',
]

// 34 unique AI-generated saree images
const SAREE_IMAGES = [
  // Original 7 images
  '/images/sarees/banarasi-red.png',
  '/images/sarees/kanjivaram-purple.png',
  '/images/sarees/chanderi-green.png',
  '/images/sarees/bridal-gold.png',
  '/images/sarees/silk-blue.png',
  '/images/sarees/festive-orange.png',
  '/images/sarees/ivory-wedding.png',
  // Batch 1 — temple, garden, palace
  '/images/sarees/saree-01-red-temple.png',
  '/images/sarees/saree-02-pink-garden.png',
  '/images/sarees/saree-03-green-palace.png',
  // Batch 2 — bridal, river, festive
  '/images/sarees/saree-04-maroon-bridal.png',
  '/images/sarees/saree-05-blue-river.png',
  '/images/sarees/saree-06-gold-festive.png',
  // Batch 3 — purple silk, coral organza, white traditional
  '/images/sarees/saree-07-purple-silk.png',
  '/images/sarees/saree-08-coral-organza.png',
  '/images/sarees/saree-09-white-traditional.png',
  // Batch 4 — teal temple
  '/images/sarees/saree-10-teal-silk.png',
  // New session — wine, lavender, mustard
  '/images/sarees/saree-11-wine-temple.png',
  '/images/sarees/saree-12-lavender-garden.png',
  '/images/sarees/saree-13-mustard-haveli.png',
  // Olive, magenta, grey
  '/images/sarees/saree-14-olive-tussar.png',
  '/images/sarees/saree-15-magenta-bridal.png',
  '/images/sarees/saree-16-grey-designer.png',
  // Copper, turquoise, rosegold
  '/images/sarees/saree-17-copper-banarasi.png',
  '/images/sarees/saree-18-turquoise-modern.png',
  '/images/sarees/saree-19-rosegold-embroidered.png',
  // Plum, cream, scarlet
  '/images/sarees/saree-20-plum-traditional.png',
  '/images/sarees/saree-21-cream-cotton.png',
  '/images/sarees/saree-22-scarlet-wedding.png',
  // Bronze, mint, ruby
  '/images/sarees/saree-23-bronze-pattu.png',
  '/images/sarees/saree-24-mint-chiffon.png',
  '/images/sarees/saree-25-ruby-kanjivaram.png',
  // Forest, peach
  '/images/sarees/saree-26-forest-silk.png',
  '/images/sarees/saree-27-peach-festive.png',
]

interface SareeSpec {
  prefix: string
  fabric: string
  category: string
  sub_category: string
  priceRange: [number, number]
}

const SAREE_SPECS: SareeSpec[] = [
  // Banarasi (8 variants)
  { prefix: 'Royal', fabric: 'Pure Silk', category: 'Banarasi', sub_category: 'wedding', priceRange: [8000, 25000] },
  { prefix: 'Golden', fabric: 'Pure Silk', category: 'Banarasi', sub_category: 'wedding', priceRange: [12000, 35000] },
  { prefix: 'Crimson', fabric: 'Silk Brocade', category: 'Banarasi', sub_category: 'bridal', priceRange: [15000, 40000] },
  { prefix: 'Navy', fabric: 'Tanchoi Silk', category: 'Banarasi', sub_category: 'festive', priceRange: [9000, 18000] },
  { prefix: 'Emerald', fabric: 'Pure Silk', category: 'Banarasi', sub_category: 'festive', priceRange: [10000, 22000] },
  { prefix: 'Ivory', fabric: 'Katan Silk', category: 'Banarasi', sub_category: 'wedding', priceRange: [14000, 30000] },
  { prefix: 'Magenta', fabric: 'Organza Silk', category: 'Banarasi', sub_category: 'party', priceRange: [7000, 15000] },
  { prefix: 'Teal', fabric: 'Tussar Silk', category: 'Banarasi', sub_category: 'festive', priceRange: [6000, 14000] },
  // Kanjivaram (8 variants)
  { prefix: 'Temple', fabric: 'Pure Kanjivaram', category: 'Kanjivaram', sub_category: 'bridal', priceRange: [18000, 45000] },
  { prefix: 'Bridal Red', fabric: 'Pure Kanjivaram', category: 'Kanjivaram', sub_category: 'bridal', priceRange: [25000, 50000] },
  { prefix: 'Peacock', fabric: 'Kanjivaram Silk', category: 'Kanjivaram', sub_category: 'wedding', priceRange: [15000, 35000] },
  { prefix: 'Mango', fabric: 'Pure Kanjivaram', category: 'Kanjivaram', sub_category: 'festive', priceRange: [12000, 28000] },
  { prefix: 'Jade', fabric: 'Kanjivaram Silk', category: 'Kanjivaram', sub_category: 'party', priceRange: [10000, 22000] },
  { prefix: 'Rose', fabric: 'Kanjivaram Pattu', category: 'Kanjivaram', sub_category: 'wedding', priceRange: [20000, 40000] },
  { prefix: 'Ruby', fabric: 'Kanjivaram Silk', category: 'Kanjivaram', sub_category: 'bridal', priceRange: [22000, 48000] },
  { prefix: 'Wine', fabric: 'Pure Kanjivaram', category: 'Kanjivaram', sub_category: 'festive', priceRange: [16000, 32000] },
  // Chanderi (6 variants)
  { prefix: 'Pearl', fabric: 'Chanderi Tissue', category: 'Chanderi', sub_category: 'party', priceRange: [3000, 8000] },
  { prefix: 'Pastel', fabric: 'Chanderi Silk', category: 'Chanderi', sub_category: 'festive', priceRange: [4000, 9000] },
  { prefix: 'Sage', fabric: 'Chanderi Cotton', category: 'Chanderi', sub_category: 'casual', priceRange: [2500, 6000] },
  { prefix: 'Blush', fabric: 'Chanderi Tissue', category: 'Chanderi', sub_category: 'party', priceRange: [3500, 7500] },
  { prefix: 'Mint', fabric: 'Chanderi Silk', category: 'Chanderi', sub_category: 'festive', priceRange: [4500, 10000] },
  { prefix: 'Lavender', fabric: 'Chanderi Cotton', category: 'Chanderi', sub_category: 'casual', priceRange: [3000, 7000] },
  // Organza (4 variants)
  { prefix: 'Dreamy', fabric: 'Pure Organza', category: 'Organza', sub_category: 'designer', priceRange: [5000, 12000] },
  { prefix: 'Ethereal', fabric: 'Organza Silk', category: 'Organza', sub_category: 'party', priceRange: [6000, 14000] },
  { prefix: 'Aqua', fabric: 'Mirror Organza', category: 'Organza', sub_category: 'designer', priceRange: [7000, 15000] },
  { prefix: 'Coral', fabric: 'Organza Chiffon', category: 'Organza', sub_category: 'party', priceRange: [5500, 13000] },
  // Printed (4 variants)
  { prefix: 'Indigo', fabric: 'Block Print Cotton', category: 'Printed', sub_category: 'casual', priceRange: [2000, 5000] },
  { prefix: 'Rust', fabric: 'Ikkat Cotton', category: 'Printed', sub_category: 'casual', priceRange: [3000, 7000] },
  { prefix: 'Floral', fabric: 'Printed Georgette', category: 'Printed', sub_category: 'party', priceRange: [2500, 6000] },
  { prefix: 'Cream', fabric: 'Handloom Cotton', category: 'Printed', sub_category: 'casual', priceRange: [2000, 5500] },
  // Embroidered (4 variants)
  { prefix: 'Midnight', fabric: 'Embroidered Georgette', category: 'Embroidered', sub_category: 'designer', priceRange: [8000, 18000] },
  { prefix: 'Peach', fabric: 'Sequin Organza', category: 'Embroidered', sub_category: 'party', priceRange: [7000, 16000] },
  { prefix: 'Champagne', fabric: 'Thread Work Silk', category: 'Embroidered', sub_category: 'wedding', priceRange: [10000, 25000] },
  { prefix: 'Rose Gold', fabric: 'Embroidered Silk', category: 'Embroidered', sub_category: 'designer', priceRange: [9000, 20000] },
]

const COLOR_NAMES = [
  'Red', 'Maroon', 'Gold', 'Pink', 'Blue', 'Green', 'Purple',
  'Orange', 'Teal', 'Coral', 'Plum', 'Copper', 'Silver', 'Bronze',
  'Turquoise', 'Lavender', 'Peach', 'Mustard', 'Wine', 'Olive',
]

const COLOR_HEXES: Record<string, string> = {
  Red: '#C41E3A', Maroon: '#800020', Gold: '#C9A84C', Pink: '#E8A0BF',
  Blue: '#191970', Green: '#50C878', Purple: '#7B68EE', Orange: '#FF8243',
  Teal: '#008080', Coral: '#FF6347', Plum: '#DDA0DD', Copper: '#B76E79',
  Silver: '#C0C0C0', Bronze: '#CD7F32', Turquoise: '#40E0D0',
  Lavender: '#E6E6FA', Peach: '#FFDAB9', Mustard: '#FFDB58',
  Wine: '#722F37', Olive: '#808000',
}

const BADGES = [null, null, 'NEW', 'SALE', 'LIMITED', 'BESTSELLER', 'TRENDING']

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return s / 2147483647
  }
}

export function generateProducts(count: number = 120): ProductCardData[] {
  const products: ProductCardData[] = []

  for (let i = 0; i < count; i++) {
    const rand = seededRandom(i * 7 + 42)
    const spec = SAREE_SPECS[i % SAREE_SPECS.length]
    const colorName = COLOR_NAMES[Math.floor(rand() * COLOR_NAMES.length)]
    const model = STYLED_BY[i % STYLED_BY.length]
    // Distribute 34 images evenly across all products
    const img = SAREE_IMAGES[i % SAREE_IMAGES.length]
    const badgeIdx = Math.floor(rand() * BADGES.length)

    const price = Math.round(
      (spec.priceRange[0] + rand() * (spec.priceRange[1] - spec.priceRange[0])) / 100
    ) * 100

    const hasDiscount = rand() > 0.6
    const comparePrice = hasDiscount ? Math.round(price * (1.15 + rand() * 0.25) / 100) * 100 : null

    const name = `${spec.prefix} ${colorName} ${spec.fabric.split(' ').pop()}`
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

    const color2Name = COLOR_NAMES[(Math.floor(rand() * COLOR_NAMES.length) + 3) % COLOR_NAMES.length]

    products.push({
      id: String(i + 1),
      name,
      slug,
      fabric: spec.fabric,
      category_name: spec.category,
      image_url: img,
      price,
      compare_price: comparePrice,
      rating: Number((4.0 + rand() * 1.0).toFixed(1)),
      review_count: Math.floor(5 + rand() * 80),
      badge: BADGES[badgeIdx] || null,
      is_customizable: rand() > 0.85,
      colors: [
        { name: colorName, hex: COLOR_HEXES[colorName] || '#C9A84C' },
        { name: color2Name, hex: COLOR_HEXES[color2Name] || '#8B2635' },
      ],
      styled_by: model,
      sub_category: spec.sub_category,
    })
  }

  return products
}

// Pre-generated catalog — 120 sarees with 34 unique AI images
export const GENERATED_PRODUCTS = generateProducts(120)

export const PRODUCT_CATEGORIES = Array.from(new Set(GENERATED_PRODUCTS.map((p) => p.category_name)))
export const PRODUCT_SUB_CATEGORIES = Array.from(new Set(GENERATED_PRODUCTS.map((p) => p.sub_category).filter((x): x is string => !!x)))
export const PRODUCT_MODELS = Array.from(new Set(GENERATED_PRODUCTS.map((p) => p.styled_by).filter((x): x is string => !!x)))
