import type { HTMLAttributes } from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

const badgeVariants = cva(
  'inline-flex items-center px-2.5 py-0.5 text-xs font-bold rounded-none border select-none',
  {
    variants: {
      variant: {
        outline: 'bg-transparent text-foreground border-foreground',
        solid: 'bg-foreground text-background border-foreground',
      },
    },
    defaultVariants: {
      variant: 'outline',
    },
  }
)

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  const cvaClass = badgeVariants({ variant })
  const combinedClassName = `${cvaClass} ${className || ''}`.trim()
  return (
    <div
      className={combinedClassName}
      {...props}
    />
  )
}
