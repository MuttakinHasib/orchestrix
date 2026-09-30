export const MIN_PASSWORD_LENGTH = 10;

export type PasswordStrength = {
  /** 0 (empty) to 4 (strongest) — drives how many meter bars fill. */
  score: 0 | 1 | 2 | 3 | 4;
  label: "Weak" | "Fair" | "Strong" | "";
};

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return { score: 0, label: "" };

  const checks = [
    password.length >= MIN_PASSWORD_LENGTH,
    /[a-z]/.test(password) && /[A-Z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = Math.max(1, checks.filter(Boolean).length) as 1 | 2 | 3 | 4;

  // Anything under the minimum length can never read as strong.
  if (password.length < MIN_PASSWORD_LENGTH) {
    return {
      score: Math.min(score, 2) as 1 | 2,
      label: score > 1 ? "Fair" : "Weak",
    };
  }

  return { score, label: score >= 3 ? "Strong" : "Fair" };
}
