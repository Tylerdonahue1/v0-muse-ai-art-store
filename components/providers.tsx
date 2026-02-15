"use client"

import { StyleProfileProvider, GenerationProvider, CartProvider } from "@/lib/contexts"
import { InspireProvider } from "@/lib/inspire-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StyleProfileProvider>
      <GenerationProvider>
        <CartProvider>
          <InspireProvider>{children}</InspireProvider>
        </CartProvider>
      </GenerationProvider>
    </StyleProfileProvider>
  )
}
