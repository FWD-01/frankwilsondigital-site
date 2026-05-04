"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { useDemoModal } from "@/context/DemoModalContext"

const navLinks = [
  { label: "Services", href: "#packages" },
  { label: "About", href: "#about" },
  { label: "How it works", href: "#how-we-work" },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { open } = useDemoModal()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-cream/95 backdrop-blur-sm border-b border-gray-line"
          : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-display font-bold text-black text-lg tracking-tight"
        >
          Frank Wilson Digital<span className="text-orange">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-small text-gray-muted hover:text-black transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Button variant="primary" size="sm" onClick={open}>
            Free demo
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={cn(
              "w-5 h-px bg-black transition-transform duration-200",
              menuOpen && "rotate-45 translate-y-2"
            )}
          />
          <span
            className={cn("w-5 h-px bg-black transition-opacity duration-200", menuOpen && "opacity-0")}
          />
          <span
            className={cn(
              "w-5 h-px bg-black transition-transform duration-200",
              menuOpen && "-rotate-45 -translate-y-2"
            )}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-cream border-b border-gray-line px-6 pb-6 pt-2">
          <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-body text-black py-1"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button
              variant="primary"
              size="sm"
              className="mt-2 w-full"
              onClick={() => { setMenuOpen(false); open() }}
            >
              Free demo
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
