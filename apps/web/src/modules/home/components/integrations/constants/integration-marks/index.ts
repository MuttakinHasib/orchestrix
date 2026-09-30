import { CodeXml, Mail, MessageCircle, Webhook } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import { GithubIcon } from "@/modules/core/components/icons/github-icon";
import { SlackIcon } from "@/modules/core/components/icons/slack-icon";

interface IntegrationMark {
  name: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const INTEGRATION_MARKS: readonly IntegrationMark[] = [
  { name: "GitHub", icon: GithubIcon },
  { name: "Slack", icon: SlackIcon },
  { name: "Discord", icon: MessageCircle },
  { name: "Email", icon: Mail },
  { name: "Webhooks", icon: Webhook },
  { name: "REST API", icon: CodeXml },
];
