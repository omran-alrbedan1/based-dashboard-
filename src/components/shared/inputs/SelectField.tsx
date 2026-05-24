import React from "react"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Option } from "@/types/customFormField.types"

interface SelectFieldProps {
  field: any
  placeholder?: string
  disabled?: boolean
  inputClassName?: string
  options?: Option[]
}

export const SelectField: React.FC<SelectFieldProps> = ({
  field,
  placeholder,
  disabled,
  inputClassName,
  options = [],
}) => {
  return (
    <Select
      value={field.value}
      onValueChange={field.onChange}
      disabled={disabled}
    >
      <SelectTrigger className={cn(inputClassName)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}