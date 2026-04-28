import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { getResendClient } from "@/lib/resend"

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    await getResendClient().emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "hello@frankwilsondigital.co.za",
      to: process.env.RESEND_DEMO_NOTIFY_EMAIL ?? "frank@frankwilsondigital.co.za",
      subject: `Contact form — ${data.name}`,
      html: `<p><strong>${data.name}</strong> (${data.email})</p><p>${data.message}</p>`,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid form data." },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
