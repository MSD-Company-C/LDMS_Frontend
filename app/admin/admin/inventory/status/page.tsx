"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  Package,
  Truck,
  Users,
  AlertTriangle,
  CheckCircle2,
  FileBarChart,
  Warehouse,
  RefreshCw,
  Download,
  ArrowRight,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

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

// Mock warehouse data
const warehouseData = [
  {
    id: "WH-A",
    name: "Warehouse A",
    address: "123 Main St, New York, NY",
    capacity: 75,
    items: 545,
    lowStockItems: 12,
    outOfStockItems: 3,
  },
  {
    id: "WH-B",
    name: "Warehouse B",
    address: "456 Park Ave, New York, NY",
    capacity: 90,
    items: 1059,
    lowStockItems: 8,
    outOfStockItems: 1,
  },
  {
    id: "WH-C",
    name: "Warehouse C",
    address: "789 Broadway, New York, NY",
    capacity: 45,
    items: 327,
    lowStockItems: 5,
    outOfStockItems: 0,
  },
]

// Mock inventory alerts
const inventoryAlerts = [
  {
    id: "ALT-001",
    itemName: "Small Shipping Boxes",
    warehouse: "Warehouse A",
    type: "Low Stock",
    quantity: 24,
    minQuantity: 100,
    lastUpdated: "2023-06-10",
  },
  {
    id: "ALT-002",
    itemName: "Packing Tape",
    warehouse: "Warehouse B",
    type: "Low Stock",
    quantity: 12,
    minQuantity: 30,
    lastUpdated: "2023-06-10",
  },
  {
    id: "ALT-003",
    itemName: "Bubble Wrap",
    warehouse: "Warehouse B",
    type: "Low Stock",
    quantity: 15,
    minQuantity: 20,
    lastUpdated: "2023-06-09",
  },
  {
    id: "ALT-004",
    itemName: "Thermal Printer Paper",
    warehouse: "Warehouse B",
    type: "Low Stock",
    quantity: 12,
    minQuantity: 15,
    lastUpdated: "2023-06-06",
  },
  {
    id: "ALT-005",
    itemName: "Large Shipping Boxes",
    warehouse: "Warehouse C",
    type: "Out of Stock",
    quantity: 0,
    minQuantity: 50,
    lastUpdated: "2023-06-05",
  },
]

// Mock inventory categories
const inventoryCategories = [
  { name: "Packaging", count: 545, percentage: 28 },
  { name: "Supplies", count: 832, percentage: 43 },
  { name: "Equipment", count: 324, percentage: 17 },
  { name: "Safety", count: 230, percentage: 12 },
]

export default function InventoryStatusPage() {
  const [selectedWarehouse, setSelectedWarehouse] = useState("all")

  // Filter alerts based on selected warehouse
  const filteredAlerts =
    selectedWarehouse === "all"
      ? inventoryAlerts
      : inventoryAlerts.filter((alert) => alert.warehouse === selectedWarehouse)

  // Calculate total inventory metrics
  const totalItems = warehouseData.reduce((sum, warehouse) => sum + warehouse.items, 0)
  const totalLowStock = warehouseData.reduce((sum, warehouse) => sum + warehouse.lowStockItems, 0)
  const totalOutOfStock = warehouseData.reduce((sum, warehouse) => sum + warehouse.outOfStockItems, 0)

  // Function to get alert badge
  const getAlertBadge = (type: string) => {
    switch (type.toLowerCase()) {
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
        return <Badge variant="outline">{type}</Badge>
    }
  }

  return (
    <DashboardLayout navItems={adminNavItems} userType="admin">
      <div className="container py-6">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inventory Status</h1>
            <p className="text-muted-foreground">Overview of inventory levels and alerts across all warehouses</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalItems.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Across all warehouses</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLowStock}</div>
              <p className="text-xs text-muted-foreground">Need reordering soon</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOutOfStock}</div>
              <p className="text-xs text-muted-foreground">Items completely depleted</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Warehouses</CardTitle>
              <Warehouse className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{warehouseData.length}</div>
              <p className="text-xs text-muted-foreground">Active storage locations</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mt-6">
          {warehouseData.map((warehouse) => (
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
                  <Progress
                    value={warehouse.capacity}
                    className="h-2"
                    indicatorClassName={
                      warehouse.capacity > 90
                        ? "bg-red-500"
                        : warehouse.capacity > 75
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Items:</span>
                  <span className="font-medium">{warehouse.items}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Low Stock Items:</span>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    {warehouse.lowStockItems}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Out of Stock Items:</span>
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    {warehouse.outOfStockItems}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setSelectedWarehouse(warehouse.name)}>
                  <Warehouse className="mr-2 h-4 w-4" />
                  View Alerts
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <Tabs defaultValue="alerts">
            <TabsList>
              <TabsTrigger value="alerts">Inventory Alerts</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>
            <TabsContent value="alerts" className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Inventory Alerts{" "}
                  {selectedWarehouse !== "all" && (
                    <span className="text-muted-foreground text-sm ml-2">({selectedWarehouse})</span>
                  )}
                </h2>
                <Button variant="outline" size="sm" onClick={() => setSelectedWarehouse("all")}>
                  View All Warehouses
                </Button>
              </div>

              {filteredAlerts.length > 0 ? (
                <div className="space-y-4">
                  {filteredAlerts.map((alert) => (
                    <Card key={alert.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{alert.itemName}</h3>
                            <p className="text-sm text-muted-foreground">{alert.warehouse}</p>
                          </div>
                          {getAlertBadge(alert.type)}
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Current Quantity</p>
                            <p className="font-medium">{alert.quantity}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Minimum Required</p>
                            <p className="font-medium">{alert.minQuantity}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Last Updated</p>
                            <p className="font-medium">{alert.lastUpdated}</p>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button variant="outline" size="sm">
                            Reorder
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-8">
                    <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
                    <p className="text-muted-foreground text-center">No inventory alerts</p>
                    <p className="text-sm text-muted-foreground text-center mt-1">
                      All items are at adequate stock levels
                    </p>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-end">
                <Link href="/admin/inventory">
                  <Button variant="outline">
                    View All Inventory
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="categories" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Inventory by Category</CardTitle>
                  <CardDescription>Distribution of items across categories</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {inventoryCategories.map((category) => (
                    <div key={category.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{category.name}</span>
                        <span className="text-sm">
                          {category.count} items ({category.percentage}%)
                        </span>
                      </div>
                      <Progress value={category.percentage} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trends" className="mt-4">
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}
