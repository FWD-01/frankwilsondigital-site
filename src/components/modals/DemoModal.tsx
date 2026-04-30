"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"
import { useDemoModal } from "@/context/DemoModalContext"
import { DemoQualifyForm } from "@/components/forms/DemoQualifyForm"

export function DemoModal() {
  const { isOpen, close } = useDemoModal()
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  // Two-phase mount: render first, then apply visible classes to trigger CSS transition
  useEffect(() => {
    if (isOpen) {
      setMounted(true)
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true))
      })
      return () => cancelAnimationFrame(raf)
    } else {
      setVisible(false)
      const t = setTimeout(() => setMounted(false), 250)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  // Body scroll lock
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // ESC to close
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [close])

  if (!mounted) return null

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-modal-title"
      className={cn(
        "fixed inset-0 z-50 flex items-end sm:items-center justify-center transition-opacity duration-[250ms]",
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onMouseDown={close}
        aria-hidden
      />

      {/* Panel */}
      <div
        className={cn(
          "relative w-full sm:max-w-2xl bg-cream border border-gray-line",
          "max-h-[92dvh] sm:max-h-[90dvh] overflow-y-auto",
          "transition-transform duration-[250ms]",
          visible ? "translate-y-0" : "translate-y-6 sm:translate-y-4"
        )}
      >
        {/* Pixel corner accents */}
        <div className="absolute top-0 left-0 w-2 h-2 bg-orange" aria-hidden />
        <div className="absolute top-0 right-0 w-2 h-2 bg-orange" aria-hidden />

        {/* Close button */}
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 font-mono text-mono-label text-gray-muted hover:text-black leading-none z-10 p-1"
        >
          ✕
        </button>

        <div className="px-8 py-10 md:px-12 md:py-12">
          <p className="font-mono text-mono-label uppercase tracking-widest text-orange mb-4">
            Free Demo — Step 1 of 2
          </p>

          <h2
            id="demo-modal-title"
            className="font-display text-heading font-bold text-black mb-2 leading-snug"
          >
            Let&apos;s prepare your content strategy
          </h2>

          <p className="font-sans text-body text-gray-muted mb-8 leading-relaxed">
            Tell us a bit about your business so we can review your current
            presence before the demo.
          </p>

          <DemoQualifyForm />
        </div>
      </div>
    </div>,
    document.body
  )
}
