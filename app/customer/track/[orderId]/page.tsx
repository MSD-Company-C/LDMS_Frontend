"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapView } from "@/components/map-view"
import { Timeline } from "@/components/timeline"
import { Logo } from "@/components/logo"
import { StatusBadge } from "@/components/status-badge"
import { Calendar, ArrowLeft, Truck, MapPin, AlertCircle, Phone, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface OrderTrackingPageProps {
  params: {
    orderId: string
  }
}

export default function OrderTrackingPage({ params }: OrderTrackingPageProps) {
  const { orderId } = params
  const { toast } = useToast()

  // Mock data - in a real app, this would come from an API call
  const orderData = {
    id: orderId,
    status: "In Transit",
    estimatedDelivery: "Today, 2:00 PM - 4:00 PM",
    customer: {
      name: "John Doe",
      address: "123 Main St, New York, NY 10001",
      phone: "+1 (555) 123-4567",
    },
    driver: {
      name: "Michael Rodriguez",
      vehicle: "White Van - XYZ 1234",
      location: {
        lat: 40.7128,
        lng: -74.006,
      },
    },
    timeline: [
      { status: "Order Placed", time: "Jun 10, 9:30 AM", completed: true },
      { status: "Order Processed", time: "Jun 10, 11:45 AM", completed: true },
      { status: "Out for Delivery", time: "Jun 10, 1:15 PM", completed: true },
      { status: "Delivered", time: "Estimated: 2:00 PM - 4:00 PM", completed: false },
    ],
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Logo />
          <div className="ml-auto flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container py-6 md:py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Tracking Order: {orderId}</h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-muted-foreground">Current Status:</p>
            <StatusBadge status={orderData.status} />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card className="overflow-hidden">
              <CardHeader className="pb-4 bg-primary/5">
                <CardTitle>Live Tracking</CardTitle>
                <CardDescription>Estimated delivery: {orderData.estimatedDelivery}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2 p-0">
                <MapView
                  latitude={orderData.driver.location.lat}
                  longitude={orderData.driver.location.lng}
                  markers={[
                    {
                      lat: orderData.driver.location.lat,
                      lng: orderData.driver.location.lng,
                      label: "Driver",
                    },
                  ]}
                  className="h-[300px] md:h-[400px] w-full"
                />
              </CardContent>
              <CardFooter className="bg-primary/5">
                <div className="flex items-center text-sm">
                  <Truck className="mr-2 h-4 w-4" />
                  <span>
                    Driver: {orderData.driver.name} • {orderData.driver.vehicle}
                  </span>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery Options</CardTitle>
                <CardDescription>Need to make changes to your delivery?</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="h-auto py-4 justify-start">
                      <div className="flex flex-col items-start text-left">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span className="font-medium">Reschedule Delivery</span>
                        </div>
                        <span className="text-xs text-muted-foreground mt-1">
                          Choose a different delivery date and time
                        </span>
                      </div>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Reschedule Delivery</DialogTitle>
                      <DialogDescription>Select a new date and time for your delivery.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="delivery-date">New Delivery Date</Label>
                        <Input id="delivery-date" type="date" min={new Date().toISOString().split("T")[0]} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="delivery-time">Preferred Time Slot</Label>
                        <Select defaultValue="morning">
                          <SelectTrigger id="delivery-time">
                            <SelectValue placeholder="Select time slot" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">Morning (9:00 AM - 12:00 PM)</SelectItem>
                            <SelectItem value="afternoon">Afternoon (12:00 PM - 4:00 PM)</SelectItem>
                            <SelectItem value="evening">Evening (4:00 PM - 8:00 PM)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        onClick={() =>
                          toast({
                            title: "Delivery Rescheduled",
                            description: "Your delivery has been successfully rescheduled.",
                          })
                        }
                      >
                        Confirm Reschedule
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="h-auto py-4 justify-start">
                      <div className="flex flex-col items-start text-left">
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4" />
                          <span className="font-medium">Change Delivery Address</span>
                        </div>
                        <span className="text-xs text-muted-foreground mt-1">Update the delivery location</span>
                      </div>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Change Delivery Address</DialogTitle>
                      <DialogDescription>
                        Enter the new address where you'd like your package delivered.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="street-address">Street Address</Label>
                        <Input id="street-address" placeholder="123 Main St" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" placeholder="New York" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="state">State</Label>
                          <Input id="state" placeholder="NY" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="zip">ZIP Code</Label>
                          <Input id="zip" placeholder="10001" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="country">Country</Label>
                          <Input id="country" placeholder="United States" />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        onClick={() =>
                          toast({
                            title: "Address Updated",
                            description: "Your delivery address has been successfully updated.",
                          })
                        }
                      >
                        Update Address
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="mr-2 h-4 w-4" />
                      Contact Driver
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Contact Driver</DialogTitle>
                      <DialogDescription>Your driver is currently on the way with your package.</DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center gap-4 py-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Truck className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Michael Rodriguez</p>
                        <p className="text-sm text-muted-foreground">White Van - XYZ 1234</p>
                      </div>
                    </div>
                    <div className="grid gap-4">
                      <Button className="w-full">
                        <Phone className="mr-2 h-4 w-4" />
                        Call Driver
                      </Button>
                      <Button variant="outline" className="w-full">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Leave Instructions
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delivery Instructions</DialogTitle>
                      <DialogDescription>Add special instructions for your delivery.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="instructions">Special Instructions</Label>
                        <Textarea
                          id="instructions"
                          placeholder="E.g., Leave at the back door, call upon arrival, etc."
                          rows={4}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        onClick={() =>
                          toast({
                            title: "Instructions Saved",
                            description: "Your delivery instructions have been saved.",
                          })
                        }
                      >
                        Save Instructions
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      <AlertCircle className="mr-2 h-4 w-4" />
                      Report an Issue
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Report an Issue</DialogTitle>
                      <DialogDescription>
                        Let us know if you're experiencing any problems with your delivery.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="issue-type">Issue Type</Label>
                        <Select defaultValue="delay">
                          <SelectTrigger id="issue-type">
                            <SelectValue placeholder="Select issue type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="delay">Delivery Delay</SelectItem>
                            <SelectItem value="wrong-item">Wrong Item</SelectItem>
                            <SelectItem value="damaged">Damaged Package</SelectItem>
                            <SelectItem value="missing">Missing Items</SelectItem>
                            <SelectItem value="other">Other Issue</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="issue-description">Description</Label>
                        <Textarea
                          id="issue-description"
                          placeholder="Please describe the issue in detail..."
                          rows={4}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        onClick={() =>
                          toast({
                            title: "Issue Reported",
                            description: "Your issue has been reported. Our team will contact you shortly.",
                          })
                        }
                      >
                        Submit Report
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader className="bg-primary/5">
                <CardTitle>Delivery Status</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <Timeline items={orderData.timeline} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm">Recipient</h3>
                  <p className="text-sm">{orderData.customer.name}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm">Delivery Address</h3>
                  <p className="text-sm">{orderData.customer.address}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm">Contact</h3>
                  <p className="text-sm">{orderData.customer.phone}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/customer/track/${orderId}/details`} className="w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    View Order Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rate Your Experience</CardTitle>
                <CardDescription>Let us know how we're doing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className="text-2xl text-yellow-400 hover:scale-110 transition-transform"
                      onClick={() => {
                        toast({
                          title: "Thank You for Your Feedback",
                          description: `You rated your delivery experience ${star} stars.`,
                        })
                      }}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full">
                      Submit Detailed Feedback
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delivery Feedback</DialogTitle>
                      <DialogDescription>Your feedback helps us improve our service.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="feedback">Your Feedback</Label>
                        <Textarea id="feedback" placeholder="Tell us about your delivery experience..." rows={4} />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        onClick={() =>
                          toast({
                            title: "Feedback Submitted",
                            description: "Thank you for your valuable feedback!",
                          })
                        }
                      >
                        Submit Feedback
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
