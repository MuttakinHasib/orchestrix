import { cn } from "cn";

interface OnboardingProgressProps {
  step: number;
  totalSteps: number;
}

export function OnboardingProgress({
  step,
  totalSteps,
}: OnboardingProgressProps) {
  return (
    <div className="flex gap-1.5">
      <span className="sr-only">
        Step {step} of {totalSteps}
      </span>
      {Array.from({ length: totalSteps }, (_, index) => (
        <span
          key={index}
          aria-hidden
          className={cn("h-0.75 w-7 rounded-full bg-input", {
            "bg-primary": index < step,
          })}
        />
      ))}
    </div>
  );
}
