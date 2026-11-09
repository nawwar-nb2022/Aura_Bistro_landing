"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BookOpenText,
  ChevronRight,
  LayoutGrid,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "cn";
import { DashboardSidebarProps, NavItem } from "@/types/dashboard";
import LogoDesign from "@/components/ui/Logo";


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

export function DashboardSidebar({
  isSuperAdmin,
  isOpen,
  onClose,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  // Keep Menu highlighted on its nested Categories and Items routes.
  const menuIsActive = pathname.startsWith("/dashboard/categories")
    || pathname.startsWith("/dashboard/items")
    || pathname.startsWith("/dashboard/menu");

  const [menuExpanded, setMenuExpanded] = useState(true);

  return (
    <>
      <aside
        id="dashboard-sidebar"
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 border-r border-border bg-white shadow-sm transition-transform duration-200 md:static md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex h-full flex-col">
          {/* sidebar header  */}
          <div className="flex h-16 items-center justify-between border-b border-border px-4">
            <Link href="/dashboard" className="flex items-center gap-2" onClick={onClose}>
              <LogoDesign />
            </Link>

            <Button
              variant="ghost"
              size="icon-sm"
              className="md:hidden"
              onClick={onClose}
              aria-label="Close sidebar"
            >
              <X className="size-4" />
            </Button>
          </div>
          {/* sidebar body */}
          <nav aria-label="Dashboard navigation" className="flex-1 space-y-2 px-3 py-4">
            {navigation
              .filter((item) => item.label !== "Admin Management" || isSuperAdmin)
              .map((item) => {
                if (item.children) {
                  return (
                    <div key={item.label} className="space-y-1">
                      <button
                        type="button"
                        aria-expanded={menuExpanded}
                        aria-controls="dashboard-menu-links"
                        className={cn(
                          "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-100",
                          menuIsActive ? "text-primary" : "text-slate-700",
                        )}
                        onClick={() => setMenuExpanded((value) => !value)}
                      >
                        <span className="flex items-center gap-3">
                          <item.icon className="size-4" />
                          {item.label}
                        </span>
                        <ChevronRight
                          className={cn("size-4 transition-transform", menuExpanded && "rotate-90")}
                        />
                      </button>
                      {menuExpanded && (
                        <div id="dashboard-menu-links" className="space-y-1 pl-8">
                          {item.children.map((child) => {
                            const isCurrent = pathname === child.href;

                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                aria-current={isCurrent ? "page" : undefined}
                                className={cn(
                                  "flex rounded-md px-3 py-2 text-sm transition-colors hover:bg-slate-100",
                                  isCurrent ? "bg-primary/5 text-primary" : "text-slate-700",
                                )}
                                onClick={onClose}
                              >
                                {child.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                const isCurrent = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isCurrent ? "page" : undefined}
                    className={cn(
                      "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isCurrent
                        ? "bg-primary/5 text-primary"
                        : "text-slate-700 hover:bg-slate-100",
                    )}
                    onClick={onClose}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="size-4" />
                      {item.label}
                    </span>
                  </Link>
                );
              })}
          </nav>
        </div>
      </aside>

      {isOpen && (
        <button
          type="button"
          aria-label="Close dashboard navigation overlay"
          className="fixed inset-0 z-30 bg-slate-900/30 md:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}
