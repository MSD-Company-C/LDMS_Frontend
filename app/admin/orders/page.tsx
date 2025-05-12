"use client"

import { useState } from "react"
import Link from "next/link"
import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { ArrowDown, ArrowUp, Download, Filter, MoreHorizontal, Plus, Search } from "lucide-react"

export default function OrdersPage() {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  // Mock data for orders
  const orders = [
    { id: "ORD-12345", customer: "John Smith", date: "May 11, 2025", items: 3, total: "$156.99", status: "Delivered" },
    {
      id: "ORD-12346",
      customer: "Sarah Williams",
      date: "May 11, 2025",
      items: 2,
      total: "$89.50",
      status: "In Transit",
    },
    {
      id: "ORD-12347",
      customer: "Robert Brown",
      date: "May 10, 2025",
      items: 1,
      total: "$45.99",
      status: "Out for Delivery",
    },
    {
      id: "ORD-12348",
      customer: "Emily Davis",
      date: "May 10, 2025",
      items: 4,
      total: "$210.75",
      status: "Processing",
    },
    {
      id: "ORD-12349",
      customer: "Michael Miller",
      date: "May 9, 2025",
      items: 2,
      total: "$78.25",
      status: "Processing",
    },
    {
      id: "ORD-12350",
      customer: "Jessica Wilson",
      date: "May 9, 2025",
      items: 3,
      total: "$125.50",
      status: "Delivered",
    },
    { id: "ORD-12351", customer: "David Moore", date: "May 8, 2025", items: 1, total: "$35.99", status: "Delivered" },
    {
      id: "ORD-12352",
      customer: "Jennifer Taylor",
      date: "May 8, 2025",
      items: 5,
      total: "$245.75",
      status: "Delivered",
    },
    {
      id: "ORD-12353",
      customer: "Christopher Anderson",
      date: "May 7, 2025",
      items: 2,
      total: "$95.50",
      status: "Delivered",
    },
    {
      id: "ORD-12354",
      customer: "Amanda Thomas",
      date: "May 7, 2025",
      items: 3,
      total: "$145.25",
      status: "Delivered",
    },
  ]

  const toggleSort = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc")
  }

  return (
    <MainLayout userRole="admin" userName="Admin User">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
            <p className="text-muted-foreground">Manage and track all customer orders in the system.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild>
              <Link href="/admin/orders/new">
                <Plus className="mr-2 h-4 w-4" />
                New Order
              </Link>
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex w-full items-center space-x-2 md:w-1/3">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search orders..." className="w-full pl-8" />
            </div>
          </div>

          <div className="flex flex-1 items-center space-x-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="in-transit">In Transit</SelectItem>
                <SelectItem value="out-for-delivery">Out for Delivery</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="failed">Failed Delivery</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>

            <Button variant="outline" size="icon" onClick={toggleSort}>
              {sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
              <span className="sr-only">Sort</span>
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-center">Items</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    <Link href={`/admin/orders/${order.id}`} className="text-primary hover:underline">
                      {order.id}
                    </Link>
                  </TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell className="text-center">{order.items}</TableCell>
                  <TableCell className="text-right">{order.total}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "In Transit"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "Out for Delivery"
                              ? "bg-purple-100 text-purple-800"
                              : order.status === "Processing"
                                ? "bg-gray-100 text-gray-800"
                                : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/orders/${order.id}`}>View Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit Order</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Assign Driver</DropdownMenuItem>
                        <DropdownMenuItem>Print Label</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Cancel Order</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <strong>1</strong> to <strong>10</strong> of <strong>100</strong> results
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </MainLayout>
  )
}
