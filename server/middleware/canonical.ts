/**
 * Redirect the Cloudflare-assigned `*.pages.dev` URL to the canonical custom
 * domain so search engines don't index two copies of the site.
 *
 * No-op on requests that already arrived at the custom domain (or anywhere
 * else, e.g. local dev on localhost).
 */
export default defineEventHandler((event) => {
  const host = getRequestHost(event);
  if (host === "kabbalahindia.pages.dev") {
    return sendRedirect(event, `https://kabbalahindia.com${event.path}`, 301);
  }
});
