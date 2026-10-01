import {
  CircleCheck,
  Play,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

interface EventLoopStep {
  name: string;
  icon: LucideIcon;
  example: string;
  description: string;
}

export const EVENT_LOOP_STEPS: readonly EventLoopStep[] = [
  {
    name: "Event",
    icon: Zap,
    example: "Issue created",
    description: "Created, moved, commented or a webhook arrives.",
  },
  {
    name: "Workflow",
    icon: Workflow,
    example: "Priority is Critical",
    description: "Your rules decide what happens next.",
  },
  {
    name: "Action",
    icon: Play,
    example: "Assign Backend · post to Slack",
    description: "Steps run across your tools.",
  },
  {
    name: "Result",
    icon: CircleCheck,
    example: "Execution #18273",
    description: "Every step recorded, with inputs and errors.",
  },
];
