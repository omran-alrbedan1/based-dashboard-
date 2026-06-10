import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CertificateRecord } from "@/features/products/data/products.data"
import { FileText, Download, Eye, Calendar as CalendarIcon } from "lucide-react"

interface CertificateViewerProps {
  certificate: CertificateRecord
}

const CertificateViewer: React.FC<CertificateViewerProps> = ({ certificate }) => {
  const { t, i18n } = useTranslation('products')
  const [isOpen, setIsOpen] = useState(false)

  const currentLabel = certificate.label[i18n.language as keyof typeof certificate.label] || certificate.label.en

  const renderPreview = () => {
    if (certificate.type === "image") {
      return (
        <div className="group bg-card relative overflow-hidden rounded-xl ">
          <img
            src={certificate.url}
            alt={currentLabel}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )
    }

    return (
      <div className="flex h-48 flex-col items-center justify-center gap-2 rounded-xl dark:bg-gray-300">
        <FileText className="h-12 w-12 text-primary/40" />
        <p className="text-sm text-text-secondary">{t("pdfPreviewPlaceholder")}</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-text flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            {t("certificate")}
          </h2>
          <p className="mt-1 text-sm font-medium text-text">{currentLabel}</p>
          {certificate.expiryDate && (
            <p className="mt-1 flex items-center gap-1 text-xs text-text-secondary">
              <CalendarIcon className="h-3 w-3" />
              {t("expiryDate")}: {certificate.expiryDate}
            </p>
          )}
        </div>
      </div>
      
      {renderPreview()}
      
      <div className="mt-4 flex flex-wrap gap-2">
        {certificate.type === "pdf" ? (
          <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Eye className="h-4 w-4" />
                  {t("viewPdf")}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl p-0">
                <iframe title={currentLabel} src={certificate.url} className="h-[75vh] w-full rounded-lg" />
              </DialogContent>
            </Dialog>
            <a href={certificate.url} target="_blank" rel="noreferrer" className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium text-text transition-all hover:bg-slate-50">
              <Download className="h-4 w-4" />
              {t("downloadPdf")}
            </a>
          </>
        ) : (
          <a href={certificate.url} target="_blank" rel="noreferrer" className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium text-text transition-all hover:bg-slate-50">
            <Download className="h-4 w-4" />
            {t("downloadImage")}
          </a>
        )}
      </div>
    </div>
  )
}

export default CertificateViewer