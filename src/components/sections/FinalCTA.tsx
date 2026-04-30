import { HandwrittenAccent } from "@/components/ui/HandwrittenAccent"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { BookDemoButton } from "@/components/ui/BookDemoButton"

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
              <HandwrittenAccent text="one more thing." className="mb-4 block" color="orange" />

              <h2 className="mb-6">
                <HandwrittenAccent
                  text="If you're still thinking about it, that's what the demo is for."
                  className="text-4xl md:text-5xl leading-snug block"
                  color="black"
                />
              </h2>

              <p className="text-body-lg text-gray-muted mb-10 leading-relaxed">
                No commitment. No pitch. Just a clear picture of what your digital
                presence could look like, and a system to make it happen.
              </p>

              <BookDemoButton>Book your free demo</BookDemoButton>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
