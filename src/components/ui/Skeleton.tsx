import React from 'react'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  width?: string | number
  height?: string | number
  circle?: boolean
}

export default function Skeleton({
  className = '',
  width,
  height,
  circle = false,
  ...props
}: SkeletonProps) {
  const style: React.CSSProperties = {}
  if (width !== undefined) style.width = width
  if (height !== undefined) style.height = height

  return (
    <div
      className={`animate-pulse bg-slate-200/80 ${circle ? 'rounded-full' : 'rounded-md'} ${className}`}
      style={style}
      aria-hidden="true"
      {...props}
    />
  )
}
