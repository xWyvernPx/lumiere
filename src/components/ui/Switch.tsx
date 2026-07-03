import type { ComponentPropsWithoutRef } from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

export type SwitchProps = ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>;

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center border border-foreground bg-transparent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-foreground rounded-none ${className || ""}`}
      {...props}
    >
      <SwitchPrimitive.Thumb className="pointer-events-none block h-4 w-4 bg-foreground data-[state=checked]:bg-background data-[state=checked]:translate-x-5 translate-x-1 transition-transform duration-150 rounded-none" />
    </SwitchPrimitive.Root>
  );
}
