// vendors.types.ts
export type VendorStatus = 'pending' | 'approved' | 'rejected'

export type VendorType = 'restaurant' | 'store' | 'supplier'

export type ProductStatus = 'active' | 'review' | 'inactive' | 'rejected'

export type GlutenStatus = 'Gluten Free' | 'May Contain Gluten' | 'Not Gluten Free'

export interface NutritionInfo {
  calories: number
  protein: number
  carbohydrates: number
  fat: number
}

export interface Product {
  id: number
  name: string
  description: string
  category: string
  price: number
  status: ProductStatus
  imageUrl?: string
  glutenStatus: GlutenStatus
  nutrition: NutritionInfo
  submittedDate: string
}

export interface Vendor {
  id: number
  store_name: string
  owner_name: string
  email: string
  phone: string
  type: VendorType
  status: VendorStatus
  gluten_certificate_url: string | null
  registered_at: string
  orders_count: number
  revenue: number
  rating: number
  products_count: number
  area: string
  products: Product[]
}

export interface VendorFilterForm {
  search: string
  status: string
  type: string
}

export const EMPTY_STATUS = 'all'
export const EMPTY_TYPE = 'all'

export const VENDOR_FILTERS_DEFAULT: VendorFilterForm = {
  search: '',
  status: '',
  type: EMPTY_TYPE,
}

export interface VendorFiltersProps {
  onApplyFilters: (values: VendorFilterForm) => void
  onResetFilters: () => void
  isLoading?: boolean
  initialFilters?: Partial<VendorFilterForm>
}

export interface VendorsTableProps {
  vendors: Vendor[]
  loading: boolean
  pagination: {
    total: number
    page: number
    lastPage: number
  }
  onPageChange: (page: number) => void
}