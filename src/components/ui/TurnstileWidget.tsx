"use client"

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    turnstile: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string
      remove: (widgetId: string) => void
      reset: (widgetId: string) => void
    }
    onTurnstileLoad?: () => void
  }
}

interface Props {
  siteKey: string
  onTokenChange: (token: string | null) => void
  theme?: "light" | "dark" | "auto"
}

export function TurnstileWidget({ siteKey, onTokenChange, theme = "light" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    function renderWidget() {
      if (!container) return
      widgetIdRef.current = window.turnstile.render(container, {
        sitekey: siteKey,
        theme,
        callback: (token: string) => onTokenChange(token),
        "expired-callback": () => onTokenChange(null),
        "error-callback": () => onTokenChange(null),
      })
    }

    if (window.turnstile) {
      renderWidget()
    } else {
      window.onTurnstileLoad = renderWidget

      if (!document.querySelector('script[src*="turnstile"]')) {
        const script = document.createElement("script")
        script.src =
          "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad&render=explicit"
        script.async = true
        script.defer = true
        document.head.appendChild(script)
      }
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [siteKey, theme, onTokenChange])

  return <div ref={containerRef} className="mt-1" />
}
