"use client"

import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, TrendingUp, Package, Truck, AlertTriangle, CheckCircle2, Clock } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  return (
    <MainLayout userRole="admin" userName="Admin User">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">Welcome back! Here's an overview of your logistics operations.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild>
              <Link href="/admin/orders/new">New Order</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,248</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Deliveries</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">145</div>
              <div className="flex items-center text-xs text-green-500">
                <TrendingUp className="mr-1 h-3 w-3" />
                +5% from yesterday
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Issues</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <div className="flex items-center text-xs text-red-500">
                <TrendingUp className="mr-1 h-3 w-3" />
                +2 new issues
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">On-Time Delivery</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <div className="flex items-center text-xs text-green-500">
                <TrendingUp className="mr-1 h-3 w-3" />
                +1.2% improvement
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Live Deliveries</CardTitle>
              <CardDescription>Map view of all active deliveries</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="aspect-video bg-muted relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-muted-foreground">Interactive map would appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates from your logistics operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    time: "10 minutes ago",
                    event: "Driver #42 completed delivery ORD-87654",
                    icon: CheckCircle2,
                    color: "text-green-500",
                  },
                  {
                    time: "25 minutes ago",
                    event: "New issue reported: Address not found",
                    icon: AlertTriangle,
                    color: "text-amber-500",
                  },
                  {
                    time: "1 hour ago",
                    event: "Warehouse marked 15 packages ready",
                    icon: Package,
                    color: "text-blue-500",
                  },
                  {
                    time: "2 hours ago",
                    event: "Driver #28 started route with 8 packages",
                    icon: Truck,
                    color: "text-purple-500",
                  },
                  {
                    time: "3 hours ago",
                    event: "Customer rescheduled delivery ORD-12345",
                    icon: Clock,
                    color: "text-gray-500",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`mt-0.5 rounded-full p-1.5 ${activity.color} bg-opacity-10`}>
                      <activity.icon className={`h-4 w-4 ${activity.color}`} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{activity.event}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="upcoming">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming Deliveries</TabsTrigger>
              <TabsTrigger value="issues">Pending Issues</TabsTrigger>
              <TabsTrigger value="inventory">Inventory Status</TabsTrigger>
            </TabsList>
            <Button variant="outline" size="sm" className="ml-auto gap-1">
              View All
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </div>
          <TabsContent value="upcoming" className="border rounded-md mt-2">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-sm font-medium">Order ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Customer</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Address</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Driver</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">ETA</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      id: "ORD-12345",
                      customer: "John Smith",
                      address: "123 Main St, Anytown",
                      driver: "Michael Johnson",
                      eta: "Today, 2:30 PM",
                      status: "In Transit",
                    },
                    {
                      id: "ORD-12346",
                      customer: "Sarah Williams",
                      address: "456 Oak Ave, Somewhere",
                      driver: "David Lee",
                      eta: "Today, 3:15 PM",
                      status: "Out for Delivery",
                    },
                    {
                      id: "ORD-12347",
                      customer: "Robert Brown",
                      address: "789 Pine Rd, Nowhere",
                      driver: "Lisa Chen",
                      eta: "Today, 4:00 PM",
                      status: "In Transit",
                    },
                    {
                      id: "ORD-12348",
                      customer: "Emily Davis",
                      address: "101 Elm St, Anywhere",
                      driver: "James Wilson",
                      eta: "Today, 5:30 PM",
                      status: "Processing",
                    },
                    {
                      id: "ORD-12349",
                      customer: "Michael Miller",
                      address: "202 Cedar Ln, Everywhere",
                      driver: "Pending Assignment",
                      eta: "Tomorrow, 10:00 AM",
                      status: "Processing",
                    },
                  ].map((order, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-3 text-sm">{order.id}</td>
                      <td className="px-4 py-3 text-sm">{order.customer}</td>
                      <td className="px-4 py-3 text-sm">{order.address}</td>
                      <td className="px-4 py-3 text-sm">{order.driver}</td>
                      <td className="px-4 py-3 text-sm">{order.eta}</td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            order.status === "In Transit"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "Out for Delivery"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="issues" className="border rounded-md mt-2">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-sm font-medium">Issue ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Order ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Reported By</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Issue Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Description</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      id: "ISS-001",
                      orderId: "ORD-12345",
                      reporter: "Michael Johnson (Driver)",
                      type: "Address Not Found",
                      description: "Unable to locate the address",
                      status: "Pending",
                    },
                    {
                      id: "ISS-002",
                      orderId: "ORD-12346",
                      reporter: "Customer",
                      type: "Damaged Package",
                      description: "Package arrived damaged",
                      status: "Under Review",
                    },
                    {
                      id: "ISS-003",
                      orderId: "ORD-12347",
                      reporter: "Lisa Chen (Driver)",
                      type: "Customer Unavailable",
                      description: "No one available to receive package",
                      status: "Pending",
                    },
                    {
                      id: "ISS-004",
                      orderId: "ORD-12348",
                      reporter: "Warehouse Staff",
                      type: "Inventory Mismatch",
                      description: "Package missing from inventory",
                      status: "Under Review",
                    },
                  ].map((issue, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-3 text-sm">{issue.id}</td>
                      <td className="px-4 py-3 text-sm">{issue.orderId}</td>
                      <td className="px-4 py-3 text-sm">{issue.reporter}</td>
                      <td className="px-4 py-3 text-sm">{issue.type}</td>
                      <td className="px-4 py-3 text-sm">{issue.description}</td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            issue.status === "Pending"
                              ? "bg-amber-100 text-amber-800"
                              : issue.status === "Under Review"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {issue.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="inventory" className="border rounded-md mt-2">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-sm font-medium">Item ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Category</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Quantity</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      id: "ITM-001",
                      name: "Standard Box (Small)",
                      category: "Packaging",
                      quantity: 245,
                      status: "In Stock",
                      location: "Warehouse A",
                    },
                    {
                      id: "ITM-002",
                      name: "Standard Box (Medium)",
                      category: "Packaging",
                      quantity: 152,
                      status: "In Stock",
                      location: "Warehouse A",
                    },
                    {
                      id: "ITM-003",
                      name: "Standard Box (Large)",
                      category: "Packaging",
                      quantity: 87,
                      status: "In Stock",
                      location: "Warehouse A",
                    },
                    {
                      id: "ITM-004",
                      name: "Bubble Wrap (Roll)",
                      category: "Packaging",
                      quantity: 32,
                      status: "Low Stock",
                      location: "Warehouse B",
                    },
                    {
                      id: "ITM-005",
                      name: "Packing Tape",
                      category: "Supplies",
                      quantity: 15,
                      status: "Low Stock",
                      location: "Warehouse A",
                    },
                  ].map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-3 text-sm">{item.id}</td>
                      <td className="px-4 py-3 text-sm">{item.name}</td>
                      <td className="px-4 py-3 text-sm">{item.category}</td>
                      <td className="px-4 py-3 text-sm">{item.quantity}</td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            item.status === "In Stock"
                              ? "bg-green-100 text-green-800"
                              : item.status === "Low Stock"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">{item.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
