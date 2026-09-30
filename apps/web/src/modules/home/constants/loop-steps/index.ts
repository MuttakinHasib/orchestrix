import {
  CircleCheck,
  CircleDot,
  Folder,
  Play,
  Radio,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const LOOP_STEPS: {
  name: string;
  description: string;
  icon: LucideIcon;
  accent?: boolean;
}[] = [
  {
    name: "Project",
    description: "A home for a product or service.",
    icon: Folder,
  },
  {
    name: "Issue",
    description: "A unit of work with an owner.",
    icon: CircleDot,
  },
  {
    name: "Event",
    description: "Something changes: created, moved, commented.",
    icon: Radio,
  },
  {
    name: "Workflow",
    description: "Your rules for what should happen next.",
    icon: Workflow,
    accent: true,
  },
  {
    name: "Action",
    description: "Assign, label, notify, open a PR issue.",
    icon: Play,
  },
  {
    name: "Result",
    description: "A record of every step, input and output.",
    icon: CircleCheck,
  },
];
