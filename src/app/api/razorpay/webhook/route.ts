import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-razorpay-signature')

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
    }

    // Verify webhook signature
    const secret = process.env.RAZORPAY_KEY_SECRET!
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex')

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const event = JSON.parse(body)

    switch (event.event) {
      case 'payment.captured':
        // Update order status in Supabase
        // Send confirmation email via Resend
        // Send WhatsApp notification
        console.log('Payment captured:', event.payload.payment.entity.id)
        break
      case 'payment.failed':
        // Update order status to failed
        console.log('Payment failed:', event.payload.payment.entity.id)
        break
      default:
        console.log('Unhandled event:', event.event)
    }

    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
