import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts"
import { ArrowUpRight } from "lucide-react"
import { categoryData } from '@/data/dashboard.data'

const BudgetChart: React.FC = () => {
  const { t } = useTranslation('dashboard') 
  
  const chartData = categoryData.map(item => ({
    name: t(`budget.categories.${item.name.toLowerCase()}`),
    value: item.pct,
    color: item.color
  }))

  return (
    <div className="bg-background-card rounded-xl shadow-card border border-border/50 p-5 transition-all duration-200 hover:shadow-soft">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-base font-semibold text-text-primary">
            {t('budget.title')} 
          </h3>
          <p className="text-xs text-text-subtitle mt-0.5">
            {t('budget.subtitle')} 
          </p>
        </div>
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors duration-200 cursor-pointer">
          <ArrowUpRight size={14} />
        </div>
      </div>

      {/* Chart Content */}
      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Donut Chart */}
        <div className="relative w-[180px] h-[180px] shrink-0">
          <ResponsiveContainer width={180} height={180}>
            <PieChart>
              <Pie 
                data={chartData} 
                cx={90} 
                cy={90} 
                innerRadius={60} 
                outerRadius={80} 
                dataKey="value" 
                paddingAngle={3}
              >
                {chartData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-xs text-text-muted">
              {t('budget.spent')} 
            </p>
            <p className="text-lg font-semibold font-mono text-text-primary">
              $5,950
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 w-full">
          {chartData.map(({ name, value, color }) => (
            <div key={name} className="flex justify-between items-center mb-3 last:mb-0 group/legend">
              <div className="flex items-center gap-2">
                <span 
                  className="w-2.5 h-2.5 rounded-full shrink-0" 
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm text-text-secondary group-hover/legend:text-text-primary transition-colors duration-200">
                  {name}
                </span>
              </div>
              <span className="text-sm font-mono font-medium text-text-primary">
                {value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BudgetChart