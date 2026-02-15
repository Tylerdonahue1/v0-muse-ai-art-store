"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

const TESTIMONIALS = [
  {
    text: "I bought a Seneca quote for my office. Every morning it reminds me to focus on what I can control.",
    name: "Aiden R.",
    role: "Startup Founder",
  },
  {
    text: "The print quality is museum-level. The Rumi quote I chose looks stunning on canvas above our bed.",
    name: "Priya M.",
    role: "Interior Designer",
  },
  {
    text: "I gifted a custom motivational piece to my partner. Easily the most meaningful gift I have ever given.",
    name: "Jordan K.",
    role: "Creative Director",
  },
]

export function TestimonialsStrip() {
  return (
    <section className="py-16 px-6 bg-card border-y border-border">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-foreground">
                {`"${t.text}"`}
              </p>
              <div className="mt-4">
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
