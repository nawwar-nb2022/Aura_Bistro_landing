"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getSessionStore } from "@/lib/auth/json-session-store";
import { createSession, revokeCurrentSession } from "@/lib/auth/session";
import { verifyPassword } from "@/lib/auth/password";
import { findDemoUserByUsername } from "@/lib/auth/users";

export type LoginState = {
  error?: string;
};

const LoginSchema = z.object({
  username: z.string().trim().min(1).max(64),
  password: z.string().min(1).max(1024),
});

const INVALID_CREDENTIALS = "Username or password is incorrect.";

export async function loginAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = LoginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: INVALID_CREDENTIALS };
  }

  try {
    const user = findDemoUserByUsername(parsed.data.username);

    if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
      return { error: INVALID_CREDENTIALS };
    }

    await createSession(getSessionStore(), {
      userId: user.id,
      role: user.role,
    });
  } catch {
    return { error: "Sign in is temporarily unavailable. Please try again." };
  }

  redirect("/dashboard");
}

export async function logoutAction(): Promise<void> {
  await revokeCurrentSession(getSessionStore());
  redirect("/login");
}
