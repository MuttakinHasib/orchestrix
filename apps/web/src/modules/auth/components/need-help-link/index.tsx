import Link from "next/link";

import { ROUTES } from "@/modules/core/constants/routes";

export function NeedHelpLink() {
  return (
    <Link
      href={ROUTES.COMING_SOON}
      className="text-muted-foreground transition-colors hover:text-foreground"
    >
      Need help?
    </Link>
  );
}
