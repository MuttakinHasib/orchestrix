"use client";

import { RotateCw, Undo2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "cn";

import { Button } from "@repo/ui/components/base/button";
import { Spinner } from "@repo/ui/components/base/spinner";
import { StatusBadge } from "@repo/ui/components/blocks/status-badge";

import {
  getExecutionSteps,
  RUN_PHASE_SUMMARY,
  RunPhase,
  STEP_OUTCOME_ICON,
  StepOutcome,
} from "./constants/execution-steps";

const RETRY_DURATION_MS = 1400;

/** A failed execution the reader can retry from the failed step. */
export function ExecutionCard() {
  const [phase, setPhase] = useState<RunPhase>(RunPhase.FAILED);
  const retryTimer = useRef<number | undefined>(undefined);
  const { status, duration, announcement } = RUN_PHASE_SUMMARY[phase];

  useEffect(() => () => window.clearTimeout(retryTimer.current), []);

  const retry = () => {
    setPhase(RunPhase.RETRYING);
    retryTimer.current = window.setTimeout(
      () => setPhase(RunPhase.RECOVERED),
      RETRY_DURATION_MS,
    );
  };

  return (
    <figure className="flex flex-col gap-2.5 rounded-[14px] border border-border bg-card p-4 sm:p-6">
      <figcaption className="flex items-center gap-2.5 border-b border-border pb-3">
        <span className="font-semibold">Execution #18273</span>
        <StatusBadge status={status} />
        <span className="ml-auto font-mono text-xs text-muted-foreground/70 tabular-nums">
          {duration}
        </span>
      </figcaption>
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>

      <ol className="flex flex-col gap-2.5">
        {getExecutionSteps(phase).map(({ title, result, outcome }) => {
          const Icon = STEP_OUTCOME_ICON[outcome];
          const isFailed = outcome === StepOutcome.FAILED;
          const isRunning = outcome === StepOutcome.RUNNING;
          const isSkipped = outcome === StepOutcome.SKIPPED;

          return (
            <li
              key={title}
              className={cn(
                "flex h-10 items-center gap-3 rounded-[8px] border border-border px-3 transition-[border-color,background-color] duration-400",
                {
                  "border-destructive": isFailed,
                  "border-info bg-info-soft": isRunning,
                },
              )}
            >
              <Icon
                aria-hidden
                className={cn("size-3.75 shrink-0 text-success", {
                  "text-destructive": isFailed,
                  "text-info motion-safe:animate-spin": isRunning,
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
                    "text-info": isRunning,
                  },
                )}
              >
                {result}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="mt-1 flex items-center gap-2">
        {phase === RunPhase.RECOVERED ? (
          <>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setPhase(RunPhase.FAILED)}
              className="text-[12.5px]"
            >
              <Undo2 aria-hidden />
              Reset demo
            </Button>
            <span className="text-xs text-muted-foreground/70">
              Steps 4 and 5 ran again
            </span>
          </>
        ) : (
          <>
            <Button
              type="button"
              disabled={phase === RunPhase.RETRYING}
              aria-busy={phase === RunPhase.RETRYING}
              onClick={retry}
              className="text-[12.5px]"
            >
              {phase === RunPhase.RETRYING ? (
                <>
                  <Spinner aria-hidden className="size-3.5" />
                  Retrying…
                </>
              ) : (
                <>
                  <RotateCw aria-hidden />
                  Retry from step 4
                </>
              )}
            </Button>
            {phase === RunPhase.FAILED ? (
              <span className="text-xs text-muted-foreground/70">Try it</span>
            ) : null}
          </>
        )}
      </div>
    </figure>
  );
}
