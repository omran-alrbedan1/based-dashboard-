import { useState, useEffect, useCallback } from 'react'
import type { Product, ProductStatus } from '../types/vendors.types'
import { vendorsService } from '../services/vendors.service'

interface UseProductsProps {
  vendorId: number
}

export const useProducts = ({ vendorId }: UseProductsProps) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState<string>('')
  const [status, setStatus] = useState<ProductStatus | ''>('')

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const data = await vendorsService.getVendorProducts(vendorId)
      let filtered = [...data]
      
      if (status) {
        filtered = filtered.filter(p => p.status === status)
      }
      
      if (search) {
        const searchLower = search.toLowerCase()
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(searchLower) || 
          p.category.toLowerCase().includes(searchLower)
        )
      }
      
      setProducts(filtered)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products')
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }, [vendorId, status, search])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const updateProductStatus = useCallback(async (productId: number, newStatus: ProductStatus) => {
    setLoading(true)
    try {
      const updatedProduct = await vendorsService.updateProductStatus(productId, newStatus)
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === productId ? updatedProduct : product
        )
      )
      return updatedProduct
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update product status')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    products,
    loading,
    error,
    search,
    status,
    setSearch,
    setStatus,
    updateProductStatus,
    refetch: fetchProducts,
  }
}