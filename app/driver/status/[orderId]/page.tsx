import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Truck,
  Package,
  Clock,
  AlertTriangle,
  Camera,
  DollarSign,
  ArrowLeft,
  CheckCircle2,
  XCircle,
} from "lucide-react"

// Driver navigation items
const driverNavItems = [
  { title: "Assignments", href: "/driver/assignments", icon: <Package className="h-4 w-4 mr-2" /> },
  { title: "Status Updates", href: "/driver/status", icon: <Clock className="h-4 w-4 mr-2" /> },
  { title: "Proof of Delivery", href: "/driver/pod", icon: <Camera className="h-4 w-4 mr-2" /> },
  { title: "Report Issue", href: "/driver/issues", icon: <AlertTriangle className="h-4 w-4 mr-2" /> },
  { title: "Earnings", href: "/driver/earnings", icon: <DollarSign className="h-4 w-4 mr-2" /> },
]

interface StatusUpdatePageProps {
  params: {
    orderId: string
  }
}

export default function StatusUpdatePage({ params }: StatusUpdatePageProps) {
  const { orderId } = params

  // Mock data - in a real app, this would come from an API call
  const deliveryData = {
    id: orderId,
    customer: "John Doe",
    address: "123 Main St, New York, NY 10001",
    status: "In Transit",
  }

  return (
    <DashboardLayout navItems={driverNavItems} userType="driver">
      <div className="container py-6">
        <div className="mb-6 flex items-center gap-2">
          <Link href={`/driver/delivery/${orderId}`}>
            <Button variant="outline" size="icon" className="mr-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Update Status: {orderId}</h1>
            <p className="text-muted-foreground">Customer: {deliveryData.customer}</p>
          </div>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Delivery Status Update</CardTitle>
            <CardDescription>Update the current status of this delivery</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup defaultValue="in-transit">
              <div className="flex flex-col space-y-4">
                <div className="flex items-start space-x-3 space-y-0">
                  <RadioGroupItem value="in-transit" id="in-transit" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="in-transit" className="font-medium">
                      <div className="flex items-center">
                        <Truck className="mr-2 h-4 w-4" />
                        In Transit
                      </div>
                    </Label>
                    <p className="text-sm text-muted-foreground">The package is on the way to the customer</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 space-y-0">
                  <RadioGroupItem value="delivered" id="delivered" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="delivered" className="font-medium">
                      <div className="flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Delivered
                      </div>
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      The package has been successfully delivered to the customer
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 space-y-0">
                  <RadioGroupItem value="failed-attempt" id="failed-attempt" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="failed-attempt" className="font-medium">
                      <div className="flex items-center">
                        <XCircle className="mr-2 h-4 w-4" />
                        Failed Delivery Attempt
                      </div>
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Unable to deliver the package (provide reason below)
                    </p>
                  </div>
                </div>
              </div>
            </RadioGroup>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional information about this delivery status update..."
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Proof of Delivery</Label>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-muted-foreground">
                  For successful deliveries, please capture a photo or signature as proof of delivery.
                </p>
                <Link href={`/driver/pod/${orderId}`}>
                  <Button variant="outline" className="w-full">
                    <Camera className="mr-2 h-4 w-4" />
                    Capture Proof of Delivery
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 sm:flex-row">
            <Button className="w-full sm:w-auto">Update Status</Button>
            <Link href={`/driver/delivery/${orderId}`} className="w-full sm:w-auto">
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  )
}
