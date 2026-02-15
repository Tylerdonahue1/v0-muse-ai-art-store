"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, Home } from "lucide-react"
import type { InspireDesign } from "@/lib/types"
import { cn } from "@/lib/utils"

interface DesignPreviewProps {
  design: InspireDesign
}

// ── Palette color maps ──
const PALETTE_COLORS: Record<string, { bg: string; text: string; accent: string }> = {
  "warm-neutrals": { bg: "#f5f0e8", text: "#2a2520", accent: "#c4a882" },
  midnight:        { bg: "#141414", text: "#f5f5f0", accent: "#d4a853" },
  ocean:           { bg: "#0f1c2e", text: "#f5f5f0", accent: "#5eadb7" },
  earth:           { bg: "#1a2e1a", text: "#f5f0e8", accent: "#95b88a" },
  blush:           { bg: "#f9eff2", text: "#3a2530", accent: "#c08090" },
  monochrome:      { bg: "#ffffff", text: "#111111", accent: "#666666" },
}

const GRADIENT_COLORS: Record<string, string> = {
  "warm-neutrals": "linear-gradient(135deg, #f5f0e8 0%, #e8ddd0 100%)",
  midnight:        "linear-gradient(135deg, #141414 0%, #2a2520 100%)",
  ocean:           "linear-gradient(135deg, #0f1c2e 0%, #1a3a4a 100%)",
  earth:           "linear-gradient(135deg, #1a2e1a 0%, #2a4020 100%)",
  blush:           "linear-gradient(135deg, #f9eff2 0%, #f0dce5 100%)",
  monochrome:      "linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)",
}

// ── Typography class maps ──
function getTypographyClasses(typography: string, quoteSize: string) {
  const sizeMap = {
    compact: { serif: "text-lg md:text-xl", sans: "text-base md:text-lg" },
    standard: { serif: "text-xl md:text-2xl lg:text-3xl", sans: "text-lg md:text-xl lg:text-2xl" },
    oversized: { serif: "text-2xl md:text-4xl lg:text-5xl", sans: "text-xl md:text-3xl lg:text-4xl" },
  }
  const sizes = sizeMap[quoteSize as keyof typeof sizeMap] || sizeMap.standard

  switch (typography) {
    case "classic-serif":
      return `font-serif ${sizes.serif} italic leading-relaxed`
    case "bold-statement":
      return `font-sans ${sizes.sans} uppercase font-bold tracking-wider leading-tight`
    case "minimal-modern":
      return `font-sans ${sizes.sans} font-light tracking-wide leading-relaxed`
    case "handwritten":
      return `font-serif ${sizes.serif} italic leading-loose`
    case "editorial":
      return `font-serif ${sizes.serif} font-bold leading-snug`
    case "poetic":
      return `font-serif ${sizes.serif} italic leading-loose tracking-wide`
    default:
      return `font-serif ${sizes.serif} leading-relaxed`
  }
}

const ROOM_IMAGES = [
  { id: "living-room", label: "Living Room", image: "/images/rooms/living-room.jpg" },
  { id: "bedroom", label: "Bedroom", image: "/images/rooms/bedroom.jpg" },
  { id: "office", label: "Office", image: "/images/rooms/office.jpg" },
]

