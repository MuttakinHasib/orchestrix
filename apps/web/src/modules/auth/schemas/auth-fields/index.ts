import { z } from "zod";

import { PASSWORD_MIN_LENGTH } from "@/modules/auth/utils/password-strength";

export const emailSchema = z
  .string()
  .trim()
  .min(1, "Enter your work email.")
  .pipe(z.email("Enter a valid email address."));

export const currentPasswordSchema = z.string().min(1, "Enter your password.");

export const newPasswordSchema = z
  .string()
  .min(PASSWORD_MIN_LENGTH, `Use at least ${PASSWORD_MIN_LENGTH} characters.`);
