"use client";

import { CircleAlert } from "lucide-react";
import { useId, type ReactNode } from "react";
import {
  Controller,
  type Control,
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { Field, FieldError, FieldLabel } from "@repo/ui/components/base/field";

export interface AuthFieldControlProps<
  TValues extends FieldValues,
  TName extends FieldPath<TValues>,
> {
  field: ControllerRenderProps<TValues, TName>;
  id: string;
  /** Id of the label, for controls that aren't labelable elements (`aria-labelledby`). */
  labelId: string;
  isInvalid: boolean;
  /** Id of the error message while one is shown, for `aria-describedby`. */
  errorId?: string;
}

interface AuthFieldProps<
  TValues extends FieldValues,
  TName extends FieldPath<TValues>,
> {
  control: Control<TValues>;
  name: TName;
  label: ReactNode;
  /** Sits opposite the label, e.g. a "Forgot password?" link. */
  labelAside?: ReactNode;
  children: (props: AuthFieldControlProps<TValues, TName>) => ReactNode;
}

/** A labelled form control bound to react-hook-form, with an accessible inline error. */
export function AuthField<
  TValues extends FieldValues,
  TName extends FieldPath<TValues>,
>({
  control,
  name,
  label,
  labelAside,
  children,
}: AuthFieldProps<TValues, TName>) {
  const id = useId();
  const labelId = `${id}-label`;
  const errorId = `${id}-error`;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <div className="flex items-center justify-between gap-2">
            <FieldLabel
              id={labelId}
              htmlFor={id}
              className="text-[12.5px] font-normal text-muted-foreground"
            >
              {label}
            </FieldLabel>
            {labelAside}
          </div>
          {children({
            field,
            id,
            labelId,
            isInvalid: fieldState.invalid,
            errorId: fieldState.invalid ? errorId : undefined,
          })}
          {fieldState.error?.message ? (
            <FieldError
              id={errorId}
              className="flex items-center gap-1.5 text-[12.5px]"
            >
              <CircleAlert aria-hidden className="size-3.25 shrink-0" />
              {fieldState.error.message}
            </FieldError>
          ) : null}
        </Field>
      )}
    />
  );
}
