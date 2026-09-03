import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Wrench, Plus, FileText, User, Car, CalendarDays } from "lucide-react"
import PageHeader from "@/components/shared/headers/PageHeader"
import { Button } from "@/components/ui/button"
import { DataTable, type Column } from "@/components/shared/custom/DataTable"
import { CustomFilter } from "@/components/shared/custom/CustomFilter"
import { EmptyState } from "@/components/shared/states"
import ErrorState from "@/components/shared/states/ErrorState"
import { formatDate, formatCurrency } from "@/lib/formatter"
import { useMaintenanceCards } from "../hooks/useMaintenanceCards"
import { MaintenanceStatusBadge } from "../components/status-badge"
import {
  maintenanceFilterDefaultValues,
  maintenanceFilterFields,
  type MaintenanceFilterValues,
} from "../configs/maintenance-filter.config"
import type { MaintenanceCard } from "../types/maintenance.types"

interface MobileCardProps {
  item: MaintenanceCard
  onViewDetails: () => void
}

const MaintenanceMobileCard: React.FC<MobileCardProps> = ({
  item,
  onViewDetails,
}) => {
  const { t, i18n } = useTranslation("maintenance")
  const isAr = i18n.language === "ar"

  return (
    <button
      type="button"
      onClick={onViewDetails}
      className="w-full rounded-lg border border-border bg-card p-4 text-start shadow-sm transition-colors hover:bg-muted/30"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-text-primary" dir="ltr">
            {item.receiptNumber}
          </span>
        </div>
        <MaintenanceStatusBadge status={item.status} />
      </div>

      <div className="mt-3 space-y-1 text-xs text-muted-foreground">
        <p className="flex items-center gap-1.5">
          <User className="h-3.5 w-3.5 text-primary" />
          {item.customerSnapshot.name}
        </p>
        <p className="flex items-center gap-1.5">
          <Car className="h-3.5 w-3.5 text-primary" />
          {item.vehicleSnapshot.make} {item.vehicleSnapshot.model}
          <span dir="ltr">({item.vehicleSnapshot.plateNumber})</span>
        </p>
        <p className="flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5 text-primary" />
          {formatDate(item.createdAt, isAr ? "ar-SA" : "en-GB")}
        </p>
      </div>
    </button>
  )
}

const MaintenanceListPage: React.FC = () => {
  const { t, i18n } = useTranslation("maintenance")
  const navigate = useNavigate()
  const [activeFilters, setActiveFilters] = useState<MaintenanceFilterValues>()

  const cardsQuery = useMaintenanceCards()
  const cards = cardsQuery.data ?? []

  const filtered = useMemo(() => {
    if (!activeFilters) return cards
    const status = activeFilters.status
    const range = activeFilters.createdAt
    return cards.filter((c) => {
      const matchStatus = !status || c.status === status
      let matchDate = true
      if (range?.from) {
        const created = new Date(c.createdAt)
        if (range.to) {
          matchDate =
            created >= range.from &&
            created <= new Date(range.to.getTime() + 86400000)
        } else {
          matchDate = created >= range.from
        }
      }
      return matchStatus && matchDate
    })
  }, [cards, activeFilters])

  const totalCost = (card: MaintenanceCard) =>
    card.workItems.reduce((sum, w) => sum + (w.estimatedCost || 0), 0)

  const columns: Column<MaintenanceCard>[] = [
    {
      key: "receiptNumber",
      header: t("receiptNumber"),
      headerIcon: FileText,
      cell: (c) => (
        <span className="font-medium text-text-primary" dir="ltr">
          {c.receiptNumber}
        </span>
      ),
    },
    {
      key: "customer",
      header: t("list.customer"),
      headerIcon: User,
      cell: (c) => c.customerSnapshot.name,
    },
    {
      key: "vehicle",
      header: t("list.vehicle"),
      headerIcon: Car,
      cell: (c) => (
        <span>
          {c.vehicleSnapshot.make} {c.vehicleSnapshot.model}
          <span className="text-muted-foreground" dir="ltr">
            {" "}({c.vehicleSnapshot.plateNumber})
          </span>
        </span>
      ),
    },
    {
      key: "status",
      header: t("status"),
      headerIcon: Wrench,
      cell: (c) => <MaintenanceStatusBadge status={c.status} />,
    },
    {
      key: "createdAt",
      header: t("createdAt"),
      headerIcon: CalendarDays,
      cell: (c) => (
        <span className="text-muted-foreground">
          {formatDate(c.createdAt, i18n.language === "ar" ? "ar-SA" : "en-GB")}
        </span>
      ),
    },
    {
      key: "total",
      header: t("totalCost"),
      cell: (c) => (
        <span className="font-medium text-text-primary">
          {formatCurrency(totalCost(c))}
        </span>
      ),
    },
  ]

  const pagination = { total: filtered.length, page: 1, lastPage: 1 }

  const MobileCard = (props: {
    item: MaintenanceCard
    onViewDetails: () => void
    t: (key: string, options?: any) => string
    isAr: boolean
  }) => (
    <MaintenanceMobileCard
      item={props.item}
      onViewDetails={props.onViewDetails}
    />
  )

  if (cardsQuery.isError) {
    return <ErrorState variant="default" retry={() => cardsQuery.refetch()} />
  }

  const hasActiveFilter = !!activeFilters && Object.values(activeFilters).some(
    (v) => (v as string) !== "",
  )

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title={t("title")}
        description={t("subtitle")}
        rightContent={
          <Button onClick={() => navigate("/maintenance/new")} className="gap-1.5">
            <Plus className="h-4 w-4" />
            {t("addCard")}
          </Button>
        }
      />

      <CustomFilter<MaintenanceFilterValues>
        filters={maintenanceFilterFields(t)}
        onApplyFilters={setActiveFilters}
        onResetFilters={() => setActiveFilters(undefined)}
        defaultValues={maintenanceFilterDefaultValues}
        isLoading={cardsQuery.isFetching}
        title={t("filter.title")}
      />

      {filtered.length === 0 ? (
        <EmptyState
          icon={Wrench}
          title={hasActiveFilter ? t("list.noResults") : t("empty")}
          description={t("subtitle")}
          primaryAction={
            hasActiveFilter
              ? undefined
              : { label: t("addCard"), icon: Plus, onClick: () => navigate("/maintenance/new") }
          }
        />
      ) : (
        <DataTable<MaintenanceCard>
          data={filtered}
          columns={columns}
          loading={cardsQuery.isLoading}
          pagination={pagination}
          onPageChange={() => {}}
          getRowId={(c) => c.id}
          onRowClick={(c) => navigate(`/maintenance/${c.id}`)}
          mobileCardComponent={MobileCard}
          emptyMessage={t("list.noResults")}
        />
      )}
    </div>
  )
}

export default MaintenanceListPage
