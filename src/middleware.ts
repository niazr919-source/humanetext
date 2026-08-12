import { NextRequest, NextResponse } from "next/server";

// Canonical domain has no "www." — redirect www -> non-www permanently so
// Google consolidates ranking signals onto one URL instead of splitting them
// across two indexed versions of every page.
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  if (host.startsWith("www.")) {
    // Strip "www." and any port — reverse proxies (Hostinger included) often
    // pass their internal port through in the Host header, which must never
    // end up in a public-facing redirect URL.
    const hostname = host.slice(4).split(":")[0];
    const url = request.nextUrl.clone();
    url.hostname = hostname;
    url.port = "";
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
