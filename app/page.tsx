"use client"

import { useState } from "react"
import Link from "next/link"
import { Package, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LandingPage() {
  const [trackingId, setTrackingId] = useState("")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center border-b px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">LogiTrack</span>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Efficient Logistics & Transportation Management
                </h1>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Streamline your logistics operations with our comprehensive management system. Track deliveries,
                  manage inventory, and optimize your supply chain.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <Tabs defaultValue="track" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="track">Track</TabsTrigger>
                    <TabsTrigger value="admin">Admin</TabsTrigger>
                    <TabsTrigger value="driver">Driver</TabsTrigger>
                    <TabsTrigger value="warehouse">Staff</TabsTrigger>
                  </TabsList>
                  <TabsContent value="track">
                    <Card>
                      <CardHeader>
                        <CardTitle>Track Your Order</CardTitle>
                        <CardDescription>Enter your order ID to track your delivery.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="tracking-id">Order ID</Label>
                          <Input
                            id="tracking-id"
                            placeholder="e.g., ORD-12345678"
                            value={trackingId}
                            onChange={(e) => setTrackingId(e.target.value)}
                          />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" disabled={!trackingId} asChild>
                          <Link href={`/track/${trackingId}`}>
                            Track Order
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  <TabsContent value="admin">
                    <Card>
                      <CardHeader>
                        <CardTitle>Admin Login</CardTitle>
                        <CardDescription>Login to access the admin dashboard.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="admin-email">Email</Label>
                          <Input id="admin-email" type="email" placeholder="admin@example.com" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="admin-password">Password</Label>
                            <Link href="/forgot-password" className="text-sm text-primary underline">
                              Forgot password?
                            </Link>
                          </div>
                          <Input id="admin-password" type="password" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" asChild>
                          <Link href="/admin">
                            Login
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  <TabsContent value="driver">
                    <Card>
                      <CardHeader>
                        <CardTitle>Driver Login</CardTitle>
                        <CardDescription>Login to access your driver dashboard.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="driver-email">Email</Label>
                          <Input id="driver-email" type="email" placeholder="driver@example.com" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="driver-password">Password</Label>
                            <Link href="/forgot-password" className="text-sm text-primary underline">
                              Forgot password?
                            </Link>
                          </div>
                          <Input id="driver-password" type="password" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" asChild>
                          <Link href="/driver">
                            Login
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  <TabsContent value="warehouse">
                    <Card>
                      <CardHeader>
                        <CardTitle>Warehouse Staff Login</CardTitle>
                        <CardDescription>Login to access the warehouse management system.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="warehouse-email">Email</Label>
                          <Input id="warehouse-email" type="email" placeholder="staff@example.com" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="warehouse-password">Password</Label>
                            <Link href="/forgot-password" className="text-sm text-primary underline">
                              Forgot password?
                            </Link>
                          </div>
                          <Input id="warehouse-password" type="password" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" asChild>
                          <Link href="/warehouse">
                            Login
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            <p className="text-sm text-muted-foreground">© 2025 LogiTrack. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
