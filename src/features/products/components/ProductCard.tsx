import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { ProductApprovalRequest } from '@/features/products/data/products.data'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
  Tag,
  DollarSign,
  CalendarDays,
  Wheat,
  Store,
  ArrowRight,
  Eye,
} from 'lucide-react'
import { StatusBadge } from '@/components/shared/badges'

interface ProductCardProps {
  request: ProductApprovalRequest
}

const ProductCard: React.FC<ProductCardProps> = ({ request }) => {
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
    <Card className="group overflow-hidden border border-border/60 hover:border-border hover:shadow-md transition-all duration-300 bg-card rounded-xl">
      <CardHeader className="p-0 relative">
        <div className="relative h-36 overflow-hidden bg-muted/40">
          <img
            src={request.mainImage}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute top-2.5 left-2.5">
            <StatusBadge status={request.status} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 pt-3.5 pb-3 space-y-2.5">
        <div>
          <h3 className="text-sm font-semibold text-text leading-snug line-clamp-1">{name}</h3>
          <div className="flex items-center gap-1 mt-0.5">
            <Store className="w-4 h-4 text-primary shrink-0" />
            <p className="text-xs text-text-secondary line-clamp-1">{vendor}</p>
          </div>
        </div>
        <div className="h-px bg-border/50" />
        <div className="space-y-1.5">
          <MetaRow icon={<Tag className="w-3.5 h-3.5" />} label={t('category')} value={request.category} />
          <MetaRow icon={<DollarSign className="w-3.5 h-3.5" />} label={t('price')} value={`${request.price} SAR`} valueClass="text-primary font-semibold" />
          <MetaRow icon={<CalendarDays className="w-3.5 h-3.5" />} label={t('submittedDate')} value={request.submittedDate} />
          <MetaRow icon={<Wheat className="w-3.5 h-3.5" />} label={t('glutenStatus')} value={request.glutenStatus} valueClass={getGlutenStatusColor(request.glutenStatus)} />
        </div>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0">
        <Button variant="outline" className="w-full" onClick={() => navigate(`/products/${request.id}`)}>
          <Eye className="w-3.5 h-3.5 mr-2" />
          {t('viewDetails')}
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

const MetaRow: React.FC<MetaRowProps> = ({ icon, label, value, valueClass = 'text-text' }) => (
  <div className="flex items-center justify-between gap-3 text-sm">
    <span className="flex items-center gap-2 text-text-secondary min-w-0">
      <span className="shrink-0 text-primary">{icon}</span>
      <span className="truncate">{label}</span>
    </span>
    <span className={`font-medium truncate text-right ${valueClass}`}>{value}</span>
  </div>
)

export default ProductCard
