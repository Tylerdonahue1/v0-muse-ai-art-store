"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { InspireQuote } from "@/lib/types"
import { INSPIRE_CATEGORIES } from "@/lib/mock-data/inspire-quotes"

interface QuoteCardProps {
  quote: InspireQuote
  index: number
}

export function QuoteCard({ quote, index }: QuoteCardProps) {
  const category = INSPIRE_CATEGORIES.find((c) => c.id === quote.category)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
    >
      <Link
        href={`/inspire/design/${quote.id}`}
        className="group flex h-full flex-col justify-between rounded-lg border border-border bg-card p-6 transition-all hover:border-accent/40 hover:shadow-md"
      >
        <div>
          <p className="font-serif text-lg leading-relaxed text-foreground">
            {`"${quote.text}"`}
          </p>
        </div>
        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">{quote.author}</p>
            {quote.authorTitle && (
              <p className="text-xs text-muted-foreground">{quote.authorTitle}</p>
            )}
            {category && (
              <Badge variant="secondary" className="mt-2 text-[10px]">
                {category.label}
              </Badge>
            )}
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" />
        </div>
      </Link>
    </motion.div>
  )
}
