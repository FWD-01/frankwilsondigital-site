import { packages } from "@/content/packages"
import { Badge } from "@/components/ui/Badge"
import { HandwrittenAccent } from "@/components/ui/HandwrittenAccent"
import { PackageCTA } from "@/components/ui/PackageCTA"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { StaggerChildren } from "@/components/ui/StaggerChildren"
import { cn } from "@/lib/utils"

export function Packages() {
  return (
    <section
      id="packages"
      className="bg-cream-dark py-section px-6"
      aria-label="Packages"
    >
      <div className="max-w-6xl mx-auto">
        <AnimatedSection direction="up">
          <div className="mb-12">
            <Badge label="SERVICES & PRICING" number="03" className="mb-6" />
            <h2 className="max-w-xl">
              <HandwrittenAccent text="Choose your system. " color="black" className="text-4xl md:text-5xl leading-snug" />
              <HandwrittenAccent text="Stay consistent. Look professional." color="orange" className="text-4xl md:text-5xl leading-snug" />
            </h2>
          </div>
        </AnimatedSection>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <article
              key={pkg.id}
              className={cn(
                "flex flex-col p-8 border",
                pkg.highlight
                  ? "bg-black text-cream border-black"
                  : "bg-cream border-gray-line"
              )}
            >
              <div className="mb-6">
                <p
                  className={cn(
                    "font-mono text-mono-label uppercase tracking-widest mb-2",
                    pkg.highlight ? "text-orange" : "text-gray-muted"
                  )}
                >
                  {pkg.name}
                </p>
                <p className="text-body text-gray-muted leading-snug">{pkg.tagline}</p>
              </div>

              <div className="mb-8">
                {pkg.price > 0 ? (
                  <>
                    <span
                      className={cn(
                        "font-display text-display-lg font-bold",
                        pkg.highlight ? "text-cream" : "text-black"
                      )}
                    >
                      R{pkg.price.toLocaleString("en-ZA")}
                    </span>
                    <span className="font-mono text-mono-label text-gray-muted ml-2">
                      /month
                    </span>
                  </>
                ) : (
                  <span
                    className={cn(
                      "font-display text-heading font-bold",
                      pkg.highlight ? "text-cream" : "text-black"
                    )}
                  >
                    Custom
                  </span>
                )}
              </div>

              <ul className="flex flex-col gap-3 mb-10 flex-1">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="text-orange mt-0.5 shrink-0" aria-hidden>
                      ▪
                    </span>
                    <span className="text-small text-gray-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              <PackageCTA pkg={pkg} highlight={pkg.highlight} />
            </article>
          ))}
        </StaggerChildren>

        <p className="font-mono text-mono-label text-gray-muted mt-6 text-center">
          Not sure what fits?{" "}
          Start with the free content strategy demo. We&apos;ll map it out for your business.
        </p>
      </div>
    </section>
  )
}
