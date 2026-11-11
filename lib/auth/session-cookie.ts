import "server-only";

export const SESSION_COOKIE_NAME = "aura-bistro-session";

/**
 * Transport defaults only. A cookie must not be treated as an authenticated
 * session until its value is validated against the server-side session store.
 */
export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
} as const;
