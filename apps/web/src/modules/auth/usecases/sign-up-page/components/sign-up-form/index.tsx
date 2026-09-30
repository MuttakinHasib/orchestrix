"use client";

import { useState } from "react";
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
import { PasswordStrengthMeter } from "@/modules/auth/components/password-strength-meter";
import {
  getPasswordStrength,
  MIN_PASSWORD_LENGTH,
} from "@/modules/auth/utils/get-password-strength";
import {
  AUTH_UNAVAILABLE_MESSAGE,
  simulateRequest,
} from "@/modules/auth/utils/simulate-request";
import { validateEmail } from "@/modules/auth/utils/validate-email";
import { GithubIcon } from "@/modules/core/components/github-icon";
import { ROUTES } from "@/modules/core/constants/routes";

type Errors = { name?: string; email?: string; password?: string };

function SignUpForm() {
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "");

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = "Enter your full name.";
    const emailError = validateEmail(email);
    if (emailError) nextErrors.email = emailError;
    if (password.length < MIN_PASSWORD_LENGTH) {
      nextErrors.password = `Use at least ${MIN_PASSWORD_LENGTH} characters.`;
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    await simulateRequest();
    setIsSubmitting(false);
    toast.info(AUTH_UNAVAILABLE_MESSAGE);
  }

  return (
    <>
      <OauthButton icon={<GithubIcon />}>Sign up with GitHub</OauthButton>
      <FieldSeparator>or</FieldSeparator>
      <form noValidate onSubmit={handleSubmit}>
        <FieldGroup className="gap-3.5">
          <Field className="gap-1.5" data-invalid={Boolean(errors.name)}>
            <FieldLabel htmlFor="name">Full name</FieldLabel>
            <Input
              id="name"
              name="name"
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              className="h-10"
            />
            <FieldError>{errors.name}</FieldError>
          </Field>
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
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <PasswordInput
              id="password"
              name="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-invalid={Boolean(errors.password)}
            />
            <PasswordStrengthMeter {...getPasswordStrength(password)} />
            <FieldError>{errors.password}</FieldError>
          </Field>
          <Button
            type="submit"
            size="lg"
            className="h-10 w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner className="size-3.5" /> : null}
            Create account
          </Button>
        </FieldGroup>
      </form>
      <p className="text-center text-xs text-muted-foreground/70">
        By continuing you agree to the Terms and Privacy Policy.
      </p>
      <AuthFootnote prompt="Have an account?" href={ROUTES.signIn}>
        Sign in
      </AuthFootnote>
    </>
  );
}

export { SignUpForm };
