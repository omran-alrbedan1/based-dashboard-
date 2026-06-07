// src/pages/drivers/components/DriverOrdersHistory.tsx
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Package, ChevronLeft, ChevronRight, Clock, CreditCard, RefreshCw } from 'lucide-react'
import { images } from '@/constants/images'
import type { OrderStatus } from '@/features/orders/types/orders.types'
import { OrderStatusBadge } from '@/components/shared/badges'
import type { DriverOrderHistoryItem } from '../types/drivers.types'
import { useNavigate } from 'react-router-dom'
import { useDriver } from '../hooks/useDriver'
import { Skeleton } from '@/components/ui/skeleton'

interface DriverOrdersHistoryProps {
  driverId: string | number
}

const ITEMS_PER_PAGE = 6
const MAX_VISIBLE_PAGES = 5

const DriverOrdersHistory: React.FC<DriverOrdersHistoryProps> = ({ driverId }) => {
  const { t, i18n } = useTranslation('drivers')
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  
  const locale = i18n.language === 'ar' ? 'ar-EG' : 'en-US'
  
  // Use the driver hook with orders pagination
  const { 
    orders, 
    ordersPagination, 
    ordersLoading, 
    refetchOrders 
  } = useDriver(driverId, {
    ordersPage: currentPage,
    ordersPerPage: ITEMS_PER_PAGE
  })

  const totalPages = ordersPagination?.last_page || 1

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleViewOrder = (orderId: number) => {
    navigate(`/orders/${orderId}`)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' }),
      time: date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }),
    }
  }

  const getVisiblePages = () => {
    if (totalPages <= MAX_VISIBLE_PAGES) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5]
    }
    
    if (currentPage >= totalPages - 2) {
      return Array.from({ length: MAX_VISIBLE_PAGES }, (_, i) => totalPages - MAX_VISIBLE_PAGES + i + 1)
    }
    
    return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]
  }

  const renderSkeleton = () => (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="rounded-2xl border border-border bg-background-secondary p-4">
          <div className="flex gap-3">
            <Skeleton className="h-20 w-20 rounded-xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-3 w-28" />
              <div className="flex items-center justify-between pt-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderEmptyState = () => (
    <div className="py-12 text-center">
      <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-background-secondary flex items-center justify-center">
        <Package size={32} className="text-text-muted" />
      </div>
      <p className="text-text-secondary">{t('ordersHistory.noOrders')}</p>
    </div>
  )

  const renderOrderCard = (order: DriverOrderHistoryItem) => {
    const { date, time } = formatDate(order.created_at)

    return (
      <div
        key={order.id}
        className="group relative rounded-2xl border border-border bg-background-secondary p-4 transition-all duration-200 hover:border-primary/20 hover:shadow-md cursor-pointer"
        onClick={() => handleViewOrder(order.id)}
      >
        <div className="absolute top-3 right-3">
          <OrderStatusBadge 
            status={order.status as OrderStatus} 
            variant="pill" 
            size="sm"
            showIcon
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative shrink-0">
            <div className="h-24 w-24 sm:h-20 sm:w-20 rounded-xl bg-linear-to-br from-primary/10 to-primary/5 p-2 flex items-center justify-center overflow-hidden mx-auto">
              <img
                src={images.packages || '/images/package-placeholder.png'}
                alt={t('ordersHistory.packageImage')}
                className="h-20 w-20 sm:size-16 object-contain"
              />
            </div>
          </div>

          <div className="flex-1 min-w-0 sm:pr-16">
            <div className="mb-2">
              <span className="text-xs font-medium text-text-muted">#{order.order_number || order.id}</span>
              <h3 className="text-base sm:text-sm font-semibold text-text-primary truncate">
                {order.vendor?.name ?? t('ordersHistory.unknownVendor')}
              </h3>
            </div>

            <div className="mb-3 flex items-center gap-2 text-xs text-text-secondary">
              <Clock size={12} className="shrink-0" />
              <span>{date} · {time}</span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-2 mt-2">
              <div className="flex items-center gap-1 text-sm font-semibold text-primary">
                <CreditCard size={14} />
                <span>{order.delivery_fee.toLocaleString(locale)} {order.currency || t('ordersHistory.currency')}</span>
              </div>
              
              <button
                type="button"
                className="text-xs text-primary hover:text-primary/80 transition-colors font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewOrder(order.id);
                }}
              >
                {t('ordersHistory.viewDetails')}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderPagination = () => {
    if (totalPages <= 1) return null

    const visiblePages = getVisiblePages()

    return (
      <div className="mt-6 flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-xl border border-border px-3 py-2 text-sm text-text-secondary transition-all hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={18} />
        </button>
        
        <div className="flex items-center gap-1">
          {visiblePages.map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => handlePageChange(pageNum)}
              className={`min-w-[36px] rounded-xl px-3 py-2 text-sm transition-all ${
                currentPage === pageNum
                  ? 'bg-primary text-white shadow-sm'
                  : 'border border-border text-text-secondary hover:border-primary hover:text-primary'
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>
        
        <button
          type="button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-xl border border-border px-3 py-2 text-sm text-text-secondary transition-all hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-border bg-background-card p-6 shadow-card">
      <div className="mb-6 flex items-center gap-4">
        <div className="rounded-full bg-primary/10 p-2.5">
          <Package className="text-primary" size={20} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text-primary">{t('ordersHistory.title')}</h2>
          <p className="text-sm text-text-secondary">{t('ordersHistory.description')}</p>
        </div>
      </div>

      {ordersLoading ? (
        renderSkeleton()
      ) : orders.length === 0 ? (
        renderEmptyState()
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {orders.map(renderOrderCard)}
          </div>
          {renderPagination()}
        </>
      )}
    </div>
  )
}

export default DriverOrdersHistory