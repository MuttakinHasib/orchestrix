import type { IssueStatusValue } from "@/components/blocks/issue-status";
import type { PriorityValue } from "@/components/blocks/priority";

export type BoardLabel = "payment" | "urgent" | "backend" | "frontend" | "bug";

export type BoardCard = {
  id: string;
  title: string;
  priority: PriorityValue;
  assignee: string;
  labels: BoardLabel[];
  automation?: string;
};

export const LABEL_DOT_CLASS: Record<BoardLabel, string> = {
  payment: "bg-primary",
  urgent: "bg-destructive",
  backend: "bg-info",
  frontend: "bg-info",
  bug: "bg-destructive",
};

export const BOARD_COLUMNS: {
  status: IssueStatusValue;
  count: number;
  cards: BoardCard[];
}[] = [
  {
    status: "backlog",
    count: 6,
    cards: [
      {
        id: "ECOM-118",
        title: "Retry logic for failed refunds",
        priority: "low",
        assignee: "HA",
        labels: ["backend"],
      },
      {
        id: "ECOM-127",
        title: "Add Apple Pay to checkout",
        priority: "medium",
        assignee: "NS",
        labels: ["payment"],
      },
    ],
  },
  {
    status: "in-progress",
    count: 4,
    cards: [
      {
        id: "ECOM-123",
        title: "Payment fails with Visa",
        priority: "critical",
        assignee: "HA",
        labels: ["payment", "urgent"],
        automation: "Critical Bug Handler",
      },
      {
        id: "ECOM-125",
        title: "Inventory sync drops variants",
        priority: "high",
        assignee: "RK",
        labels: ["backend", "bug"],
      },
    ],
  },
  {
    status: "review",
    count: 3,
    cards: [
      {
        id: "ECOM-120",
        title: "Stripe webhook signature mismatch",
        priority: "high",
        assignee: "RK",
        labels: ["payment"],
        automation: "Webhook Monitor",
      },
      {
        id: "ECOM-116",
        title: "Cart badge count off by one",
        priority: "low",
        assignee: "FA",
        labels: ["frontend", "bug"],
      },
    ],
  },
  {
    status: "done",
    count: 12,
    cards: [
      {
        id: "ECOM-119",
        title: "Migrate coupons to new pricing API",
        priority: "medium",
        assignee: "HA",
        labels: ["backend"],
      },
      {
        id: "ECOM-114",
        title: "Document refund endpoints",
        priority: "low",
        assignee: "FA",
        labels: ["frontend"],
      },
    ],
  },
];
