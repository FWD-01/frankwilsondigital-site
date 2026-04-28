import type { Package } from "@/types/content"

export const packages: Package[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Your foundation. Done properly.",
    price: 3500,
    currency: "ZAR",
    billingCycle: "monthly",
    features: [
      "Monthly content calendar",
      "4 branded social posts per week",
      "LinkedIn presence management",
      "Monthly performance summary",
    ],
    cta: { label: "Get started", action: "paystack" },
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Consistent presence, consistent results.",
    price: 6500,
    currency: "ZAR",
    billingCycle: "monthly",
    highlight: true,
    features: [
      "Everything in Starter",
      "Newsletter (bi-weekly)",
      "Short-form video scripts",
      "Competitor content audit (quarterly)",
      "Dedicated Slack channel",
    ],
    cta: { label: "Get started", action: "paystack" },
  },
  {
    id: "authority",
    name: "Authority",
    tagline: "Full digital presence. Fully handled.",
    price: 0,
    currency: "ZAR",
    billingCycle: "monthly",
    features: [
      "Everything in Growth",
      "Long-form content (articles / thought leadership)",
      "Website copy maintenance",
      "Speaking opportunity research",
      "Monthly strategy call",
    ],
    cta: { label: "Book a call", action: "cal" },
  },
]
