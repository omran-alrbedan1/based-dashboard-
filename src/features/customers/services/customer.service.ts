import type { Customer } from "../types/customer.types"
import type { Vehicle } from "../types/vehicle.types"
import type { CustomerHistory } from "../types/visit-summary.types"
import type { CustomerFilterValues } from "../configs/customer-filter.config"
import {
  initialCustomers,
  initialVehicles,
  initialHistoryByCustomer,
} from "../data/customers.data"

export type CustomerInput = Omit<Customer, "id" | "createdAt" | "updatedAt">
export type VehicleInput = Omit<
  Vehicle,
  "id" | "customerId" | "createdAt" | "updatedAt"
>

let customers: Customer[] = [...initialCustomers]
let vehicles: Vehicle[] = [...initialVehicles]

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms))

const uid = (prefix: string) =>
  `${prefix}-${Math.random().toString(36).slice(2, 10)}`

const normalizeFilter = (value: string | undefined) =>
  (value ?? "").trim().toLowerCase()

function vehicleMatches(v: Vehicle, f: CustomerFilterValues): boolean {
  return (
    (f.plateNumber &&
      normalizeFilter(v.plateNumber).includes(normalizeFilter(f.plateNumber))) ||
    (f.vin &&
      v.vin &&
      normalizeFilter(v.vin).includes(normalizeFilter(f.vin))) ||
    (f.make && normalizeFilter(v.make).includes(normalizeFilter(f.make))) ||
    (f.model && normalizeFilter(v.model).includes(normalizeFilter(f.model)))
  )
}

export const customerService = {
  async list(): Promise<Customer[]> {
    await delay()
    return [...customers].sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt),
    )
  },

  async search(filters: CustomerFilterValues): Promise<Customer[]> {
    await delay()
    const name = normalizeFilter(filters.name)
    const phone = normalizeFilter(filters.phone)
    const hasVehicleFilter = Boolean(
      filters.plateNumber || filters.vin || filters.make || filters.model,
    )

    return customers
      .filter((customer) => {
        const matchCustomer =
          (name === "" || normalizeFilter(customer.name).includes(name)) &&
          (phone === "" || normalizeFilter(customer.phone).includes(phone))

        if (!hasVehicleFilter) return matchCustomer

        const owned = vehicles.filter(
          (v) => v.customerId === customer.id,
        )
        const matchVehicle = owned.some((v) => vehicleMatches(v, filters))
        return matchCustomer || matchVehicle
      })
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  },

  async getById(id: string): Promise<Customer | undefined> {
    await delay()
    return customers.find((c) => c.id === id)
  },

  async create(input: CustomerInput): Promise<Customer> {
    await delay()
    const now = new Date().toISOString()
    const customer: Customer = {
      id: uid("cus"),
      ...input,
      createdAt: now,
      updatedAt: now,
    }
    customers.push(customer)
    return customer
  },

  async update(id: string, input: CustomerInput): Promise<Customer | undefined> {
    await delay()
    const index = customers.findIndex((c) => c.id === id)
    if (index === -1) return undefined
    customers[index] = {
      ...customers[index],
      ...input,
      updatedAt: new Date().toISOString(),
    }
    return customers[index]
  },

  async listVehicles(customerId: string): Promise<Vehicle[]> {
    await delay(200)
    return vehicles
      .filter((v) => v.customerId === customerId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  },

  async getVehicleCounts(): Promise<Record<string, number>> {
    await delay(150)
    return vehicles.reduce<Record<string, number>>((acc, v) => {
      acc[v.customerId] = (acc[v.customerId] ?? 0) + 1
      return acc
    }, {})
  },

  async addVehicle(
    customerId: string,
    input: VehicleInput,
  ): Promise<Vehicle> {
    await delay()
    const now = new Date().toISOString()
    const vehicle: Vehicle = {
      id: uid("veh"),
      customerId,
      ...input,
      createdAt: now,
      updatedAt: now,
    }
    vehicles.push(vehicle)
    return vehicle
  },

  async getHistory(customerId: string): Promise<CustomerHistory> {
    await delay(200)
    const owned = vehicles.filter((v) => v.customerId === customerId)
    const ownedIds = new Set(owned.map((v) => v.id))
    const base = initialHistoryByCustomer[customerId] ?? {
      visits: [],
      workItems: [],
    }
    return {
      visits: base.visits.filter((v) => ownedIds.has(v.vehicleId)),
      workItems: base.workItems,
    }
  },
}
