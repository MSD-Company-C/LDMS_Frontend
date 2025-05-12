"use client"

import { useState } from "react"
import Link from "next/link"
import { Package, ArrowLeft, Calendar, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

export default function TrackingPage({ params }: { params: { orderId: string } }) {
  const [date, setDate] = useState<Date>()
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [rescheduleSubmitted, setRescheduleSubmitted] = useState(false)

  // Mock data for the order
  const order = {
    id: params.orderId,
    customer: "John Doe",
    address: "123 Main St, Anytown, CA 12345",
    status: "In Transit",
    eta: "May 12, 2025, 2:30 PM",
    driver: "Michael Johnson",
    items: [
      { name: "Package 1", weight: "2.5 kg" },
      { name: "Package 2", weight: "1.8 kg" },
    ],
    timeline: [
      { status: "Order Placed", date: "May 10, 2025, 10:15 AM", completed: true },
      { status: "Processing", date: "May 10, 2025, 2:30 PM", completed: true },
      { status: "Picked Up", date: "May 11, 2025, 9:45 AM", completed: true },
      { status: "In Transit", date: "May 11, 2025, 11:30 AM", completed: true },
      { status: "Out for Delivery", date: "Expected: May 12, 2025", completed: false },
      { status: "Delivered", date: "Expected: May 12, 2025", completed: false },
    ],
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center border-b px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Package className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">LogiTrack</span>
        </Link>
      </header>
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Tracking Order: {order.id}</h1>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Status</CardTitle>
                <CardDescription>Current status and estimated delivery time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="mb-4 flex justify-between">
                    <div>
                      <h3 className="font-semibold">Current Status</h3>
                      <p className="text-lg font-bold text-primary">{order.status}</p>
                    </div>
                    <div className="text-right">
                      <h3 className="font-semibold">Estimated Delivery</h3>
                      <p>{order.eta}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {order.timeline.map((step, index) => (
                      <div key={index} className="relative flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`flex h-6 w-6 items-center justify-center rounded-full ${step.completed ? "bg-primary" : "border border-muted-foreground bg-background"}`}
                          >
                            {step.completed && <div className="h-2 w-2 rounded-full bg-primary-foreground" />}
                          </div>
                          {index < order.timeline.length - 1 && (
                            <div className={`h-full w-px ${step.completed ? "bg-primary" : "bg-muted-foreground"}`} />
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <p className="font-medium">{step.status}</p>
                          <p className="text-sm text-muted-foreground">{step.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Delivery Address</h3>
                    <p>{order.address}</p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-semibold">Items</h3>
                    <ul className="mt-2 space-y-2">
                      {order.items.map((item, index) => (
                        <li key={index} className="flex justify-between">
                          <span>{item.name}</span>
                          <span className="text-muted-foreground">{item.weight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-semibold">Driver</h3>
                    <p>{order.driver}</p>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Calendar className="mr-2 h-4 w-4" />
                      Reschedule
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Reschedule Delivery</DialogTitle>
                      <DialogDescription>Select a new delivery date for your order.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            {date ? format(date, "PPP") : "Select a date"}
                            <Calendar className="ml-auto h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => setRescheduleSubmitted(true)} disabled={!date || rescheduleSubmitted}>
                        {rescheduleSubmitted ? "Rescheduled" : "Confirm Reschedule"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Feedback
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Provide Feedback</DialogTitle>
                      <DialogDescription>Share your thoughts about your delivery experience.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <Textarea placeholder="Type your feedback here..." className="min-h-[120px]" />
                    </div>
                    <DialogFooter>
                      <Button onClick={() => setFeedbackSubmitted(true)} disabled={feedbackSubmitted}>
                        {feedbackSubmitted ? "Submitted" : "Submit Feedback"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Live Tracking</CardTitle>
              <CardDescription>Real-time location of your delivery</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="aspect-video bg-muted relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-muted-foreground">Map with live tracking would appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
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
