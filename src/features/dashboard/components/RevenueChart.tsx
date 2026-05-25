import { barData } from '@/features/dashboard/data/dashboard.data'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type Period = 'weekly' | 'monthly'

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    dataKey: string
    name: string
    value: number
    color: string
  }>
  label?: string
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  const { t } = useTranslation('dashboard')
  
  if (!active || !payload?.length) return null
  
  return (
    <div className="bg-white border border-[--bd] rounded-xl px-3 py-2.5 text-xs text-[--t1]">
      <p className="font-semibold mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-[--t2]">
          {t(`charts.${p.dataKey === 'revenue' ? 'revenue' : 'orders'}`)}: <strong>
            {p.dataKey === 'revenue' ? `$${p.value}k` : p.value}
          </strong>
        </p>
      ))}
    </div>
  )
}

const RevenueChart: React.FC = () => {
  const { t } = useTranslation('dashboard')
  const [period, setPeriod] = useState<Period>('weekly')

  return (
    <div className="bg-background-card border border-[--bd] rounded-[14px] p-4">
      <div className="flex justify-between items-start mb-3.5">
        <div>
          <p className="text-[13px] font-semibold text-[--t1]">
            {t('charts.moneyFlow')}
          </p>
          <p className="text-[10px] text-[--t3] mt-0.5">
            {period === 'weekly' 
              ? t('charts.weeklySales')
              : t('charts.monthlySales')}
          </p>
        </div>
        <div className="flex gap-[3px] bg-[--olive-faint] rounded-full p-[3px]">
          {(['weekly', 'monthly'] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium border-none cursor-pointer font-sans capitalize transition-all ${
                period === p
                  ? 'bg-white text-[--olive-mid] font-semibold'
                  : 'bg-transparent text-[--t3]'
              }`}
            >
              {t(`charts.${p}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 mb-2.5">
        <span className="flex items-center gap-1.5 text-[10px] text-[--t2]">
          <span className="w-[7px] h-[7px] rounded-full shrink-0" style={{ background: 'var(--olive-mid)' }} />
          {t('charts.revenue')}
        </span>
        <span className="flex items-center gap-1.5 text-[10px] text-[--t2]">
          <span className="w-[7px] h-[7px] rounded-full shrink-0" style={{ background: '#C0DD97' }} />
          {t('charts.orders')}
        </span>
      </div>

      <ResponsiveContainer width="100%" height={110}>
        <BarChart data={barData} barCategoryGap="38%" barGap={3}>
          <CartesianGrid vertical={false} stroke="rgba(90,107,58,0.07)" />
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#9CA3AF', fontFamily: 'inherit' }}
          />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(90,107,58,0.04)' }} />
          <Bar 
            dataKey="revenue" 
            name={t('charts.revenue')} 
            fill="var(--olive-mid)" 
            radius={[4, 4, 0, 0]} 
          />
          <Bar 
            dataKey="orders"  
            name={t('charts.orders')}  
            fill="#C0DD97"          
            radius={[4, 4, 0, 0]} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RevenueChart