import type { AuthenticatedSession, DashboardRole } from "@/lib/auth/session";

export class AuthorizationError extends Error {
  public readonly status: 401 | 403;

  constructor(
    status: 401 | 403,
    message: string,
  ) {
    super(message);
    this.status = status;
    this.name = "AuthorizationError";
  }
}

export function requireAuthenticatedSession(
  session: AuthenticatedSession | null,
): AuthenticatedSession {
  if (!session) {
    throw new AuthorizationError(401, "Authentication is required.");
  }

  return session;
}

export function requireRole(
  session: AuthenticatedSession | null,
  requiredRole: DashboardRole,
): AuthenticatedSession {
  const authenticatedSession = requireAuthenticatedSession(session);

  if (authenticatedSession.role !== requiredRole) {
    throw new AuthorizationError(
      403,
      "You are not allowed to perform this action.",
    );
  }

  return authenticatedSession;
}
