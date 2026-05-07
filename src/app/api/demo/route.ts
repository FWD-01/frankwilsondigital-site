import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { sendDemoNotification } from "@/lib/resend"
import { appendToSheet } from "@/lib/sheets"

// Rate limiter — in-memory, secondary to Turnstile
const rateMap = new Map<string, { count: number; resetAt: number }>()

function getIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  )
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const window = 10 * 60 * 1000
  const limit = 5
  const entry = rateMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + window })
    return true
  }
  if (entry.count >= limit) return false
  entry.count++
  return true
}

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return false
  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }).toString(),
    }
  )
  const data = (await res.json()) as { success: boolean }
  return data.success
}

function stripHtml(s: string): string {
  return s.replace(/<[^>]*>/g, "").trim()
}

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
  turnstileToken: z.string().min(1),
})

export async function POST(req: NextRequest) {
  try {
    const ip = getIP(req)

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again in 10 minutes." },
        { status: 429, headers: { "Retry-After": "600" } }
      )
    }

    const body = await req.json()
    const data = schema.parse(body)

    const valid = await verifyTurnstile(data.turnstileToken)
    if (!valid) {
      return NextResponse.json(
        { success: false, error: "Security check failed. Please refresh and try again." },
        { status: 403 }
      )
    }

    const sanitised = {
      ...data,
      biggestChallenge: stripHtml(data.biggestChallenge ?? ""),
      websiteOrInstagram: stripHtml(data.websiteOrInstagram ?? ""),
    }

    await Promise.all([
      sendDemoNotification(sanitised),
      appendToSheet({
        fullName: sanitised.name,
        businessName: sanitised.business,
        email: sanitised.email,
        whatsapp: sanitised.whatsapp ?? "",
        industry: sanitised.industry ?? "",
        websiteOrInstagram: sanitised.websiteOrInstagram ?? "",
        biggestChallenge: sanitised.biggestChallenge ?? "",
        contentManager: sanitised.contentManager ?? "",
        postingFrequency: sanitised.postingFrequency ?? "",
        mainGoal: sanitised.mainGoal ?? "",
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
