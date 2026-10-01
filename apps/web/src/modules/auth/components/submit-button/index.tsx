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
      size="xl"
      className="w-full"
    >
      {isPending ? <Spinner aria-hidden /> : null}
      {children}
    </Button>
  );
}
