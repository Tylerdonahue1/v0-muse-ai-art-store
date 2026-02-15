"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingBag, Menu, X } from "lucide-react"
import { useState } from "react"
import { useCart } from "@/lib/contexts"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { href: "/discover", label: "Discover" },
  { href: "/inspire", label: "Inspire" },
  { href: "/create", label: "Create" },
  { href: "/gallery", label: "Gallery" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const { itemCount } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-2xl tracking-tight text-foreground">
          Muse
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm tracking-wide transition-colors hover:text-foreground",
                pathname === link.href ? "text-foreground font-medium" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative flex items-center text-foreground" aria-label="Shopping cart">
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "text-base transition-colors",
                  pathname === link.href ? "text-foreground font-medium" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
