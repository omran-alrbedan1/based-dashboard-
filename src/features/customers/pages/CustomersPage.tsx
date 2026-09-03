import { useTranslation } from "react-i18next"
import { Users } from "lucide-react"
import PageHeader from "@/components/shared/headers/PageHeader"
import EmptyState from "@/components/shared/states/EmptyState"

const CustomersPage: React.FC = () => {
  const { t } = useTranslation("customers")

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title={t("title")}
        description={t("subtitle")}
      />
      <EmptyState
        icon={Users}
        title={t("empty")}
        description={t("subtitle")}
      />
    </div>
  )
}

export default CustomersPage
