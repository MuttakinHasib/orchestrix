"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FieldSet } from "@repo/ui/components/base/field";

import { AuthField } from "@/modules/auth/components/auth-field";
import { FormError } from "@/modules/auth/components/form-error";
import { PasswordInput } from "@/modules/auth/components/password-input";
import { PasswordStrengthMeter } from "@/modules/auth/components/password-strength-meter";
import { SubmitButton } from "@/modules/auth/components/submit-button";
import { authService } from "@/modules/auth/services/auth-service";
import { AuthErrorCode } from "@/modules/auth/types/auth-service";
import { ROUTES } from "@/modules/core/constants/routes";

import {
  resetPasswordSchema,
  type ResetPasswordValues,
} from "../../schemas/reset-password-schema";

interface ResetPasswordFormProps {
  token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter();
  const [isNavigating, startNavigation] = useTransition();
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
    mode: "onTouched",
  });
  const isPending = isSubmitting || isNavigating;
  const isTokenRejected =
    errors.root?.type === AuthErrorCode.INVALID_RESET_TOKEN;

  const onSubmit = handleSubmit(async ({ password }) => {
    const result = await authService.resetPassword({ token, password });
    if (!result.ok) {
      setError("root", {
        type: result.error.code,
        message: result.error.message,
      });
      return;
    }
    toast.success("Password updated. Sign in with your new password.");
    startNavigation(() => router.push(ROUTES.SIGN_IN));
  });

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <FieldSet disabled={isPending} className="gap-3.5">
        <AuthField control={control} name="password" label="New password">
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

        <AuthField
          control={control}
          name="confirmPassword"
          label="Confirm new password"
        >
          {({ field, id, isInvalid, errorId }) => (
            <PasswordInput
              {...field}
              id={id}
              autoComplete="new-password"
              aria-invalid={isInvalid}
              aria-describedby={errorId}
            />
          )}
        </AuthField>

        <FormError message={errors.root?.message} />
        {isTokenRejected ? (
          <Link
            href={ROUTES.FORGOT_PASSWORD}
            className="-mt-1.5 text-[12.5px] text-accent-text hover:underline"
          >
            Request a new reset link
          </Link>
        ) : null}

        <SubmitButton isPending={isPending}>Update password</SubmitButton>
      </FieldSet>
    </form>
  );
}
