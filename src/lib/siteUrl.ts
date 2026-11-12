const stripTrailingSlash = (value: string): string => value.replace(/\/+$/, "");

const withProtocol = (value: string): string =>
  /^https?:\/\//i.test(value) ? value : `https://${value}`;

/**
 * Resolves the public site origin in a single place so that canonical URLs,
 * Open Graph tags, JSON-LD `@id` values, the sitemap and robots.txt never drift.
 *
 * Resolution order:
 *  1. NEXT_PUBLIC_SITE_URL  (explicit override, set per environment)
 *  2. VERCEL_URL            (injected automatically by Vercel, incl. previews)
 *  3. http://localhost:3000 (local development)
 *
 * Must stay NEXT_PUBLIC_* because SEO tags are also rendered in the browser
 * during hydration.
 */
export const SITE_URL: string = stripTrailingSlash(
  withProtocol(
    process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.VERCEL_URL ||
      "http://localhost:3000"
  )
);

/** True when the current deployment is not the public production domain. */
export const IS_PREVIEW_DEPLOYMENT: boolean =
  /(^|\/\/)(localhost|127\.0\.0\.1)/.test(SITE_URL) ||
  SITE_URL.includes("vercel.app");

/** Joins a root-relative path onto the site origin; absolute URLs pass through. */
export const absoluteUrl = (path: string): string => {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};
