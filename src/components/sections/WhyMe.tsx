import Image from "next/image"
import { Badge } from "@/components/ui/Badge"
import { HandwrittenAccent } from "@/components/ui/HandwrittenAccent"
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
          {/* Founder photo */}
          <AnimatedSection direction="left" className="order-2 md:order-1">
            <div className="relative w-fit">
              {/* Slight tilt on the photo frame */}
              <div className="relative -rotate-1 overflow-hidden" style={{ width: 400, height: 500 }}>
                <Image
                  src="/images/founder/Roget.jpg"
                  alt="Rogét van Heerden, founder of Frank Wilson Digital"
                  fill
                  className="object-cover object-top grayscale contrast-110"
                  sizes="400px"
                  priority
                />
                {/* Duotone-style orange tint overlay */}
                <div className="absolute inset-0 bg-orange/10 mix-blend-color pointer-events-none" aria-hidden />
                {/* Grain texture */}
                <div
                  className="absolute inset-0 opacity-30 pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundSize: "128px 128px",
                  }}
                  aria-hidden
                />
                {/* Bottom fade to black */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" aria-hidden />
                {/* Name tag in bottom-left */}
                <div className="absolute bottom-5 left-5">
                  <HandwrittenAccent text="Rogét van Heerden" color="cream" className="text-lg block" />
                  <p className="font-mono text-mono-label text-gray-muted uppercase tracking-widest mt-1">Founder</p>
                </div>
              </div>

              {/* Orange offset border frame */}
              <div
                className="absolute -bottom-3 -right-3 w-full h-full border border-orange -z-10"
                aria-hidden
              />
              {/* Pixel dot accent */}
              <div className="absolute -top-2 -left-2 w-3 h-3 bg-orange" aria-hidden />
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

              <h2 className="mb-6">
                <HandwrittenAccent text="You work with me. " color="cream" className="text-4xl md:text-5xl leading-snug" />
                <HandwrittenAccent text="Not a team you never meet." color="orange" className="text-4xl md:text-5xl leading-snug" />
              </h2>

              <div className="flex flex-col gap-6">
                <p className="text-body-lg text-gray-muted leading-relaxed">
                  I&apos;m Rogét van Heerden. I built Frank Wilson Digital because I watched
                  too many good businesses lose ground to competitors who simply showed up
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
