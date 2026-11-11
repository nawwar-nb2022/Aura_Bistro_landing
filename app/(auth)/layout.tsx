import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Sign in | Aura Bistro Dashboard",
  description: "Sign in to the Aura Bistro content management dashboard.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full bg-[var(--dashboard-bg)] text-slate-900">
        {children}
      </body>
    </html>
  );
}
