import Link from "next/link";

import { ROUTES } from "@/modules/core/constants/routes";

import type { IntegrationNode as IntegrationNodeData } from "../../constants/integration-flows";

interface IntegrationNodeProps {
  node: IntegrationNodeData;
}

export function IntegrationNode({
  node: { name, detail, icon: Icon },
}: IntegrationNodeProps) {
  return (
    <Link
      href={ROUTES.COMING_SOON}
      className="flex items-center gap-3 rounded-[12px] border border-input bg-card px-4 py-2.5 text-foreground shadow-[0_12px_30px_rgb(0_0_0/0.4)] transition-[border-color,box-shadow] duration-200 hover:border-primary hover:text-foreground hover:shadow-[0_0_0_4px_var(--accent-soft),0_16px_40px_rgb(0_0_0/0.5)] lg:w-50"
    >
      <Icon aria-hidden className="size-4.5 shrink-0" />
      <span className="flex min-w-0 flex-col">
        <span className="font-medium">{name}</span>
        <span className="truncate text-xs text-muted-foreground">{detail}</span>
      </span>
    </Link>
  );
}
