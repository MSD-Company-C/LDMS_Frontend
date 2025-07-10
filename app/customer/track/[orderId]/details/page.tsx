import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Timeline } from "@/components/timeline";
import { Logo } from "@/components/logo";
import { StatusBadge } from "@/components/status-badge";
import {
  Calendar,
  ArrowLeft,
  Truck,
  MapPin,
  Package,
  Clock,
  CheckCircle2,
  User,
  Phone,
  Mail,
  FileText,
  DollarSign,
  Printer,
  Share2,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { MapView } from "@/components/map-view";

interface OrderDetailsPageProps {
  params: {
    orderId: string;
  };
}

export default function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const { orderId } = params;

  // Mock data - replace this with your actual data fetching logic if needed
  const orderData = {
    id: orderId,
    status: "In Transit",
    estimatedDelivery: "Today, 2:00 PM - 4:00 PM",
    createdAt: "June 10, 2023 at 9:30 AM",
    customer: {
      name: "John Doe",
      address: "123 Main St, New York, NY 10001",
      phone: "+1 (555) 123-4567",
      email: "john.doe@example.com",
    },
    driver: {
      name: "Michael Rodriguez",
      vehicle: "White Van - XYZ 1234",
      phone: "+1 (555) 987-6543",
      location: {
        lat: 40.7128,
        lng: -74.006,
      },
    },
    items: [
      {
        id: "ITM-001",
        name: "Premium Headphones",
        quantity: 1,
        price: "$89.99",
      },
      { id: "ITM-002", name: "Wireless Charger", quantity: 2, price: "$29.99" },
      { id: "ITM-003", name: "Phone Case", quantity: 1, price: "$19.99" },
    ],
    payment: {
      subtotal: "$169.96",
      shipping: "$5.99",
      tax: "$14.00",
      total: "$189.95",
      method: "Credit Card (ending in 4242)",
      status: "Paid",
      date: "June 10, 2023",
    },
    timeline: [
      { status: "Order Placed", time: "Jun 10, 9:30 AM", completed: true },
      { status: "Order Processed", time: "Jun 10, 11:45 AM", completed: true },
      { status: "Out for Delivery", time: "Jun 10, 1:15 PM", completed: true },
      {
        status: "Delivered",
        time: "Estimated: 2:00 PM - 4:00 PM",
        completed: false,
      },
    ],
    notes: "Please leave the package at the front door if no one answers.",
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Logo />
          <div className="ml-auto flex items-center gap-4">
            <Link href={`/customer/track/${orderId}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Tracking
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container py-6 md:py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">
            Order Details: {orderId}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-muted-foreground">Current Status:</p>
            <StatusBadge status={orderData.status} />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            {/* Order Summary Card */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>
                  Order placed on {orderData.createdAt}
                </CardDescription>
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
                            <th className="p-2 text-center font-medium">
                              Quantity
                            </th>
                            <th className="p-2 text-right font-medium">
                              Price
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderData.items.map((item) => (
                            <tr key={item.id} className="border-b">
                              <td className="p-2">{item.name}</td>
                              <td className="p-2 text-center">
                                {item.quantity}
                              </td>
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
                                className={`rounded-full p-1 ${
                                  item.completed
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {item.completed ? (
                                  <CheckCircle2 className="h-5 w-5" />
                                ) : (
                                  <Clock className="h-5 w-5" />
                                )}
                              </div>
                              {index < orderData.timeline.length - 1 && (
                                <div
                                  className={`h-full w-px my-1 ${
                                    item.completed ? "bg-primary" : "bg-muted"
                                  }`}
                                />
                              )}
                            </div>
                            <div className="space-y-1 pt-1">
                              <p className="font-medium leading-none">
                                {item.status}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {item.time}
                              </p>
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
                        <h3 className="font-medium">Payment Status</h3>
                        <div className="flex items-center">
                          <div className="bg-green-50 text-green-700 border border-green-200 rounded-full px-2 py-1 text-xs font-medium">
                            {orderData.payment.status}
                          </div>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <h3 className="font-medium">Payment Date</h3>
                        <p>{orderData.payment.date}</p>
                      </div>
                      <Separator />
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

            {/* Delivery Information Card */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Delivery Address</p>
                        <p className="text-sm text-muted-foreground">
                          {orderData.customer.address}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Estimated Delivery</p>
                        <p className="text-sm text-muted-foreground">
                          {orderData.estimatedDelivery}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Delivery Notes</p>
                      <p className="text-sm text-muted-foreground">
                        {orderData.notes || "No special instructions"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Driver Information Card */}
            <Card>
              <CardHeader>
                <CardTitle>Driver Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <Truck className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{orderData.driver.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {orderData.driver.vehicle}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Button variant="outline" size="sm">
                      <Phone className="mr-2 h-4 w-4" />
                      Contact Driver
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Customer Information Card */}
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
                    <p className="text-sm text-muted-foreground">
                      {orderData.customer.email}
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">
                        {orderData.customer.phone}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">
                        {orderData.customer.email}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions Card */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Printer className="mr-2 h-4 w-4" />
                  Print Order Details
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Tracking Info
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Package className="mr-2 h-4 w-4" />
                  Request Return
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="mr-2 h-4 w-4" />
                  View Invoice
                </Button>
              </CardContent>
            </Card>

            {/* Delivery Status Card */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Timeline items={orderData.timeline} />
              </CardContent>
              <CardFooter>
                <Link href={`/customer/track/${orderId}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    <Truck className="mr-2 h-4 w-4" />
                    Return to Live Tracking
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
