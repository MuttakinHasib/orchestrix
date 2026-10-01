import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { OrbitMark } from "@/modules/core/components/orbit-mark";
import { ROUTES } from "@/modules/core/constants/routes";
import { Reveal } from "@/modules/home/components/reveal";
import { SectionEyebrow } from "@/modules/home/components/section-eyebrow";

import { HubConnectors } from "./components/hub-connectors";
import { INTEGRATION_MARKS } from "./constants/integration-marks";

export function Integrations() {
  return (
    <section
      id="integrations"
      aria-labelledby="integrations-heading"
      className="scroll-mt-24 border-t border-border bg-secondary px-4 py-20 sm:px-6 sm:py-28 lg:px-12 xl:px-24"
    >
      <div className="mx-auto flex max-w-312 flex-col gap-12">
        <div className="flex max-w-155 flex-col gap-3.5">
          <SectionEyebrow number="04" label="Integrations" />
          <h2
            id="integrations-heading"
            className="text-[2.25rem] leading-[1.05] font-medium tracking-[-0.035em] text-balance sm:text-headline-lg"
          >
            Your tools.
            <br />
            One workflow.
          </h2>
          <p className="text-lg leading-normal text-pretty text-muted-foreground">
            Orchestrix doesn’t replace your tools. It connects them: open GitHub
            issues, post to Slack and Discord, email anyone, or call any URL
            from a workflow step.
          </p>
          <Link
            href={ROUTES.COMING_SOON}
            className="mt-1.5 inline-flex w-fit items-center gap-1.5 text-sm text-accent-text hover:underline"
          >
            Browse integrations
            <ArrowRight aria-hidden className="size-3.5" />
          </Link>
        </div>

        <Reveal className="relative mx-auto flex w-full flex-col items-center gap-6 lg:h-125 lg:w-275 lg:gap-0">
          <HubConnectors />
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 hidden size-90 -translate-1/2 bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--primary)_30%,transparent),transparent)] motion-safe:animate-pulse-glow lg:block"
          />

          <div className="relative flex flex-col items-center gap-2.5 rounded-[18px] border border-primary bg-card px-7.5 py-5.5 shadow-[0_0_0_6px_var(--accent-soft),0_20px_60px_rgb(0_0_0/0.5)] lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-1/2">
            <OrbitMark className="size-10 text-foreground" />
            <span translate="no" className="text-base font-semibold">
              Orchestrix
            </span>
            <span className="text-xs text-muted-foreground/70 tabular-nums">
              1,904 runs today
            </span>
          </div>

          <ul className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:contents">
            {INTEGRATION_MARKS.map(({ name, icon: Icon, x, y }) => (
              <li
                key={name}
                className="lg:absolute lg:-translate-1/2"
                style={{ left: x, top: y }}
              >
                <Link
                  href={ROUTES.COMING_SOON}
                  className="flex h-13 items-center gap-2.5 rounded-[12px] border border-input bg-card px-4.5 font-medium whitespace-nowrap text-foreground shadow-[0_12px_30px_rgb(0_0_0/0.4)] transition-[border-color,box-shadow,background-color] duration-200 hover:border-primary hover:text-foreground hover:shadow-[0_0_0_4px_var(--accent-soft),0_16px_40px_rgb(0_0_0/0.5)]"
                >
                  <Icon aria-hidden className="size-4.5 shrink-0" />
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
