"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Truck,
  Package,
  Route,
  Clock,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Calendar,
  Download,
  TrendingUp,
  BarChart3,
  CreditCard,
  Building,
  User,
} from "lucide-react"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Driver navigation items
const driverNavItems = [
  { title: "Assignments", href: "/driver/assignments", icon: <Truck className="h-4 w-4 mr-2" /> },
  { title: "Status Updates", href: "/driver/status", icon: <Clock className="h-4 w-4 mr-2" /> },
  { title: "Proof of Delivery", href: "/driver/pod", icon: <CheckCircle2 className="h-4 w-4 mr-2" /> },
  { title: "Report Issue", href: "/driver/issues", icon: <AlertTriangle className="h-4 w-4 mr-2" /> },
  { title: "Earnings", href: "/driver/earnings", icon: <DollarSign className="h-4 w-4 mr-2" /> },
]

// Mock earnings data
const earningsData = [
  {
    id: "PAY-001",
    period: "May 1-15, 2023",
    deliveries: 87,
    amount: 1245.5,
    status: "Paid",
    date: "May 20, 2023",
  },
  {
    id: "PAY-002",
    period: "May 16-31, 2023",
    deliveries: 92,
    amount: 1320.75,
    status: "Paid",
    date: "Jun 5, 2023",
  },
  {
    id: "PAY-003",
    period: "Jun 1-15, 2023",
    deliveries: 78,
    amount: 1105.25,
    status: "Processing",
    date: "Jun 20, 2023",
  },
  {
    id: "PAY-004",
    period: "Jun 16-30, 2023",
    deliveries: 85,
    amount: 1215.0,
    status: "Pending",
    date: "Jul 5, 2023",
  },
]

// Mock delivery data
const deliveryData = [
  {
    id: "DEL-001",
    orderId: "ORD-7829",
    date: "Jun 10, 2023",
    packages: 3,
    distance: 12.5,
    earnings: 18.75,
    bonus: 5.0,
    total: 23.75,
  },
  {
    id: "DEL-002",
    orderId: "ORD-7845",
    date: "Jun 10, 2023",
    packages: 1,
    distance: 5.2,
    earnings: 7.8,
    bonus: 0.0,
    total: 7.8,
  },
  {
    id: "DEL-003",
    orderId: "ORD-7862",
    date: "Jun 11, 2023",
    packages: 2,
    distance: 8.7,
    earnings: 13.05,
    bonus: 0.0,
    total: 13.05,
  },
  {
    id: "DEL-004",
    orderId: "ORD-7890",
    date: "Jun 11, 2023",
    packages: 4,
    distance: 15.3,
    earnings: 22.95,
    bonus: 10.0,
    total: 32.95,
  },
  {
    id: "DEL-005",
    orderId: "ORD-7912",
    date: "Jun 12, 2023",
    packages: 2,
    distance: 7.8,
    earnings: 11.7,
    bonus: 0.0,
    total: 11.7,
  },
]

