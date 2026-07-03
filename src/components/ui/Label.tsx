import type { LabelHTMLAttributes } from "react";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

const labelVariants = cva("text-foreground select-none font-semibold", {
  variants: {
    variant: {
      default: "text-sm font-medium",
      caps: "label-caps",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface LabelProps
  extends
    LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {}

export function Label({ className, variant, ...props }: LabelProps) {
  const cvaClass = labelVariants({ variant });
  const combinedClassName = `${cvaClass} ${className || ""}`.trim();
  return <label className={combinedClassName} {...props} />;
}
