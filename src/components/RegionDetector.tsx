"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useRegion } from "@/context/RegionContext"
import type { Region } from "@/context/RegionContext"

function detectRegionFromTimezone(): Region {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
  return tz.startsWith("Africa/") ? "za" : "international"
}

export function RegionDetector() {
  const router = useRouter()
  const serverRegion = useRegion()

  useEffect(() => {
    const clientRegion = detectRegionFromTimezone()
    if (clientRegion !== serverRegion) {
      document.cookie = `region=${clientRegion}; max-age=${60 * 60 * 24 * 7}; path=/; samesite=lax${location.protocol === "https:" ? "; secure" : ""}`
      router.refresh()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}
