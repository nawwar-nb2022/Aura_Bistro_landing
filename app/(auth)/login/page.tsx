import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { getSessionStore } from "@/lib/auth/json-session-store";
import { getCurrentSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Sign in | Aura Bistro Dashboard",
  description: "Sign in to the Aura Bistro content management dashboard.",
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ expired?: string }>;
}) {
  return (
    <Suspense fallback={<LoginForm />}>
      <LoginPageContent searchParams={searchParams} />
    </Suspense>
  );
}

async function LoginPageContent({
  searchParams,
}: {
  searchParams: Promise<{ expired?: string }>;
}) {
  const session = await getCurrentSession(getSessionStore());

  if (session) {
    redirect("/dashboard");
  }

  const { expired } = await searchParams;
  return <LoginForm expired={expired === "1"} />;
}
