import type { ComponentPropsWithoutRef } from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

export type RadioGroupProps = ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
export type RadioGroupItemProps = ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>

export function RadioGroup({ className, ...props }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      className={`grid gap-2.5 ${className || ''}`}
      {...props}
    />
  )
}

export function RadioGroupItem({ className, ...props }: RadioGroupItemProps) {
  return (
    <RadioGroupPrimitive.Item
      className={`aspect-square h-4 w-4 border border-foreground bg-transparent text-foreground focus:outline-none focus-visible:ring-1 focus-visible:ring-foreground disabled:cursor-not-allowed disabled:opacity-50 rounded-none cursor-pointer flex items-center justify-center ${className || ''}`}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <div className="h-2.5 w-2.5 bg-foreground" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}
