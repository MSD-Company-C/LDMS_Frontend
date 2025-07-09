"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Package,
  Clock,
  AlertTriangle,
  Camera,
  DollarSign,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  Download,
  ArrowUpDown,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Driver navigation items
const driverNavItems = [
  { title: "Assignments", href: "/driver/assignments", icon: <Package className="h-4 w-4 mr-2" /> },
  { title: "Status Updates", href: "/driver/status", icon: <Clock className="h-4 w-4 mr-2" /> },
  { title: "Proof of Delivery", href: "/driver/pod", icon: <Camera className="h-4 w-4 mr-2" /> },
  { title: "Report Issue", href: "/driver/issues", icon: <AlertTriangle className="h-4 w-4 mr-2" /> },
  { title: "Earnings", href: "/driver/earnings", icon: <DollarSign className="h-4 w-4 mr-2" /> },
]

// Mock POD data
const podData = [
  {
    id: "POD-001",
    orderId: "ORD-7829",
    customer: "John Smith",
    address: "123 Main St, New York, NY",
    date: "Jun 10, 2023",
    time: "2:45 PM",
    status: "Completed",
    type: "Photo",
  },
  {
    id: "POD-002",
    orderId: "ORD-7845",
    customer: "Sarah Johnson",
    address: "456 Park Ave, New York, NY",
    date: "Jun 10, 2023",
    time: "3:30 PM",
    status: "Completed",
    type: "Signature",
  },
  {
    id: "POD-003",
    orderId: "ORD-7862",
    customer: "Michael Brown",
    address: "789 Broadway, New York, NY",
    date: "Jun 11, 2023",
    time: "10:15 AM",
    status: "Completed",
    type: "Photo",
  },
  {
    id: "POD-004",
    orderId: "ORD-7890",
    customer: "Emily Davis",
    address: "321 5th Ave, New York, NY",
    date: "Jun 11, 2023",
    time: "1:20 PM",
    status: "Pending",
    type: "Not Captured",
  },
  {
    id: "POD-005",
    orderId: "ORD-7912",
    customer: "David Wilson",
    address: "654 Madison Ave, New York, NY",
    date: "Jun 12, 2023",
    time: "11:45 AM",
    status: "Completed",
    type: "Signature",
  },
  {
    id: "POD-006",
    orderId: "ORD-7935",
    customer: "Jennifer Taylor",
    address: "987 Lexington Ave, New York, NY",
    date: "Jun 12, 2023",
    time: "2:10 PM",
    status: "Failed",
    type: "Not Captured",
  },
  {
    id: "POD-007",
    orderId: "ORD-7951",
    customer: "Robert Martinez",
    address: "159 West End Ave, New York, NY",
    date: "Jun 13, 2023",
    time: "9:30 AM",
    status: "Pending",
    type: "Not Captured",
  },
]

export default function ProofOfDeliveryPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [sortField, setSortField] = useState<keyof (typeof podData)[0]>("date")

  // Filter POD data based on search query, status filter, and type filter
  const filteredPOD = podData
    .filter((pod) => {
      const matchesSearch =
        pod.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pod.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pod.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pod.id.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === "all" || pod.status.toLowerCase() === statusFilter.toLowerCase()
      const matchesType = typeFilter === "all" || pod.type.toLowerCase() === typeFilter.toLowerCase()
      const matchesDate = !dateFilter || pod.date === dateFilter

      return matchesSearch && matchesStatus && matchesType && matchesDate
    })
    .sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      return 0
    })

  // Function to get badge color based on status
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Failed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Function to get badge for POD type
  const getTypeBadge = (type: string) => {
    switch (type.toLowerCase()) {
      case "photo":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Photo
          </Badge>
        )
      case "signature":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Signature
          </Badge>
        )
      case "not captured":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Not Captured
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  // Function to handle sorting
  const handleSort = (field: keyof (typeof podData)[0]) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
  }

  // Function to handle download
  const handleDownload = (podId: string) => {
    toast({
      title: "Downloading Proof of Delivery",
      description: `Downloading POD ${podId}`,
    })
  }

  return (
    <DashboardLayout navItems={driverNavItems} userType="driver">
      <div className="container py-6">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Proof of Delivery</h1>
            <p className="text-muted-foreground">Manage and view your delivery confirmations</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleDownload("all")}>
              <Download className="mr-2 h-4 w-4" />
              Export All
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by order ID, customer, or address..."
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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <div className="flex items-center">
                  <Camera className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="POD Type" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="photo">Photo</SelectItem>
                <SelectItem value="signature">Signature</SelectItem>
                <SelectItem value="not captured">Not Captured</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="date"
              className="w-[180px]"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Proof of Delivery Records</CardTitle>
            <CardDescription>View and manage your proof of delivery history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <div className="flex items-center cursor-pointer" onClick={() => handleSort("id")}>
                        POD ID
                        {sortField === "id" && (
                          <ArrowUpDown className={`ml-2 h-4 w-4 ${sortOrder === "desc" ? "rotate-180" : ""}`} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center cursor-pointer" onClick={() => handleSort("orderId")}>
                        Order ID
                        {sortField === "orderId" && (
                          <ArrowUpDown className={`ml-2 h-4 w-4 ${sortOrder === "desc" ? "rotate-180" : ""}`} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="hidden md:table-cell">Customer</TableHead>
                    <TableHead className="hidden lg:table-cell">Address</TableHead>
                    <TableHead>
                      <div className="flex items-center cursor-pointer" onClick={() => handleSort("date")}>
                        Date
                        {sortField === "date" && (
                          <ArrowUpDown className={`ml-2 h-4 w-4 ${sortOrder === "desc" ? "rotate-180" : ""}`} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPOD.map((pod) => (
                    <TableRow key={pod.id}>
                      <TableCell className="font-medium">{pod.id}</TableCell>
                      <TableCell>{pod.orderId}</TableCell>
                      <TableCell className="hidden md:table-cell">{pod.customer}</TableCell>
                      <TableCell className="hidden lg:table-cell">{pod.address}</TableCell>
                      <TableCell>
                        {pod.date} {pod.time}
                      </TableCell>
                      <TableCell>{getStatusBadge(pod.status)}</TableCell>
                      <TableCell>{getTypeBadge(pod.type)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/driver/pod/${pod.orderId}`}>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownload(pod.id)}
                            disabled={pod.status !== "Completed"}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredPOD.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No proof of delivery records found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Deliveries</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{podData.length}</div>
              <p className="text-xs text-muted-foreground">Last 7 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed PODs</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{podData.filter((pod) => pod.status === "Completed").length}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((podData.filter((pod) => pod.status === "Completed").length / podData.length) * 100)}%
                completion rate
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending PODs</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{podData.filter((pod) => pod.status === "Pending").length}</div>
              <p className="text-xs text-muted-foreground">Requires your attention</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>POD Best Practices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Take Clear Photos</h3>
              <p className="text-sm text-muted-foreground">
                Ensure the package is clearly visible and the delivery location is identifiable in your photos.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Collect Signatures When Required</h3>
              <p className="text-sm text-muted-foreground">
                For signature-required deliveries, make sure the signature is clear and the name is legible.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Document Special Circumstances</h3>
              <p className="text-sm text-muted-foreground">
                If there are any special delivery circumstances, add detailed notes to the POD record.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Calendar className="mr-2 h-4 w-4" />
              View POD Training Materials
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  )
}
