type CalFunction = ((action: string, options?: Record<string, unknown>) => void) & {
  ns: Record<string, CalFunction>
  loaded?: boolean
  q?: unknown[]
}

declare global {
  interface Window {
    Cal?: CalFunction
  }
}

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK ?? ""

export function openCalPopup(calLink = CAL_LINK) {
  if (typeof window === "undefined") return
  if (window.Cal) {
    window.Cal("modal", { calLink })
    return
  }
  window.open(`https://cal.com/${calLink}`, "_blank", "noopener,noreferrer")
}
