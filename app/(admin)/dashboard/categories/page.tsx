import type { Metadata } from "next"
import { Suspense } from "react"

import { CategoriesPage } from "@/components/admin/categories-page"
import { requireDashboardSession } from "@/lib/auth/session-guard"

export const metadata: Metadata = {
  title: "Categories | Aura Bistro Dashboard",
  description: "Manage your restaurant menu categories.",
  openGraph: {
    title: "Categories | Aura Bistro Dashboard",
    description: "Manage your restaurant menu categories.",
    url: "/dashboard/categories",
    siteName: "Aura Bistro",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Categories | Aura Bistro Dashboard",
    description: "Manage your restaurant menu categories.",
  },
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <p className="text-sm text-muted-foreground">
          Loading categories...
        </p>
      }
    >
      <AuthenticatedCategoriesPage />
    </Suspense>
  )
}

async function AuthenticatedCategoriesPage() {
  await requireDashboardSession()
  return <CategoriesPage />
}
