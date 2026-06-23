import type { ButtonHTMLAttributes } from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground disabled:pointer-events-none disabled:opacity-50 rounded-none cursor-pointer border-0',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-background border border-primary hover:opacity-95 active:scale-[0.98] transition-transform duration-100',
        outline: 'bg-transparent text-foreground border border-foreground hover:bg-foreground/5 active:scale-[0.98] transition-transform duration-100',
        ghost: 'bg-transparent text-foreground hover:bg-foreground/5 active:scale-[0.98] transition-transform duration-100',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 py-2',
        lg: 'h-12 px-8 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  const cvaClass = buttonVariants({ variant, size })
  const combinedClassName = `${cvaClass} ${className || ''}`.trim()
  return (
    <button
      className={combinedClassName}
      {...props}
    />
  )
}
