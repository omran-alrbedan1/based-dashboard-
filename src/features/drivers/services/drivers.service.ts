import type { DriversFilterParams, DriverArea } from '../types/drivers.types'
import { 
  MOCK_DRIVERS, 
  MOCK_AVAILABLE_AREAS 
} from '../data/drivers.data'

// Simulate API delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms))

export const driversService = {
  // Get all drivers with pagination and filters
  getAll: async (params: DriversFilterParams) => {
    await delay()
    
    let filtered = [...MOCK_DRIVERS]

    // Apply search filter
    if (params.search) {
      const s = params.search.toLowerCase()
      filtered = filtered.filter(
        (d) =>
          d.name.toLowerCase().includes(s) ||
          d.phone.toLowerCase().includes(s) ||
          (d.email && d.email.toLowerCase().includes(s))
      )
    }

    // Apply status filter
    if (params.status && params.status !== 'all' && params.status !== '') {
      filtered = filtered.filter((d) => d.status === params.status)
    }

    // Apply area filter
    if (params.area_id && params.area_id !== 'all' && params.area_id !== '') {
      const areaId = Number(params.area_id)
      filtered = filtered.filter((d) => 
        d.areas && d.areas.some((a) => a.id === areaId)
      )
    }

    // Pagination
    const page = params.page || 1
    const perPage = params.per_page || 15
    const total = filtered.length
    const lastPage = Math.max(1, Math.ceil(total / perPage))
    const start = (page - 1) * perPage
    const paged = filtered.slice(start, start + perPage)

    return {
      data: paged,
      meta: {
        current_page: page,
        last_page: lastPage,
        per_page: perPage,
        total,
      },
    }
  },

  // Get all available areas
  getAreas: async (): Promise<DriverArea[]> => {
    await delay(200)
    return [...MOCK_AVAILABLE_AREAS]
  },

  // Export drivers (CSV/Excel)
  export: async (params?: object): Promise<Blob> => {
    await delay(1000)
    const csvContent = "id,name,email,phone,status,rating,total_deliveries\n" +
      MOCK_DRIVERS.map(d => `${d.id},${d.name},${d.email || ''},${d.phone},${d.status},${d.rating || 0},${d.orders_count || 0}`).join("\n")
    return new Blob([csvContent], { type: 'text/csv' })
  },
}