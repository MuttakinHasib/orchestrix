import { ExecutionPanel } from "./components/execution-panel";
import { FeatureRow } from "./components/feature-row";
import { IssueTimeline } from "./components/issue-timeline";
import { WorkflowPreview } from "./components/workflow-preview";

function FeaturesSection() {
  return (
    <section className="flex flex-col gap-24 bg-background px-6 py-20 lg:gap-24 lg:px-24 lg:py-28">
      <FeatureRow
        eyebrow="Work"
        title="Issues that show what automation did to them"
        description="Every issue keeps one timeline. People and workflows appear side by side, so you can see who assigned it, which workflow ran and whether the Slack alert went out."
      >
        <IssueTimeline />
      </FeatureRow>
      <FeatureRow
        id="workflows"
        eyebrow="Workflows"
        title="Build automations by connecting steps"
        description="Pick a trigger, add conditions, chain actions across GitHub, Slack, email and webhooks. Test any step before you publish."
        bullets={[
          "Guided setup, no blank canvas",
          "Versioned, with one-click rollback",
        ]}
      >
        <WorkflowPreview />
      </FeatureRow>
      <FeatureRow
        eyebrow="Executions"
        title="Know why a run failed, then fix it"
        description="Each execution lists every step with its input, output and each retry. Retry from the failed step without running the whole workflow again."
      >
        <ExecutionPanel />
      </FeatureRow>
    </section>
  );
}

export { FeaturesSection };
