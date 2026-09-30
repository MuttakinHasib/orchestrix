import { DiscordIcon } from "@repo/icons/discord";
import { GithubIcon } from "@repo/icons/github";
import { SlackIcon } from "@repo/icons/slack";
import { CodeXml, Mail, Webhook } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

interface IntegrationMark {
  name: string;
  /** Brand marks keep their own colours; generic channels use lucide glyphs. */
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const INTEGRATION_MARKS: readonly IntegrationMark[] = [
  { name: "GitHub", icon: GithubIcon },
  { name: "Slack", icon: SlackIcon },
  { name: "Discord", icon: DiscordIcon },
  { name: "Email", icon: Mail },
  { name: "Webhooks", icon: Webhook },
  { name: "REST API", icon: CodeXml },
];
