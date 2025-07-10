"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Truck } from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
  navItems: {
    title: string
    href: string
    icon?: React.ReactNode
  }[]
  userType: "admin" | "driver" | "warehouse"
}

export function DashboardLayout({ children, navItems, userType }: DashboardLayoutProps) {
  const [open, setOpen] = useState(false)

  // Mock user data - in a real app, this would come from authentication
  const user = {
    name: userType === "admin" ? "Admin User" : userType === "driver" ? "Driver User" : "Warehouse Staff",
    email: `${userType}@example.com`,
  }

  const userTypeTitle =
    userType === "admin" ? "Admin Dashboard" : userType === "driver" ? "Driver Portal" : "Warehouse Operations"

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          {/* Left side: Dashboard title and logo only */}
          <div className="flex items-center gap-4">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <MobileNav items={navItems} setOpen={setOpen} />
              </SheetContent>
            </Sheet>
            <Link
              href={`/${userType}/dashboard`}
              className="hidden items-center gap-2 md:flex"
            >
              <Truck className="h-6 w-6" />
              <span className="font-bold">{userTypeTitle}</span>
            </Link>
          </div>
          {/* Right side: MainNav + UserNav */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex">
              <MainNav items={navItems} />
            </div>
            <UserNav user={user} />
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
