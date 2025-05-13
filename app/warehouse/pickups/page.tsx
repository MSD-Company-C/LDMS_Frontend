"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Warehouse,
  Package,
  Truck,
  ScanLine,
  AlertTriangle,
  Search,
  Calendar,
  Clock,
  CheckCircle2,
  User,
  Phone,
  Filter,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { MapView } from "@/components/map-view"

// Warehouse navigation items
const warehouseNavItems = [
  { title: "Home", href: "/warehouse/home", icon: <Warehouse className="h-4 w-4 mr-2" /> },
  { title: "Scan Packages", href: "/warehouse/scan", icon: <ScanLine className="h-4 w-4 mr-2" /> },
  { title: "Upcoming Pickups", href: "/warehouse/pickups", icon: <Truck className="h-4 w-4 mr-2" /> },
  { title: "Inventory Status", href: "/warehouse/inventory", icon: <Package className="h-4 w-4 mr-2" /> },
  { title: "Issues", href: "/warehouse/issues", icon: <AlertTriangle className="h-4 w-4 mr-2" /> },
]

// Mock pickup data
const pickupData = {
  today: [
    {
      id: "PU-001",
      driverId: "DRV-001",
      driverName: "Michael Rodriguez",
      vehicle: "White Van - XYZ 1234",
      status: "Arrived",
      scheduledTime: "10:30 AM",
      packages: 12,
      location: { lat: 40.7128, lng: -74.006 },
      phone: "+1 (555) 123-4567",
      eta: "Now",
    },
    {
      id: "PU-002",
      driverId: "DRV-002",
      driverName: "Sarah Lewis",
      vehicle: "Blue Sedan - ABC 5678",
      status: "En Route",
      scheduledTime: "11:45 AM",
      packages: 8,
      location: { lat: 40.72, lng: -74.01 },
      phone: "+1 (555) 234-5678",
      eta: "15 minutes",
    },
    {
      id: "PU-003",
      driverId: "DRV-003",
      driverName: "James Thompson",
      vehicle: "Silver SUV - DEF 9012",
      status: "Scheduled",
      scheduledTime: "2:15 PM",
      packages: 15,
      location: { lat: 40.715, lng: -73.995 },
      phone: "+1 (555) 345-6789",
      eta: "3 hours",
    },
  ],
  upcoming: [
    {
      id: "PU-004",
      driverId: "DRV-004",
      driverName: "Emily Davis",
      vehicle: "Red Hatchback - GHI 3456",
      status: "Scheduled",
      scheduledTime: "Tomorrow, 9:30 AM",
      packages: 10,
      location: null,
      phone: "+1 (555) 456-7890",
      eta: "Tomorrow",
    },
    {
      id: "PU-005",
      driverId: "DRV-005",
      driverName: "David Wilson",
      vehicle: "Black Van - JKL 7890",
      status: "Scheduled",
      scheduledTime: "Tomorrow, 11:00 AM",
      packages: 18,
      location: null,
      phone: "+1 (555) 567-8901",
      eta: "Tomorrow",
    },
    {
      id: "PU-006",
      driverId: "DRV-006",
      driverName: "Jennifer Brown",
      vehicle: "Green SUV - MNO 1234",
      status: "Scheduled",
      scheduledTime: "Tomorrow, 2:30 PM",
      packages: 7,
      location: null,
      phone: "+1 (555) 678-9012",
      eta: "Tomorrow",
    },
  ],
  completed: [
    {
      id: "PU-007",
      driverId: "DRV-007",
      driverName: "Robert Martinez",
      vehicle: "Gray Sedan - PQR 5678",
      status: "Completed",
      scheduledTime: "Today, 8:15 AM",
      completedTime: "8:20 AM",
      packages: 9,
      location: null,
      phone: "+1 (555) 789-0123",
    },
    {
      id: "PU-008",
      driverId: "DRV-008",
      driverName: "Lisa Johnson",
      vehicle: "Yellow Van - STU 9012",
      status: "Completed",
      scheduledTime: "Yesterday, 3:45 PM",
      completedTime: "3:50 PM",
      packages: 14,
      location: null,
      phone: "+1 (555) 890-1234",
    },
  ],
}