export default function DriverEarningsPage() {
  const [periodFilter, setPeriodFilter] = useState("current")
  const { toast } = useToast()
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)

  // Payment information state
  const [paymentInfo, setPaymentInfo] = useState({
    paymentMethod: "directDeposit",
    accountName: "John Driver",
    accountNumber: "****1234",
    routingNumber: "****5678",
    bankName: "First National Bank",
    paymentSchedule: "biweekly",
  })

  // New payment information state
  const [newPaymentInfo, setNewPaymentInfo] = useState({
    paymentMethod: "directDeposit",
    accountName: "",
    accountNumber: "",
    routingNumber: "",
    bankName: "",
    paymentSchedule: "biweekly",
  })

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setNewPaymentInfo((prev) => ({ ...prev, [id]: value }))
  }

  // Handle radio group changes
  const handleRadioChange = (field: string, value: string) => {
    setNewPaymentInfo((prev) => ({ ...prev, [field]: value }))
  }

  // Submit payment information update
  const handleUpdatePayment = () => {
    // Validate form based on payment method
    if (newPaymentInfo.paymentMethod === "directDeposit") {
      if (
        !newPaymentInfo.accountName ||
        !newPaymentInfo.accountNumber ||
        !newPaymentInfo.routingNumber ||
        !newPaymentInfo.bankName
      ) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields for direct deposit.",
          variant: "destructive",
        })
        return
      }
    }

    // Update payment information
    setPaymentInfo({
      ...newPaymentInfo,
      accountNumber: newPaymentInfo.accountNumber
        ? "****" + newPaymentInfo.accountNumber.slice(-4)
        : paymentInfo.accountNumber,
      routingNumber: newPaymentInfo.routingNumber
        ? "****" + newPaymentInfo.routingNumber.slice(-4)
        : paymentInfo.routingNumber,
    })

    // Show success message
    toast({
      title: "Payment Information Updated",
      description: "Your payment information has been successfully updated.",
    })

    // Reset form and close dialog
    setNewPaymentInfo({
      paymentMethod: "directDeposit",
      accountName: "",
      accountNumber: "",
      routingNumber: "",
      bankName: "",
      paymentSchedule: "biweekly",
    })
    setIsPaymentDialogOpen(false)
  }

  // Calculate earnings summary
  const totalEarnings = deliveryData.reduce((sum, delivery) => sum + delivery.total, 0)
  const totalDeliveries = deliveryData.length
  const totalDistance = deliveryData.reduce((sum, delivery) => sum + delivery.distance, 0)
  const totalPackages = deliveryData.reduce((sum, delivery) => sum + delivery.packages, 0)
  const averagePerDelivery = totalEarnings / totalDeliveries

  // Function to get badge color based on status
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Paid
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Processing
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <DashboardLayout navItems={driverNavItems} userType="driver">
      <div className="container py-6">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Earnings</h1>
            <p className="text-muted-foreground">Track your delivery earnings and payment history</p>
          </div>
          <div className="flex gap-2">
            <Select value={periodFilter} onValueChange={setPeriodFilter}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Select period" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current Period</SelectItem>
                <SelectItem value="last-week">Last Week</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                <SelectItem value="year-to-date">Year to Date</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalEarnings.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Current period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Deliveries</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDeliveries}</div>
              <p className="text-xs text-muted-foreground">{totalPackages} packages delivered</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Distance</CardTitle>
              <Route className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDistance.toFixed(1)} mi</div>
              <p className="text-xs text-muted-foreground">Total distance traveled</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Per Delivery</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${averagePerDelivery.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Excluding bonuses</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="deliveries">
          <TabsList>
            <TabsTrigger value="deliveries">Deliveries</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="deliveries" className="mt-6">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Delivery ID</TableHead>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="hidden md:table-cell">Packages</TableHead>
                    <TableHead className="hidden md:table-cell">Distance</TableHead>
                    <TableHead>Base Pay</TableHead>
                    <TableHead>Bonus</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deliveryData.map((delivery) => (
                    <TableRow key={delivery.id}>
                      <TableCell className="font-medium">{delivery.id}</TableCell>
                      <TableCell>{delivery.orderId}</TableCell>
                      <TableCell>{delivery.date}</TableCell>
                      <TableCell className="hidden md:table-cell">{delivery.packages}</TableCell>
                      <TableCell className="hidden md:table-cell">{delivery.distance} mi</TableCell>
                      <TableCell>${delivery.earnings.toFixed(2)}</TableCell>
                      <TableCell>${delivery.bonus.toFixed(2)}</TableCell>
                      <TableCell className="font-medium">${delivery.total.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="payments" className="mt-6">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead className="hidden md:table-cell">Deliveries</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {earningsData.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>{payment.period}</TableCell>
                      <TableCell className="hidden md:table-cell">{payment.deliveries}</TableCell>
                      <TableCell>${payment.amount.toFixed(2)}</TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell className="hidden md:table-cell">{payment.date}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Earnings Trend</CardTitle>
                  <CardDescription>Your earnings over the last 30 days</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Earnings trend chart</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Earnings Breakdown</CardTitle>
                  <CardDescription>Distribution of your earnings</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Earnings breakdown chart</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>Your payment method and schedule</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Payment Method</h3>
                <p className="text-sm">
                  {paymentInfo.paymentMethod === "directDeposit"
                    ? `Direct Deposit to ${paymentInfo.bankName} Account ending in ${paymentInfo.accountNumber}`
                    : "Payment Card"}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Payment Schedule</h3>
                <p className="text-sm">
                  {paymentInfo.paymentSchedule === "biweekly"
                    ? "Bi-weekly payments, processed every other Friday"
                    : paymentInfo.paymentSchedule === "weekly"
                      ? "Weekly payments, processed every Friday"
                      : "Monthly payments, processed on the 1st of each month"}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Next Payment</h3>
                <p className="text-sm">July 5, 2023 (Estimated: $1,215.00)</p>
              </div>
            </CardContent>
            <CardFooter>
              <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" onClick={() => setIsPaymentDialogOpen(true)}>
                    Update Payment Information
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Update Payment Information</DialogTitle>
                    <DialogDescription>Update your payment method and schedule preferences.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label>Payment Method</Label>
                      <RadioGroup
                        defaultValue={newPaymentInfo.paymentMethod}
                        onValueChange={(value) => handleRadioChange("paymentMethod", value)}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="directDeposit" id="directDeposit" />
                          <Label htmlFor="directDeposit" className="flex items-center">
                            <Building className="mr-2 h-4 w-4" />
                            Direct Deposit
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="paymentCard" id="paymentCard" />
                          <Label htmlFor="paymentCard" className="flex items-center">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Payment Card
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {newPaymentInfo.paymentMethod === "directDeposit" && (
                      <>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="accountName" className="text-right">
                            Account Name
                          </Label>
                          <Input
                            id="accountName"
                            placeholder="Full name on account"
                            className="col-span-3"
                            value={newPaymentInfo.accountName}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="accountNumber" className="text-right">
                            Account Number
                          </Label>
                          <Input
                            id="accountNumber"
                            placeholder="Account number"
                            className="col-span-3"
                            value={newPaymentInfo.accountNumber}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="routingNumber" className="text-right">
                            Routing Number
                          </Label>
                          <Input
                            id="routingNumber"
                            placeholder="Routing number"
                            className="col-span-3"
                            value={newPaymentInfo.routingNumber}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="bankName" className="text-right">
                            Bank Name
                          </Label>
                          <Input
                            id="bankName"
                            placeholder="Bank name"
                            className="col-span-3"
                            value={newPaymentInfo.bankName}
                            onChange={handleInputChange}
                          />
                        </div>
                      </>
                    )}

                    {newPaymentInfo.paymentMethod === "paymentCard" && (
                      <div className="flex items-center justify-center p-4">
                        <div className="text-center">
                          <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">To set up a payment card, please contact support.</p>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Payment Schedule</Label>
                      <RadioGroup
                        defaultValue={newPaymentInfo.paymentSchedule}
                        onValueChange={(value) => handleRadioChange("paymentSchedule", value)}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="weekly" id="weekly" />
                          <Label htmlFor="weekly">Weekly</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="biweekly" id="biweekly" />
                          <Label htmlFor="biweekly">Bi-weekly</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="monthly" id="monthly" />
                          <Label htmlFor="monthly">Monthly</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleUpdatePayment}>
                      Save Changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
