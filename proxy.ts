import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["en", "fa"];
const defaultLocale = "fa";

function getLocale(request: NextRequest): string {
   const negotiatorHeaders: Record<string, string> = {};
   request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

   const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

   return matchLocale(languages, locales, defaultLocale);
}

export function proxy(request: NextRequest) {
   const pathname = request.nextUrl.pathname;

   if (
      pathname.startsWith("/_next") ||
      pathname.startsWith("/api") ||
      pathname.includes(".")
   ) {
      return;
   }

   const pathnameIsMissingLocale = locales.every(
      (locale) =>
         !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
   );

   if (pathnameIsMissingLocale) {
      const locale = getLocale(request);
      return NextResponse.redirect(
         new URL(
            `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
            request.url
         )
      );
   }

   const response = NextResponse.next();
   response.headers.set("x-pathname", pathname);
   return response;
}

export const config = {
   matcher: [
      "/((?!api|_next/static|_next/image|favicon.ico|manifest.json|robots.txt|sitemap.xml).*)",
   ],
};
