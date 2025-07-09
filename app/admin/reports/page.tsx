"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Package,
  Truck,
  Users,
  AlertTriangle,
  CheckCircle2,
  FileBarChart,
  Warehouse,
  CalendarIcon,
  Download,
  LineChart,
  PieChart,
  BarChart,
  ArrowRight,
  RefreshCw,
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

export default function ReportsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [reportType, setReportType] = useState("delivery-performance")
  const [isGenerating, setIsGenerating] = useState(false)
  const [reportGenerated, setReportGenerated] = useState(false)

  const handleGenerateReport = () => {
    setIsGenerating(true)

    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)
      setReportGenerated(true)
    }, 2000)
  }

  return (
    <DashboardLayout navItems={adminNavItems} userType="admin">
      <div className="container py-6">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
            <p className="text-muted-foreground">Generate and analyze logistics performance reports</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader className="bg-primary/5">
                <CardTitle>Report Generator</CardTitle>
                <CardDescription>Configure and generate reports</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Report Type</label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="delivery-performance">Delivery Performance</SelectItem>
                      <SelectItem value="driver-efficiency">Driver Efficiency</SelectItem>
                      <SelectItem value="customer-satisfaction">Customer Satisfaction</SelectItem>
                      <SelectItem value="inventory-status">Inventory Status</SelectItem>
                      <SelectItem value="financial-summary">Financial Summary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>From date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          <span>To date</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Format</label>
                  <Select defaultValue="pdf">
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                      <SelectItem value="csv">CSV File</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleGenerateReport} disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <FileBarChart className="mr-2 h-4 w-4" />
                      Generate Report
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card
              className={cn(
                "transition-opacity duration-300",
                reportGenerated ? "opacity-100" : "opacity-50 pointer-events-none",
              )}
            >
              <CardHeader>
                <CardTitle>Download Report</CardTitle>
                <CardDescription>Your generated report is ready</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between border rounded-md p-3">
                  <div className="flex items-center">
                    <FileBarChart className="h-8 w-8 text-primary mr-3" />
                    <div>
                      <p className="font-medium">Delivery_Performance_Report.pdf</p>
                      <p className="text-xs text-muted-foreground">Generated on {format(new Date(), "PPP")}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline" className="flex-1">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader className="bg-primary/5">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Analytics Dashboard</CardTitle>
                    <CardDescription>Key performance metrics and trends</CardDescription>
                  </div>
                  <Tabs defaultValue="chart" className="w-[200px]">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="chart">
                        <LineChart className="h-4 w-4" />
                      </TabsTrigger>
                      <TabsTrigger value="bar">
                        <BarChart className="h-4 w-4" />
                      </TabsTrigger>
                      <TabsTrigger value="pie">
                        <PieChart className="h-4 w-4" />
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="aspect-[16/9] bg-muted/20 flex items-center justify-center">
                  <img src="/placeholder.svg?height=400&width=800" alt="Analytics Chart" className="w-full h-auto" />
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Performance</CardTitle>
                  <CardDescription>On-time delivery metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">On-Time Delivery Rate</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">94.2%</p>
                        <p className="text-xs text-green-500">+2.1% from last month</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Average Delivery Time</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">32 minutes</p>
                        <p className="text-xs text-green-500">-3 min from last month</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Failed Deliveries</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">3.2%</p>
                        <p className="text-xs text-red-500">+0.5% from last month</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Driver Efficiency</CardTitle>
                  <CardDescription>Driver performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Deliveries per Hour</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">3.8</p>
                        <p className="text-xs text-green-500">+0.3 from last month</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Average Route Efficiency</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">87.5%</p>
                        <p className="text-xs text-green-500">+1.2% from last month</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Fuel Consumption</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">8.2 L/100km</p>
                        <p className="text-xs text-green-500">-0.3 L from last month</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
