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
  Plus,
  Search,
  MoreHorizontal,
  Download,
  Filter,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
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

// Mock order data
const orders = [
  {
    id: "ORD-1234",
    customer: "John Doe",
    address: "123 Main St, New York, NY",
    date: "2023-06-10",
    status: "Delivered",
    driver: "Michael R.",
    amount: "$124.99",
  },
  {
    id: "ORD-1235",
    customer: "Jane Smith",
    address: "456 Park Ave, New York, NY",
    date: "2023-06-10",
    status: "In Transit",
    driver: "Sarah L.",
    amount: "$89.50",
  },
  {
    id: "ORD-1236",
    customer: "Robert Johnson",
    address: "789 Broadway, New York, NY",
    date: "2023-06-10",
    status: "Processing",
    driver: "Unassigned",
    amount: "$210.75",
  },
  {
    id: "ORD-1237",
    customer: "Emily Davis",
    address: "321 5th Ave, New York, NY",
    date: "2023-06-09",
    status: "Delivered",
    driver: "Michael R.",
    amount: "$56.20",
  },
  {
    id: "ORD-1238",
    customer: "Michael Wilson",
    address: "654 Madison Ave, New York, NY",
    date: "2023-06-09",
    status: "Failed Delivery",
    driver: "James T.",
    amount: "$145.00",
  },
  {
    id: "ORD-1239",
    customer: "Sophia Martinez",
    address: "987 Lexington Ave, New York, NY",
    date: "2023-06-09",
    status: "Scheduled",
    driver: "Unassigned",
    amount: "$78.30",
  },
  {
    id: "ORD-1240",
    customer: "Daniel Taylor",
    address: "135 West End Ave, New York, NY",
    date: "2023-06-08",
    status: "Delivered",
    driver: "Sarah L.",
    amount: "$192.45",
  },
  {
    id: "ORD-1241",
    customer: "Olivia Brown",
    address: "246 East 42nd St, New York, NY",
    date: "2023-06-08",
    status: "Cancelled",
    driver: "N/A",
    amount: "$0.00",
  },
  {
    id: "ORD-1242",
    customer: "William Anderson",
    address: "753 3rd Ave, New York, NY",
    date: "2023-06-08",
    status: "Delivered",
    driver: "James T.",
    amount: "$67.80",
  },
  {
    id: "ORD-1243",
    customer: "Ava Thomas",
    address: "951 7th Ave, New York, NY",
    date: "2023-06-07",
    status: "Delivered",
    driver: "Michael R.",
    amount: "$134.25",
  },
]

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter orders based on search query and status filter
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.address.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  // Function to get badge color based on status
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Delivered
          </Badge>
        )
      case "in transit":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            In Transit
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Processing
          </Badge>
        )
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Scheduled
          </Badge>
        )
      case "failed delivery":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Failed Delivery
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Cancelled
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
            <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
            <p className="text-muted-foreground">Manage and track all customer orders</p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/orders/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Order
              </Button>
            </Link>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
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
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="in transit">In Transit</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="failed delivery">Failed Delivery</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <ExportCSV data={orders} filename="orders-export.csv" buttonText="Export Orders" />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Driver</TableHead>
                <TableHead className="hidden lg:table-cell">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    <Link href={`/admin/orders/${order.id}`} className="hover:underline">
                      {order.id}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{order.customer}</div>
                      <div className="text-xs text-muted-foreground hidden sm:block">{order.address}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{order.date}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="hidden md:table-cell">{order.driver}</TableCell>
                  <TableCell className="hidden lg:table-cell">{order.amount}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Link href={`/admin/orders/${order.id}`} className="w-full">
                            View details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit order</DropdownMenuItem>
                        <DropdownMenuItem>Assign driver</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Cancel order</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  )
}
