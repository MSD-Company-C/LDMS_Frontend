import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { MapView } from "@/components/map-view"
import { StatsCard } from "@/components/stats-card"
import {
  BarChart3,
  Package,
  Truck,
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  FileBarChart,
  Warehouse,
  ShieldAlert,
  TrendingUp,
  Calendar,
  Zap,
} from "lucide-react"

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

export default function AdminDashboardPage() {
  return (
    <DashboardLayout navItems={adminNavItems} userType="admin">
      <div className="container py-6">
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Today
              </Button>
              <Button variant="outline" size="sm">
                <Zap className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground">
            Welcome to your admin dashboard. Here's an overview of your logistics operations.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Orders"
            value="1,284"
            description="Active orders in the system"
            icon={Package}
            trend={{ value: "12% from last month", positive: true }}
          />
          <StatsCard title="Active Drivers" value="24" description="2 drivers on break" icon={Truck} />
          <StatsCard title="Pending Deliveries" value="145" description="32 scheduled for today" icon={Clock} />
          <StatsCard title="Open Issues" value="7" description="3 high priority" icon={AlertTriangle} />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-6">
          <Card className="lg:col-span-4 overflow-hidden">
            <CardHeader className="bg-primary/5">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Live Fleet Tracking</CardTitle>
                  <CardDescription>Real-time location of all active drivers</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Analytics
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <MapView
                markers={[
                  { lat: 40.7128, lng: -74.006, label: "Driver 1" },
                  { lat: 40.72, lng: -74.01, label: "Driver 2" },
                  { lat: 40.715, lng: -73.995, label: "Driver 3" },
                ]}
                className="h-[350px] w-full"
              />
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader className="bg-primary/5">
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and operations</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Link href="/admin/orders/new">
                <Button className="w-full justify-start" variant="outline">
                  <Package className="mr-2 h-4 w-4" />
                  Create New Order
                </Button>
              </Link>
              <Link href="/admin/drivers/assign">
                <Button className="w-full justify-start" variant="outline">
                  <Truck className="mr-2 h-4 w-4" />
                  Assign Driver
                </Button>
              </Link>
              <Link href="/admin/inventory/scan">
                <Button className="w-full justify-start" variant="outline">
                  <Warehouse className="mr-2 h-4 w-4" />
                  Scan Inventory
                </Button>
              </Link>
              <Link href="/admin/issues">
                <Button className="w-full justify-start" variant="outline">
                  <ShieldAlert className="mr-2 h-4 w-4" />
                  Resolve Issues
                </Button>
              </Link>
              <Link href="/admin/reports/generate">
                <Button className="w-full justify-start" variant="outline">
                  <FileBarChart className="mr-2 h-4 w-4" />
                  Generate Reports
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Tabs defaultValue="recent-orders">
            <TabsList>
              <TabsTrigger value="recent-orders">Recent Orders</TabsTrigger>
              <TabsTrigger value="issues">Issues</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>
            <TabsContent value="recent-orders" className="space-y-4 mt-4">
              <Card>
                <CardHeader className="bg-primary/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Recent Orders</CardTitle>
                      <CardDescription>Latest orders in the system</CardDescription>
                    </div>
                    <Link href="/admin/orders">
                      <Button variant="outline" size="sm">
                        View All
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                        <div className="space-y-1">
                          <p className="font-medium">Order #{Math.floor(Math.random() * 10000)}</p>
                          <p className="text-sm text-muted-foreground">Customer: John Doe</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">In Transit</p>
                          <p className="text-xs text-muted-foreground">ETA: 2:30 PM</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="issues" className="space-y-4 mt-4">
              <Card>
                <CardHeader className="bg-primary/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Active Issues</CardTitle>
                      <CardDescription>Issues requiring attention</CardDescription>
                    </div>
                    <Link href="/admin/issues">
                      <Button variant="outline" size="sm">
                        View All
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                        <div className="space-y-1">
                          <p className="font-medium">Delivery Delay</p>
                          <p className="text-sm text-muted-foreground">Order #1234 • Driver: Michael R.</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-amber-500">Medium Priority</p>
                          <p className="text-xs text-muted-foreground">Reported 45 min ago</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="performance" className="space-y-4 mt-4">
              <Card>
                <CardHeader className="bg-primary/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Performance Metrics</CardTitle>
                      <CardDescription>Key performance indicators</CardDescription>
                    </div>
                    <Link href="/admin/reports">
                      <Button variant="outline" size="sm">
                        Full Report
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">On-Time Delivery Rate</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">94.2%</p>
                        <p className="text-xs text-green-500">+2.1% from last month</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Average Delivery Time</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">32 minutes</p>
                        <p className="text-xs text-green-500">-3 min from last month</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Customer Satisfaction</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">4.8/5.0</p>
                        <p className="text-xs text-green-500">+0.2 from last month</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}
