import { z } from "zod";

import { newPasswordSchema } from "@/modules/auth/schemas/auth-fields";

export const resetPasswordSchema = z
  .object({
    password: newPasswordSchema,
    confirmPassword: z.string().min(1, "Confirm your new password."),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don’t match.",
  });

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
