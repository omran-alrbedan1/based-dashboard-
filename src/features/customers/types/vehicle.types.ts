export type FuelType = "petrol" | "diesel" | "hybrid" | "electric" | "other"

export type TransmissionType = "automatic" | "manual"

export interface Vehicle {
  id: string
  customerId: string
  make: string
  model: string
  year?: number
  plateNumber: string
  vin?: string
  mileage?: number
  fuelType?: FuelType
  transmissionType?: TransmissionType
  color?: string
  notes?: string
  createdAt: string
  updatedAt: string
}
