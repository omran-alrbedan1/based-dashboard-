import { FilterConfig } from '@/hooks/useFilter'
import type { VendorApprovalRequest } from '../data/vendorApproval.data'

export const vendorApprovalFilterConfig: FilterConfig<VendorApprovalRequest>[] = [
  {
    key: 'name',
    label: 'Search',
    type: 'search',
    getValue: (vendor) => [vendor.storeName.en, vendor.storeName.ar, vendor.ownerName],
  },
  {
    key: 'type',
    label: 'Type',
    type: 'select',
    options: [
      { value: 'restaurant', label: 'Restaurant' },
      { value: 'store', label: 'Store' },
      { value: 'supplier', label: 'Supplier' },
    ],
    getValue: (vendor) => vendor.type,
  },
  {
    key: 'dateRange',
    label: 'Submitted Date',
    type: 'range',
    getValue: (vendor) => new Date(vendor.submittedDate).getTime(),
  },
]
