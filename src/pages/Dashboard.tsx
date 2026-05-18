import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  DollarSign,
  ShoppingBag,
  Users,
  Receipt,
  Clock,
  Store,
  Truck,
  CircleCheck,
} from 'lucide-react'
import {
  StatCard,
  QuickCard,
  PerfCard,
  RevenueChart,
  BudgetChart,
  RecentOrders,
  NewUsers,
  DashboardHeader
} from '@/components/dashboard'

const Dashboard: React.FC = () => {
  const { t } = useTranslation('dashboard')
  return (
    <div className="flex flex-col gap-3">

      <DashboardHeader/>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        <StatCard
          label={t('statCards.totalRevenue')}
          value="$24,567"
          change={15}
          sub={t('statCards.vsLastMonth', { value: '$21,362' })}
          icon={<DollarSign size={16} />}
        />
        <StatCard
          label={t('statCards.totalOrders')}
          value={456}
          change={8}
          sub={t('statCards.vsLastMonth', { value: '422' })}
          icon={<ShoppingBag size={16} />}
        />
        <StatCard
          label={t('statCards.activeUsers')}
          value={1234}
          change={12}
          sub={t('statCards.vsLastMonth', { value: '1,102' })}
          icon={<Users size={16} />}
        />
        <StatCard
          label={t('statCards.avgOrderValue')}
          value="$78.50"
          change={-3}
          sub={t('statCards.vsLastMonth', { value: '$80.90' })}
          icon={<Receipt size={16} />}
        />
      </div>

      {/* ── Charts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.65fr_1fr] gap-2.5">
        <RevenueChart />
        <BudgetChart />
      </div>

      {/* ── Quick stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        <QuickCard label="Pending approvals" value={12}    icon={<Clock size={18} />} />
        <QuickCard label="Active vendors"    value={89}    icon={<Store size={18} />} />
        <QuickCard label="Active drivers"    value={34}    icon={<Truck size={18} />} />
        <QuickCard label="Completion rate"   value="94%"   icon={<CircleCheck size={18} />} />
      </div>

      {/* ── Orders + Users ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-2.5">
        <RecentOrders />
        <NewUsers />
      </div>

      {/* ── Performance ── */}
{/* ── Performance ── */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
  <PerfCard 
    label={t('performance.orderFulfillmentRate')} 
    value="94%" 
    target="98%" 
    progress={94} 
  />
  <PerfCard 
    label={t('performance.customerSatisfaction')}  
    value="4.8" 
    target="5.0"  
    progress={96} 
  />
  <PerfCard 
    label={t('performance.onTimeDelivery')}        
    value="89%" 
    target="95%" 
    progress={89} 
    warn 
  />
</div>  

    </div>
  )
}

export default Dashboard