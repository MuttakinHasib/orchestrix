export const OAuthProvider = {
  GITHUB: "github",
  GOOGLE: "google",
  SAML: "saml",
} as const;
export type OAuthProvider = (typeof OAuthProvider)[keyof typeof OAuthProvider];

export const TeamSize = {
  XS: "1-5",
  SM: "6-20",
  MD: "21-100",
  LG: "100+",
} as const;
export type TeamSize = (typeof TeamSize)[keyof typeof TeamSize];

export const AuthErrorCode = {
  INVALID_CREDENTIALS: "invalid-credentials",
  EMAIL_TAKEN: "email-taken",
  PROVIDER_UNAVAILABLE: "provider-unavailable",
  INVALID_RESET_TOKEN: "invalid-reset-token",
  SLUG_TAKEN: "slug-taken",
} as const;
export type AuthErrorCode = (typeof AuthErrorCode)[keyof typeof AuthErrorCode];

export interface AuthError {
  code: AuthErrorCode;
  message: string;
}

export type AuthResult<TValue = null> =
  { ok: true; value: TValue } | { ok: false; error: AuthError };

export interface Session {
  email: string;
  fullName?: string;
}

export interface Organization {
  name: string;
  slug: string;
}

export interface SignInInput {
  email: string;
  password: string;
}

export interface SignUpInput {
  fullName: string;
  email: string;
  password: string;
}

export interface ResetPasswordInput {
  token: string;
  password: string;
}

export interface CreateOrganizationInput {
  name: string;
  slug: string;
  teamSize: TeamSize;
  invites: string[];
}

/**
 * Everything the auth screens need from the backend. Pages depend on this
 * contract only, so the stub can be replaced by the engine client unchanged.
 * "Workspace" in UI copy is an Organization in the domain.
 */
export interface AuthService {
  signIn(input: SignInInput): Promise<AuthResult<Session>>;
  signUp(input: SignUpInput): Promise<AuthResult<Session>>;
  startOAuth(provider: OAuthProvider): Promise<AuthResult>;
  requestPasswordReset(email: string): Promise<AuthResult>;
  resetPassword(input: ResetPasswordInput): Promise<AuthResult>;
  isOrganizationSlugAvailable(slug: string): Promise<boolean>;
  createOrganization(
    input: CreateOrganizationInput,
  ): Promise<AuthResult<Organization>>;
  getSession(): Promise<Session | null>;
}
