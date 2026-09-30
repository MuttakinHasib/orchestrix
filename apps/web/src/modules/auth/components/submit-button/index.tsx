import type { ReactNode } from "react";

import { Button } from "@repo/ui/components/base/button";
import { Spinner } from "@repo/ui/components/base/spinner";

interface SubmitButtonProps {
  isPending: boolean;
  children: ReactNode;
}

export function SubmitButton({ isPending, children }: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={isPending}
      aria-busy={isPending}
      className="h-10 w-full rounded-[8px] text-[13.5px]"
    >
      {isPending ? <Spinner aria-hidden className="size-3.5" /> : null}
      {children}
    </Button>
  );
}
