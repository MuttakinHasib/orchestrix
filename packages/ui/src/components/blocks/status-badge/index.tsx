import { Ban, Check, Clock, LoaderCircle, X } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Badge } from "@/components/base/badge"

const STATUS_MAP = {
  success: { label: "Success", icon: Check, variant: "success" },
  running: { label: "Running", icon: LoaderCircle, variant: "info" },
  failed: { label: "Failed", icon: X, variant: "destructive" },
  cancelled: { label: "Cancelled", icon: Ban, variant: "muted" },
  waiting: { label: "Waiting", icon: Clock, variant: "warning" },
} as const satisfies Record<
  string,
  { label: string; icon: LucideIcon; variant: "success" | "info" | "destructive" | "muted" | "warning" }
>

type ExecutionStatus = keyof typeof STATUS_MAP

/**
 * Execution status badge — status colors appear only on execution states,
 * validation and alerts, as text on a soft tint.
 */
function StatusBadge({
  status,
  label,
  className,
}: {
  status: ExecutionStatus
  label?: string
  className?: string
}) {
  const { label: defaultLabel, icon: Icon, variant } = STATUS_MAP[status]

  return (
    <Badge variant={variant} className={className}>
      <Icon aria-hidden />
      {label ?? defaultLabel}
    </Badge>
  )
}

export { StatusBadge, STATUS_MAP }
export type { ExecutionStatus }
