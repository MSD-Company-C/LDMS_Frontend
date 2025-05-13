"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Scanner } from "@/components/scanner"
import { Warehouse, Package, Truck, ScanLine, AlertTriangle, Search, ArrowRight, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Warehouse navigation items
const warehouseNavItems = [
  { title: "Home", href: "/warehouse/home", icon: <Warehouse className="h-4 w-4 mr-2" /> },
  { title: "Scan Packages", href: "/warehouse/scan", icon: <ScanLine className="h-4 w-4 mr-2" /> },
  { title: "Upcoming Pickups", href: "/warehouse/pickups", icon: <Truck className="h-4 w-4 mr-2" /> },
  { title: "Inventory Status", href: "/warehouse/inventory", icon: <Package className="h-4 w-4 mr-2" /> },
  { title: "Issues", href: "/warehouse/issues", icon: <AlertTriangle className="h-4 w-4 mr-2" /> },
]

// Mock package data for search
const packageData = [
  { id: "PKG-001", orderId: "ORD-7829", status: "Ready for Pickup", destination: "123 Main St, Anytown" },
  { id: "PKG-002", orderId: "ORD-7845", status: "Processing", destination: "456 Oak Ave, Somewhere" },
  { id: "PKG-003", orderId: "ORD-7862", status: "Delivered", destination: "789 Pine Rd, Elsewhere" },
  { id: "PKG-004", orderId: "ORD-7890", status: "In Transit", destination: "101 Maple Dr, Nowhere" },
  { id: "PKG-005", orderId: "ORD-7912", status: "Ready for Pickup", destination: "202 Cedar Ln, Anywhere" },
]

export default function ScanPackagesPage() {
  const { toast } = useToast()
  const [recentScans, setRecentScans] = useState<
    Array<{
      id: string
      timestamp: string
      status: "success" | "error"
      message: string
    }>
  >([])

  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false)
  const [isManualDialogOpen, setIsManualDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof packageData>([])

  // Manual entry form state
  const [manualEntry, setManualEntry] = useState({
    packageId: "",
    orderId: "",
    destination: "",
    notes: "",
    status: "ready",
  })

  // Handle search
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }

    const results = packageData.filter(
      (pkg) =>
        pkg.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.destination.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    setSearchResults(results)

    if (results.length === 0) {
      toast({
        title: "No Results",
        description: "No packages found matching your search criteria.",
        variant: "destructive",
      })
    }
  }

  // Handle manual entry form changes
  const handleManualEntryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setManualEntry((prev) => ({ ...prev, [id]: value }))
  }

  // Handle status selection
  const handleStatusChange = (value: string) => {
    setManualEntry((prev) => ({ ...prev, status: value }))
  }

  // Submit manual entry
  const handleManualEntrySubmit = () => {
    // Validate form
    if (!manualEntry.packageId || !manualEntry.orderId) {
      toast({
        title: "Missing Information",
        description: "Package ID and Order ID are required.",
        variant: "destructive",
      })
      return
    }

    // Add to recent scans
    const newScan = {
      id: manualEntry.packageId,
      timestamp: new Date().toLocaleTimeString(),
      status: "success",
      message: "Package manually entered and marked ready for dispatch",
    }

    setRecentScans((prev) => [newScan, ...prev].slice(0, 10))

    // Show success message
    toast({
      title: "Package Added",
      description: `Package ${manualEntry.packageId} has been manually added to the system.`,
    })

    // Reset form and close dialog
    setManualEntry({
      packageId: "",
      orderId: "",
      destination: "",
      notes: "",
      status: "ready",
    })
    setIsManualDialogOpen(false)
  }

  // Function to handle barcode scan
  const handleScan = (code: string) => {
    // Generate random success/error for demo
    const isSuccess = Math.random() > 0.2

    const newScan = {
      id: code,
      timestamp: new Date().toLocaleTimeString(),
      status: isSuccess ? "success" : "error",
      message: isSuccess ? "Package marked ready for dispatch" : "Package not found in system",
    }

    setRecentScans((prev) => [newScan, ...prev].slice(0, 10))

    toast({
      title: isSuccess ? "Package Scanned Successfully" : "Scan Error",
      description: newScan.message,
      variant: isSuccess ? "default" : "destructive",
    })
  }

  // Handle selecting a package from search results
  const handleSelectPackage = (pkg: (typeof packageData)[0]) => {
    const newScan = {
      id: pkg.id,
      timestamp: new Date().toLocaleTimeString(),
      status: "success",
      message: `Package ${pkg.id} found and marked ready for dispatch`,
    }

    setRecentScans((prev) => [newScan, ...prev].slice(0, 10))

    toast({
      title: "Package Found",
      description: `Package ${pkg.id} has been marked ready for dispatch.`,
    })

    setSearchQuery("")
    setSearchResults([])
    setIsSearchDialogOpen(false)
  }

  return (
    <DashboardLayout navItems={warehouseNavItems} userType="warehouse">
      <div className="container py-6">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Scan Packages</h1>
            <p className="text-muted-foreground">Scan package barcodes to mark them as ready for dispatch</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Log
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="dashboard-card">
            <CardHeader className="bg-primary/5">
              <CardTitle>Barcode Scanner</CardTitle>
              <CardDescription>Scan package barcode or enter it manually</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Scanner onScan={handleScan} />
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Dialog open={isSearchDialogOpen} onOpenChange={setIsSearchDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full" onClick={() => setIsSearchDialogOpen(true)}>
                    <Search className="mr-2 h-4 w-4" />
                    Search Package
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Search Packages</DialogTitle>
                    <DialogDescription>Search for packages by ID, order number, or destination.</DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                      <Label htmlFor="search" className="sr-only">
                        Search
                      </Label>
                      <Input
                        id="search"
                        placeholder="Enter package ID, order number, or destination"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button type="submit" size="sm" onClick={handleSearch}>
                      Search
                    </Button>
                  </div>

                  <div className="mt-4 max-h-[300px] overflow-auto">
                    {searchResults.length > 0 ? (
                      <div className="space-y-4">
                        {searchResults.map((pkg) => (
                          <div
                            key={pkg.id}
                            className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{pkg.id}</p>
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                  {pkg.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{pkg.orderId}</p>
                              <p className="text-sm text-muted-foreground">{pkg.destination}</p>
                            </div>
                            <Button size="sm" onClick={() => handleSelectPackage(pkg)}>
                              Select
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : searchQuery ? (
                      <div className="flex flex-col items-center justify-center py-8">
                        <Package className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground text-center">No packages found</p>
                        <p className="text-sm text-muted-foreground text-center mt-1">Try a different search term</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8">
                        <Search className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground text-center">Enter search terms</p>
                        <p className="text-sm text-muted-foreground text-center mt-1">
                          Search results will appear here
                        </p>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={isManualDialogOpen} onOpenChange={setIsManualDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full" onClick={() => setIsManualDialogOpen(true)}>
                    <Package className="mr-2 h-4 w-4" />
                    Manual Entry
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Manual Package Entry</DialogTitle>
                    <DialogDescription>Enter package details manually to add to the system.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="packageId" className="text-right">
                        Package ID
                      </Label>
                      <Input
                        id="packageId"
                        placeholder="e.g. PKG-001"
                        className="col-span-3"
                        value={manualEntry.packageId}
                        onChange={handleManualEntryChange}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="orderId" className="text-right">
                        Order ID
                      </Label>
                      <Input
                        id="orderId"
                        placeholder="e.g. ORD-7829"
                        className="col-span-3"
                        value={manualEntry.orderId}
                        onChange={handleManualEntryChange}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="destination" className="text-right">
                        Destination
                      </Label>
                      <Input
                        id="destination"
                        placeholder="Delivery address"
                        className="col-span-3"
                        value={manualEntry.destination}
                        onChange={handleManualEntryChange}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="status" className="text-right">
                        Status
                      </Label>
                      <Select value={manualEntry.status} onValueChange={handleStatusChange}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ready">Ready for Pickup</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="transit">In Transit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label htmlFor="notes" className="text-right pt-2">
                        Notes
                      </Label>
                      <Textarea
                        id="notes"
                        placeholder="Additional notes"
                        className="col-span-3"
                        rows={3}
                        value={manualEntry.notes}
                        onChange={handleManualEntryChange}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleManualEntrySubmit}>
                      Add Package
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="bg-primary/5">
              <CardTitle>Recent Scans</CardTitle>
              <CardDescription>History of recently scanned packages</CardDescription>
            </CardHeader>
            <CardContent>
              {recentScans.length > 0 ? (
                <div className="space-y-4">
                  {recentScans.map((scan, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{scan.id}</p>
                          {scan.status === "success" ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Success
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                              Error
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{scan.message}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{scan.timestamp}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <Package className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">No recent scans</p>
                  <p className="text-sm text-muted-foreground text-center mt-1">Scanned packages will appear here</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Link href="/warehouse/inventory" className="w-full">
                <Button variant="outline" className="w-full">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  View All Packages
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <Card className="mt-6 dashboard-card">
          <CardHeader className="bg-primary/5">
            <CardTitle>Scanning Instructions</CardTitle>
            <CardDescription>How to properly scan and process packages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    1
                  </div>
                  <h3 className="font-medium">Verify Package</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Check that the package is undamaged and properly sealed before scanning.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    2
                  </div>
                  <h3 className="font-medium">Scan Barcode</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Position the barcode in the scanner's view or enter the code manually.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    3
                  </div>
                  <h3 className="font-medium">Place in Correct Area</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  After scanning, place the package in the designated dispatch area for pickup.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
