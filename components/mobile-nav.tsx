"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Truck } from "lucide-react"

interface MobileNavProps {
  items: {
    title: string
    href: string
    icon?: React.ReactNode
  }[]
  setOpen: (open: boolean) => void
}

export function MobileNav({ items, setOpen }: MobileNavProps) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-6 p-4">
      <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
        <Truck className="h-6 w-6" />
        <span className="font-bold">LogiTrack</span>
      </Link>
      <nav className="flex flex-col gap-4">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
              pathname === item.href ? "text-primary" : "text-muted-foreground",
            )}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  )
}
