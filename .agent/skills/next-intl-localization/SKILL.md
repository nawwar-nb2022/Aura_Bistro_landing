---
name: next-intl-localization
description: "Use when adding or changing next-intl localization in this Next.js App Router project, including locale JSON messages, routing, request configuration, metadata, providers, or language switching."
---

# next-intl Localization

Use the installed Next.js and next-intl versions as the source of truth. Keep localized URL routing separate from message loading.

## Project structure

- Store locale messages in root `locale/<locale>.json` files, such as `locale/en.json`, `locale/de.json`, and `locale/ar.json`.
- Keep supported locales, default locale, prefixes, and locale cookie settings in `i18n/routing.ts` using `defineRouting`.
- Keep next-intl request configuration in `i18n/request.ts`; `getRequestConfig` does not belong in `routing.ts`.
- Create localized navigation wrappers in `i18n/navigation.ts` with `createNavigation(routing)`.

## Configuration

1. Wrap the existing Next.js configuration with `createNextIntlPlugin("./i18n/request.ts")`. Preserve all existing Next.js options.
2. In the request config, prefer a valid route-provided `requestLocale`. Only use the `NEXT_LOCALE` cookie when the request has no supported locale, then fall back to the configured default. Validate both values against `routing.locales`.
3. Load messages using a fixed loader map from each locale code to its JSON file. Do not create filesystem paths directly from unchecked request input.
4. Preserve the existing middleware/proxy routing configuration; use the shared `routing` object rather than duplicating locale settings.

## App Router layout and server rendering

1. Keep the root layout under the `[locale]` route so it can validate route params and set the document `lang` and `dir`.
2. Call `setRequestLocale(locale)` before rendering translations where static rendering is intended.
3. Load messages with `getMessages()` and wrap the route subtree in `NextIntlClientProvider`, passing the validated route locale and messages.
4. Use `getTranslations` in Server Components and `useTranslations` in Client Components. Add the same message keys to every locale JSON.
5. Use `getTranslations({locale, namespace})` for locale-dependent metadata.

## Dynamic language switching

- Use `useLocale` and `useTranslations` from `next-intl` and `usePathname`/`useRouter` from the project's `i18n/navigation` wrapper.
- Validate a selected locale against `routing.locales`, persist `NEXT_LOCALE`, then navigate with `router.push(pathAndFragment, {locale: newLocale})` to retain browser history and update the localized URL.
- Do not rely on `router.refresh()` alone to switch languages: refreshing the same locale URL does not change the route locale and can leave the URL and translated content inconsistent.
- Treat a valid locale in the URL as authoritative over a stale cookie. The cookie is a preference for unlocalized entry routes.

## Verification

- Add browser tests for translated content, document language/direction, locale-specific metadata, and manual switching in both directions.
- Verify the selected locale URL, cookie, browser back/forward behavior, and any retained section fragment.
- Run the focused Playwright tests, lint, and production build.
