import { useCases } from "@/content/useCases"
import { Badge } from "@/components/ui/Badge"
import { HandwrittenAccent } from "@/components/ui/HandwrittenAccent"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { StaggerChildren } from "@/components/ui/StaggerChildren"

export function UseCases() {
  return (
    <section
      id="use-cases"
      className="bg-cream-dark py-section px-6"
      aria-label="Who this is for"
    >
      <div className="max-w-6xl mx-auto">
        <AnimatedSection direction="up">
          <div className="mb-12">
            <Badge label="Who this is for" number="07" className="mb-6" />
            <h2 className="max-w-xl">
              <HandwrittenAccent text="Sound like you?" color="black" className="text-4xl md:text-5xl leading-snug block" />
            </h2>
          </div>
        </AnimatedSection>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map((useCase) => (
            <article
              key={useCase.id}
              className="bg-cream border border-gray-line p-8 flex flex-col gap-4"
            >
              <p className="font-mono text-mono-label uppercase tracking-widest text-orange">
                {useCase.persona}
              </p>
              <p className="text-body text-gray-muted leading-relaxed">
                {useCase.description}
              </p>
              <div className="border-t border-gray-line pt-4 mt-auto">
                <p className="text-small font-medium text-black">{useCase.outcome}</p>
              </div>
            </article>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
