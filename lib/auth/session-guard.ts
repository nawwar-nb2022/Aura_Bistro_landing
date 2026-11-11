import "server-only";

import { redirect } from "next/navigation";
import { getSessionStore } from "@/lib/auth/json-session-store";
import { requireRole } from "@/lib/auth/authorization";
import {
  resolveCurrentSession,
  revokeCurrentSession,
  type AuthenticatedSession,
  type DashboardRole,
} from "@/lib/auth/session";
import { findDemoUserById } from "@/lib/auth/users";

export async function requireDashboardSession(): Promise<
  AuthenticatedSession & { username: string }
> {
  const store = getSessionStore();
  const result = await resolveCurrentSession(store);


  if (!result.session) {
    redirect(result.status === "expired" ? "/login?expired=1" : "/login");
  }

  const user = findDemoUserById(result.session.userId);

  if (!user || user.role !== result.session.role) {
    await revokeCurrentSession(store);
    redirect("/login");
  }

  return { ...result.session, username: user.username };
}

export async function requireCurrentRole(
  requiredRole: DashboardRole,
): Promise<AuthenticatedSession> {
  const result = await resolveCurrentSession(getSessionStore());
  return requireRole(result.session, requiredRole);
}
