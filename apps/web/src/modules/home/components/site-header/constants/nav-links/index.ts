import { ROUTES } from "@/modules/core/constants/routes";
import { env } from "@/modules/core/env";

import type { NavLink } from "@/modules/home/types/nav-link";

export const NAV_LINKS: readonly NavLink[] = [
  { label: "Product", href: "#product" },
  { label: "Workflows", href: "#workflows" },
  { label: "Integrations", href: "#integrations" },
  { label: "Pricing", href: ROUTES.COMING_SOON },
  { label: "Docs", href: env.docsUrl },
  { label: "Changelog", href: ROUTES.COMING_SOON },
];
