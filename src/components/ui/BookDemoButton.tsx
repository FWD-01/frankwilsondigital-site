"use client"

import { useDemoModal } from "@/context/DemoModalContext"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

interface BookDemoButtonProps {
  size?: "sm" | "md" | "lg"
  variant?: "primary" | "secondary" | "outline" | "ghost"
  className?: string
  children?: React.ReactNode
}

export function BookDemoButton({
  size = "lg",
  variant = "primary",
  className,
  children = "Book your free demo",
}: BookDemoButtonProps) {
  const { open } = useDemoModal()
  return (
    <Button
      variant={variant}
      size={size}
      className={cn(className)}
      onClick={open}
    >
      {children}
    </Button>
  )
}
