import {
  Activity,
  Bell,
  Blocks,
  ChartNoAxesColumn,
  Check,
  ChevronsUpDown,
  CircleCheck,
  Ellipsis,
  Folder,
  LayoutDashboard,
  LoaderCircle,
  Lock,
  Play,
  Plus,
  Search,
  Settings,
  Split,
  Webhook,
  Workflow,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/base/alert";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/base/avatar";
import { Badge } from "@/components/base/badge";
import { Button } from "@/components/base/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/base/empty";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/base/field";
import { Input } from "@/components/base/input";
import { Kbd } from "@/components/base/kbd";
import { Separator } from "@/components/base/separator";
import { Skeleton } from "@/components/base/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/base/table";
import { ActorMark } from "@/components/blocks/actor-mark";
import { IssueStatus } from "@/components/blocks/issue-status";
import { LabelChip } from "@/components/blocks/label-chip";
import { Priority } from "@/components/blocks/priority";
import { StatusBadge } from "@/components/blocks/status-badge";

import {
  CommandMenuDemo,
  CreateMenuDemo,
  DrawerDemo,
  ModalDemo,
  SavingDemo,
  SelectDemo,
  TabsDemo,
  ThemeToggle,
  ToastsDemo,
  TooltipDemo,
} from "@/modules/design-system/components/kit-demos";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-2xs uppercase tracking-[0.08em] text-muted-foreground">
      {children}
    </div>
  );
}

function Panel({
  label,
  aside,
  children,
  className,
}: {
  label: string;
  aside?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`overflow-hidden rounded-lg border border-border bg-card shadow-surface ${className ?? ""}`}
    >
      <header className="flex items-center justify-between border-b border-border bg-card px-5 py-3.5">
        <span className="text-base font-semibold tracking-tight">{label}</span>
        {aside ? <SectionLabel>{aside}</SectionLabel> : null}
      </header>
      <div className="flex flex-col gap-3.5 p-5">{children}</div>
    </section>
  );
}

const TYPE_ROWS = [
  {
    spec: "Display · Geist 500 · 27/1.05",
    sample: (
      <span className="text-2xl font-medium tracking-tight">
        Good morning, Hasib
      </span>
    ),
  },
  {
    spec: "Title · Geist 600 · 19/1.15",
    sample: (
      <span className="text-xl font-semibold tracking-tight">
        Payment fails with Visa
      </span>
    ),
  },
  {
    spec: "Heading · Geist 600 · 14",
    sample: (
      <span className="text-base font-semibold tracking-tight">
        Needs attention
      </span>
    ),
  },
  {
    spec: "Body · Geist 400 · 13/1.5",
    sample: (
      <span className="max-w-[420px] text-pretty">
        Rahim commented: “Investigating the Stripe webhook. Looks like the retry
        window closed before the second attempt.”
      </span>
    ),
  },
  {
    spec: "Small · Geist 400 · 12",
    sample: (
      <span className="text-xs text-muted-foreground">
        Last run 2 minutes ago · 99.7% success
      </span>
    ),
  },
  {
    spec: "Data · Geist Mono 400 · 12",
    sample: (
      <span className="font-mono text-xs">
        ECOM-123 · #18273 · 4.3s · 10:17:22
      </span>
    ),
  },
  {
    spec: "Label · Geist Mono 10.5 caps",
    sample: <SectionLabel>Recent activity</SectionLabel>,
  },
];

const SWATCHES: {
  name: string;
  light: string;
  dark: string;
  label?: string;
}[] = [
  { name: "bg", light: "#f7f7f9", dark: "#0f1013" },
  { name: "panel", light: "#ffffff", dark: "#16171b" },
  { name: "sunken", light: "#eff0f3", dark: "#0b0c0e" },
  { name: "text", light: "#15161a", dark: "#ecedf0" },
  { name: "text-2", light: "#5b5e68", dark: "#9b9ea8" },
  { name: "text-3", light: "#8b8e98", dark: "#6b6e78" },
  { name: "accent", light: "#5a5fe0", dark: "#6368ee" },
  { name: "accent-tx", light: "#4449c4", dark: "#a9adff" },
  { name: "success", light: "#25895a", dark: "#4fbf8a" },
  { name: "error", light: "#cf4436", dark: "#ef6b5e" },
  { name: "warning", light: "#a86f0a", dark: "#e6b04a" },
  { name: "info", light: "#2f78c0", dark: "#5ea8e8" },
];

const SPACES = [4, 8, 12, 16, 20, 32];

const NAV_ICONS: { icon: LucideIcon; label: string; accent?: boolean }[] = [
  { icon: LayoutDashboard, label: "Overview" },
  { icon: Folder, label: "Project" },
  { icon: Workflow, label: "Workflow", accent: true },
  { icon: Activity, label: "Execution" },
  { icon: Blocks, label: "Integration" },
  { icon: ChartNoAxesColumn, label: "Analytics" },
];

