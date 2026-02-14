import { HeroSection } from "@/components/landing/hero-section"
import { HowItWorks } from "@/components/landing/how-it-works"
import { SampleGallery } from "@/components/landing/sample-gallery"
import { FooterSection } from "@/components/landing/footer-section"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <HowItWorks />
      <SampleGallery />
      <FooterSection />
    </div>
  )
}
