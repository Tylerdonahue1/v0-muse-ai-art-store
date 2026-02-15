"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const ROTATING_QUOTES = [
  { text: "The happiness of your life depends upon the quality of your thoughts.", author: "Marcus Aurelius" },
  { text: "What you seek is seeking you.", author: "Rumi" },
  { text: "Stay hungry. Stay foolish.", author: "Steve Jobs" },
  { text: "Nature does not hurry, yet everything is accomplished.", author: "Lao Tzu" },
  { text: "It always seems impossible until it is done.", author: "Nelson Mandela" },
]

export function InspireHero() {
  const [quoteIdx, setQuoteIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIdx((prev) => (prev + 1) % ROTATING_QUOTES.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/inspire/hero-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#1a1714]/80" />

      {/* Background rotating quote (subtle, decorative) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
        <AnimatePresence mode="wait">
          <motion.p
            key={quoteIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.06 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="font-serif text-[6vw] leading-tight text-[#f5f0e8] text-center max-w-5xl px-8"
          >
            {`"${ROTATING_QUOTES[quoteIdx].text}"`}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-[#c4a882]">
            Motivational Wall Art by Muse
          </p>
          <h1 className="font-serif text-4xl leading-[1.15] tracking-tight text-[#f5f0e8] md:text-6xl lg:text-7xl text-balance">
            Words That Move You.{" "}
            <span className="text-[#c4a882]">Art That Inspires.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#b5ada3] md:text-lg">
            Turn timeless wisdom into museum-quality wall art. Choose from
            hundreds of curated quotes or bring your own words to life.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-[#f5f0e8] px-8 text-[#1a1714] hover:bg-[#f5f0e8]/90"
            >
              <Link href="/inspire/browse">
                Browse Quotes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-[#c4a882]/40 bg-transparent px-8 text-[#f5f0e8] hover:border-[#c4a882] hover:bg-[#c4a882]/10"
            >
              <Link href="/inspire/browse?write=true">Create Your Own</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
