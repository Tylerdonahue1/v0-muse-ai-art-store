"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Search, PenLine, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { INSPIRE_QUOTES, INSPIRE_CATEGORIES } from "@/lib/mock-data/inspire-quotes"
import { QuoteCard } from "./quote-card"
import { WriteOwnModal } from "./write-own-modal"
import type { InspireCategory } from "@/lib/types"

const PAGE_SIZE = 12

export function QuoteBrowser() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") as InspireCategory | null
  const shouldOpenWrite = searchParams.get("write") === "true"

  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState<InspireCategory | null>(initialCategory)
  const [showCount, setShowCount] = useState(PAGE_SIZE)
  const [writeModalOpen, setWriteModalOpen] = useState(shouldOpenWrite)

  useEffect(() => {
    if (initialCategory) setActiveCategory(initialCategory)
  }, [initialCategory])

  useEffect(() => {
    if (shouldOpenWrite) setWriteModalOpen(true)
  }, [shouldOpenWrite])

  const filtered = useMemo(() => {
    let results = INSPIRE_QUOTES
    if (activeCategory) {
      results = results.filter((q) => q.category === activeCategory)
    }
    if (search.trim()) {
      const s = search.toLowerCase()
      results = results.filter(
        (q) =>
          q.text.toLowerCase().includes(s) ||
          q.author.toLowerCase().includes(s) ||
          q.tags.some((t) => t.includes(s))
      )
    }
    return results
  }, [activeCategory, search])

  const visible = filtered.slice(0, showCount)
  const hasMore = showCount < filtered.length

  return (
    <div className="min-h-[calc(100vh-73px)]">
      {/* Header */}
      <div className="border-b border-border bg-[#1a1714] px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif text-3xl tracking-tight text-[#f5f0e8] md:text-5xl text-balance">
              Browse Quotes
            </h1>
            <p className="mt-3 text-base text-[#b5ada3]">
              Find the perfect words for your wall
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Search + Write Your Own */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setShowCount(PAGE_SIZE) }}
              placeholder="Search quotes, authors, themes..."
              className="w-full rounded-full border border-input bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button
            onClick={() => setWriteModalOpen(true)}
            variant="outline"
            className="rounded-full border-accent/40 text-foreground hover:border-accent hover:bg-accent/10"
          >
            <PenLine className="mr-2 h-4 w-4" />
            Write Your Own
          </Button>
        </div>

        {/* Category Pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge
            variant={activeCategory === null ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={() => { setActiveCategory(null); setShowCount(PAGE_SIZE) }}
          >
            All Quotes
          </Badge>
          {INSPIRE_CATEGORIES.map((cat) => (
            <Badge
              key={cat.id}
              variant={activeCategory === cat.id ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => { setActiveCategory(cat.id); setShowCount(PAGE_SIZE) }}
            >
              {cat.label}
            </Badge>
          ))}
        </div>

        {/* Results count */}
        <p className="mt-6 text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "quote" : "quotes"} found
        </p>

        {/* Grid */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((quote, idx) => (
            <QuoteCard key={quote.id} quote={quote} index={idx} />
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center py-20 text-center">
            <p className="font-serif text-xl text-foreground">No quotes found</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different search term or category, or write your own!
            </p>
            <Button
              onClick={() => setWriteModalOpen(true)}
              className="mt-6 rounded-full bg-foreground text-background hover:bg-foreground/90"
            >
              <PenLine className="mr-2 h-4 w-4" />
              Write Your Own
            </Button>
          </div>
        )}

        {/* Show More */}
        {hasMore && (
          <div className="mt-10 text-center">
            <Button
              variant="outline"
              onClick={() => setShowCount((c) => c + PAGE_SIZE)}
              className="rounded-full"
            >
              Show More Quotes
            </Button>
          </div>
        )}
      </div>

      {/* Write Your Own Modal */}
      <WriteOwnModal open={writeModalOpen} onClose={() => setWriteModalOpen(false)} />
    </div>
  )
}
