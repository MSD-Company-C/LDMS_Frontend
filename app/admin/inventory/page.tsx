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
  Filter,
  ScanLine,
  Download,
  RefreshCw,
  ArrowUpDown,
  Boxes,
  DollarSign,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExportCSV } from "@/components/export-csv"

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
  {
    id: "INV-009",
    name: "Pallet Jacks",
    category: "Equipment",
    location: "Warehouse C, Area 2",
    quantity: 4,
    minQuantity: 3,
    status: "In Stock",
    lastUpdated: "2023-06-04",
  },
  {
    id: "INV-010",
    name: "Safety Vests",
    category: "Safety",
    location: "Warehouse C, Area 3",
    quantity: 25,
    minQuantity: 10,
    status: "In Stock",
    lastUpdated: "2023-06-03",
  },
]

// Mock warehouse locations
const warehouseLocations = [
  { id: "WH-A", name: "Warehouse A", address: "123 Main St, New York, NY", items: 545, capacity: 75 },
  { id: "WH-B", name: "Warehouse B", address: "456 Park Ave, New York, NY", items: 1059, capacity: 90 },
  { id: "WH-C", name: "Warehouse C", address: "789 Broadway, New York, NY", items: 327, capacity: 45 },
]

export default function InventoryPage() {
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

  return (
    <DashboardLayout navItems={adminNavItems} userType="admin">
      <div className="container py-6">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
            <p className="text-muted-foreground">Track and manage your inventory across all warehouses</p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/inventory/add">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </Link>
            <Link href="/admin/inventory/scan">
              <Button variant="outline">
                <ScanLine className="mr-2 h-4 w-4" />
                Scan Items
              </Button>
            </Link>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Tabs defaultValue="items">
          <TabsList>
            <TabsTrigger value="items">Inventory Items</TabsTrigger>
            <TabsTrigger value="warehouses">Warehouses</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="items" className="mt-6">
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
                    <SelectItem value="safety">Safety</SelectItem>
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
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-6">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <ExportCSV data={inventoryItems} filename="inventory-export.csv" buttonText="Export Inventory" />
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
                            className={`h-2 w-16 ${
                              item.quantity < item.minQuantity
                                ? "bg-red-500"
                                : item.quantity < item.minQuantity * 1.5
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                            }`}
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
                            <DropdownMenuItem>Edit item</DropdownMenuItem>
                            <DropdownMenuItem>Update quantity</DropdownMenuItem>
                            <DropdownMenuItem>Move location</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete item</DropdownMenuItem>
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
          </TabsContent>

          <TabsContent value="warehouses" className="mt-6">
            <div className="grid gap-6 md:grid-cols-3">
              {warehouseLocations.map((warehouse) => (
                <Card key={warehouse.id} className="dashboard-card">
                  <CardHeader>
                    <CardTitle>{warehouse.name}</CardTitle>
                    <CardDescription>{warehouse.address}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Capacity Usage</span>
                        <span className="text-sm">{warehouse.capacity}%</span>
                      </div>
                      <Progress value={warehouse.capacity} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Items:</span>
                      <span className="font-medium">{warehouse.items}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <Warehouse className="mr-2 h-4 w-4" />
                      View Warehouse
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Warehouse Inventory Distribution</CardTitle>
                <CardDescription>Overview of inventory across warehouses</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <Boxes className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Inventory distribution chart</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Items</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,931</div>
                  <p className="text-xs text-muted-foreground">Across all warehouses</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">Need reordering soon</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$42,580</div>
                  <p className="text-xs text-muted-foreground">Total value of inventory</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Turnover Rate</CardTitle>
                  <RefreshCw className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12.4</div>
                  <p className="text-xs text-muted-foreground">Average turns per year</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Trends</CardTitle>
                  <CardDescription>6-month inventory level history</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Inventory trends chart</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Category Distribution</CardTitle>
                  <CardDescription>Inventory by category</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <Boxes className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Category distribution chart</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
