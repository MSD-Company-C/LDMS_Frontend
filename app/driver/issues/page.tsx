"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Truck,
  Clock,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Search,
  Filter,
  Plus,
  Camera,
  MapPin,
  FileText,
  MessageSquare,
  MoreHorizontal,
  Package,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Driver navigation items
const driverNavItems = [
  {
    title: "Assignments",
    href: "/driver/assignments",
    icon: <Package className="h-4 w-4 mr-2" />,
  },

  {
    title: "Report Issue",
    href: "/driver/issues",
    icon: <Package className="h-4 w-4 mr-2" />,
  }, // update icons accordingly
];

// Mock issues data
const initialIssues = [
  {
    id: "ISS-001",
    orderId: "ORD-7829",
    date: "Jun 10, 2023",
    type: "Vehicle",
    status: "Open",
    description: "Flat tire on delivery route",
    priority: "High",
    assignedTo: "Support Team",
    lastUpdated: "Jun 10, 2023 10:15 AM",
  },
  {
    id: "ISS-002",
    orderId: "ORD-7845",
    date: "Jun 9, 2023",
    type: "Customer",
    status: "Resolved",
    description: "Customer provided wrong address",
    priority: "Medium",
    assignedTo: "Dispatch",
    lastUpdated: "Jun 9, 2023 3:45 PM",
  },
  {
    id: "ISS-003",
    orderId: "ORD-7862",
    date: "Jun 8, 2023",
    type: "Package",
    status: "In Progress",
    description: "Package damaged during transit",
    priority: "Medium",
    assignedTo: "Warehouse Team",
    lastUpdated: "Jun 8, 2023 5:30 PM",
  },
  {
    id: "ISS-004",
    orderId: "ORD-7890",
    date: "Jun 7, 2023",
    type: "App",
    status: "Resolved",
    description: "App crashed during delivery confirmation",
    priority: "Low",
    assignedTo: "Tech Support",
    lastUpdated: "Jun 7, 2023 2:10 PM",
  },
]

export default function DriverIssuesPage() {
  const { toast } = useToast()
  const [issues, setIssues] = useState(initialIssues)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)

  // New issue form state
  const [newIssue, setNewIssue] = useState({
    orderId: "",
    type: "vehicle",
    description: "",
    priority: "medium",
    location: "",
  })

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setNewIssue((prev) => ({ ...prev, [id]: value }))
  }

  // Handle select changes
  const handleSelectChange = (field: string, value: string) => {
    setNewIssue((prev) => ({ ...prev, [field]: value }))
  }

  // Submit new issue
  const handleSubmitIssue = () => {
    // Validate form
    if (!newIssue.orderId || !newIssue.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Create new issue
    const issueToAdd = {
      id: `ISS-${(issues.length + 1).toString().padStart(3, "0")}`,
      orderId: newIssue.orderId,
      date: new Date().toLocaleDateString(),
      type: newIssue.type.charAt(0).toUpperCase() + newIssue.type.slice(1),
      status: "Open",
      description: newIssue.description,
      priority: newIssue.priority.charAt(0).toUpperCase() + newIssue.priority.slice(1),
      assignedTo: "Support Team",
      lastUpdated: new Date().toLocaleString(),
    }

    // Add to issues array
    setIssues((prev) => [issueToAdd, ...prev])

    // Show success message
    toast({
      title: "Issue Reported",
      description: "Your issue has been submitted and will be addressed shortly.",
    })

    // Reset form and close dialog
    setNewIssue({
      orderId: "",
      type: "vehicle",
      description: "",
      priority: "medium",
      location: "",
    })
    setIsReportDialogOpen(false)
  }

  // Filter issues based on search query and status filter
  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || issue.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Open
          </Badge>
        )
      case "in progress":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
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

  // Get priority badge
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
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
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
    <DashboardLayout navItems={driverNavItems} userType="driver">
      <div className="container py-6">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Report Issues</h1>
            <p className="text-muted-foreground">Report and track delivery issues</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setIsReportDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Report New Issue
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Report New Issue</DialogTitle>
                  <DialogDescription>
                    Provide details about the issue you're experiencing. Our support team will address it promptly.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="orderId" className="text-right">
                      Order ID
                    </Label>
                    <Input
                      id="orderId"
                      placeholder="e.g. ORD-7829"
                      className="col-span-3"
                      value={newIssue.orderId}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Issue Type
                    </Label>
                    <Select value={newIssue.type} onValueChange={(value) => handleSelectChange("type", value)}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select issue type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vehicle">Vehicle Issue</SelectItem>
                        <SelectItem value="customer">Customer Issue</SelectItem>
                        <SelectItem value="package">Package Issue</SelectItem>
                        <SelectItem value="app">App Issue</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="priority" className="text-right">
                      Priority
                    </Label>
                    <Select value={newIssue.priority} onValueChange={(value) => handleSelectChange("priority", value)}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right">
                      Location
                    </Label>
                    <Input
                      id="location"
                      placeholder="Current location (optional)"
                      className="col-span-3"
                      value={newIssue.location}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="description" className="text-right pt-2">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the issue in detail"
                      className="col-span-3"
                      rows={4}
                      value={newIssue.description}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <div className="col-start-2 col-span-3 flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Camera className="mr-2 h-4 w-4" />
                        Add Photo
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <MapPin className="mr-2 h-4 w-4" />
                        Share Location
                      </Button>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleSubmitIssue}>
                    Submit Issue
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

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
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="list">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="cards">Card View</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="mt-6">
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Issue ID</th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Order ID</th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Type</th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground hidden md:table-cell">
                      Priority
                    </th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground hidden lg:table-cell">
                      Date
                    </th>
                    <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIssues.map((issue) => (
                    <tr key={issue.id} className="border-b">
                      <td className="p-4 align-middle font-medium">{issue.id}</td>
                      <td className="p-4 align-middle">{issue.orderId}</td>
                      <td className="p-4 align-middle">{issue.type}</td>
                      <td className="p-4 align-middle">{getStatusBadge(issue.status)}</td>
                      <td className="p-4 align-middle hidden md:table-cell">{getPriorityBadge(issue.priority)}</td>
                      <td className="p-4 align-middle hidden lg:table-cell">{issue.date}</td>
                      <td className="p-4 align-middle text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "Issue Details",
                              description: `Viewing details for issue ${issue.id}.`,
                            })
                          }}
                        >
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "Add Comment",
                              description: `Adding comment to issue ${issue.id}.`,
                            })
                          }}
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span className="sr-only">Comment</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {filteredIssues.length === 0 && (
                    <tr>
                      <td colSpan={7} className="h-24 text-center">
                        No issues found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="cards" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredIssues.map((issue) => (
                <Card key={issue.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{issue.id}</CardTitle>
                        <CardDescription>{issue.orderId}</CardDescription>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Status:</span>
                          {getStatusBadge(issue.status)}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Priority:</span>
                          {getPriorityBadge(issue.priority)}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Type:</span>
                        <span className="text-sm ml-2">{issue.type}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Description:</span>
                        <p className="text-sm mt-1">{issue.description}</p>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Reported: {issue.date}</span>
                        <span>Updated: {issue.lastUpdated}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Issue Details",
                          description: `Viewing details for issue ${issue.id}.`,
                        })
                      }}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Add Comment",
                          description: `Adding comment to issue ${issue.id}.`,
                        })
                      }}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Comment
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              {filteredIssues.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-12">
                  <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">No issues found</p>
                  <p className="text-sm text-muted-foreground text-center mt-1">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
