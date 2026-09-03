import { useTranslation } from "react-i18next"
import { formatDateTime } from "@/lib/formatter"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Wrench,
  CheckCircle,
  XCircle,
  Lock,
  FileText,
  Calendar,
  User,
} from "lucide-react"
import type { ActivityEvent } from "../types/activity.types"
import { cn } from "@/lib/utils"

interface ActivityTimelineProps {
  events: ActivityEvent[]
}

const getActivityIcon = (type: ActivityEvent["type"]) => {
  switch (type) {
    case "card_created":
      return Plus
    case "card_status_changed":
      return FileText
    case "work_added":
    case "work_updated":
    case "work_status_changed":
      return Wrench
    case "work_completed":
      return CheckCircle
    case "work_cancelled":
      return XCircle
    case "card_closed":
      return Lock
    case "approval_recorded":
      return CheckCircle
    case "delivery_scheduled":
      return Calendar
    case "card_cancelled":
      return XCircle
    default:
      return FileText
  }
}

const getActivityColor = (type: ActivityEvent["type"]) => {
  switch (type) {
    case "card_created":
      return "text-primary"
    case "card_status_changed":
      return "text-blue-400"
    case "work_added":
    case "work_updated":
      return "text-yellow-400"
    case "work_status_changed":
      return "text-orange-400"
    case "work_completed":
      return "text-green-400"
    case "work_cancelled":
      return "text-red-400"
    case "card_closed":
      return "text-slate-400"
    case "approval_recorded":
      return "text-green-400"
    case "delivery_scheduled":
      return "text-purple-400"
    case "card_cancelled":
      return "text-red-400"
    default:
      return "text-muted-foreground"
  }
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ events }) => {
  const { t, i18n } = useTranslation("maintenance")
  const isAr = i18n.language === "ar"

  if (events.length === 0) {
    return (
      <Card>
        <div className="p-6 text-center text-sm text-muted-foreground">
          {t("activity.noActivity", "No activity yet")}
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {events.map((event, index) => {
        const Icon = getActivityIcon(event.type)
        const iconColor = getActivityColor(event.type)

        return (
          <div
            key={event.id}
            className={cn(
              "relative flex gap-4 pb-4",
              index !== events.length - 1 && "border-r border-border/30 pr-4 rtl:border-l rtl:pr-0 rtl:pl-4"
            )}
          >
            <div className="flex shrink-0 items-start">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full bg-muted/50",
                  iconColor
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-text-primary">
                  {event.description}
                </p>
                <Badge variant="outline" className="text-xs">
                  {t(`activity.${event.type}`, event.type)}
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{formatDateTime(event.timestamp, isAr ? "ar-SA" : "en-GB")}</span>
                {event.actor && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {event.actor}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
