"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import Cal, { getCalApi } from "@calcom/embed-react"
import { cn } from "@/lib/utils"
import { useDemoModal } from "@/context/DemoModalContext"
import { DemoQualifyForm } from "@/components/forms/DemoQualifyForm"

function CalStep() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "30min" })
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" })
    })()
  }, [])

  return (
    <Cal
      namespace="30min"
      calLink="roget-van-heerden-ec54lv/30min"
      style={{ width: "100%", height: "600px", overflow: "scroll" }}
      config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}
    />
  )
}

export function DemoModal() {
  const { isOpen, close } = useDemoModal()
  const [visible, setVisible] = useState(false)
  const [step, setStep] = useState<1 | 2>(1)

  useEffect(() => {
    if (isOpen) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true))
      })
      return () => cancelAnimationFrame(raf)
    } else {
      const raf = requestAnimationFrame(() => setVisible(false))
      const t = setTimeout(() => setStep(1), 250)
      return () => {
        cancelAnimationFrame(raf)
        clearTimeout(t)
      }
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

  if (!isOpen && !visible) return null

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
          "relative w-full bg-cream border border-gray-line",
          step === 1 ? "sm:max-w-2xl" : "sm:max-w-4xl",
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
            Free Demo — Step {step} of 2
          </p>

          {step === 1 ? (
            <>
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

              <DemoQualifyForm onComplete={() => setStep(2)} />
            </>
          ) : (
            <>
              <h2
                id="demo-modal-title"
                className="font-display text-heading font-bold text-black mb-2 leading-snug"
              >
                Pick a time that works for you
              </h2>

              <p className="font-sans text-body text-gray-muted mb-8 leading-relaxed">
                Choose a slot below and we&apos;ll have everything ready before your demo.
              </p>

              <CalStep />
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}
