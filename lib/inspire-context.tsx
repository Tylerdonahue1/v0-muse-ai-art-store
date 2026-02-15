"use client"

import React, { createContext, useContext, useState, useCallback } from "react"
import type {
  InspireQuote,
  InspireDesign,
  InspireTypography,
  InspireBackground,
  InspirePalette,
} from "@/lib/types"

interface InspireContextType {
  selectedQuote: InspireQuote | null
  setSelectedQuote: (quote: InspireQuote | null) => void
  design: InspireDesign | null
  setDesign: (design: InspireDesign | null) => void
  updateDesign: (updates: Partial<InspireDesign>) => void
  initDesign: (quote: InspireQuote) => void
  clearInspire: () => void
}

const InspireContext = createContext<InspireContextType>({
  selectedQuote: null,
  setSelectedQuote: () => {},
  design: null,
  setDesign: () => {},
  updateDesign: () => {},
  initDesign: () => {},
  clearInspire: () => {},
})

const DEFAULT_TYPOGRAPHY: InspireTypography = "classic-serif"
const DEFAULT_BACKGROUND: InspireBackground = "solid"
const DEFAULT_PALETTE: InspirePalette = "warm-neutrals"

export function InspireProvider({ children }: { children: React.ReactNode }) {
  const [selectedQuote, setSelectedQuote] = useState<InspireQuote | null>(null)
  const [design, setDesign] = useState<InspireDesign | null>(null)

  const initDesign = useCallback((quote: InspireQuote) => {
    setSelectedQuote(quote)
    setDesign({
      id: `design-${Date.now()}`,
      quote,
      typography: DEFAULT_TYPOGRAPHY,
      background: DEFAULT_BACKGROUND,
      palette: DEFAULT_PALETTE,
      showAuthor: true,
      alignment: "center",
      quoteSize: "standard",
    })
  }, [])

  const updateDesign = useCallback((updates: Partial<InspireDesign>) => {
    setDesign((prev) => (prev ? { ...prev, ...updates } : null))
  }, [])

  const clearInspire = useCallback(() => {
    setSelectedQuote(null)
    setDesign(null)
  }, [])

  return (
    <InspireContext.Provider
      value={{
        selectedQuote,
        setSelectedQuote,
        design,
        setDesign,
        updateDesign,
        initDesign,
        clearInspire,
      }}
    >
      {children}
    </InspireContext.Provider>
  )
}

export function useInspire() {
  return useContext(InspireContext)
}
