export interface Approval {
  approved: boolean
  approvedAt?: string
  approvedByName?: string
  amount?: number
}

export interface DeliverySchedule {
  date?: string
  time?: string
}
