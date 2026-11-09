"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BookOpenText,
  ChevronRight,
  FileText,
  LayoutGrid,
  LogOut,
  Menu,
  MessageSquareQuote,
  Package2,
  ShieldCheck,
  Sparkles,
  Star,
  UserCircle2,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "cn";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  children?: { label: string; href: string }[];
};

const navigation: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutGrid },
  {
    label: "Menu",
    href: "/dashboard/menu",
    icon: BookOpenText,
    children: [
      { label: "Categories", href: "/dashboard/categories" },
      { label: "Items", href: "/dashboard/items" },
    ],
  },
  { label: "Features", href: "/dashboard/features", icon: Sparkles },
  { label: "Testimonials", href: "/dashboard/testimonials", icon: Star },
  { label: "Admin Management", href: "/dashboard/admin-management", icon: Users },
];

const overviewCards = [
  {
    label: "Menu",
    description: "Manage categories and menu items.",
    href: "/dashboard/categories",
    count: 24,
    icon: Package2,
  },
  {
    label: "Features",
    description: "Update restaurant highlights.",
    href: "/dashboard/features",
    count: 8,
    icon: FileText,
  },
  {
    label: "Testimonials",
    description: "Review customer feedback.",
    href: "/dashboard/testimonials",
    count: 12,
    icon: MessageSquareQuote,
  },
  {
    label: "Admin Management",
    description: "Manage dashboard accounts.",
    href: "/dashboard/admin-management",
    count: 3,
    icon: ShieldCheck,
  },
];

export function DashboardShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuExpanded, setMenuExpanded] = useState(true);
  const isSuperAdmin = true;

  return (
    <div className="min-h-screen bg-[var(--dashboard-bg)] text-slate-900">
      <div className="flex min-h-screen">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 border-r border-border bg-white shadow-sm transition-transform duration-200 md:static md:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          )}
        >
          <div className="flex h-full flex-col">
            <div className="flex h-16 items-center justify-between border-b border-border px-4">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-white">
                  A
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Aura Bistro</p>
                  <p className="text-[11px] text-muted-foreground">Dashboard</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                className="md:hidden"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close sidebar"
              >
                <X className="size-4" />
              </Button>
            </div>

            <nav className="flex-1 space-y-2 px-3 py-4">
              {navigation
                .filter((item) => item.label !== "Admin Management" || isSuperAdmin)
                .map((item) => {
                  const isCurrent = item.href === "/dashboard";

                  if (item.children) {
                    return (
                      <div key={item.label} className="space-y-1">
                        <button
                          type="button"
                          className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
                          onClick={() => setMenuExpanded((value) => !value)}
                        >
                          <span className="flex items-center gap-3">
                            <item.icon className="size-4" />
                            {item.label}
                          </span>
                          <ChevronRight
                            className={cn(
                              "size-4 transition-transform",
                              menuExpanded && "rotate-90",
                            )}
                          />
                        </button>

                        {menuExpanded && (
                          <div className="space-y-1 pl-8">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={cn(
                                  "flex rounded-md px-3 py-2 text-sm transition-colors hover:bg-slate-100",
                                  isCurrent && "bg-primary/5 text-primary",
                                )}
                                onClick={() => setSidebarOpen(false)}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isCurrent
                          ? "bg-primary/5 text-primary"
                          : "text-slate-700 hover:bg-slate-100",
                      )}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="flex items-center gap-3">
                        <item.icon className="size-4" />
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
            </nav>
          </div>
        </aside>

        {sidebarOpen ? (
          <button
            type="button"
            aria-label="Close dashboard navigation overlay"
            className="fixed inset-0 z-30 bg-slate-900/30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        ) : null}

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-border bg-white/80 backdrop-blur-sm">
            <div className="flex h-16 items-center justify-between gap-3 px-4 md:px-8">
              <div className="flex min-w-0 items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="md:hidden"
                  onClick={() => setSidebarOpen(true)}
                  aria-label="Open dashboard navigation"
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

          <main className="flex-1 p-4 md:p-8">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                Overview
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage your restaurant website content.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {overviewCards
                .filter((card) => card.label !== "Admin Management" || isSuperAdmin)
                .map((card) => {
                  const Icon = card.icon;

                  return (
                    <Link
                      key={card.label}
                      href={card.href}
                      className="group rounded-xl border border-border bg-white p-4 transition-colors hover:border-primary/30 hover:bg-slate-50"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/5 text-primary">
                            <Icon className="size-5" />
                          </div>
                          <div>
                            <h2 className="text-lg font-semibold text-slate-900">
                              {card.label}
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {card.description}
                            </p>
                          </div>
                        </div>
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-sm font-medium text-slate-600">
                          {card.count}
                        </span>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
