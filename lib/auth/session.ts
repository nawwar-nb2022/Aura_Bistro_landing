import "server-only";

import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { connection } from "next/server";
import {
  SESSION_COOKIE_NAME,
  SESSION_COOKIE_OPTIONS,
} from "@/lib/auth/session-cookie";
import {
  isSessionExpired,
  SESSION_IDLE_TIMEOUT_MS,
} from "@/lib/auth/session-policy";

export type DashboardRole = "admin" | "super_admin";

export type SessionPrincipal = {
  userId: string;
  role: DashboardRole;
};

export type StoredSession = SessionPrincipal & {
  tokenHash: string;
  createdAt: Date;
  lastActivityAt: Date;
  expiresAt: Date;
};

export type AuthenticatedSession = Omit<StoredSession, "tokenHash">;

export type SessionLookup =
  | { status: "authenticated"; session: AuthenticatedSession }
  | { status: "missing" | "expired"; session: null };

export interface SessionStore {
  create(session: StoredSession): Promise<void>;
  findByTokenHash(tokenHash: string): Promise<StoredSession | null>;
  /**
   * Atomically refresh only a session that has not expired at activityAt.
   * Preserve monotonic activity timestamps for concurrent requests and set
   * expiresAt to lastActivityAt + idleTimeoutMs.
   */
  refresh(
    tokenHash: string,
    activityAt: Date,
    idleTimeoutMs: number,
  ): Promise<StoredSession | null>;
  deleteByTokenHash(tokenHash: string): Promise<void>;
}

function isSessionToken(value: string | undefined): value is string {
  return value !== undefined && /^[A-Za-z0-9_-]{43}$/.test(value);
}

function hashSessionToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function toAuthenticatedSession(
  session: StoredSession,
): AuthenticatedSession {
  return {
    userId: session.userId,
    role: session.role,
    createdAt: session.createdAt,
    lastActivityAt: session.lastActivityAt,
    expiresAt: session.expiresAt,
  };
}

export async function createSession(
  store: SessionStore,
  principal: SessionPrincipal,
  now = new Date(),
): Promise<void> {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(now.getTime() + SESSION_IDLE_TIMEOUT_MS);

  await store.create({
    ...principal,
    tokenHash: hashSessionToken(token),
    createdAt: now,
    lastActivityAt: now,
    expiresAt,
  });

  try {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, {
      ...SESSION_COOKIE_OPTIONS,
      expires: expiresAt,
      maxAge: Math.floor(SESSION_IDLE_TIMEOUT_MS / 1000),
    });
  } catch (error) {
    await store.deleteByTokenHash(hashSessionToken(token));
    throw error;
  }
}

/**
 * Set meaningfulActivity only for a user-initiated Server Action or Route
 * Handler; it refreshes the cookie and must not be used for background fetches.
 */
export async function resolveCurrentSession(
  store: SessionStore,
  options: { meaningfulActivity?: boolean; now?: Date } = {},
): Promise<SessionLookup> {
  const { meaningfulActivity = false, now: providedNow } = options;
  await connection();
  const cookieStore = await cookies();
  const now = providedNow ?? new Date();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return { status: "missing", session: null };
  }

  if (!isSessionToken(token)) {
    cookieStore.delete(SESSION_COOKIE_NAME);
    return { status: "missing", session: null };
  }

  const tokenHash = hashSessionToken(token);
  const session = await store.findByTokenHash(tokenHash);

  if (!session) {
    cookieStore.delete(SESSION_COOKIE_NAME);
    return { status: "missing", session: null };
  }

  if (isSessionExpired(session, now)) {
    await store.deleteByTokenHash(tokenHash);
    cookieStore.delete(SESSION_COOKIE_NAME);
    return { status: "expired", session: null };
  }

  if (!meaningfulActivity) {
    return {
      status: "authenticated",
      session: toAuthenticatedSession(session),
    };
  }

  const refreshedSession = await store.refresh(
    tokenHash,
    now,
    SESSION_IDLE_TIMEOUT_MS,
  );

  if (!refreshedSession) {
    cookieStore.delete(SESSION_COOKIE_NAME);
    return { status: "expired", session: null };
  }

  const refreshedExpiry = new Date(
    refreshedSession.lastActivityAt.getTime() + SESSION_IDLE_TIMEOUT_MS,
  );
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    ...SESSION_COOKIE_OPTIONS,
    expires: refreshedExpiry,
    maxAge: Math.floor(SESSION_IDLE_TIMEOUT_MS / 1000),
  });

  return {
    status: "authenticated",
    session: toAuthenticatedSession(refreshedSession),
  };
}

export async function getCurrentSession(
  store: SessionStore,
  options: { meaningfulActivity?: boolean; now?: Date } = {},
): Promise<AuthenticatedSession | null> {
  const result = await resolveCurrentSession(store, options);
  return result.session;
}

export async function revokeCurrentSession(
  store: SessionStore,
): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (isSessionToken(token)) {
    await store.deleteByTokenHash(hashSessionToken(token));
  }

  cookieStore.delete(SESSION_COOKIE_NAME);
}
