import Link from "next/link";
import {
  FileText,
  MessageSquareQuote,
  Package2,
  ShieldCheck,
} from "lucide-react";

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

export default function DashboardPage() {
  const isSuperAdmin = true;

  return (
    <>
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
    </>
  );
}
