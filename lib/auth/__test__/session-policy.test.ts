import assert from "node:assert/strict";
import test from "node:test";
import {
  isSessionExpired,
  SESSION_IDLE_TIMEOUT_MS,
  type SessionExpiryState,
} from "./session-policy.ts";

const createdAt = new Date("2026-11-09T08:00:00.000Z");

function sessionWithActivityAt(lastActivityAt: Date): SessionExpiryState {
  return {
    createdAt,
    lastActivityAt,
    expiresAt: new Date(lastActivityAt.getTime() + SESSION_IDLE_TIMEOUT_MS),
  };
}

test("session remains valid immediately before 30 minutes idle", () => {
  // Arrange
  const activityAt = new Date("2026-11-09T08:00:00.000Z");
  const now = new Date(activityAt.getTime() + SESSION_IDLE_TIMEOUT_MS - 1);

  // Act
  const expired = isSessionExpired(sessionWithActivityAt(activityAt), now);

  // Assert
  assert.equal(expired, false);
});

test("session expires at exactly 30 minutes idle", () => {
  // Arrange
  const activityAt = new Date("2026-11-09T08:00:00.000Z");
  const now = new Date(activityAt.getTime() + SESSION_IDLE_TIMEOUT_MS);

  // Act
  const expired = isSessionExpired(sessionWithActivityAt(activityAt), now);

  // Assert
  assert.equal(expired, true);
});

test("meaningful activity establishes a new 30-minute idle window", () => {
  // Arrange
  const activityAt = new Date("2026-11-09T08:20:00.000Z");
  const now = new Date(activityAt.getTime() + SESSION_IDLE_TIMEOUT_MS - 1);

  // Act
  const expired = isSessionExpired(sessionWithActivityAt(activityAt), now);

  // Assert
  assert.equal(expired, false);
});

test("expired absolute expiry invalidates a recently active session", () => {
  // Arrange
  const activityAt = new Date("2026-11-09T08:29:00.000Z");
  const session = {
    ...sessionWithActivityAt(activityAt),
    expiresAt: new Date("2026-11-09T08:29:30.000Z"),
  };

  // Act
  const expired = isSessionExpired(session, new Date("2026-11-09T08:29:30.000Z"));

  // Assert
  assert.equal(expired, true);
});

test("invalid or future activity timestamps fail closed", () => {
  // Arrange
  const now = new Date("2026-11-09T08:00:00.000Z");
  const invalidSession = {
    ...sessionWithActivityAt(now),
    lastActivityAt: new Date(Number.NaN),
  };
  const futureSession = sessionWithActivityAt(
    new Date(now.getTime() + 1),
  );

  // Act
  const invalidExpired = isSessionExpired(invalidSession, now);
  const futureExpired = isSessionExpired(futureSession, now);

  // Assert
  assert.equal(invalidExpired, true);
  assert.equal(futureExpired, true);
});
