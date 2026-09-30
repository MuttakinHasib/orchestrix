"use client";

import * as React from "react";
import {
  CircleDot,
  Columns3,
  Folder,
  List,
  ListFilter,
  LoaderCircle,
  Plus,
  RotateCw,
  Upload,
  Workflow,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/base/button";
import {
  Command,
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/base/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/base/dropdown-menu";
import { Kbd } from "@/components/base/kbd";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/base/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/base/sheet";
import { Spinner } from "@/components/base/spinner";
import { StatusBadge } from "@/components/blocks/status-badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/base/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/base/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/base/tooltip";

/* ---------------------------------- Menus --------------------------------- */

export function CreateMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <Plus aria-hidden />
          Create
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[230px]">
        <DropdownMenuLabel className="font-mono text-2xs uppercase tracking-[0.08em]">
          Create
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <CircleDot aria-hidden />
            <span className="flex-1">New issue</span>
            <Kbd>C</Kbd>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Folder aria-hidden />
            <span className="flex-1">New project</span>
            <Kbd>P</Kbd>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Workflow aria-hidden className="text-primary!" />
            <span className="flex-1">New workflow</span>
            <Kbd>W</Kbd>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <Upload aria-hidden />
          <span className="flex-1">Import issues</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary" size="sm">
            <RotateCw aria-hidden />
            Retry
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Retry failed step <Kbd>R</Kbd>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

/* ---------------------------------- Tabs ---------------------------------- */

export function TabsDemo() {
  return (
    <div className="flex flex-col gap-5">
      <Tabs defaultValue="board">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="board">Board</TabsTrigger>
          <TabsTrigger value="issues">
            Issues
            <span className="font-mono text-2xs text-muted-foreground">42</span>
          </TabsTrigger>
          <TabsTrigger value="workflows">
            Workflows
            <span className="font-mono text-2xs text-muted-foreground">12</span>
          </TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="board" className="text-muted-foreground">
          Board content
        </TabsContent>
      </Tabs>

      <div className="flex flex-wrap items-center gap-3">
        <ToggleGroup type="single" defaultValue="board" variant="outline">
          <ToggleGroupItem value="list">
            <List aria-hidden />
            List
          </ToggleGroupItem>
          <ToggleGroupItem value="board">
            <Columns3 aria-hidden />
            Board
          </ToggleGroupItem>
        </ToggleGroup>
        <Button
          variant="ghost"
          size="sm"
          className="border border-dashed border-input"
        >
          <ListFilter aria-hidden />
          Filter
        </Button>
      </div>
    </div>
  );
}

/* --------------------------------- Select --------------------------------- */

export function SelectDemo() {
  return (
    <Select defaultValue="ecom">
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Project</SelectLabel>
          <SelectItem value="ecom">
            <span className="font-mono text-2xs text-muted-foreground">
              ECOM
            </span>
            E-commerce Platform
          </SelectItem>
          <SelectItem value="mob">
            <span className="font-mono text-2xs text-muted-foreground">
              MOB
            </span>
            Mobile Application
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

/* -------------------------------- Overlays -------------------------------- */

export function ModalDemo() {
  return (
    <div className="grid place-items-center rounded-lg bg-scrim p-7">
      <div className="flex w-[380px] flex-col gap-3.5 rounded-lg border border-input bg-popover p-5 shadow-overlay">
        <div className="text-[17px] leading-[1.15] font-semibold tracking-tight">
          Disable this workflow?
        </div>
        <div className="text-pretty text-muted-foreground">
          Critical Bug Handler will stop running on new issues. Runs already in
          progress will finish.
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="secondary">
            Cancel
            <Kbd>Esc</Kbd>
          </Button>
          <Button variant="destructive">
            Disable
            <Kbd className="border-transparent opacity-70">↵</Kbd>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function DrawerDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Open peek
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-[340px] sm:max-w-[340px]">
          <SheetHeader>
            <SheetTitle className="font-mono text-xs font-normal text-muted-foreground">
              ECOM-123
            </SheetTitle>
            <div className="text-base font-semibold tracking-tight">
              Payment fails with Visa
            </div>
          </SheetHeader>
          <div className="grid grid-cols-[70px_1fr] gap-y-1.5 text-xs">
            <span className="text-muted-foreground">Status</span>
            <span>In Progress</span>
            <span className="text-muted-foreground">Priority</span>
            <span className="text-destructive">Critical</span>
            <span className="text-muted-foreground">Assignee</span>
            <span>Hasib</span>
          </div>
          <div className="flex items-center gap-2 rounded-md border border-border px-2 py-2 text-xs">
            <Workflow aria-hidden className="size-3.5 text-primary" />
            <span className="flex-1">Critical Bug Handler ran</span>
            <StatusBadge
              status="failed"
              className="h-5 px-[7px] text-[11.5px]"
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

/* ------------------------------ Command menu ------------------------------ */

export function CommandMenuDemo() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Command menu
        <Kbd>⌘K</Kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search issues, workflows, projects…" />
        <CommandList>
          <CommandGroup heading="Issues">
            <CommandItem>
              <CircleDot aria-hidden />
              <span className="w-17.5 font-mono text-xs text-muted-foreground">
                ECOM-123
              </span>
              <span className="flex-1">Payment webhook failing</span>
            </CommandItem>
            <CommandItem>
              <CircleDot aria-hidden />
              <span className="w-[70px] font-mono text-xs text-muted-foreground">
                ECOM-98
              </span>
              <span className="flex-1">Stripe webhook retry</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Workflows">
            <CommandItem>
              <Workflow aria-hidden className="text-primary!" />
              <span className="flex-1">Payment Failure Handler</span>
              <span className="text-xs text-muted-foreground">ECOM</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Projects">
            <CommandItem>
              <Folder aria-hidden />
              <span className="flex-1">E-commerce Platform</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
        <div className="flex gap-4 border-t border-border px-3.5 py-2 text-xs text-muted-foreground">
          <span>↑↓ Navigate</span>
          <span>↵ Open</span>
          <span>⌘↵ Open in new tab</span>
        </div>
      </CommandDialog>
    </>
  );
}

/* ---------------------------------- Toasts -------------------------------- */

export function ToastsDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="secondary"
        onClick={() =>
          toast.success("Workflow published", {
            description: "Critical Bug Handler · version 4",
          })
        }
      >
        Success toast
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast.error("Workflow failed", {
            description: "Slack notification couldn't be delivered.",
            action: (
              <Button variant="destructive" size="sm">
                <RotateCw aria-hidden />
                Retry
              </Button>
            ),
          })
        }
      >
        Error toast
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast("ECOM-123 moved to Done", {
            action: (
              <button className="text-xs text-accent-text underline underline-offset-[3px]">
                Undo
              </button>
            ),
          })
        }
      >
        Undo toast
      </Button>
    </div>
  );
}

/* --------------------------------- Loading -------------------------------- */

export function SavingDemo() {
  return (
    <Button disabled className="opacity-80">
      <Spinner aria-hidden />
      Saving…
    </Button>
  );
}

export function CancelledDemo() {
  return <StatusBadge status="cancelled" />;
}

export function LoaderDemo() {
  return <LoaderCircle aria-hidden className="size-3.5 animate-spin" />;
}

export function CloseDemo() {
  return <X aria-hidden className="size-3.5 text-muted-foreground" />;
}

/* ------------------------------ Theme toggle ------------------------------ */

export function ThemeToggle() {
  const [dark, setDark] = React.useState(true);

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <Button variant="ghost" size="sm" onClick={() => setDark((d) => !d)}>
      {dark ? "Light mode" : "Dark mode"}
    </Button>
  );
}
