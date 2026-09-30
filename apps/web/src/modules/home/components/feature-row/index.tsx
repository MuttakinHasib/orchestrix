import type { ReactNode } from "react";

interface FeatureRowProps {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  visual: ReactNode;
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
}: FeatureRowProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="grid items-center gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-18"
    >
      <div className="flex max-w-xl flex-col gap-3.5">
        <p className="font-mono text-[11.5px] tracking-[0.1em] text-accent-text uppercase">
          {eyebrow}
        </p>
        <h2
          id={headingId}
          className="text-[1.75rem] leading-[1.1] font-medium tracking-[-0.025em] text-balance sm:text-section"
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
