import assert from "node:assert/strict";
import test from "node:test";
import {
  AuthorizationError,
  requireAuthenticatedSession,
  requireRole,
} from "../authorization.ts";
import type { AuthenticatedSession } from "../session.ts";

const adminSession: AuthenticatedSession = {
  userId: "demo-admin",
  role: "admin",
  createdAt: new Date("2026-11-09T08:00:00.000Z"),
  lastActivityAt: new Date("2026-11-09T08:00:00.000Z"),
  expiresAt: new Date("2026-11-09T08:30:00.000Z"),
};

test("authentication guard rejects missing sessions with 401", () => {
  // Arrange
  const session = null;

  // Act
  const reject = () => requireAuthenticatedSession(session);

  // Assert
  assert.throws(reject, (error: unknown) => {
    assert.ok(error instanceof AuthorizationError);
    assert.equal(error.status, 401);
    return true;
  });
});

test("role guard permits a Super Admin and rejects an Admin with 403", () => {
  // Arrange
  const superAdminSession = { ...adminSession, role: "super_admin" as const };

  // Act
  const permitted = requireRole(superAdminSession, "super_admin");
  const reject = () => requireRole(adminSession, "super_admin");

  // Assert
  assert.equal(permitted, superAdminSession);
  assert.throws(reject, (error: unknown) => {
    assert.ok(error instanceof AuthorizationError);
    assert.equal(error.status, 403);
    return true;
  });
});
