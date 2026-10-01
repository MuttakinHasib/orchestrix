"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Tabs as TabsPrimitive } from "radix-ui"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-[orientation=horizontal]:flex-col",
        className
      )}
      {...props}
    />
  )
}

/**
 * `line` (default) is the Orchestrix tab bar: underline tabs sitting on a
 * single hairline, active tab marked with a 1.5px accent underline.
 * `segment` is a compact segmented control bar.
 */
const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center text-muted-foreground",
  {
    variants: {
      variant: {
        line: "w-full justify-start gap-5 rounded-none border-b border-border p-0",
        segment:
          "gap-0.5 rounded-md border border-input bg-card p-0.5 shadow-surface",
      },
    },
    defaultVariants: {
      variant: "line",
    },
  }
)

function TabsList({
  className,
  variant = "line",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium whitespace-nowrap pointer-coarse:py-2 text-muted-foreground transition-all hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent-soft disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        // line (default): underline tabs
        "group-data-[variant=line]/tabs-list:flex-none group-data-[variant=line]/tabs-list:rounded-none group-data-[variant=line]/tabs-list:px-0 group-data-[variant=line]/tabs-list:py-1.5 group-data-[variant=line]/tabs-list:font-normal group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:text-foreground group-data-[variant=line]/tabs-list:data-[state=active]:shadow-[inset_0_-1.5px_0_0_var(--primary)]",
        // segment: pressed pill
        "group-data-[variant=segment]/tabs-list:h-7 pointer-coarse:group-data-[variant=segment]/tabs-list:h-9 group-data-[variant=segment]/tabs-list:gap-1.5 group-data-[variant=segment]/tabs-list:px-2.5 group-data-[variant=segment]/tabs-list:text-xs group-data-[variant=segment]/tabs-list:font-normal group-data-[variant=segment]/tabs-list:data-[state=active]:bg-accent group-data-[variant=segment]/tabs-list:data-[state=active]:text-foreground",
        "data-[state=active]:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
