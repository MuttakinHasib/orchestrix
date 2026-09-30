import { Bot } from "lucide-react"

import { cn } from "cn"

/**
 * Automation actor mark — square, accent-outlined, so system actions
 * never read as people in avatars rows and activity timelines.
 */
function ActorMark({
  label = "Automation",
  className,
}: {
  label?: string
  className?: string
}) {
  return (
    <span
      title={label}
      className={cn(
        "inline-flex size-6 items-center justify-center rounded-md border border-primary text-accent-text",
        className
      )}
    >
      <Bot aria-hidden className="size-3.5" />
    </span>
  )
}

export { ActorMark }
