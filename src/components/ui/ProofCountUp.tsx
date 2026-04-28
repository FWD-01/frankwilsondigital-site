"use client"

import { useRef, useEffect, useState } from "react"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import type { ProofItem } from "@/types/content"

function parseNumeric(raw: string): { num: number; suffix: string } | null {
  const match = raw.match(/^(\d+)(\D*)$/)
  if (!match) return null
  return { num: parseInt(match[1], 10), suffix: match[2] }
}

function CountUpValue({ item }: { item: ProofItem }) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  const parsed = parseNumeric(item.value)
  const [display, setDisplay] = useState(parsed ? `0${parsed.suffix}` : item.value)

  useEffect(() => {
    if (reduced || !ref.current || !parsed) return
    const el = ref.current
    let cancelled = false

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        if (cancelled) return
        gsap.registerPlugin(ScrollTrigger)

        const counter = { value: 0 }
        gsap.to(counter, {
          value: parsed.num,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
          onUpdate() {
            setDisplay(`${Math.round(counter.value)}${parsed.suffix}`)
          },
          onComplete() {
            setDisplay(item.value)
          },
        })
      }
    )

    return () => {
      cancelled = true
    }
  }, [reduced]) // eslint-disable-line react-hooks/exhaustive-deps

  return <span ref={ref}>{display}</span>
}

export function ProofCountUp({ items }: { items: ProofItem[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-1">
          <span className="font-display text-display-lg text-orange font-bold">
            <CountUpValue item={item} />
          </span>
          <span className="font-sans text-body text-cream font-medium">
            {item.label}
          </span>
          {item.sublabel && (
            <span className="font-mono text-mono-label text-gray-muted">
              {item.sublabel}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
