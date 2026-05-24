import { cn } from "@/lib/utils";
import { 
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  X
} from "lucide-react";

export type PaymentStatusType = "pending" | "paid" | "failed" | "refunded";

interface PaymentStatusBadgeProps {
  status: PaymentStatusType;
  variant?: "default" | "pill" | "rounded" | "soft" | "outline" | "minimal";
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
  onRemove?: () => void;
}

const paymentStatusConfig: Record<PaymentStatusType, { icon: React.ElementType; label: string; lightBg: string; lightText: string; border: string; softBg: string; softText: string }> = {
  pending: {
    icon: Clock,
    label: "Pending",
    lightBg: "bg-amber-50",
    lightText: "text-amber-700",
    border: "border-amber-200",
    softBg: "bg-amber-100",
    softText: "text-amber-800"
  },
  paid: {
    icon: CheckCircle,
    label: "Paid",
    lightBg: "bg-emerald-50",
    lightText: "text-emerald-700",
    border: "border-emerald-200",
    softBg: "bg-emerald-100",
    softText: "text-emerald-800"
  },
  failed: {
    icon: XCircle,
    label: "Failed",
    lightBg: "bg-red-50",
    lightText: "text-red-700",
    border: "border-red-200",
    softBg: "bg-red-100",
    softText: "text-red-800"
  },
  refunded: {
    icon: RefreshCw,
    label: "Refunded",
    lightBg: "bg-purple-50",
    lightText: "text-purple-700",
    border: "border-purple-200",
    softBg: "bg-purple-100",
    softText: "text-purple-800"
  }
};

const sizeStyles = {
  sm: {
    container: "px-2 py-0.5 text-[11px] gap-1",
    icon: "w-3 h-3",
    removeIcon: "w-2.5 h-2.5 ml-0.5"
  },
  md: {
    container: "px-2.5 py-1 text-xs gap-1.5",
    icon: "w-3.5 h-3.5",
    removeIcon: "w-3 h-3 ml-1"
  },
  lg: {
    container: "px-3 py-1.5 text-sm gap-2",
    icon: "w-4 h-4",
    removeIcon: "w-3.5 h-3.5 ml-1"
  }
};

const variantStyles = {
  default: "rounded-md border",
  pill: "rounded-full border",
  rounded: "rounded-lg border",
  soft: "rounded-md",
  outline: "rounded-full border-2 bg-transparent",
  minimal: "rounded-md border-0 bg-transparent"
};

export const PaymentStatusBadge: React.FC<PaymentStatusBadgeProps> = ({ 
  status, 
  variant = "default",
  size = "md",
  showIcon = true,
  onRemove,
  className 
}) => {
  const config = paymentStatusConfig[status];
  const Icon = config.icon;
  const sizeStyle = sizeStyles[size];
  
  const getVariantClass = () => {
    switch (variant) {
      case "outline":
        return `${config.lightText} ${config.border} bg-transparent hover:bg-opacity-5`;
      case "soft":
        return `${config.softBg} ${config.softText}`;
      case "minimal":
        return `${config.lightText} hover:${config.softBg} transition-colors`;
      default:
        return `${config.lightBg} ${config.lightText} ${config.border}`;
    }
  };

  const badgeContent = (
    <>
      {showIcon && <Icon className={cn(sizeStyle.icon, "shrink-0", variant === "minimal" && "opacity-70")} />}
      <span className={cn(variant === "minimal" && "font-normal")}>{config.label}</span>
    </>
  );

  if (onRemove) {
    return (
      <span
        className={cn(
          "inline-flex items-center font-medium tracking-normal transition-all duration-200",
          "hover:scale-105 hover:shadow-sm backdrop-blur-sm cursor-pointer",
          sizeStyle.container,
          variantStyles[variant],
          getVariantClass(),
          className
        )}
        onClick={onRemove}
      >
        {badgeContent}
        <X className={cn(sizeStyle.removeIcon, "shrink-0 opacity-60 hover:opacity-100")} />
      </span>
    );
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
      {badgeContent}
    </span>
  );
};