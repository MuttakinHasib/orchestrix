import { CodeXml, Mail, MessageCircle, Webhook } from "lucide-react";

import { GithubIcon } from "@/modules/core/components/github-icon";
import { SlackIcon } from "@/modules/core/components/slack-icon";

export const INTEGRATIONS = [
  { name: "GitHub", icon: GithubIcon },
  { name: "Slack", icon: SlackIcon },
  { name: "Discord", icon: MessageCircle },
  { name: "Email", icon: Mail },
  { name: "Webhooks", icon: Webhook },
  { name: "REST API", icon: CodeXml },
] as const;
