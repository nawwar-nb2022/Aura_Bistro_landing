"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ACTIVITY_REFRESH_INTERVAL_MS = 60_000;

export function SessionActivity() {
  const router = useRouter();

  useEffect(() => {
    let lastRefreshAt = 0;

    const refreshSession = () => {
      const now = Date.now();

      if (now - lastRefreshAt < ACTIVITY_REFRESH_INTERVAL_MS) {
        return;
      }

      lastRefreshAt = now;
      void fetch("/api/auth/activity", {
        method: "POST",
        cache: "no-store",
      }).then((response) => {
        if (response.status === 401) {
          router.replace("/login?expired=1");
          return;
        }

        if (!response.ok) {
          throw new Error("Unable to refresh the dashboard session.");
        }
      });
    };

    window.addEventListener("pointerdown", refreshSession);
    window.addEventListener("keydown", refreshSession);

    return () => {
      window.removeEventListener("pointerdown", refreshSession);
      window.removeEventListener("keydown", refreshSession);
    };
  }, [router]);

  return null;
}
