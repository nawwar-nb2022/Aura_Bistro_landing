"use client";

import { useActionState } from "react";
import { LockKeyhole } from "lucide-react";
import { loginAction, type LoginState } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LogoDesign from "@/components/ui/Logo";

const INITIAL_STATE: LoginState = {};

export function LoginForm({ expired = false }: { expired?: boolean }) {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    INITIAL_STATE,
  );

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <section
        aria-labelledby="login-heading"
        className="w-full max-w-md rounded-xl border border-border bg-white p-6 sm:p-8"
      >
        <div className="mb-8 flex items-center justify-center gap-3">
          <LogoDesign />
        </div>

        <div className="mb-6 flex flex-col items-center text-center">
          <div
            aria-hidden="true"
            className="mb-4 flex size-11 items-center justify-center rounded-full bg-primary/5 text-primary"
          >
            <LockKeyhole className="size-5" />
          </div>
          <h1
            id="login-heading"
            className="text-2xl font-semibold tracking-tight text-slate-900"
          >
            Sign in
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to manage your restaurant website content.
          </p>
        </div>

        {expired && (
          <p
            className="mb-5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-center text-sm text-amber-900"
            role="status"
          >
            Your session has expired. Please sign in again.
          </p>
        )}

        <form action={formAction} className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="text-sm font-medium text-slate-900"
            >
              Username
            </label>
            <Input
              id="username"
              name="username"
              autoComplete="username"
              required
              maxLength={64}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-900"
            >
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              maxLength={1024}
            />
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        {state.error && (
          <p
            className="mt-5 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2.5 text-center text-sm text-destructive"
            role="alert"
          >
            {state.error}
          </p>
        )}
      </section>
    </main>
  );
}
