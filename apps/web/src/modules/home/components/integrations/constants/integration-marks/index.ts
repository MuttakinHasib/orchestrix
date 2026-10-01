import { DiscordIcon } from "@repo/icons/discord";
import { GithubIcon } from "@repo/icons/github";
import { SlackIcon } from "@repo/icons/slack";
import { CodeXml, Mail, Webhook } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

/** The hub diagram's canvas, in px. Node and connector positions use these coordinates. */
export const HUB_CANVAS = {
  width: 1100,
  height: 500,
  centerX: 550,
  centerY: 250,
} as const;

const COLUMN_X = { left: 150, right: 950 } as const;
const ROW_Y = [90, 250, 410] as const;

interface IntegrationMark {
  name: string;
  /** Brand marks keep their own colours; generic channels use lucide glyphs. */
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  x: number;
  y: number;
}

export const INTEGRATION_MARKS: readonly IntegrationMark[] = [
  { name: "GitHub", icon: GithubIcon, x: COLUMN_X.left, y: ROW_Y[0] },
  { name: "Slack", icon: SlackIcon, x: COLUMN_X.left, y: ROW_Y[1] },
  { name: "Discord", icon: DiscordIcon, x: COLUMN_X.left, y: ROW_Y[2] },
  { name: "Email", icon: Mail, x: COLUMN_X.right, y: ROW_Y[0] },
  { name: "Webhooks", icon: Webhook, x: COLUMN_X.right, y: ROW_Y[1] },
  { name: "REST API", icon: CodeXml, x: COLUMN_X.right, y: ROW_Y[2] },
];
