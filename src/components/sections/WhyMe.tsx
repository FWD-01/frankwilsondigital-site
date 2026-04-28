import { Badge } from "@/components/ui/Badge"
import { AnimatedSection } from "@/components/ui/AnimatedSection"

export function WhyMe() {
  return (
    <section
      id="why-me"
      className="bg-black py-section px-6"
      aria-label="Why work with me"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Founder image placeholder */}
          <AnimatedSection direction="left" className="order-2 md:order-1">
            <div className="relative w-fit">
              <div
                className="bg-black-soft border border-gray-line/20 flex items-end justify-end p-6 -rotate-1"
                style={{ width: 400, height: 500 }}
                aria-hidden
              >
                <p
                  className="font-display font-bold text-gray-muted/10 select-none leading-none"
                  style={{ fontSize: "clamp(6rem, 12vw, 9rem)" }}
                >
                  FW
                </p>
              </div>
              {/* Orange border frame offset */}
              <div
                className="absolute -bottom-3 -right-3 w-full h-full border border-orange -z-10"
                aria-hidden
              />
            </div>
          </AnimatedSection>

          {/* Text */}
          <AnimatedSection direction="right" className="order-1 md:order-2">
            <div>
              <Badge
                label="Why work with me"
                number="05"
                className="mb-6 [&>*]:text-gray-muted"
              />

              <h2 className="text-display-lg font-display font-bold text-cream mb-6">
                You work with me.{" "}
                <span className="text-orange">Not a team you never meet.</span>
              </h2>

              <div className="flex flex-col gap-6">
                <p className="text-body-lg text-gray-muted leading-relaxed">
                  I&apos;m Frank Wilson. I built this service because I watched too many
                  good businesses lose ground to competitors who simply showed up
                  online more consistently.
                </p>
                <p className="text-body text-gray-muted leading-relaxed">
                  Every piece of content is shaped by me. Your voice, your goals,
                  your audience. No account managers. No junior writers guessing
                  your tone. Just a direct relationship with someone invested in
                  your results.
                </p>
                <p className="text-body text-gray-muted leading-relaxed">
                  Founder-led. South Africa-based. Built for the long game.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
