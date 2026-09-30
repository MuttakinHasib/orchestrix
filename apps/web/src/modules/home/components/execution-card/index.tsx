import { RotateCw } from "lucide-react";
import { cn } from "cn";

import { buttonVariants } from "@repo/ui/components/base/button";
import { StatusBadge } from "@repo/ui/components/blocks/status-badge";

import {
  EXECUTION_STEPS,
  STEP_OUTCOME_ICON,
  StepOutcome,
} from "./constants/execution-steps";

/** A failed execution, step by step. Illustrative — nothing here is interactive. */
export function ExecutionCard() {
  return (
    <figure className="flex flex-col gap-2.5 rounded-[14px] border border-border bg-card p-4 sm:p-6">
      <figcaption className="flex items-center gap-2.5 border-b border-border pb-3">
        <span className="font-semibold">Execution #18273</span>
        <StatusBadge status="failed" />
        <span className="ml-auto font-mono text-xs text-muted-foreground/70">
          4.3s
        </span>
      </figcaption>

      <ol className="flex flex-col gap-2.5">
        {EXECUTION_STEPS.map(({ title, result, outcome }) => {
          const Icon = STEP_OUTCOME_ICON[outcome];
          const isFailed = outcome === StepOutcome.FAILED;
          const isSkipped = outcome === StepOutcome.SKIPPED;

          return (
            <li
              key={title}
              className={cn(
                "flex h-10 items-center gap-3 rounded-[8px] border border-border px-3",
                {
                  "border-destructive": isFailed,
                },
              )}
            >
              <Icon
                aria-hidden
                className={cn("size-3.75 text-success", {
                  "text-destructive": isFailed,
                  "text-muted-foreground/70": isSkipped,
                })}
              />
              <span
                className={cn("min-w-0 flex-1 truncate", {
                  "text-muted-foreground/70": isSkipped,
                })}
              >
                {title}
              </span>
              <span
                className={cn(
                  "shrink-0 text-[12.5px] text-muted-foreground/70",
                  {
                    "text-destructive": isFailed,
                  },
                )}
              >
                {result}
              </span>
            </li>
          );
        })}
      </ol>

      <span
        aria-hidden
        className={cn(
          buttonVariants(),
          "pointer-events-none mt-1 w-fit text-[12.5px]",
        )}
      >
        <RotateCw className="size-3" />
        Retry from step 4
      </span>
    </figure>
  );
}
