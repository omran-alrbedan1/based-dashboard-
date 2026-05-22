  "use client"

  import React, { useState, useCallback, useRef, useEffect } from "react"
  import {  Controller, Control, FieldPath, FieldValues, Path } from "react-hook-form"
  import { z } from "zod"
  import { cn } from "@/lib/utils"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Textarea } from "@/components/ui/textarea"
  import { Checkbox } from "@/components/ui/checkbox"
  import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
  import { Switch } from "@/components/ui/switch"
  import { Slider } from "@/components/ui/slider"
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
  import { Badge } from "@/components/ui/badge"
  import { Calendar } from "@/components/ui/calendar"
  import { Label } from "@/components/ui/label"
  import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
  import { Skeleton } from "@/components/ui/skeleton"
  import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
  import { 
    Eye, 
    EyeOff, 
    Calendar as CalendarIcon, 
    Clock, 
    Upload, 
    X, 
    Star, 
    Search,
    ChevronDown,
    Check,
    Image as ImageIcon,
    FileText,
    AlertCircle,
    LucideIcon
  } from "lucide-react"
  import { format, setHours, setMinutes } from "date-fns"

  // Form Field Types Enum
  export enum FormFieldType {
    INPUT = "INPUT",
    PASSWORD = "PASSWORD",
    EMAIL = "EMAIL",
    TEXTAREA = "TEXTAREA",
    NUMBER = "NUMBER",
    PHONE = "PHONE",
    DATE_PICKER = "DATE_PICKER",
    DATE_RANGE = "DATE_RANGE",
    TIME_PICKER = "TIME_PICKER",
    SELECT = "SELECT",
    MULTI_SELECT = "MULTI_SELECT",
    COMBOBOX = "COMBOBOX",
    RADIO = "RADIO",
    CHECKBOX = "CHECKBOX",
    CHECKBOX_GROUP = "CHECKBOX_GROUP",
    SWITCH = "SWITCH",
    SLIDER = "SLIDER",
    TAG_INPUT = "TAG_INPUT",
    FILE_UPLOAD = "FILE_UPLOAD",
    COLOR_PICKER = "COLOR_PICKER",
    RATING = "RATING",
    OTP_INPUT = "OTP_INPUT",
    AUTOCOMPLETE = "AUTOCOMPLETE",
    CURRENCY = "CURRENCY",
    PERCENTAGE = "PERCENTAGE",
  }

  // Common Interfaces
  export interface Option {
    value: string
    label: string
    disabled?: boolean
  }

  export interface FileUploadOption {
    maxSize?: number 
    maxFiles?: number
    accept?: string 

    multiple?: boolean
    showPreview?: boolean
  }

  export interface PhoneInputOption {
    defaultCountry?: string
    preferredCountries?: string[]
    excludeCountries?: string[]
    onlyCountries?: string[]
  }

  export interface AutocompleteOption {
    debounceMs?: number
    minLength?: number
    searchApi: (query: string) => Promise<Option[]>
  }

  export interface DateOption {
    format?: string
    placeholder?: string
    disabledDays?: Date[]
    minDate?: Date
    maxDate?: Date
  }

  export interface TimeOption {
    format?: string
    placeholder?: string
    interval?: number // in minutes
    minTime?: Date
    maxTime?: Date
  }

  // Main Props Interface
  export interface CustomFormFieldProps<T extends FieldValues = FieldValues> {
    fieldType: FormFieldType
    control: Control<T>
    name: Path<T>
    label?: string
    placeholder?: string
    description?: string
    required?: boolean
    disabled?: boolean
    loading?: boolean
    inputClassName?: string
    labelClassName?: string
    descriptionClassName?: string
    errorClassName?: string
    
    // Icon props
    leftIcon?: LucideIcon
    rightIcon?: LucideIcon
    iconPosition?: "left" | "right" | "both"
    iconClassName?: string
    
    // Options for select/multi-select/combobox
    options?: Array<{
      label: string
      value: string
      disabled?: boolean
    }>
    
    // Number input props
    min?: number
    max?: number
    step?: number
    
    // Textarea props
    rows?: number
    maxLength?: number
    
    // Date picker props
    dateOptions?: {
      format?: string
      placeholder?: string
      disabledDays?: Date[]
      minDate?: Date
      maxDate?: Date
    }
    
    // Time picker props
    timeOptions?: {
      format?: string
      placeholder?: string
      interval?: number
    }
    
    // Slider props
    sliderMarks?: Array<{
      value: number
      label: string
    }>
    
    // File upload props
    fileUploadOptions?: {
      multiple?: boolean
      accept?: string
      maxSize?: number
      showPreview?: boolean
    }
    
    // Rating props
    maxRating?: number
    
    // Autocomplete props
    autocompleteOptions?: {
      minLength?: number
      debounceMs?: number
      searchApi: (query: string) => Promise<Array<{ label: string; value: string; disabled?: boolean }>>
    }
    
    // Color picker props
    colorPickerOptions?: {
      showPresets?: boolean
      allowAlpha?: boolean
    }
    
    // OTP props
    otpOptions?: {
      length: number
    }
    otpLength?: number
    
    // Tag input props
    tagInputOptions?: {
      maxTags?: number
      allowDuplicates?: boolean
    }
    
    // Validation
    rules?: {
      required?: boolean | string
      minLength?: number | { value: number; message: string }
      maxLength?: number | { value: number; message: string }
      min?: number | { value: number; message: string }
      max?: number | { value: number; message: string }
      pattern?: RegExp | { value: RegExp; message: string }
      email?: boolean | string
      url?: boolean | string
      custom?: {
        validator: (value: any) => boolean | string
        message?: string
      }
    }
    
    // Accessibility
    ariaLabel?: string
    ariaDescribedBy?: string
    
    // Direction
    dir?: "ltr" | "rtl"
    
    // Currency props
    currency?: string
    locale?: string
    
    // Tooltip
    tooltip?: string
    
    // Container styling
    className?: string
    containerClassName?: string
  }

  // Helper Types
  type FormFieldComponent<T extends FieldValues = FieldValues> = React.FC<CustomFormFieldProps<T>>

  interface DateRange {
    from: Date | undefined
    to: Date | undefined
  }

  // Validation Schema Helpers
  export const createValidationSchema = () => ({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    requiredString: z.string().min(1, "This field is required"),
    requiredNumber: z.number().min(1, "This field is required"),
    requiredArray: z.array(z.string()).min(1, "Select at least one option"),
    requiredFile: z.instanceof(File, { message: "File is required" }),
    requiredDate: z.date({ message: "Date is required" }),
    url: z.string().url("Invalid URL"),
    min: (min: number) => z.string().min(min, `Must be at least ${min} characters`),
    max: (max: number) => z.string().max(max, `Must be no more than ${max} characters`),
    between: (min: number, max: number) => z.number().min(min).max(max),
    pattern: (regex: RegExp, message: string) => z.string().regex(regex, message),
  })

  // Custom Hooks
  const useDebounce = <T,>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      return () => {
        clearTimeout(handler)
      }
    }, [value, delay])

    return debouncedValue
  }

  // Utility Functions
  const formatCurrency = (value: number, currency = "USD", locale = "en-US") => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(value)
  }

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\D/g, "")
    const phoneNumberLength = phoneNumber.length
    
    if (phoneNumberLength < 4) return phoneNumber
    if (phoneNumberLength < 7) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
  }

  const generateId = () => Math.random().toString(36).substr(2, 9)

  // Field Renderer Components
  const renderInput = (field: any, props: CustomFormFieldProps) => {
    const hasLeftIcon = props.leftIcon && (!props.iconPosition || props.iconPosition === "left" || props.iconPosition === "both")
    const hasRightIcon = props.rightIcon && (props.iconPosition === "right" || props.iconPosition === "both")
    
    if (hasLeftIcon || hasRightIcon) {
      const LeftIcon = props.leftIcon
      const RightIcon = props.rightIcon
      
      return (
        <div className="relative group">
          {hasLeftIcon && LeftIcon && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors group-focus-within:text-primary">
              <LeftIcon className={cn("h-5 w-5 text-muted-foreground group-focus-within:text-primary", props.iconClassName)} />
            </div>
          )}
          <Input
            {...field}
            type="text"
            placeholder={props.placeholder}
            disabled={props.disabled}
            className={cn(
              props.inputClassName,
              "px-6 py-5 text-base",
              hasLeftIcon && "pl-14",
              hasRightIcon && "pr-14"
            )}
            aria-label={props.ariaLabel}
            aria-describedby={props.ariaDescribedBy}
            maxLength={props.maxLength}
          />
          {hasRightIcon && RightIcon && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors group-focus-within:text-primary">
              <RightIcon className={cn("h-5 w-5 text-muted-foreground group-focus-within:text-primary", props.iconClassName)} />
            </div>
          )}
        </div>
      )
    }
    
    return (
      <Input
        {...field}
        type="text"
        placeholder={props.placeholder}
        disabled={props.disabled}
        className={cn(props.inputClassName, "px-6 py-5 text-base")}
        aria-label={props.ariaLabel}
        aria-describedby={props.ariaDescribedBy}
        maxLength={props.maxLength}
      />
    )
  }

    const renderPassword = (field: any, props: CustomFormFieldProps) => {
      const [showPassword, setShowPassword] = useState(false)
      const hasLeftIcon = props.leftIcon && (!props.iconPosition || props.iconPosition === "left" || props.iconPosition === "both")
      
      if (hasLeftIcon) {
        const LeftIcon = props.leftIcon
        
        return (
          <div className="relative group">
            {hasLeftIcon && LeftIcon && (
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors group-focus-within:text-primary">
                <LeftIcon className={cn("h-5 w-5 group-focus:text-primary", props.iconClassName)} />
              </div>
            )}
            <Input
              {...field}
              type={showPassword ? "text" : "password"}
              placeholder={props.placeholder}
              disabled={props.disabled}
              className={cn(
                props.inputClassName,
                "px-6 py-5 text-base",
                hasLeftIcon && "pl-14",
                "pr-14"
              )}
              aria-label={props.ariaLabel}
              aria-describedby={props.ariaDescribedBy}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
              disabled={props.disabled}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 group-focus:text-primary transition-colors" />
              ) : (
                <Eye className="h-4 w-4 group-focus:text-primary transition-colors" />
              )}
            </Button>
          </div>
        )
      }
      
      return (
        <div className="relative">
          <Input
            {...field}
            type={showPassword ? "text" : "password"}
            placeholder={props.placeholder}
            disabled={props.disabled}
            className={cn(props.inputClassName, "px-6 py-5 text-base", "pr-14")}
            aria-label={props.ariaLabel}
            aria-describedby={props.ariaDescribedBy}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            disabled={props.disabled}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
      )
    }

  const renderEmail = (field: any, props: CustomFormFieldProps) => {
    const hasLeftIcon = props.leftIcon && (!props.iconPosition || props.iconPosition === "left" || props.iconPosition === "both")
    const hasRightIcon = props.rightIcon && (props.iconPosition === "right" || props.iconPosition === "both")
    
    if (hasLeftIcon || hasRightIcon) {
      const LeftIcon = props.leftIcon
      const RightIcon = props.rightIcon
      
      return (
        <div className="relative group">
          {hasLeftIcon && LeftIcon && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors group-focus-within:text-primary">
              <LeftIcon className={cn("h-5 w-5 text-muted-foreground group-focus-within:text-primary", props.iconClassName)} />
            </div>
          )}
          <Input
            {...field}
            type="email"
            placeholder={props.placeholder || "you@example.com"}
            disabled={props.disabled}
            className={cn(
              props.inputClassName,
              "px-6 py-5 text-base",
              hasLeftIcon && "pl-14",
              hasRightIcon && "pr-14"
            )}
            aria-label={props.ariaLabel}
            aria-describedby={props.ariaDescribedBy}
          />
          {hasRightIcon && RightIcon && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors group-focus-within:text-primary">
              <RightIcon className={cn("h-5 w-5 text-muted-foreground group-focus-within:text-primary", props.iconClassName)} />
            </div>
          )}
        </div>
      )
    }
    
    return (
      <Input
        {...field}
        type="email"
        placeholder={props.placeholder || "you@example.com"}
        disabled={props.disabled}
        className={cn(props.inputClassName, "px-6 py-5 text-base")}
        aria-label={props.ariaLabel}
        aria-describedby={props.ariaDescribedBy}
      />
    )
  }

  const renderTextarea = (field: any, props: CustomFormFieldProps) => {
    return (
      <Textarea
        {...field}
        placeholder={props.placeholder}
        disabled={props.disabled}
        className={cn(props.inputClassName)}
        rows={props.rows || 3}
        maxLength={props.maxLength}
        aria-label={props.ariaLabel}
        aria-describedby={props.ariaDescribedBy}
      />
    )
  }

  const renderNumber = (field: any, props: CustomFormFieldProps) => {
    const hasLeftIcon = props.leftIcon && (!props.iconPosition || props.iconPosition === "left" || props.iconPosition === "both")
    const hasRightIcon = props.rightIcon && (props.iconPosition === "right" || props.iconPosition === "both")
    
    if (hasLeftIcon || hasRightIcon) {
      const LeftIcon = props.leftIcon
      const RightIcon = props.rightIcon
      
      return (
        <div className="relative group">
          {hasLeftIcon && LeftIcon && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors group-focus-within:text-primary">
              <LeftIcon className={cn("h-5 w-5 text-muted-foreground group-focus-within:text-primary", props.iconClassName)} />
            </div>
          )}
          <Input
            {...field}
            type="number"
            placeholder={props.placeholder}
            disabled={props.disabled}
            className={cn(
              props.inputClassName,
              "px-6 py-5 text-base",
              hasLeftIcon && "pl-14",
              hasRightIcon && "pr-14"
            )}
            min={props.min}
            max={props.max}
            step={props.step}
            aria-label={props.ariaLabel}
            aria-describedby={props.ariaDescribedBy}
            onChange={(e) => {
              const value = e.target.value ? Number(e.target.value) : ""
              field.onChange(value)
            }}
          />
          {hasRightIcon && RightIcon && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors group-focus-within:text-primary">
              <RightIcon className={cn("h-5 w-5 text-muted-foreground group-focus-within:text-primary", props.iconClassName)} />
            </div>
          )}
        </div>
      )
    }
    
    return (
      <Input
        {...field}
        type="number"
        placeholder={props.placeholder}
        disabled={props.disabled}
        className={cn(props.inputClassName, "px-6 py-5 text-base")}
        min={props.min}
        max={props.max}
        step={props.step}
        aria-label={props.ariaLabel}
        aria-describedby={props.ariaDescribedBy}
        onChange={(e) => {
          const value = e.target.value ? Number(e.target.value) : ""
          field.onChange(value)
        }}
      />
    )
  }

  const renderPhone = (field: any, props: CustomFormFieldProps) => {
    const [formattedValue, setFormattedValue] = useState("")
    const hasLeftIcon = props.leftIcon && (!props.iconPosition || props.iconPosition === "left" || props.iconPosition === "both")
    const hasRightIcon = props.rightIcon && (props.iconPosition === "right" || props.iconPosition === "both")
    
    React.useEffect(() => {
      if (field.value) {
        const formatted = formatPhoneNumber(field.value)
        setFormattedValue(formatted)
      } else {
        setFormattedValue("")
      }
    }, [field.value])
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/\D/g, "").slice(0, 10)
      const formatted = formatPhoneNumber(value)
      setFormattedValue(formatted)
      field.onChange(value)
    }
    
    if (hasLeftIcon || hasRightIcon) {
      const LeftIcon = props.leftIcon
      const RightIcon = props.rightIcon
      
      return (
        <div className="relative group">
          {hasLeftIcon && LeftIcon && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors group-focus-within:text-primary">
              <LeftIcon className={cn("h-5 w-5 text-muted-foreground group-focus-within:text-primary", props.iconClassName)} />
            </div>
          )}
          <Input
            {...field}
            type="tel"
            placeholder={props.placeholder || "(555) 123-4567"}
            disabled={props.disabled}
            className={cn(
              props.inputClassName,
              "px-6 py-5 text-base",
              hasLeftIcon && "pl-14",
              hasRightIcon && "pr-14"
            )}
            value={formattedValue}
            onChange={handleChange}
            aria-label={props.ariaLabel}
            aria-describedby={props.ariaDescribedBy}
          />
          {hasRightIcon && RightIcon && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors group-focus-within:text-primary">
              <RightIcon className={cn("h-5 w-5 text-muted-foreground group-focus-within:text-primary", props.iconClassName)} />
            </div>
          )}
        </div>
      )
    }
    
    return (
      <Input
        {...field}
        type="tel"
        placeholder={props.placeholder || "(555) 123-4567"}
        disabled={props.disabled}
        className={cn(props.inputClassName, "px-6 py-5 text-base")}
        value={formattedValue}
        onChange={handleChange}
        aria-label={props.ariaLabel}
        aria-describedby={props.ariaDescribedBy}
      />
    )
  }

