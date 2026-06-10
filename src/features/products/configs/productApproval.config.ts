import { FilterConfig } from '@/hooks/useFilter'
import type { ProductApprovalRequest } from '../data/products.data'

export const productApprovalFilterConfig: FilterConfig<ProductApprovalRequest>[] = [
  {
    key: 'search',
    label: 'Search',
    type: 'search',
    getValue: (product) => [product.name.en, product.name.ar, product.vendorName.en],
  },
  {
    key: 'category',
    label: 'Category',
    type: 'select',
    options: [
      { value: 'Meals', label: 'Meals' },
      { value: 'Bakery', label: 'Bakery' },
      { value: 'Snacks', label: 'Snacks' },
      { value: 'Drinks', label: 'Drinks' },
    ],
    getValue: (product) => product.category,
  },
  {
    key: 'dateRange',
    label: 'Submitted Date',
    type: 'range',
    getValue: (product) => new Date(product.submittedDate).getTime(),
  },
]
