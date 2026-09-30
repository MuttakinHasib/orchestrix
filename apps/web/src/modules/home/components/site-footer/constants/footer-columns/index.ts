import { ROUTES } from "@/modules/core/constants/routes";
import { env } from "@/modules/core/env";
import type { NavLink } from "@/modules/home/types/nav-link";

interface FooterColumn {
  title: string;
  links: readonly NavLink[];
}

export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Projects", href: "#work" },
      { label: "Workflows", href: "#workflows" },
      { label: "Executions", href: "#executions" },
      { label: "Integrations", href: "#integrations" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Docs", href: env.docsUrl },
      { label: "API", href: env.docsUrl },
      { label: "Webhooks", href: ROUTES.COMING_SOON },
      { label: "Status", href: ROUTES.COMING_SOON },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: ROUTES.COMING_SOON },
      { label: "Changelog", href: ROUTES.COMING_SOON },
      { label: "Careers", href: ROUTES.COMING_SOON },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: ROUTES.COMING_SOON },
      { label: "Terms", href: ROUTES.COMING_SOON },
      { label: "Security", href: ROUTES.COMING_SOON },
    ],
  },
];
