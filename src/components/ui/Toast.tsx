import type { ComponentPropsWithoutRef } from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'

export function ToastProvider(props: ToastPrimitive.ToastProviderProps) {
  return <ToastPrimitive.Provider {...props} />
}

export type ToastViewportProps = ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
export type ToastProps = ComponentPropsWithoutRef<typeof ToastPrimitive.Root>
export type ToastTitleProps = ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
export type ToastDescriptionProps = ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
export type ToastActionProps = ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
export type ToastCloseProps = ComponentPropsWithoutRef<typeof ToastPrimitive.Close>

export function ToastViewport({ className, ...props }: ToastViewportProps) {
  return (
    <ToastPrimitive.Viewport
      className={`fixed bottom-0 right-0 z-100 flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px] ${className || ''}`}
      {...props}
    />
  )
}

export function Toast({ className, type = 'background', ...props }: ToastProps) {
  return (
    <ToastPrimitive.Root
      type={type}
      aria-live={props['aria-live'] || 'polite'}
      className={`group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden border border-border bg-background p-6 pr-8 shadow-none transition-all data-[state=open]:animate-toast-slide-in data-[state=closed]:animate-toast-hide rounded-none ${className || ''}`}
      {...props}
    />
  )
}

export function ToastTitle({ className, ...props }: ToastTitleProps) {
  return (
    <ToastPrimitive.Title
      className={`text-sm font-semibold text-foreground ${className || ''}`}
      {...props}
    />
  )
}

export function ToastDescription({ className, ...props }: ToastDescriptionProps) {
  return (
    <ToastPrimitive.Description
      className={`text-xs opacity-90 text-foreground/80 ${className || ''}`}
      {...props}
    />
  )
}

export function ToastAction({ className, ...props }: ToastActionProps) {
  return (
    <ToastPrimitive.Action
      className={`inline-flex h-8 shrink-0 items-center justify-center border border-border bg-transparent px-3 text-xs font-semibold ring-offset-background transition-colors hover:bg-foreground/5 focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 rounded-none cursor-pointer ${className || ''}`}
      {...props}
    />
  )
}

export function ToastClose({ className, ...props }: ToastCloseProps) {
  return (
    <ToastPrimitive.Close
      className={`absolute right-2 top-2 p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 rounded-none cursor-pointer ${className || ''}`}
      {...props}
    >
      <svg className="h-4 w-4">
        <use href="/icons.svg#x-icon" />
      </svg>
    </ToastPrimitive.Close>
  )
}
