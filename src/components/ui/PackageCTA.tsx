"use client"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { PaystackModal } from "@/components/ui/PaystackModal"
import { useDemoModal } from "@/context/DemoModalContext"
import type { Package } from "@/types/content"

interface Props {
  pkg: Package
  highlight?: boolean
}

export function PackageCTA({ pkg, highlight }: Props) {
  const [showModal, setShowModal] = useState(false)
  const { open } = useDemoModal()

  function handleClick() {
    if (pkg.cta.action === "cal") {
      open()
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
