"use client"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface Props {
  calLink: string
  className?: string
}

export function CalEmbed({ calLink, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!window.Cal) {
      el.innerHTML = `<iframe src="https://cal.com/${calLink}" width="100%" height="700" frameborder="0" loading="lazy" title="Book a call" class="w-full"></iframe>`
      return
    }
    window.Cal("inline", { elementOrSelector: el, calLink })
  }, [calLink])

  return (
    <div
      ref={ref}
      className={cn("w-full overflow-hidden", className)}
      style={{ minHeight: 700 }}
    />
  )
}