const NODE_ICONS: { icon: LucideIcon; label: string }[] = [
  { icon: Zap, label: "Trigger" },
  { icon: Split, label: "Condition" },
  { icon: Play, label: "Action" },
  { icon: Webhook, label: "Webhook" },
  { icon: Bell, label: "Notify" },
  { icon: Settings, label: "Settings" },
];

const ALL_ICONS: { icon: LucideIcon; label: string; accent?: boolean }[] = [
  ...NAV_ICONS,
  ...NODE_ICONS,
];

export function DesignSystemPage() {
  return (
    <main className="mx-auto flex max-w-300 flex-col gap-6 px-6 py-12">
      {/* Cover */}
      <div className="flex items-end justify-between gap-10">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="size-4 rotate-45 rounded-xs border-2 border-primary"
            />
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
              Orchestrix · Design System · v2
            </span>
          </div>
          <h1 className="text-[44px] leading-[1] font-medium tracking-tight">
            Design System
          </h1>
          <p className="max-w-[640px] text-pretty text-[15px] text-muted-foreground">
            Dark-first and dense. One sans family carries the interface, a
            matching mono carries identifiers and timings, graphite neutrals
            hold the structure, and a single indigo accent marks intent: primary
            actions, focus, selection and automation.
          </p>
        </div>
        <ThemeToggle />
      </div>

      <Separator />

      {/* Foundations */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
        <Panel label="Typography" aside="2 families">
          {TYPE_ROWS.map((row) => (
            <div
              key={row.spec}
              className="grid gap-3 md:grid-cols-[170px_1fr] md:items-baseline"
            >
              <span className="font-mono text-[11px] text-muted-foreground">
                {row.spec}
              </span>
              {row.sample}
            </div>
          ))}
          <div className="border-t border-border pt-3.5 text-xs text-pretty text-muted-foreground">
            Geist for everything people write and read. Geist Mono only for what
            the system generates: keys, IDs, timings, table figures and keyboard
            hints. Weights 400 / 500 / 600, nothing heavier.
          </div>
        </Panel>

        <div className="flex flex-col gap-6">
          <Panel label="Color" aside="Dark-first">
            <div className="grid grid-cols-[70px_repeat(12,1fr)] items-center gap-1.5">
              <span />
              {SWATCHES.map((s) => (
                <span
                  key={s.name}
                  className="text-center font-mono text-[9px] text-muted-foreground"
                >
                  {s.name}
                </span>
              ))}
              <span className="text-xs text-muted-foreground">Light</span>
              {SWATCHES.map((s) => (
                <span
                  key={s.name}
                  title={`light ${s.name} ${s.light}`}
                  className="h-8 rounded-md border border-black/10"
                  style={{ background: s.light }}
                />
              ))}
              <span className="text-xs text-muted-foreground">Dark</span>
              {SWATCHES.map((s) => (
                <span
                  key={s.name}
                  title={`dark ${s.name} ${s.dark}`}
                  className="h-8 rounded-md"
                  style={{ background: s.dark }}
                />
              ))}
            </div>
            <div className="mt-1 grid gap-5 border-t border-border pt-4 text-xs text-pretty text-muted-foreground md:grid-cols-3">
              <span>
                <span className="text-foreground">Indigo is for intent.</span>{" "}
                The primary button is the only solid accent fill on a screen.
              </span>
              <span>
                <span className="text-foreground">
                  Status colors mean status.
                </span>{" "}
                Success, error, warning and info appear only on execution
                states, validation and alerts.
              </span>
              <span>
                <span className="text-foreground">Everything else is ink.</span>{" "}
                Three text weights and two hairlines carry the hierarchy.
              </span>
            </div>
          </Panel>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <Panel label="Space · Radius · Elevation">
              <div className="flex flex-col gap-2">
                {SPACES.map((s) => (
                  <div key={s} className="flex items-center gap-3">
                    <span className="w-10 font-mono text-[11px] text-muted-foreground">
                      {s}
                    </span>
                    <span
                      className="h-2.5 border border-primary"
                      style={{ width: s }}
                    />
                  </div>
                ))}
                <span className="mt-1 text-xs text-muted-foreground">
                  Rows 32–38px. Controls 24 / 30 / 32px.
                </span>
              </div>
              <div className="flex items-end gap-4 border-t border-border pt-4">
                {[
                  { r: "rounded-[2px]", label: "2 tag" },
                  { r: "rounded-md", label: "6 control" },
                  { r: "rounded-lg", label: "10 surface" },
                  { r: "rounded-lg shadow-overlay", label: "overlay" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <span
                      className={`size-11 border border-input bg-secondary ${item.r}`}
                    />
                    <span className="font-mono text-2xs text-muted-foreground">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel label="Icons" aside="Lucide 1.5px">
              <div className="grid grid-cols-6 gap-0">
                {ALL_ICONS.map(({ icon: Icon, label, accent }) => (
                  <span
                    key={label}
                    className="flex flex-col items-center gap-1.5 py-2.5"
                  >
                    <Icon
                      aria-hidden
                      className={`size-[18px] ${accent ? "text-primary" : ""}`}
                    />
                    <span className="text-2xs text-muted-foreground">
                      {label}
                    </span>
                  </span>
                ))}
              </div>
              <div className="border-t border-border pt-3 text-xs text-pretty text-muted-foreground">
                14px in rows, 16px in nav, 18px in empty states. The workflow
                glyph is the only icon drawn in the accent by default.
              </div>
            </Panel>
          </div>
        </div>
      </div>

      {/* Components */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
        <Panel label="Buttons">
          <div className="flex flex-wrap items-center gap-2">
            <Button>
              <Plus aria-hidden />
              Create
            </Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Delete</Button>
            <Button variant="secondary" size="icon">
              <Ellipsis aria-hidden />
            </Button>
            <Button variant="secondary" disabled>
              Disabled
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button>
              New issue
              <Kbd className="border-accent-line">C</Kbd>
            </Button>
            <Button variant="secondary" size="sm">
              <LoaderCircle aria-hidden className="size-3 animate-spin" />
              Retry
            </Button>
            <SavingDemo />
          </div>
        </Panel>

        <Panel label="Inputs">
          <FieldGroup>
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="ds-name">Name</FieldLabel>
                <Input id="ds-name" defaultValue="Critical Bug Handler" />
              </Field>
              <Field>
                <FieldLabel htmlFor="ds-channel">Focused</FieldLabel>
                <Input
                  id="ds-channel"
                  autoFocus
                  defaultValue="#critical-bugs"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="ds-project">Project</FieldLabel>
                <SelectDemo />
              </Field>
              <Field data-invalid>
                <FieldLabel htmlFor="ds-webhook">Webhook URL</FieldLabel>
                <Input
                  id="ds-webhook"
                  aria-invalid
                  defaultValue="htps://hooks.acme"
                  className="font-mono text-xs"
                />
                <FieldError>Enter a valid https:// URL.</FieldError>
              </Field>
            </div>
            <Field>
              <div className="flex h-8 items-center gap-2 rounded-md border border-input bg-secondary px-2.5 text-sm text-muted-foreground">
                <Search aria-hidden className="size-3.5" />
                <span className="flex-1">Search issues</span>
                <Kbd>⌘K</Kbd>
              </div>
            </Field>
          </FieldGroup>
        </Panel>

        <Panel label="Dropdown · Tooltip">
          <div className="flex flex-wrap items-start gap-6">
            <CreateMenuDemo />
            <TooltipDemo />
          </div>
          <div className="flex items-center gap-2.5 rounded-md border border-input bg-secondary px-2.5 py-2 text-sm">
            <ChevronsUpDown
              aria-hidden
              className="size-3.5 text-muted-foreground"
            />
            Select trigger · combobox · popover share the overlay token
          </div>
        </Panel>

        <Panel label="Tabs · Segmented">
          <TabsDemo />
          <div className="flex items-center gap-3">
            <Badge variant="label">
              <span className="text-muted-foreground/70">Priority is</span>
              Critical
            </Badge>
            <LabelChip dotClassName="bg-primary">payment</LabelChip>
            <LabelChip dotClassName="bg-destructive">urgent</LabelChip>
            <LabelChip dotClassName="bg-info">backend</LabelChip>
          </div>
        </Panel>

        <Panel label="Execution status">
          <div className="flex flex-wrap gap-2">
            <StatusBadge status="success" />
            <StatusBadge status="running" />
            <StatusBadge status="failed" />
            <StatusBadge status="cancelled" />
            <StatusBadge status="waiting" />
          </div>
        </Panel>

        <Panel label="Issue status · Priority">
          <div className="flex flex-wrap items-center gap-3.5">
            <IssueStatus status="backlog" />
            <IssueStatus status="in-progress" />
            <IssueStatus status="review" />
            <IssueStatus status="done" />
          </div>
          <Separator />
          <div className="flex flex-wrap items-center gap-3.5">
            <Priority value="critical" />
            <Priority value="high" />
            <Priority value="medium" />
            <Priority value="low" />
          </div>
        </Panel>

        <Panel label="Avatars · Team">
          <div className="flex flex-wrap items-center gap-4">
            <Avatar className="size-5">
              <AvatarFallback className="text-[9px]">HA</AvatarFallback>
            </Avatar>
            <Avatar className="size-6">
              <AvatarFallback className="text-[10px]">RK</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>NS</AvatarFallback>
            </Avatar>
            <AvatarGroup>
              <Avatar className="size-6">
                <AvatarFallback className="text-[10px]">HA</AvatarFallback>
              </Avatar>
              <Avatar className="size-6">
                <AvatarFallback className="text-[10px]">RK</AvatarFallback>
              </Avatar>
              <Avatar className="size-6">
                <AvatarFallback className="text-[10px]">NS</AvatarFallback>
              </Avatar>
              <AvatarGroupCount className="size-6 text-[10px]">
                +5
              </AvatarGroupCount>
            </AvatarGroup>
            <ActorMark />
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <span
                aria-hidden
                className="size-2 rounded-[2px] border-[1.5px] border-info"
              />
              Backend
            </span>
          </div>
          <div className="text-xs text-muted-foreground/80">
            Automation actors use a square accent-outlined mark so system
            actions never read as people.
          </div>
        </Panel>

        <Panel label="Table" aside="Executions">
          <div className="overflow-hidden rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Workflow</TableHead>
                  <TableHead>Trigger</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Started</TableHead>
                  <TableHead className="text-right">Duration</TableHead>
                  <TableHead>Error</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Critical Bug Handler</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    ECOM-124 created
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      status="success"
                      label="Success"
                      className="h-5 px-[7px] text-[11.5px]"
                    />
                  </TableCell>
                  <TableCell className="tabular-nums text-muted-foreground">
                    10:21:04
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs">
                    1.2s
                  </TableCell>
                  <TableCell className="text-muted-foreground/70">—</TableCell>
                </TableRow>
                <TableRow data-state="selected">
                  <TableCell>Critical Bug Handler</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    ECOM-123 created
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      status="failed"
                      label="Failed"
                      className="h-5 px-[7px] text-[11.5px]"
                    />
                  </TableCell>
                  <TableCell className="tabular-nums text-muted-foreground">
                    10:17:22
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs">
                    4.3s
                  </TableCell>
                  <TableCell className="text-xs text-destructive">
                    Slack API request timed out
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Auto Close Stale Issues</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    Daily 09:00
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      status="running"
                      label="Running"
                      className="h-5 px-[7px] text-[11.5px]"
                    />
                  </TableCell>
                  <TableCell className="tabular-nums text-muted-foreground">
                    09:00:00
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs text-muted-foreground">
                    —
                  </TableCell>
                  <TableCell className="text-muted-foreground/70">—</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Panel>

        <Panel label="Command menu" aside="⌘K">
          <CommandMenuDemo />
        </Panel>

        <Panel label="Toasts">
          <ToastsDemo />
        </Panel>

        <Panel label="Modal">
          <ModalDemo />
        </Panel>

        <Panel label="Drawer">
          <div className="flex items-center gap-3">
            <DrawerDemo />
            <span className="text-xs text-muted-foreground">
              Issue peek from the board
            </span>
          </div>
        </Panel>

        <Panel label="Empty · Feedback">
          <Empty className="rounded-lg">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Workflow aria-hidden />
              </EmptyMedia>
              <EmptyTitle>No workflows yet</EmptyTitle>
              <EmptyDescription>
                Automate repetitive work by creating your first workflow.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button>
                <Plus aria-hidden />
                Create Workflow
              </Button>
            </EmptyContent>
          </Empty>
          <div className="flex flex-col overflow-hidden rounded-md border border-border">
            {[220, 160, 250].map((w, i) => (
              <div
                key={w}
                className={`flex h-[38px] items-center gap-3 px-3.5 ${i < 2 ? "border-b border-border" : ""}`}
              >
                <Skeleton className="h-[9px] w-[60px]" />
                <Skeleton className="h-[9px]" style={{ width: w }} />
                <Skeleton className="ml-auto size-[18px] rounded-full" />
              </div>
            ))}
          </div>
          <Alert>
            <Lock aria-hidden />
            <AlertTitle>Restricted</AlertTitle>
            <AlertDescription>
              Only workspace admins can manage API keys.{" "}
              <a
                href="#request"
                className="text-accent-text underline underline-offset-[3px]"
              >
                Request access
              </a>
            </AlertDescription>
          </Alert>
        </Panel>
      </div>

      <footer className="flex items-center justify-between pb-6 pt-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <CircleCheck aria-hidden className="size-3.5 text-success" />
          Tokens · primitives · blocks — implemented
        </span>
        <span className="font-mono">
          <Check aria-hidden className="mr-1 inline size-3 text-success" />
          01 of 04
        </span>
      </footer>
    </main>
  );
}
