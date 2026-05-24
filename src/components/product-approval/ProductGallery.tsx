import React from "react"
import { useTranslation } from "react-i18next"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Maximize2 } from "lucide-react"

interface ProductGalleryProps {
  mainImage: string
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ mainImage }) => {
  const { t } = useTranslation('productApproval')

  return (
    <div className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="space-y-3">
        <div className="group relative overflow-hidden rounded-xl">
          <img
            src={mainImage}
            alt={t("productPreview")}
            className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Maximize2 className="h-4 w-4" />
            {t("previewImage")}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl">
          <img 
            src={mainImage} 
            alt={t("preview")} 
            className="h-[min(75vh,600px)] w-full rounded-lg object-contain" 
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProductGallery