import { GitBranch, Play, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type WorkflowStepKind = "Trigger" | "Condition" | "Action";

export const WORKFLOW_STEPS: {
  kind: WorkflowStepKind;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  /** Edge label shown on the connector leading into this step. */
  branch?: string;
}[] = [
  {
    kind: "Trigger",
    title: "Issue created",
    subtitle: "Project ECOM",
    icon: Zap,
  },
  {
    kind: "Condition",
    title: "Priority = Critical",
    subtitle: "If the issue is critical",
    icon: GitBranch,
  },
  {
    kind: "Action",
    title: "Assign to Backend",
    subtitle: "Team · Backend",
    icon: Play,
    branch: "true",
  },
  {
    kind: "Action",
    title: "Send Slack message",
    subtitle: "#critical-bugs",
    icon: Play,
  },
];
