import { workSteps } from "@/content/steps"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { PixelDivider } from "@/components/ui/PixelDivider"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { StaggerChildren } from "@/components/ui/StaggerChildren"
import Link from "next/link"

export function HowWeWork() {
  return (
    <section
      id="how-we-work"
      className="bg-black py-section px-6"
      aria-label="How we work"
    >
      <div className="max-w-6xl mx-auto">
        <AnimatedSection direction="up">
          <div className="mb-12">
            <Badge label="The process" number="08" className="mb-6 [&>*]:text-gray-muted" />
            <h2 className="text-display-lg font-display font-bold text-cream max-w-xl">
              Simple by design.{" "}
              <span className="text-orange">Powerful by nature.</span>
            </h2>
          </div>
        </AnimatedSection>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14" stagger={0.12}>
          {workSteps.map((step) => (
            <div
              key={step.number}
              className="border border-black-soft p-8 flex flex-col gap-3"
            >
              <span className="font-mono text-mono-label text-orange">{step.number}</span>
              <h3 className="font-display text-heading font-bold text-cream">{step.title}</h3>
              <p className="text-body text-gray-muted leading-relaxed">{step.description}</p>
            </div>
          ))}
        </StaggerChildren>

        <PixelDivider className="mb-12 opacity-20" />

        <Button variant="primary" size="lg" asChild>
          <Link href="#demo">Start with a free demo</Link>
        </Button>
      </div>
    </section>
  )
}
