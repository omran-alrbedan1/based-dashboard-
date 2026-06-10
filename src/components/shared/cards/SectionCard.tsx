import React from 'react'
import { Card, CardContent } from '@/components/ui/card'

interface SectionCardProps {
  icon: React.ElementType
  title: string
  children: React.ReactNode
}

export const SectionCard: React.FC<SectionCardProps> = ({ icon: Icon, title, children }) => (
  <Card className="overflow-hidden border border-border/60 rounded-xl">
    <CardContent className="p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
        <div className="rounded-xl bg-primary/10 p-2 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="text-lg font-semibold text-text">{title}</h2>
      </div>
      {children}
    </CardContent>
  </Card>
)

interface DetailItemProps {
  icon: React.ReactNode
  label: string
  value: string
}

export const DetailItem: React.FC<DetailItemProps> = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5 h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center shrink-0 text-primary">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-xs text-text-secondary font-medium uppercase tracking-wider">{label}</p>
      <p className="text-sm text-text font-semibold mt-0.5 break-words">{value}</p>
    </div>
  </div>
)