const renderDatePicker = (field: any, props: CustomFormFieldProps) => {
  const [open, setOpen] = useState(false)
  
  // Create disabled configuration for react-day-picker v8
  const getDisabled = () => {
    const disabledOptions: any = {}
    
    if (props.dateOptions?.minDate) {
      disabledOptions.before = props.dateOptions.minDate
    }
    if (props.dateOptions?.maxDate) {
      disabledOptions.after = props.dateOptions.maxDate
    }
    
    const disabledDays = props.dateOptions?.disabledDays
    if (disabledDays && disabledDays.length > 0) {
      // Combine date range restrictions with specific disabled days
      if (Object.keys(disabledOptions).length > 0) {
        return [disabledOptions, ...disabledDays]
      }
      return disabledDays
    }
    
    return Object.keys(disabledOptions).length > 0 ? disabledOptions : undefined
  }
  
  return (
    <div className="relative">
      <Button
        type="button"
        variant="outline"
        className={cn(
          "w-full justify-start text-left font-normal",
          !field.value && "text-muted-foreground",
          props.inputClassName
        )}
        disabled={props.disabled}
        onClick={() => setOpen(!open)}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {field.value ? (
          format(new Date(field.value), props.dateOptions?.format || "PPP")
        ) : (
          props.dateOptions?.placeholder || "Pick a date"
        )}
      </Button>
      {open && (
        <div className="absolute top-full z-50 mt-1 bg-white border rounded-md shadow-lg">
          <Calendar
            mode="single"
            selected={field.value ? new Date(field.value) : undefined}
            onSelect={(date) => {
              field.onChange(date)
              setOpen(false)
            }}
            disabled={getDisabled()}
            className="rounded-md"
          />
        </div>
      )}
    </div>
  )
}

