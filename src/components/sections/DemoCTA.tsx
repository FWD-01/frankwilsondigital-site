import { Badge } from "@/components/ui/Badge"
import { HandwrittenAccent } from "@/components/ui/HandwrittenAccent"
import { DemoForm } from "@/components/ui/DemoForm"
import { AnimatedSection } from "@/components/ui/AnimatedSection"

export function DemoCTA() {
  return (
    <section
      id="demo"
      className="bg-orange py-section px-6"
      aria-label="Free Content Strategy Demo"
    >
      <div className="max-w-4xl mx-auto">
        <AnimatedSection direction="up">
          <div className="text-center mb-12">
            <Badge
              label="No commitment"
              number="—"
              className="mb-6 justify-center [&>span]:text-black [&>span:last-child]:border-black [&>span:last-child]:text-black"
            />

            <h2 className="text-display-lg font-display font-bold text-black mb-4">
              See your content system{" "}
              <span className="relative inline-block">
                before you commit.
                <HandwrittenAccent
                  text="for free"
                  className="absolute -top-8 -right-4 text-black text-xl"
                  color="black"
                />
              </span>
            </h2>

            <p className="text-body-lg text-black/70 max-w-xl mx-auto">
              Book a free Content Strategy Demo. I&apos;ll map out exactly what your
              monthly system would look like — topics, formats, channels, cadence.
              No pitch. No pressure.
            </p>
          </div>

          <div className="bg-cream max-w-2xl mx-auto p-8 md:p-10 border border-black/10">
            <DemoForm />
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
