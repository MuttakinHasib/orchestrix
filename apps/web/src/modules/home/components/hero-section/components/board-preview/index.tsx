import { ChevronRight } from "lucide-react";

import { BOARD_COLUMNS } from "@/modules/home/constants/board-columns";

import { BoardColumn } from "./components/board-column";

/**
 * Static illustration of the project board — decorative, not interactive.
 */
function BoardPreview() {
  return (
    <div
      id="product"
      aria-hidden
      className="relative mt-10 w-full max-w-[1180px] overflow-hidden rounded-t-[14px] border border-b-0 border-input bg-background text-left shadow-overlay"
    >
      <div className="flex h-12 items-center gap-2 border-b border-border bg-secondary px-7 text-muted-foreground">
        <span>Projects</span>
        <ChevronRight className="size-3.5 text-muted-foreground/70" />
        <span className="font-medium text-foreground">E-commerce Platform</span>
        <span className="ml-3 rounded-sm border border-input px-2 py-0.5 font-mono text-2xs uppercase tracking-[0.08em]">
          Board
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 px-4 py-4 lg:grid-cols-4 lg:px-7 lg:py-5">
        {BOARD_COLUMNS.map((column) => (
          <BoardColumn key={column.status} column={column} />
        ))}
      </div>
    </div>
  );
}

export { BoardPreview };
