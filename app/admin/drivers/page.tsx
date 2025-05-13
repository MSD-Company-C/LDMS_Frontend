"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  BarChart3,
  Package,
  Truck,
  Users,
  AlertTriangle,
  CheckCircle2,
  FileBarChart,
  Warehouse,
  Search,
  MoreHorizontal,
  Filter,
  MapPin,
  Phone,
  Mail,
  UserPlus,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapView } from "@/components/map-view"
import { ExportCSV } from "@/components/export-csv"

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

// Mock driver data
const drivers = [
  {
    id: "DRV-001",
    name: "Michael Rodriguez",
    phone: "+1 (555) 123-4567",
    email: "michael.r@example.com",
    vehicle: "White Van - XYZ 1234",
    status: "Active",
    location: { lat: 40.7128, lng: -74.006 },
    deliveries: 12,
    rating: 4.8,
  },
  {
    id: "DRV-002",
    name: "Sarah Lewis",
    phone: "+1 (555) 234-5678",
    email: "sarah.l@example.com",
    vehicle: "Blue Sedan - ABC 5678",
    status: "Active",
    location: { lat: 40.72, lng: -74.01 },
    deliveries: 8,
    rating: 4.9,
  },
  {
    id: "DRV-003",
    name: "James Thompson",
    phone: "+1 (555) 345-6789",
    email: "james.t@example.com",
    vehicle: "Silver SUV - DEF 9012",
    status: "On Break",
    location: { lat: 40.715, lng: -73.995 },
    deliveries: 5,
    rating: 4.7,
  },
  {
    id: "DRV-004",
    name: "Emily Davis",
    phone: "+1 (555) 456-7890",
    email: "emily.d@example.com",
    vehicle: "Red Hatchback - GHI 3456",
    status: "Active",
    location: { lat: 40.725, lng: -74.015 },
    deliveries: 10,
    rating: 4.6,
  },
  {
    id: "DRV-005",
    name: "David Wilson",
    phone: "+1 (555) 567-8901",
    email: "david.w@example.com",
    vehicle: "Black Van - JKL 7890",
    status: "Inactive",
    location: null,
    deliveries: 0,
    rating: 0,
  },
  {
    id: "DRV-006",
    name: "Jennifer Brown",
    phone: "+1 (555) 678-9012",
    email: "jennifer.b@example.com",
    vehicle: "Green SUV - MNO 1234",
    status: "Active",
    location: { lat: 40.718, lng: -74.02 },
    deliveries: 7,
    rating: 4.9,
  },
  {
    id: "DRV-007",
    name: "Robert Martinez",
    phone: "+1 (555) 789-0123",
    email: "robert.m@example.com",
    vehicle: "Gray Sedan - PQR 5678",
    status: "Active",
    location: { lat: 40.722, lng: -73.99 },
    deliveries: 9,
    rating: 4.8,
  },
]

export default function DriversPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedDriver, setSelectedDriver] = useState<(typeof drivers)[0] | null>(null)

  // Filter drivers based on search query and status filter
  const filteredDrivers = drivers.filter((driver) => {
    const matchesSearch =
      driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.vehicle.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || driver.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  // Function to get badge color based on status
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Active
          </Badge>
        )
      case "on break":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            On Break
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Inactive
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
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Drivers</h1>
            <p className="text-muted-foreground">Manage and track your delivery drivers</p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/drivers/new">
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Driver
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search drivers..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filter by status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="on break">On Break</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <ExportCSV data={drivers} filename="drivers-export.csv" buttonText="Export Drivers" />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Driver ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Vehicle</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Deliveries</TableHead>
                    <TableHead className="hidden lg:table-cell">Rating</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDrivers.map((driver) => (
                    <TableRow key={driver.id} onClick={() => setSelectedDriver(driver)} className="cursor-pointer">
                      <TableCell className="font-medium">{driver.id}</TableCell>
                      <TableCell>
                        <div>
                          <div>{driver.name}</div>
                          <div className="text-xs text-muted-foreground hidden sm:block">{driver.email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{driver.vehicle}</TableCell>
                      <TableCell>{getStatusBadge(driver.status)}</TableCell>
                      <TableCell className="hidden md:table-cell">{driver.deliveries} today</TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {driver.rating > 0 ? (
                          <div className="flex items-center">
                            <span className="mr-1">{driver.rating}</span>
                            <span className="text-yellow-400">★</span>
                          </div>
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Edit driver</DropdownMenuItem>
                            <DropdownMenuItem>Assign orders</DropdownMenuItem>
                            <DropdownMenuItem>Contact driver</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredDrivers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No drivers found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="space-y-6">
            {selectedDriver ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Driver Details</CardTitle>
                    <CardDescription>Selected driver information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Truck className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{selectedDriver.name}</p>
                        <p className="text-sm text-muted-foreground">{selectedDriver.id}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-sm text-muted-foreground">{selectedDriver.phone}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-sm text-muted-foreground">{selectedDriver.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Truck className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Vehicle</p>
                          <p className="text-sm text-muted-foreground">{selectedDriver.vehicle}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Package className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Deliveries Today</p>
                          <p className="text-sm text-muted-foreground">{selectedDriver.deliveries} packages</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {selectedDriver.location && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Current Location</CardTitle>
                      <CardDescription>Real-time driver location</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <MapView
                        latitude={selectedDriver.location.lat}
                        longitude={selectedDriver.location.lng}
                        markers={[
                          {
                            lat: selectedDriver.location.lat,
                            lng: selectedDriver.location.lng,
                            label: selectedDriver.name,
                          },
                        ]}
                        className="h-[200px] w-full rounded-b-lg"
                      />
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Driver
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Package className="mr-2 h-4 w-4" />
                      Assign Orders
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <MapPin className="mr-2 h-4 w-4" />
                      View Route
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileBarChart className="mr-2 h-4 w-4" />
                      Performance Report
                    </Button>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Driver Details</CardTitle>
                  <CardDescription>Select a driver to view details</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <Truck className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">No driver selected</p>
                  <p className="text-sm text-muted-foreground text-center mt-1">
                    Click on a driver from the list to view their details
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
