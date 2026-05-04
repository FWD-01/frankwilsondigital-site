"use client"

import Link from "next/link"
import { PixelDivider } from "@/components/ui/PixelDivider"
import { useDemoModal } from "@/context/DemoModalContext"

export default function Footer() {
  const year = new Date().getFullYear()
  const { open } = useDemoModal()

  return (
    <footer className="bg-black text-cream pt-16 pb-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <p className="font-display font-bold text-xl mb-3">
              Frank Wilson<span className="text-orange">.</span>
            </p>
            <p className="text-small text-gray-muted leading-relaxed max-w-xs">
              Premium digital presence for founders, professionals, and growing businesses.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-mono text-mono-label uppercase tracking-widest text-gray-muted mb-4">
              Navigate
            </p>
            <nav className="flex flex-col gap-3" aria-label="Footer navigation">
              {[
                { label: "Services", href: "#packages" },
                { label: "About", href: "#about" },
                { label: "How it works", href: "#how-we-work" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-small text-gray-muted hover:text-cream transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={open}
                className="text-small text-gray-muted hover:text-cream transition-colors duration-200 text-left"
              >
                Free demo
              </button>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono text-mono-label uppercase tracking-widest text-gray-muted mb-4">
              Contact
            </p>
            <a
              href="mailto:hello@frankwilsondigital.co.za"
              className="text-small text-gray-muted hover:text-cream transition-colors duration-200 block mb-2"
            >
              hello@frankwilsondigital.co.za
            </a>
            <p className="text-small text-gray-muted">Cape Town, South Africa</p>
          </div>
        </div>

        <PixelDivider className="mb-8 opacity-20" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-mono-label text-gray-muted">
            © {year} Frank Wilson Digital. All rights reserved.
          </p>
          <p className="font-mono text-mono-label text-gray-muted">
            Johannesburg · Cape Town · Remote
          </p>
        </div>
      </div>
    </footer>
  )
}
