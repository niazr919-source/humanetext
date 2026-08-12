import { NextRequest, NextResponse } from "next/server";

// Canonical domain has no "www." — redirect www -> non-www permanently so
// Google consolidates ranking signals onto one URL instead of splitting them
// across two indexed versions of every page.
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  if (host.startsWith("www.")) {
    const url = request.nextUrl.clone();
    url.host = host.slice(4);
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
