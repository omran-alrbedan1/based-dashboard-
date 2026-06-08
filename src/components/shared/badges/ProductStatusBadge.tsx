import React from 'react'
import { cn } from '@/lib/utils'
import { CheckCircle, Clock, XCircle, Package } from 'lucide-react'

interface ProductStatusBadgeProps {
  status: string
  variant?: 'default' | 'pill' | 'soft'
  size?: 'sm' | 'md'
  showIcon?: boolean
  className?: string
}

const productStatusConfig: Record<string, {
  icon: React.ElementType
  label: string
  lightBg: string
  lightText: string
  border: string
  softBg: string
  softText: string
}> = {
  active: {
    icon: CheckCircle,
    label: 'Active',
    lightBg: 'bg-green-50',
    lightText: 'text-green-700',
    border: 'border-green-200',
    softBg: 'bg-green-100',
    softText: 'text-green-800',
  },
  review: {
    icon: Clock,
    label: 'Under Review',
    lightBg: 'bg-amber-50',
    lightText: 'text-amber-700',
    border: 'border-amber-200',
    softBg: 'bg-amber-100',
    softText: 'text-amber-800',
  },
  inactive: {
    icon: XCircle,
    label: 'Inactive',
    lightBg: 'bg-gray-100',
    lightText: 'text-gray-500',
    border: 'border-gray-200',
    softBg: 'bg-gray-200',
    softText: 'text-gray-700',
  },
  rejected: {
    icon: Package,
    label: 'Rejected',
    lightBg: 'bg-red-50',
    lightText: 'text-red-700',
    border: 'border-red-200',
    softBg: 'bg-red-100',
    softText: 'text-red-800',
  },
}

const sizeStyles = {
  sm: { container: 'px-2 py-0.5 text-[11px] gap-1', icon: 'w-3 h-3' },
  md: { container: 'px-2.5 py-1 text-xs gap-1.5', icon: 'w-3.5 h-3.5' },
}

const variantStyles = {
  default: 'rounded-md border',
  pill: 'rounded-full border',
  soft: 'rounded-md',
}

export const ProductStatusBadge: React.FC<ProductStatusBadgeProps> = ({
  status,
  variant = 'default',
  size = 'sm',
  showIcon = true,
  className,
}) => {
  const config = productStatusConfig[status]
  const Icon = config.icon
  const sizeStyle = sizeStyles[size]

  const getVariantClass = () => {
    switch (variant) {
      case 'soft':
        return `${config.softBg} ${config.softText}`
      default:
        return `${config.lightBg} ${config.lightText} ${config.border}`
    }
  }

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium',
        sizeStyle.container,
        variantStyles[variant],
        getVariantClass(),
        className,
      )}
    >
      {showIcon && <Icon className={cn(sizeStyle.icon, 'shrink-0')} />}
      <span>{config.label}</span>
    </span>
  )
}

export default ProductStatusBadge
