"use client";

import Link from "next/link";
import { cn } from "cn";
import { useState } from "react";

import { AuthHeading } from "@/modules/auth/components/auth-heading";
import { TOUCH_TARGET } from "@/modules/auth/constants/touch-target";
import { ROUTES } from "@/modules/core/constants/routes";

import { CheckEmail } from "../check-email";
import { RequestResetForm } from "../request-reset-form";

/** Asks for an email, then confirms the reset link went out. */
export function ForgotPasswordFlow() {
  const [sentTo, setSentTo] = useState<string | null>(null);

  if (sentTo) return <CheckEmail email={sentTo} />;

  return (
    <>
      <AuthHeading
        title="Reset your password"
        description="Enter your work email and we’ll send you a link to set a new one."
      />
      <RequestResetForm onSent={setSentTo} />
      <Link
        href={ROUTES.SIGN_IN}
        className={cn(
          TOUCH_TARGET,
          "text-[13px] text-muted-foreground transition-colors hover:text-foreground",
        )}
      >
        Back to sign in
      </Link>
    </>
  );
}
