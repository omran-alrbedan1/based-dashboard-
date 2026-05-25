import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { ProductApprovalRequest } from "@/features/productApproval/data/productApproval.data"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  Tag,
  Banknote,
  CalendarDays,
  Wheat,
  Store,
  ArrowRight,
  MoreVertical,
  Eye,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import RejectDialog from "./RejectDialog"
import ApproveDialog from "./ApproveDialog"
import { StatusBadge } from "@/components/shared/badges"

interface ApprovalRequestCardProps {
  request: ProductApprovalRequest
  onStatusChange?: (productId: string, status: "Approved" | "Rejected", reason?: { en: string; ar: string }) => void
}

const ApprovalRequestCard: React.FC<ApprovalRequestCardProps> = ({ request, onStatusChange }) => {
  const { t, i18n } = useTranslation('productApproval')
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

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

  const name =
    request.name[i18n.language as keyof typeof request.name] || request.name.en
  const vendor =
    request.vendorName[i18n.language as keyof typeof request.vendorName] ||
    request.vendorName.en

  const handleApprove = async () => {
    setIsProcessing(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      onStatusChange?.(request.id, "Approved")
      setDropdownOpen(false)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReject = async (reasonEn: string, reasonAr: string) => {
    setIsProcessing(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      onStatusChange?.(request.id, "Rejected", { en: reasonEn, ar: reasonAr })
      setDropdownOpen(false)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleViewDetails = () => {
    navigate(`/admin/product-approval/${request.id}`)
  }

  const isPending = request.status === "Pending"

  return (
    <Card className="group overflow-hidden border border-border/60 hover:border-border hover:shadow-md transition-all duration-300 bg-card rounded-xl">
      {/* Image Header */}
      <CardHeader className="p-0 relative">
        <div className="relative h-36 overflow-hidden bg-muted/40">
          <img
            src={request.mainImage}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          {/* Status Badge - Top Left */}
          <div className="absolute top-2.5 left-2.5">
            <StatusBadge status={request.status} />
          </div>
          
          {/* Three Dots Menu - Top Right */}
          <div className="absolute top-2.5 right-2.5">
            {isPending && (
              <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 bg-primary/20 hover:bg-primary/70 border border-primary text-white rounded-full backdrop-blur-sm transition-all duration-200"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem 
                    onClick={handleViewDetails}
                    className="cursor-pointer"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    {t("viewDetails")}
                  </DropdownMenuItem>
                  
                  {isPending && (
                    <>
                      <DropdownMenuSeparator />
                      {/* Don't wrap ApproveDialog in DropdownMenuItem */}
                      <div onClick={(e) => e.stopPropagation()}>
                        <ApproveDialog
                          onConfirm={handleApprove}
                        />
                      </div>
                      <div onClick={(e) => e.stopPropagation()}>
                        <RejectDialog
                          onConfirm={handleReject}
                        />
                      </div>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="px-4 pt-3.5 pb-3 space-y-2.5">
        {/* Title + vendor */}
        <div>
          <h3 className="text-sm font-semibold text-text leading-snug line-clamp-1">
            {name}
          </h3>
          <div className="flex items-center gap-1 mt-0.5">
            <Store className="w-4 h-4 text-primary shrink-0" />
            <p className="text-xs text-text-secondary line-clamp-1">{vendor}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border/50" />

        {/* Details grid */}
        <div className="space-y-1.5">
          <MetaRow
            icon={<Tag className="w-3.5 h-3.5" />}
            label={t("category")}
            value={request.category}
          />
          <MetaRow
            icon={<Banknote className="w-3.5 h-3.5" />}
            label={t("price")}
            value={`${request.price} SAR`}
            valueClass="text-primary font-semibold"
          />
          <MetaRow
            icon={<CalendarDays className="w-3.5 h-3.5" />}
            label={t("submittedDate")}
            value={request.submittedDate}
          />
          <MetaRow
            icon={<Wheat className="w-3.5 h-3.5" />}
            label={t("glutenStatus")}
            value={request.glutenStatus}
            valueClass={getGlutenStatusColor(request.glutenStatus)}
          />
        </div>
      </CardContent>

      {/* Footer - View Details button */}
      <CardFooter className="px-4 pb-4 pt-0">
        <Button
          variant="outline"
          className="w-full"
          onClick={handleViewDetails}
        >
          <Eye className="w-3.5 h-3.5 mr-2" />
          {t("viewDetails")}
          <ArrowRight className="w-3.5 h-3.5 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  )
}

interface MetaRowProps {
  icon: React.ReactNode
  label: string
  value: string
  valueClass?: string
}

const MetaRow: React.FC<MetaRowProps> = ({
  icon,
  label,
  value,
  valueClass = "text-text",
}) => (
  <div className="flex items-center justify-between gap-3 text-sm">
    <span className="flex items-center gap-2 text-text-secondary min-w-0">
      <span className="shrink-0 text-primary">{icon}</span>
      <span className="truncate">{label}</span>
    </span>
    <span className={`font-medium truncate text-right ${valueClass}`}>{value}</span>
  </div>
)

export default ApprovalRequestCard