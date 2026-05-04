import type { Package } from "@/types/content"

export const packages: Package[] = [
  {
    id: "essential",
    name: "Essential",
    tagline: "Build a consistent, professional presence. Done properly.",
    price: 3500,
    currency: "ZAR",
    billingCycle: "monthly",
    features: [
      "10 pieces of content per month, averaging 2–3 posts per week",
      "8 single image posts, 1 carousel post, 1 reel or article",
      "Everything scheduled and planned in advance",
      "Review and approve all content at your monthly strategy check-in",
      "Email notification each time a post goes live",
      "Monthly analytics summary",
      "30-minute monthly strategy check-in",
    ],
    cta: { label: "Get started", action: "paystack" },
  },
  {
    id: "momentum",
    name: "Momentum",
    tagline: "More content, more reach, and someone handling your community.",
    price: 6000,
    currency: "ZAR",
    billingCycle: "monthly",
    highlight: true,
    features: [
      "12 pieces of content per month, averaging 3–4 posts per week",
      "8 single image posts, 2 carousel posts, 2 reels or articles",
      "Full content scheduling and calendar planning",
      "Review and approve all content at your monthly strategy session",
      "Email notification each time a post goes live",
      "Comment and DM support — community managed for you",
      "Lead-focused CTA strategy and campaign planning",
      "Monthly promotion or offer campaign support",
      "Monthly analytics report and dedicated strategy session",
      "Priority turnaround on revisions",
    ],
    cta: { label: "Get started", action: "paystack" },
  },
]
