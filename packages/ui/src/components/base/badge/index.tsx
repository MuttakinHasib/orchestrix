import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

/**
 * Orchestrix badges — two families:
 *  - Status (default shape): soft tint background, colored text, 3px radius.
 *    Status colors mean status: execution states, validation, alerts only.
 *  - `label`: issue label chip — pill outline with a colored dot child.
 */
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-xs px-2 h-[22px] text-xs font-normal whitespace-nowrap transition-[color,box-shadow] [&>svg]:pointer-events-none [&>svg:not([class*='size-'])]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        muted: "bg-accent text-muted-foreground",
        success: "bg-success-soft text-success",
        info: "bg-info-soft text-info",
        warning: "bg-warning-soft text-warning",
        destructive: "bg-destructive-soft text-destructive",
        outline: "border-border text-foreground",
        label:
          "h-5 rounded-full border border-input bg-card px-[7px] text-[11.5px] font-normal text-muted-foreground",
        link: "text-accent-text underline-offset-[3px] [a&]:hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
