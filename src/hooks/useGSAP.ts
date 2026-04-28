"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "@/hooks/useReducedMotion"

type GSAPCallback = (gsap: typeof import("gsap").default) => gsap.core.Timeline | void

export function useGSAP(callback: GSAPCallback, deps: React.DependencyList = []) {
  const reduced = useReducedMotion()
  const cleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (reduced) return

    let cancelled = false

    import("gsap").then(({ default: gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        if (cancelled) return
        gsap.registerPlugin(ScrollTrigger)
        const result = callback(gsap)
        if (result) {
          cleanupRef.current = () => result.kill()
        }
      })
    })

    return () => {
      cancelled = true
      cleanupRef.current?.()
      cleanupRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, ...deps])
}
