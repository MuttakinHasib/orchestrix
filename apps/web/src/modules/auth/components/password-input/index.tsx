"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "cn";

import { Button } from "@/components/base/button";
import { Input } from "@/components/base/input";

/** Password field with a show/hide toggle. Accepts every `<input>` prop. */
function PasswordInput({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Input>, "type">) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        type={isVisible ? "text" : "password"}
        className={cn("h-10 pr-10", className)}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={isVisible ? "Hide password" : "Show password"}
        aria-pressed={isVisible}
        className="absolute top-1/2 right-2 -translate-y-1/2 px-0"
        onClick={() => setIsVisible((value) => !value)}
      >
        {isVisible ? <EyeOff aria-hidden /> : <Eye aria-hidden />}
      </Button>
    </div>
  );
}

export { PasswordInput };
