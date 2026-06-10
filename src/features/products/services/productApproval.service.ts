import { approvalRequests, type ProductApprovalRequest, type ProductApprovalStatus } from '../data/products.data'

class ProductApprovalService {
  private delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async getPendingProducts(): Promise<ProductApprovalRequest[]> {
    await this.delay()
    return approvalRequests.filter((r) => r.status === 'Pending')
  }

  async getProductApprovalRequestById(id: string): Promise<ProductApprovalRequest> {
    await this.delay()
    const product = approvalRequests.find((r) => r.id === id)
    if (!product) {
      throw new Error('Product approval request not found')
    }
    return { ...product }
  }

  async updateProductApprovalStatus(
    id: string,
    status: ProductApprovalStatus,
    rejectionReason?: string
  ): Promise<ProductApprovalRequest> {
    await this.delay()
    const product = approvalRequests.find((r) => r.id === id)
    if (!product) {
      throw new Error('Product approval request not found')
    }
    product.status = status
    if (rejectionReason) {
      product.rejectionReason = { en: rejectionReason, ar: rejectionReason }
    }
    return { ...product }
  }
}

export const productApprovalService = new ProductApprovalService()
