import { CircleCheck, CircleDashed, CircleX } from "lucide-react";

import { cn } from "cn";

import type {
  EXECUTION_STEPS,
  ExecutionStepState,
} from "@/modules/home/constants/execution-steps";

const STATE_ICON = {
  ok: CircleCheck,
  fail: CircleX,
  skipped: CircleDashed,
} satisfies Record<ExecutionStepState, unknown>;

function ExecutionStep({ step }: { step: (typeof EXECUTION_STEPS)[number] }) {
  const Icon = STATE_ICON[step.state];
  const isFailed = step.state === "fail";
  const isSkipped = step.state === "skipped";

  return (
    <li
      className={cn(
        "flex h-10 items-center gap-3 rounded-md border border-border px-3",
        { "border-destructive": isFailed },
      )}
    >
      <Icon
        aria-hidden
        className={cn("size-4 text-success", {
          "text-destructive": isFailed,
          "text-muted-foreground/70": isSkipped,
        })}
      />
      <span className={cn("flex-1", { "text-muted-foreground/70": isSkipped })}>
        {step.title}
      </span>
      <span
        className={cn("text-xs text-muted-foreground/70", {
          "text-destructive": isFailed,
        })}
      >
        {step.result}
      </span>
    </li>
  );
}

export { ExecutionStep };
