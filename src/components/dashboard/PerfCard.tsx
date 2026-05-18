import React from 'react'
import { useTranslation } from 'react-i18next'
import type { PerfCardProps } from '@/types/dashboard.types'
import { TrendingUp, AlertCircle } from 'lucide-react'

const PerfCard: React.FC<PerfCardProps> = ({ label, value, target, progress, warn = false }) => {
  const { t } = useTranslation('dashboard')
  const radius = 25
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="group bg-background-card rounded-xl shadow-card border border-border/50 p-4 transition-all duration-300 hover:shadow-soft hover:scale-[1.02]">
      {/* Header Section with Icon */}
      <div className="flex items-center gap-1.5 mb-3">
        {warn ? (
          <AlertCircle size={12} className="text-amber-500" />
        ) : (
          <TrendingUp size={12} className="text-primary" />
        )}
        <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">
          {label}
        </p>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex-1">
          <p className="text-2xl font-bold text-text-primary leading-none mb-1">
            {value}
          </p>
          <p className="text-[10px] text-text-muted">
            {t('performance.target')}: <span className="font-semibold text-text-secondary">{target}</span>
          </p>
        </div>

        {/* Right Side - Circular Progress */}
        <div className="relative inline-flex items-center justify-center shrink-0">
          {/* Background Circle */}
          <svg className="w-16 h-16 transform -rotate-90">
            {/* Track */}
            <circle
              cx="32"
              cy="32"
              r={radius}
              stroke="currentColor"
              strokeWidth="5"
              fill="none"
              className={warn ? "text-amber-500/20" : "text-primary/20"}
            />
            {/* Progress Indicator */}
            <circle
              cx="32"
              cy="32"
              r={radius}
              stroke="currentColor"
              strokeWidth="5"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className={warn ? "text-amber-500" : "text-primary"}
              style={{
                transition: "stroke-dashoffset 0.5s ease-in-out",
              }}
            />
          </svg>
          
          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span 
              className="text-sm font-bold font-mono leading-none"
              style={{ color: warn ? '#D97706' : 'var(--color-primary)' }}
            >
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerfCard