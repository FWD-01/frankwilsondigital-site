import { Badge } from "@/components/ui/Badge"
import { HandwrittenAccent } from "@/components/ui/HandwrittenAccent"
import { PixelDivider } from "@/components/ui/PixelDivider"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { StaggerChildren } from "@/components/ui/StaggerChildren"
import type { WhyItem } from "@/types/content"

const items: WhyItem[] = [
  {
    title: "Consistency compounds.",
    description:
      "One post is noise. A system is signal. Showing up every week for a year builds authority that no single campaign can buy.",
  },
  {
    title: "You don't have to think about it.",
    description:
      "Content is created, approved, and scheduled. You review it. It goes out. That's the entire process from your side.",
  },
  {
    title: "Your voice. Not ours.",
    description:
      "We don't write generic content. We learn your tone, your perspective, your hot takes. Then we reproduce them at scale.",
  },
  {
    title: "It gets better over time.",
    description:
      "Every month we refine. What got engagement? What missed? The system adapts. It doesn't need to be restarted.",
  },
]

export function WhySystem() {
  return (
    <section
      id="why-system"
      className="bg-cream py-section px-6"
      aria-label="Why use this system"
    >
      <div className="max-w-6xl mx-auto">
        <AnimatedSection direction="up">
          <div className="mb-12">
            <Badge label="The system advantage" number="06" className="mb-6" />
            <h2 className="max-w-xl">
              <HandwrittenAccent text="Why a system beats " color="black" className="text-4xl md:text-5xl leading-snug" />
              <HandwrittenAccent text="ad hoc every time." color="orange" className="text-4xl md:text-5xl leading-snug" />
            </h2>
          </div>
        </AnimatedSection>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10" stagger={0.12}>
          {items.map((item, i) => (
            <div key={item.title}>
              <div className="flex items-start gap-4 mb-3">
                <span className="font-mono text-mono-label text-orange mt-1 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-heading font-bold text-black">
                  {item.title}
                </h3>
              </div>
              <p className="text-body text-gray-muted leading-relaxed pl-8">
                {item.description}
              </p>
            </div>
          ))}
        </StaggerChildren>

        <PixelDivider className="mt-section-sm" />
      </div>
    </section>
  )
}
