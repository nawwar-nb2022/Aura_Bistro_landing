"use client";

import { useState, type ReactNode } from "react";

import { DashboardNavbar } from "@/components/admin/dashboard-navbar";
import { DashboardSidebar } from "@/components/admin/dashboard-sidebar";
import { SessionActivity } from "@/components/admin/session-activity";
import type { DashboardRole } from "@/lib/auth/session";

export function DashboardChrome({
  children,
  role,
  username,
}: {
  children: ReactNode;
  role: DashboardRole;
  username: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Keep the interactive shell client-side while allowing page children to remain Server Components.
  return (
    <div className="min-h-screen bg-[var(--dashboard-bg)] text-slate-900">
      <div className="flex min-h-screen">
        <DashboardSidebar
          isSuperAdmin={role === "super_admin"}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <DashboardNavbar
            onOpenSidebar={() => setSidebarOpen(true)}
            username={username}
          />
          <main className="flex-1 p-4 md:p-8">{children}</main>
        </div>
      </div>
      <SessionActivity />
    </div>
  );
}
