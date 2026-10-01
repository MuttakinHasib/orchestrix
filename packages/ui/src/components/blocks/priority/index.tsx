import {
  ChevronDown,
  ChevronsUp,
  Equal,
  OctagonAlert,
} from "lucide-react"

import { cn } from "cn"

/**
 * Priority glyphs. Critical reads in the error color; the rest are ink.
 */
const GLYPHS = {
  critical: {
    label: "Critical",
    icon: OctagonAlert,
    className: "text-destructive",
  },
  high: { label: "High", icon: ChevronsUp, className: "text-muted-foreground" },
  medium: { label: "Medium", icon: Equal, className: "text-muted-foreground" },
  low: { label: "Low", icon: ChevronDown, className: "text-muted-foreground/70" },
} as const

type PriorityValue = keyof typeof GLYPHS

function Priority({
  value,
  label,
  className,
}: {
  value: PriorityValue
  label?: string
  className?: string
}) {
  const { label: defaultLabel, icon: Icon, className: iconClassName } = GLYPHS[value]

  return (
    <span className={cn("inline-flex items-center gap-1.5 text-sm", className)}>
      <Icon aria-hidden className={cn("size-3.5", iconClassName)} />
      {label ?? defaultLabel}
    </span>
  )
}

export { Priority }
export type { PriorityValue }
