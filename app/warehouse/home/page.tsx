import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Warehouse, Package, Truck, ScanLine, AlertTriangle, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Warehouse navigation items
const warehouseNavItems = [
  { title: "Home", href: "/warehouse/home", icon: <Warehouse className="h-4 w-4 mr-2" /> },
  { title: "Scan Packages", href: "/warehouse/scan", icon: <ScanLine className="h-4 w-4 mr-2" /> },
  { title: "Upcoming Pickups", href: "/warehouse/pickups", icon: <Truck className="h-4 w-4 mr-2" /> },
  { title: "Inventory Status", href: "/warehouse/inventory", icon: <Package className="h-4 w-4 mr-2" /> },
  { title: "Issues", href: "/warehouse/issues", icon: <AlertTriangle className="h-4 w-4 mr-2" /> },
]

export default function WarehouseHomePage() {
  return (
    <DashboardLayout navItems={warehouseNavItems} userType="warehouse">
      <div className="container py-6">
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Warehouse Operations</h1>
          <p className="text-muted-foreground">
            Welcome to the warehouse management dashboard. Manage packages, pickups, and inventory.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Packages Ready</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">Ready for dispatch</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Scan</CardTitle>
              <ScanLine className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">Awaiting processing</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Pickups</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">Scheduled for today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Inventory</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Items need restocking</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common warehouse tasks</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Link href="/warehouse/scan">
                <Button className="w-full justify-start" variant="outline">
                  <ScanLine className="mr-2 h-4 w-4" />
                  Scan New Package
                </Button>
              </Link>
              <Link href="/warehouse/pickups">
                <Button className="w-full justify-start" variant="outline">
                  <Truck className="mr-2 h-4 w-4" />
                  View Today's Pickups
                </Button>
              </Link>
              <Link href="/warehouse/inventory">
                <Button className="w-full justify-start" variant="outline">
                  <Package className="mr-2 h-4 w-4" />
                  Check Inventory
                </Button>
              </Link>
              <Link href="/warehouse/issues/report">
                <Button className="w-full justify-start" variant="outline">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Report Issue
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Today's Pickup Schedule</CardTitle>
              <CardDescription>Drivers arriving for package pickup</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <Truck className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">Driver {i}: Michael Rodriguez</p>
                        <p className="text-sm text-muted-foreground">12 packages for pickup</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        {i === 1 ? "Arriving Now" : `${i}:30 PM`}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">Route #R-{1000 + i}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/warehouse/pickups" className="w-full">
                <Button variant="outline" className="w-full">
                  View All Pickups
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Packages Pending Scan</CardTitle>
              <CardDescription>Recently arrived packages awaiting processing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">Package #{Math.floor(Math.random() * 10000)}</p>
                      <p className="text-sm text-muted-foreground">Arrived: {i * 15} mins ago</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <ScanLine className="mr-2 h-4 w-4" />
                      Scan
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/warehouse/scan" className="w-full">
                <Button className="w-full">
                  <ScanLine className="mr-2 h-4 w-4" />
                  Scan All Packages
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inventory Alerts</CardTitle>
              <CardDescription>Items that need attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Packaging Materials</p>
                    <p className="text-sm text-muted-foreground">Small boxes running low</p>
                  </div>
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    Low Stock
                  </Badge>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Packing Tape</p>
                    <p className="text-sm text-muted-foreground">2 rolls remaining</p>
                  </div>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    Reorder Soon
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Shipping Labels</p>
                    <p className="text-sm text-muted-foreground">Printer needs maintenance</p>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Maintenance
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/warehouse/inventory" className="w-full">
                <Button variant="outline" className="w-full">
                  <Package className="mr-2 h-4 w-4" />
                  View Inventory
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
