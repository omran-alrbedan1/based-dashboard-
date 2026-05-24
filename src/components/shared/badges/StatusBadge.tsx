import { cn } from "@/lib/utils"
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Circle, 
  CheckCircle2,
  Ban
} from "lucide-react"

export type StatusType = "Pending" | "Approved" | "Rejected" | "Active" | "Inactive" | "Completed" | "Cancelled"

interface StatusBadgeProps {
  status: StatusType
  variant?: "default" | "pill" | "rounded" | "soft" | "outline" | "minimal"
  size?: "sm" | "md" | "lg"
  showIcon?: boolean
  className?: string
}

const statusConfig: Record<StatusType, { icon: React.ElementType; lightBg: string; lightText: string; border: string; softBg: string; softText: string }> = {
  Pending: {
    icon: Clock,
    lightBg: "bg-amber-50",
    lightText: "text-amber-700",
    border: "border-amber-200",
    softBg: "bg-amber-100",
    softText: "text-amber-800"
  },
  Approved: {
    icon: CheckCircle,
    lightBg: "bg-emerald-50",
    lightText: "text-emerald-700",
    border: "border-emerald-200",
    softBg: "bg-emerald-100",
    softText: "text-emerald-800"
  },
  Rejected: {
    icon: XCircle,
    lightBg: "bg-rose-50",
    lightText: "text-rose-700",
    border: "border-rose-200",
    softBg: "bg-rose-100",
    softText: "text-rose-800"
  },
  Active: {
    icon: CheckCircle2,
    lightBg: "bg-emerald-50",
    lightText: "text-emerald-700",
    border: "border-emerald-200",
    softBg: "bg-emerald-100",
    softText: "text-emerald-800"
  },
  Inactive: {
    icon: Circle,
    lightBg: "bg-gray-50",
    lightText: "text-gray-600",
    border: "border-gray-200",
    softBg: "bg-gray-100",
    softText: "text-gray-700"
  },
  Completed: {
    icon: CheckCircle2,
    lightBg: "bg-blue-50",
    lightText: "text-blue-700",
    border: "border-blue-200",
    softBg: "bg-blue-100",
    softText: "text-blue-800"
  },
  Cancelled: {
    icon: Ban,
    lightBg: "bg-red-50",
    lightText: "text-red-700",
    border: "border-red-200",
    softBg: "bg-red-100",
    softText: "text-red-800"
  }
}

const sizeStyles = {
  sm: {
    container: "px-2 py-0.5 text-[11px] gap-1",
    icon: "w-3 h-3"
  },
  md: {
    container: "px-2.5 py-1 text-xs gap-1.5",
    icon: "w-3.5 h-3.5"
  },
  lg: {
    container: "px-3 py-1.5 text-sm gap-2",
    icon: "w-4 h-4"
  }
}

const variantStyles = {
  default: "rounded-md border",
  pill: "rounded-full border",
  rounded: "rounded-lg border",
  soft: "rounded-md",
  outline: "rounded-full border-2 bg-transparent",
  minimal: "rounded-md border-0 bg-transparent"
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  variant = "default",
  size = "md",
  showIcon = true,
  className 
}) => {
  const config = statusConfig[status]
  const Icon = config.icon
  const sizeStyle = sizeStyles[size]
  
  const getVariantClass = () => {
    switch (variant) {
      case "outline":
        return `${config.lightText} ${config.border} bg-transparent hover:bg-opacity-5`
      
      case "soft":
        return `${config.softBg} ${config.softText}`
      
      case "minimal":
        return `${config.lightText} hover:${config.softBg} transition-colors`
      
      case "default":
      case "pill":
      case "rounded":
      default:
        return `${config.lightBg} ${config.lightText} ${config.border}`
    }
  }

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium tracking-normal transition-all duration-200",
        "hover:scale-105 hover:shadow-sm cursor-default backdrop-blur-sm",
        sizeStyle.container,
        variantStyles[variant],
        getVariantClass(),
        className
      )}
    >
      {showIcon && <Icon className={cn(sizeStyle.icon, "shrink-0", variant === "minimal" && "opacity-70")} />}
      <span className={cn(variant === "minimal" && "font-normal")}>{status}</span>
    </span>
  )
}

export default StatusBadge