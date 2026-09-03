export type WorkStatus = "pending" | "in_progress" | "completed" | "cancelled"

export interface VisitSummary {
  id: string
  vehicleId: string
  receiptNumber: string
  date: string
  reason: string
  status: WorkStatus
}

export interface WorkItemSummary {
  id: string
  visitId: string
  description: string
  estimatedCost?: number
  status: WorkStatus
}

export interface CustomerHistory {
  visits: VisitSummary[]
  workItems: WorkItemSummary[]
}
