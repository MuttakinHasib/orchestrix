import type { ComponentProps } from "react";
import { cn } from "cn";

import { Input } from "@repo/ui/components/base/input";

/** The kit input at auth-screen scale: 40px tall on the page background. */
export function AuthInput({
  className,
  ...props
}: ComponentProps<typeof Input>) {
  return (
    <Input
      className={cn(
        "h-10 rounded-[8px] bg-background px-3 text-[13.5px] pointer-coarse:text-lg",
        className,
      )}
      {...props}
    />
  );
}
