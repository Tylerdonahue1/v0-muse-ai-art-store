import { InspireHero } from "@/components/inspire/inspire-hero"
import { FeaturedQuotes } from "@/components/inspire/featured-quotes"
import { CategoriesGrid } from "@/components/inspire/categories-grid"
import { InspireHowItWorks } from "@/components/inspire/inspire-how-it-works"
import { TestimonialsStrip } from "@/components/inspire/testimonials-strip"
import { InspireFooterCta } from "@/components/inspire/inspire-footer-cta"

export const metadata = {
  title: "Inspire -- Motivational Wall Art | Muse",
  description:
    "Turn timeless wisdom from philosophers, poets, and leaders into museum-quality wall art. Browse curated quotes or create your own.",
}

export default function InspirePage() {
  return (
    <>
      <InspireHero />
      <FeaturedQuotes />
      <CategoriesGrid />
      <InspireHowItWorks />
      <TestimonialsStrip />
      <InspireFooterCta />
    </>
  )
}