export default function UpcomingPickupsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPickup, setSelectedPickup] = useState<any>(null)

  // Function to filter pickups based on search query and status filter
  const filterPickups = (pickups: any[]) => {
    return pickups.filter((pickup) => {
      const matchesSearch =
        pickup.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pickup.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pickup.vehicle.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === "all" || pickup.status.toLowerCase() === statusFilter.toLowerCase()

      return matchesSearch && matchesStatus
    })
  }

  // Apply filters to each category
  const filteredToday = filterPickups(pickupData.today)
  const filteredUpcoming = filterPickups(pickupData.upcoming)
  const filteredCompleted = filterPickups(pickupData.completed)

  // Function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "arrived":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Arrived
          </Badge>
        )
      case "en route":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            En Route
          </Badge>
        )
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Scheduled
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Completed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <DashboardLayout navItems={warehouseNavItems} userType="warehouse">
      <div className="container py-6">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Upcoming Pickups</h1>
            <p className="text-muted-foreground">Manage driver pickups and package preparation</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search pickups..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="arrived">Arrived</SelectItem>
                    <SelectItem value="en route">En Route</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs defaultValue="today">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <TabsContent value="today" className="mt-6">
                <div className="space-y-4">
                  {filteredToday.length > 0 ? (
                    filteredToday.map((pickup) => (
                      <Card
                        key={pickup.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setSelectedPickup(pickup)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Truck className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-medium">{pickup.driverName}</h3>
                                <p className="text-sm text-muted-foreground">{pickup.vehicle}</p>
                              </div>
                            </div>
                            {getStatusBadge(pickup.status)}
                          </div>
                          <div className="mt-4 grid grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Scheduled</p>
                              <p className="font-medium">{pickup.scheduledTime}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Packages</p>
                              <p className="font-medium">{pickup.packages}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">ETA</p>
                              <p className="font-medium">{pickup.eta}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-8">
                        <Truck className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground text-center">No pickups scheduled for today</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="upcoming" className="mt-6">
                <div className="space-y-4">
                  {filteredUpcoming.length > 0 ? (
                    filteredUpcoming.map((pickup) => (
                      <Card
                        key={pickup.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setSelectedPickup(pickup)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Truck className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-medium">{pickup.driverName}</h3>
                                <p className="text-sm text-muted-foreground">{pickup.vehicle}</p>
                              </div>
                            </div>
                            {getStatusBadge(pickup.status)}
                          </div>
                          <div className="mt-4 grid grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Scheduled</p>
                              <p className="font-medium">{pickup.scheduledTime}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Packages</p>
                              <p className="font-medium">{pickup.packages}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">ETA</p>
                              <p className="font-medium">{pickup.eta}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-8">
                        <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground text-center">No upcoming pickups scheduled</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="completed" className="mt-6">
                <div className="space-y-4">
                  {filteredCompleted.length > 0 ? (
                    filteredCompleted.map((pickup) => (
                      <Card
                        key={pickup.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setSelectedPickup(pickup)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Truck className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-medium">{pickup.driverName}</h3>
                                <p className="text-sm text-muted-foreground">{pickup.vehicle}</p>
                              </div>
                            </div>
                            {getStatusBadge(pickup.status)}
                          </div>
                          <div className="mt-4 grid grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Scheduled</p>
                              <p className="font-medium">{pickup.scheduledTime}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Completed</p>
                              <p className="font-medium">{pickup.completedTime}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Packages</p>
                              <p className="font-medium">{pickup.packages}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-8">
                        <CheckCircle2 className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground text-center">No completed pickups</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            {selectedPickup ? (
              <>
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Pickup Details</CardTitle>
                        <CardDescription>{selectedPickup.id}</CardDescription>
                      </div>
                      {getStatusBadge(selectedPickup.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{selectedPickup.driverName}</p>
                        <p className="text-sm text-muted-foreground">{selectedPickup.driverId}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Truck className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Vehicle</p>
                          <p className="text-sm text-muted-foreground">{selectedPickup.vehicle}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-sm text-muted-foreground">{selectedPickup.phone}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Scheduled Time</p>
                          <p className="text-sm text-muted-foreground">{selectedPickup.scheduledTime}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Package className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Packages</p>
                          <p className="text-sm text-muted-foreground">{selectedPickup.packages} packages for pickup</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" className="w-full">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Driver
                    </Button>
                    {selectedPickup.status === "Arrived" && (
                      <Button className="w-full">
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Mark Completed
                      </Button>
                    )}
                  </CardFooter>
                </Card>

                {selectedPickup.location && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Driver Location</CardTitle>
                      <CardDescription>Real-time tracking</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <MapView
                        latitude={selectedPickup.location.lat}
                        longitude={selectedPickup.location.lng}
                        markers={[
                          {
                            lat: selectedPickup.location.lat,
                            lng: selectedPickup.location.lng,
                            label: selectedPickup.driverName,
                          },
                        ]}
                        className="h-[200px] w-full rounded-b-lg"
                      />
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle>Pickup Checklist</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="check1" className="mr-2" />
                      <label htmlFor="check1" className="text-sm">
                        Packages prepared and labeled
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="check2" className="mr-2" />
                      <label htmlFor="check2" className="text-sm">
                        Shipping documents ready
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="check3" className="mr-2" />
                      <label htmlFor="check3" className="text-sm">
                        Loading area cleared
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="check4" className="mr-2" />
                      <label htmlFor="check4" className="text-sm">
                        Staff assigned for loading
                      </label>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Pickup Details</CardTitle>
                  <CardDescription>Select a pickup to view details</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <Truck className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">No pickup selected</p>
                  <p className="text-sm text-muted-foreground text-center mt-1">
                    Click on a pickup from the list to view details
                  </p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Today's Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Pickups:</span>
                  <span className="font-medium">{pickupData.today.length + pickupData.completed.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Completed:</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {pickupData.completed.filter((p) => p.scheduledTime.includes("Today")).length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">In Progress:</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {pickupData.today.filter((p) => p.status === "Arrived" || p.status === "En Route").length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Scheduled:</span>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    {pickupData.today.filter((p) => p.status === "Scheduled").length}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/warehouse/scan" className="w-full">
                  <Button variant="outline" className="w-full">
                    <ScanLine className="mr-2 h-4 w-4" />
                    Scan Packages
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
