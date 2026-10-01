import Link from "next/link";
import { cn } from "cn";

import { TOUCH_TARGET } from "@/modules/auth/constants/touch-target";
import { ROUTES } from "@/modules/core/constants/routes";

export function NeedHelpLink() {
  return (
    <Link
      href={ROUTES.COMING_SOON}
      className={cn(
        TOUCH_TARGET,
        "text-muted-foreground transition-colors hover:text-foreground",
      )}
    >
      Need help?
    </Link>
  );
}
