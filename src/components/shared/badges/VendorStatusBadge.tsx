import React from 'react';
import { cn } from "@/lib/utils";
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  AlertCircle,
  X
} from "lucide-react";

export type VendorStatusType = 'approved' | 'pending' | 'rejected' | 'suspended';

interface VendorStatusBadgeProps {
  status: VendorStatusType;
  variant?: "default" | "pill" | "rounded" | "soft" | "outline" | "minimal";
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
}

const vendorStatusConfig: Record<VendorStatusType, { 
  icon: React.ElementType; 
  label: string; 
  lightBg: string; 
  lightText: string; 
  border: string; 
  softBg: string; 
  softText: string; 
  dotColor?: string 
}> = {
  approved: {
    icon: CheckCircle,
    label: "Approved",
    lightBg: "bg-emerald-50",
    lightText: "text-emerald-700",
    border: "border-emerald-200",
    softBg: "bg-emerald-100",
    softText: "text-emerald-800",
    dotColor: "bg-emerald-500"
  },
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
  rejected: {
    icon: XCircle,
    label: "Rejected",
    lightBg: "bg-red-50",
    lightText: "text-red-700",
    border: "border-red-200",
    softBg: "bg-red-100",
    softText: "text-red-800",
    dotColor: "bg-red-500"
  },
  suspended: {
    icon: AlertCircle,
    label: "Suspended",
    lightBg: "bg-orange-50",
    lightText: "text-orange-700",
    border: "border-orange-200",
    softBg: "bg-orange-100",
    softText: "text-orange-800",
    dotColor: "bg-orange-500"
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

export const VendorStatusBadge: React.FC<VendorStatusBadgeProps> = ({ 
  status, 
  variant = "default",
  size = "md",
  showIcon = true,
  className 
}) => {
  const config = vendorStatusConfig[status];
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

export default VendorStatusBadge;