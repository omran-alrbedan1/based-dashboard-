import { vendorApprovalRequests, type VendorApprovalRequest, type VendorApprovalStatus } from '../data/vendorApproval.data'

class VendorApprovalService {
  private delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async getPendingVendors(params?: {
    name?: string
    type?: string
    dateFrom?: string
    dateTo?: string
  }): Promise<VendorApprovalRequest[]> {
    await this.delay()

    let vendors = vendorApprovalRequests.filter((r) => r.status === 'Pending')

    if (params?.name) {
      const q = params.name.toLowerCase()
      vendors = vendors.filter(
        (r) =>
          r.storeName.en.toLowerCase().includes(q) ||
          r.storeName.ar.includes(q) ||
          r.ownerName.toLowerCase().includes(q)
      )
    }

    if (params?.type) {
      vendors = vendors.filter((r) => r.type === params.type)
    }

    if (params?.dateFrom) {
      const from = new Date(params.dateFrom)
      vendors = vendors.filter((r) => new Date(r.submittedDate) >= from)
    }

    if (params?.dateTo) {
      const to = new Date(params.dateTo)
      to.setHours(23, 59, 59, 999)
      vendors = vendors.filter((r) => new Date(r.submittedDate) <= to)
    }

    return vendors
  }

  async getVendorApprovalRequestById(id: string): Promise<VendorApprovalRequest> {
    await this.delay()

    const vendor = vendorApprovalRequests.find((r) => r.id === id)
    if (!vendor) {
      throw new Error('Vendor approval request not found')
    }

    return { ...vendor }
  }

  async updateVendorApprovalStatus(
    id: string,
    status: VendorApprovalStatus,
    rejectionReason?: { en: string; ar: string }
  ): Promise<VendorApprovalRequest> {
    await this.delay()

    const vendor = vendorApprovalRequests.find((r) => r.id === id)
    if (!vendor) {
      throw new Error('Vendor approval request not found')
    }

    vendor.status = status
    if (rejectionReason) {
      vendor.rejectionReason = rejectionReason
    }

    return { ...vendor }
  }
}

export const vendorApprovalService = new VendorApprovalService()
