import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatusBadge } from "@/components/status-badge"
import {
  Package,
  Clock,
  MapPin,
  User,
  Calendar,
  AlertTriangle,
  Camera,
  DollarSign,
  CheckCircle2,
  Filter,
  Search,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

// Driver navigation items
const driverNavItems = [
  { title: "Assignments", href: "/driver/assignments", icon: <Package className="h-4 w-4 mr-2" /> },
  { title: "Status Updates", href: "/driver/status", icon: <Clock className="h-4 w-4 mr-2" /> },
  { title: "Proof of Delivery", href: "/driver/pod", icon: <Camera className="h-4 w-4 mr-2" /> },
  { title: "Report Issue", href: "/driver/issues", icon: <AlertTriangle className="h-4 w-4 mr-2" /> },
  { title: "Earnings", href: "/driver/earnings", icon: <DollarSign className="h-4 w-4 mr-2" /> },
]

export default function DriverAssignmentsPage() {
  // Mock data for driver assignments
  const assignments = {
    today: [
      {
        id: "ORD-1234",
        customer: "John Doe",
        address: "123 Main St, New York, NY 10001",
        time: "2:00 PM - 4:00 PM",
        status: "In Transit",
        items: 3,
      },
      {
        id: "ORD-1235",
        customer: "Jane Smith",
        address: "456 Park Ave, New York, NY 10022",
        time: "4:30 PM - 6:30 PM",
        status: "Scheduled",
        items: 2,
      },
    ],
    upcoming: [
      {
        id: "ORD-1236",
        customer: "Robert Johnson",
        address: "789 Broadway, New York, NY 10003",
        time: "Tomorrow, 10:00 AM - 12:00 PM",
        status: "Scheduled",
        items: 1,
      },
      {
        id: "ORD-1237",
        customer: "Emily Davis",
        address: "321 5th Ave, New York, NY 10016",
        time: "Tomorrow, 1:00 PM - 3:00 PM",
        status: "Scheduled",
        items: 4,
      },
      {
        id: "ORD-1238",
        customer: "Michael Wilson",
        address: "654 Madison Ave, New York, NY 10022",
        time: "Tomorrow, 4:00 PM - 6:00 PM",
        status: "Scheduled",
        items: 2,
      },
    ],
    completed: [
      {
        id: "ORD-1230",
        customer: "Sophia Martinez",
        address: "987 Lexington Ave, New York, NY 10021",
        time: "Today, 9:30 AM - 11:30 AM",
        status: "Delivered",
        items: 2,
      },
      {
        id: "ORD-1231",
        customer: "Daniel Taylor",
        address: "135 West End Ave, New York, NY 10023",
        time: "Today, 12:00 PM - 2:00 PM",
        status: "Delivered",
        items: 1,
      },
      {
        id: "ORD-1229",
        customer: "Olivia Brown",
        address: "246 East 42nd St, New York, NY 10017",
        time: "Yesterday, 4:00 PM - 6:00 PM",
        status: "Delivered",
        items: 3,
      },
    ],
  }

  // Function to render assignment cards
  const renderAssignmentCards = (assignments: any[]) => {
    return assignments.map((assignment) => (
      <Card key={assignment.id} className="mb-4 dashboard-card">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{assignment.id}</CardTitle>
              <CardDescription>{assignment.time}</CardDescription>
            </div>
            <StatusBadge status={assignment.status} />
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <User className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">{assignment.customer}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">{assignment.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Package className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">{assignment.items} items</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex gap-2 w-full">
            <Link href={`/driver/delivery/${assignment.id}`} className="flex-1">
              <Button variant="default" className="w-full">
                View Details
              </Button>
            </Link>
            {assignment.status === "In Transit" && (
              <Link href={`/driver/status/${assignment.id}`} className="flex-1">
                <Button variant="outline" className="w-full">
                  Update Status
                </Button>
              </Link>
            )}
          </div>
        </CardFooter>
      </Card>
    ))
  }

  return (
    <DashboardLayout navItems={driverNavItems} userType="driver">
      <div className="container py-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Delivery Assignments</h1>
            <p className="text-muted-foreground">Manage your delivery schedule and assignments</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search orders..." className="pl-8 w-[200px]" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="today">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="today" className="mt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Today's Deliveries</h2>
                <p className="text-sm text-muted-foreground">{assignments.today.length} assignments</p>
              </div>
              {assignments.today.length > 0 ? (
                renderAssignmentCards(assignments.today)
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <Package className="h-10 w-10 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No deliveries scheduled for today</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          <TabsContent value="upcoming" className="mt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Upcoming Deliveries</h2>
                <p className="text-sm text-muted-foreground">{assignments.upcoming.length} assignments</p>
              </div>
              {assignments.upcoming.length > 0 ? (
                renderAssignmentCards(assignments.upcoming)
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <Calendar className="h-10 w-10 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No upcoming deliveries scheduled</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          <TabsContent value="completed" className="mt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Completed Deliveries</h2>
                <p className="text-sm text-muted-foreground">{assignments.completed.length} assignments</p>
              </div>
              {assignments.completed.length > 0 ? (
                renderAssignmentCards(assignments.completed)
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <CheckCircle2 className="h-10 w-10 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No completed deliveries yet</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
