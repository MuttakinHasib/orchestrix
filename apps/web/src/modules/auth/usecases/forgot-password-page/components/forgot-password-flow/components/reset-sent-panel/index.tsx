"use client";

import { ArrowLeft, MailCheck } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/base/button";
import { AuthHeading } from "@/modules/auth/components/auth-heading";
import { useCountdown } from "@/modules/auth/hooks/use-countdown";
import { ROUTES } from "@/modules/core/constants/routes";

const RESEND_SECONDS = 42;

const formatCountdown = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

function ResetSentPanel({ email }: { email: string }) {
  const { remaining, restart } = useCountdown(RESEND_SECONDS);
  const canResend = remaining <= 0;

  function handleResend() {
    restart();
    toast.success("We sent another reset link.");
  }

  return (
    <>
      <span className="mx-auto grid size-12 place-items-center rounded-xl border border-primary text-primary">
        <MailCheck aria-hidden className="size-[22px]" />
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
      <div className="flex flex-col gap-2">
        <Button asChild size="lg" className="h-10 w-full">
          <a href="mailto:">Open email app</a>
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="lg"
          className="h-10 w-full text-muted-foreground"
          disabled={!canResend}
          onClick={handleResend}
        >
          {canResend
            ? "Resend link"
            : `Resend in ${formatCountdown(remaining)}`}
        </Button>
      </div>
      <Link
        href={ROUTES.signIn}
        className="mx-auto inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft aria-hidden className="size-3.5" />
        Back to sign in
      </Link>
    </>
  );
}

export { ResetSentPanel };
