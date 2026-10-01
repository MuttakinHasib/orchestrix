import type { ExecutionStatus } from "@repo/ui/components/blocks/status-badge";
import {
  CircleCheck,
  CircleDashed,
  CircleX,
  LoaderCircle,
  type LucideIcon,
} from "lucide-react";

export const StepOutcome = {
  SUCCEEDED: "succeeded",
  FAILED: "failed",
  RUNNING: "running",
  SKIPPED: "skipped",
} as const;
export type StepOutcome = (typeof StepOutcome)[keyof typeof StepOutcome];

export const STEP_OUTCOME_ICON: Record<StepOutcome, LucideIcon> = {
  [StepOutcome.SUCCEEDED]: CircleCheck,
  [StepOutcome.FAILED]: CircleX,
  [StepOutcome.RUNNING]: LoaderCircle,
  [StepOutcome.SKIPPED]: CircleDashed,
};

/** Where the demo execution is: failed, re-running from step 4, or recovered. */
export const RunPhase = {
  FAILED: "failed",
  RETRYING: "retrying",
  RECOVERED: "recovered",
} as const;
export type RunPhase = (typeof RunPhase)[keyof typeof RunPhase];

export interface ExecutionStep {
  title: string;
  result: string;
  outcome: StepOutcome;
}

const COMPLETED_STEPS: readonly ExecutionStep[] = [
  {
    title: "Issue created",
    result: "ECOM-123",
    outcome: StepOutcome.SUCCEEDED,
  },
  {
    title: "Priority = Critical",
    result: "true",
    outcome: StepOutcome.SUCCEEDED,
  },
  {
    title: "Assign to Backend",
    result: "Completed",
    outcome: StepOutcome.SUCCEEDED,
  },
];

/** Steps 4 and 5 are the ones a retry re-runs. */
const RETRIED_STEPS: Record<RunPhase, readonly ExecutionStep[]> = {
  [RunPhase.FAILED]: [
    {
      title: "Send Slack message",
      result: "Timed out · 3 attempts",
      outcome: StepOutcome.FAILED,
    },
    {
      title: "Create GitHub issue",
      result: "Not executed",
      outcome: StepOutcome.SKIPPED,
    },
  ],
  [RunPhase.RETRYING]: [
    {
      title: "Send Slack message",
      result: "Retrying…",
      outcome: StepOutcome.RUNNING,
    },
    {
      title: "Create GitHub issue",
      result: "Not executed",
      outcome: StepOutcome.SKIPPED,
    },
  ],
  [RunPhase.RECOVERED]: [
    {
      title: "Send Slack message",
      result: "Delivered on retry",
      outcome: StepOutcome.SUCCEEDED,
    },
    {
      title: "Create GitHub issue",
      result: "acme/storefront#319",
      outcome: StepOutcome.SUCCEEDED,
    },
  ],
};

export function getExecutionSteps(phase: RunPhase): readonly ExecutionStep[] {
  return [...COMPLETED_STEPS, ...RETRIED_STEPS[phase]];
}

interface RunPhaseSummary {
  status: ExecutionStatus;
  duration: string;
  announcement: string;
}

export const RUN_PHASE_SUMMARY: Record<RunPhase, RunPhaseSummary> = {
  [RunPhase.FAILED]: {
    status: "failed",
    duration: "4.3s",
    announcement: "Execution failed at step 4.",
  },
  [RunPhase.RETRYING]: {
    status: "running",
    duration: "…",
    announcement: "Retrying from step 4.",
  },
  [RunPhase.RECOVERED]: {
    status: "success",
    duration: "5.1s",
    announcement: "Execution succeeded. Steps 4 and 5 ran again.",
  },
};
