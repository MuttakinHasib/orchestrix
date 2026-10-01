import { ArrowDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "cn";

import { OrbitMark } from "@/modules/core/components/orbit-mark";
import { ROUTES } from "@/modules/core/constants/routes";
import { Reveal } from "@/modules/home/components/reveal";
import { SectionEyebrow } from "@/modules/home/components/section-eyebrow";

import { HubConnectors } from "./components/hub-connectors";
import { IntegrationNode } from "./components/integration-node";
import {
  COLUMN_X,
  INTEGRATION_ACTIONS,
  INTEGRATION_TRIGGERS,
  nodeY,
  type IntegrationNode as IntegrationNodeData,
} from "./constants/integration-flows";

const COLUMN_LABEL =
  "font-mono text-[11px] tracking-[0.1em] text-muted-foreground/70 uppercase xl:absolute xl:-top-8 xl:-translate-x-1/2";

interface NodeColumnProps {
  label: string;
  nodes: readonly IntegrationNodeData[];
  /** Desktop column centre, in canvas px. */
  columnX: number;
}

/** One side of the diagram: a stacked list on phones, positioned nodes on desktop. */
function NodeColumn({ label, nodes, columnX }: NodeColumnProps) {
  return (
    <div className="flex w-full flex-col gap-3 xl:contents">
      <h3 className={COLUMN_LABEL} style={{ left: columnX }}>
        {label}
      </h3>
      <ul
        className={cn("grid gap-3 sm:grid-cols-2 xl:contents", {
          "md:grid-cols-3": nodes.length % 3 === 0,
        })}
      >
        {nodes.map((node, index) => (
          <li
            key={node.name}
            className="xl:absolute xl:-translate-1/2"
            style={{ left: columnX, top: nodeY(index, nodes.length) }}
          >
            <IntegrationNode node={node} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function FlowDown() {
  return (
    <ArrowDown aria-hidden className="size-4 text-accent-text xl:hidden" />
  );
}

export function Integrations() {
  return (
    <section
      id="integrations"
      aria-labelledby="integrations-heading"
      className="scroll-mt-24 border-t border-border bg-secondary px-4 py-20 sm:px-6 sm:py-28 lg:px-12 xl:px-24"
    >
      <div className="mx-auto flex max-w-312 flex-col gap-12 xl:gap-20">
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
            Orchestrix doesn’t replace your tools. It listens to them and acts
            in them: start a workflow when a pull request merges, a webhook
            arrives or a schedule fires, then post to Slack or Discord, email
            the team or call any URL.
          </p>
          <Link
            href={ROUTES.COMING_SOON}
            className="mt-0.5 inline-flex w-fit items-center gap-1.5 py-1.5 text-sm text-accent-text hover:underline"
          >
            Browse integrations
            <ArrowRight aria-hidden className="size-3.5" />
          </Link>
        </div>

        <Reveal className="relative mx-auto flex w-full max-w-md flex-col items-center gap-5 md:max-w-2xl xl:h-125 xl:w-265 xl:max-w-none xl:gap-0">
          <HubConnectors />

          <NodeColumn
            label="Triggers"
            nodes={INTEGRATION_TRIGGERS}
            columnX={COLUMN_X.trigger}
          />
          <FlowDown />

          <div className="flex w-40 flex-col items-center gap-2.5 rounded-[18px] border border-primary bg-card py-5.5 shadow-[0_0_0_6px_var(--accent-soft),0_20px_60px_rgb(0_0_0/0.5)] xl:absolute xl:top-1/2 xl:left-1/2 xl:-translate-1/2">
            <OrbitMark className="size-10 text-foreground" />
            <span translate="no" className="text-base font-semibold">
              Orchestrix
            </span>
            <span className="text-xs text-muted-foreground/70 tabular-nums">
              1,904 runs today
            </span>
          </div>

          <FlowDown />
          <NodeColumn
            label="Actions"
            nodes={INTEGRATION_ACTIONS}
            columnX={COLUMN_X.action}
          />
        </Reveal>
      </div>
    </section>
  );
}
