import React from "react"

export type BadgeVariant = "dark" | "success" | "warning" | "danger" | "info" | "neutral"

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
  variant?: BadgeVariant
  pulse?: boolean
  icon?: React.ReactNode
  size?: "sm" | "md"
  className?: string
}

export default function Badge({
  children,
  variant = "neutral",
  pulse = false,
  icon,
  size = "md",
  className = "",
  ...props
}: BadgeProps) {
  const variantStyles: Record<BadgeVariant, string> = {
    dark: "bg-[#0d262b] text-white shadow-2xs",
    success:
      "bg-emerald-50 text-emerald-800 border border-emerald-200/90 shadow-2xs",
    warning: "bg-amber-50 text-amber-900 border border-amber-200/90 shadow-2xs",
    danger: "bg-red-50 text-red-900 border border-red-200/90 shadow-2xs",
    info: "bg-sky-50 text-sky-900 border border-sky-200/90 shadow-2xs",
    neutral: "bg-slate-100 text-slate-700 border border-slate-200/80",
  }

  const dotColors: Record<BadgeVariant, string> = {
    dark: "bg-emerald-400",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    danger: "bg-red-500",
    info: "bg-sky-500",
    neutral: "bg-slate-400",
  }

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px] sm:text-[11px]",
    md: "px-2.5 py-0.5 text-[11px] sm:text-xs",
  }

  return (
    <span
      className={`inline-flex flex-row items-center justify-center gap-1.5 rounded-full font-semibold leading-none whitespace-nowrap shrink-0 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {pulse && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]} animate-pulse shrink-0`}
          aria-hidden="true"
        />
      )}
      {icon && (
        <span className="shrink-0 inline-flex items-center justify-center">
          {icon}
        </span>
      )}
      <span className="inline-flex flex-row items-center gap-1.5 whitespace-nowrap shrink-0">
        {children}
      </span>
    </span>
  )
}
