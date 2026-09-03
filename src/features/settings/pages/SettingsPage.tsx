import { useTranslation } from "react-i18next"
import { Settings as SettingsIcon } from "lucide-react"
import PageHeader from "@/components/shared/headers/PageHeader"
import EmptyState from "@/components/shared/states/EmptyState"

const SettingsPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title={t("settings.title")}
        description={t("settings.subtitle")}
      />
      <EmptyState
        icon={SettingsIcon}
        title={t("settings.title")}
        description={t("settings.subtitle")}
      />
    </div>
  )
}

export default SettingsPage
