"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function InspireFooterCta() {
  return (
    <section className="relative py-24 px-6 bg-[#1a1714]">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-serif text-2xl leading-relaxed text-[#b5ada3] md:text-3xl text-balance">
            {`"The only impossible journey is the one you never begin."`}
          </p>
          <p className="mt-4 text-sm text-[#c4a882]">-- Tony Robbins</p>
          <Button
            asChild
            size="lg"
            className="mt-10 rounded-full bg-[#f5f0e8] px-8 text-[#1a1714] hover:bg-[#f5f0e8]/90"
          >
            <Link href="/inspire/browse">
              Start Creating
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
