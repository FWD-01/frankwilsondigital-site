import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { PixelDivider } from "@/components/ui/PixelDivider"
import { HandwrittenAccent } from "@/components/ui/HandwrittenAccent"

/**
 * Design system reference — accessible only in development.
 * Use this to verify all primitives before Phase 3.
 * Route: /design
 */
export default function DesignPage() {
  return (
    <main className="min-h-dvh bg-cream px-8 py-16 space-y-20">

      {/* ─── Identity ──────────────────────────────────────────── */}
      <section>
        <h2 className="font-mono text-mono-label uppercase tracking-widest text-gray-muted mb-8">
          Identity
        </h2>
        <p className="font-display text-display-xl text-black mb-2">
          Frank Wilson<span className="text-orange">.</span>
        </p>
        <p className="font-sans text-body text-gray-muted">
          Playfair Display · DM Sans · JetBrains Mono · Caveat
        </p>
      </section>

      <PixelDivider />

      {/* ─── Colors ────────────────────────────────────────────── */}
      <section>
        <h2 className="font-mono text-mono-label uppercase tracking-widest text-gray-muted mb-8">
          Colors
        </h2>
        <div className="flex flex-wrap gap-4">
          {[
            { name: "cream", bg: "bg-cream", border: true },
            { name: "cream-dark", bg: "bg-cream-dark", border: true },
            { name: "black", bg: "bg-black" },
            { name: "black-soft", bg: "bg-black-soft" },
            { name: "orange", bg: "bg-orange" },
            { name: "orange-light", bg: "bg-orange-light" },
            { name: "orange-muted", bg: "bg-orange-muted" },
            { name: "gray-muted", bg: "bg-gray-muted" },
            { name: "gray-line", bg: "bg-gray-line", border: true },
          ].map((color) => (
            <div key={color.name} className="flex flex-col items-center gap-2">
              <div
                className={`w-16 h-16 ${color.bg} ${color.border ? "border border-gray-line" : ""}`}
              />
              <span className="font-mono text-mono-label text-gray-muted">
                {color.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      <PixelDivider accent="center" />

      {/* ─── Typography ────────────────────────────────────────── */}
      <section>
        <h2 className="font-mono text-mono-label uppercase tracking-widest text-gray-muted mb-8">
          Typography
        </h2>
        <div className="space-y-6">
          <div>
            <span className="font-mono text-mono-label text-gray-muted block mb-1">display-xl · Playfair Display</span>
            <p className="font-display text-display-xl font-bold text-black leading-none">
              Premium Presence.
            </p>
          </div>
          <div>
            <span className="font-mono text-mono-label text-gray-muted block mb-1">display-lg · Playfair Display</span>
            <p className="font-display text-display-lg font-bold text-black">
              Your system, running.
            </p>
          </div>
          <div>
            <span className="font-mono text-mono-label text-gray-muted block mb-1">heading · Playfair Display</span>
            <p className="font-display text-heading font-bold text-black">
              Section heading style
            </p>
          </div>
          <div>
            <span className="font-mono text-mono-label text-gray-muted block mb-1">body-lg · DM Sans</span>
            <p className="font-sans text-body-lg text-gray-muted">
              A modern content system for founders, professionals, and growing businesses who can't afford to look inconsistent.
            </p>
          </div>
          <div>
            <span className="font-mono text-mono-label text-gray-muted block mb-1">body · DM Sans</span>
            <p className="font-sans text-body text-gray-muted">
              Every piece of content is shaped by me. Your voice, your goals, your audience.
            </p>
          </div>
          <div>
            <span className="font-mono text-mono-label text-gray-muted block mb-1">mono-label · JetBrains Mono</span>
            <p className="font-mono text-mono-label uppercase tracking-widest text-gray-muted">
              Section label · 01 About · Services
            </p>
          </div>
          <div>
            <span className="font-mono text-mono-label text-gray-muted block mb-1">handwritten · Caveat</span>
            <HandwrittenAccent text="for free — no pressure" />
          </div>
        </div>
      </section>

      <PixelDivider />

      {/* ─── Buttons ───────────────────────────────────────────── */}
      <section>
        <h2 className="font-mono text-mono-label uppercase tracking-widest text-gray-muted mb-8">
          Buttons
        </h2>
        <div className="flex flex-wrap gap-6 items-center mb-8">
          <Button variant="primary" size="lg">Primary large</Button>
          <Button variant="primary" size="md">Primary medium</Button>
          <Button variant="primary" size="sm">Primary small</Button>
        </div>
        <div className="flex flex-wrap gap-6 items-center mb-8">
          <Button variant="outline" size="lg">Outline large</Button>
          <Button variant="outline" size="md">Outline medium</Button>
          <Button variant="outline" size="sm">Outline small</Button>
        </div>
        <div className="flex flex-wrap gap-6 items-center mb-8 bg-black p-6">
          <Button variant="secondary" size="lg">Secondary large</Button>
          <Button variant="secondary" size="md">Secondary medium</Button>
          <Button variant="primary" size="md">Primary on dark</Button>
        </div>
        <div className="flex flex-wrap gap-6 items-center">
          <Button variant="ghost" size="md">Ghost link style</Button>
          <Button variant="primary" disabled size="md">Disabled state</Button>
        </div>
      </section>

      <PixelDivider accent="center" />

      {/* ─── Badges ────────────────────────────────────────────── */}
      <section>
        <h2 className="font-mono text-mono-label uppercase tracking-widest text-gray-muted mb-8">
          Badges / Section labels
        </h2>
        <div className="flex flex-wrap gap-6 items-center">
          <Badge label="About" number="01" />
          <Badge label="Services & pricing" number="02" />
          <Badge label="No commitment" number="—" />
          <Badge label="The process" />
        </div>
      </section>

      <PixelDivider />

      {/* ─── PixelDivider variants ─────────────────────────────── */}
      <section>
        <h2 className="font-mono text-mono-label uppercase tracking-widest text-gray-muted mb-8">
          PixelDivider
        </h2>
        <div className="space-y-6 max-w-xl">
          <div>
            <span className="font-mono text-mono-label text-gray-muted block mb-2">accent=start (default)</span>
            <PixelDivider />
          </div>
          <div>
            <span className="font-mono text-mono-label text-gray-muted block mb-2">accent=center</span>
            <PixelDivider accent="center" />
          </div>
          <div>
            <span className="font-mono text-mono-label text-gray-muted block mb-2">accent=end</span>
            <PixelDivider accent="end" />
          </div>
        </div>
      </section>

      <PixelDivider />

      {/* ─── Section alternation preview ───────────────────────── */}
      <section>
        <h2 className="font-mono text-mono-label uppercase tracking-widest text-gray-muted mb-8">
          Section color alternation
        </h2>
        <div className="border border-gray-line overflow-hidden">
          {[
            { label: "Hero", bg: "bg-cream", text: "text-black" },
            { label: "ProofStrip", bg: "bg-black-soft", text: "text-cream" },
            { label: "About", bg: "bg-cream", text: "text-black" },
            { label: "Packages", bg: "bg-cream-dark", text: "text-black" },
            { label: "DemoCTA", bg: "bg-orange", text: "text-black" },
            { label: "WhyMe", bg: "bg-black", text: "text-cream" },
            { label: "WhySystem", bg: "bg-cream", text: "text-black" },
            { label: "UseCases", bg: "bg-cream-dark", text: "text-black" },
            { label: "HowWeWork", bg: "bg-black", text: "text-cream" },
            { label: "FinalCTA", bg: "bg-cream", text: "text-black" },
            { label: "Footer", bg: "bg-black", text: "text-cream" },
          ].map((s) => (
            <div
              key={s.label}
              className={`${s.bg} ${s.text} px-6 py-4 flex items-center justify-between border-b border-gray-line/20`}
            >
              <span className="font-mono text-mono-label">{s.label}</span>
              <span className="font-mono text-mono-label opacity-50">{s.bg}</span>
            </div>
          ))}
        </div>
      </section>

      <PixelDivider />

      {/* ─── Spacing scale ─────────────────────────────────────── */}
      <section>
        <h2 className="font-mono text-mono-label uppercase tracking-widest text-gray-muted mb-8">
          Spacing tokens
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-section h-4 bg-orange opacity-40" style={{ width: "clamp(5rem, 10vw, 9rem)" }} />
            <span className="font-mono text-mono-label text-gray-muted">section · clamp(5rem, 10vw, 9rem)</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-4 bg-orange opacity-25" style={{ width: "clamp(3rem, 6vw, 5rem)" }} />
            <span className="font-mono text-mono-label text-gray-muted">section-sm · clamp(3rem, 6vw, 5rem)</span>
          </div>
        </div>
      </section>

      <PixelDivider accent="center" />

      {/* ─── Grain texture note ────────────────────────────────── */}
      <section>
        <h2 className="font-mono text-mono-label uppercase tracking-widest text-gray-muted mb-4">
          Grain texture
        </h2>
        <p className="font-sans text-body text-gray-muted">
          Applied globally via <code className="font-mono text-small bg-cream-dark px-1">body::after</code> at{" "}
          <code className="font-mono text-small bg-cream-dark px-1">opacity: 0.025</code>. Visible as a subtle noise layer across the entire page.
          If you can see a fine texture over this text block, it&apos;s working.
        </p>
      </section>

    </main>
  )
}
