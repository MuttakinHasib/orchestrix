"use client";

import { useState } from "react";

import { Button } from "@/components/base/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/base/field";
import { Input } from "@/components/base/input";
import { Spinner } from "@/components/base/spinner";
import { AuthFootnote } from "@/modules/auth/components/auth-footnote";
import { AuthHeading } from "@/modules/auth/components/auth-heading";
import { simulateRequest } from "@/modules/auth/utils/simulate-request";
import { validateEmail } from "@/modules/auth/utils/validate-email";
import { ROUTES } from "@/modules/core/constants/routes";

function ResetRequestForm({ onSent }: { onSent: (email: string) => void }) {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const email = String(new FormData(event.currentTarget).get("email") ?? "");
    const emailError = validateEmail(email);

    setError(emailError);
    if (emailError) return;

    setIsSubmitting(true);
    await simulateRequest();
    setIsSubmitting(false);
    onSent(email.trim());
  }

  return (
    <>
      <AuthHeading
        title="Reset your password"
        description="Enter your work email and we'll send you a reset link."
      />
      <form noValidate onSubmit={handleSubmit}>
        <FieldGroup className="gap-3.5">
          <Field className="gap-1.5" data-invalid={Boolean(error)}>
            <FieldLabel htmlFor="email">Work email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              aria-invalid={Boolean(error)}
              className="h-10"
            />
            <FieldError>{error}</FieldError>
          </Field>
          <Button
            type="submit"
            size="lg"
            className="h-10 w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner className="size-3.5" /> : null}
            Send reset link
          </Button>
        </FieldGroup>
      </form>
      <AuthFootnote prompt="Remembered it?" href={ROUTES.signIn}>
        Back to sign in
      </AuthFootnote>
    </>
  );
}

export { ResetRequestForm };
