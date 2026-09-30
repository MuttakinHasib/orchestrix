const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Returns an error message, or `null` when the email is valid. */
export function validateEmail(value: string): string | null {
  const email = value.trim();

  if (!email) return "Enter your work email.";
  if (!EMAIL_PATTERN.test(email)) return "Enter a valid email address.";

  return null;
}
