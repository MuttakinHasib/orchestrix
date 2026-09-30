import { z } from "zod";

import { TeamSize } from "@/modules/auth/types/auth-service";

export const SLUG_MIN_LENGTH = 3;
export const SLUG_MAX_LENGTH = 48;

export const slugSchema = z
  .string()
  .min(SLUG_MIN_LENGTH, `Use at least ${SLUG_MIN_LENGTH} characters.`)
  .max(SLUG_MAX_LENGTH, `Use ${SLUG_MAX_LENGTH} characters or fewer.`)
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Use lowercase letters, numbers and single hyphens.",
  );

export const workspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name your workspace.")
    .max(64, "Keep the name under 64 characters."),
  slug: slugSchema,
  teamSize: z.enum(TeamSize, "Pick your team size."),
  invites: z.array(z.email()),
});

export type WorkspaceValues = z.infer<typeof workspaceSchema>;
