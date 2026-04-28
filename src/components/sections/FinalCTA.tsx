import { Button } from "@/components/ui/Button"
import { HandwrittenAccent } from "@/components/ui/HandwrittenAccent"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import Link from "next/link"

export function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="bg-cream py-section px-6"
      aria-label="Final call to action"
    >
      <div className="max-w-4xl mx-auto">
        <AnimatedSection direction="up">
          <div className="border border-gray-line p-12 md:p-16 relative">
            {/* Pixel corner accents */}
            <div className="absolute top-0 left-0 w-2 h-2 bg-orange" aria-hidden />
            <div className="absolute top-0 right-0 w-2 h-2 bg-orange" aria-hidden />
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-orange" aria-hidden />
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-orange" aria-hidden />

            <div className="max-w-2xl">
              <HandwrittenAccent text="one more thing —" className="mb-4 block" color="orange" />

              <h2 className="text-display-lg font-display font-bold text-black mb-6">
                If you&apos;re still thinking about it,
                that&apos;s what the demo is for.
              </h2>

              <p className="text-body-lg text-gray-muted mb-10 leading-relaxed">
                No commitment. No pitch. Just a clear picture of what your digital
                presence could look like — and a system to make it happen.
              </p>

              <Button variant="primary" size="lg" asChild>
                <Link href="#demo">Book your free demo</Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
