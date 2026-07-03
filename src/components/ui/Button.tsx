import type { ButtonHTMLAttributes } from "react";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-sans font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground disabled:pointer-events-none disabled:opacity-50 rounded-none cursor-pointer border-0",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--primary)] text-[var(--background)] hover:bg-[var(--accent)] active:scale-[0.98] transition-all duration-100",
        outline:
          "bg-transparent text-[var(--foreground)] border border-[var(--border)] border-opacity-30 hover:bg-[var(--code-bg)] active:scale-[0.98] transition-all duration-100",
        ghost:
          "bg-transparent text-[var(--foreground)] hover:bg-[var(--code-bg)] active:scale-[0.98] transition-all duration-100",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 py-2 text-sm",
        lg: "h-12 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
