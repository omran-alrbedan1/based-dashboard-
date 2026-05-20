import React from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRight, CreditCard, User, Calendar, DollarSign } from 'lucide-react'
import { recentOrders } from '@/data/dashboard.data'
import type { OrderRow } from '@/types/dashboard.types'

const STATUS_STYLES: Record<OrderRow['status'], string> = {
  delivered: 'bg-[#EAF3DE] text-[#27500A]',
  pending:   'bg-[#FFF8ED] text-[#633806]',
  cancelled: 'bg-[#FBEAF0] text-[#72243E]',
}

const STATUS_ICONS: Record<OrderRow['status'], React.ReactNode> = {
  delivered: '✓',
  pending: '○',
  cancelled: '✗',
}

const RecentOrders: React.FC = () => {
  const { t } = useTranslation('dashboard')

  const getStatusLabel = (status: OrderRow['status']): string => {
    return t(`recentOrders.status.${status}`)
  }

  const getMethodDisplay = (method: string): string => {
    // Convert method to translation key (e.g., "Apple Pay" -> "apple_pay", "Visa" -> "visa")
    const methodKey = method.toLowerCase().replace(/\s+/g, '_')
    const translated = t(`recentOrders.methods.${methodKey}`, { defaultValue: method })
    return translated
  }

  return (
    <div className="bg-background-card rounded-xl shadow-card border border-border/50 overflow-hidden transition-all duration-200">
      {/* Header */}
      <div className="flex justify-between items-center p-5 pb-3 border-b border-border/50">
        <div>
          <h3 className="text-base font-semibold text-text-primary">
            {t('recentOrders.title')}
          </h3>
          <p className="text-xs text-text-subtitle mt-1">
            {t('recentOrders.subtitle')}
          </p>
        </div>
        <button className="group flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary-dark transition-all duration-200 bg-transparent border-none cursor-pointer">
          {t('recentOrders.seeAll')}
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50 bg-background/30">
              <th className="px-5 py-3 text-left">
                <div className="flex items-center gap-1.5">
                  <Calendar size={11} className="text-text-muted" />
                  <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                    {t('recentOrders.date')}
                  </span>
                </div>
              </th>
              <th className="px-5 py-3 text-left">
                <div className="flex items-center gap-1.5">
                  <DollarSign size={11} className="text-text-muted" />
                  <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                    {t('recentOrders.amount')}
                  </span>
                </div>
              </th>
              <th className="px-5 py-3 text-left">
                <div className="flex items-center gap-1.5">
                  <User size={11} className="text-text-muted" />
                  <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                    {t('recentOrders.customer')}
                  </span>
                </div>
              </th>
              <th className="px-5 py-3 text-left">
                <div className="flex items-center gap-1.5">
                  <CreditCard size={11} className="text-text-muted" />
                  <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                    {t('recentOrders.method')}
                  </span>
                </div>
              </th>
              <th className="px-5 py-3 text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                    {t('recentOrders.status.title')}
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((row, idx) => (
              <tr 
                key={idx} 
                className="border-b border-border/30 last:border-0 hover:bg-background/20 transition-colors duration-150"
              >
                <td className="px-5 py-3.5">
                  <span className="text-xs text-text-secondary">{row.date}</span>
                </td>
                <td className="px-5 py-3.5">
                  <span className="text-sm font-semibold text-primary-dark">{row.amount}</span>
                </td>
                <td className="px-5 py-3.5">
                  <span className="text-sm text-text-primary font-medium truncate block max-w-[150px]">
                    {row.customer}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-primary/10 text-primary">
                    <CreditCard size={10} />
                    {getMethodDisplay(row.method)}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold ${STATUS_STYLES[row.status]}`}>
                    <span className="text-[11px]">{STATUS_ICONS[row.status]}</span>
                    {getStatusLabel(row.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentOrders