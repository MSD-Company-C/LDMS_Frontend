import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const statusLower = status.toLowerCase()
  let badgeClass = ""

  switch (statusLower) {
    case "delivered":
      badgeClass = "status-badge-delivered"
      break
    case "in transit":
      badgeClass = "status-badge-in-transit"
      break
    case "processing":
      badgeClass = "status-badge-processing"
      break
    case "scheduled":
      badgeClass = "status-badge-scheduled"
      break
    case "failed delivery":
    case "failed":
      badgeClass = "status-badge-failed"
      break
    case "cancelled":
      badgeClass = "status-badge-cancelled"
      break
    default:
      badgeClass = ""
  }

  return (
    <Badge variant="outline" className={`${badgeClass} ${className}`}>
      {status}
    </Badge>
  )
}
