import { CircleAlert } from "lucide-react";
import type { ReactNode } from "react";

import { FieldError } from "@repo/ui/components/base/field";

interface InlineErrorProps {
  id: string;
  children: ReactNode;
}

/** A field's validation message, announced when it appears. */
export function InlineError({ id, children }: InlineErrorProps) {
  return (
    <FieldError id={id} className="flex items-center gap-1.5 text-[12.5px]">
      <CircleAlert aria-hidden className="size-3.25 shrink-0" />
      {children}
    </FieldError>
  );
}
