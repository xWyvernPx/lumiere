import type { ComponentPropsWithoutRef } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../../lib/utils";

export function Tabs(props: TabsPrimitive.TabsProps) {
  return <TabsPrimitive.Root {...props} />;
}

export type TabsListProps = ComponentPropsWithoutRef<typeof TabsPrimitive.List>;
export type TabsTriggerProps = ComponentPropsWithoutRef<
  typeof TabsPrimitive.Trigger
>;
export type TabsContentProps = ComponentPropsWithoutRef<
  typeof TabsPrimitive.Content
>;

export function TabsList({ className, ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      className={cn(
        "inline-flex items-center justify-start w-full bg-transparent p-0 rounded-none",
        className,
      )}
      {...props}
    />
  );
}

export function TabsTrigger({ className, ...props }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap pb-3 text-sm font-bold uppercase tracking-widest transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 border-b-2 border-transparent text-[var(--foreground)] opacity-80 hover:text-[var(--foreground)] hover:opacity-100 data-[state=active]:border-[var(--border)] data-[state=active]:opacity-100 rounded-none cursor-pointer -mb-[1px]",
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({ className, ...props }: TabsContentProps) {
  return (
    <TabsPrimitive.Content
      className={cn("focus-visible:outline-none mt-2", className)}
      {...props}
    />
  );
}
