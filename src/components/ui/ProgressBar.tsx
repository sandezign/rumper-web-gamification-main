import React from 'react'

export type ProgressVariant = 'danger' | 'warning' | 'info' | 'success' | 'neutral'

interface ProgressBarProps {
  value: number | null
  max?: number
  variant?: ProgressVariant
  showValueLabel?: boolean
  label?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function ProgressBar({
  value,
  max = 100,
  variant = 'neutral',
  showValueLabel = false,
  label,
  size = 'md',
  className = '',
}: ProgressBarProps) {
  const percentage = value !== null ? Math.min(100, Math.max(0, (value / max) * 100)) : 0

  const variantStyles: Record<ProgressVariant, string> = {
    danger: 'bg-rose-500 shadow-2xs',
    warning: 'bg-amber-500 shadow-2xs',
    info: 'bg-sky-500 shadow-2xs',
    success: 'bg-emerald-500 shadow-2xs',
    neutral: 'bg-slate-300/80',
  }

  const heightStyles = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-2.5',
  }

  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      {(label || showValueLabel) && (
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
          {label && <span>{label}</span>}
          {showValueLabel && (
            <span className="tabular-nums font-bold text-slate-900">
              {value !== null ? `${Math.round(percentage)}%` : 'Belum dinilai'}
            </span>
          )}
        </div>
      )}
      <div
        className={`w-full bg-slate-100 border border-slate-200/60 rounded-full overflow-hidden p-[1px] ${heightStyles[size]}`}
        role="progressbar"
        aria-valuenow={value !== null ? value : 0}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={`h-full transition-all duration-500 ease-out rounded-full ${variantStyles[variant]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
