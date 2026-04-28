import { proofItems } from "@/content/proof"
import { PixelDivider } from "@/components/ui/PixelDivider"
import { ProofCountUp } from "@/components/ui/ProofCountUp"

export function ProofStrip() {
  return (
    <section
      aria-label="Social proof"
      className="bg-black-soft py-section-sm px-6"
    >
      <div className="max-w-6xl mx-auto">
        <PixelDivider className="mb-10 opacity-20" />
        <ProofCountUp items={proofItems} />
        <PixelDivider className="mt-10 opacity-20" accent="end" />
      </div>
    </section>
  )
}
