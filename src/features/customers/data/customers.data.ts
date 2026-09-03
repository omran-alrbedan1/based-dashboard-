import type { Customer } from "../types/customer.types"
import type { Vehicle } from "../types/vehicle.types"
import type { CustomerHistory } from "../types/visit-summary.types"

export const initialCustomers: Customer[] = [
  {
    id: "cus-001",
    name: "أحمد السميري",
    phone: "0551234567",
    email: "ahmed@example.com",
    address: "حي الروضة، المدينة",
    notes: "زبون دائم",
    createdAt: "2026-08-12T09:15:00.000Z",
    updatedAt: "2026-08-28T14:30:00.000Z",
  },
  {
    id: "cus-002",
    name: "سارة العتيبي",
    phone: "0569876543",
    email: "sara@example.com",
    address: "الرياض",
    createdAt: "2026-08-20T11:00:00.000Z",
    updatedAt: "2026-08-20T11:00:00.000Z",
  },
  {
    id: "cus-003",
    name: "خالد الدوسري",
    phone: "0531112223",
    createdAt: "2026-07-30T08:45:00.000Z",
    updatedAt: "2026-07-30T08:45:00.000Z",
  },
]

export const initialVehicles: Vehicle[] = [
  {
    id: "veh-001",
    customerId: "cus-001",
    make: "تويوتا",
    model: "كامري",
    year: 2019,
    plateNumber: "أ ب ج 1234",
    vin: "JTDBE32K600123456",
    mileage: 85200,
    fuelType: "petrol",
    transmissionType: "automatic",
    color: "أبيض",
    createdAt: "2026-08-12T09:20:00.000Z",
    updatedAt: "2026-08-12T09:20:00.000Z",
  },
  {
    id: "veh-002",
    customerId: "cus-001",
    make: "نيسان",
    model: "باترول",
    year: 2021,
    plateNumber: "س ص ق 7788",
    vin: "JN8AY2NF9MX123456",
    mileage: 42300,
    fuelType: "petrol",
    transmissionType: "automatic",
    color: "أسود",
    createdAt: "2026-08-28T14:30:00.000Z",
    updatedAt: "2026-08-28T14:30:00.000Z",
  },
  {
    id: "veh-003",
    customerId: "cus-003",
    make: "هونداي",
    model: "سوناتا",
    year: 2018,
    plateNumber: "م ن ب 5123",
    vin: "KMHL34JJ3KA123456",
    mileage: 118000,
    fuelType: "diesel",
    transmissionType: "automatic",
    color: "فضي",
    createdAt: "2026-07-30T08:50:00.000Z",
    updatedAt: "2026-07-30T08:50:00.000Z",
  },
]

export const initialHistoryByCustomer: Record<string, CustomerHistory> = {
  "cus-001": {
    visits: [
      {
        id: "vis-001",
        vehicleId: "veh-001",
        receiptNumber: "RC-2026-0001",
        date: "2026-08-12T09:30:00.000Z",
        reason: "تغيير زيت",
        status: "completed",
      },
      {
        id: "vis-002",
        vehicleId: "veh-002",
        receiptNumber: "RC-2026-0007",
        date: "2026-08-28T14:40:00.000Z",
        reason: "فحص عام",
        status: "in_progress",
      },
    ],
    workItems: [
      {
        id: "wi-001",
        visitId: "vis-001",
        description: "تغيير زيت المحرك والفلتر",
        estimatedCost: 250,
        status: "completed",
      },
      {
        id: "wi-002",
        visitId: "vis-002",
        description: "فحص الفرامل",
        estimatedCost: 150,
        status: "in_progress",
      },
      {
        id: "wi-003",
        visitId: "vis-002",
        description: "فحص نظام التبريد",
        estimatedCost: 0,
        status: "pending",
      },
    ],
  },
  "cus-003": {
    visits: [
      {
        id: "vis-003",
        vehicleId: "veh-003",
        receiptNumber: "RC-2026-0003",
        date: "2026-07-30T09:00:00.000Z",
        reason: "صيانة مقررة",
        status: "completed",
      },
    ],
    workItems: [
      {
        id: "wi-004",
        visitId: "vis-003",
        description: "استبدال تيل الفرامل الأمامية",
        estimatedCost: 450,
        status: "completed",
      },
    ],
  },
}
