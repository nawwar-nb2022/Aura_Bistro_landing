import type { Metadata } from "next";
import "../../globals.css";
import "react-toastify/dist/ReactToastify.css";
import { DashboardChrome } from "@/components/admin/dashboard-chrome";
import { ToastProvider } from "@/components/ui/toast-provider";

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
        <DashboardChrome>{children}</DashboardChrome>
        <ToastProvider />
      </body>
    </html>
  );
}
