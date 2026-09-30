import { cn } from "cn"

import { Badge } from "@/components/base/badge"

/**
 * Issue label chip — pill outline with a small colored dot.
 * The dot color is a label property, not a status.
 */
function LabelChip({
  children,
  dotClassName = "bg-primary",
  className,
}: {
  children: React.ReactNode
  dotClassName?: string
  className?: string
}) {
  return (
    <Badge variant="label" className={className}>
      <span aria-hidden className={cn("size-1.5 rounded-full", dotClassName)} />
      {children}
    </Badge>
  )
}

export { LabelChip }
