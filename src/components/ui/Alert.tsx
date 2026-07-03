import type { HTMLAttributes } from "react";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive";
}

export function Alert({
  className,
  variant = "default",
  role = "alert",
  ...props
}: AlertProps) {
  const baseClass =
    "relative w-full border p-4 bg-background rounded-none text-foreground";
  const variantClass =
    variant === "destructive"
      ? "border-2 border-foreground font-semibold"
      : "border-border";
  return (
    <div
      role={role}
      className={`${baseClass} ${variantClass} ${className || ""}`}
      {...props}
    />
  );
}

export function AlertTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5
      className={`mb-1 font-semibold leading-none tracking-tight ${className || ""}`}
      {...props}
    />
  );
}

export function AlertDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return <div className={`text-sm opacity-90 ${className || ""}`} {...props} />;
}
