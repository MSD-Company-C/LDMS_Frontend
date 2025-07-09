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
  Clock,
  MessageSquare,
  User,
  Calendar,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Admin navigation items
const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: <Users className="h-4 w-4 mr-2" />,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: <Truck className="h-4 w-4 mr-2" />,
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
];

// Mock issues data
const issues = [
  {
    id: "ISS-001",
    type: "Delivery Delay",
    orderId: "ORD-1234",
    customer: "John Doe",
    driver: "Michael Rodriguez",
    status: "Open",
    priority: "High",
    reportedAt: "2023-06-10 09:30 AM",
    description: "Package delivery is significantly delayed due to traffic congestion.",
  },
  {
    id: "ISS-002",
    type: "Damaged Package",
    orderId: "ORD-1235",
    customer: "Jane Smith",
    driver: "Sarah Lewis",
    status: "In Progress",
    priority: "Medium",
    reportedAt: "2023-06-10 10:15 AM",
    description: "Customer reported that the package was damaged upon delivery.",
  },
  {
    id: "ISS-003",
    type: "Wrong Address",
    orderId: "ORD-1236",
    customer: "Robert Johnson",
    driver: "James Thompson",
    status: "Resolved",
    priority: "Low",
    reportedAt: "2023-06-09 14:45 PM",
    description: "Driver reported that the delivery address provided was incorrect.",
  },
  {
    id: "ISS-004",
    type: "Missing Item",
    orderId: "ORD-1237",
    customer: "Emily Davis",
    driver: "Michael Rodriguez",
    status: "Open",
    priority: "High",
    reportedAt: "2023-06-10 11:20 AM",
    description: "Customer claims that one item was missing from the delivered package.",
  },
  {
    id: "ISS-005",
    type: "Vehicle Breakdown",
    orderId: "Multiple",
    customer: "Multiple",
    driver: "David Wilson",
    status: "In Progress",
    priority: "Critical",
    reportedAt: "2023-06-10 08:45 AM",
    description: "Driver's vehicle broke down affecting multiple deliveries.",
  },
  {
    id: "ISS-006",
    type: "Customer Complaint",
    orderId: "ORD-1238",
    customer: "Michael Wilson",
    driver: "Sarah Lewis",
    status: "Open",
    priority: "Medium",
    reportedAt: "2023-06-10 13:10 PM",
    description: "Customer complained about driver's behavior during delivery.",
  },
  {
    id: "ISS-007",
    type: "Failed Delivery",
    orderId: "ORD-1239",
    customer: "Sophia Martinez",
    driver: "James Thompson",
    status: "Resolved",
    priority: "Medium",
    reportedAt: "2023-06-09 16:30 PM",
    description: "Driver couldn't deliver the package as no one was available to receive it.",
  },
  {
    id: "ISS-008",
    type: "Inventory Shortage",
    orderId: "N/A",
    customer: "N/A",
    driver: "N/A",
    status: "In Progress",
    priority: "High",
    reportedAt: "2023-06-10 07:15 AM",
    description: "Warehouse reported shortage of packaging materials affecting order processing.",
  },
]

export default function IssuesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedIssue, setSelectedIssue] = useState<(typeof issues)[0] | null>(null)

  // Filter issues based on search query, status filter, and priority filter
  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.driver.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || issue.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesPriority = priorityFilter === "all" || issue.priority.toLowerCase() === priorityFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesPriority
  })

  // Function to get badge color based on status
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Open
          </Badge>
        )
      case "in progress":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            In Progress
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Resolved
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Function to get badge color based on priority
  const getPriorityBadge = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "critical":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Critical
          </Badge>
        )
      case "high":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            High
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Low
          </Badge>
        )
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  return (
    <DashboardLayout navItems={adminNavItems} userType="admin">
      <div className="container py-6">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Issues Management</h1>
            <p className="text-muted-foreground">Track and resolve delivery and operational issues</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search issues..."
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
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-[150px]">
                    <div className="flex items-center">
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Priority" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Issue ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="hidden md:table-cell">Order ID</TableHead>
                    <TableHead className="hidden lg:table-cell">Reported</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredIssues.map((issue) => (
                    <TableRow key={issue.id} onClick={() => setSelectedIssue(issue)} className="cursor-pointer">
                      <TableCell className="font-medium">{issue.id}</TableCell>
                      <TableCell>{issue.type}</TableCell>
                      <TableCell className="hidden md:table-cell">{issue.orderId}</TableCell>
                      <TableCell className="hidden lg:table-cell">{issue.reportedAt}</TableCell>
                      <TableCell>{getStatusBadge(issue.status)}</TableCell>
                      <TableCell>{getPriorityBadge(issue.priority)}</TableCell>
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
                            <DropdownMenuItem>Update status</DropdownMenuItem>
                            <DropdownMenuItem>Assign to team member</DropdownMenuItem>
                            <DropdownMenuItem>Contact customer</DropdownMenuItem>
                            <DropdownMenuItem>Contact driver</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredIssues.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No issues found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="space-y-6">
            {selectedIssue ? (
              <>
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Issue Details</CardTitle>
                        <CardDescription>{selectedIssue.id}</CardDescription>
                      </div>
                      {getPriorityBadge(selectedIssue.priority)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium text-sm">Issue Type</h3>
                      <p>{selectedIssue.type}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Description</h3>
                      <p className="text-sm text-muted-foreground">{selectedIssue.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium text-sm">Status</h3>
                        <div className="mt-1">{getStatusBadge(selectedIssue.status)}</div>
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">Reported</h3>
                        <p className="text-sm text-muted-foreground">{selectedIssue.reportedAt}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium text-sm">Order ID</h3>
                        <p className="text-sm text-muted-foreground">{selectedIssue.orderId}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">Customer</h3>
                        <p className="text-sm text-muted-foreground">{selectedIssue.customer}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Driver</h3>
                      <p className="text-sm text-muted-foreground">{selectedIssue.driver}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Add Comment
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <User className="mr-2 h-4 w-4" />
                      Assign Issue
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Clock className="mr-2 h-4 w-4" />
                      Update Status
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Follow-up
                    </Button>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Issue Details</CardTitle>
                  <CardDescription>Select an issue to view details</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">No issue selected</p>
                  <p className="text-sm text-muted-foreground text-center mt-1">
                    Click on an issue from the list to view details
                  </p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Issues Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Open Issues:</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {issues.filter((issue) => issue.status === "Open").length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">In Progress:</span>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    {issues.filter((issue) => issue.status === "In Progress").length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Resolved:</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {issues.filter((issue) => issue.status === "Resolved").length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Critical Priority:</span>
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    {issues.filter((issue) => issue.priority === "Critical").length}
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
