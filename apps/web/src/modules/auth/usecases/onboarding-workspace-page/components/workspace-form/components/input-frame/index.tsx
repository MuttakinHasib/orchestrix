import type { ComponentProps } from "react";
import { cn } from "cn";

interface InputFrameProps extends ComponentProps<"div"> {
  isInvalid: boolean;
}

/** Input chrome for composite controls — an input plus adornments in one box. */
export function InputFrame({
  isInvalid,
  className,
  ...props
}: InputFrameProps) {
  return (
    <div
      className={cn(
        "flex min-h-10 w-full items-center overflow-hidden rounded-[8px] border border-input bg-background text-[13.5px] transition-[color,box-shadow]",
        "focus-within:border-ring focus-within:ring-[3px] focus-within:ring-accent-soft",
        "has-[:disabled]:opacity-50",
        {
          "border-destructive focus-within:border-destructive focus-within:ring-destructive-soft":
            isInvalid,
        },
        className,
      )}
      {...props}
    />
  );
}
