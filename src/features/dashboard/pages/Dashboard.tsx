import React from 'react'
import { useTranslation } from 'react-i18next'
import { Wrench, ClipboardList, CalendarCheck, CircleCheck } from 'lucide-react'
import PageHeader from '@/components/shared/headers/PageHeader'
import StatCard from '@/components/shared/cards/StatCard'

const Dashboard: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title={t('dashboard.welcome')}
        description={t('dashboard.subtitle')}
      />

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        <StatCard
          label={t('dashboard.statCards.openCards')}
          value={5}
          sub={t('dashboard.statCards.todayVisits')}
          icon={<ClipboardList size={16} />}
        />
        <StatCard
          label={t('dashboard.statCards.todayVisits')}
          value={12}
          sub={t('dashboard.statCards.completedThisWeek')}
          icon={<CalendarCheck size={16} />}
        />
        <StatCard
          label={t('dashboard.statCards.pendingWork')}
          value={8}
          sub={t('dashboard.statCards.openCards')}
          icon={<Wrench size={16} />}
        />
        <StatCard
          label={t('dashboard.statCards.completedThisWeek')}
          value="94%"
          sub={t('dashboard.statCards.pendingWork')}
          icon={<CircleCheck size={16} />}
        />
      </div>
    </div>
  )
}

export default Dashboard
