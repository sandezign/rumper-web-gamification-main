import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'flat' | 'bordered'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
}

export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  ...props
}: CardProps) {
  const variantStyles = {
    default: 'bg-white border border-slate-200/90 shadow-xs rounded-2xl sm:rounded-3xl',
    flat: 'bg-slate-50/80 border border-slate-200/60 rounded-xl sm:rounded-2xl',
    bordered: 'bg-white border border-slate-200 rounded-2xl',
  }

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-6',
    lg: 'p-5 sm:p-7',
  }

  return (
    <div
      className={`overflow-hidden transition-shadow duration-200 ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
