import type { ComponentPropsWithoutRef } from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'

export type ProgressProps = ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>

export function Progress({ className, value, ...props }: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      className={`relative h-3 w-full overflow-hidden bg-foreground/5 border border-border rounded-none ${className || ''}`}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-accent transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}
