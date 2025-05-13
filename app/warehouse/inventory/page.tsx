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
  Warehouse,
  Package,
  Truck,
  ScanLine,
  AlertTriangle,
  Search,
  MoreHorizontal,
  Filter,
  Plus,
  ArrowUpDown,
  Download,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Warehouse navigation items
const warehouseNavItems = [
  { title: "Home", href: "/warehouse/home", icon: <Warehouse className="h-4 w-4 mr-2" /> },
  { title: "Scan Packages", href: "/warehouse/scan", icon: <ScanLine className="h-4 w-4 mr-2" /> },
  { title: "Upcoming Pickups", href: "/warehouse/pickups", icon: <Truck className="h-4 w-4 mr-2" /> },
  { title: "Inventory Status", href: "/warehouse/inventory", icon: <Package className="h-4 w-4 mr-2" /> },
  { title: "Issues", href: "/warehouse/issues", icon: <AlertTriangle className="h-4 w-4 mr-2" /> },
]

// Mock inventory data
const inventoryItems = [
  {
    id: "INV-001",
    name: "Small Shipping Boxes",
    category: "Packaging",
    location: "Warehouse A, Shelf 1",
    quantity: 245,
    minQuantity: 100,
    status: "In Stock",
    lastUpdated: "2023-06-10",
  },
  {
    id: "INV-002",
    name: "Medium Shipping Boxes",
    category: "Packaging",
    location: "Warehouse A, Shelf 2",
    quantity: 180,
    minQuantity: 75,
    status: "In Stock",
    lastUpdated: "2023-06-09",
  },
  {
    id: "INV-003",
    name: "Large Shipping Boxes",
    category: "Packaging",
    location: "Warehouse A, Shelf 3",
    quantity: 120,
    minQuantity: 50,
    status: "In Stock",
    lastUpdated: "2023-06-08",
  },
  {
    id: "INV-004",
    name: "Packing Tape",
    category: "Supplies",
    location: "Warehouse B, Shelf 1",
    quantity: 32,
    minQuantity: 30,
    status: "Low Stock",
    lastUpdated: "2023-06-10",
  },
  {
    id: "INV-005",
    name: "Bubble Wrap",
    category: "Packaging",
    location: "Warehouse B, Shelf 2",
    quantity: 15,
    minQuantity: 20,
    status: "Low Stock",
    lastUpdated: "2023-06-09",
  },
  {
    id: "INV-006",
    name: "Shipping Labels",
    category: "Supplies",
    location: "Warehouse B, Shelf 3",
    quantity: 500,
    minQuantity: 200,
    status: "In Stock",
    lastUpdated: "2023-06-07",
  },
  {
    id: "INV-007",
    name: "Thermal Printer Paper",
    category: "Supplies",
    location: "Warehouse B, Shelf 4",
    quantity: 12,
    minQuantity: 15,
    status: "Low Stock",
    lastUpdated: "2023-06-06",
  },
  {
    id: "INV-008",
    name: "Hand Trucks",
    category: "Equipment",
    location: "Warehouse C, Area 1",
    quantity: 8,
    minQuantity: 5,
    status: "In Stock",
    lastUpdated: "2023-06-05",
  },
]

export default function WarehouseInventoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [sortField, setSortField] = useState<keyof (typeof inventoryItems)[0]>("name")

  // Filter inventory items based on search query, category filter, and status filter
  const filteredItems = inventoryItems
    .filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = categoryFilter === "all" || item.category.toLowerCase() === categoryFilter.toLowerCase()
      const matchesStatus = statusFilter === "all" || item.status.toLowerCase() === statusFilter.toLowerCase()

      return matchesSearch && matchesCategory && matchesStatus
    })
    .sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      return 0
    })

  // Function to get badge color based on status
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "in stock":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            In Stock
          </Badge>
        )
      case "low stock":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Low Stock
          </Badge>
        )
      case "out of stock":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Out of Stock
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Function to handle sorting
  const handleSort = (field: keyof (typeof inventoryItems)[0]) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
  }

  // Calculate inventory statistics
  const totalItems = inventoryItems.reduce((sum, item) => sum + item.quantity, 0)
  const lowStockItems = inventoryItems.filter((item) => item.status === "Low Stock").length
  const outOfStockItems = inventoryItems.filter((item) => item.status === "Out of Stock").length

  return (
    <DashboardLayout navItems={warehouseNavItems} userType="warehouse">
      <div className="container py-6">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inventory Status</h1>
            <p className="text-muted-foreground">Manage and track warehouse inventory</p>
          </div>
          <div className="flex gap-2">
            <Link href="/warehouse/inventory/add">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </Link>
            <Link href="/warehouse/scan">
              <Button variant="outline">
                <ScanLine className="mr-2 h-4 w-4" />
                Scan Items
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalItems.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Items in inventory</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lowStockItems}</div>
              <p className="text-xs text-muted-foreground">Need reordering soon</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{outOfStockItems}</div>
              <p className="text-xs text-muted-foreground">Items completely depleted</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search inventory..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[150px]">
                  <div className="flex items-center">
                    <Package className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Category" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="packaging">Packaging</SelectItem>
                  <SelectItem value="supplies">Supplies</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="in stock">In Stock</SelectItem>
                  <SelectItem value="low stock">Low Stock</SelectItem>
                  <SelectItem value="out of stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => handleSort("id")}>
                      Item ID
                      {sortField === "id" && (
                        <ArrowUpDown className={`ml-2 h-4 w-4 ${sortOrder === "desc" ? "rotate-180" : ""}`} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => handleSort("name")}>
                      Name
                      {sortField === "name" && (
                        <ArrowUpDown className={`ml-2 h-4 w-4 ${sortOrder === "desc" ? "rotate-180" : ""}`} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    <div className="flex items-center cursor-pointer" onClick={() => handleSort("category")}>
                      Category
                      {sortField === "category" && (
                        <ArrowUpDown className={`ml-2 h-4 w-4 ${sortOrder === "desc" ? "rotate-180" : ""}`} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">Location</TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => handleSort("quantity")}>
                      Quantity
                      {sortField === "quantity" && (
                        <ArrowUpDown className={`ml-2 h-4 w-4 ${sortOrder === "desc" ? "rotate-180" : ""}`} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{item.category}</TableCell>
                    <TableCell className="hidden lg:table-cell">{item.location}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="mr-2">{item.quantity}</span>
                        <Progress
                          value={(item.quantity / item.minQuantity) * 100}
                          className="h-2 w-16"
                          indicatorClassName={
                            item.quantity < item.minQuantity
                              ? "bg-red-500"
                              : item.quantity < item.minQuantity * 1.5
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }
                        />
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
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
                          <DropdownMenuItem>Update quantity</DropdownMenuItem>
                          <DropdownMenuItem>Move location</DropdownMenuItem>
                          <DropdownMenuItem>Request restock</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredItems.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No inventory items found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
