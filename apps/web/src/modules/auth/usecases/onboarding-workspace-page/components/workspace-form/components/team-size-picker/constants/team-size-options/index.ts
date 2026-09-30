import { TeamSize } from "@/modules/auth/types/auth-service";

interface TeamSizeOption {
  value: TeamSize;
  label: string;
}

export const TEAM_SIZE_OPTIONS: readonly TeamSizeOption[] = [
  { value: TeamSize.XS, label: "1–5" },
  { value: TeamSize.SM, label: "6–20" },
  { value: TeamSize.MD, label: "21–100" },
  { value: TeamSize.LG, label: "100+" },
];
