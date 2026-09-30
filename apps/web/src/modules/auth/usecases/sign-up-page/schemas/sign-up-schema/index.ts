import { z } from "zod";

import {
  emailSchema,
  newPasswordSchema,
} from "@/modules/auth/schemas/auth-fields";

export const signUpSchema = z.object({
  fullName: z.string().trim().min(1, "Enter your name."),
  email: emailSchema,
  password: newPasswordSchema,
});

export type SignUpValues = z.infer<typeof signUpSchema>;
