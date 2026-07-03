import type { ComponentPropsWithoutRef } from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

export function DropdownMenu(props: DropdownMenuPrimitive.DropdownMenuProps) {
  return <DropdownMenuPrimitive.Root {...props} />;
}
export function DropdownMenuTrigger(
  props: DropdownMenuPrimitive.DropdownMenuTriggerProps,
) {
  return <DropdownMenuPrimitive.Trigger {...props} />;
}
export function DropdownMenuGroup(
  props: DropdownMenuPrimitive.DropdownMenuGroupProps,
) {
  return <DropdownMenuPrimitive.Group {...props} />;
}
export function DropdownMenuPortal(
  props: DropdownMenuPrimitive.DropdownMenuPortalProps,
) {
  return <DropdownMenuPrimitive.Portal {...props} />;
}

export type DropdownMenuContentProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Content
>;
export type DropdownMenuItemProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Item
>;

export function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: DropdownMenuContentProps) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        sideOffset={sideOffset}
        className={`z-50 min-w-[8rem] overflow-hidden border border-border bg-background p-1 text-foreground shadow-none rounded-none transition-all duration-150 ease-out data-[state=open]:opacity-100 data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=closed]:scale-95 origin-top-left ${className || ""}`}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

export function DropdownMenuItem({
  className,
  ...props
}: DropdownMenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      className={`relative flex cursor-pointer select-none items-center px-2 py-1.5 text-sm outline-none transition-colors focus:bg-foreground/5 focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 rounded-none ${className || ""}`}
      {...props}
    />
  );
}
