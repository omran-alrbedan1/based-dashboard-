import { driverApprovalRequests, type DriverApprovalRequest, type DriverApprovalStatus } from '../data/driverApproval.data'

class DriverApprovalService {
  private delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async getPendingDrivers(params?: {
    name?: string
    vehicleType?: string
    dateFrom?: string
    dateTo?: string
  }): Promise<DriverApprovalRequest[]> {
    await this.delay()

    let drivers = driverApprovalRequests.filter((r) => r.status === 'Pending')

    if (params?.name) {
      const q = params.name.toLowerCase()
      drivers = drivers.filter(
        (r) =>
          r.driverName.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.phone.includes(q)
      )
    }

    if (params?.vehicleType) {
      drivers = drivers.filter((r) => r.vehicleType.toLowerCase() === params.vehicleType!.toLowerCase())
    }

    if (params?.dateFrom) {
      const from = new Date(params.dateFrom)
      drivers = drivers.filter((r) => new Date(r.submittedDate) >= from)
    }

    if (params?.dateTo) {
      const to = new Date(params.dateTo)
      to.setHours(23, 59, 59, 999)
      drivers = drivers.filter((r) => new Date(r.submittedDate) <= to)
    }

    return drivers
  }

  async getDriverApprovalRequestById(id: string): Promise<DriverApprovalRequest> {
    await this.delay()

    const driver = driverApprovalRequests.find((r) => r.id === id)
    if (!driver) {
      throw new Error('Driver approval request not found')
    }

    return { ...driver }
  }

  async updateDriverApprovalStatus(
    id: string,
    status: DriverApprovalStatus,
    rejectionReason?: string
  ): Promise<DriverApprovalRequest> {
    await this.delay()

    const driver = driverApprovalRequests.find((r) => r.id === id)
    if (!driver) {
      throw new Error('Driver approval request not found')
    }

    driver.status = status
    if (rejectionReason) {
      driver.rejectionReason = rejectionReason
    }

    return { ...driver }
  }
}

export const driverApprovalService = new DriverApprovalService()
