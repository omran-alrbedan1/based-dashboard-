import type { Driver, DriverArea, DriverDocument, DriverStats } from '../types/drivers.types'
import { 
  MOCK_DRIVERS, 
  MOCK_DRIVER_STATS, 
  MOCK_DRIVER_DOCUMENTS, 
  MOCK_DRIVER_ORDERS,
  MOCK_AVAILABLE_AREAS 
} from '../data/drivers.data'

// Simulate API delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms))

export const driverService = {
  
  // Get single driver by ID
  getById: async (id: string | number): Promise<Driver> => {
    await delay()
    const driver = MOCK_DRIVERS.find((d) => d.id === Number(id))
    if (!driver) throw new Error('Driver not found')
    return { ...driver }
  },

  // Get driver's orders
  getOrders: async (id: string | number, params?: { page?: number; per_page?: number }) => {
    await delay(300)
    const allOrders = MOCK_DRIVER_ORDERS[Number(id)] || []
    const page = params?.page || 1
    const perPage = params?.per_page || 10
    const start = (page - 1) * perPage
    const paged = allOrders.slice(start, start + perPage)
    
    return {
      data: paged,
      meta: {
        current_page: page,
        per_page: perPage,
        total: allOrders.length,
        last_page: Math.ceil(allOrders.length / perPage),
      },
    }
  },

  // Get driver's documents
  getDocuments: async (id: string | number): Promise<DriverDocument[]> => {
    await delay(300)
    return MOCK_DRIVER_DOCUMENTS[Number(id)] || []
  },

  // Get driver's statistics
  getStats: async (id: string | number): Promise<DriverStats | null> => {
    await delay(300)
    return MOCK_DRIVER_STATS[Number(id)] || null
  },

  // Get driver's areas
  getAreas: async (id: string | number): Promise<DriverArea[]> => {
    await delay(200)
    const driver = MOCK_DRIVERS.find((d) => d.id === Number(id))
    return driver?.areas || []
  },

  // Get all available areas
  getAllAreas: async (): Promise<DriverArea[]> => {
    await delay(200)
    return [...MOCK_AVAILABLE_AREAS]
  },

  // Update driver's areas
  updateAreas: async (id: string | number, areaIds: number[]): Promise<void> => {
    await delay(500)
    const driverIndex = MOCK_DRIVERS.findIndex(d => d.id === Number(id))
    if (driverIndex !== -1) {
      const selectedAreas = MOCK_AVAILABLE_AREAS.filter(area => areaIds.includes(area.id))
      MOCK_DRIVERS[driverIndex] = { 
        ...MOCK_DRIVERS[driverIndex], 
        areas: selectedAreas 
      }
    }
  },

  // Activate driver
  activate: async (id: string | number): Promise<void> => {
    await delay(500)
    const driverIndex = MOCK_DRIVERS.findIndex(d => d.id === Number(id))
    if (driverIndex !== -1) {
      MOCK_DRIVERS[driverIndex] = { ...MOCK_DRIVERS[driverIndex], status: 'active' }
    }
  },

  // Suspend driver
  suspend: async (id: string | number, reason?: string): Promise<void> => {
    await delay(500)
    const driverIndex = MOCK_DRIVERS.findIndex(d => d.id === Number(id))
    if (driverIndex !== -1) {
      MOCK_DRIVERS[driverIndex] = { ...MOCK_DRIVERS[driverIndex], status: 'suspended' }
    }
    if (reason) {
      console.log(`Suspension reason for driver ${id}: ${reason}`)
    }
  },

  // Send message to driver
  sendMessage: async (id: string | number, message: string): Promise<void> => {
    await delay(300)
    console.log(`Message sent to driver ${id}: ${message}`)
  },

  // Update driver information
  update: async (id: string | number, data: Partial<Driver>): Promise<Driver> => {
    await delay(500)
    const driverIndex = MOCK_DRIVERS.findIndex(d => d.id === Number(id))
    if (driverIndex === -1) throw new Error('Driver not found')
    
    MOCK_DRIVERS[driverIndex] = { ...MOCK_DRIVERS[driverIndex], ...data }
    return MOCK_DRIVERS[driverIndex]
  },
}