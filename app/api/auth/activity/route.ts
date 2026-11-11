import { NextResponse } from "next/server";
import { getSessionStore } from "@/lib/auth/json-session-store";
import { resolveCurrentSession } from "@/lib/auth/session";

export async function POST() {
  const result = await resolveCurrentSession(getSessionStore(), {
    meaningfulActivity: true,
  });

  if (!result.session) {
    return NextResponse.json(
      { error: "unauthenticated" },
      {
        status: 401,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }

  return NextResponse.json(
    { ok: true },
    { headers: { "Cache-Control": "no-store" } },
  );
}
