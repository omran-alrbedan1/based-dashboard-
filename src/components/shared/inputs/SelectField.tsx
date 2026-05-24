"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Option } from "@/types/customFormField.types"
import { LucideIcon } from "lucide-react"

interface SelectFieldProps {
  field: any
  placeholder?: string
  disabled?: boolean
  inputClassName?: string
  options?: Option[]
}

// Helper component to render option with icon
const OptionWithIcon: React.FC<{ icon?: LucideIcon | string; label: string; className?: string }> = ({ 
  icon: Icon, 
  label, 
  className 
}) => {
  if (Icon && typeof Icon === 'string') {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <span className="text-base">{Icon}</span>
        <span>{label}</span>
      </div>
    )
  }
  
  if (Icon) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Icon className="h-4 w-4 text-primary" />
        <span>{label}</span>
      </div>
    )
  }
  
  // No icon
  return <span>{label}</span>
}

export const SelectField: React.FC<SelectFieldProps> = ({
  field,
  placeholder,
  disabled,
  inputClassName,
  options = [],
}) => {
  const selectedOption = options.find(opt => opt.value === field.value)
  
  return (
    <Select
      value={field.value}
      onValueChange={field.onChange}
      disabled={disabled}
    >
      <SelectTrigger className={cn(inputClassName)}>
        <SelectValue placeholder={placeholder}>
          {selectedOption && selectedOption.icon && (
            <div className="flex items-center gap-2">
              {typeof selectedOption.icon === 'string' ? (
                <span className="text-base">{selectedOption.icon}</span>
              ) : (
                <selectedOption.icon className="h-4 w-4 text-primary" />
              )}
              <span>{selectedOption.label}</span>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            <OptionWithIcon 
              icon={option.icon} 
              label={option.label} 
              className="py-1"
            />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}