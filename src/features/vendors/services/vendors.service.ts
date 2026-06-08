import { mockVendors } from '../data/data.vendors'
import type { Vendor, VendorStatus, Product, ProductStatus } from '../types/vendors.types'

class VendorsService {
  private delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async getVendors(params?: { search?: string; status?: string; type?: string }): Promise<Vendor[]> {
    await this.delay()
    
    let vendors = [...mockVendors]
    
    if (params?.search) {
      const searchLower = params.search.toLowerCase()
      vendors = vendors.filter(vendor => 
        vendor.store_name.toLowerCase().includes(searchLower) ||
        vendor.owner_name.toLowerCase().includes(searchLower) ||
        vendor.email.toLowerCase().includes(searchLower)
      )
    }
    
    if (params?.status && params.status !== 'all') {
      vendors = vendors.filter(vendor => vendor.status === params.status)
    }
    
    if (params?.type && params.type !== 'all') {
      vendors = vendors.filter(vendor => vendor.type === params.type)
    }
    
    return vendors
  }

  async updateVendorStatus(vendorId: number, status: VendorStatus): Promise<Vendor> {
    await this.delay()
    
    const vendor = mockVendors.find(v => v.id === vendorId)
    if (!vendor) {
      throw new Error('Vendor not found')
    }
    
    vendor.status = status
    return vendor
  }

  async getVendorProducts(vendorId: number): Promise<Product[]> {
    await this.delay()
    
    const vendor = mockVendors.find(v => v.id === vendorId)
    if (!vendor) {
      throw new Error('Vendor not found')
    }
    
    return [...vendor.products]
  }

  async updateProductStatus(productId: number, status: ProductStatus): Promise<Product> {
    await this.delay()
    
    let updatedProduct: Product | null = null
    
    for (const vendor of mockVendors) {
      const product = vendor.products.find(p => p.id === productId)
      if (product) {
        product.status = status
        updatedProduct = product
        break
      }
    }
    
    if (!updatedProduct) {
      throw new Error('Product not found')
    }
    
    return updatedProduct
  }
}

export const vendorsService = new VendorsService()