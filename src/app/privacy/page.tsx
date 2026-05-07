import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy — Frank Wilson Digital",
  description:
    "How Frank Wilson Digital collects, uses, and protects your personal information under POPIA and GDPR.",
}

export default function PrivacyPage() {
  return (
    <main className="min-h-dvh bg-cream px-6 py-20">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="font-mono text-mono-label uppercase tracking-widest text-gray-muted hover:text-orange mb-12 inline-block transition-colors duration-200"
        >
          ← Back to home
        </Link>

        <div className="mb-12">
          <p className="font-mono text-mono-label uppercase tracking-widest text-orange mb-4">
            Legal
          </p>
          <h1 className="font-display text-display-lg font-bold text-black mb-4">
            Privacy Policy
          </h1>
          <p className="font-mono text-mono-label text-gray-muted">
            Last updated: May 2026
          </p>
        </div>

        <div className="space-y-10 font-sans text-body text-gray-muted leading-relaxed">
          <Section title="Who we are">
            <p>
              Frank Wilson Digital is a digital content and social media management service operated
              by Roget van Heerden, based in South Africa. You can contact us at{" "}
              <a
                href="mailto:hello@frankwilsondigital.co.za"
                className="text-orange underline"
              >
                hello@frankwilsondigital.co.za
              </a>
              .
            </p>
          </Section>

          <Section title="What information we collect">
            <p>When you submit the demo request form on this website, we collect:</p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li>Full name and business name</li>
              <li>Email address and WhatsApp number</li>
              <li>Industry, website or Instagram handle</li>
              <li>Information about your current content activity and goals</li>
            </ul>
          </Section>

          <Section title="Why we collect it">
            <p>
              We collect this information on the basis of your consent (by ticking the checkbox on
              the form) and our legitimate interest in preparing a personalised Content Strategy Demo
              for your business before we meet.
            </p>
          </Section>

          <Section title="How we use your information">
            <ul className="list-disc list-inside space-y-1">
              <li>To contact you about your demo booking</li>
              <li>To prepare your strategy session with context specific to your business</li>
              <li>To record your enquiry in our internal CRM (Google Sheets)</li>
              <li>To send booking confirmation via Cal.com</li>
            </ul>
            <p className="mt-3">
              We do not use your information for advertising, and we will never sell it to third
              parties.
            </p>
          </Section>

          <Section title="Who we share it with">
            <p>Your data is processed by the following third-party services:</p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li>
                <strong className="text-black">Resend</strong> — email delivery (servers in the EU
                and US; Standard Contractual Clauses apply)
              </li>
              <li>
                <strong className="text-black">Google Sheets</strong> — enquiry logging (Google LLC,
                US)
              </li>
              <li>
                <strong className="text-black">Cal.com</strong> — booking platform; your name and
                email are passed to pre-fill the booking form
              </li>
              <li>
                <strong className="text-black">Cloudflare Turnstile</strong> — bot protection; your
                form interaction is processed by Cloudflare to verify you are human
              </li>
            </ul>
          </Section>

          <Section title="Your rights">
            <p>
              Under the Protection of Personal Information Act (POPIA) in South Africa, and the
              General Data Protection Regulation (GDPR) in the EU and UK, you have the right to:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Withdraw your consent at any time</li>
              <li>Lodge a complaint with the Information Regulator (South Africa) or your local data protection authority (EU/UK)</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email{" "}
              <a
                href="mailto:hello@frankwilsondigital.co.za"
                className="text-orange underline"
              >
                hello@frankwilsondigital.co.za
              </a>
              .
            </p>
          </Section>

          <Section title="Data retention">
            <p>
              Demo enquiry data is kept for up to 24 months from the date of submission, after which
              it is deleted.
            </p>
          </Section>

          <Section title="Security">
            <p>
              All data is transmitted over HTTPS. We use Cloudflare Turnstile to prevent automated
              submissions. Access to your data is limited to the business owner.
            </p>
          </Section>

          <Section title="Cookies">
            <p>
              This website does not set any tracking or advertising cookies. Cal.com may set its own
              cookies when you use the booking widget — please refer to{" "}
              <a
                href="https://cal.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange underline"
              >
                Cal.com&apos;s Privacy Policy
              </a>{" "}
              for details.
            </p>
          </Section>
        </div>
      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-heading font-bold text-black mb-4">{title}</h2>
      {children}
    </section>
  )
}
