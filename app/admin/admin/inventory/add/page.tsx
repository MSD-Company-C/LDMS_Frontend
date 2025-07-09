"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import {
  BarChart3,
  Package,
  Truck,
  Users,
  AlertTriangle,
  CheckCircle2,
  FileBarChart,
  Warehouse,
  ArrowLeft,
  ScanLine,
} from "lucide-react"

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

// Mock warehouse locations
const warehouseLocations = [
  { id: "WH-A", name: "Warehouse A" },
  { id: "WH-B", name: "Warehouse B" },
  { id: "WH-C", name: "Warehouse C" },
]

export default function AddInventoryItemPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("manual")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    sku: "",
    quantity: "",
    minQuantity: "",
    warehouse: "",
    location: "",
    unitPrice: "",
    supplier: "",
    notes: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Inventory Item Added",
        description: `${formData.name} has been added to inventory.`,
      })
      router.push("/admin/inventory")
    }, 1500)
  }

  const handleScan = () => {
    // Simulate scanning process
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Item Scanned",
        description: "Item details retrieved from barcode.",
      })
      setFormData({
        name: "Medium Shipping Box",
        category: "packaging",
        description: "Standard medium shipping box for parcels",
        sku: "BOX-MED-001",
        quantity: "50",
        minQuantity: "20",
        warehouse: "WH-A",
        location: "Shelf A2",
        unitPrice: "1.25",
        supplier: "BoxCo Supplies",
        notes: "Commonly used for medium-sized shipments",
      })
      setActiveTab("manual")
    }, 1500)
  }

  return (
    <DashboardLayout navItems={adminNavItems} userType="admin">
      <div className="container py-6">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.push("/admin/inventory")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Add Inventory Item</h1>
              <p className="text-muted-foreground">Add a new item to your inventory</p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="scan">Scan Barcode</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Import</TabsTrigger>
          </TabsList>

          <TabsContent value="manual">
            <Card>
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle>Item Details</CardTitle>
                  <CardDescription>Enter the details of the new inventory item</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Item Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter item name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">
                        Category <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => handleSelectChange("category", value)}
                        required
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="packaging">Packaging</SelectItem>
                          <SelectItem value="supplies">Supplies</SelectItem>
                          <SelectItem value="equipment">Equipment</SelectItem>
                          <SelectItem value="safety">Safety</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sku">SKU/Item Code</Label>
                      <Input
                        id="sku"
                        name="sku"
                        placeholder="Enter SKU or item code"
                        value={formData.sku}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">
                        Quantity <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="quantity"
                        name="quantity"
                        type="number"
                        placeholder="Enter quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="minQuantity">Minimum Quantity</Label>
                      <Input
                        id="minQuantity"
                        name="minQuantity"
                        type="number"
                        placeholder="Enter minimum quantity"
                        value={formData.minQuantity}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unitPrice">Unit Price ($)</Label>
                      <Input
                        id="unitPrice"
                        name="unitPrice"
                        type="number"
                        step="0.01"
                        placeholder="Enter unit price"
                        value={formData.unitPrice}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="warehouse">
                        Warehouse <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.warehouse}
                        onValueChange={(value) => handleSelectChange("warehouse", value)}
                        required
                      >
                        <SelectTrigger id="warehouse">
                          <SelectValue placeholder="Select warehouse" />
                        </SelectTrigger>
                        <SelectContent>
                          {warehouseLocations.map((warehouse) => (
                            <SelectItem key={warehouse.id} value={warehouse.id}>
                              {warehouse.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location in Warehouse</Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="e.g., Shelf A1, Zone B"
                        value={formData.location}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="supplier">Supplier</Label>
                      <Input
                        id="supplier"
                        name="supplier"
                        placeholder="Enter supplier name"
                        value={formData.supplier}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Enter item description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="Enter any additional notes"
                      value={formData.notes}
                      onChange={handleChange}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => router.push("/admin/inventory")}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Adding..." : "Add Item"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="scan">
            <Card>
              <CardHeader>
                <CardTitle>Scan Barcode</CardTitle>
                <CardDescription>Scan a barcode to automatically add an item</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <div className="mb-8 border-2 border-dashed border-gray-200 rounded-lg p-8 w-full max-w-md flex flex-col items-center">
                  <ScanLine className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-center text-muted-foreground mb-6">Position the barcode within the scanner area</p>
                  <Button onClick={handleScan} disabled={isSubmitting}>
                    {isSubmitting ? "Scanning..." : "Simulate Scan"}
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Supported barcode formats: UPC-A, UPC-E, EAN-8, EAN-13, Code 39, Code 128</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bulk">
            <Card>
              <CardHeader>
                <CardTitle>Bulk Import</CardTitle>
                <CardDescription>Import multiple inventory items at once</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <div className="mb-8 border-2 border-dashed border-gray-200 rounded-lg p-8 w-full max-w-md flex flex-col items-center">
                  <Package className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-center text-muted-foreground mb-6">Drag and drop a CSV file or click to browse</p>
                  <Button variant="outline">Select CSV File</Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2">CSV file should include the following columns:</p>
                  <p>name, category, sku, quantity, min_quantity, warehouse, location, unit_price, supplier</p>
                </div>
                <Button className="mt-6" disabled>
                  Upload and Import
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
