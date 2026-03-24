import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // In production: insert into Supabase subscribers table
    // and send welcome email via Resend
    // const supabase = createClient()
    // await supabase.from('subscribers').insert({ email })
    // await resend.emails.send({ ... })

    return NextResponse.json({ success: true, message: 'Subscribed successfully!' })
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
