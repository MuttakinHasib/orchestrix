"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { FieldSet } from "@repo/ui/components/base/field";

import { AuthField } from "@/modules/auth/components/auth-field";
import { AuthInput } from "@/modules/auth/components/auth-input";
import { PasswordInput } from "@/modules/auth/components/password-input";
import { SubmitButton } from "@/modules/auth/components/submit-button";
import { authService } from "@/modules/auth/services/auth-service";
import { ROUTES } from "@/modules/core/constants/routes";

import { signInSchema, type SignInValues } from "../../schemas/sign-in-schema";

export function SignInForm() {
  const router = useRouter();
  const [isNavigating, startNavigation] = useTransition();
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });
  const isPending = isSubmitting || isNavigating;

  const onSubmit = handleSubmit(async (values) => {
    const result = await authService.signIn(values);
    if (!result.ok) {
      setError(
        "password",
        { message: result.error.message },
        { shouldFocus: true },
      );
      return;
    }
    startNavigation(() => router.push(ROUTES.HOME));
  });

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <FieldSet disabled={isPending} className="gap-3.5">
        <AuthField control={control} name="email" label="Work email">
          {({ field, id, isInvalid, errorId }) => (
            <AuthInput
              {...field}
              id={id}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="name@company.com"
              spellCheck={false}
              aria-invalid={isInvalid}
              aria-describedby={errorId}
            />
          )}
        </AuthField>

        <AuthField
          control={control}
          name="password"
          label="Password"
          labelAside={
            <Link
              href={ROUTES.FORGOT_PASSWORD}
              className="text-[12.5px] text-accent-text hover:underline"
            >
              Forgot password?
            </Link>
          }
        >
          {({ field, id, isInvalid, errorId }) => (
            <PasswordInput
              {...field}
              id={id}
              autoComplete="current-password"
              aria-invalid={isInvalid}
              aria-describedby={errorId}
            />
          )}
        </AuthField>

        <SubmitButton isPending={isPending}>Sign in</SubmitButton>
      </FieldSet>
    </form>
  );
}
