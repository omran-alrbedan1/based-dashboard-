import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { DateOption, DateRange } from "@/types/customFormField.types"

interface DateRangeFieldProps {
  field: any
  dateOptions?: DateOption
  disabled?: boolean
  inputClassName?: string
}

export const DateRangeField: React.FC<DateRangeFieldProps> = ({
  field,
  dateOptions,
  disabled,
  inputClassName,
}) => {
  const [open, setOpen] = useState(false)
  const [range, setRange] = useState<DateRange>(
    field.value || { from: undefined, to: undefined }
  )
  
  const getDisabledDays = () => {
    const disabledDays = dateOptions?.disabledDays
    if (!disabledDays || disabledDays.length === 0) return undefined
    return disabledDays
  }
  
  return (
    <div className="relative">
      <Button
        type="button"
        variant="outline"
        className={cn(
          "w-full justify-start text-left font-normal",
          !range.from && "text-muted-foreground",
          inputClassName
        )}
        disabled={disabled}
        onClick={() => setOpen(!open)}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {range.from ? (
          range.to ? (
            `${format(range.from, "LLL dd, y")} - ${format(range.to, "LLL dd, y")}`
          ) : (
            format(range.from, "LLL dd, y")
          )
        ) : (
          dateOptions?.placeholder || "Pick a date range"
        )}
      </Button>
      {open && (
        <div className="absolute top-full z-50 mt-1 bg-white border rounded-md shadow-lg">
          <Calendar
            mode="range"
            selected={range}
            onSelect={(selectedRange) => {
              if (selectedRange) {
                setRange(selectedRange as DateRange)
                field.onChange(selectedRange)
              }
            }}
            disabled={getDisabledDays()}
            className="rounded-md"
          />
        </div>
      )}
    </div>
  )
}