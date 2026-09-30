import { IssueStatus } from "@/components/blocks/issue-status";
import type { BOARD_COLUMNS } from "@/modules/home/constants/board-columns";

import { BoardCard } from "./components/board-card";

function BoardColumn({ column }: { column: (typeof BOARD_COLUMNS)[number] }) {
  return (
    <div className="flex min-w-0 flex-col gap-2 rounded-lg bg-secondary p-2">
      <div className="flex h-7 items-center gap-2 px-1">
        <IssueStatus status={column.status} className="font-medium" />
        <span className="font-mono text-xs text-muted-foreground/70">
          {column.count}
        </span>
      </div>
      {column.cards.map((card) => (
        <BoardCard key={card.id} card={card} />
      ))}
    </div>
  );
}

export { BoardColumn };
