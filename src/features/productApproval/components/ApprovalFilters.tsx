import React from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  FilterX, 
  Search, 
  Store, 
  FolderOpen, 
  CheckCircle2,
  XCircle,
  Clock,
  SlidersHorizontal,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface ApprovalFiltersProps {
  search: string
  vendor: string
  category: string
  status: string
  vendors: string[]
  categories: string[]
  hasActiveFilters: boolean
  activeFiltersCount: number
  onSearchChange: (value: string) => void
  onVendorChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onStatusChange: (value: string) => void
  onResetFilters: () => void
}

const PLACEHOLDER_VALUE = "__ALL__"

const ApprovalFilters: React.FC<ApprovalFiltersProps> = ({
  search,
  vendor,
  category,
  status,
  vendors,
  categories,
  hasActiveFilters,
  activeFiltersCount,
  onSearchChange,
  onVendorChange,
  onCategoryChange,
  onStatusChange,
  onResetFilters,
}) => {
  const { t } = useTranslation('productApproval')

  const normalizeValue = (value: string) => (value === PLACEHOLDER_VALUE ? "" : value)

  const getStatusColor = (statusValue: string) => {
    switch(statusValue) {
      case "Pending": return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "Approved": return "text-green-600 bg-green-50 border-green-200"
      case "Rejected": return "text-red-600 bg-red-50 border-red-200"
      default: return ""
    }
  }

  const getStatusIcon = (statusValue: string) => {
    switch(statusValue) {
      case "Pending": return <Clock className="mr-2 h-4 w-4 text-yellow-600" />
      case "Approved": return <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
      case "Rejected": return <XCircle className="mr-2 h-4 w-4 text-red-600" />
      default: return null
    }
  }

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md">
      {/* Header with title and reset button */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-2">
            <SlidersHorizontal className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text">
              {t("filters")}
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
                  {activeFiltersCount} active
                </Badge>
              )}
            </h2>
            <p className="text-sm text-text-secondary">
              {t("filterDescription")}
            </p>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onResetFilters}
          disabled={!hasActiveFilters}
          className="relative group/btn transition-all duration-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
        >
          <FilterX className="mr-2 h-4 w-4 transition-transform group-hover/btn:rotate-12" />
          {t("resetFilters")}
          {activeFiltersCount > 0 && (
            <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-white transition-all group-hover/btn:bg-red-500">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </div>

      {/* Filter inputs - All in one line */}
      <div className="flex flex-wrap items-end gap-3">
        {/* Search Input */}
        <div className="flex-1 min-w-[180px]">
          <label className="mb-2 block text-xs font-medium text-text-secondary">
            <Search className="mr-1 inline-block h-4 w-4 text-primary" />
            {t("search")}
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
            <Input
              id="product-search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={t("searchPlaceholder")}
              className="pl-9 h-10 transition-all duration-200 focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Vendor Select */}
        <div className="flex-1 min-w-36">
          <label className="mb-2 block text-xs font-medium text-text-secondary">
            <Store className="mr-1 inline-block h-4 w-4 text-primary" />
            {t("vendor")}
          </label>
          <Select value={vendor || PLACEHOLDER_VALUE} onValueChange={(value) => onVendorChange(normalizeValue(value))}>
            <SelectTrigger className="h-10 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary">
              <SelectValue placeholder={t("vendor")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={PLACEHOLDER_VALUE} className="text-text-secondary">
                {t("allVendors")}
              </SelectItem>
              {vendors.map((name) => (
                <SelectItem key={name} value={name} className="cursor-pointer transition-colors hover:bg-primary/10">
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category Select */}
        <div className="flex-1 min-w-36">
          <label className="mb-2 block text-xs font-medium text-text-secondary">
            <FolderOpen className="mr-1 inline-block h-4 w-4 text-primary" />
            {t("category")}
          </label>
          <Select value={category || PLACEHOLDER_VALUE} onValueChange={(value) => onCategoryChange(normalizeValue(value))}>
            <SelectTrigger className="h-10 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary">
              <SelectValue placeholder={t("category")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={PLACEHOLDER_VALUE} className="text-text-secondary">
                {t("allCategories")}
              </SelectItem>
              {categories.map((name) => (
                <SelectItem key={name} value={name} className="cursor-pointer transition-colors hover:bg-primary/10">
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status Select */}
        <div className="flex-1 min-w-36">
          <label className="mb-2 block text-xs font-medium text-text-secondary">
            <CheckCircle2 className="mr-1 inline-block h-4 w-4 text-primary" />
            {t("status")}
          </label>
          <Select value={status || PLACEHOLDER_VALUE} onValueChange={(value) => onStatusChange(normalizeValue(value))}>
            <SelectTrigger 
              className={`h-10 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary ${
                status && status !== PLACEHOLDER_VALUE ? getStatusColor(status) : ""
              }`}
            >
              <SelectValue placeholder={t("status")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={PLACEHOLDER_VALUE} className="text-text-secondary">
                {t("allStatuses")}
              </SelectItem>
              <SelectItem value="Pending" className="cursor-pointer transition-colors hover:bg-yellow-50">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-yellow-600" />
                  {t("pending")}
                </div>
              </SelectItem>
              <SelectItem value="Approved" className="cursor-pointer transition-colors hover:bg-green-50">
                <div className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                  {t("approved")}
                </div>
              </SelectItem>
              <SelectItem value="Rejected" className="cursor-pointer transition-colors hover:bg-red-50">
                <div className="flex items-center">
                  <XCircle className="mr-2 h-4 w-4 text-red-600" />
                  {t("rejected")}
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active filters chips */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap items-center gap-2 pt-4 border-t border-border">
          <span className="text-xs text-text-secondary">Active filters:</span>
          {search && (
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 gap-1">
              <Search className="h-4 w-4 text-primary" />
              {search}
              <XCircle
                className="h-4 w-4 text-primary cursor-pointer hover:text-red-500 transition-colors"
                onClick={() => onSearchChange("")}
              />
            </Badge>
          )}
          {vendor && (
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 gap-1">
              <Store className="h-4 w-4 text-primary" />
              {vendor}
              <XCircle
                className="h-4 w-4 text-primary cursor-pointer hover:text-red-500 transition-colors"
                onClick={() => onVendorChange("")}
              />
            </Badge>
          )}
          {category && (
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 gap-1">
              <FolderOpen className="h-4 w-4 text-primary" />
              {category}
              <XCircle
                className="h-4 w-4 text-primary cursor-pointer hover:text-red-500 transition-colors"
                onClick={() => onCategoryChange("")}
              />
            </Badge>
          )}
          {status && (
            <Badge variant="secondary" className={`${getStatusColor(status)} bg-opacity-10 gap-1`}>
              {getStatusIcon(status)}
              {status === "Pending" && t("pending")}
              {status === "Approved" && t("approved")}
              {status === "Rejected" && t("rejected")}
              <XCircle
                className="h-4 w-4 text-primary cursor-pointer hover:text-red-500 transition-colors"
                onClick={() => onStatusChange("")}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}

export default ApprovalFilters