import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals, Vercel internals, OG images (crawlers
  // shouldn't hit a locale redirect) and files with an extension.
  matcher: "/((?!api|_next|_vercel|.*opengraph-image|.*\\..*).*)",
};
