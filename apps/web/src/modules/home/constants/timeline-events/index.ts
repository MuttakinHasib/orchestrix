export type TimelineEvent = {
  /** Initials for a person; omit for an automation actor. */
  initials?: string;
  actor: string;
  text: string;
  highlight?: string;
  time: string;
};

export const TIMELINE_EVENTS: TimelineEvent[] = [
  { initials: "HA", actor: "Hasib", text: "created this issue", time: "10:17" },
  {
    actor: "Critical Bug Handler",
    text: "ran",
    highlight: "#18273",
    time: "10:17",
  },
  {
    actor: "Automation",
    text: "assigned the issue to",
    highlight: "Backend team",
    time: "10:17",
  },
  {
    actor: "Automation",
    text: "sent the Slack notification",
    highlight: "#critical-bugs",
    time: "10:18",
  },
  { initials: "RK", actor: "Rahim", text: "commented", time: "10:24" },
];
