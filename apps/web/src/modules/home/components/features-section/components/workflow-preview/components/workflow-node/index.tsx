import type { LucideIcon } from "lucide-react";

import { cn } from "cn";

type WorkflowNodeProps = {
  kind: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  isTrigger: boolean;
};

function WorkflowNode({
  kind,
  title,
  subtitle,
  icon: Icon,
  isTrigger,
}: WorkflowNodeProps) {
  return (
    <div
      className={cn(
        "flex h-16 w-full max-w-[240px] items-center gap-2.5 rounded-lg border border-input bg-card px-3 shadow-surface",
        { "border-primary": isTrigger },
      )}
    >
      <span
        className={cn(
          "grid size-[30px] flex-none place-items-center rounded-md border border-input text-muted-foreground",
          { "border-primary text-primary": isTrigger },
        )}
      >
        <Icon aria-hidden className="size-4" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.08em] text-muted-foreground/70">
          {kind}
        </span>
        <span className="truncate font-medium">{title}</span>
        <span className="truncate text-xs text-muted-foreground">
          {subtitle}
        </span>
      </div>
    </div>
  );
}

export { WorkflowNode };
