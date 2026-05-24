
import { useState, useMemo, useCallback } from "react"

export interface FilterConfig<T = any> {
  key:any
  label: string
  type: "search" | "select" | "multi-select" | "date" | "range"
  options?: Array<{ value: string; label: string }>
  getValue?: (item: T) => string | string[]
}

export interface UseFiltersOptions<T> {
  data: T[]
  config: FilterConfig<T>[]
  initialFilters?: Record<string, any>
}

export function useFilters<T extends Record<string, any>>({
  data,
  config,
  initialFilters = {}
}: UseFiltersOptions<T>) {
  const [filters, setFilters] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {}
    config.forEach((cfg) => {
      initial[cfg.key as string] = initialFilters[cfg.key as string] || ""
    })
    return initial
  })

  const handleFilterChange = useCallback((key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }, [])
  const resetFilters = useCallback(() => {
    const reset: Record<string, any> = {}
    config.forEach((cfg) => {
      reset[cfg.key as string] = ""
    })
    setFilters(reset)
  }, [config])

  const hasActiveFilters = useMemo(() => {
    return Object.values(filters).some(value => 
      value !== "" && value !== null && value !== undefined && 
      (Array.isArray(value) ? value.length > 0 : true)
    )
  }, [filters])

  const activeFiltersCount = useMemo(() => {
    return Object.values(filters).filter(value => 
      value !== "" && value !== null && value !== undefined &&
      (Array.isArray(value) ? value.length > 0 : true)
    ).length
  }, [filters])

  const filteredData = useMemo(() => {
    let result = [...data]

    config.forEach((cfg) => {
      const filterValue = filters[cfg.key as string]
      
      if (!filterValue || filterValue === "") return

      switch (cfg.type) {
        case "search":
          if (cfg.getValue) {
            result = result.filter(item => {
              const value = cfg.getValue!(item)
              if (Array.isArray(value)) {
                return value.some(v => 
                  v.toLowerCase().includes(filterValue.toLowerCase())
                )
              }
              return value.toLowerCase().includes(filterValue.toLowerCase())
            })
          }
          break

        case "select":
          result = result.filter(item => {
            const value = cfg.getValue ? cfg.getValue(item) : String(item[cfg.key])
            return value === filterValue
          })
          break

        case "multi-select":
          if (Array.isArray(filterValue) && filterValue.length > 0) {
            result = result.filter(item => {
              const value = cfg.getValue ? cfg.getValue(item) : String(item[cfg.key])
              return filterValue.includes(value)
            })
          }
          break

        case "date":
          result = result.filter(item => {
            const value = cfg.getValue ? cfg.getValue(item) : String(item[cfg.key])
            return value === filterValue
          })
          break

        case "range":
          if (filterValue.min !== undefined || filterValue.max !== undefined) {
            result = result.filter(item => {
              const value = cfg.getValue ? Number(cfg.getValue(item)) : Number(item[cfg.key])
              if (filterValue.min !== undefined && value < filterValue.min) return false
              if (filterValue.max !== undefined && value > filterValue.max) return false
              return true
            })
          }
          break
      }
    })

    return result
  }, [data, filters, config])

  // Get unique options for select filters
  const getFilterOptions = useCallback((key: string) => {
    const cfg = config.find(c => c.key === key)
    if (!cfg) return []
    
    if (cfg.options) return cfg.options
    
    // Auto-generate options from data
    const values = new Set<string>()
    data.forEach(item => {
      const value = cfg.getValue ? cfg.getValue(item) : String(item[cfg.key])
      if (Array.isArray(value)) {
        value.forEach(v => values.add(v))
      } else {
        values.add(value)
      }
    })
    
    return Array.from(values).sort().map(value => ({ value, label: value }))
  }, [data, config])

  return {
    filters,
    filteredData,
    hasActiveFilters,
    activeFiltersCount,
    handleFilterChange,
    resetFilters,
    getFilterOptions
  }
}