"use client";

import { ArrowLeft, MailCheck } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@repo/ui/components/base/button";
import { Spinner } from "@repo/ui/components/base/spinner";

import { AuthHeading } from "@/modules/auth/components/auth-heading";
import { authService } from "@/modules/auth/services/auth-service";
import { ROUTES } from "@/modules/core/constants/routes";

import { useCountdown } from "./hooks/use-countdown";
import { formatCountdown } from "./utils/format-countdown";

const RESEND_COOLDOWN_SECONDS = 60;

interface CheckEmailProps {
  email: string;
}

export function CheckEmail({ email }: CheckEmailProps) {
  const { remaining, restart } = useCountdown(RESEND_COOLDOWN_SECONDS);
  const [isResending, startResend] = useTransition();
  const canResend = remaining === 0 && !isResending;

  const handleResend = () => {
    startResend(async () => {
      const result = await authService.requestPasswordReset(email);
      if (!result.ok) {
        toast.error(result.error.message);
        return;
      }
      toast.success(`Reset link sent again to ${email}.`);
      restart();
    });
  };

  return (
    <>
      <span className="grid size-12 place-items-center rounded-[12px] border border-primary text-primary">
        <MailCheck aria-hidden className="size-5.5" />
      </span>

      <AuthHeading
        title="Check your email"
        description={
          <>
            We sent a reset link to{" "}
            <span className="text-foreground">{email}</span>. It expires in 30
            minutes.
          </>
        }
      />

      <div className="flex w-full flex-col gap-2">
        <Button asChild size="xl" className="w-full">
          <a href="mailto:">Open email app</a>
        </Button>
        <Button
          type="button"
          variant="secondary"
          disabled={!canResend}
          aria-busy={isResending}
          onClick={handleResend}
          size="xl"
          className="w-full bg-transparent text-muted-foreground tabular-nums"
        >
          {isResending ? <Spinner aria-hidden /> : null}
          {remaining > 0
            ? `Resend in ${formatCountdown(remaining)}`
            : "Resend link"}
        </Button>
        <p aria-live="polite" className="sr-only">
          {remaining === 0 ? "You can resend the link now." : ""}
        </p>
      </div>

      <Link
        href={ROUTES.SIGN_IN}
        className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft aria-hidden className="size-3.25" />
        Back to sign in
      </Link>
    </>
  );
}
