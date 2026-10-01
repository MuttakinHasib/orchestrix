import { cn } from "cn";

import { Avatar, AvatarFallback } from "@repo/ui/components/base/avatar";
import { ActorMark } from "@repo/ui/components/blocks/actor-mark";

import { ActorKind, TIMELINE_ENTRIES } from "./constants/timeline-entries";

/** One issue's activity, with people and automations side by side. */
export function IssueTimeline() {
  return (
    <figure className="rounded-[14px] border border-border bg-card p-4 sm:p-6">
      <figcaption className="sr-only">Activity on issue ECOM-123</figcaption>
      <ol className="flex flex-col gap-1">
        {TIMELINE_ENTRIES.map((entry) => (
          <li key={entry.id} className="flex gap-3">
            <div className="flex w-6 flex-none flex-col items-center">
              {entry.actorKind === ActorKind.AUTOMATION ? (
                <ActorMark label={entry.actor} />
              ) : (
                <Avatar size="sm">
                  <AvatarFallback className="text-[9px] text-foreground">
                    {entry.initials}
                  </AvatarFallback>
                </Avatar>
              )}
              <span aria-hidden className="min-h-3 w-px flex-1 bg-border" />
            </div>
            <div className="flex flex-1 items-baseline gap-3 pt-0.75 pb-3.5">
              <p className="flex-1 text-muted-foreground">
                <span className="font-medium text-foreground">
                  {entry.actor}
                </span>{" "}
                {entry.action}
                {entry.subject ? (
                  <>
                    {" "}
                    <span
                      className={cn("text-foreground", {
                        "text-accent-text": entry.isRunReference,
                      })}
                    >
                      {entry.subject}
                    </span>
                  </>
                ) : null}
              </p>
              <time className="font-mono text-xs text-muted-foreground/70">
                {entry.time}
              </time>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
