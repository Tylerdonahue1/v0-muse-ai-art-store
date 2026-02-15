"use client"

import { motion } from "framer-motion"
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import type { InspireDesign, InspireTypography, InspireBackground, InspirePalette } from "@/lib/types"
import { cn } from "@/lib/utils"

interface DesignControlsProps {
  design: InspireDesign
  onUpdate: (updates: Partial<InspireDesign>) => void
}

const TYPOGRAPHY_OPTIONS: { id: InspireTypography; label: string; preview: string }[] = [
  { id: "classic-serif", label: "Classic Serif", preview: "Aa" },
  { id: "bold-statement", label: "Bold Statement", preview: "AA" },
  { id: "minimal-modern", label: "Minimal Modern", preview: "Aa" },
  { id: "handwritten", label: "Handwritten", preview: "Aa" },
  { id: "editorial", label: "Editorial", preview: "Aa" },
  { id: "poetic", label: "Poetic", preview: "Aa" },
]

const BACKGROUND_OPTIONS: { id: InspireBackground; label: string; color: string }[] = [
  { id: "solid", label: "Solid", color: "#f5f0e8" },
  { id: "gradient", label: "Gradient", color: "linear-gradient(135deg, #f5f0e8, #e0d5c5)" },
  { id: "textured", label: "Textured", color: "#e8e0d0" },
  { id: "photographic", label: "Photo", color: "#8a7d6f" },
  { id: "dark", label: "Dark", color: "#1a1714" },
]

const PALETTE_OPTIONS: { id: InspirePalette; label: string; colors: string[] }[] = [
  { id: "warm-neutrals", label: "Warm Neutrals", colors: ["#f5f0e8", "#c4a882", "#2a2520"] },
  { id: "midnight", label: "Midnight", colors: ["#141414", "#d4a853", "#f5f5f0"] },
  { id: "ocean", label: "Ocean", colors: ["#0f1c2e", "#5eadb7", "#f5f5f0"] },
  { id: "earth", label: "Earth", colors: ["#1a2e1a", "#95b88a", "#f5f0e8"] },
  { id: "blush", label: "Blush", colors: ["#f9eff2", "#c08090", "#3a2530"] },
  { id: "monochrome", label: "Monochrome", colors: ["#ffffff", "#666666", "#111111"] },
]

const QUOTE_SIZES: { id: "compact" | "standard" | "oversized"; label: string }[] = [
  { id: "compact", label: "Compact" },
  { id: "standard", label: "Standard" },
  { id: "oversized", label: "Oversized" },
]

export function DesignControls({ design, onUpdate }: DesignControlsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex flex-col gap-8"
    >
      {/* Typography */}
      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.15em] text-muted-foreground">Typography</p>
        <div className="grid grid-cols-3 gap-2">
          {TYPOGRAPHY_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onUpdate({ typography: opt.id })}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-lg border border-border py-3 transition-all",
                design.typography === opt.id
                  ? "border-accent bg-accent/10 text-foreground"
                  : "bg-card text-muted-foreground hover:border-accent/30"
              )}
            >
              <span className={cn(
                "text-xl leading-none",
                opt.id === "classic-serif" && "font-serif italic",
                opt.id === "bold-statement" && "font-sans font-bold",
                opt.id === "minimal-modern" && "font-sans font-light",
                opt.id === "handwritten" && "font-serif italic",
                opt.id === "editorial" && "font-serif font-bold",
                opt.id === "poetic" && "font-serif italic",
              )}>
                {opt.preview}
              </span>
              <span className="text-[10px]">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Background */}
      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.15em] text-muted-foreground">Background</p>
        <div className="flex gap-2">
          {BACKGROUND_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onUpdate({ background: opt.id })}
              className={cn(
                "flex flex-1 flex-col items-center gap-1.5 rounded-lg border border-border py-3 transition-all",
                design.background === opt.id
                  ? "border-accent bg-accent/10"
                  : "bg-card hover:border-accent/30"
              )}
            >
              <div
                className="h-6 w-6 rounded-full border border-border"
                style={{
                  background: opt.color.startsWith("linear") ? opt.color : opt.color,
                }}
              />
              <span className="text-[10px] text-foreground">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Color Palette */}
      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.15em] text-muted-foreground">Color Palette</p>
        <div className="grid grid-cols-3 gap-2">
          {PALETTE_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onUpdate({ palette: opt.id })}
              className={cn(
                "flex flex-col items-center gap-2 rounded-lg border border-border py-3 transition-all",
                design.palette === opt.id
                  ? "border-accent bg-accent/10"
                  : "bg-card hover:border-accent/30"
              )}
            >
              <div className="flex gap-0.5">
                {opt.colors.map((c, i) => (
                  <div
                    key={i}
                    className="h-4 w-4 rounded-full border border-border/50"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <span className="text-[10px] text-foreground">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Alignment */}
      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.15em] text-muted-foreground">Alignment</p>
        <div className="flex gap-2">
          {([
            { id: "left" as const, icon: AlignLeft },
            { id: "center" as const, icon: AlignCenter },
            { id: "right" as const, icon: AlignRight },
          ]).map((opt) => (
            <button
              key={opt.id}
              onClick={() => onUpdate({ alignment: opt.id })}
              className={cn(
                "flex flex-1 items-center justify-center rounded-lg border border-border py-2.5 transition-all",
                design.alignment === opt.id
                  ? "border-accent bg-accent/10 text-foreground"
                  : "bg-card text-muted-foreground hover:border-accent/30"
              )}
            >
              <opt.icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

      {/* Quote Size */}
      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.15em] text-muted-foreground">Quote Size</p>
        <div className="flex gap-2">
          {QUOTE_SIZES.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onUpdate({ quoteSize: opt.id })}
              className={cn(
                "flex-1 rounded-lg border border-border py-2.5 text-xs transition-all",
                design.quoteSize === opt.id
                  ? "border-accent bg-accent/10 text-foreground font-medium"
                  : "bg-card text-muted-foreground hover:border-accent/30"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Show Author Toggle */}
      <div className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
        <div>
          <p className="text-sm font-medium text-foreground">Show Author</p>
          <p className="text-xs text-muted-foreground">Display attribution below the quote</p>
        </div>
        <Switch
          checked={design.showAuthor}
          onCheckedChange={(checked) => onUpdate({ showAuthor: checked })}
        />
      </div>
    </motion.div>
  )
}
