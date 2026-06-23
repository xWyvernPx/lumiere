import type { ComponentPropsWithoutRef } from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

export function Tabs(props: TabsPrimitive.TabsProps) {
  return <TabsPrimitive.Root {...props} />
}

export type TabsListProps = ComponentPropsWithoutRef<typeof TabsPrimitive.List>
export type TabsTriggerProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
export type TabsContentProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Content>

export function TabsList({ className, ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      className={`inline-flex h-10 items-center justify-start border-b border-border w-full bg-transparent p-0 rounded-none ${className || ''}`}
      {...props}
    />
  )
}

export function TabsTrigger({ className, ...props }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      className={`inline-flex items-center justify-center whitespace-nowrap px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 border-b-2 border-transparent text-foreground/70 data-[state=active]:border-accent data-[state=active]:text-accent data-[state=active]:font-semibold rounded-none cursor-pointer -mb-[1px] ${className || ''}`}
      {...props}
    />
  )
}

export function TabsContent({ className, ...props }: TabsContentProps) {
  return (
    <TabsPrimitive.Content
      className={`focus-visible:outline-none mt-2 ${className || ''}`}
      {...props}
    />
  )
}
