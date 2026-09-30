import { WORKFLOW_STEPS } from "@/modules/home/constants/workflow-steps";

import { WorkflowNode } from "./components/workflow-node";

/**
 * Static illustration of the workflow builder canvas — decorative.
 */
function WorkflowPreview() {
  return (
    <div
      aria-hidden
      className="flex flex-col items-center rounded-xl border border-input bg-background bg-[radial-gradient(var(--input)_1px,transparent_1px)] bg-[size:20px_20px] px-6 py-8"
    >
      {WORKFLOW_STEPS.map((step, index) => (
        <div key={step.title} className="flex w-full flex-col items-center">
          {index > 0 ? (
            <div className="flex h-9 flex-col items-center">
              <span className="w-px flex-1 bg-input" />
              {step.branch ? (
                <span className="-my-1 inline-flex h-5 items-center rounded-full border border-accent-soft bg-card px-2 font-mono text-2xs text-accent-text">
                  {step.branch}
                </span>
              ) : null}
              <span className="w-px flex-1 bg-input" />
            </div>
          ) : null}
          <WorkflowNode
            kind={step.kind}
            title={step.title}
            subtitle={step.subtitle}
            icon={step.icon}
            isTrigger={step.kind === "Trigger"}
          />
        </div>
      ))}
    </div>
  );
}

export { WorkflowPreview };
