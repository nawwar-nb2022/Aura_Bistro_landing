export const SESSION_IDLE_TIMEOUT_MS = 30 * 60 * 1000;

export type SessionExpiryState = {
  createdAt: Date;
  lastActivityAt: Date;
  expiresAt: Date;
};

export function isSessionExpired(
  session: SessionExpiryState,
  now: Date,
): boolean {
  if (
    !(session.createdAt instanceof Date) ||
    !(session.lastActivityAt instanceof Date) ||
    !(session.expiresAt instanceof Date) ||
    !(now instanceof Date)
  ) {
    return true;
  }

  const createdAt = session.createdAt.getTime();
  const lastActivityAt = session.lastActivityAt.getTime();
  const expiresAt = session.expiresAt.getTime();
  const currentTime = now.getTime();

  if (
    !Number.isFinite(createdAt) ||
    !Number.isFinite(lastActivityAt) ||
    !Number.isFinite(expiresAt) ||
    !Number.isFinite(currentTime) ||
    lastActivityAt < createdAt ||
    lastActivityAt > currentTime
  ) {
    return true;
  }

  return (
    expiresAt <= currentTime ||
    currentTime - lastActivityAt >= SESSION_IDLE_TIMEOUT_MS
  );
}
