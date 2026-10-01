import { ClosingCta } from "./components/closing-cta";
import { EventLoop } from "./components/event-loop";
import { ExecutionCard } from "./components/execution-card";
import { FeatureRow } from "./components/feature-row";
import { Hero } from "./components/hero";
import { Integrations } from "./components/integrations";
import { IssueTimeline } from "./components/issue-timeline";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { WorkflowShowcase } from "./components/workflow-showcase";

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
        <EventLoop />

        <div className="overflow-x-clip bg-background">
          <div className="mx-auto flex max-w-360 flex-col gap-20 px-4 py-20 sm:gap-24 sm:px-6 sm:py-28 lg:px-12 xl:px-24">
            <FeatureRow
              id="work"
              number="01"
              eyebrow="Work"
              title="Every change leaves a trail."
              description="See what automation changed on an issue, when it happened and why. People and workflows share one timeline."
              visual={<IssueTimeline />}
            />
            <WorkflowShowcase />
            <FeatureRow
              id="executions"
              number="03"
              eyebrow="Executions"
              title="When automation fails, know exactly where."
              description="Every execution records its inputs, outputs and errors, so your team can debug workflows without guessing. Retry from the failed step, not from the start."
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
