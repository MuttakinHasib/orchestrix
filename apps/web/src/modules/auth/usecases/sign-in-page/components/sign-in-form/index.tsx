"use client";

import { useState } from "react";
import { KeyRound } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/base/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/base/field";
import { Input } from "@/components/base/input";
import { Spinner } from "@/components/base/spinner";
import { AuthFootnote } from "@/modules/auth/components/auth-footnote";
import { OauthButton } from "@/modules/auth/components/oauth-button";
import { PasswordInput } from "@/modules/auth/components/password-input";
import {
  AUTH_UNAVAILABLE_MESSAGE,
  simulateRequest,
} from "@/modules/auth/utils/simulate-request";
import { validateEmail } from "@/modules/auth/utils/validate-email";
import { GithubIcon } from "@/modules/core/components/github-icon";
import { ROUTES } from "@/modules/core/constants/routes";

type Errors = { email?: string; password?: string };

function SignInForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");

    const nextErrors: Errors = {};
    const emailError = validateEmail(email);
    if (emailError) nextErrors.email = emailError;
    if (!password) nextErrors.password = "Enter your password.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    await simulateRequest();
    setIsSubmitting(false);
    toast.info(AUTH_UNAVAILABLE_MESSAGE);
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <OauthButton icon={<GithubIcon />}>Continue with GitHub</OauthButton>
        <OauthButton icon={<span className="text-base font-semibold">G</span>}>
          Continue with Google
        </OauthButton>
        <OauthButton icon={<KeyRound aria-hidden />}>
          Single sign-on (SAML)
        </OauthButton>
      </div>
      <FieldSeparator>or with email</FieldSeparator>
      <form noValidate onSubmit={handleSubmit}>
        <FieldGroup className="gap-3.5">
          <Field className="gap-1.5" data-invalid={Boolean(errors.email)}>
            <FieldLabel htmlFor="email">Work email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              aria-invalid={Boolean(errors.email)}
              className="h-10"
            />
            <FieldError>{errors.email}</FieldError>
          </Field>
          <Field className="gap-1.5" data-invalid={Boolean(errors.password)}>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Link
                href={ROUTES.forgotPassword}
                className="text-sm text-accent-text hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <PasswordInput
              id="password"
              name="password"
              autoComplete="current-password"
              aria-invalid={Boolean(errors.password)}
            />
            <FieldError>{errors.password}</FieldError>
          </Field>
          <Button
            type="submit"
            size="lg"
            className="h-10 w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner className="size-3.5" /> : null}
            Sign in
          </Button>
        </FieldGroup>
      </form>
      <AuthFootnote prompt="No account yet?" href={ROUTES.signUp}>
        Create one
      </AuthFootnote>
    </>
  );
}

export { SignInForm };
