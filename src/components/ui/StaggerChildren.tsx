"use client"

import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/hooks/useReducedMotion"

interface StaggerChildrenProps {
  children: React.ReactNode
  className?: string
  stagger?: number
  delay?: number
  translateY?: number
}

export function StaggerChildren({
  children,
  className,
  stagger = 0.1,
  delay = 0,
  translateY = 28,
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !ref.current) return
    const el = ref.current
    let cancelled = false

    const items = Array.from(el.querySelectorAll<HTMLElement>(":scope > *"))
    items.forEach((item) => {
      item.style.opacity = "0"
      item.style.transform = `translateY(${translateY}px)`
    })

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        if (cancelled) return
        gsap.registerPlugin(ScrollTrigger)

        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            once: true,
          },
        })
      }
    )

    return () => {
      cancelled = true
    }
  }, [reduced, stagger, delay, translateY])

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  )
}
