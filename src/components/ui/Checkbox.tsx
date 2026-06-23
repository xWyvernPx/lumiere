import type { ComponentPropsWithoutRef } from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

export type CheckboxProps = ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      className={`peer h-5 w-5 shrink-0 border border-foreground bg-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-foreground data-[state=checked]:text-background rounded-none cursor-pointer flex items-center justify-center transition-colors duration-150 ${className || ''}`}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        <svg
          className="h-3 w-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="square"
            strokeLinejoin="miter"
            d="M5 12l5 5L20 7"
          />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}
