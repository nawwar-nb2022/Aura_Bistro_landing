import type { Metadata } from "next";
import { Suspense } from "react";
import "../../globals.css";
import "react-toastify/dist/ReactToastify.css";
import { DashboardChrome } from "@/components/admin/dashboard-chrome";
import { ToastProvider } from "@/components/ui/toast-provider";
import { requireDashboardSession } from "@/lib/auth/session-guard";

export const metadata: Metadata = {
  title: "Aura Bistro Dashboard",
  description: "Restaurant content management dashboard.",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full bg-[var(--dashboard-bg)] text-slate-900">
        <Suspense
          fallback={
            <main className="flex min-h-screen items-center justify-center">
              <p className="text-sm text-muted-foreground">
                Loading dashboard...
              </p>
            </main>
          }
        >
          <AuthenticatedDashboard>{children}</AuthenticatedDashboard>
        </Suspense>
        <ToastProvider />
      </body>
    </html>
  );
}

async function AuthenticatedDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireDashboardSession();

  return (
    <DashboardChrome role={session.role} username={session.username}>
      {children}
    </DashboardChrome>
  );
}
