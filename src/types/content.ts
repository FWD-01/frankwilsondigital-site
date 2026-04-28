export interface Package {
  id: string
  name: string
  tagline: string
  price: number
  currency: "ZAR"
  billingCycle: "monthly" | "once-off"
  features: string[]
  highlight?: boolean
  cta: {
    label: string
    action: "paystack" | "cal"
  }
}

export interface ProofItem {
  value: string
  label: string
  sublabel?: string
}

export interface UseCase {
  id: string
  persona: string
  description: string
  outcome: string
}

export interface WorkStep {
  number: string
  title: string
  description: string
}

export interface WhyItem {
  title: string
  description: string
}
