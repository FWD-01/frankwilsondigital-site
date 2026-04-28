"use client"

import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/hooks/useReducedMotion"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "left" | "right" | "none"
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !ref.current) return

    const el = ref.current
    let cancelled = false

    const translateMap = {
      up: { y: 32, x: 0 },
      left: { y: 0, x: -32 },
      right: { y: 0, x: 32 },
      none: { y: 0, x: 0 },
    }
    const { x, y } = translateMap[direction]

    // Set initial state
    el.style.opacity = "0"
    el.style.transform = `translate(${x}px, ${y}px)`
    el.style.transition = "none"

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        if (cancelled) return
        gsap.registerPlugin(ScrollTrigger)

        gsap.fromTo(
          el,
          { opacity: 0, x, y },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.7,
            delay,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          }
        )
      }
    )

    return () => {
      cancelled = true
    }
  }, [reduced, delay, direction])

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  )
}
