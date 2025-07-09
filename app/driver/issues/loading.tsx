import { DashboardLayout } from "@/components/dashboard-layout"
import { Skeleton } from "@/components/ui/skeleton"
import { Truck, Clock, AlertTriangle, CheckCircle2, DollarSign } from "lucide-react"

// Driver navigation items
const driverNavItems = [
  { title: "Assignments", href: "/driver/assignments", icon: <Truck className="h-4 w-4 mr-2" /> },
  { title: "Status Updates", href: "/driver/status", icon: <Clock className="h-4 w-4 mr-2" /> },
  { title: "Proof of Delivery", href: "/driver/pod", icon: <CheckCircle2 className="h-4 w-4 mr-2" /> },
  { title: "Report Issue", href: "/driver/issues", icon: <AlertTriangle className="h-4 w-4 mr-2" /> },
  { title: "Earnings", href: "/driver/earnings", icon: <DollarSign className="h-4 w-4 mr-2" /> },
]

export default function DriverIssuesLoading() {
  return (
    <DashboardLayout navItems={driverNavItems} userType="driver">
      <div className="container py-6">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Skeleton className="h-10 w-[250px] mb-2" />
            <Skeleton className="h-4 w-[300px]" />
          </div>
          <Skeleton className="h-10 w-[150px]" />
        </div>

        <div className="mb-6">
          <Skeleton className="h-10 w-[300px] mb-6" />
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Skeleton className="h-10 flex-1" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-[150px]" />
              <Skeleton className="h-10 w-[150px]" />
            </div>
          </div>
        </div>

        <div className="rounded-md border p-4">
          <Skeleton className="h-6 w-full mb-4" />
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex gap-4 mb-4">
              <Skeleton className="h-6 w-[80px]" />
              <Skeleton className="h-6 w-[100px]" />
              <Skeleton className="h-6 w-[120px]" />
              <Skeleton className="h-6 flex-1" />
              <Skeleton className="h-6 w-[80px]" />
              <Skeleton className="h-6 w-[80px]" />
              <Skeleton className="h-6 w-[120px]" />
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Skeleton className="h-[300px] w-full" />
        </div>
      </div>
    </DashboardLayout>
  )
}
