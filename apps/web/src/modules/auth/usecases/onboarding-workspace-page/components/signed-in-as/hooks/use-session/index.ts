import { useEffect, useState } from "react";

import { authService } from "@/modules/auth/services/auth-service";
import type { Session } from "@/modules/auth/types/auth-service";

/** The current session: `undefined` while loading, `null` when signed out. */
export function useSession(): Session | null | undefined {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    let isCurrent = true;
    authService.getSession().then((current) => {
      if (isCurrent) setSession(current);
    });
    return () => {
      isCurrent = false;
    };
  }, []);

  return session;
}
