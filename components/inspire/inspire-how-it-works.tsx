"use client"

import { motion } from "framer-motion"
import { BookOpen, Palette, Truck } from "lucide-react"

const STEPS = [
  {
    icon: BookOpen,
    title: "Choose Your Words",
    description: "Browse our curated collection of quotes from philosophers, poets, and leaders -- or write your own.",
  },
  {
    icon: Palette,
    title: "Design Your Art",
    description: "Pick your typography, colors, and background style to create a piece that's uniquely yours.",
  },
  {
    icon: Truck,
    title: "Print & Ship",
    description: "We print on museum-quality materials and ship directly to your door. Ready to hang.",
  },
]

export function InspireHowItWorks() {
  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Simple Process
          </p>
          <h2 className="font-serif text-3xl tracking-tight text-foreground md:text-4xl">
            How It Works
          </h2>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-foreground">
                <step.icon className="h-6 w-6 text-background" />
              </div>
              <p className="mb-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                {`Step ${idx + 1}`}
              </p>
              <h3 className="font-serif text-xl text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
