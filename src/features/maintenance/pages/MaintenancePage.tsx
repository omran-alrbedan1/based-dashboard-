import { useTranslation } from "react-i18next"
import { Wrench } from "lucide-react"
import PageHeader from "@/components/shared/headers/PageHeader"
import EmptyState from "@/components/shared/states/EmptyState"

const MaintenancePage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title={t("maintenance.title")}
        description={t("maintenance.subtitle")}
      />
      <EmptyState
        icon={Wrench}
        title={t("maintenance.empty")}
        description={t("maintenance.subtitle")}
      />
    </div>
  )
}

export default MaintenancePage