const renderDateRange = (field: any, props: CustomFormFieldProps) => {
  const [open, setOpen] = useState(false)
  const [range, setRange] = useState<DateRange>(
    field.value || { from: undefined, to: undefined }
  )
  
  const getDisabledDays = () => {
    const disabledDays = props.dateOptions?.disabledDays
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
          props.inputClassName
        )}
        disabled={props.disabled}
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
          props.dateOptions?.placeholder || "Pick a date range"
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
  const renderTimePicker = (field: any, props: CustomFormFieldProps) => {
    const [open, setOpen] = useState(false)
    const interval = props.timeOptions?.interval || 30
    
    const generateTimeSlots = () => {
      const slots = []
      for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += interval) {
          const time = setMinutes(setHours(new Date(), hour), minute)
          slots.push(time)
        }
      }
      return slots
    }
    
    const timeSlots = generateTimeSlots()
    
    return (
      <div className="relative">
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !field.value && "text-muted-foreground",
            props.inputClassName
          )}
          disabled={props.disabled}
          onClick={() => setOpen(!open)}
        >
          <Clock className="mr-2 h-4 w-4 group-focus:text-primary transition-colors" />
          {field.value ? (
            format(new Date(field.value), props.timeOptions?.format || "p")
          ) : (
            props.timeOptions?.placeholder || "Pick a time"
          )}
        </Button>
        {open && (
          <div className="absolute top-full z-50 mt-1 bg-white border rounded-md shadow-lg">
            <div className="max-h-60 overflow-y-auto p-2">
              {timeSlots.map((time, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start px-3 py-2"
                  onClick={() => {
                    field.onChange(time)
                    setOpen(false)
                  }}
                >
                  {format(time, "p")}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderSelect = (field: any, props: CustomFormFieldProps) => {
    return (
      <Select
        value={field.value}
        onValueChange={field.onChange}
        disabled={props.disabled}
      >
        <SelectTrigger className={cn(props.inputClassName)}>
          <SelectValue placeholder={props.placeholder} />
        </SelectTrigger>
        <SelectContent>
          {props.options?.map((option) => (
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

  const renderMultiSelect = (field: any, props: CustomFormFieldProps) => {
    const [open, setOpen] = useState(false)
    
    const handleToggle = (value: string) => {
      const currentValues = field.value || []
      if (currentValues.includes(value)) {
        field.onChange(currentValues.filter((v: string) => v !== value))
      } else {
        field.onChange([...currentValues, value])
      }
    }
    
    return (
      <div className="relative">
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !field.value?.length && "text-muted-foreground",
            props.inputClassName
          )}
          disabled={props.disabled}
          onClick={() => setOpen(!open)}
        >
          <ChevronDown className="mr-2 h-4 w-4 group-focus:text-primary transition-colors" />
          {field.value?.length ? (
            <div className="flex gap-1 flex-wrap">
              {field.value.map((value: string) => (
                <Badge key={value} variant="secondary" className="text-xs">
                  {props.options?.find((opt) => opt.value === value)?.label || value}
                </Badge>
              ))}
            </div>
          ) : (
            props.placeholder || "Select options"
          )}
        </Button>
        {open && (
          <div className="absolute top-full z-50 mt-1 bg-white border rounded-md shadow-lg w-full">
            <Command>
              <CommandInput placeholder="Search options..." />
              <CommandList>
                <CommandEmpty>No options found.</CommandEmpty>
                <CommandGroup>
                  {props.options?.map((option) => (
                    <CommandItem
                      key={option.value}
                      onSelect={() => handleToggle(option.value)}
                      disabled={option.disabled}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          field.value?.includes(option.value) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        )}
      </div>
    )
  }

  const renderCombobox = (field: any, props: CustomFormFieldProps) => {
    const [open, setOpen] = useState(false)
    const [inputValue, setInputValue] = useState("")
    
    const selectedOption = props.options?.find((option) => option.value === field.value)
    
    return (
      <div className="relative">
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between text-left font-normal",
            !field.value && "text-muted-foreground",
            props.inputClassName
          )}
          disabled={props.disabled}
          onClick={() => setOpen(!open)}
        >
          {selectedOption ? selectedOption.label : props.placeholder || "Select option"}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50 group-focus:text-primary transition-colors" />
        </Button>
        {open && (
          <div className="absolute top-full z-50 mt-1 bg-white border rounded-md shadow-lg w-full">
            <Command>
              <CommandInput
                placeholder="Search options..."
                value={inputValue}
                onValueChange={setInputValue}
              />
              <CommandList>
                <CommandEmpty>No options found.</CommandEmpty>
                <CommandGroup>
                  {props.options?.map((option) => (
                    <CommandItem
                      key={option.value}
                      onSelect={() => {
                        field.onChange(option.value)
                        setOpen(false)
                      }}
                      disabled={option.disabled}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          field.value === option.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        )}
      </div>
    )
  }

  const renderRadio = (field: any, props: CustomFormFieldProps) => {
    return (
      <RadioGroup
        value={field.value}
        onValueChange={field.onChange}
        disabled={props.disabled}
        className={cn(props.inputClassName)}
      >
        {props.options?.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={option.value} disabled={option.disabled} />
            <Label htmlFor={option.value}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
    )
  }

  const renderCheckbox = (field: any, props: CustomFormFieldProps) => {
    return (
      <div className="flex items-center space-x-2">
        <Checkbox
          id={props.name}
          checked={field.value}
          onCheckedChange={field.onChange}
          disabled={props.disabled}
        />
        <Label htmlFor={props.name} className="text-sm font-medium">
          {props.label}
        </Label>
      </div>
    )
  }

  const renderCheckboxGroup = (field: any, props: CustomFormFieldProps) => {
    const handleToggle = (value: string) => {
      const currentValues = field.value || []
      if (currentValues.includes(value)) {
        field.onChange(currentValues.filter((v: string) => v !== value))
      } else {
        field.onChange([...currentValues, value])
      }
    }
    
    return (
      <div className={cn("space-y-2", props.inputClassName)}>
        {props.options?.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={option.value}
              checked={field.value?.includes(option.value)}
              onCheckedChange={() => handleToggle(option.value)}
              disabled={option.disabled || props.disabled}
            />
            <Label htmlFor={option.value} className="text-sm font-medium">
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    )
  }

  const renderSwitch = (field: any, props: CustomFormFieldProps) => {
    return (
      <div className="flex items-center space-x-2">
        <Switch
          id={props.name}
          checked={field.value}
          onCheckedChange={field.onChange}
          disabled={props.disabled}
        />
        <Label htmlFor={props.name} className="text-sm font-medium">
          {props.label}
        </Label>
      </div>
    )
  }

  const renderSlider = (field: any, props: CustomFormFieldProps) => {
    return (
      <div className="space-y-2">
        <Slider
          value={[field.value]}
          onValueChange={(value) => field.onChange(Array.isArray(value) ? value[0] : value)}
          max={props.max}
          min={props.min}
          step={props.step || 1}
          disabled={props.disabled}
          className={cn(props.inputClassName)}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{props.min || 0}</span>
          <span className="font-medium text-foreground">{field.value}</span>
          <span>{props.max || 100}</span>
        </div>
        {props.sliderMarks && (
          <div className="flex justify-between text-xs text-muted-foreground">
            {props.sliderMarks.map((mark) => (
              <span key={mark.value}>{mark.label}</span>
            ))}
          </div>
        )}
      </div>
    )
  }

  const renderTagInput = (field: any, props: CustomFormFieldProps) => {
    const [inputValue, setInputValue] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)
    
    const handleAddTag = (tag: string) => {
      const trimmedTag = tag.trim()
      if (trimmedTag && !field.value?.includes(trimmedTag)) {
        field.onChange([...(field.value || []), trimmedTag])
      }
      setInputValue("")
    }
    
    const handleRemoveTag = (tagToRemove: string) => {
      field.onChange(field.value?.filter((tag: string) => tag !== tagToRemove))
    }
    
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault()
        handleAddTag(inputValue)
      } else if (e.key === "Backspace" && !inputValue && field.value?.length) {
        handleRemoveTag(field.value[field.value.length - 1])
      }
    }
    
    return (
      <div className={cn("flex flex-wrap gap-2 p-2 border rounded-md", props.inputClassName)}>
        {field.value?.map((tag: string) => (
          <Badge key={tag} variant="secondary" className="flex items-center gap-1">
            {tag}
            <X
              className="h-3 w-3 cursor-pointer group-focus:text-primary transition-colors"
              onClick={() => handleRemoveTag(tag)}
            />
          </Badge>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={props.placeholder || "Add tag..."}
          className="flex-1 min-w-25 outline-none bg-transparent"
          disabled={props.disabled}
        />
      </div>
    )
  }

  const renderFileUpload = (field: any, props: CustomFormFieldProps) => {
    const [dragActive, setDragActive] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    
    const handleFiles = (files: FileList | null) => {
      if (!files) return
      
      const validFiles = Array.from(files).filter((file) => {
        if (props.fileUploadOptions?.maxSize && file.size > props.fileUploadOptions.maxSize) {
          return false
        }
        if (props.fileUploadOptions?.accept && !file.type.match(props.fileUploadOptions.accept)) {
          return false
        }
        return true
      })
      
      if (props.fileUploadOptions?.multiple) {
        field.onChange([...(field.value || []), ...validFiles])
      } else {
        field.onChange(validFiles[0] || null)
      }
    }
    
    const handleDrag = (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true)
      } else if (e.type === "dragleave") {
        setDragActive(false)
      }
    }
    
    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)
      handleFiles(e.dataTransfer.files)
    }
    
    const handleRemoveFile = (index: number) => {
      if (props.fileUploadOptions?.multiple) {
        field.onChange(field.value?.filter((_: File, i: number) => i !== index))
      } else {
        field.onChange(null)
      }
    }
    
    const renderFilePreview = (file: File, index: number) => {
      const isImage = file.type.startsWith("image/")
      
      return (
        <div key={index} className="relative group">
          {isImage && props.fileUploadOptions?.showPreview ? (
            <div className="relative w-20 h-20 rounded-md overflow-hidden border">
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="flex items-center gap-2 p-2 border rounded-md">
              {isImage ? (
                <ImageIcon className="h-4 w-4 group-focus:text-primary transition-colors" />
              ) : (
                <FileText className="h-4 w-4 group-focus:text-primary transition-colors" />
              )}
              <span className="text-sm truncate max-w-50">{file.name}</span>
            </div>
          )}
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => handleRemoveFile(index)}
          >
            <X className="h-3 w-3 group-focus:text-primary transition-colors" />
          </Button>
        </div>
      )
    }
    
    return (
      <div className="space-y-2">
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors",
            dragActive ? "border-primary bg-primary/10" : "border-muted-foreground/25",
            props.inputClassName
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2 group-focus:text-primary transition-colors" />
          <p className="text-sm text-muted-foreground">
            {props.placeholder || "Drag and drop files here, or click to select"}
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple={props.fileUploadOptions?.multiple}
            accept={props.fileUploadOptions?.accept}
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
            disabled={props.disabled}
          />
        </div>
        
        {field.value && (
          <div className="flex flex-wrap gap-2">
            {props.fileUploadOptions?.multiple ? (
              field.value.map((file: File, index: number) => renderFilePreview(file, index))
            ) : (
              renderFilePreview(field.value, 0)
            )}
          </div>
        )}
      </div>
    )
  }

  const renderColorPicker = (field: any, props: CustomFormFieldProps) => {
    const [open, setOpen] = useState(false)
    
    const presetColors = [
      "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16",
      "#22c55e", "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9",
      "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef",
      "#ec4899", "#f43f5e", "#000000", "#ffffff", "#9ca3af"
    ]
    
    return (
      <div className="relative">
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            props.inputClassName
          )}
          disabled={props.disabled}
          onClick={() => setOpen(!open)}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded border"
              style={{ backgroundColor: field.value || "#000000" }}
            />
            <span>{field.value || "Pick a color"}</span>
          </div>
        </Button>
        {open && (
          <div className="absolute top-full z-50 mt-1 bg-white border rounded-md shadow-lg p-3">
            <div className="space-y-3">
              <div className="grid grid-cols-5 gap-2">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    className={cn(
                      "w-8 h-8 rounded border-2 border-border hover:scale-110 transition-transform",
                      field.value === color && "ring-2 ring-primary ring-offset-2"
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      field.onChange(color)
                      setOpen(false)
                    }}
                  />
                ))}
              </div>
              <Input
                type="color"
                value={field.value || "#000000"}
                onChange={(e) => field.onChange(e.target.value)}
                className="w-full h-10"
              />
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderRating = (field: any, props: CustomFormFieldProps) => {
    const maxRating = props.maxRating || 5
    const [hoveredRating, setHoveredRating] = useState(0)
    
    return (
      <div className={cn("flex gap-1", props.inputClassName)}>
        {Array.from({ length: maxRating }, (_, i) => i + 1).map((rating) => (
          <button
            key={rating}
            type="button"
            className="transition-colors"
            onClick={() => field.onChange(rating)}
            onMouseEnter={() => setHoveredRating(rating)}
            onMouseLeave={() => setHoveredRating(0)}
            disabled={props.disabled}
          >
            <Star
              className={cn(
                "h-6 w-6",
                rating <= (hoveredRating || field.value || 0)
                  ? "fill-primary text-primary"
                  : "text-muted-foreground"
              )}
            />
          </button>
        ))}
      </div>
    )
  }

  const renderOtpInput = (field: any, props: CustomFormFieldProps) => {
    const length = props.otpLength || 6
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    
    const handleChange = (index: number, value: string) => {
      const newOtp = field.value ? field.value.split("") : Array(length).fill("")
      newOtp[index] = value.slice(-1)
      const otpString = newOtp.join("")
      field.onChange(otpString)
      
      // Auto-focus next input
      if (value && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }
    
    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
      if (e.key === "Backspace" && !field.value?.[index] && index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    }
    
    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault()
      const pastedData = e.clipboardData.getData("text").slice(0, length)
      field.onChange(pastedData.padEnd(length, ""))
    }
    
    return (
      <div className={cn("flex gap-2", props.inputClassName)}>
        {Array.from({ length }, (_, i) => (
          <Input
            key={i}
            ref={(el) => {
            inputRefs.current[i] = el
          }}
            type="text"
            maxLength={1}
            value={field.value?.[i] || ""}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={i === 0 ? handlePaste : undefined}
            className="w-10 h-10 text-center"
            disabled={props.disabled}
          />
        ))}
      </div>
    )
  }

  const renderAutocomplete = (field: any, props: CustomFormFieldProps) => {
    const [open, setOpen] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [loading, setLoading] = useState(false)
    const [options, setOptions] = useState<Option[]>([])
    
    const debouncedInputValue = useDebounce(inputValue, props.autocompleteOptions?.debounceMs || 300)
    
    useEffect(() => {
      if (debouncedInputValue.length >= (props.autocompleteOptions?.minLength || 2)) {
        setLoading(true)
        props.autocompleteOptions?.searchApi(debouncedInputValue)
          .then(setOptions)
          .finally(() => setLoading(false))
      } else {
        setOptions([])
      }
    }, [debouncedInputValue, props.autocompleteOptions])
    
    const selectedOption = options.find((option) => option.value === field.value)
    
    return (
      <div className="relative">
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between text-left font-normal",
            !field.value && "text-muted-foreground",
            props.inputClassName
          )}
          disabled={props.disabled}
          onClick={() => setOpen(!open)}
        >
          {selectedOption ? selectedOption.label : props.placeholder || "Search..."}
          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50 group-focus:text-primary transition-colors" />
        </Button>
        {open && (
          <div className="absolute top-full z-50 mt-1 bg-white border rounded-md shadow-lg w-full">
            <Command>
              <CommandInput
                placeholder="Search..."
                value={inputValue}
                onValueChange={setInputValue}
              />
              <CommandList>
                {loading ? (
                  <div className="p-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4 mt-2" />
                    <Skeleton className="h-4 w-1/2 mt-2" />
                  </div>
                ) : options.length === 0 ? (
                  <CommandEmpty>No results found.</CommandEmpty>
                ) : (
                  <CommandGroup>
                    {options.map((option) => (
                      <CommandItem
                        key={option.value}
                        onSelect={() => {
                          field.onChange(option.value)
                          setOpen(false)
                        }}
                        disabled={option.disabled}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value === option.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </div>
        )}
      </div>
    )
  }

  const renderCurrency = (field: any, props: CustomFormFieldProps) => {
    const [displayValue, setDisplayValue] = useState("")
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/[^\d.]/g, "")
      const numValue = parseFloat(value) || 0
      setDisplayValue(value)
      field.onChange(numValue)
    }
    
    const formattedValue = field.value ? formatCurrency(field.value, props.currency, props.locale) : ""
    
    return (
      <div className="relative group">
        <Input
          {...field}
          type="text"
          placeholder={props.placeholder || "0.00"}
          disabled={props.disabled}
          className={cn(props.inputClassName, "px-6 py-5 text-base pl-14")}
          value={displayValue}
          onChange={handleChange}
          aria-label={props.ariaLabel}
          aria-describedby={props.ariaDescribedBy}
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground group-focus-within:text-primary transition-colors">
          {props.currency || "$"}
        </div>
      </div>
    )
  }

  const renderPercentage = (field: any, props: CustomFormFieldProps) => {
    const [displayValue, setDisplayValue] = useState("")
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/[^\d.]/g, "")
      const numValue = parseFloat(value) || 0
      setDisplayValue(value)
      field.onChange(numValue)
    }
    
    return (
      <div className="relative group">
        <Input
          {...field}
          type="text"
          placeholder={props.placeholder || "0"}
          disabled={props.disabled}
          className={cn(props.inputClassName, "px-6 py-5 text-base pr-14")}
          value={displayValue}
          onChange={handleChange}
          min={props.min}
          max={props.max}
          aria-label={props.ariaLabel}
          aria-describedby={props.ariaDescribedBy}
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground group-focus-within:text-primary transition-colors">
          %
        </div>
      </div>
    )
  }

  // Main CustomFormField Component
  const CustomFormField = <T extends FieldValues>(props: CustomFormFieldProps<T>) => {
    const {
      fieldType,
      control,
      name,
      label,
      description,
      required,
      disabled,
      loading,
      className,
      labelClassName,
      inputClassName,
      containerClassName,
      tooltip,
      dir = "ltr",
    } = props
    
    const renderField = useCallback((field: any) => {
      const fieldProps = { ...props, inputClassName } as any
      
      switch (fieldType) {
        case FormFieldType.INPUT:
          return renderInput(field, fieldProps)
        case FormFieldType.PASSWORD:
          return renderPassword(field, fieldProps)
        case FormFieldType.EMAIL:
          return renderEmail(field, fieldProps)
        case FormFieldType.PHONE:
          return renderPhone(field, fieldProps)
        case FormFieldType.NUMBER:
          return renderNumber(field, fieldProps)
        case FormFieldType.TEXTAREA:
          return renderTextarea(field, fieldProps)
        case FormFieldType.CHECKBOX:
          return renderCheckbox(field, fieldProps)
        case FormFieldType.RADIO:
          return renderRadio(field, fieldProps)
        case FormFieldType.SWITCH:
          return renderSwitch(field, fieldProps)
        case FormFieldType.SLIDER:
          return renderSlider(field, fieldProps)
        case FormFieldType.SELECT:
          return renderSelect(field, fieldProps)
        case FormFieldType.MULTI_SELECT:
          return renderMultiSelect(field, fieldProps)
        case FormFieldType.DATE_PICKER:
          return renderDatePicker(field, fieldProps)
        case FormFieldType.DATE_RANGE:
          return renderDateRange(field, fieldProps)
        case FormFieldType.TIME_PICKER:
          return renderTimePicker(field, fieldProps)
        case FormFieldType.FILE_UPLOAD:
          return renderFileUpload(field, fieldProps)
        case FormFieldType.RATING:
          return renderRating(field, fieldProps)
        case FormFieldType.COMBOBOX:
          return renderCombobox(field, fieldProps)
        case FormFieldType.AUTOCOMPLETE:
          return renderAutocomplete(field, fieldProps)
        case FormFieldType.COLOR_PICKER:
          return renderColorPicker(field, fieldProps)
        case FormFieldType.OTP_INPUT:
          return renderOtpInput(field, fieldProps)
        case FormFieldType.TAG_INPUT:
          return renderTagInput(field, fieldProps)
        case FormFieldType.CURRENCY:
          return renderCurrency(field, fieldProps)
        case FormFieldType.PERCENTAGE:
          return renderPercentage(field, fieldProps)
        default:
          return null
      }
    }, [fieldType, props])
    
    const renderLabel = () => {
      if (!label && fieldType !== FormFieldType.CHECKBOX && fieldType !== FormFieldType.SWITCH) {
        return null
      }
      
      const labelContent = (
        <Label className={cn("text-sm font-medium", labelClassName)}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )
      
      if (tooltip) {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center gap-1">
                  {labelContent}
                  <AlertCircle className="h-3 w-3 text-muted-foreground" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      }
      
      return labelContent
    }
    
    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <div
            className={cn("space-y-2", containerClassName, className)}
            dir={dir}
          >
            {renderLabel()}
            {loading ? (
              <Skeleton className={cn("h-10 w-full", inputClassName)} />
            ) : (
              renderField(field)
            )}
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
            {fieldState.error && (
              <p className="text-xs text-destructive">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />
    )
  }

  export default CustomFormField
