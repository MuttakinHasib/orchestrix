export const ActorKind = {
  PERSON: "person",
  AUTOMATION: "automation",
} as const;
export type ActorKind = (typeof ActorKind)[keyof typeof ActorKind];

export interface TimelineEntry {
  id: string;
  actorKind: ActorKind;
  actor: string;
  /** Initials shown in the avatar; people only. */
  initials?: string;
  action: string;
  subject?: string;
  /** Workflow runs link to an execution, so they read in the intent colour. */
  isRunReference?: boolean;
  time: string;
}

export const TIMELINE_ENTRIES: readonly TimelineEntry[] = [
  {
    id: "created",
    actorKind: ActorKind.PERSON,
    actor: "Hasib",
    initials: "HA",
    action: "created this issue",
    time: "10:17",
  },
  {
    id: "workflow-ran",
    actorKind: ActorKind.AUTOMATION,
    actor: "Critical Bug Handler",
    action: "ran",
    subject: "#18273",
    isRunReference: true,
    time: "10:17",
  },
  {
    id: "assigned",
    actorKind: ActorKind.AUTOMATION,
    actor: "Automation",
    action: "assigned the issue to",
    subject: "Backend team",
    time: "10:17",
  },
  {
    id: "notified",
    actorKind: ActorKind.AUTOMATION,
    actor: "Automation",
    action: "sent the Slack notification",
    subject: "#critical-bugs",
    time: "10:18",
  },
  {
    id: "commented",
    actorKind: ActorKind.PERSON,
    actor: "Rahim",
    initials: "RK",
    action: "commented",
    time: "10:24",
  },
];
