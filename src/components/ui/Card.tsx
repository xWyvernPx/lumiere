import type { HTMLAttributes } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'featured'
}

export function Card({ className, variant = 'default', ...props }: CardProps) {
  const baseClass = 'bg-background text-foreground border border-border rounded-none'
  const variantClass = variant === 'featured' ? 'border-t-4 border-t-foreground' : ''
  const combinedClassName = `${baseClass} ${variantClass} ${className || ''}`.trim()
  return <div className={combinedClassName} {...props} />
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`flex flex-col space-y-1.5 p-6 ${className || ''}`} {...props} />
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`font-semibold leading-none tracking-tight ${className || ''}`}
      {...props}
    />
  )
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`text-sm text-foreground/70 ${className || ''}`}
      {...props}
    />
  )
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`p-6 pt-0 ${className || ''}`} {...props} />
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`flex items-center p-6 pt-0 ${className || ''}`} {...props} />
}
