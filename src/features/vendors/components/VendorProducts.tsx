import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Package, MoreVertical, Check, X } from 'lucide-react'
import type { Vendor, Product } from '../types/vendors.types'
import { useProducts } from '../hooks/useProducts'
import { ProductStatusBadge } from '@/components/shared/badges'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ApproveModal, RejectModal } from '@/components/shared/modals'

const ProductCardSkeleton: React.FC = () => (
  <div className="rounded-xl border border-border/50 overflow-hidden">
    <Skeleton className="h-28 w-full rounded-none" />
    <div className="p-3 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <div className="flex items-center justify-between pt-1">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-5 w-14 rounded-full" />
      </div>
    </div>
  </div>
)

interface VendorProductsProps {
  vendor: Vendor
}

const ProductCard: React.FC<{
  product: Product
  onAction: (product: Product, action: 'approve' | 'reject') => void
}> = ({ product, onAction }) => {
  const { t } = useTranslation('vendors')

  return (
    <div className="rounded-xl border border-border/50 overflow-hidden hover:border-primary/40 transition-colors group">
      <div className="h-28 bg-linear-to-br from-primary/5 to-transparent flex items-center justify-center relative">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <Package className="h-9 w-9 text-primary " />
        )}

        {product.status === 'review' && (
          <div className="absolute top-2 right-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                >
                  <MoreVertical className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  onClick={() => onAction(product, 'approve')}
                  className="gap-2"
                >
                  <Check size={14} className="text-green-600" />
                  {t('product.approve')}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onAction(product, 'reject')}
                  className="gap-2"
                >
                  <X size={14} className="text-red-400" />
                  {t('product.reject')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
      <div className="p-3 space-y-2">
        <div>
          <p className="text-sm font-semibold text-text-primary truncate">{product.name}</p>
          <p className="text-xs text-text-secondary mt-0.5">{product.category}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-primary">
            {product.price.toFixed(3)} JOD
          </span>
          <ProductStatusBadge status={product.status} variant="pill" size="sm" showIcon={false} />
        </div>
      </div>
    </div>
  )
}

export const VendorProducts: React.FC<VendorProductsProps> = ({ vendor }) => {
  const { t } = useTranslation('vendors')
  const { products, loading, updateProductStatus } = useProducts({ vendorId: vendor.id })

  const [modalAction, setModalAction] = useState<'approve' | 'reject' | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [actionLoading, setActionLoading] = useState(false)

  const handleAction = (product: Product, action: 'approve' | 'reject') => {
    setSelectedProduct(product)
    setModalAction(action)
  }

  const handleConfirm = async (reason?: string) => {
    if (!selectedProduct) return
    setActionLoading(true)
    try {
      const newStatus = modalAction === 'approve' ? 'active' : 'rejected'
      await updateProductStatus(selectedProduct.id, newStatus)
      setModalAction(null)
      setSelectedProduct(null)
    } catch (error) {
      console.error('Failed to update product status:', error)
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-background-card p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-border">
          <Skeleton className="h-9 w-9 rounded-xl" />
          <div className="space-y-1">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-3 w-40" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-2xl border border-border bg-background-card p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-border">
          <div className="rounded-xl bg-primary/10 p-2 text-primary">
            <Package className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">{t('product.title')}</h2>
            <p className="text-xs text-text-secondary">{t('product.description')}</p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-text-secondary gap-3">
            <Package className="h-10 w-10 text-border" />
            <p className="text-sm">{t('table.noData')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAction={handleAction}
              />
            ))}
          </div>
        )}
      </div>

      <ApproveModal
        open={modalAction === 'approve'}
        onConfirm={() => handleConfirm()}
        onClose={() => { setModalAction(null); setSelectedProduct(null) }}
        loading={actionLoading}
        name={selectedProduct?.name ?? ''}
      />

      <RejectModal
        open={modalAction === 'reject'}
        onConfirm={(reason) => handleConfirm(reason)}
        onClose={() => { setModalAction(null); setSelectedProduct(null) }}
        loading={actionLoading}
        name={selectedProduct?.name ?? ''}
      />
    </>
  )
}