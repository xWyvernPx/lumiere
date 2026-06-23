import type { HTMLAttributes } from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

const statusBadgeVariants = cva(
  'inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-bold rounded-none select-none border border-foreground bg-transparent text-foreground',
  {
    variants: {
      variant: {
        online: '',
        offline: '',
        syncing: '',
      },
    },
    defaultVariants: {
      variant: 'online',
    },
  }
)

export interface StatusBadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {}

export function StatusBadge({ className, variant, children, ...props }: StatusBadgeProps) {
  const cvaClass = statusBadgeVariants({ variant })
  const combinedClassName = `${cvaClass} ${className || ''}`.trim()

  const dotColorMap = {
    online: 'bg-green-600',
    offline: 'bg-red-600',
    syncing: 'bg-blue-600 animate-pulse',
  }

  const activeDotColor = dotColorMap[variant || 'online']

  return (
    <div className={combinedClassName} {...props}>
      <span className={`inline-block w-1.5 h-1.5 rounded-full ${activeDotColor}`} />
      <span>{children}</span>
    </div>
  )
}
