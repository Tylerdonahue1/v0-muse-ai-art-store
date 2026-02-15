"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PenLine, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useInspire } from "@/lib/inspire-context"
import type { InspireQuote } from "@/lib/types"

interface WriteOwnModalProps {
  open: boolean
  onClose: () => void
}

export function WriteOwnModal({ open, onClose }: WriteOwnModalProps) {
  const router = useRouter()
  const { initDesign } = useInspire()
  const [text, setText] = useState("")
  const [author, setAuthor] = useState("")

  const handleSubmit = () => {
    if (!text.trim()) return
    const customQuote: InspireQuote = {
      id: `custom-${Date.now()}`,
      text: text.trim(),
      author: author.trim() || "You",
      category: "mindfulness",
      tags: ["custom"],
    }
    initDesign(customQuote)
    router.push(`/inspire/design/${customQuote.id}`)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-[15%] z-50 mx-auto max-w-lg rounded-lg border border-border bg-background p-6 shadow-xl sm:inset-x-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <PenLine className="h-5 w-5 text-accent" />
                <h3 className="font-serif text-xl text-foreground">Write Your Own</h3>
              </div>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="quote-text" className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  Your Quote or Text
                </label>
                <textarea
                  id="quote-text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter the words you want on your wall..."
                  rows={4}
                  className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  maxLength={300}
                />
                <p className="mt-1 text-right text-[11px] text-muted-foreground">
                  {text.length}/300
                </p>
              </div>

              <div>
                <label htmlFor="quote-author" className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  Attribution (optional)
                </label>
                <input
                  id="quote-author"
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Author name or leave blank"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  maxLength={80}
                />
              </div>

              <Button
                onClick={handleSubmit}
                disabled={!text.trim()}
                className="mt-2 w-full rounded-full bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50"
              >
                Design This Quote
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
