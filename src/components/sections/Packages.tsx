import { packages } from "@/content/packages"
import { Badge } from "@/components/ui/Badge"
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
            <Badge label="Services & pricing" number="03" className="mb-6" />
            <h2 className="text-display-lg font-display font-bold text-black max-w-xl">
              Choose your system.{" "}
              <span className="text-orange">Cancel anytime.</span>
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
          Not sure which fits? Start with the free demo — we&apos;ll figure it out
          together.
        </p>
      </div>
    </section>
  )
}
