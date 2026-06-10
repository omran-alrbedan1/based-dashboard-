import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { approvalRequests, ProductApprovalRequest } from '@/features/products/data/products.data'
import { ProductGallery, ProductInfoCard, IngredientsCard, NutritionCard, CertificateViewer, VendorInfoCard, ProductStatusCard } from '../components'
import PageHeader from '@/components/shared/headers/PageHeader'

const getVendorById = (vendorId: string) => {
  const vendors = {
    'VEN-001': { id: 'VEN-001', storeName: { en: 'Al Asala Restaurant', ar: 'مطعم الأصالة' }, email: 'contact@alasala.com', phone: '+966 12 345 6789', registrationDate: '2024-01-15' },
    'VEN-002': { id: 'VEN-002', storeName: { en: 'Al Quds Bakeries', ar: 'مخابز القدس' }, email: 'info@alquds.com', phone: '+966 12 345 6790', registrationDate: '2024-02-20' },
    'VEN-003': { id: 'VEN-003', storeName: { en: 'Nature Juices', ar: 'عصائر الطبيعة' }, email: 'hello@naturejuices.com', phone: '+966 12 345 6791', registrationDate: '2024-03-10' },
    'VEN-004': { id: 'VEN-004', storeName: { en: 'Healthy Bites', ar: 'لدغات صحية' }, email: 'info@healthybites.com', phone: '+966 12 345 6792', registrationDate: '2024-03-25' },
  }
  return vendors[vendorId as keyof typeof vendors]
}

const ProductDetailsPage = () => {
  const { t } = useTranslation('productApproval')
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<ProductApprovalRequest | undefined>(undefined)

  useEffect(() => {
    if (!id) return
    const found = approvalRequests.find((item) => item.id === id)
    if (found) setProduct(found)
  }, [id])

  if (!product) {
    return (
      <div className="space-y-6">
        <PageHeader title={t('notFoundTitle')} description={t('notFoundDescription')} showBackButton backButtonLabel={t('backToList')} onBackClick={() => navigate('/products')} />
      </div>
    )
  }

  const vendorData = getVendorById(product.vendorId)

  return (
    <div className="space-y-6">
      <PageHeader title={t('reviewTitle')} description={t('reviewDescription')} showBackButton backButtonLabel={t('backToList')} rightContent={null} gradient="from-primary/5 via-primary/10 to-transparent" image={{ src: '/images/product-approval-header.png', alt: 'Product', position: 'right' }} />
      <div className="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
        <div className="space-y-6">
          <ProductGallery mainImage={product.mainImage} />
          <ProductInfoCard product={product} />
          <div className="grid gap-6 xl:grid-cols-2">
            <IngredientsCard ingredients={product.ingredients} />
            <NutritionCard nutrition={product.nutrition} />
          </div>
        </div>
        <div className="space-y-6">
          <ProductStatusCard status={product.status} glutenStatus={product.glutenStatus} rejectionReason={product.rejectionReason} />
          <VendorInfoCard vendor={vendorData} />
          <CertificateViewer certificate={product.certificate} />
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsPage
