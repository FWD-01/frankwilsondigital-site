import { Badge } from "@/components/ui/Badge"
import { PixelDivider } from "@/components/ui/PixelDivider"
import { AnimatedSection } from "@/components/ui/AnimatedSection"

export function About() {
  return (
    <section id="about" className="bg-cream py-section px-6" aria-label="About">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <AnimatedSection direction="left">
            <div>
              <Badge label="What this is" number="02" className="mb-6" />
              <h2 className="text-display-lg font-display font-bold text-black mb-6">
                Your content system.{" "}
                <span className="text-orange">Running without you.</span>
              </h2>
              <p className="text-body-lg text-gray-muted mb-6 leading-relaxed">
                Frank Wilson Digital is a done-for-you content system. Not a freelancer
                you have to manage. Not an agency that disappears after onboarding.
                A system — built around your voice, your goals, and your audience.
              </p>
              <p className="text-body text-gray-muted leading-relaxed">
                Every month, your content is planned, created, and delivered. You
                approve it. It goes out. You get on with running your business.
              </p>
            </div>
          </AnimatedSection>

          {/* Content calendar visual */}
          <AnimatedSection direction="right">
            <div className="relative">
              <div className="bg-cream-dark border border-gray-line w-full max-w-sm ml-auto p-6">
                <p className="font-mono text-mono-label text-gray-muted mb-5 uppercase tracking-widest">
                  Monthly content plan
                </p>

                <div className="flex flex-col gap-3">
                  {(
                    [
                      ["Mon", "full"],
                      ["Tue", "two-thirds"],
                      ["Wed", "full"],
                      ["Thu", "half"],
                      ["Fri", "full"],
                    ] as [string, "full" | "two-thirds" | "half"][]
                  ).map(([day, width]) => (
                    <div key={day} className="flex items-center gap-3">
                      <span className="font-mono text-mono-label text-gray-muted w-8 shrink-0">
                        {day}
                      </span>
                      <div
                        className={`h-2 bg-orange ${
                          width === "full"
                            ? "flex-1"
                            : width === "two-thirds"
                              ? "w-2/3"
                              : "w-1/2"
                        }`}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-line flex justify-between items-center">
                  <span className="font-mono text-mono-label text-gray-muted">
                    4 posts / week
                  </span>
                  <div className="w-1.5 h-1.5 bg-orange" aria-hidden />
                </div>
              </div>

              <div
                className="absolute -bottom-2 -right-2 w-3 h-3 bg-orange"
                aria-hidden
              />
            </div>
          </AnimatedSection>
        </div>

        <PixelDivider className="mt-section-sm" />
      </div>
    </section>
  )
}
