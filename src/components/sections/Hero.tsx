import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { HeroHeadline } from "@/components/ui/HeroHeadline"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { BookDemoButton } from "@/components/ui/BookDemoButton"
import Link from "next/link"

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center bg-cream pt-16"
      aria-label="Hero"
    >
      <div className="max-w-6xl mx-auto px-6 py-section w-full">
        <div className="max-w-3xl">
          <AnimatedSection direction="up">
            <Badge label="Digital Systems" number="—" className="mb-8" />
          </AnimatedSection>

          <HeroHeadline />

          <AnimatedSection direction="up" delay={0.4}>
            <p className="text-body-lg text-gray-muted max-w-xl mb-10 leading-relaxed">
              A modern content system for founders, professionals, and growing
              businesses who can&apos;t afford to look inconsistent but don&apos;t have
              the time to fix it themselves.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <BookDemoButton>Get your free demo</BookDemoButton>
              <Button variant="outline" size="lg" asChild>
                <Link href="#packages">See packages</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 w-2 h-2 bg-orange" aria-hidden />
    </section>
  )
}
