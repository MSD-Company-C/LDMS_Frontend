"use client"

import { useState } from "react"
import Link from "next/link"
import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calendar, Clock, Download, Edit, MapPin, Package, Printer, Truck, User } from "lucide-react"

export default function OrderDetailPage({ params }: { params: { orderId: string } }) {
  const [driverStatus, setDriverStatus] = useState("Assigned")

  // Mock data for the order
  const order = {
    id: params.orderId,
    customer: {
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, Anytown, CA 12345",
    },
    date: "May 11, 2025",
    status: "In Transit",
    driver: "Michael Johnson",
    items: [
      { id: "ITEM-001", name: "Premium Headphones", quantity: 1, price: "$89.99" },
      { id: "ITEM-002", name: "Wireless Charger", quantity: 1, price: "$45.00" },
      { id: "ITEM-003", name: "Phone Case", quantity: 1, price: "$22.00" },
    ],
    subtotal: "$156.99",
    shipping: "$12.00",
    tax: "$14.13",
    total: "$183.12",
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
    <MainLayout userRole="admin" userName="Admin User">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/admin/orders">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Order {order.id}</h2>
              <p className="text-muted-foreground">
                Placed on {order.date} • {order.status}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button>
              <Truck className="mr-2 h-4 w-4" />
              Update Status
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">{order.customer.name}</h3>
                <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                <p className="text-sm text-muted-foreground">{order.customer.phone}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Shipping Address
                </h3>
                <p className="text-sm">{order.customer.address}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Customer History
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Delivery Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Driver</h3>
                <div className="flex items-center justify-between">
                  <p className="text-sm">{order.driver}</p>
                  <Select value={driverStatus} onValueChange={setDriverStatus}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Assigned">Assigned</SelectItem>
                      <SelectItem value="En Route">En Route</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Reassign">Reassign</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Delivery Schedule
                </h3>
                <p className="text-sm">Expected: May 12, 2025</p>
                <p className="text-sm text-muted-foreground">Between 9:00 AM - 12:00 PM</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Delivery Status
                </h3>
                <p className="text-sm font-medium text-primary">{order.status}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Delivery Route
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Payment</h3>
                <p className="text-sm">Credit Card (ending in 4567)</p>
                <p className="text-sm text-muted-foreground">Transaction ID: TXN-987654321</p>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm">Subtotal</p>
                  <p className="text-sm font-medium">{order.subtotal}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Shipping</p>
                  <p className="text-sm font-medium">{order.shipping}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Tax</p>
                  <p className="text-sm font-medium">{order.tax}</p>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <p className="text-sm font-bold">Total</p>
                  <p className="text-sm font-bold">{order.total}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Invoice
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Tabs defaultValue="items">
          <TabsList>
            <TabsTrigger value="items">Order Items</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          <TabsContent value="items" className="border rounded-md mt-2 p-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-sm font-medium">Item ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Product</th>
                    <th className="px-4 py-3 text-center text-sm font-medium">Quantity</th>
                    <th className="px-4 py-3 text-right text-sm font-medium">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-3 text-sm">{item.id}</td>
                      <td className="px-4 py-3 text-sm">{item.name}</td>
                      <td className="px-4 py-3 text-sm text-center">{item.quantity}</td>
                      <td className="px-4 py-3 text-sm text-right">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="timeline" className="border rounded-md mt-2 p-4">
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
          </TabsContent>
          <TabsContent value="notes" className="border rounded-md mt-2 p-4">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">No notes have been added to this order yet.</p>
              <Button variant="outline">Add Note</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
