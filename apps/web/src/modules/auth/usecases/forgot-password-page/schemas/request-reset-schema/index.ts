import { z } from "zod";

import { emailSchema } from "@/modules/auth/schemas/auth-fields";

export const requestResetSchema = z.object({ email: emailSchema });

export type RequestResetValues = z.infer<typeof requestResetSchema>;
