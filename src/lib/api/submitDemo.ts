import type { DemoFormData } from "@/types/demo"

// Plug in your booking link via this env var
// e.g. NEXT_PUBLIC_BOOKING_URL=https://calendly.com/frankwilsondigital/content-strategy-demo
export const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL ??
  "https://calendly.com/frankwilsondigital/content-strategy-demo"

export async function submitDemo(data: DemoFormData): Promise<void> {
  // Log for now — replace with Google Sheets / DB write here
  console.log("[submitDemo]", data)

  // POST to /api/demo — maps to existing schema until route is extended
  // TODO: Extend /api/demo to accept full DemoFormData and send richer Resend email
  // TODO: Google Sheets — call appendToSheet(data) here
  // TODO: Resend — call sendQualificationEmail(data) here with booking link + full details
  try {
    await fetch("/api/demo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.fullName,
        email: data.email,
        business: data.businessName,
        message: [
          `Industry: ${data.industry}`,
          `Website / Instagram: ${data.websiteOrInstagram}`,
          `WhatsApp: ${data.whatsapp}`,
          `Biggest Challenge: ${data.biggestChallenge}`,
        ].join("\n"),
      }),
    })
  } catch {
    // Non-blocking — redirect proceeds regardless
  }
}
