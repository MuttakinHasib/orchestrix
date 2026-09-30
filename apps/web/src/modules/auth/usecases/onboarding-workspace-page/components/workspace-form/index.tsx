"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition, type FormEvent } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { cn } from "cn";

import { FieldSet } from "@repo/ui/components/base/field";
import { Spinner } from "@repo/ui/components/base/spinner";

import { AuthField } from "@/modules/auth/components/auth-field";
import { FormError } from "@/modules/auth/components/form-error";
import { SubmitButton } from "@/modules/auth/components/submit-button";
import { authService } from "@/modules/auth/services/auth-service";
import { joinIds } from "@/modules/auth/utils/join-ids";
import { AuthErrorCode } from "@/modules/auth/types/auth-service";
import { ROUTES } from "@/modules/core/constants/routes";

import {
  SLUG_MAX_LENGTH,
  slugSchema,
  workspaceSchema,
  type WorkspaceValues,
} from "../../schemas/workspace-schema";
import { EmailChipsInput } from "./components/email-chips-input";
import { InputFrame } from "./components/input-frame";
import { TeamSizePicker } from "./components/team-size-picker";
import { SlugStatus, useSlugAvailability } from "./hooks/use-slug-availability";
import { slugify } from "./utils/slugify";

const SLUG_TAKEN_MESSAGE = "That URL is taken. Try another.";

const SLUG_STATUS_ANNOUNCEMENT: Record<SlugStatus, string> = {
  [SlugStatus.IDLE]: "",
  [SlugStatus.CHECKING]: "Checking availability…",
  [SlugStatus.AVAILABLE]: "This URL is available.",
  [SlugStatus.TAKEN]: SLUG_TAKEN_MESSAGE,
};

export function WorkspaceForm() {
  const router = useRouter();
  const [isNavigating, startNavigation] = useTransition();
  // The URL follows the name until the user types their own.
  const [isSlugCustomized, setIsSlugCustomized] = useState(false);
  const [hasInvalidInvite, setHasInvalidInvite] = useState(false);
  const {
    control,
    handleSubmit,
    setError,
    setFocus,
    setValue,
    getFieldState,
    formState: { isSubmitting, errors },
  } = useForm<WorkspaceValues>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: { name: "", slug: "", invites: [] },
    mode: "onTouched",
  });
  const [name, slug] = useWatch({ control, name: ["name", "slug"] });
  const slugStatus = useSlugAvailability(
    slug,
    slugSchema.safeParse(slug).success,
  );
  const isSlugTaken = slugStatus === SlugStatus.TAKEN;
  const isPending = isSubmitting || isNavigating;
  const initial = name.trim().charAt(0).toUpperCase();

  const submit = handleSubmit(async (values) => {
    const result = await authService.createOrganization(values);
    if (!result.ok) {
      const field =
        result.error.code === AuthErrorCode.SLUG_TAKEN ? "slug" : "root";
      setError(field, { message: result.error.message }, { shouldFocus: true });
      return;
    }
    toast.success(`${result.value.name} is ready.`);
    startNavigation(() => router.push(ROUTES.HOME));
  });

  // Problems the schema can't see are caught before submitting starts, while
  // the fields are still enabled and can take focus.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (isSlugTaken || hasInvalidInvite) {
      event.preventDefault();
      setFocus(isSlugTaken ? "slug" : "invites");
      return;
    }
    void submit(event);
  };

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <FieldSet disabled={isPending} className="gap-3.5">
        <AuthField control={control} name="name" label="Workspace name">
          {({ field, id, isInvalid, errorId }) => (
            <InputFrame isInvalid={isInvalid} className="gap-2.5 pl-2.5">
              <span
                aria-hidden
                className={cn(
                  "grid size-5.5 shrink-0 place-items-center rounded-md bg-input text-xs font-semibold text-primary-foreground",
                  { "bg-primary": initial },
                )}
              >
                {initial}
              </span>
              <input
                {...field}
                id={id}
                autoComplete="organization"
                placeholder="Acme Inc…"
                onChange={(event) => {
                  field.onChange(event);
                  if (isSlugCustomized) return;
                  setValue(
                    "slug",
                    slugify(event.target.value, SLUG_MAX_LENGTH),
                    {
                      shouldValidate: getFieldState("slug").isTouched,
                    },
                  );
                }}
                aria-invalid={isInvalid}
                aria-describedby={errorId}
                className="h-10 min-w-0 flex-1 bg-transparent pr-3 text-lg outline-none placeholder:text-muted-foreground/75 sm:text-[13.5px]"
              />
            </InputFrame>
          )}
        </AuthField>

        <AuthField control={control} name="slug" label="Workspace URL">
          {({ field, id, isInvalid, errorId }) => {
            const statusId = `${id}-status`;
            const isFlagged = isInvalid || isSlugTaken;
            return (
              <>
                <InputFrame isInvalid={isFlagged}>
                  <span
                    translate="no"
                    className="flex h-10 shrink-0 items-center border-r border-border bg-card px-2.5 font-mono text-xs text-muted-foreground/70"
                  >
                    orchestrix.app/
                  </span>
                  <input
                    {...field}
                    id={id}
                    autoComplete="off"
                    autoCapitalize="none"
                    spellCheck={false}
                    maxLength={SLUG_MAX_LENGTH}
                    placeholder="acme…"
                    onChange={(event) => {
                      const next = event.target.value.toLowerCase();
                      setIsSlugCustomized(next.length > 0);
                      field.onChange(next);
                    }}
                    aria-invalid={isFlagged}
                    aria-describedby={joinIds(statusId, errorId)}
                    className="h-10 min-w-0 flex-1 bg-transparent px-2.5 font-mono text-lg outline-none placeholder:text-muted-foreground/75 sm:text-[12.5px]"
                  />
                  <span
                    className="grid w-9 shrink-0 place-items-center"
                    aria-hidden
                  >
                    {slugStatus === SlugStatus.CHECKING ? (
                      <Spinner className="size-3.5 text-muted-foreground/70" />
                    ) : null}
                    {slugStatus === SlugStatus.AVAILABLE ? (
                      <Check className="size-3.5 text-success" />
                    ) : null}
                    {isSlugTaken ? (
                      <X className="size-3.5 text-destructive" />
                    ) : null}
                  </span>
                </InputFrame>
                <p id={statusId} aria-live="polite" className="sr-only">
                  {SLUG_STATUS_ANNOUNCEMENT[slugStatus]}
                </p>
                {isSlugTaken && !isInvalid ? (
                  <p className="text-[12.5px] text-destructive">
                    {SLUG_TAKEN_MESSAGE}
                  </p>
                ) : null}
              </>
            );
          }}
        </AuthField>

        <AuthField control={control} name="teamSize" label="Team size">
          {({ field, id, labelId, isInvalid, errorId }) => (
            <TeamSizePicker
              id={id}
              labelId={labelId}
              value={field.value}
              onChange={field.onChange}
              isInvalid={isInvalid}
              errorId={errorId}
            />
          )}
        </AuthField>

        <AuthField
          control={control}
          name="invites"
          label={
            <>
              Invite teammates{" "}
              <span className="text-muted-foreground/70">· optional</span>
            </>
          }
        >
          {({ field, id, isInvalid, errorId }) => (
            <EmailChipsInput
              id={id}
              ref={field.ref}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              onDraftInvalidChange={setHasInvalidInvite}
              isInvalid={isInvalid}
              errorId={errorId}
            />
          )}
        </AuthField>

        <FormError message={errors.root?.message} />
        <SubmitButton isPending={isPending}>Continue</SubmitButton>
      </FieldSet>
    </form>
  );
}
