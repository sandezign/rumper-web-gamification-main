import React from "react"

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "upgrade"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: "sm" | "md" | "lg"
  icon?: React.ReactNode
  fullWidth?: boolean
  className?: string
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  fullWidth = false,
  className = "",
  disabled = false,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold cursor-pointer select-none whitespace-nowrap transition-transform transition-colors duration-150 ease-out-decel active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F2B38] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100"

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      "bg-[#0F2B38] text-white border border-[#0F2B38] hover:bg-[#163b4d]",
    secondary:
      "bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200",
    outline:
      "bg-transparent text-slate-700 border border-slate-300 hover:bg-slate-50",
    ghost:
      "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900",
    danger: "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100",
    upgrade:
      "bg-[#00E676] text-[#062B23] border border-transparent hover:opacity-90 active:scale-95 shadow-2xs font-bold rounded-full",
  }

  const sizeStyles = {
    sm: "min-h-[36px] sm:min-h-[40px] px-3 py-1.5 text-xs",
    md: "min-h-[44px] px-4 py-2 text-xs sm:text-sm",
    lg: "min-h-[48px] px-6 py-2.5 text-sm sm:text-base",
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="inline-flex items-center justify-center gap-1.5">
        {children}
      </span>
    </button>
  )
}
