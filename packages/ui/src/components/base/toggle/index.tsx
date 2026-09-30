"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Toggle as TogglePrimitive } from "radix-ui"

const toggleVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-md text-sm font-normal whitespace-nowrap transition-[color,box-shadow] outline-none hover:bg-accent hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-accent-soft disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      variant: {
        default: "bg-transparent text-muted-foreground data-[state=on]:bg-accent data-[state=on]:text-foreground",
        outline:
          "bg-card text-muted-foreground data-[state=on]:text-accent-text data-[state=on]:shadow-[inset_0_0_0_1px_var(--primary)]",
      },
      size: {
        default: "h-7 min-w-7 px-2.5 text-[12.5px]",
        sm: "h-6 min-w-6 px-2 text-xs",
        lg: "h-8 min-w-8 px-3 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
