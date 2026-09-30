import { Zap } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/base/avatar";
import { LabelChip } from "@/components/blocks/label-chip";
import { Priority } from "@/components/blocks/priority";
import {
  LABEL_DOT_CLASS,
  type BoardCard as BoardCardData,
} from "@/modules/home/constants/board-columns";

function BoardCard({ card }: { card: BoardCardData }) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-card px-3 py-2.5 shadow-surface">
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs text-muted-foreground/70">
          {card.id}
        </span>
        <span className="flex-1" />
        <Avatar className="size-5">
          <AvatarFallback className="font-mono text-[8.5px]">
            {card.assignee}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="text-pretty font-medium leading-snug">{card.title}</div>
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="inline-flex h-5 w-[22px] items-center justify-center rounded-sm border border-input">
          <Priority value={card.priority} label="" className="gap-0" />
        </span>
        {card.labels.map((label) => (
          <LabelChip key={label} dotClassName={LABEL_DOT_CLASS[label]}>
            {label}
          </LabelChip>
        ))}
        {card.automation ? (
          <span className="inline-flex h-5 items-center gap-1 rounded-sm bg-accent-soft px-1.5 text-xs text-accent-text">
            <Zap aria-hidden className="size-2.5" />
            {card.automation}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export { BoardCard };
