import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { sendDemoNotification } from "@/lib/resend"
import { appendToSheet } from "@/lib/sheets"

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  business: z.string().min(2).max(200),
  message: z.string().max(2000).optional(),
  contentManager: z.string().optional(),
  postingFrequency: z.string().optional(),
  mainGoal: z.string().optional(),
  whatsapp: z.string().optional(),
  industry: z.string().optional(),
  websiteOrInstagram: z.string().optional(),
  biggestChallenge: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    await Promise.all([
      sendDemoNotification(data),
      appendToSheet({
        fullName: data.name,
        businessName: data.business,
        email: data.email,
        whatsapp: data.whatsapp ?? "",
        industry: data.industry ?? "",
        websiteOrInstagram: data.websiteOrInstagram ?? "",
        biggestChallenge: data.biggestChallenge ?? "",
        contentManager: data.contentManager ?? "",
        postingFrequency: data.postingFrequency ?? "",
        mainGoal: data.mainGoal ?? "",
      }),
    ])

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
