import type { ReactNode } from "react";

import { Reveal } from "@/modules/home/components/reveal";
import { SectionEyebrow } from "@/modules/home/components/section-eyebrow";

interface FeatureRowProps {
  id: string;
  /** Position in the page's numbered sequence, e.g. "01". */
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  visual: ReactNode;
}

/** Copy on the left, a working example on the right. */
export function FeatureRow({
  id,
  number,
  eyebrow,
  title,
  description,
  visual,
}: FeatureRowProps) {
  const headingId = `${id}-heading`;

  return (
    <Reveal>
      <section
        id={id}
        aria-labelledby={headingId}
        className="grid scroll-mt-24 items-center gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[minmax(0,480px)_minmax(0,1fr)] xl:gap-16"
      >
        <div className="flex max-w-xl flex-col gap-3.5">
          <SectionEyebrow number={number} label={eyebrow} />
          <h2
            id={headingId}
            className="text-[2rem] leading-[1.05] font-medium tracking-[-0.035em] text-balance sm:text-headline"
          >
            {title}
          </h2>
          <p className="text-lg leading-normal text-pretty text-muted-foreground">
            {description}
          </p>
        </div>
        {visual}
      </section>
    </Reveal>
  );
}
