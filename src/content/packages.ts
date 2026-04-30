import type { Package } from "@/types/content"

export const packages: Package[] = [
  {
    id: "essential",
    name: "Essential",
    tagline: "Build a consistent, professional online presence. Done properly.",
    price: 3500,
    currency: "ZAR",
    billingCycle: "monthly",
    features: [
      "2–3 branded posts per week — planned, written, and published for you",
      "Captions and CTAs structured to convert",
      "Trends research to keep your content relevant and timely",
      "Engagement monitoring so nothing gets missed",
      "Monthly strategy check-in and performance summary",
    ],
    cta: { label: "Book a demo", action: "cal" },
  },
  {
    id: "momentum",
    name: "Momentum",
    tagline: "Consistent content. Clear direction. Built to grow your presence.",
    price: 6000,
    currency: "ZAR",
    billingCycle: "monthly",
    highlight: true,
    features: [
      "4–5 branded posts per week including video and carousel content",
      "Competitor monitoring to keep your positioning sharp",
      "Trends research and lead-focused campaign planning",
      "Full community management — comments and DMs handled",
      "Monthly analytics report with a dedicated strategy session",
    ],
    cta: { label: "Book a demo", action: "cal" },
  },
  {
    id: "authority",
    name: "Authority",
    tagline: "Full digital presence. Fully handled. Built for long-term growth.",
    price: 0,
    currency: "ZAR",
    billingCycle: "monthly",
    features: [
      "Daily content output across every platform you need to be on",
      "Long-form content, thought leadership, and website copy — all handled",
      "Fact-checked, brand-accurate content before anything goes live",
      "Deep competitor monitoring and trend-led strategy",
      "Brand positioning refinement and dedicated strategic direction",
    ],
    cta: { label: "Book a demo", action: "cal" },
  },
]
