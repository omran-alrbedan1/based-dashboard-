import { useTranslation } from 'react-i18next'
import { FilterX, Users, UserCheck, Clock, Ban } from 'lucide-react'
import PageHeader from '@/components/shared/headers/PageHeader'
import { EmptyState } from '@/components/shared/states'
import StatCard from '@/components/shared/cards/StatCard'
import { images } from '@/constants/images'
import { UserFilters, UsersTable } from '../components'
import type { UserFilterForm } from '../types/users.types'
import { useUsersList } from '../hooks/useUsersList'
import { ActivateModal, SuspendModal } from '@/components/shared/modals'

const UsersList = () => {
  const { t } = useTranslation('users')

  const {
    users,
    stats,
    pagination,
    loading,
    filtersForForm,
    hasActiveFilters,
    activateId,
    suspendId,
    processing,
    setActivateId,
    setSuspendId,
    handleActivate,
    handleSuspend,
    handleFormFilterChange,
    handleResetFilters,
    handlePageChange,
  } = useUsersList()

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-background">
      <PageHeader
        title={t('list.title')}
        description={t('list.description')}
        image={{ src: images.usersManagement, alt: t('list.title') }}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 my-4 sm:my-6 lg:my-8">
        <StatCard label={t('stats.total')} value={stats.total} sub={t('stats.totalSub')} icon={<Users className="h-5 w-5" />} />
        <StatCard label={t('stats.active')} value={stats.active} sub={t('stats.activeSub')} icon={<UserCheck className="h-5 w-5" />} />
        <StatCard label={t('stats.suspended')} value={stats.suspended} sub={t('stats.suspendedSub')} icon={<Ban className="h-5 w-5" />} />
        <StatCard label={t('stats.pending')} value={stats.pending} sub={t('stats.pendingSub')} icon={<Clock className="h-5 w-5" />} />
      </div>

      <div className="w-full mb-4">
        <UserFilters
          onApplyFilters={handleFormFilterChange}
          onResetFilters={handleResetFilters}
          isLoading={loading}
          initialFilters={filtersForForm as Partial<UserFilterForm>}
        />
      </div>

      <div className="bg-card rounded-2xl border border-border/50 overflow-hidden mt-4 sm:mt-6">
        {users.length === 0 && !loading ? (
          <div className="p-8 sm:p-12">
            {hasActiveFilters ? (
              <EmptyState
                title={t('list.empty.title')}
                description={t('list.empty.description')}
                primaryAction={{ label: t('filters.reset'), onClick: handleResetFilters, icon: FilterX }}
              />
            ) : (
              <EmptyState title={t('list.empty.title')} description={t('list.empty.description')} />
            )}
          </div>
        ) : (
          <UsersTable
            users={users}
            loading={loading}
            pagination={{
              total: pagination.total,
              page: pagination.page,
              lastPage: pagination.lastPage,
            }}
            onPageChange={handlePageChange}
            onActivate={(id) => setActivateId(id)}
            onSuspend={(id) => setSuspendId(id)}
          />
        )}
      </div>

      <ActivateModal
        open={!!activateId}
        onConfirm={handleActivate}
        onClose={() => setActivateId(null)}
        loading={processing}
        name={users.find((u) => u.id === activateId)?.name ?? ''}
      />
      <SuspendModal
        open={!!suspendId}
        onConfirm={handleSuspend}
        onClose={() => setSuspendId(null)}
        loading={processing}
        name={users.find((u) => u.id === suspendId)?.name ?? ''}
      />
    </div>
  )
}

export default UsersList
