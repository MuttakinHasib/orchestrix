"use client";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@repo/ui/components/base/toggle-group";

import type { TeamSize } from "@/modules/auth/types/auth-service";

import { TEAM_SIZE_OPTIONS } from "./constants/team-size-options";

interface TeamSizePickerProps {
  id: string;
  labelId: string;
  value: TeamSize | undefined;
  onChange: (value: TeamSize) => void;
  isInvalid: boolean;
  errorId?: string;
}

export function TeamSizePicker({
  id,
  labelId,
  value,
  onChange,
  isInvalid,
  errorId,
}: TeamSizePickerProps) {
  return (
    <ToggleGroup
      id={id}
      type="single"
      variant="outline"
      value={value ?? ""}
      // A single toggle group can be cleared; the choice is required, so ignore that.
      onValueChange={(next) => {
        if (next) onChange(next as TeamSize);
      }}
      aria-labelledby={labelId}
      aria-invalid={isInvalid}
      aria-describedby={errorId}
      className="grid w-full grid-cols-4 rounded-[8px] aria-invalid:border-destructive"
    >
      {TEAM_SIZE_OPTIONS.map((option) => (
        <ToggleGroupItem
          key={option.value}
          value={option.value}
          className="h-9 w-full text-[13px] tabular-nums data-[spacing=0]:first:rounded-l-[8px] data-[spacing=0]:last:rounded-r-[8px]"
        >
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
