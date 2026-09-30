import { cn } from "cn"

/**
 * Issue board status dot — a 12px ring whose fill encodes progress:
 * Backlog is an empty dashed ring; In Progress half warning; Review
 * three-quarters info; Done solid success.
 */
const DOTS = {
  backlog: "border-dashed border-muted-foreground bg-transparent",
  "in-progress":
    "border-warning [background:conic-gradient(var(--warning)_0_50%,transparent_50%_100%)]",
  review: "border-info [background:conic-gradient(var(--info)_0_75%,transparent_75%_100%)]",
  done: "border-success bg-success",
} as const

const LABELS = {
  backlog: "Backlog",
  "in-progress": "In Progress",
  review: "Review",
  done: "Done",
} as const

type IssueStatusValue = keyof typeof DOTS

function IssueStatus({
  status,
  label,
  className,
}: {
  status: IssueStatusValue
  label?: string
  className?: string
}) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-sm", className)}>
      <span
        aria-hidden
        className={cn("size-3 rounded-full border-[1.5px]", DOTS[status])}
      />
      {label ?? LABELS[status]}
    </span>
  )
}

export { IssueStatus }
export type { IssueStatusValue }
