import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { ProductApprovalRequest } from "@/data/productApproval.data"
import {
  Tag,
  Banknote,
  CalendarDays,
  Wheat,
  Store,
  MoreVertical,
  Eye,
} from "lucide-react"
import StatusBadge from "../shared/badges/StatusBadge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import ApproveDialog from "./ApproveDialog"
import RejectDialog from "./RejectDialog"

interface ApprovalRequestListItemProps {
  request: ProductApprovalRequest
  onStatusChange?: (productId: string, status: "Approved" | "Rejected", reason?: { en: string; ar: string }) => void
}

const ApprovalRequestListItem: React.FC<ApprovalRequestListItemProps> = ({ request, onStatusChange }) => {
  const { t, i18n } = useTranslation('productApproval')
  const navigate = useNavigate()

  const getGlutenStatusColor = (status: string) => {
    switch (status) {
      case "Gluten Free":
        return "text-emerald-600 dark:text-emerald-400"
      case "May Contain Gluten":
        return "text-amber-500 dark:text-amber-400"
      case "Not Gluten Free":
        return "text-rose-500 dark:text-rose-400"
      default:
        return "text-text-secondary"
    }
  }

  const name = request.name[i18n.language as keyof typeof request.name] || request.name.en
  const vendor = request.vendorName[i18n.language as keyof typeof request.vendorName] || request.vendorName.en

  const handleApprove = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      onStatusChange?.(request.id, "Approved")
    } finally {}
  }

  const handleReject = async (reasonEn: string, reasonAr: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      onStatusChange?.(request.id, "Rejected", { en: reasonEn, ar: reasonAr })
    } finally {}
  }

  const handleViewDetails = () => {
    navigate(`/admin/product-approval/${request.id}`)
  }

  const handleItemClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.closest('[role="menuitem"]') || target.closest('[data-dropdown-trigger]')) {
      return
    }
    handleViewDetails()
  }

  const isPending = request.status === "Pending"

  return (
    <div
      className="group relative flex flex-col gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:shadow-md cursor-pointer lg:flex-row lg:items-center"
      onClick={handleItemClick}
    >
      <div className="absolute right-2 top-2 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild data-dropdown-trigger>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-primary/70 hover:text-white text-primary rounded-full backdrop-blur-sm transition-all duration-200"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={handleViewDetails} className="cursor-pointer">
              <Eye className="mr-2 h-4 w-4" />
              {t("viewDetails")}
            </DropdownMenuItem>

            {isPending && (
              <>
                <DropdownMenuSeparator />
                <div onClick={(e) => e.stopPropagation()}>
                  <ApproveDialog onConfirm={handleApprove} />
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  <RejectDialog onConfirm={handleReject} />
                </div>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Image */}
      <div className="relative h-32 w-full overflow-hidden rounded-md bg-muted/40 lg:h-24 lg:w-32">
        <img
          src={request.mainImage}
          alt={name}
          className="h-full w-full object-cover"
        />
        <div className="absolute left-4 top-2 lg:hidden">
          <StatusBadge status={request.status} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-2 pr-8 lg:pr-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-base font-semibold text-text">{name}</h3>
            <div className="mt-1 flex items-center gap-2">
              <Store className="h-3 w-3 text-text-secondary" />
              <span className="text-sm text-text-secondary">{vendor}</span>
            </div>
          </div>
          <div className="hidden lg:block mr-8">
            <StatusBadge status={request.status} />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <Tag className="h-3.5 w-3.5 text-primary" />
            <span className="text-text-secondary">{t("category")}:</span>
            <span className="font-medium text-text">{request.category}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Banknote className="h-3.5 w-3.5 text-primary" />
            <span className="text-text-secondary">{t("price")}:</span>
            <span className="font-semibold text-primary">{request.price} SAR</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-primary" />
            <span className="text-text-secondary">{t("submittedDate")}:</span>
            <span className="text-text">{request.submittedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Wheat className="h-3.5 w-3.5 text-primary" />
            <span className="text-text-secondary">{t("glutenStatus")}:</span>
            <span className={`font-medium ${getGlutenStatusColor(request.glutenStatus)}`}>
              {request.glutenStatus}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-2 lg:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={handleViewDetails}
          className="flex-1"
        >
          <Eye className="mr-2 h-4 w-4" />
          {t("viewDetails")}
        </Button>
      </div>
    </div>
  )
}

export default ApprovalRequestListItem