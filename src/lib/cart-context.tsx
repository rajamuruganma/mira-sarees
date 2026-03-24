'use client'

import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react'
import type { ProductCardData } from '@/lib/types'

// ============================================================
// Cart Types
// ============================================================
export interface CartItemData {
  id: string
  productId: string
  name: string
  slug: string
  image_url: string
  fabric: string
  color: { name: string; hex: string }
  price: number
  compare_price: number | null
  quantity: number
}

interface CartState {
  items: CartItemData[]
  isOpen: boolean
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItemData }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_DRAWER' }
  | { type: 'OPEN_DRAWER' }
  | { type: 'CLOSE_DRAWER' }
  | { type: 'LOAD_CART'; payload: CartItemData[] }

// ============================================================
// Helpers
// ============================================================
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.id === action.payload.id)
      if (existing) {
        return {
          ...state,
          isOpen: true,
          items: state.items.map((i) =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        }
      }
      return { ...state, isOpen: true, items: [...state.items, action.payload] }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.id !== action.payload) }
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.id === action.payload.id
              ? { ...i, quantity: Math.max(0, action.payload.quantity) }
              : i
          )
          .filter((i) => i.quantity > 0),
      }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    case 'TOGGLE_DRAWER':
      return { ...state, isOpen: !state.isOpen }
    case 'OPEN_DRAWER':
      return { ...state, isOpen: true }
    case 'CLOSE_DRAWER':
      return { ...state, isOpen: false }
    case 'LOAD_CART':
      return { ...state, items: action.payload }
    default:
      return state
  }
}

// ============================================================
// Context
// ============================================================
interface CartContextType {
  items: CartItemData[]
  isOpen: boolean
  itemCount: number
  subtotal: number
  addItem: (product: ProductCardData, quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  toggleDrawer: () => void
  openDrawer: () => void
  closeDrawer: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false })

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mira-cart')
      if (saved) {
        dispatch({ type: 'LOAD_CART', payload: JSON.parse(saved) })
      }
    } catch {
      // ignore
    }
  }, [])

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mira-cart', JSON.stringify(state.items))
    } catch {
      // ignore
    }
  }, [state.items])

  const addItem = (product: ProductCardData, quantity = 1) => {
    const item: CartItemData = {
      id: product.id,
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image_url: product.image_url,
      fabric: product.fabric,
      color: product.colors[0] || { name: 'Default', hex: '#000' },
      price: product.price,
      compare_price: product.compare_price,
      quantity,
    }
    dispatch({ type: 'ADD_ITEM', payload: item })
  }

  const removeItem = (id: string) => dispatch({ type: 'REMOVE_ITEM', payload: id })
  const updateQuantity = (id: string, quantity: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })
  const toggleDrawer = () => dispatch({ type: 'TOGGLE_DRAWER' })
  const openDrawer = () => dispatch({ type: 'OPEN_DRAWER' })
  const closeDrawer = () => dispatch({ type: 'CLOSE_DRAWER' })

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        itemCount,
        subtotal,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleDrawer,
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
