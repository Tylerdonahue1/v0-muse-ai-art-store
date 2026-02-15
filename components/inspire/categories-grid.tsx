"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { INSPIRE_CATEGORIES } from "@/lib/mock-data/inspire-quotes"

export function CategoriesGrid() {
  return (
    <section className="py-20 px-6 bg-card">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Explore by Theme
          </p>
          <h2 className="font-serif text-3xl tracking-tight text-foreground md:text-4xl text-balance">
            Find Your Inspiration
          </h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INSPIRE_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link
                href={`/inspire/browse?category=${cat.id}`}
                className="group relative flex h-56 items-end overflow-hidden rounded-lg"
              >
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1714]/80 via-[#1a1714]/30 to-transparent" />
                <div className="relative z-10 p-5">
                  <h3 className="font-serif text-xl text-[#f5f0e8]">{cat.label}</h3>
                  <p className="mt-1 text-sm text-[#b5ada3] line-clamp-2">{cat.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
