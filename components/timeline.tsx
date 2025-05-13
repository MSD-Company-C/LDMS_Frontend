import { CheckCircle2, Clock } from "lucide-react"

interface TimelineItem {
  status: string
  time: string
  completed: boolean
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

export function Timeline({ items, className = "" }: TimelineProps) {
  return (
    <div className={`space-y-8 ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="flex">
          <div className="mr-4 flex flex-col items-center">
            <div
              className={`rounded-full p-1 ${
                item.completed ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {item.completed ? <CheckCircle2 className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
            </div>
            {index < items.length - 1 && (
              <div className={`h-full w-px my-1 ${item.completed ? "bg-primary" : "bg-muted"}`} />
            )}
          </div>
          <div className="space-y-1 pt-1">
            <p className="font-medium leading-none">{item.status}</p>
            <p className="text-sm text-muted-foreground">{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
