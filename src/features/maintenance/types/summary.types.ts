import type { MaintenanceStatus } from "./maintenance.types"
import type { WorkStatus } from "./work-item.types"

export interface MaintenanceCardSummary {
  id: string
  receiptNumber: string
  status: MaintenanceStatus
  createdAt: string
  workCount: number
  pendingWork: number
  totalCost: number
}

export interface WorkItemSummaryRow {
  id: string
  description: string
  estimatedCost: number
  status: WorkStatus
}
