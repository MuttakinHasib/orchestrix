"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { FieldSet } from "@repo/ui/components/base/field";

import { AuthField } from "@/modules/auth/components/auth-field";
import { AuthInput } from "@/modules/auth/components/auth-input";
import { FormError } from "@/modules/auth/components/form-error";
import { PasswordInput } from "@/modules/auth/components/password-input";
import { PasswordStrengthMeter } from "@/modules/auth/components/password-strength-meter";
import { SubmitButton } from "@/modules/auth/components/submit-button";
import { authService } from "@/modules/auth/services/auth-service";
import { AuthErrorCode } from "@/modules/auth/types/auth-service";
import { ROUTES } from "@/modules/core/constants/routes";

import { signUpSchema, type SignUpValues } from "../../schemas/sign-up-schema";

export function SignUpForm() {
  const router = useRouter();
  const [isNavigating, startNavigation] = useTransition();
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { fullName: "", email: "", password: "" },
    mode: "onTouched",
  });
  const isPending = isSubmitting || isNavigating;

  const onSubmit = handleSubmit(async (values) => {
    const result = await authService.signUp(values);
    if (!result.ok) {
      const field =
        result.error.code === AuthErrorCode.EMAIL_TAKEN ? "email" : "root";
      setError(field, { message: result.error.message }, { shouldFocus: true });
      return;
    }
    startNavigation(() => router.push(ROUTES.ONBOARDING_WORKSPACE));
  });

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <FieldSet disabled={isPending} className="gap-3.5">
        <AuthField control={control} name="fullName" label="Full name">
          {({ field, id, isInvalid, errorId }) => (
            <AuthInput
              {...field}
              id={id}
              autoComplete="name"
              placeholder="Ada Lovelace…"
              aria-invalid={isInvalid}
              aria-describedby={errorId}
            />
          )}
        </AuthField>

        <AuthField control={control} name="email" label="Work email">
          {({ field, id, isInvalid, errorId }) => (
            <AuthInput
              {...field}
              id={id}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="name@company.com…"
              spellCheck={false}
              aria-invalid={isInvalid}
              aria-describedby={errorId}
            />
          )}
        </AuthField>

        <AuthField control={control} name="password" label="Password">
          {({ field, id, isInvalid, errorId }) => {
            const strengthId = `${id}-strength`;
            return (
              <>
                <PasswordInput
                  {...field}
                  id={id}
                  autoComplete="new-password"
                  aria-invalid={isInvalid}
                  aria-describedby={
                    errorId ? `${strengthId} ${errorId}` : strengthId
                  }
                />
                <PasswordStrengthMeter id={strengthId} password={field.value} />
              </>
            );
          }}
        </AuthField>

        <FormError message={errors.root?.message} />
        <SubmitButton isPending={isPending}>Create account</SubmitButton>
      </FieldSet>
    </form>
  );
}
