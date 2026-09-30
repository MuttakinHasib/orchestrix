export const PASSWORD_MIN_LENGTH = 10;

export const PASSWORD_STRENGTH_MAX = 4;

export type PasswordScore = 0 | 1 | 2 | 3 | 4;

const LOWERCASE = /[a-z]/;
const UPPERCASE = /[A-Z]/;
const DIGIT = /\d/;
const SYMBOL = /[^A-Za-z0-9]/;

/**
 * Scores a password 0–4. Anything shorter than the minimum is weak; past that,
 * mixed case, a digit and a symbol each add a point.
 */
export function scorePassword(password: string): PasswordScore {
  if (!password) return 0;
  if (password.length < PASSWORD_MIN_LENGTH) return 1;

  const hasMixedCase = LOWERCASE.test(password) && UPPERCASE.test(password);
  const hasDigit = DIGIT.test(password);
  const hasSymbol = SYMBOL.test(password);

  return (1 +
    Number(hasMixedCase) +
    Number(hasDigit) +
    Number(hasSymbol)) as PasswordScore;
}

const STRENGTH_LABEL: Record<PasswordScore, string> = {
  0: "",
  1: "Weak",
  2: "Fair",
  3: "Strong",
  4: "Very strong",
};

export function describePasswordScore(score: PasswordScore): string {
  return STRENGTH_LABEL[score];
}
