"use client"

import { useRef, useEffect } from "react"
import { useReducedMotion } from "@/hooks/useReducedMotion"

const WORDS = ["Your", "premium", "digital", "presence."]

export function HeroHeadline() {
  const ref = useRef<HTMLHeadingElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !ref.current) return
    const el = ref.current
    let cancelled = false

    const words = Array.from(el.querySelectorAll<HTMLElement>("[data-word]"))
    words.forEach((w) => {
      w.style.opacity = "0"
      w.style.transform = "translateY(20px)"
    })

    import("gsap").then(({ default: gsap }) => {
      if (cancelled) return
      gsap.to(words, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.07,
        ease: "power2.out",
        delay: 0.15,
      })
    })

    return () => {
      cancelled = true
    }
  }, [reduced])

  return (
    <h1
      ref={ref}
      className="text-display-xl font-display font-bold text-black mb-6"
    >
      {WORDS.map((word, i) => (
        <span
          key={i}
          data-word=""
          className="inline-block"
          style={{ marginRight: "0.27em" }}
        >
          {word}
        </span>
      ))}
      {"  "}
      <span data-word="" className="inline-block text-orange">
        Handled.
      </span>
    </h1>
  )
}
