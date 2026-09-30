import {
  CircleCheck,
  CircleDashed,
  CircleX,
  type LucideIcon,
} from "lucide-react";

export const StepOutcome = {
  SUCCEEDED: "succeeded",
  FAILED: "failed",
  SKIPPED: "skipped",
} as const;
export type StepOutcome = (typeof StepOutcome)[keyof typeof StepOutcome];

export const STEP_OUTCOME_ICON: Record<StepOutcome, LucideIcon> = {
  [StepOutcome.SUCCEEDED]: CircleCheck,
  [StepOutcome.FAILED]: CircleX,
  [StepOutcome.SKIPPED]: CircleDashed,
};

interface ExecutionStep {
  title: string;
  result: string;
  outcome: StepOutcome;
}

export const EXECUTION_STEPS: readonly ExecutionStep[] = [
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
];
