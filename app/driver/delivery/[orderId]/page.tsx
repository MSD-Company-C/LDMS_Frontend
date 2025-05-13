import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapView } from "@/components/map-view"
import {
  Package,
  Clock,
  MapPin,
  User,
  Phone,
  AlertTriangle,
  Camera,
  DollarSign,
  ArrowLeft,
  Navigation,
  CheckCircle2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Driver navigation items
const driverNavItems = [
  { title: "Assignments", href: "/driver/assignments", icon: <Package className="h-4 w-4 mr-2" /> },
  { title: "Status Updates", href: "/driver/status", icon: <Clock className="h-4 w-4 mr-2" /> },
  { title: "Proof of Delivery", href: "/driver/pod", icon: <Camera className="h-4 w-4 mr-2" /> },
  { title: "Report Issue", href: "/driver/issues", icon: <AlertTriangle className="h-4 w-4 mr-2" /> },
  { title: "Earnings", href: "/driver/earnings", icon: <DollarSign className="h-4 w-4 mr-2" /> },
]

interface DeliveryDetailPageProps {
  params: {
    orderId: string
  }
}

export default function DeliveryDetailPage({ params }: DeliveryDetailPageProps) {
  const { orderId } = params

  // Mock data - in a real app, this would come from an API call
  const deliveryData = {
    id: orderId,
    status: "In Transit",
    estimatedDelivery: "Today, 2:00 PM - 4:00 PM",
    customer: {
      name: "John Doe",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, New York, NY 10001",
      notes: "Please leave package at the front door if no one answers.",
    },
    location: {
      lat: 40.7128,
      lng: -74.006,
    },
    items: [
      { id: "ITM-001", name: "Premium Headphones", quantity: 1 },
      { id: "ITM-002", name: "Wireless Charger", quantity: 2 },
      { id: "ITM-003", name: "Phone Case", quantity: 1 },
    ],
  }

  return (
    <DashboardLayout navItems={driverNavItems} userType="driver">
      <div className="container py-6">
        <div className="mb-6 flex items-center gap-2">
          <Link href="/driver/assignments">
            <Button variant="outline" size="icon" className="mr-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Delivery: {orderId}</h1>
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground">{deliveryData.estimatedDelivery}</p>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {deliveryData.status}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Location</CardTitle>
                <CardDescription>Navigate to customer address</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <MapView
                  latitude={deliveryData.location.lat}
                  longitude={deliveryData.location.lng}
                  markers={[
                    {
                      lat: deliveryData.location.lat,
                      lng: deliveryData.location.lng,
                      label: "Delivery",
                    },
                  ]}
                  className="h-[300px] w-full"
                />
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Navigation className="mr-2 h-4 w-4" />
                  Navigate to Address
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Package Details</CardTitle>
                <CardDescription>Items to be delivered</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-2 text-left font-medium">Item</th>
                        <th className="p-2 text-center font-medium">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deliveryData.items.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="p-2">{item.name}</td>
                          <td className="p-2 text-center">{item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Link href={`/driver/status/${orderId}`} className="flex-1">
                  <Button className="w-full">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Update Delivery Status
                  </Button>
                </Link>
                <Link href={`/driver/pod/${orderId}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    <Camera className="mr-2 h-4 w-4" />
                    Capture Proof of Delivery
                  </Button>
                </Link>
              </CardFooter>
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
                    <p className="font-medium">{deliveryData.customer.name}</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Delivery Address</p>
                      <p className="text-sm text-muted-foreground">{deliveryData.customer.address}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{deliveryData.customer.phone}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Customer
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{deliveryData.customer.notes}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href={`/driver/issues/report/${orderId}`}>
                  <Button variant="outline" className="w-full justify-start">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Report an Issue
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="mr-2 h-4 w-4" />
                  Request Time Extension
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
