import type { ComponentPropsWithoutRef } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

export function Select(props: SelectPrimitive.SelectProps) {
  return <SelectPrimitive.Root {...props} />;
}
export function SelectGroup(props: SelectPrimitive.SelectGroupProps) {
  return <SelectPrimitive.Group {...props} />;
}
export function SelectValue(props: SelectPrimitive.SelectValueProps) {
  return <SelectPrimitive.Value {...props} />;
}

export type SelectTriggerProps = ComponentPropsWithoutRef<
  typeof SelectPrimitive.Trigger
>;
export type SelectContentProps = ComponentPropsWithoutRef<
  typeof SelectPrimitive.Content
>;
export type SelectItemProps = ComponentPropsWithoutRef<
  typeof SelectPrimitive.Item
>;

export function SelectTrigger({
  className,
  children,
  ...props
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      className={`flex h-10 w-full items-center justify-between border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:border-foreground disabled:cursor-not-allowed disabled:opacity-50 rounded-none cursor-pointer ${className || ""}`}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <svg
          className="h-4 w-4 opacity-50"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="square"
            strokeLinejoin="miter"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        position={position}
        className={`relative z-50 max-h-96 min-w-[8rem] overflow-hidden border border-border bg-background text-foreground rounded-none ${position === "popper" ? "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1" : ""} ${className || ""}`}
        {...props}
      >
        <SelectPrimitive.Viewport
          className={`p-1 ${position === "popper" ? "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]" : ""}`}
        >
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

export function SelectItem({ className, children, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      className={`relative flex w-full select-none items-center py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-foreground/5 focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 rounded-none cursor-pointer ${className || ""}`}
      {...props}
    >
      <span className="absolute left-2.5 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="square"
              strokeLinejoin="miter"
              d="M5 12l5 5L20 7"
            />
          </svg>
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}
