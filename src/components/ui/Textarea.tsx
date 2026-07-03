import type { TextareaHTMLAttributes } from "react";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

const textareaVariants = cva(
  "w-full bg-background text-foreground transition-colors focus:outline-none rounded-none resize-y",
  {
    variants: {
      variant: {
        default: "border border-border focus:border-foreground",
        underline:
          "border-b border-border focus:border-foreground bg-transparent",
      },
      size: {
        sm: "p-2 text-xs min-h-[60px]",
        md: "p-3 text-sm min-h-[80px]",
        lg: "p-4 text-base min-h-[100px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface TextareaProps
  extends
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof textareaVariants> {}

export function Textarea({
  className,
  variant,
  size,
  ...props
}: TextareaProps) {
  const cvaClass = textareaVariants({ variant, size });
  const combinedClassName = `${cvaClass} ${className || ""}`.trim();
  return <textarea className={combinedClassName} {...props} />;
}
