import React from 'react'
import Badge from './Badge'

interface SectionHeaderProps {
  stepNumber?: number | string
  stepLabel?: string
  title: string
  subtitle?: string
  action?: React.ReactNode
  statusBadge?: React.ReactNode
  icon?: React.ReactNode
  className?: string
}

export default function SectionHeader({
  stepNumber,
  stepLabel = 'TAHAP',
  title,
  subtitle,
  action,
  statusBadge,
  icon,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col gap-2 sm:gap-3 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Eyebrow / Step Badge */}
          {stepNumber && (
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <Badge variant="dark" size="sm" icon={icon}>
                {stepLabel} {String(stepNumber).padStart(2, '0')}
              </Badge>
            </div>
          )}

          {/* Title & Status Badge */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug text-wrap-balance">
                {title}
              </h2>
              {statusBadge}
            </div>
            {subtitle && (
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal text-wrap-pretty">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right action slot */}
        {action && <div className="shrink-0 self-start">{action}</div>}
      </div>
    </div>
  )
}
