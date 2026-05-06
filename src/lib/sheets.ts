import type { DemoFormData } from "@/types/demo"

export async function appendToSheet(data: DemoFormData): Promise<void> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL
  if (!url) return

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      submittedAt: new Date().toISOString(),
      fullName: data.fullName,
      businessName: data.businessName,
      email: data.email,
      whatsapp: data.whatsapp,
      industry: data.industry,
      websiteOrInstagram: data.websiteOrInstagram,
      contentManager: data.contentManager,
      postingFrequency: data.postingFrequency,
      mainGoal: data.mainGoal,
      biggestChallenge: data.biggestChallenge,
    }),
  })
}
