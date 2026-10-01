import { Check } from "lucide-react";

import { ClosingCta } from "./components/closing-cta";
import { ExecutionCard } from "./components/execution-card";
import { FeatureRow } from "./components/feature-row";
import { Hero } from "./components/hero";
import { Integrations } from "./components/integrations";
import { IssueTimeline } from "./components/issue-timeline";
import { LoopStrip } from "./components/loop-strip";
import { ProductFrame } from "./components/product-frame";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { PRODUCT_SHOTS } from "./constants/product-shots";

const WORKFLOW_BENEFITS = [
  "Guided setup, no blank canvas",
  "Versioned, with one-click rollback",
  "Variables from the issue that triggered it",
] as const;

export function HomePage() {
  return (
    <div className="bg-secondary text-base">
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-primary px-3 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <LoopStrip />

        <div className="bg-background">
          <div className="mx-auto flex max-w-360 flex-col gap-20 px-4 py-20 sm:px-6 sm:gap-24 sm:py-28 lg:px-12 xl:px-24">
            <FeatureRow
              id="work"
              eyebrow="Work"
              title="Issues that show what automation did to them"
              description="Every issue keeps one timeline. People and workflows appear side by side, so you can see who assigned it, which workflow ran and whether the Slack alert went out."
              visual={<IssueTimeline />}
            />

            <FeatureRow
              id="workflows"
              eyebrow="Workflows"
              isReversedLayout
              title="Build automations by connecting steps"
              description="Pick a trigger, add conditions, chain actions across GitHub, Slack, email and webhooks. Test any step before you publish."
              visual={
                <ProductFrame
                  shot={PRODUCT_SHOTS.workflowBuilder}
                  sizes="(min-width: 1440px) 792px, (min-width: 1024px) 55vw, calc(100vw - 32px)"
                  className="w-full max-w-198 rounded-[14px]"
                />
              }
            >
              <ul className="mt-1.5 flex flex-col gap-2 text-[13.5px]">
                {WORKFLOW_BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2">
                    <Check aria-hidden className="size-3.5 text-primary" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </FeatureRow>

            <FeatureRow
              id="executions"
              eyebrow="Executions"
              title="Know why a run failed, then fix it"
              description="Each execution lists every step with its input, output and each retry. Retry from the failed step without running the whole workflow again."
              visual={<ExecutionCard />}
            />
          </div>
        </div>

        <Integrations />
        <ClosingCta />
      </main>
      <SiteFooter />
    </div>
  );
}
