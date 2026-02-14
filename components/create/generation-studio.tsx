"use client"

import { useCallback, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useStyleProfile, useGeneration } from "@/lib/contexts"
import { PromptPanel } from "./prompt-panel"
import { ResultsPanel } from "./results-panel"

export function GenerationStudio() {
  const { isQuizComplete } = useStyleProfile()
  const { isGenerating } = useGeneration()

  return (
    <div className="min-h-[calc(100vh-73px)]">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Generation Studio
          </p>
          <h1 className="font-serif text-3xl tracking-tight text-foreground md:text-4xl text-balance">
            Bring your vision to life
          </h1>
        </motion.div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[400px_1fr]">
          <PromptPanel />
          <ResultsPanel />
        </div>
      </div>
    </div>
  )
}
