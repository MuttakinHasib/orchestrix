"use client";

import { X } from "lucide-react";
import {
  useId,
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
  type Ref,
} from "react";
import { z } from "zod";

import { InlineError } from "@/modules/auth/components/inline-error";
import { joinIds } from "@/modules/auth/utils/join-ids";

import { InputFrame } from "../input-frame";

const EMAIL = z.email();
const SEPARATORS = /[\s,;]+/;

function isEmail(value: string) {
  return EMAIL.safeParse(value).success;
}

interface EmailChipsInputProps {
  id: string;
  /** Forwarded to the text input, so the form can focus it. */
  ref?: Ref<HTMLInputElement>;
  value: string[];
  onChange: (emails: string[]) => void;
  onBlur: () => void;
  /** Reports whether an invalid address is waiting in the draft. */
  onDraftInvalidChange: (isDraftInvalid: boolean) => void;
  isInvalid: boolean;
  errorId?: string;
}

/**
 * Collects email addresses as removable chips. Enter, comma or paste adds;
 * Backspace on an empty draft removes the last chip. Invalid addresses stay in
 * the draft with an inline error so they can be corrected.
 */
export function EmailChipsInput({
  id,
  ref,
  value,
  onChange,
  onBlur,
  onDraftInvalidChange,
  isInvalid,
  errorId,
}: EmailChipsInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const draftErrorId = useId();
  const [draft, setDraft] = useState("");
  const [draftError, setDraftError] = useState<string | null>(null);

  const showDraftError = (message: string | null) => {
    setDraftError(message);
    onDraftInvalidChange(message !== null);
  };

  const setInputRef = (node: HTMLInputElement | null) => {
    inputRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  };

  const commit = (raw: string) => {
    const candidates = raw.split(SEPARATORS).filter(Boolean);
    const known = new Set(value.map((email) => email.toLowerCase()));
    const additions: string[] = [];
    const invalid: string[] = [];

    for (const candidate of candidates) {
      const key = candidate.toLowerCase();
      if (!isEmail(candidate)) invalid.push(candidate);
      else if (!known.has(key)) {
        known.add(key);
        additions.push(candidate);
      }
    }

    if (additions.length > 0) onChange([...value, ...additions]);
    setDraft(invalid.join(", "));
    showDraftError(
      invalid.length > 0 ? `${invalid[0]} isn’t a valid email.` : null,
    );
  };

  const remove = (email: string) => {
    onChange(value.filter((item) => item !== email));
    inputRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      commit(draft);
    } else if (event.key === "Backspace" && draft === "" && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    commit(`${draft} ${event.clipboardData.getData("text")}`);
  };

  const describedBy = joinIds(draftError ? draftErrorId : null, errorId);

  return (
    <div className="flex flex-col gap-1.5">
      <InputFrame
        isInvalid={isInvalid || draftError !== null}
        className="cursor-text flex-wrap gap-1.5 px-2.5 py-1.5"
        onClick={() => inputRef.current?.focus()}
      >
        {value.length > 0 ? (
          <ul aria-label="Invited teammates" className="contents">
            {value.map((email) => (
              <li
                key={email}
                className="inline-flex h-6 items-center gap-1.5 rounded-[5px] bg-card pr-1 pl-2 text-[12.5px]"
              >
                {email}
                <button
                  type="button"
                  aria-label={`Remove ${email}`}
                  onClick={() => remove(email)}
                  className="grid size-4 cursor-pointer place-items-center pointer-coarse:-m-1.5 pointer-coarse:size-7 rounded-xs text-muted-foreground/70 outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X aria-hidden className="size-2.75" />
                </button>
              </li>
            ))}
          </ul>
        ) : null}
        <input
          ref={setInputRef}
          id={id}
          type="text"
          inputMode="email"
          autoComplete="off"
          spellCheck={false}
          value={draft}
          placeholder={value.length === 0 ? "name@company.com…" : undefined}
          onChange={(event) => {
            setDraft(event.target.value);
            if (draftError) showDraftError(null);
          }}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onBlur={() => {
            commit(draft);
            onBlur();
          }}
          aria-invalid={isInvalid || draftError !== null}
          aria-describedby={describedBy}
          className="h-6 min-w-32 flex-1 bg-transparent text-[13.5px] outline-none placeholder:text-muted-foreground/75 pointer-coarse:text-lg"
        />
      </InputFrame>
      {draftError ? (
        <InlineError id={draftErrorId}>{draftError}</InlineError>
      ) : null}
    </div>
  );
}
