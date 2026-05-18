import React from 'react'
import type { QuickCardProps } from '@/types/dashboard.types'

const QuickCard: React.FC<QuickCardProps> = ({ label, value, icon }) => (
  <div className="bg-background-card border border-border rounded-[20px] p-[20px_20px] flex items-center gap-4 transition-all duration-300 group">
    <div className="w-13 h-13 rounded-[16px] bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-all duration-300">
      <div className="text-primary group-hover:scale-105 transition-transform duration-300">
        {icon}
      </div>
    </div>
    
    <div className="flex-1">
      <p className="text-[28px] font-bold text-text-primary leading-none tracking-[-0.5px]">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
      <p className="text-[13px] font-medium text-text-muted mt-1.5 tracking-[-0.2px]">
        {label}
      </p>
    </div>
  </div>
)

export default QuickCard