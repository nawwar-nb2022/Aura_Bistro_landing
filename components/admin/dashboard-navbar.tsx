"use client";

import Link from "next/link";
import { ChevronRight, LogOut, Menu, UserCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

type DashboardNavbarProps = {
  onOpenSidebar: () => void;
};

export function DashboardNavbar({ onOpenSidebar }: DashboardNavbarProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-white/80 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between gap-3 px-4 md:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            onClick={onOpenSidebar}
            aria-label="Open dashboard navigation"
            aria-controls="dashboard-sidebar"
          >
            <Menu className="size-4" />
          </Button>
          <nav
            aria-label="Breadcrumb"
            className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex"
          >
            <Link href="/dashboard" className="hover:text-foreground">
              Dashboard
            </Link>
            <ChevronRight className="size-4" />
            <span className="font-medium text-slate-900">Overview</span>
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <Link
            href="/dashboard/profile"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            <UserCircle2 className="size-4" />
            <span className="hidden sm:inline">Admin</span>
          </Link>
          <Button variant="outline" size="sm" className="gap-2">
            <LogOut className="size-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
