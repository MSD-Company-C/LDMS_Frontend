"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Warehouse,
  Package,
  Truck,
  ScanLine,
  AlertTriangle,
  Search,
  MoreHorizontal,
  Filter,
  Clock,
  MessageSquare,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

// Warehouse navigation items
const warehouseNavItems = [
  { title: "Home", href: "/warehouse/home", icon: <Warehouse className="h-4 w-4 mr-2" /> },
  { title: "Scan Packages", href: "/warehouse/scan", icon: <ScanLine className="h-4 w-4 mr-2" /> },
  { title: "Upcoming Pickups", href: "/warehouse/pickups", icon: <Truck className="h-4 w-4 mr-2" /> },
  { title: "Inventory Status", href: "/warehouse/inventory", icon: <Package className="h-4 w-4 mr-2" /> },
  { title: "Issues", href: "/warehouse/issues", icon: <AlertTriangle className="h-4 w-4 mr-2" /> },
]

// Mock issues data
const issues = [
  {
    id: "ISS-001",
    type: "Inventory Shortage",
    itemId: "INV-001",
    itemName: "Small Shipping Boxes",
    status: "Open",
    priority: "High",
    reportedAt: "2023-06-10 09:30 AM",
    description: "Running critically low on small shipping boxes. Need urgent restock.",
    reportedBy: "John Smith",
  },
  {
    id: "ISS-002",
    type: "Equipment Malfunction",
    itemId: "EQ-005",
    itemName: "Label Printer",
    status: "In Progress",
    priority: "Medium",
    reportedAt: "2023-06-10 10:15 AM",
    description: "Label printer in Zone B is jamming frequently and needs maintenance.",
    reportedBy: "Sarah Johnson",
  },
  {
    id: "ISS-003",
    type: "Package Damage",
    itemId: "ORD-1236",
    itemName: "Customer Order",
    status: "Resolved",
    priority: "Low",
    reportedAt: "2023-06-09 14:45 PM",
    description: "Package for order ORD-1236 was damaged during handling. Repackaged and ready for shipping.",
    reportedBy: "Michael Brown",
  },
  {
    id: "ISS-004",
    type: "Facility Issue",
    itemId: "FAC-002",
    itemName: "Loading Bay Door",
    status: "Open",
    priority: "High",
    reportedAt: "2023-06-10 11:20 AM",
    description: "Loading bay door #2 is not closing properly, causing temperature control issues.",
    reportedBy: "Emily Davis",
  },
  {
    id: "ISS-005",
    type: "Inventory Discrepancy",
    itemId: "INV-006",
    itemName: "Shipping Labels",
    status: "In Progress",
    priority: "Medium",
    reportedAt: "2023-06-10 08:45 AM",
    description: "System shows 500 shipping labels in stock, but physical count shows only 350.",
    reportedBy: "David Wilson",
  },
]

export default function WarehouseIssuesPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedIssue, setSelectedIssue] = useState<(typeof issues)[0] | null>(null)
  const [newIssue, setNewIssue] = useState({
    type: "",
    itemId: "",
    itemName: "",
    priority: "Medium",
    description: "",
  })

  // Filter issues based on search query, status filter, and priority filter
  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.itemId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.itemName.toLowerCase().includes(searchQuery.toLowerCase())

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
      case "high":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
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

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send data to an API
    toast({
      title: "Issue Reported",
      description: "Your issue has been successfully reported.",
    })
    // Reset form
    setNewIssue({
      type: "",
      itemId: "",
      itemName: "",
      priority: "Medium",
      description: "",
    })
  }

  return (
    <DashboardLayout navItems={warehouseNavItems} userType="warehouse">
      <div className="container py-6">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Issues Management</h1>
            <p className="text-muted-foreground">Report and track warehouse issues</p>
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
                    <TableHead className="hidden md:table-cell">Item</TableHead>
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
                      <TableCell className="hidden md:table-cell">{issue.itemName}</TableCell>
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
                            <DropdownMenuItem>Add comment</DropdownMenuItem>
                            <DropdownMenuItem>Escalate issue</DropdownMenuItem>
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
                      <h3 className="font-medium text-sm">Item ID</h3>
                      <p className="text-sm text-muted-foreground">{selectedIssue.itemId}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Item Name</h3>
                      <p className="text-sm text-muted-foreground">{selectedIssue.itemName}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Reported By</h3>
                    <p className="text-sm text-muted-foreground">{selectedIssue.reportedBy}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Add Comment
                  </Button>
                  {selectedIssue.status !== "Resolved" && (
                    <Button className="w-full">
                      <Clock className="mr-2 h-4 w-4" />
                      Update Status
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Report New Issue</CardTitle>
                  <CardDescription>Fill out the form to report a warehouse issue</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="issue-type">Issue Type</Label>
                      <Select
                        value={newIssue.type}
                        onValueChange={(value) => setNewIssue({ ...newIssue, type: value })}
                      >
                        <SelectTrigger id="issue-type">
                          <SelectValue placeholder="Select issue type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Inventory Shortage">Inventory Shortage</SelectItem>
                          <SelectItem value="Equipment Malfunction">Equipment Malfunction</SelectItem>
                          <SelectItem value="Package Damage">Package Damage</SelectItem>
                          <SelectItem value="Facility Issue">Facility Issue</SelectItem>
                          <SelectItem value="Inventory Discrepancy">Inventory Discrepancy</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="item-id">Item ID (if applicable)</Label>
                      <Input
                        id="item-id"
                        placeholder="e.g., INV-001, ORD-1234"
                        value={newIssue.itemId}
                        onChange={(e) => setNewIssue({ ...newIssue, itemId: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="item-name">Item Name</Label>
                      <Input
                        id="item-name"
                        placeholder="e.g., Small Shipping Boxes, Label Printer"
                        value={newIssue.itemName}
                        onChange={(e) => setNewIssue({ ...newIssue, itemName: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select
                        value={newIssue.priority}
                        onValueChange={(value) => setNewIssue({ ...newIssue, priority: value })}
                      >
                        <SelectTrigger id="priority">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe the issue in detail..."
                        rows={4}
                        value={newIssue.description}
                        onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Report Issue
                    </Button>
                  </form>
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
                  <span className="text-sm">High Priority:</span>
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    {issues.filter((issue) => issue.priority === "High").length}
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
