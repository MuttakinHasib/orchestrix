import { RotateCw } from "lucide-react";

import { Button } from "@/components/base/button";
import { StatusBadge } from "@/components/blocks/status-badge";
import { EXECUTION_STEPS } from "@/modules/home/constants/execution-steps";

import { ExecutionStep } from "./components/execution-step";

function ExecutionPanel() {
  return (
    <div className="flex flex-col gap-2.5 rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2.5 border-b border-border pb-3">
        <span className="font-semibold">Execution #18273</span>
        <StatusBadge status="failed" />
        <span className="ml-auto font-mono text-xs text-muted-foreground/70">
          4.3s
        </span>
      </div>
      <ol className="flex flex-col gap-2.5">
        {EXECUTION_STEPS.map((step) => (
          <ExecutionStep key={step.title} step={step} />
        ))}
      </ol>
      {/* Illustration only — inert keeps it out of the tab order. */}
      <div inert className="mt-1 flex gap-2">
        <Button size="lg" className="h-[30px]">
          <RotateCw aria-hidden />
          Retry from step 4
        </Button>
      </div>
    </div>
  );
}

export { ExecutionPanel };
