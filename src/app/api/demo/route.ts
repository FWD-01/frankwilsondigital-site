import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { sendDemoNotification, sendDemoConfirmation } from "@/lib/resend"

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  business: z.string().min(2).max(200),
  message: z.string().max(1000).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    await Promise.all([sendDemoNotification(data), sendDemoConfirmation(data)])

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
