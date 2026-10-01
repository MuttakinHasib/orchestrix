import { DiscordIcon } from "@repo/icons/discord";
import { GithubIcon } from "@repo/icons/github";
import { SlackIcon } from "@repo/icons/slack";
import { CalendarClock, CodeXml, Mail, Webhook } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

export interface IntegrationNode {
  name: string;
  /** What this tool does in a workflow, e.g. "Pull request merged". */
  detail: string;
  /** Brand marks keep their own colours; generic channels use lucide glyphs. */
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

/** Events from these tools start workflows. */
export const INTEGRATION_TRIGGERS: readonly IntegrationNode[] = [
  { name: "GitHub", detail: "Pull request merged", icon: GithubIcon },
  { name: "Webhooks", detail: "Payload received", icon: Webhook },
  { name: "Schedule", detail: "Weekdays at 9:00", icon: CalendarClock },
];

/** Workflow steps act in these tools. */
export const INTEGRATION_ACTIONS: readonly IntegrationNode[] = [
  { name: "Slack", detail: "Post to #critical-bugs", icon: SlackIcon },
  { name: "Discord", detail: "Notify #releases", icon: DiscordIcon },
  { name: "Email", detail: "Send the daily summary", icon: Mail },
  { name: "REST API", detail: "Call any endpoint", icon: CodeXml },
];

/** The desktop diagram's canvas, in px. Every position below uses it. */
export const HUB_CANVAS = {
  width: 1060,
  height: 500,
  centerX: 530,
  centerY: 250,
} as const;

/** Horizontal centre of each column of nodes. */
export const COLUMN_X = { trigger: 120, action: 940 } as const;

/** Nodes are a fixed 200px wide, so connectors can meet their inner edge. */
export const NODE_HALF_WIDTH = 100;

/** The hub card is a fixed 160px wide; connectors meet its sides. */
export const HUB_HALF_WIDTH = 80;

const MAX_ROW_GAP = 160;
const COLUMN_SPAN = 360;

/** Vertical centre of the `index`-th of `count` nodes, spread evenly around the hub. */
export function nodeY(index: number, count: number): number {
  const gap = count > 1 ? Math.min(MAX_ROW_GAP, COLUMN_SPAN / (count - 1)) : 0;
  return HUB_CANVAS.centerY + (index - (count - 1) / 2) * gap;
}
