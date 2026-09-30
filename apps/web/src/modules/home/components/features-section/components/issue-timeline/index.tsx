import { Avatar, AvatarFallback } from "@/components/base/avatar";
import { ActorMark } from "@/components/blocks/actor-mark";
import { TIMELINE_EVENTS } from "@/modules/home/constants/timeline-events";

function IssueTimeline() {
  return (
    <ol className="flex flex-col rounded-xl border border-border bg-card p-6">
      {TIMELINE_EVENTS.map((event, index) => (
        <li
          key={`${event.actor}-${event.time}-${index}`}
          className="flex gap-3"
        >
          <div className="flex w-6 flex-none flex-col items-center">
            {event.initials ? (
              <Avatar className="size-6">
                <AvatarFallback className="font-mono text-[9px]">
                  {event.initials}
                </AvatarFallback>
              </Avatar>
            ) : (
              <ActorMark label={event.actor} />
            )}
            <span aria-hidden className="min-h-3 w-px flex-1 bg-border" />
          </div>
          <div className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-1.5 pt-0.5 pb-3.5 text-muted-foreground">
            <span className="font-medium text-foreground">{event.actor}</span>
            {event.text}
            {event.highlight ? (
              <span className="text-foreground">{event.highlight}</span>
            ) : null}
            <span className="ml-auto font-mono text-xs text-muted-foreground/70">
              {event.time}
            </span>
          </div>
        </li>
      ))}
    </ol>
  );
}

export { IssueTimeline };
