"use client"

import { createContext, useContext } from "react"

export type Region = "za" | "international"

const RegionContext = createContext<Region>("za")

export function RegionProvider({
  region,
  children,
}: {
  region: Region
  children: React.ReactNode
}) {
  return (
    <RegionContext.Provider value={region}>{children}</RegionContext.Provider>
  )
}

export function useRegion(): Region {
  return useContext(RegionContext)
}
