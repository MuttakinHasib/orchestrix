import { cn } from "cn";

import {
  describePasswordScore,
  PASSWORD_MIN_LENGTH,
  PASSWORD_STRENGTH_MAX,
  scorePassword,
} from "@/modules/auth/utils/password-strength";

const SEGMENTS = Array.from(
  { length: PASSWORD_STRENGTH_MAX },
  (_, index) => index + 1,
);

interface PasswordStrengthMeterProps {
  id: string;
  password: string;
}

/** Four segments that fill as the password gets stronger, plus a text summary. */
export function PasswordStrengthMeter({
  id,
  password,
}: PasswordStrengthMeterProps) {
  const score = scorePassword(password);
  const label = describePasswordScore(score);
  const requirement = `at least ${PASSWORD_MIN_LENGTH} characters`;

  return (
    <div className="flex flex-col gap-1.5">
      <div
        role="meter"
        aria-label="Password strength"
        aria-valuemin={0}
        aria-valuemax={PASSWORD_STRENGTH_MAX}
        aria-valuenow={score}
        aria-valuetext={label || "Empty"}
        className="mt-0.5 flex gap-1"
      >
        {SEGMENTS.map((segment) => (
          <span
            key={segment}
            className={cn(
              "h-0.75 flex-1 rounded-full bg-input transition-colors",
              {
                "bg-destructive": segment <= score && score === 1,
                "bg-warning": segment <= score && score === 2,
                "bg-success": segment <= score && score >= 3,
              },
            )}
          />
        ))}
      </div>
      <p id={id} className="text-xs text-muted-foreground/70">
        {label ? `${label} · ${requirement}` : `Use ${requirement}`}
      </p>
    </div>
  );
}
