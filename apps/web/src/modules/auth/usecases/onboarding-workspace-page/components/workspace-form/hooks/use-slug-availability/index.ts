import { useEffect, useState } from "react";

import { authService } from "@/modules/auth/services/auth-service";

const DEBOUNCE_MS = 400;

export const SlugStatus = {
  IDLE: "idle",
  CHECKING: "checking",
  AVAILABLE: "available",
  TAKEN: "taken",
} as const;
export type SlugStatus = (typeof SlugStatus)[keyof typeof SlugStatus];

interface SlugCheck {
  slug: string;
  isAvailable: boolean;
}

/**
 * Checks whether a slug is free once typing pauses. Only well-formed slugs are
 * checked; the status is derived from the latest answer, so it never lags the input.
 */
export function useSlugAvailability(
  slug: string,
  isWellFormed: boolean,
): SlugStatus {
  const [lastCheck, setLastCheck] = useState<SlugCheck | null>(null);

  useEffect(() => {
    if (!isWellFormed) return;

    let isCurrent = true;
    const timer = window.setTimeout(async () => {
      const isAvailable = await authService.isOrganizationSlugAvailable(slug);
      if (isCurrent) setLastCheck({ slug, isAvailable });
    }, DEBOUNCE_MS);

    return () => {
      isCurrent = false;
      window.clearTimeout(timer);
    };
  }, [slug, isWellFormed]);

  if (!isWellFormed) return SlugStatus.IDLE;
  if (lastCheck?.slug !== slug) return SlugStatus.CHECKING;
  return lastCheck.isAvailable ? SlugStatus.AVAILABLE : SlugStatus.TAKEN;
}
