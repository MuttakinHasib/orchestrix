"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FieldSet } from "@repo/ui/components/base/field";

import { AuthField } from "@/modules/auth/components/auth-field";
import { AuthInput } from "@/modules/auth/components/auth-input";
import { FormError } from "@/modules/auth/components/form-error";
import { SubmitButton } from "@/modules/auth/components/submit-button";
import { authService } from "@/modules/auth/services/auth-service";

import {
  requestResetSchema,
  type RequestResetValues,
} from "../../schemas/request-reset-schema";

interface RequestResetFormProps {
  onSent: (email: string) => void;
}

export function RequestResetForm({ onSent }: RequestResetFormProps) {
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<RequestResetValues>({
    resolver: zodResolver(requestResetSchema),
    defaultValues: { email: "" },
    mode: "onTouched",
  });

  const onSubmit = handleSubmit(async ({ email }) => {
    const result = await authService.requestPasswordReset(email);
    if (!result.ok) {
      setError("root", { message: result.error.message });
      return;
    }
    onSent(email);
  });

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <FieldSet disabled={isSubmitting} className="gap-3.5">
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
        <FormError message={errors.root?.message} />
        <SubmitButton isPending={isSubmitting}>Send reset link</SubmitButton>
      </FieldSet>
    </form>
  );
}
