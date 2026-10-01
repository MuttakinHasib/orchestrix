"use client";

import Link from "next/link";
import { cn } from "cn";

import { TOUCH_TARGET } from "@/modules/auth/constants/touch-target";
import { ROUTES } from "@/modules/core/constants/routes";

import { useSession } from "./hooks/use-session";

/** Who the workspace is being created for, or a way to sign in if nobody is. */
export function SignedInAs() {
  const session = useSession();

  if (session === undefined) return null;

  if (session === null) {
    return (
      <Link
        href={ROUTES.SIGN_IN}
        className={cn(
          TOUCH_TARGET,
          "text-muted-foreground transition-colors hover:text-foreground",
        )}
      >
        Sign in
      </Link>
    );
  }

  return (
    <span>
      <span className="sr-only">Signed in as </span>
      {session.email}
    </span>
  );
}
