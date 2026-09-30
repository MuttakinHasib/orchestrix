"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState, type ComponentProps } from "react";
import { cn } from "cn";

import { AuthInput } from "@/modules/auth/components/auth-input";

type PasswordInputProps = Omit<ComponentProps<typeof AuthInput>, "type">;

const MASKED_PLACEHOLDER = "••••••••";

export function PasswordInput({
  className,
  placeholder = MASKED_PLACEHOLDER,
  ...props
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const Icon = isVisible ? EyeOff : Eye;

  return (
    <div className="relative">
      <AuthInput
        type={isVisible ? "text" : "password"}
        placeholder={placeholder}
        className={cn("pr-10", className)}
        {...props}
      />
      <button
        type="button"
        aria-label="Show password"
        aria-pressed={isVisible}
        onClick={() => setIsVisible((visible) => !visible)}
        className="absolute inset-y-0 right-0 grid w-10 cursor-pointer place-items-center rounded-r-[8px] text-muted-foreground/70 transition-colors outline-none hover:text-foreground focus-visible:text-foreground focus-visible:ring-[3px] focus-visible:ring-accent-soft"
      >
        <Icon aria-hidden className="size-3.75" />
      </button>
    </div>
  );
}
