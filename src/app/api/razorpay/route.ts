import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { amount, currency = 'INR', receipt } = body

    // In production: create Razorpay order via SDK
    // const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID!, key_secret: process.env.RAZORPAY_KEY_SECRET! })
    // const order = await razorpay.orders.create({ amount: amount * 100, currency, receipt })

    // Mock response
    const mockOrder = {
      id: `order_${Date.now()}`,
      amount: amount * 100,
      currency,
      receipt: receipt || `MIRA-${Date.now().toString(36).toUpperCase()}`,
      status: 'created',
    }

    return NextResponse.json(mockOrder)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
