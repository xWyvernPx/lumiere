import type { ComponentPropsWithoutRef } from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'

export function Accordion(props: ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root {...props} />
}

export type AccordionItemProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
export type AccordionTriggerProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
export type AccordionContentProps = ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>

export function AccordionItem({ className, ...props }: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      className={`border-b border-border rounded-none ${className || ''}`}
      {...props}
    />
  )
}

export function AccordionTrigger({ className, children, ...props }: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={`flex flex-1 items-center justify-between py-4 text-sm font-semibold transition-all hover:underline group rounded-none cursor-pointer text-left text-foreground ${className || ''}`}
        {...props}
      >
        {children}
        <svg className="h-4 w-4 shrink-0 text-foreground/50 transition-transform duration-200 group-data-[state=open]:rotate-180">
          <use href="/icons.svg#chevron-down-icon" />
        </svg>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

export function AccordionContent({ className, children, ...props }: AccordionContentProps) {
  return (
    <AccordionPrimitive.Content
      className={`overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down ${className || ''}`}
      {...props}
    >
      <div className="pb-4 pt-0">{children}</div>
    </AccordionPrimitive.Content>
  )
}
