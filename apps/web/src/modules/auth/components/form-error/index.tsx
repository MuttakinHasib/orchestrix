import { CircleAlert } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

/** A form-level error that isn't tied to one field, announced when it appears. */
export function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <p
      role="alert"
      className="flex items-center gap-1.5 rounded-[8px] bg-destructive-soft px-3 py-2 text-[12.5px] text-destructive"
    >
      <CircleAlert aria-hidden className="size-3.25 shrink-0" />
      {message}
    </p>
  );
}
