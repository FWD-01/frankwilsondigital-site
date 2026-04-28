import { generateReference } from "@/lib/utils"
import type { Package } from "@/types/content"

declare global {
  interface Window {
    PaystackPop: {
      setup: (config: PaystackConfig) => { openIframe: () => void }
    }
  }
}

interface PaystackConfig {
  key: string
  email: string
  amount: number
  currency: string
  ref: string
  metadata: Record<string, unknown>
  onSuccess: (transaction: { reference: string }) => void
  onCancel: () => void
}

export function initiatePaystackPayment(
  pkg: Package,
  email: string,
  onSuccess: (reference: string) => void
) {
  const handler = window.PaystackPop.setup({
    key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ?? "",
    email,
    amount: pkg.price * 100, // Paystack uses kobo/cents
    currency: pkg.currency,
    ref: generateReference("FWD"),
    metadata: { package_id: pkg.id, package_name: pkg.name },
    onSuccess: (tx) => onSuccess(tx.reference),
    onCancel: () => {},
  })
  handler.openIframe()
}

export function verifyWebhookSignature(body: string, signature: string): boolean {
  // Verified server-side in the webhook route using crypto.createHmac
  // This export is a reminder — do not call this client-side
  void body
  void signature
  return false
}
