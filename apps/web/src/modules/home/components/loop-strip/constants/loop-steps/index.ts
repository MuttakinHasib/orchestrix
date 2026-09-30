import {
  CircleCheck,
  CircleDot,
  Folder,
  Play,
  Radio,
  Workflow,
  type LucideIcon,
} from "lucide-react";

interface LoopStep {
  name: string;
  description: string;
  icon: LucideIcon;
  /** Marks the step where automation happens — drawn in the intent colour. */
  isAutomation?: boolean;
}

export const LOOP_STEPS: readonly LoopStep[] = [
  {
    name: "Project",
    icon: Folder,
    description: "A home for a product or service.",
  },
  {
    name: "Issue",
    icon: CircleDot,
    description: "A unit of work with an owner.",
  },
  {
    name: "Event",
    icon: Radio,
    description: "Something changes: created, moved, commented.",
  },
  {
    name: "Workflow",
    icon: Workflow,
    description: "Your rules for what should happen next.",
    isAutomation: true,
  },
  {
    name: "Action",
    icon: Play,
    description: "Assign, label, notify, open a PR issue.",
  },
  {
    name: "Result",
    icon: CircleCheck,
    description: "A record of every step, success or failure.",
  },
];
