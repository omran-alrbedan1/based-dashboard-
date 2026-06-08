import React from 'react';
import { cn } from "@/lib/utils";
import { 
  Clock, 
  CheckCircle, 
  Package, 
  Truck, 
  MapPin, 
  XCircle,
  X
} from "lucide-react";
import { OrderStatus } from '@/features/orders/types/orders.types';

export type OrderStatusType = OrderStatus;

interface OrderStatusBadgeProps {
  status: OrderStatusType;
  variant?: "default" | "pill" | "rounded" | "soft" | "outline" | "minimal";
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
  onRemove?: () => void;
}

const orderStatusConfig: Record<OrderStatusType, { icon: React.ElementType; label: string; lightBg: string; lightText: string; border: string; softBg: string; softText: string; dotColor?: string }> = {
  pending: {
    icon: Clock,
    label: "Pending",
    lightBg: "bg-yellow-50",
    lightText: "text-yellow-700",
    border: "border-yellow-200",
    softBg: "bg-yellow-100",
    softText: "text-yellow-800",
    dotColor: "bg-yellow-500"
  },
  accepted: {
    icon: CheckCircle,
    label: "Accepted",
    lightBg: "bg-blue-50",
    lightText: "text-blue-700",
    border: "border-blue-200",
    softBg: "bg-blue-100",
    softText: "text-blue-800",
    dotColor: "bg-blue-500"
  },
  preparing: {
    icon: Package,
    label: "Preparing",
    lightBg: "bg-indigo-50",
    lightText: "text-indigo-700",
    border: "border-indigo-200",
    softBg: "bg-indigo-100",
    softText: "text-indigo-800",
    dotColor: "bg-indigo-500"
  },
  on_delivery: {
    icon: Truck,
    label: "On Delivery",
    lightBg: "bg-purple-50",
    lightText: "text-purple-700",
    border: "border-purple-200",
    softBg: "bg-purple-100",
    softText: "text-purple-800",
    dotColor: "bg-purple-500"
  },
  delivered: {
    icon: MapPin,
    label: "Delivered",
    lightBg: "bg-emerald-50",
    lightText: "text-emerald-700",
    border: "border-emerald-200",
    softBg: "bg-emerald-100",
    softText: "text-emerald-800",
    dotColor: "bg-emerald-500"
  },
  cancelled: {
    icon: XCircle,
    label: "Cancelled",
    lightBg: "bg-red-50",
    lightText: "text-red-700",
    border: "border-red-200",
    softBg: "bg-red-100",
    softText: "text-red-800",
    dotColor: "bg-red-500"
  }
};

const sizeStyles = {
  sm: {
    container: "px-2 py-0.5 text-[11px] gap-1",
    icon: "w-3 h-3",
    removeIcon: "w-2.5 h-2.5 ml-0.5",
    dot: "w-1.5 h-1.5"
  },
  md: {
    container: "px-2.5 py-1 text-xs gap-1.5",
    icon: "w-3.5 h-3.5",
    removeIcon: "w-3 h-3 ml-1",
    dot: "w-2 h-2"
  },
  lg: {
    container: "px-3 py-1.5 text-sm gap-2",
    icon: "w-4 h-4",
    removeIcon: "w-3.5 h-3.5 ml-1",
    dot: "w-2.5 h-2.5"
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

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ 
  status, 
  variant = "default",
  size = "md",
  showIcon = true,
  onRemove,
  className 
}) => {
  const config = orderStatusConfig[status];
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

  // For variants that show dot instead of icon
  const showDot = variant === "default" && size !== "lg" && !showIcon;

  const badgeContent = (
    <>
      {showDot ? (
        <span className={cn(sizeStyle.dot, "rounded-full shrink-0", config.dotColor)} />
      ) : showIcon && (
        <Icon className={cn(sizeStyle.icon, "shrink-0", variant === "minimal" && "opacity-70")} />
      )}
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
export default OrderStatusBadge;