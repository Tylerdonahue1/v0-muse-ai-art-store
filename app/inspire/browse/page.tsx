import { Suspense } from "react"
import { QuoteBrowser } from "@/components/inspire/quote-browser"

export const metadata = {
  title: "Browse Quotes -- Inspire | Muse",
  description:
    "Explore our curated collection of motivational quotes from philosophers, poets, and leaders. Find the perfect words for your wall art.",
}

export default function BrowsePage() {
  return (
    <Suspense>
      <QuoteBrowser />
    </Suspense>
  )
}
