import type { InputHTMLAttributes } from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

const inputVariants = cva(
  'w-full bg-background text-foreground transition-colors focus:outline-none rounded-none',
  {
    variants: {
      variant: {
        default: 'border border-border focus:border-foreground',
        underline: 'border-b border-border focus:border-foreground bg-transparent',
      },
      size: {
        sm: 'h-8 px-2 text-xs',
        md: 'h-10 px-3 py-2 text-sm',
        lg: 'h-12 px-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {}

export function Input({ className, variant, size, type = 'text', ...props }: InputProps) {
  const cvaClass = inputVariants({ variant, size })
  const combinedClassName = `${cvaClass} ${className || ''}`.trim()
  return (
    <input
      type={type}
      className={combinedClassName}
      {...props}
    />
  )
}
