import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon?: LucideIcon
  trend?: {
    value: string
    positive?: boolean
  }
  className?: string
}

export function StatsCard({ title, value, description, icon: Icon, trend, className = "" }: StatsCardProps) {
  return (
    <Card className={`dashboard-card ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
        {trend && (
          <p className={`text-xs ${trend.positive ? "text-green-500" : "text-red-500"}`}>
            {trend.positive ? "+" : "-"}
            {trend.value}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
