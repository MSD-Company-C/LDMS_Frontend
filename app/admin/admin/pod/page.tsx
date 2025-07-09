"use client"

import { useState } from "react"
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
  Download,
  Eye,
  ImageIcon,
  FileText,
  Pen,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Admin navigation items
const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: <BarChart3 className="h-4 w-4 mr-2" />,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: <Package className="h-4 w-4 mr-2" />,
  },
  {
    title: "Drivers",
    href: "/admin/drivers",
    icon: <Truck className="h-4 w-4 mr-2" />,
  },
  {
    title: "Issues",
    href: "/admin/issues",
    icon: <AlertTriangle className="h-4 w-4 mr-2" />,
  },

  {
    title: "Users",
    href: "/admin/users",
    icon: <Users className="h-4 w-4 mr-2" />,
  },
];

// Mock proof of delivery data
const podData = [
  {
    id: "POD-001",
    orderId: "ORD-1234",
    customer: "John Doe",
    driver: "Michael Rodriguez",
    deliveryDate: "2023-06-10",
    deliveryTime: "10:30 AM",
    type: "Photo",
    status: "Verified",
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "POD-002",
    orderId: "ORD-1235",
    customer: "Jane Smith",
    driver: "Sarah Lewis",
    deliveryDate: "2023-06-10",
    deliveryTime: "11:45 AM",
    type: "Signature",
    status: "Verified",
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "POD-003",
    orderId: "ORD-1236",
    customer: "Robert Johnson",
    driver: "James Thompson",
    deliveryDate: "2023-06-10",
    deliveryTime: "1:15 PM",
    type: "Photo",
    status: "Pending Verification",
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "POD-004",
    orderId: "ORD-1237",
    customer: "Emily Davis",
    driver: "Michael Rodriguez",
    deliveryDate: "2023-06-09",
    deliveryTime: "3:20 PM",
    type: "Signature",
    status: "Verified",
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "POD-005",
    orderId: "ORD-1238",
    customer: "Michael Wilson",
    driver: "David Wilson",
    deliveryDate: "2023-06-09",
    deliveryTime: "4:45 PM",
    type: "Photo",
    status: "Rejected",
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "POD-006",
    orderId: "ORD-1239",
    customer: "Sophia Martinez",
    driver: "Sarah Lewis",
    deliveryDate: "2023-06-09",
    deliveryTime: "2:30 PM",
    type: "Signature",
    status: "Verified",
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "POD-007",
    orderId: "ORD-1240",
    customer: "Daniel Taylor",
    driver: "James Thompson",
    deliveryDate: "2023-06-08",
    deliveryTime: "11:15 AM",
    type: "Photo",
    status: "Pending Verification",
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "POD-008",
    orderId: "ORD-1241",
    customer: "Olivia Brown",
    driver: "Michael Rodriguez",
    deliveryDate: "2023-06-08",
    deliveryTime: "1:50 PM",
    type: "Signature",
    status: "Verified",
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
]

export default function ProofOfDeliveryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPod, setSelectedPod] = useState<(typeof podData)[0] | null>(null)

  // Filter POD data based on search query, type filter, and status filter
  const filteredPod = podData.filter((pod) => {
    const matchesSearch =
      pod.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pod.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pod.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pod.driver.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = typeFilter === "all" || pod.type.toLowerCase() === typeFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || pod.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesType && matchesStatus
  })

  // Function to get badge color based on status
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "verified":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Verified
          </Badge>
        )
      case "pending verification":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Function to get icon based on type
  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "photo":
        return <ImageIcon className="h-4 w-4 text-blue-500" />
      case "signature":
        return <Pen className="h-4 w-4 text-purple-500" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <DashboardLayout navItems={adminNavItems} userType="admin">
      <div className="container py-6">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Proof of Delivery</h1>
            <p className="text-muted-foreground">Manage and verify delivery confirmations</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by order ID, customer, or driver..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[150px]">
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Type" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="photo">Photo</SelectItem>
                    <SelectItem value="signature">Signature</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="pending verification">Pending Verification</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>POD ID</TableHead>
                    <TableHead>Order ID</TableHead>
                    <TableHead className="hidden md:table-cell">Customer</TableHead>
                    <TableHead className="hidden lg:table-cell">Driver</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPod.map((pod) => (
                    <TableRow key={pod.id} onClick={() => setSelectedPod(pod)} className="cursor-pointer">
                      <TableCell className="font-medium">{pod.id}</TableCell>
                      <TableCell>{pod.orderId}</TableCell>
                      <TableCell className="hidden md:table-cell">{pod.customer}</TableCell>
                      <TableCell className="hidden lg:table-cell">{pod.driver}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getTypeIcon(pod.type)}
                          <span className="ml-2">{pod.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(pod.status)}</TableCell>
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
                            <DropdownMenuItem>Verify proof</DropdownMenuItem>
                            <DropdownMenuItem>Download</DropdownMenuItem>
                            <DropdownMenuItem>View order</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Reject proof</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredPod.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No proof of delivery records found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="space-y-6">
            {selectedPod ? (
              <>
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Proof of Delivery</CardTitle>
                        <CardDescription>{selectedPod.id}</CardDescription>
                      </div>
                      {getStatusBadge(selectedPod.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="aspect-square relative bg-muted">
                      <img
                        src={selectedPod.imageUrl || "/placeholder.svg"}
                        alt="Proof of Delivery"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium text-sm">Order ID</h3>
                          <p className="text-sm text-muted-foreground">{selectedPod.orderId}</p>
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">Type</h3>
                          <div className="flex items-center mt-1">
                            {getTypeIcon(selectedPod.type)}
                            <span className="ml-2">{selectedPod.type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium text-sm">Customer</h3>
                          <p className="text-sm text-muted-foreground">{selectedPod.customer}</p>
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">Driver</h3>
                          <p className="text-sm text-muted-foreground">{selectedPod.driver}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium text-sm">Delivery Date</h3>
                          <p className="text-sm text-muted-foreground">{selectedPod.deliveryDate}</p>
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">Delivery Time</h3>
                          <p className="text-sm text-muted-foreground">{selectedPod.deliveryTime}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Eye className="mr-2 h-4 w-4" />
                      View Full Size
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    {selectedPod.status === "Pending Verification" && (
                      <>
                        <Button variant="default" className="w-full justify-start">
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Verify Proof
                        </Button>
                        <Button variant="outline" className="w-full justify-start text-destructive">
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          Reject Proof
                        </Button>
                      </>
                    )}
                    <Button variant="outline" className="w-full justify-start">
                      <Package className="mr-2 h-4 w-4" />
                      View Order Details
                    </Button>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Proof of Delivery</CardTitle>
                  <CardDescription>Select a record to view details</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <CheckCircle2 className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">No record selected</p>
                  <p className="text-sm text-muted-foreground text-center mt-1">
                    Click on a record from the list to view details
                  </p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Records:</span>
                  <span className="font-medium">{podData.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Verified:</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {podData.filter((pod) => pod.status === "Verified").length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Pending:</span>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    {podData.filter((pod) => pod.status === "Pending Verification").length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Rejected:</span>
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    {podData.filter((pod) => pod.status === "Rejected").length}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
