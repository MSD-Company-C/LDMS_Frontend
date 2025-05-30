import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapView } from "@/components/map-view"
import {
  BarChart3,
  Package,
  Truck,
  Users,
  AlertTriangle,
  CheckCircle2,
  FileBarChart,
  Warehouse,
  ArrowLeft,
  Pencil,
  Trash2,
  Clock,
  MapPin,
  Phone,
  User,
  Mail,
  Calendar,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Admin navigation items
const adminNavItems = [
  { title: "Dashboard", href: "/admin/dashboard", icon: <BarChart3 className="h-4 w-4 mr-2" /> },
  { title: "Orders", href: "/admin/orders", icon: <Package className="h-4 w-4 mr-2" /> },
  { title: "Drivers", href: "/admin/drivers", icon: <Truck className="h-4 w-4 mr-2" /> },
  { title: "Inventory", href: "/admin/inventory", icon: <Warehouse className="h-4 w-4 mr-2" /> },
  { title: "Issues", href: "/admin/issues", icon: <AlertTriangle className="h-4 w-4 mr-2" /> },
  { title: "Proof of Delivery", href: "/admin/pod", icon: <CheckCircle2 className="h-4 w-4 mr-2" /> },
  { title: "Reports", href: "/admin/reports", icon: <FileBarChart className="h-4 w-4 mr-2" /> },
  { title: "Users", href: "/admin/users", icon: <Users className="h-4 w-4 mr-2" /> },
]

interface OrderDetailPageProps {
  params: {
    orderId: string
  }
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { orderId } = params

  // Mock data - in a real app, this would come from an API call
  const orderData = {
    id: orderId,
    status: "In Transit",
    createdAt: "June 10, 2023 at 9:30 AM",
    estimatedDelivery: "June 10, 2023, 2:00 PM - 4:00 PM",
    customer: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, New York, NY 10001",
    },
    driver: {
      name: "Michael Rodriguez",
      id: "DRV-789",
      phone: "+1 (555) 987-6543",
      vehicle: "White Van - XYZ 1234",
      location: {
        lat: 40.7128,
        lng: -74.006,
      },
    },
    items: [
      { id: "ITM-001", name: "Premium Headphones", quantity: 1, price: "$89.99" },
      { id: "ITM-002", name: "Wireless Charger", quantity: 2, price: "$29.99" },
      { id: "ITM-003", name: "Phone Case", quantity: 1, price: "$19.99" },
    ],
    payment: {
      subtotal: "$169.96",
      shipping: "$5.99",
      tax: "$14.00",
      total: "$189.95",
      method: "Credit Card (ending in 4242)",
    },
    timeline: [
      { status: "Order Placed", time: "Jun 10, 9:30 AM", completed: true },
      { status: "Order Processed", time: "Jun 10, 11:45 AM", completed: true },
      { status: "Out for Delivery", time: "Jun 10, 1:15 PM", completed: true },
      { status: "Delivered", time: "Estimated: 2:00 PM - 4:00 PM", completed: false },
    ],
  }

  // Function to get badge color based on status
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Delivered
          </Badge>
        )
      case "in transit":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            In Transit
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Processing
          </Badge>
        )
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Scheduled
          </Badge>
        )
      case "failed delivery":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Failed Delivery
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <DashboardLayout navItems={adminNavItems} userType="admin">
      <div className="container py-6">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Link href="/admin/orders">
              <Button variant="outline" size="icon" className="mr-2">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Order: {orderId}</h1>
              <div className="flex items-center gap-2">
                <p className="text-muted-foreground">Created: {orderData.createdAt}</p>
                {getStatusBadge(orderData.status)}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Pencil className="mr-2 h-4 w-4" />
              Edit Order
            </Button>
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Cancel Order
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="items">
                  <TabsList>
                    <TabsTrigger value="items">Items</TabsTrigger>
                    <TabsTrigger value="tracking">Tracking</TabsTrigger>
                    <TabsTrigger value="payment">Payment</TabsTrigger>
                  </TabsList>
                  <TabsContent value="items" className="space-y-4 pt-4">
                    <div className="rounded-md border">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="p-2 text-left font-medium">Item</th>
                            <th className="p-2 text-center font-medium">Quantity</th>
                            <th className="p-2 text-right font-medium">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderData.items.map((item) => (
                            <tr key={item.id} className="border-b">
                              <td className="p-2">{item.name}</td>
                              <td className="p-2 text-center">{item.quantity}</td>
                              <td className="p-2 text-right">{item.price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="flex justify-end">
                      <div className="w-[200px] space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Subtotal:</span>
                          <span>{orderData.payment.subtotal}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Shipping:</span>
                          <span>{orderData.payment.shipping}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Tax:</span>
                          <span>{orderData.payment.tax}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-medium">
                          <span>Total:</span>
                          <span>{orderData.payment.total}</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="tracking" className="pt-4">
                    <div className="space-y-4">
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
                        className="h-[300px] w-full rounded-md border"
                      />
                      <div className="space-y-8 mt-4">
                        {orderData.timeline.map((item, index) => (
                          <div key={index} className="flex">
                            <div className="mr-4 flex flex-col items-center">
                              <div
                                className={`rounded-full p-1 ${item.completed ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                              >
                                {item.completed ? <CheckCircle2 className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                              </div>
                              {index < orderData.timeline.length - 1 && (
                                <div className={`h-full w-px my-1 ${item.completed ? "bg-primary" : "bg-muted"}`} />
                              )}
                            </div>
                            <div className="space-y-1 pt-1">
                              <p className="font-medium leading-none">{item.status}</p>
                              <p className="text-sm text-muted-foreground">{item.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="payment" className="pt-4">
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <h3 className="font-medium">Payment Method</h3>
                        <p>{orderData.payment.method}</p>
                      </div>
                      <div className="grid gap-2">
                        <h3 className="font-medium">Payment Summary</h3>
                        <div className="rounded-md border p-4">
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Subtotal:</span>
                              <span>{orderData.payment.subtotal}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Shipping:</span>
                              <span>{orderData.payment.shipping}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Tax:</span>
                              <span>{orderData.payment.tax}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-medium">
                              <span>Total:</span>
                              <span>{orderData.payment.total}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Driver Information</CardTitle>
                <CardDescription>Current assigned driver for this order</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <Truck className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{orderData.driver.name}</p>
                    <p className="text-sm text-muted-foreground">ID: {orderData.driver.id}</p>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <Button variant="outline" size="sm">
                      <Phone className="mr-2 h-4 w-4" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm">
                      Reassign
                    </Button>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Vehicle</p>
                    <p className="text-muted-foreground">{orderData.driver.vehicle}</p>
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">{orderData.driver.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{orderData.customer.name}</p>
                    <p className="text-sm text-muted-foreground">{orderData.customer.email}</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Delivery Address</p>
                      <p className="text-sm text-muted-foreground">{orderData.customer.address}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{orderData.customer.phone}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{orderData.customer.email}</p>
                    </div>
                  </div>
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
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Estimated Delivery</p>
                      <p className="text-sm text-muted-foreground">{orderData.estimatedDelivery}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Order Placed</p>
                      <p className="text-sm text-muted-foreground">{orderData.createdAt}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" className="w-full">
                  Reschedule
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
