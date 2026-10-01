import { ChevronRight } from "lucide-react";

interface FlowArrowProps {
  /** Offsets the travelling dot so the arrows don't pulse in unison. */
  index: number;
}

/** The connector between two loop steps, with an event travelling along it. */
export function FlowArrow({ index }: FlowArrowProps) {
  return (
    <div
      aria-hidden
      className="absolute top-1/2 -right-10 hidden w-10 -translate-y-1/2 items-center text-primary lg:flex"
    >
      <span className="h-px flex-1 bg-linear-to-r from-input to-primary" />
      <span
        className="absolute top-1/2 left-0 -mt-0.75 size-1.5 rounded-full bg-accent-text opacity-0 shadow-[0_0_10px_var(--accent-text)] motion-safe:animate-flow"
        style={{ animationDelay: `${index * 400}ms` }}
      />
      <ChevronRight className="-ml-1 size-3.5" />
    </div>
  );
}
