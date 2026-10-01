import { cn } from "cn";
import type { ReactNode } from "react";

interface FeatureRowProps {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  visual: ReactNode;
  isReversedLayout?: boolean;
  /** Extra copy under the description, such as a benefit list. */
  children?: ReactNode;
}

export function FeatureRow({
  id,
  eyebrow,
  title,
  description,
  visual,
  children,
  isReversedLayout,
}: FeatureRowProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(
        "grid items-center gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-18",
        {
          "lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]": isReversedLayout,
        },
      )}
    >
      <div
        className={cn("flex max-w-xl flex-col gap-3.5", {
          "lg:order-last": isReversedLayout,
        })}
      >
        <p className="font-mono text-[11.5px] tracking-widest text-accent-text uppercase">
          {eyebrow}
        </p>
        <h2
          id={headingId}
          className="text-[1.75rem] leading-[1.1] font-medium -tracking-wide text-balance sm:text-section"
        >
          {title}
        </h2>
        <p className="text-base text-pretty text-muted-foreground">
          {description}
        </p>
        {children}
      </div>
      {visual}
    </section>
  );
}
