import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { approvalRequests, ProductApprovalRequest } from "@/features/productApproval/data/productApproval.data"
import {
  ProductGallery,
  ProductInfoCard,
  IngredientsCard,
  NutritionCard,
  CertificateViewer,
  VendorInfoCard,
  ProductStatusCard,
  ApproveDialog,
  RejectDialog
} from "../components"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/shared/headers/PageHeader"

const getVendorById = (vendorId: string) => {
  const vendors = {
    "VEN-001": {
      id: "VEN-001",
      storeName: { en: "Al Asala Restaurant", ar: "مطعم الأصالة" },
      email: "contact@alasala.com",
      phone: "+966 12 345 6789",
      registrationDate: "2024-01-15",
    },
    "VEN-002": {
      id: "VEN-002",
      storeName: { en: "Al Quds Bakeries", ar: "مخابز القدس" },
      email: "info@alquds.com",
      phone: "+966 12 345 6790",
      registrationDate: "2024-02-20",
    },
    "VEN-003": {
      id: "VEN-003",
      storeName: { en: "Nature Juices", ar: "عصائر الطبيعة" },
      email: "hello@naturejuices.com",
      phone: "+966 12 345 6791",
      registrationDate: "2024-03-10",
    },
    "VEN-004": {
      id: "VEN-004",
      storeName: { en: "Healthy Bites", ar: "لدغات صحية" },
      email: "info@healthybites.com",
      phone: "+966 12 345 6792",
      registrationDate: "2024-03-25",
    },
  }
  return vendors[vendorId as keyof typeof vendors]
}

const ProductApprovalDetailsPage: React.FC = () => {
    const { t } = useTranslation('productApproval')
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const [product, setProduct] = useState<ProductApprovalRequest | undefined>(undefined)

  useEffect(() => {
    if (!id) return
    const found = approvalRequests.find((item) => item.id === id)
    if (found) {
      setProduct(found)
    }
  }, [id])

  

  const handleApprove = async () => {
    // Empty for now
  }

  const handleReject = async (reasonEn: string, reasonAr: string) => {
    // Empty for now
  }

  const headerRightContent = (
    <div className="flex items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <>
            <DropdownMenuSeparator />
            <div onClick={(e) => e.stopPropagation()}>
              <ApproveDialog onConfirm={handleApprove} />
            </div>
            <div onClick={(e) => e.stopPropagation()}>
              <RejectDialog onConfirm={handleReject} />
            </div>
          </>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )

  if (!product) {
    return (
      <div className="space-y-6">
        <PageHeader
          title={t("notFoundTitle")}
          description={t("notFoundDescription")}
          showBackButton
          backButtonLabel={t("backToList")}
          onBackClick={() => navigate("/admin/product-approval")}
        />
      </div>
    )
  }

  const vendorData = getVendorById(product.vendorId)

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("reviewTitle")}
        description={t("reviewDescription")}
        showBackButton
        backButtonLabel={t("backToList")}
        rightContent={headerRightContent}
        gradient="from-primary/5 via-primary/10 to-transparent"
        image={{
          src: "/images/product-approval-header.png",
          alt: "Product Approval",
          position: "right",
        }}
      />

      <div className="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
        <div className="space-y-6">
          <ProductGallery mainImage={product.mainImage} />

          <ProductInfoCard product={product} />

          <div className="grid gap-6 xl:grid-cols-2">
            <IngredientsCard ingredients={product.ingredients} />
            <NutritionCard nutrition={product.nutrition} />
          </div>
        </div>

        <div className="space-y-6">
          <ProductStatusCard
            status={product.status}
            glutenStatus={product.glutenStatus}
            rejectionReason={product.rejectionReason}
          />

          <VendorInfoCard vendor={vendorData} />
          <CertificateViewer certificate={product.certificate} />
        </div>
      </div>
    </div>
  )
}

export default ProductApprovalDetailsPage