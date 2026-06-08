import { FilterConfig } from '@/hooks/useFilter'
import type { Vendor } from '../types/vendors.types'

export const vendorFilterConfig: FilterConfig<Vendor>[] = [
  {
    key: 'search',
    label: 'Search',
    type: 'search',
    getValue: (vendor) => [vendor.store_name, vendor.owner_name, vendor.email],
  },
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'pending', label: 'Pending' },
      { value: 'approved', label: 'Approved' },
      { value: 'rejected', label: 'Rejected' },
    ],
    getValue: (vendor) => vendor.status,
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
]
