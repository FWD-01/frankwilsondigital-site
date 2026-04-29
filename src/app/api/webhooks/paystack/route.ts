import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-paystack-signature")
  const secret = process.env.PAYSTACK_WEBHOOK_SECRET

  if (!signature || !secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const rawBody = await req.text()
  const hash = crypto.createHmac("sha512", secret).update(rawBody).digest("hex")

  if (hash !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
  }

  const event = JSON.parse(rawBody) as { event: string; data: Record<string, unknown> }

  if (event.event === "charge.success") {
    // TODO Phase 5: send welcome email, log to DB, etc.
    // TODO Phase 5: send welcome email, log to DB, etc.
  }

  return NextResponse.json({ received: true })
}
