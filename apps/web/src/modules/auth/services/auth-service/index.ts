import {
  AuthErrorCode,
  OAuthProvider,
  type AuthError,
  type AuthResult,
  type AuthService,
  type Session,
} from "@/modules/auth/types/auth-service";

/*
 * Stub backend. Deterministic triggers make every UI state reachable:
 *  - sign in fails when the password is `wrong`
 *  - sign up fails when the email's local part is `taken`
 *  - reset fails when the token is missing or `expired`
 *  - the organization slug `taken` is unavailable
 *  - OAuth and SSO providers are not connected yet
 */

const LATENCY_MS = 600;
const SLUG_CHECK_LATENCY_MS = 300;
const SESSION_KEY = "orchestrix.session";
const TAKEN = "taken";

const PROVIDER_NAME: Record<OAuthProvider, string> = {
  [OAuthProvider.GITHUB]: "GitHub",
  [OAuthProvider.GOOGLE]: "Google",
  [OAuthProvider.SAML]: "Single sign-on",
};

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

function ok<TValue>(value: TValue): AuthResult<TValue> {
  return { ok: true, value };
}

function fail(code: AuthError["code"], message: string): AuthResult<never> {
  return { ok: false, error: { code, message } };
}

function readSession(): Session | null {
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

function writeSession(session: Session) {
  try {
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    // Storage can be unavailable (private mode, blocked site data); the flow still works.
  }
}

export const authService: AuthService = {
  async signIn({ email, password }) {
    await delay(LATENCY_MS);
    if (password === "wrong") {
      return fail(
        AuthErrorCode.INVALID_CREDENTIALS,
        "That email and password don’t match.",
      );
    }
    const session = { email };
    writeSession(session);
    return ok(session);
  },

  async signUp({ fullName, email }) {
    await delay(LATENCY_MS);
    if (email.split("@")[0] === TAKEN) {
      return fail(
        AuthErrorCode.EMAIL_TAKEN,
        "An account with this email already exists.",
      );
    }
    const session = { email, fullName };
    writeSession(session);
    return ok(session);
  },

  async startOAuth(provider) {
    await delay(LATENCY_MS);
    return fail(
      AuthErrorCode.PROVIDER_UNAVAILABLE,
      `${PROVIDER_NAME[provider]} isn’t connected yet. Use your email for now.`,
    );
  },

  async requestPasswordReset() {
    await delay(LATENCY_MS);
    return ok(null);
  },

  async resetPassword({ token }) {
    await delay(LATENCY_MS);
    if (!token || token === "expired") {
      return fail(
        AuthErrorCode.INVALID_RESET_TOKEN,
        "This reset link has expired or was already used.",
      );
    }
    return ok(null);
  },

  async isOrganizationSlugAvailable(slug) {
    await delay(SLUG_CHECK_LATENCY_MS);
    return slug !== TAKEN;
  },

  async createOrganization({ name, slug }) {
    await delay(LATENCY_MS);
    if (slug === TAKEN) {
      return fail(AuthErrorCode.SLUG_TAKEN, "That URL is taken. Try another.");
    }
    return ok({ name, slug });
  },

  async getSession() {
    return readSession();
  },
};
