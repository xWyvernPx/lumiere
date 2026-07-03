import type { ElementType, HTMLAttributes } from "react";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

const textVariants = cva("text-foreground", {
  variants: {
    variant: {
      default: "font-sans",
      display: "display-lg",
      caps: "label-caps",
      italic: "body-italic",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      xxl: "text-2xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "base",
  },
});

export interface TextProps
  extends HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
  as?: ElementType;
}

export function Text({
  className,
  variant,
  size,
  as: Component = "p",
  ...props
}: TextProps) {
  const cvaClass = textVariants({ variant, size });
  const combinedClassName = `${cvaClass} ${className || ""}`.trim();
  return <Component className={combinedClassName} {...props} />;
}
