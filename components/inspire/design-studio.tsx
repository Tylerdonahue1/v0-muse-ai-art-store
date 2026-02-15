"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, PenLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useInspire } from "@/lib/inspire-context"
import { INSPIRE_QUOTES } from "@/lib/mock-data/inspire-quotes"
import { DesignPreview } from "./design-preview"
import { DesignControls } from "./design-controls"
import type { InspireDesign } from "@/lib/types"

interface DesignStudioProps {
  quoteId: string
}

export function DesignStudio({ quoteId }: DesignStudioProps) {
  const router = useRouter()
  const { design, initDesign, updateDesign } = useInspire()
  const [editingText, setEditingText] = useState(false)
  const [editedText, setEditedText] = useState("")

  // Initialize design if not set or if a different quote was selected
  useEffect(() => {
    if (!design || design.quote.id !== quoteId) {
      // Check if it's a curated quote
      const found = INSPIRE_QUOTES.find((q) => q.id === quoteId)
      if (found) {
        initDesign(found)
      } else if (!design) {
        // Custom quote not found and no design - redirect to browse
        router.replace("/inspire/browse")
      }
    }
  }, [quoteId, design, initDesign, router])

  if (!design) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  const handleEditText = () => {
    setEditedText(design.quote.text)
    setEditingText(true)
  }

  const handleSaveText = () => {
    if (editedText.trim()) {
      updateDesign({
        quote: { ...design.quote, text: editedText.trim() },
      })
    }
    setEditingText(false)
  }

  const handleContinue = () => {
    router.push(`/inspire/configure/${design.id}`)
  }

  return (
    <div className="min-h-[calc(100vh-73px)]">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <button
              onClick={() => router.push("/inspire/browse")}
              className="mb-3 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Quotes
            </button>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Design Studio
            </p>
            <h1 className="font-serif text-3xl tracking-tight text-foreground md:text-4xl text-balance">
              Make it beautiful
            </h1>
          </div>
          <Button
            onClick={handleContinue}
            size="lg"
            className="rounded-full bg-foreground text-background hover:bg-foreground/90"
          >
            Continue to Print Options
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>

        {/* Two-column layout */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_420px]">
          {/* Left: Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <DesignPreview design={design} />

            {/* Edit quote text */}
            <div className="mt-4">
              {editingText ? (
                <div className="flex flex-col gap-2">
                  <textarea
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    rows={3}
                    maxLength={300}
                    className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSaveText} className="rounded-full bg-foreground text-background hover:bg-foreground/90">
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setEditingText(false)} className="rounded-full">
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleEditText}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <PenLine className="h-3.5 w-3.5" />
                  Edit quote text
                </button>
              )}
            </div>
          </motion.div>

          {/* Right: Controls */}
          <DesignControls design={design} onUpdate={updateDesign} />
        </div>
      </div>
    </div>
  )
}
