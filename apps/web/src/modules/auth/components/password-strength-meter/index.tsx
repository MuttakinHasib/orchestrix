import { cn } from "cn";

import {
  MIN_PASSWORD_LENGTH,
  type PasswordStrength,
} from "@/modules/auth/utils/get-password-strength";

const BAR_COUNT = 4;

function PasswordStrengthMeter({ score, label }: PasswordStrength) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        role="meter"
        aria-label="Password strength"
        aria-valuemin={0}
        aria-valuemax={BAR_COUNT}
        aria-valuenow={score}
        aria-valuetext={label || "Not entered"}
        className="flex gap-1"
      >
        {Array.from({ length: BAR_COUNT }, (_, index) => (
          <span
            key={index}
            className={cn("h-[3px] flex-1 rounded-full bg-input", {
              "bg-destructive": index < score && label === "Weak",
              "bg-warning": index < score && label === "Fair",
              "bg-success": index < score && label === "Strong",
            })}
          />
        ))}
      </div>
      <span aria-live="polite" className="text-xs text-muted-foreground/70">
        {label ? `${label} · ` : ""}at least {MIN_PASSWORD_LENGTH} characters
      </span>
    </div>
  );
}

export { PasswordStrengthMeter };
