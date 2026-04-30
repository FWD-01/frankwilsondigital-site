"use client"

import { createContext, useContext, useState } from "react"

interface DemoModalContextValue {
  isOpen: boolean
  open: () => void
  close: () => void
}

const DemoModalContext = createContext<DemoModalContextValue | null>(null)

export function DemoModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DemoModalContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </DemoModalContext.Provider>
  )
}

export function useDemoModal() {
  const ctx = useContext(DemoModalContext)
  if (!ctx) throw new Error("useDemoModal must be inside DemoModalProvider")
  return ctx
}