export function DesignPreview({ design }: DesignPreviewProps) {
  const [viewMode, setViewMode] = useState<"art" | "room">("art")
  const [roomIdx, setRoomIdx] = useState(0)
  const palette = PALETTE_COLORS[design.palette] || PALETTE_COLORS["warm-neutrals"]

  const bgStyle: React.CSSProperties = (() => {
    switch (design.background) {
      case "gradient":
        return { background: GRADIENT_COLORS[design.palette] || GRADIENT_COLORS["warm-neutrals"] }
      case "textured":
        return { backgroundColor: palette.bg, backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\"><rect width=\"100\" height=\"100\" fill=\"none\"/><circle cx=\"50\" cy=\"50\" r=\"0.5\" fill=\"%23888\" opacity=\"0.15\"/></svg>')" }
      case "dark":
        return { backgroundColor: "#141414" }
      case "photographic":
        return { backgroundColor: palette.bg }
      default:
        return { backgroundColor: palette.bg }
    }
  })()

  const textColor = design.background === "dark" ? "#f5f5f0" : palette.text
  const accentColor = design.background === "dark" ? "#d4a853" : palette.accent
  const textAlign = design.alignment

  return (
    <div className="flex flex-col gap-4">
      {/* View Mode Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setViewMode("art")}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs transition-all",
            viewMode === "art"
              ? "bg-foreground text-background"
              : "border border-border bg-card text-muted-foreground hover:text-foreground"
          )}
        >
          <Eye className="h-3.5 w-3.5" />
          Art Preview
        </button>
        <button
          onClick={() => setViewMode("room")}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs transition-all",
            viewMode === "room"
              ? "bg-foreground text-background"
              : "border border-border bg-card text-muted-foreground hover:text-foreground"
          )}
        >
          <Home className="h-3.5 w-3.5" />
          Room Preview
        </button>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === "art" ? (
          <motion.div
            key="art"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative flex aspect-[3/4] items-center justify-center overflow-hidden rounded-lg border border-border shadow-lg"
            style={bgStyle}
          >
            {/* Photographic background overlay */}
            {design.background === "photographic" && (
              <div className="absolute inset-0">
                <Image
                  src="/images/inspire/hero-bg.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-30"
                />
              </div>
            )}

            {/* Quote text */}
            <div
              className={cn(
                "relative z-10 flex flex-col gap-4 p-8 md:p-12",
                textAlign === "left" && "items-start",
                textAlign === "center" && "items-center",
                textAlign === "right" && "items-end"
              )}
              style={{ textAlign, color: textColor }}
            >
              {design.typography === "editorial" && (
                <div className="mb-2 h-0.5 w-12" style={{ backgroundColor: accentColor }} />
              )}
              <p className={getTypographyClasses(design.typography, design.quoteSize)}>
                {design.typography === "bold-statement"
                  ? design.quote.text
                  : `"${design.quote.text}"`}
              </p>
              {design.showAuthor && (
                <p
                  className="mt-2 text-sm tracking-widest uppercase"
                  style={{ color: accentColor }}
                >
                  {"-- "}{design.quote.author}
                </p>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="room"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-3"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={ROOM_IMAGES[roomIdx].image}
                alt={ROOM_IMAGES[roomIdx].label}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Art piece overlay positioned in room */}
              <div
                className="absolute left-1/2 top-[15%] flex h-[50%] w-[30%] -translate-x-1/2 items-center justify-center overflow-hidden rounded-sm border-2 shadow-2xl"
                style={{
                  ...bgStyle,
                  borderColor: design.background === "dark" ? "#333" : "#ddd",
                }}
              >
                {design.background === "photographic" && (
                  <div className="absolute inset-0">
                    <Image
                      src="/images/inspire/hero-bg.jpg"
                      alt=""
                      fill
                      sizes="200px"
                      className="object-cover opacity-30"
                    />
                  </div>
                )}
                <div
                  className="relative z-10 p-2 md:p-3"
                  style={{ textAlign, color: textColor }}
                >
                  <p className={cn("font-serif text-[8px] leading-tight md:text-xs",
                    design.typography === "bold-statement" && "font-sans uppercase font-bold",
                    design.typography === "minimal-modern" && "font-sans font-light",
                    (design.typography === "classic-serif" || design.typography === "poetic" || design.typography === "handwritten") && "italic"
                  )}>
                    {design.typography === "bold-statement" ? design.quote.text.slice(0, 60) : `"${design.quote.text.slice(0, 60)}..."`}
                  </p>
                  {design.showAuthor && (
                    <p className="mt-1 text-[6px] md:text-[8px] uppercase tracking-wider" style={{ color: accentColor }}>
                      {"-- "}{design.quote.author}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* Room selector */}
            <div className="flex gap-2">
              {ROOM_IMAGES.map((room, idx) => (
                <button
                  key={room.id}
                  onClick={() => setRoomIdx(idx)}
                  className={cn(
                    "relative h-16 flex-1 overflow-hidden rounded-md border transition-all",
                    roomIdx === idx ? "border-accent ring-1 ring-accent" : "border-border opacity-70 hover:opacity-100"
                  )}
                >
                  <Image src={room.image} alt={room.label} fill sizes="150px" className="object-cover" />
                  <span className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-foreground/60 to-transparent p-1">
                    <span className="text-[10px] text-[#f5f0e8]">{room.label}</span>
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
