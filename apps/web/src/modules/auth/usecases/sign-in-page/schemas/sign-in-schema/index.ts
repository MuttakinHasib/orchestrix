import { z } from "zod";

import {
  currentPasswordSchema,
  emailSchema,
} from "@/modules/auth/schemas/auth-fields";

export const signInSchema = z.object({
  email: emailSchema,
  password: currentPasswordSchema,
});

export type SignInValues = z.infer<typeof signInSchema>;
