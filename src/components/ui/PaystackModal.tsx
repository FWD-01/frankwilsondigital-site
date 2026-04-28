"use client"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { initiatePaystackPayment } from "@/lib/paystack"
import { Button } from "@/components/ui/Button"
import type { Package } from "@/types/content"

interface Props {
  pkg: Package
  onClose: () => void
}

type State = "idle" | "error" | "success"

export function PaystackModal({ pkg, onClose }: Props) {
  const [email, setEmail] = useState("")
  const [state, setState] = useState<State>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [onClose])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!("PaystackPop" in window)) {
      setErrorMsg("Payment system not loaded — please refresh and try again.")
      setState("error")
      return
    }
    try {
      initiatePaystackPayment(pkg, email, () => setState("success"))
    } catch {
      setErrorMsg("Something went wrong. Please try again.")
      setState("error")
    }
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ps-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="relative bg-cream w-full max-w-sm p-8 border border-gray-line">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 font-mono text-mono-label text-gray-muted hover:text-black leading-none"
        >
          ✕
        </button>

        {state === "success" ? (
          <div className="text-center py-4">
            <div className="w-2 h-2 bg-orange mx-auto mb-6" aria-hidden />
            <h3
              id="ps-modal-title"
              className="font-display text-heading font-bold text-black mb-3"
            >
              You&apos;re in.
            </h3>
            <p className="text-body text-gray-muted mb-6">
              Welcome to {pkg.name}. Check your inbox for next steps.
            </p>
            <Button variant="outline" size="md" onClick={onClose}>
              Done
            </Button>
          </div>
        ) : (
          <>
            <h3
              id="ps-modal-title"
              className="font-display text-heading font-bold text-black mb-1"
            >
              {pkg.name}
            </h3>
            <p className="font-mono text-mono-label text-orange mb-6">
              R{pkg.price.toLocaleString("en-ZA")}/month
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="ps-email"
                  className="font-mono text-mono-label text-black uppercase tracking-widest"
                >
                  Your email
                </label>
                <input
                  id="ps-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="border border-gray-line bg-white px-4 py-3 text-body text-black placeholder:text-gray-muted/40 focus:outline-none focus:border-orange"
                />
              </div>

              {state === "error" && (
                <p role="alert" className="font-mono text-mono-label text-red-600">
                  {errorMsg}
                </p>
              )}

              <Button variant="primary" size="md" type="submit" className="w-full">
                Proceed to payment
              </Button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  )
}
