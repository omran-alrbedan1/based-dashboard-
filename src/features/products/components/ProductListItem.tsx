import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ProductApprovalRequest } from '@/features/products/data/products.data'
import {
  Tag,
  DollarSign,
  CalendarDays,
  Wheat,
  Store,
  Eye,
  ArrowRight,
} from 'lucide-react'
import { StatusBadge } from '@/components/shared/badges'
import { Button } from '@/components/ui/button'

interface ProductListItemProps {
  request: ProductApprovalRequest
}

const ProductListItem: React.FC<ProductListItemProps> = ({ request }) => {
  const { t, i18n } = useTranslation('productApproval')
  const navigate = useNavigate()

  const getGlutenStatusColor = (status: string) => {
    switch (status) {
      case 'Gluten Free': return 'text-emerald-600 dark:text-emerald-400'
      case 'May Contain Gluten': return 'text-amber-500 dark:text-amber-400'
      case 'Not Gluten Free': return 'text-rose-500 dark:text-rose-400'
      default: return 'text-text-secondary'
    }
  }

  const name = request.name[i18n.language as keyof typeof request.name] || request.name.en
  const vendor = request.vendorName[i18n.language as keyof typeof request.vendorName] || request.vendorName.en

  return (
    <div
      className="group relative flex flex-col gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:shadow-md cursor-pointer lg:flex-row lg:items-center"
      onClick={() => navigate(`/products/${request.id}`)}
    >
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

      <div className="flex-1 space-y-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-base font-semibold text-text">{name}</h3>
            <div className="mt-1 flex items-center gap-2">
              <Store className="h-3 w-3 text-text-secondary" />
              <span className="text-sm text-text-secondary">{vendor}</span>
            </div>
          </div>
          <div className="hidden lg:block">
            <StatusBadge status={request.status} />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <Tag className="h-3.5 w-3.5 text-primary" />
            <span className="text-text-secondary">{t('category')}:</span>
            <span className="font-medium text-text">{request.category}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <DollarSign className="h-3.5 w-3.5 text-primary" />
            <span className="text-text-secondary">{t('price')}:</span>
            <span className="font-semibold text-primary">{request.price} SAR</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-primary" />
            <span className="text-text-secondary">{t('submittedDate')}:</span>
            <span className="text-text">{request.submittedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Wheat className="h-3.5 w-3.5 text-primary" />
            <span className="text-text-secondary">{t('glutenStatus')}:</span>
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
          onClick={() => navigate(`/products/${request.id}`)}
          className="flex-1"
        >
          <Eye className="mr-2 h-4 w-4" />
          {t('viewDetails')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default ProductListItem
