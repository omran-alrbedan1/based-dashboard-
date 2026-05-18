import React from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRight, UserPlus, Calendar, Package } from 'lucide-react'
import { newUsers } from '@/data/dashboard.data'

const NewUsers: React.FC = () => {
  const { t } = useTranslation('dashboard')

  return (
    <div className="bg-background-card rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-5 pb-3 border-b border-border/50">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <UserPlus size={16} className="text-primary" />
            <h3 className="text-base font-semibold text-text-primary">
              {t('newUsers.title')}
            </h3>
          </div>
          <p className="text-xs text-text-subtitle ml-7">
            {t('newUsers.subtitle')}
          </p>
        </div>
        <button className="group flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary-dark transition-all duration-200 bg-transparent border-none cursor-pointer">
          {t('newUsers.seeAll')}
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
        </button>
      </div>

      {/* Users List */}
      <div className="p-2">
        {newUsers.map((u, idx) => (
          <div
            key={idx}
            className={`group/user flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
              idx < newUsers.length - 1 ? 'border-b border-border/30' : ''
            } hover:bg-primary/5`}
          >
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-white shadow-sm">
                {u.initials}
              </div>
            </div>
            
            {/* User Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text-primary truncate group-hover/user:text-primary transition-colors duration-200">
                {u.name}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <Calendar size={10} className="text-text-muted" />
                <p className="text-xs text-text-secondary">{u.meta}</p>
              </div>
            </div>
            
            {/* Orders Badge */}
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10">
                <Package size={10} className="text-primary" />
                <span className="text-xs font-semibold text-primary">
                  {u.orders}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-2 px-5 pb-4 pt-2 border-t border-border/30 bg-background/20">
        <div className="flex justify-between items-center text-xs">
          <span className="text-text-secondary">
            {t('newUsers.totalNewUsers')}
          </span>
          <span className="font-semibold text-text-primary">
            {newUsers.length}
          </span>
        </div>
      </div>
    </div>
  )
}

export default NewUsers