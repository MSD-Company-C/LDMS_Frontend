import { Truck } from "lucide-react"
import Link from "next/link"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
  className?: string
}

export function Logo({ size = "md", showText = true, className = "" }: LogoProps) {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  }

  return (
    <Link href="/" className={`flex items-center gap-2 font-semibold ${className}`}>
      <Truck className={sizeClasses[size]} />
      {showText && <span className={textSizeClasses[size]}>LogiTrack</span>}
    </Link>
  )
}
