import { useTranslation } from 'react-i18next'
import { UserCheck } from 'lucide-react'
import PageHeader from '@/components/shared/headers/PageHeader'
import { EmptyState } from '@/components/shared/states'

const DriverApprovalPage = () => {
  const { t } = useTranslation('drivers')

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('driverApproval.title')}
        description={t('driverApproval.description')}
        icon={UserCheck}
      />
      <EmptyState
        icon={UserCheck}
        title={t('driverApproval.emptyState')}
      />
    </div>
  )
}

export default DriverApprovalPage
