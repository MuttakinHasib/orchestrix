export type ExecutionStepState = "ok" | "fail" | "skipped";

export const EXECUTION_STEPS: {
  title: string;
  result: string;
  state: ExecutionStepState;
}[] = [
  { title: "Issue created", result: "ECOM-123", state: "ok" },
  { title: "Priority = Critical", result: "true", state: "ok" },
  { title: "Assign to Backend", result: "Completed", state: "ok" },
  {
    title: "Send Slack message",
    result: "Timed out · 3 attempts",
    state: "fail",
  },
  { title: "Create GitHub issue", result: "Not executed", state: "skipped" },
];
