"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { INSPIRE_QUOTES } from "@/lib/mock-data/inspire-quotes"

const FEATURED_IDS = ["q-1", "q-9", "q-17", "q-26", "q-33", "q-41", "q-14", "q-36"]
const featured = INSPIRE_QUOTES.filter((q) => FEATURED_IDS.includes(q.id))

export function FeaturedQuotes() {
  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Curated Collection
          </p>
          <h2 className="font-serif text-3xl tracking-tight text-foreground md:text-4xl text-balance">
            Featured Quotes
          </h2>
        </motion.div>

        {/* Horizontal scroll */}
        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6">
          {featured.map((quote, idx) => (
            <motion.div
              key={quote.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="snap-start"
            >
              <Link
                href={`/inspire/design/${quote.id}`}
                className="group flex h-64 w-72 flex-col justify-between rounded-lg border border-border bg-card p-6 transition-all hover:border-accent/40 hover:shadow-md sm:w-80"
              >
                <div>
                  <p className="font-serif text-lg leading-relaxed text-foreground line-clamp-4">
                    {`"${quote.text}"`}
                  </p>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{quote.author}</p>
                    {quote.authorTitle && (
                      <p className="text-xs text-muted-foreground">{quote.authorTitle}</p>
                    )}
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
