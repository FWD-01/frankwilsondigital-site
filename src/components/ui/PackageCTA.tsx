"use client"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { PaystackModal } from "@/components/ui/PaystackModal"
import { openCalPopup } from "@/lib/calendly"
import type { Package } from "@/types/content"

interface Props {
  pkg: Package
  highlight?: boolean
}

export function PackageCTA({ pkg, highlight }: Props) {
  const [showModal, setShowModal] = useState(false)

  function handleClick() {
    if (pkg.cta.action === "cal") {
      openCalPopup()
      return
    }
    setShowModal(true)
  }

  return (
    <>
      <Button
        variant={highlight ? "primary" : "outline"}
        size="md"
        className="w-full"
        onClick={handleClick}
      >
        {pkg.cta.label}
      </Button>

      {showModal && (
        <PaystackModal pkg={pkg} onClose={() => setShowModal(false)} />
      )}
    </>
  )
}
