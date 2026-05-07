import type { DemoFormData } from "@/types/demo"
import type { ApiResponse } from "@/types/api"

export async function submitDemo(
  data: DemoFormData,
  turnstileToken: string
): Promise<ApiResponse> {
  const res = await fetch("/api/demo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: data.fullName,
      email: data.email,
      business: data.businessName,
      whatsapp: data.whatsapp,
      industry: data.industry,
      websiteOrInstagram: data.websiteOrInstagram,
      biggestChallenge: data.biggestChallenge,
      contentManager: data.contentManager,
      postingFrequency: data.postingFrequency,
      mainGoal: data.mainGoal,
      turnstileToken,
    }),
  })
  return res.json() as Promise<ApiResponse>
}
